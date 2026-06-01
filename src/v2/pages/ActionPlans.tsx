import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import { Skeleton } from '../components/Skeleton'
import { Stat } from '../components/Stat'
import { useToast } from '../hooks/useToast'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'

type PlanKind = 'action' | 'conference'
type PlanStatus = 'draft' | 'active' | 'overdue' | 'sent' | 'complete'
type PlanFilter = 'active' | 'overdue' | 'sent' | 'conference' | 'all'

type PlanRow = {
  id: string
  kind: PlanKind
  title: string
  teacher: string
  teacherId: string
  classroom: string
  status: PlanStatus
  progress: number
  due: string
  updated: string
  focus: string
  owner: string
}

const DEMO_PLANS: PlanRow[] = [
  { id: 'demo-plan', kind: 'action', title: 'Reducing transition time', teacher: 'Morgan Lee', teacherId: '2', classroom: 'Toddler - River Center Demo', status: 'active', progress: 65, due: 'May 28, 2026', updated: 'Today 9:12 AM', focus: 'Transition Time', owner: 'Demo Coach' },
  { id: 'open-ended-questions', kind: 'action', title: 'Open-ended questions during centers', teacher: 'Alex Rivera', teacherId: '1', classroom: 'Pre-K - Demo Early Learning', status: 'overdue', progress: 40, due: 'May 24, 2026', updated: 'Yesterday 4:10 PM', focus: 'Language Modeling', owner: 'Demo Coach' },
  { id: 'classroom-climate-check', kind: 'conference', title: 'Classroom climate conference', teacher: 'Jamie Chen', teacherId: '3', classroom: 'Pre-K - Demo Early Learning', status: 'sent', progress: 100, due: 'Jun 4, 2026', updated: 'May 29 2:30 PM', focus: 'Conference Plan', owner: 'Site Lead' },
  { id: 'math-small-groups', kind: 'action', title: 'Math language in small groups', teacher: 'Emery Stone', teacherId: '10', classroom: 'Campus Demo Center', status: 'draft', progress: 15, due: 'Jun 10, 2026', updated: 'May 27 11:45 AM', focus: 'Math Instruction', owner: 'Demo Coach' },
  { id: 'family-conference', kind: 'conference', title: 'Family conference preparation', teacher: 'Jordan Patel', teacherId: '7', classroom: 'Northside Demo Academy', status: 'active', progress: 55, due: 'Jun 12, 2026', updated: 'May 26 1:20 PM', focus: 'Conference Plan', owner: 'Program Lead' }
]

const statusVariant: Record<PlanStatus, 'neutral' | 'warn' | 'danger' | 'success' | 'brand'> = {
  draft: 'neutral',
  active: 'brand',
  overdue: 'danger',
  sent: 'success',
  complete: 'success'
}

const statusLabel: Record<PlanStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  overdue: 'Overdue',
  sent: 'Sent',
  complete: 'Complete'
}

function filterLabel(filter: PlanFilter): string {
  if (filter === 'active') return 'Active'
  if (filter === 'overdue') return 'Overdue'
  if (filter === 'sent') return 'Sent'
  if (filter === 'conference') return 'Conference plans'
  return 'All'
}

function TabButton(props: { active: boolean; children: React.ReactNode; onClick(): void }) {
  return (
    <Button
      size="sm"
      onClick={props.onClick}
      style={{
        background: props.active ? 'var(--v2-ink)' : 'var(--v2-white)',
        color: props.active ? 'var(--v2-white)' : 'var(--v2-ink-soft)',
        borderColor: props.active ? 'var(--v2-ink)' : 'var(--v2-line)'
      }}
    >
      {props.children}
    </Button>
  )
}

