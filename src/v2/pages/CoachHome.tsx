import * as React from 'react'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { Pill } from '../components/Pill'
import { Stat } from '../components/Stat'

type AttentionTeacher = {
  id: string
  name: string
  reason: { text: string; variant: 'warn' | 'danger' | 'neutral' }
  context: string
  cta: string
}

type ActivityItem = {
  title: string
  meta: string
  tone: 'success' | 'brand' | 'warn'
}

type PlanItem = {
  title: string
  forName: string
  progress: number
  due: string
}

const STUB_ATTENTION: AttentionTeacher[] = [
  { id: 'dj', name: 'Dawn Johnson', reason: { text: 'No observation in 45d', variant: 'danger' }, context: 'Pre-K · Preschool Promise', cta: 'Schedule obs' },
  { id: 'cg', name: 'Chrystaline Glenn', reason: { text: 'Action plan overdue', variant: 'warn' }, context: 'Toddler · All Our Children Elite', cta: 'Open plan' },
  { id: 'kl', name: 'Kerry Leedy', reason: { text: 'Magic 9 score dropped', variant: 'warn' }, context: 'Pre-K · Preschool Promise', cta: 'Send check-in' },
  { id: 'sw', name: 'Shonnell Wilkins', reason: { text: 'No activity recently', variant: 'neutral' }, context: 'Infant · All Our Children Elite', cta: 'Send check-in' }
]

const STUB_ACTIVITY: ActivityItem[] = [
  { title: 'Observation completed', meta: 'Chrystaline Glenn · 22 min ago', tone: 'success' },
  { title: 'Note sent to teacher', meta: 'Dawn Johnson · 1h ago', tone: 'brand' },
  { title: 'Action plan flagged overdue', meta: 'Chrystaline Glenn · 3h ago', tone: 'warn' },
  { title: 'Training completed', meta: 'Kerry Leedy · Classroom Climate · Yesterday', tone: 'success' }
]

const STUB_PLANS: PlanItem[] = [
  { title: 'Reducing transition time', forName: 'Chrystaline G.', progress: 65, due: 'Due May 28' },
  { title: 'Open-ended questions', forName: 'Dawn J.', progress: 30, due: 'Due Jun 3' }
]

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

function AttentionRow(props: { teacher: AttentionTeacher }) {
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
      <Button size="sm">{t.cta}</Button>
    </div>
  )
}

export function CoachHome(props: { userName: string; programCount?: number }) {
  const firstName = props.userName.split(' ')[0]

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      {/* Greeting */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Good morning, <span style={{ color: 'var(--v2-brand)', fontWeight: 800 }}>{firstName}</span>
          </h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            You have 3 observations scheduled today and 2 teachers flagged for follow-up.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button>📅 Schedule</Button>
          <Button variant="accent">▶ Start observation</Button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <Stat tone="brand" icon="👥" label="Under coaching" value="12" delta={{ text: 'No change this week', trend: 'flat' }} />
        <Stat tone="warm" icon="⚠" label="Need attention" value="4" delta={{ text: '↑ 2 since last week', trend: 'warn' }} />
        <Stat tone="success" icon="✓" label="Observations this week" value="8" delta={{ text: '↑ 33% vs avg', trend: 'up' }} />
        <Stat tone="gold" icon="📋" label="Action plans active" value="6" delta={{ text: '2 due Friday', trend: 'up' }} />
      </div>

      {/* Two-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        <Card>
          <CardHeader
            title={<>Teachers needing attention <Pill variant="warn" style={{ background: 'var(--v2-warm)', color: '#fff' }}>4</Pill></>}
            action="View all teachers →"
          />
          {STUB_ATTENTION.map(t => <AttentionRow key={t.id} teacher={t} />)}
        </Card>

        <div>
          <Card style={{ marginBottom: '1rem' }}>
            <CardHeader title="Recent activity" action="All →" />
            {STUB_ACTIVITY.map((a, i) => <TimelineItem key={i} {...a} />)}
          </Card>

          <Card>
            <CardHeader title="Active action plans" />
            {STUB_PLANS.map((p, i) => <PlanMini key={i} {...p} />)}
          </Card>
        </div>
      </div>
    </div>
  )
}
