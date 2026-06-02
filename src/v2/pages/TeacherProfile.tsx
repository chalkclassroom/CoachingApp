import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import { Skeleton } from '../components/Skeleton'
import { Stat } from '../components/Stat'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'
import { TeacherRow } from '../lib/types'

type ProfileTeacher = TeacherRow & {
  classroom: string
  focus: string
  currentPlan: string
  lastObservation: string
  nextStep: string
}

const EMPTY_TEACHERS: ProfileTeacher[] = []

function fullName(teacher: { firstName: string; lastName: string }): string {
  return `${teacher.firstName} ${teacher.lastName}`.trim()
}

function fromRow(row: TeacherRow): ProfileTeacher {
  return {
    ...row,
    classroom: row.program,
    focus: row.lastAction.type === 'None' ? 'Initial coaching cycle' : row.lastAction.type,
    currentPlan: row.lastAction.type === 'Action Plan' ? 'Current action plan' : 'Coaching follow-up',
    lastObservation: row.lastAction.date,
    nextStep: row.actionCount > 0 ? 'Review recent evidence and choose the next coaching move.' : 'Start a baseline observation.'
  }
}

export function TeacherProfile() {
  const { teacherId } = useParams<{ teacherId: string }>()
  const history = useHistory()
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const params = new URLSearchParams(history.location.search)
  const queryName = params.get('teacherName') || ''
  const queryProgram = params.get('program') || ''
  const [teachers, setTeachers] = React.useState<ProfileTeacher[]>(EMPTY_TEACHERS)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!auth.user) {
      return
    }

    let active = true
    setLoading(true)
    setError(null)
    createV2Api(firebase).getTeachersForCoach(auth.user.uid).then(rows => {
      if (!active) return
      if (rows.length > 0) {
        setTeachers(rows.map(fromRow))
      }
      setLoading(false)
    }).catch(fetchError => {
      if (!active) return
      setError(fetchError as Error)
      setLoading(false)
    })

    return () => { active = false }
  }, [auth.user, firebase])

  const found = teachers.find(teacher => teacher.id === teacherId)
  const fallbackName = queryName || 'Selected teacher'
  const fallbackParts = fallbackName.split(' ')
  const teacher: ProfileTeacher = found || {
    id: teacherId,
    firstName: fallbackParts[0] || 'Selected',
    lastName: fallbackParts.slice(1).join(' ') || 'Teacher',
    role: 'teacher',
    program: queryProgram || 'Selected classroom',
    status: 'active',
    lastLogin: 'Never',
    loginCount: 0,
    actionCount: 0,
    lastAction: { type: 'None', date: 'Never' },
    classroom: queryProgram || 'Selected classroom',
    focus: 'Initial coaching cycle',
    currentPlan: 'No active plan loaded',
    lastObservation: 'None loaded',
    nextStep: 'Load live CHALK data or start a baseline observation.'
  }
  const name = fullName(teacher)

  const liveTimelineItems = teacher.lastAction.type === 'None' ? [] : [teacher.lastAction]
  const startObservation = () => history.push(`/v2/observation?teacher=${encodeURIComponent(teacher.id)}&teacherName=${encodeURIComponent(name)}&classroom=${encodeURIComponent(teacher.classroom || teacher.program)}&session=Coaching observation`)
  const message = () => history.push(`/v2/messages?teacher=${encodeURIComponent(teacher.id)}&teacherName=${encodeURIComponent(name)}&program=${encodeURIComponent(teacher.program)}`)
  const openPlans = () => history.push('/v2/plans')

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Avatar name={name} size={58} />
          <div>
            <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{name}</h1>
            <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
              {teacher.classroom} - {teacher.program}
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.45rem', flexWrap: 'wrap' }}>
              <Pill variant={teacher.status === 'active' ? 'success' : 'neutral'}>{teacher.status}</Pill>
              <Pill variant="brand">{teacher.focus}</Pill>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={message}>Message</Button>
          <Button onClick={openPlans}>View plans</Button>
          <Button variant="primary" onClick={startObservation}>Start observation</Button>
        </div>
      </div>

      {error && <div style={{ color: 'var(--v2-warm-dark)', fontWeight: 600, marginBottom: '1rem' }}>Live profile data unavailable.</div>}

      {loading ? (
        <Card><Skeleton height={160} /></Card>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <Stat label="Logins" value={teacher.loginCount} tone="brand" icon="L" delta={{ text: 'Last 30 days', trend: 'flat' }} />
            <Stat label="Actions" value={teacher.actionCount} tone="success" icon="A" delta={{ text: 'Coaching touches', trend: 'up' }} />
            <Stat label="Last login" value={teacher.lastLogin === 'Never' ? 'Never' : 'Recent'} tone="gold" icon="I" delta={{ text: teacher.lastLogin, trend: teacher.lastLogin === 'Never' ? 'warn' : 'flat' }} />
            <Stat label="Status" value={teacher.status === 'active' ? 'Active' : 'Archived'} tone="warm" icon="S" delta={{ text: teacher.role, trend: teacher.status === 'active' ? 'flat' : 'warn' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 0.95fr) minmax(420px, 1.35fr)', gap: '1rem' }}>
            <Card>
              <CardHeader title="Current coaching plan" />
              <h2 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{teacher.currentPlan}</h2>
              <p style={{ color: 'var(--v2-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{teacher.nextStep}</p>
              <div style={{ display: 'grid', gap: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}><strong>Focus</strong><span>{teacher.focus}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}><strong>Last observation</strong><span>{teacher.lastObservation}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}><strong>Last action</strong><span>{teacher.lastAction.type}</span></div>
              </div>
            </Card>

            <Card>
              <CardHeader title="Timeline" action={<button type="button" onClick={() => history.push('/v2/reports')} style={{ color: 'var(--v2-brand-dark)', fontWeight: 600, padding: 0 }}>View reports</button>} />
              {liveTimelineItems.length > 0 ? liveTimelineItems.map((item, index) => (
                <div key={`${item.type}-${index}`} style={{ display: 'flex', gap: '0.8rem', padding: '0.75rem 0', borderBottom: '1px solid var(--v2-line-soft)' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--v2-brand-soft)', color: 'var(--v2-brand-darker)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{index + 1}</div>
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>{item.type}</strong>
                    <div style={{ color: 'var(--v2-muted)', fontSize: '0.78rem' }}>{item.date}</div>
                  </div>
                </div>
              )) : (
                <EmptyState title="No recent live activity" description="This teacher has no loaded CHALK actions in the current data window." />
              )}
            </Card>
          </div>
        </>
      )}

      {!found && !queryName && (
        <div style={{ marginTop: '1rem' }}>
          <EmptyState title="No live teacher record loaded" description="This route has teacher context, but no matching live teacher row was returned for the current user." />
        </div>
      )}
    </div>
  )
}
