import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import { Stat } from '../components/Stat'
import { StatSkeleton } from '../components/Skeleton'
import { useToast } from '../hooks/useToast'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'
import { ActivityItem, AttentionItem, DashboardStats, PlanItem } from '../lib/types'

const EMPTY_STATS: DashboardStats = {
  underCoaching: 0,
  needAttention: 0,
  observationsThisWeek: 0,
  activePlans: 0
}

const EMPTY_ATTENTION: AttentionItem[] = []
const EMPTY_ACTIVITY: ActivityItem[] = []
const EMPTY_PLANS: PlanItem[] = []

function TimelineItem(props: ActivityItem) {
  const dot = props.tone === 'success' ? 'var(--v2-success)' : props.tone === 'warn' ? 'var(--v2-warm)' : 'var(--v2-brand)'
  return (
    <div style={{
      position: 'relative',
      padding: '0.4rem 0 0.85rem 1.55rem',
      borderLeft: '2px solid var(--v2-line)',
      marginLeft: '0.5rem'
    }}>
      <span style={{
        position: 'absolute', left: -8, top: '0.7rem',
        width: 14, height: 14, borderRadius: '50%',
        background: dot,
        border: '3px solid var(--v2-white)',
        boxShadow: `0 0 0 1px ${dot}`
      }} />
      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--v2-ink)' }}>{props.title}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--v2-muted)', marginTop: '0.1rem' }}>{props.meta}</div>
    </div>
  )
}

function PlanMini(props: PlanItem) {
  return (
    <div style={{ padding: '0.85rem', background: 'var(--v2-bg-soft)', borderRadius: 10, marginBottom: '0.6rem' }}>
      <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
        <span>{props.title}</span>
        <span style={{ color: 'var(--v2-muted)', fontWeight: 400, fontSize: '0.78rem' }}>{props.forName}</span>
      </div>
      <div style={{ height: 6, background: 'var(--v2-white)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${props.progress}%`, background: 'var(--v2-brand)', borderRadius: 999 }} />
      </div>
      <div style={{ fontSize: '0.72rem', color: 'var(--v2-muted)', marginTop: '0.4rem', display: 'flex', justifyContent: 'space-between' }}>
        <span>{props.progress}% complete</span><span>{props.due}</span>
      </div>
    </div>
  )
}

function AttentionRow(props: { teacher: AttentionItem; onAction(teacher: AttentionItem): void }) {
  const t = props.teacher
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.85rem',
      padding: '0.85rem 0',
      borderBottom: '1px solid var(--v2-line-soft)'
    }}>
      <Avatar name={t.name} size={38} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
        <div style={{ fontSize: '0.76rem', color: 'var(--v2-muted)', marginTop: '0.1rem' }}>
          <Pill variant={t.reason.variant} style={{ marginRight: '0.35rem' }}>{t.reason.text}</Pill>
          {t.context}
        </div>
      </div>
      <Button size="sm" onClick={() => props.onAction(t)}>{t.cta}</Button>
    </div>
  )
}

