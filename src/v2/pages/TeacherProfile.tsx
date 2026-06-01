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

const DEMO_TEACHERS: ProfileTeacher[] = [
  { id: '1', firstName: 'Alex', lastName: 'Rivera', role: 'teacher', program: 'Demo Early Learning', status: 'active', lastLogin: '5/19/26, 8:32 AM', loginCount: 14, actionCount: 8, lastAction: { type: 'Observation', date: '5/18/26, 2:14 PM' }, classroom: 'Pre-K', focus: 'Open-ended questions', currentPlan: 'Open-ended questions during centers', lastObservation: 'May 18, 2026', nextStep: 'Capture two examples of child-led responses.' },
  { id: '2', firstName: 'Morgan', lastName: 'Lee', role: 'teacher', program: 'River Center Demo', status: 'active', lastLogin: '5/20/26, 9:15 AM', loginCount: 22, actionCount: 12, lastAction: { type: 'Action Plan', date: '5/19/26, 4:42 PM' }, classroom: 'Toddler', focus: 'Transition Time', currentPlan: 'Reducing transition time', lastObservation: 'May 19, 2026', nextStep: 'Time handwashing transition and compare against baseline.' },
  { id: '3', firstName: 'Jamie', lastName: 'Chen', role: 'teacher', program: 'Demo Early Learning', status: 'active', lastLogin: '5/14/26, 9:05 PM', loginCount: 7, actionCount: 3, lastAction: { type: 'Observation', date: '5/14/26, 9:05 PM' }, classroom: 'Pre-K', focus: 'Classroom Climate', currentPlan: 'Classroom climate conference', lastObservation: 'May 14, 2026', nextStep: 'Prepare a strengths-first feedback note.' }
]

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
  const [teachers, setTeachers] = React.useState<ProfileTeacher[]>(DEMO_TEACHERS)
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
  const teacher = found || {
    ...DEMO_TEACHERS[0],
    id: teacherId,
    firstName: fallbackParts[0] || 'Selected',
    lastName: fallbackParts.slice(1).join(' ') || 'Teacher',
    program: queryProgram || 'Selected classroom',
    classroom: queryProgram || 'Selected classroom'
  }
  const name = fullName(teacher)

  const startObservation = () => history.push(`/v2/observation?teacher=${encodeURIComponent(teacher.id)}&teacherName=${encodeURIComponent(name)}&classroom=${encodeURIComponent(teacher.classroom || teacher.program)}&session=Coaching observation`)
  const message = () => history.push(`/v2/messages?teacher=${encodeURIComponent(teacher.id)}&teacherName=${encodeURIComponent(name)}&program=${encodeURIComponent(teacher.program)}`)

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
          <Button onClick={() => history.push('/v2/plans/demo-plan')}>Open plan</Button>
          <Button variant="primary" onClick={startObservation}>Start observation</Button>
        </div>
      </div>

      {error && <div style={{ color: 'var(--v2-warm-dark)', fontWeight: 600, marginBottom: '1rem' }}>Live profile data unavailable; showing preview-safe profile.</div>}

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
              {[teacher.lastAction, { type: 'Plan update', date: 'May 20, 2026' }, { type: 'Teacher message', date: 'May 19, 2026' }].map((item, index) => (
                <div key={`${item.type}-${index}`} style={{ display: 'flex', gap: '0.8rem', padding: '0.75rem 0', borderBottom: '1px solid var(--v2-line-soft)' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--v2-brand-soft)', color: 'var(--v2-brand-darker)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{index + 1}</div>
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>{item.type}</strong>
                    <div style={{ color: 'var(--v2-muted)', fontSize: '0.78rem' }}>{item.date}</div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </>
      )}

      {!found && !queryName && (
        <div style={{ marginTop: '1rem' }}>
          <EmptyState title="Teacher loaded from preview fallback" description="This route is ready for live teacher IDs once the data contract is finalized." />
        </div>
      )}
    </div>
  )
}
