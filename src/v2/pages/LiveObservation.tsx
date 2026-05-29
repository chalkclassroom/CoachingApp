import * as React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { useToast } from '../hooks/useToast'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'
import { OBSERVATION_TYPE_OPTIONS, getObservationTypeOption, getStoredObservationType } from '../lib/observationTypes'

const TAGS = ['Listening', 'Sequential', 'Math', 'Literacy', 'SEL', 'Engagement', 'Transitions', 'Climate', 'Instruction']

function Tab(p: { active?: boolean; isNew?: boolean; children: React.ReactNode }) {
  return (
    <button style={{
      padding: '0.5rem 1.1rem',
      border: 'none',
      background: p.active ? 'var(--v2-white)' : 'transparent',
      fontSize: '0.85rem',
      fontWeight: 600,
      color: p.active ? 'var(--v2-brand-dark)' : 'var(--v2-muted)',
      borderRadius: 'var(--v2-radius-pill)',
      boxShadow: p.active ? 'var(--v2-shadow-sm)' : 'none',
      cursor: 'pointer'
    }}>
      {p.children}
      {p.isNew && (
        <span style={{ background: 'var(--v2-warm)', color: '#fff', fontSize: '0.62rem', padding: '0.08rem 0.4rem', borderRadius: 4, marginLeft: '0.4rem', fontWeight: 700, verticalAlign: 1 }}>NEW</span>
      )}
    </button>
  )
}

function Chip(p: { children: React.ReactNode }) {
  return (
    <span style={{
      background: 'var(--v2-bg-soft)',
      border: '1px solid var(--v2-line)',
      padding: '0.25rem 0.65rem',
      borderRadius: 'var(--v2-radius-pill)',
      fontSize: '0.76rem',
      fontWeight: 500,
      color: 'var(--v2-ink-soft)',
      cursor: 'pointer'
    }}>{p.children}</span>
  )
}

function Ts(p: { children: React.ReactNode }) {
  return <span style={{
    display: 'inline-block',
    background: 'var(--v2-brand-soft)',
    color: 'var(--v2-brand-darker)',
    padding: '0.1rem 0.5rem',
    borderRadius: 5,
    fontFamily: 'SF Mono, monospace',
    fontSize: '0.76rem',
    fontWeight: 700,
    marginRight: '0.5rem'
  }}>{p.children}</span>
}

function Tag(p: { children: React.ReactNode }) {
  return <span style={{
    display: 'inline-block',
    background: 'var(--v2-warm-soft)',
    color: 'var(--v2-warm-dark)',
    padding: '0.08rem 0.5rem',
    borderRadius: 4,
    fontSize: '0.76rem',
    fontWeight: 600
  }}>{p.children}</span>
}