function PlanCard(props: { plan: PlanRow; onOpen(plan: PlanRow): void; onTeacher(plan: PlanRow): void }) {
  const p = props.plan
  return (
    <Card padding="1rem" style={{ display: 'grid', gap: '0.85rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
            <Pill variant={p.kind === 'conference' ? 'warn' : 'brand'}>{p.kind === 'conference' ? 'Conference' : 'Action plan'}</Pill>
            <Pill variant={statusVariant[p.status]}>{statusLabel[p.status]}</Pill>
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--v2-ink)' }}>{p.title}</h3>
          <div style={{ fontSize: '0.82rem', color: 'var(--v2-muted)', marginTop: '0.2rem' }}>{p.focus} - {p.classroom}</div>
        </div>
        <Button size="sm" variant="primary" onClick={() => props.onOpen(p)}>Open</Button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Avatar name={p.teacher} size={32} />
        <button type="button" onClick={() => props.onTeacher(p)} style={{ fontWeight: 600, color: 'var(--v2-brand-darker)', padding: 0 }}>
          {p.teacher}
        </button>
        <span style={{ color: 'var(--v2-muted)', fontSize: '0.78rem' }}>Owner: {p.owner}</span>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--v2-muted)', marginBottom: '0.35rem' }}>
          <span>{p.progress}% complete</span>
          <span>Due {p.due}</span>
        </div>
        <div style={{ height: 7, background: 'var(--v2-bg-soft)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: `${p.progress}%`, height: '100%', background: p.status === 'overdue' ? 'var(--v2-warm)' : 'var(--v2-brand)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', color: 'var(--v2-muted)', fontSize: '0.76rem' }}>
        <span>Last updated {p.updated}</span>
        <span>{p.status === 'sent' ? 'Teacher-visible' : 'Coach workspace'}</span>
      </div>
    </Card>
  )
}

export function ActionPlans() {
  const history = useHistory()
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const toast = useToast()
  const [plans, setPlans] = React.useState<PlanRow[]>(DEMO_PLANS)
  const [filter, setFilter] = React.useState<PlanFilter>('active')
  const [search, setSearch] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!auth.user) {
      return
    }

    let active = true
    setLoading(true)
    setError(null)
    createV2Api(firebase).getActivePlans(auth.user.uid).then(items => {
      if (!active) return
      if (items.length > 0) {
        setPlans(items.map((item, index) => ({
          id: item.id || `live-${index}`,
          kind: 'action',
          title: item.title,
          teacher: item.forName,
          teacherId: item.id || `teacher-${index}`,
          classroom: 'Live CHALK plan',
          status: item.progress >= 100 ? 'complete' : 'active',
          progress: item.progress,
          due: item.due.replace(/^Due\s+/, ''),
          updated: 'Live data',
          focus: item.title,
          owner: 'Assigned coach'
        })))
      }
      setLoading(false)
    }).catch(fetchError => {
      if (!active) return
      setError(fetchError as Error)
      setLoading(false)
    })

    return () => { active = false }
  }, [auth.user, firebase])

  const normalized = search.trim().toLowerCase()
  const visiblePlans = plans.filter(plan => {
    const text = `${plan.title} ${plan.teacher} ${plan.classroom} ${plan.focus}`.toLowerCase()
    const matchesSearch = normalized === '' || text.includes(normalized)
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && (plan.status === 'active' || plan.status === 'draft')) ||
      (filter === 'overdue' && plan.status === 'overdue') ||
      (filter === 'sent' && plan.status === 'sent') ||
      (filter === 'conference' && plan.kind === 'conference')
    return matchesSearch && matchesFilter
  })

  const stats = {
    active: plans.filter(plan => plan.status === 'active' || plan.status === 'draft').length,
    overdue: plans.filter(plan => plan.status === 'overdue').length,
    sent: plans.filter(plan => plan.status === 'sent').length,
    conference: plans.filter(plan => plan.kind === 'conference').length
  }

  const openPlan = (plan: PlanRow) => history.push(`/v2/plans/${encodeURIComponent(plan.id)}`)
  const openTeacher = (plan: PlanRow) => history.push(`/v2/teachers/${encodeURIComponent(plan.teacherId)}?teacherName=${encodeURIComponent(plan.teacher)}&program=${encodeURIComponent(plan.classroom)}`)

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Plans workspace</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            Action plans and conference plans in one coach-friendly queue.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={() => toast.info('Conference plan creation stays in legacy until write rules are finalized.')}>+ Conference plan</Button>
          <Button variant="primary" onClick={() => history.push('/v2/plans/demo-plan')}>+ Action plan</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <Stat label="Active plans" value={stats.active} tone="brand" icon="A" delta={{ text: 'Drafts included', trend: 'flat' }} />
        <Stat label="Overdue" value={stats.overdue} tone="warm" icon="!" delta={{ text: 'Needs coach action', trend: stats.overdue > 0 ? 'warn' : 'flat' }} />
        <Stat label="Sent" value={stats.sent} tone="success" icon="S" delta={{ text: 'Teacher-visible', trend: 'up' }} />
        <Stat label="Conference" value={stats.conference} tone="gold" icon="C" delta={{ text: 'Separate workflow', trend: 'flat' }} />
      </div>

      <Card padding="1rem" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(['active', 'overdue', 'sent', 'conference', 'all'] as PlanFilter[]).map(item => (
              <TabButton key={item} active={filter === item} onClick={() => setFilter(item)}>{filterLabel(item)}</TabButton>
            ))}
          </div>
          <input
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search plans, teachers, focus areas"
            style={{ minWidth: 260, flex: '0 1 340px', border: '1px solid var(--v2-line)', borderRadius: 'var(--v2-radius-pill)', padding: '0.55rem 0.9rem', background: 'var(--v2-white)' }}
          />
        </div>
      </Card>

      {error && (
        <Card style={{ marginBottom: '1rem', borderColor: 'var(--v2-warm)' }}>
          <strong style={{ color: 'var(--v2-warm-dark)' }}>Live plans unavailable.</strong>
          <span style={{ color: 'var(--v2-muted)', marginLeft: '0.35rem' }}>Showing the preview-safe workspace data.</span>
        </Card>
      )}

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
          {[0, 1, 2].map(i => <Card key={i}><Skeleton height={140} /></Card>)}
        </div>
      ) : visiblePlans.length === 0 ? (
        <EmptyState title="No plans in this view" description="Change the filter or search term to see more plans." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem' }}>
          {visiblePlans.map(plan => <PlanCard key={plan.id} plan={plan} onOpen={openPlan} onTeacher={openTeacher} />)}
        </div>
      )}
    </div>
  )
}