export function CoachHome(props: { userName: string; programCount?: number }) {
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const history = useHistory()
  const toast = useToast()
  const [stats, setStats] = React.useState<DashboardStats>(EMPTY_STATS)
  const [attention, setAttention] = React.useState<AttentionItem[]>(EMPTY_ATTENTION)
  const [activity, setActivity] = React.useState<ActivityItem[]>(EMPTY_ACTIVITY)
  const [plans, setPlans] = React.useState<PlanItem[]>(EMPTY_PLANS)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!auth.user) {
      return
    }

    let active = true
    const api = createV2Api(firebase)
    setLoading(true)
    setError(null)

    api.getDashboardOverview(auth.user.uid).then(overview => {
      if (!active) return
      setStats(overview.stats)
      setAttention(overview.attention)
      setActivity(overview.activity)
      setPlans(overview.plans)
      setLoading(false)
    }).catch(fetchError => {
      if (!active) return
      setError(fetchError as Error)
      setLoading(false)
    })

    return () => { active = false }
  }, [auth.user, firebase])

  const firstName = auth.user?.firstName || props.userName.split(' ')[0]

  const openObservation = (teacher?: AttentionItem) => {
    if (!teacher) {
      history.push('/v2/observation')
      return
    }

    history.push(`/v2/observation?teacher=${encodeURIComponent(teacher.id)}&teacherName=${encodeURIComponent(teacher.name)}&classroom=${encodeURIComponent(teacher.context)}&session=Coaching check-in`)
  }

  const openAttentionAction = (teacher: AttentionItem) => {
    const cta = teacher.cta.toLowerCase()
    if (cta.includes('obs') || cta.includes('schedule')) {
      openObservation(teacher)
      return
    }
    if (cta.includes('plan')) {
      history.push('/v2/plans')
      return
    }
    history.push(`/v2/teachers/${encodeURIComponent(teacher.id)}?teacherName=${encodeURIComponent(teacher.name)}&program=${encodeURIComponent(teacher.context)}`)
  }

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Good morning, <span style={{ color: 'var(--v2-brand)', fontWeight: 800 }}>{firstName}</span>
          </h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            {stats.observationsThisWeek} observations this week and {stats.needAttention} teachers flagged for follow-up.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button onClick={() => { toast.info('Choose a teacher, then schedule from the teacher workflow.'); history.push('/v2/teachers') }}>📅 Schedule</Button>
          <Button variant="accent" onClick={() => openObservation()}>▶ Start observation</Button>
        </div>
      </div>

      {loading ? (
        <StatSkeleton />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <Stat tone="brand" icon="👥" label="Under coaching" value={String(stats.underCoaching)} delta={{ text: 'Active teacher links', trend: 'flat' }} />
          <Stat tone="warm" icon="⚠" label="Need attention" value={String(stats.needAttention)} delta={{ text: 'Derived from activity', trend: stats.needAttention > 0 ? 'warn' : 'flat' }} />
          <Stat tone="success" icon="✓" label="Observations this week" value={String(stats.observationsThisWeek)} delta={{ text: 'Live Firestore count', trend: 'up' }} />
          <Stat tone="gold" icon="📋" label="Action plans active" value={String(stats.activePlans)} delta={{ text: 'Open plan count', trend: 'up' }} />
        </div>
      )}

      {error && (
        <Card style={{ marginBottom: '1rem', borderColor: 'var(--v2-warm)' }}>
          <div style={{ color: 'var(--v2-warm-dark)', fontWeight: 600 }}>Unable to load live dashboard data.</div>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        <Card>
          <CardHeader
            title={<>Teachers needing attention <Pill variant="warn" style={{ background: 'var(--v2-warm)', color: '#fff' }}>{attention.length}</Pill></>}
            action={<button type="button" onClick={() => history.push('/v2/teachers')} style={{ color: 'var(--v2-brand-dark)', fontWeight: 600, padding: 0 }}>View all teachers →</button>}
          />
          {attention.length > 0 ? attention.map(t => <AttentionRow key={t.id} teacher={t} onAction={openAttentionAction} />) : (
            <EmptyState title="No teachers need attention" description="The current data range has no flagged teachers." />
          )}
        </Card>

        <div>
          <Card style={{ marginBottom: '1rem' }}>
            <CardHeader title="Recent activity" action={<button type="button" onClick={() => history.push('/v2/teachers')} style={{ color: 'var(--v2-brand-dark)', fontWeight: 600, padding: 0 }}>All →</button>} />
            {activity.length > 0 ? activity.map(a => <TimelineItem key={a.id} {...a} />) : (
              <EmptyState title="No recent activity" description="Recent observations, plans, emails, and training events will appear here." />
            )}
          </Card>

          <Card>
            <CardHeader title="Active action plans" />
            {plans.length > 0 ? plans.map(p => <PlanMini key={p.id} {...p} />) : (
              <EmptyState title="No active plans" description="Open action plans will appear here after they are created." />
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