function formatElapsed(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function LiveObservation() {
  const history = useHistory()
  const location = useLocation()
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const toast = useToast()
  const params = new URLSearchParams(location.search)
  const selectedCode = params.get('type')
  const teacherUid = params.get('teacher') || 'demo-teacher-1'
  const teacherName = params.get('teacherName') || 'Alex Rivera'
  const classroomName = params.get('classroom') || 'Demo Early Learning - Pre-K'
  const sessionName = params.get('session') || 'Morning circle'
  const selectedOption = getObservationTypeOption(selectedCode)
  const storedObservationType = getStoredObservationType(selectedCode)
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0)
  const [notes, setNotes] = React.useState('')
  const [draftStatus, setDraftStatus] = React.useState('Ready')
  const [paused, setPaused] = React.useState(false)
  const startedRef = React.useRef(false)

  const selectObservationType = (code: string) => {
    const next = new URLSearchParams(location.search)
    if (!next.get('teacher')) {
      next.set('teacher', teacherUid)
    }
    if (!next.get('teacherName')) {
      next.set('teacherName', teacherName)
    }
    if (!next.get('classroom')) {
      next.set('classroom', classroomName)
    }
    if (!next.get('session')) {
      next.set('session', sessionName)
    }
    next.set('type', code)
    history.push({ pathname: location.pathname, search: `?${next.toString()}` })
  }

  const startNewObservation = () => {
    history.push({
      pathname: '/v2/observation',
      search: `?teacher=${encodeURIComponent(teacherUid)}&teacherName=${encodeURIComponent(teacherName)}&classroom=${encodeURIComponent(classroomName)}&session=${encodeURIComponent(sessionName)}`
    })
  }

  React.useEffect(() => {
    if (!selectedOption || paused) {
      return
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds(current => current + 1)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [paused, selectedOption])

  React.useEffect(() => {
    if (!selectedOption || !storedObservationType || !auth.user || startedRef.current) {
      return
    }

    startedRef.current = true
    createV2Api(firebase).startObservation(auth.user.uid, teacherUid, selectedOption.code).catch(error => {
      console.error('Unable to start v2 observation session', error)
      startedRef.current = false
    })
  }, [auth.user, firebase, selectedOption, storedObservationType, teacherUid])

  React.useEffect(() => {
    if (!selectedOption || !storedObservationType) {
      return
    }

    setDraftStatus('Saving...')
    const timeout = window.setTimeout(() => {
      const draft = {
        teacherUid,
        typeCode: selectedOption.code,
        storedType: storedObservationType,
        notes,
        elapsedSeconds,
        updatedAt: new Date()
      }

      window.localStorage.setItem('chalk-v2-observation-draft', JSON.stringify(draft))

      if (!auth.user) {
        setDraftStatus('Saved locally')
        return
      }

      firebase.db.collection('users').doc(auth.user.uid).set({ observationDraft: draft }, { merge: true })
        .then(() => setDraftStatus('Auto-saved'))
        .catch(error => {
          console.error('Unable to save v2 observation draft', error)
          setDraftStatus('Saved locally')
        })
    }, 900)

    return () => window.clearTimeout(timeout)
  }, [auth.user, elapsedSeconds, firebase, notes, selectedOption, storedObservationType, teacherUid])

  const insertTag = (tag: string) => {
    setNotes(current => `${current}${current ? '\n' : ''}[${formatElapsed(elapsedSeconds)}] ${tag}: `)
    toast.info(`${tag} tag added to notes.`)
  }

  const endObservation = () => {
    if (!auth.user) {
      toast.info('Observation draft saved locally for preview.')
      return
    }

    createV2Api(firebase).endObservation()
      .then(() => toast.success('Observation completed.'))
      .catch(error => {
        console.error('Unable to end v2 observation', error)
        toast.error('Unable to complete observation.')
      })
  }

  if (!selectedOption || !storedObservationType) {
    return (
      <div style={{ padding: '2rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Pick what you're observing</h1>
            <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
              Choose one of the legacy-compatible CHALK observation types before starting a session.
            </div>
          </div>
          <Button onClick={() => history.push('/v2/home')}>Cancel</Button>
        </div>

        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.8rem' }}>
            {OBSERVATION_TYPE_OPTIONS.map(option => (
              <button
                key={option.code}
                type="button"
                onClick={() => selectObservationType(option.code)}
                style={{
                  textAlign: 'left',
                  background: 'var(--v2-white)',
                  border: '1px solid var(--v2-line)',
                  borderRadius: 8,
                  padding: '1rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--v2-shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 34,
                    height: 28,
                    background: 'var(--v2-brand-soft)',
                    color: 'var(--v2-brand-darker)',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    fontWeight: 800
                  }}>{option.code}</span>
                  <strong style={{ color: 'var(--v2-ink)', fontSize: '0.92rem' }}>{option.label}</strong>
                </div>
                <p style={{ color: 'var(--v2-muted)', fontSize: '0.82rem', lineHeight: 1.45, margin: 0 }}>{option.description}</p>
                <div style={{ color: 'var(--v2-ink-soft)', fontSize: '0.74rem', marginTop: '0.7rem', fontWeight: 600 }}>
                  Stores as: {option.storedType}{option.requiresChecklist ? ' + checklist' : ''}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Live observation — <span style={{ color: 'var(--v2-brand)', fontWeight: 800 }}>{teacherName}</span>
          </h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            {classroomName} · {sessionName} session
          </div>
          <div style={{ color: 'var(--v2-ink-soft)', fontSize: '0.78rem', marginTop: '0.45rem', fontWeight: 600 }}>
            Observation type: {selectedOption.code} stores as {storedObservationType}{selectedOption.requiresChecklist ? ' + checklist' : ''}
          </div>
        </div>
        <Button onClick={() => history.push('/v2/home')}>Cancel</Button>
      </div>

      {/* Mode tabs + auto-save */}
      <div style={{
        background: 'var(--v2-white)',
        borderRadius: 'var(--v2-radius)',
        padding: '1rem 1.25rem',
        border: '1px solid var(--v2-line-soft)',
        boxShadow: 'var(--v2-shadow-sm)',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '0.3rem', background: 'var(--v2-bg-soft)', padding: 4, borderRadius: 'var(--v2-radius-pill)' }}>
          <Tab active isNew>Open mode</Tab>
          <Tab>Framework mode</Tab>
          <Tab>Quick checklist</Tab>
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          background: 'var(--v2-success-soft)',
          color: 'var(--v2-success)',
          padding: '0.35rem 0.85rem',
          borderRadius: 'var(--v2-radius-pill)',
          fontSize: '0.78rem', fontWeight: 600
        }}>
          <span style={{
            width: 8, height: 8, background: 'var(--v2-success)', borderRadius: '50%',
            display: 'inline-block'
          }} />
          {draftStatus}
        </span>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        <Card>
          {/* Context */}
          <div style={{
            display: 'flex', gap: '1.5rem',
            paddingBottom: '1.1rem',
            borderBottom: '1px solid var(--v2-line)',
            marginBottom: '1.25rem',
            alignItems: 'flex-end'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--v2-muted)', marginBottom: '0.25rem' }}>Teacher</div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{teacherName}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--v2-muted)', marginBottom: '0.25rem' }}>Classroom</div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{classroomName}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--v2-muted)', marginBottom: '0.25rem' }}>Session</div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{sessionName}</div>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--v2-muted)', marginBottom: '0.25rem' }}>Elapsed</div>
              <div style={{ fontFamily: 'SF Mono, monospace', fontSize: '2.1rem', fontWeight: 700, color: 'var(--v2-brand)', letterSpacing: '-0.03em', lineHeight: 1 }}>{formatElapsed(elapsedSeconds)}</div>
            </div>
          </div>

          {/* Notes */}
          <div style={{
            minHeight: 280,
            border: '1px solid var(--v2-line)',
            borderRadius: 10,
            padding: '1.1rem',
            fontSize: '0.92rem',
            lineHeight: 1.75,
            color: 'var(--v2-ink-soft)',
            background: 'var(--v2-bg-soft)'
          }}>
            <p style={{ marginBottom: '0.8rem' }}><Ts>00:42</Ts>Started with welcome song. <Tag>SEL</Tag> Dawn sat at child-level. Two children joined late, she paused and re-welcomed them — nice.</p>
            <p style={{ marginBottom: '0.8rem' }}><Ts>02:15</Ts>Open-ended Q: "What do you think happens when we mix red and blue?" — got 4 different responses, validated each. <Tag>Magic 9 · Listening</Tag></p>
            <p style={{ marginBottom: '0.8rem' }}><Ts>05:48</Ts>Transition to centers — felt rushed, two kids didn't have direction. Worth flagging for action plan.</p>
            <p style={{ marginBottom: '0.8rem' }}><Ts>09:10</Ts>Reading time. Voice modulation strong. Pacing held attention.</p>
            <p style={{ marginBottom: '0.8rem' }}><Ts>12:30</Ts>Center cleanup → next activity. Better than transition #1, used a song to cue.</p>
            <p style={{ color: 'var(--v2-muted)', fontStyle: 'italic' }}>Keep typing — auto-saving as you go.</p>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.currentTarget.value)}
              placeholder="Add live observation notes..."
              style={{
                width: '100%',
                minHeight: 130,
                marginTop: '1rem',
                border: '1px solid var(--v2-line)',
                borderRadius: 8,
                padding: '0.9rem',
                background: 'var(--v2-white)',
                resize: 'vertical',
                lineHeight: 1.55
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.1rem', paddingTop: '1.1rem', borderTop: '1px solid var(--v2-line)' }}>
            <Button onClick={() => toast.info('Photo capture is outside this release; attach evidence in legacy CHALK for now.')}>📸 Photo</Button>
            <Button onClick={() => toast.info('Audio capture is outside this release; use written notes for this sprint.')}>🎙 Audio</Button>
            <Button onClick={() => insertTag(selectedOption.label)}>🏷 Tag</Button>
            <Button onClick={startNewObservation}>Switch type</Button>
            <Button onClick={() => setPaused(current => !current)}>{paused ? '▶ Resume' : '⏸ Pause'}</Button>
            <div style={{ flex: 1 }} />
            <Button variant="primary" onClick={endObservation}>End &amp; align to framework →</Button>
          </div>
        </Card>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card padding="1.15rem">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>🎯 Magic 9 quick tags</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {TAGS.map(t => <button key={t} type="button" onClick={() => insertTag(t)} style={{ border: 'none', padding: 0, background: 'transparent' }}><Chip>{t}</Chip></button>)}
            </div>
          </Card>

          <Card padding="1.15rem">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>⚡ Shortcuts</h4>
            {[['Timestamp', '⌘ T'], ['Insert tag', '⌘ K'], ['Add photo', '⌘ P'], ['End session', '⌘ ↵']].map(([label, key]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0', fontSize: '0.82rem' }}>
                <span>{label}</span>
                <kbd style={{ background: 'var(--v2-bg-soft)', border: '1px solid var(--v2-line)', padding: '0.15rem 0.45rem', borderRadius: 5, fontFamily: 'SF Mono, monospace', fontSize: '0.72rem' }}>{key}</kbd>
              </div>
            ))}
          </Card>

          <Card padding="1.15rem">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>📌 Last observation</h4>
            <div style={{ fontSize: '0.84rem', color: 'var(--v2-muted)', lineHeight: 1.55 }}>
              <strong style={{ color: 'var(--v2-ink)', display: 'block', marginBottom: '0.2rem' }}>Apr 28 — Morning circle</strong>
              Strengths in Listening, opportunity in Transitions.{' '}
              <a href="#" style={{ color: 'var(--v2-brand-dark)', fontWeight: 600 }}>View →</a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
