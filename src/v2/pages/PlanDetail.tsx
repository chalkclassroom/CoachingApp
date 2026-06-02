import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Skeleton } from '../components/Skeleton'
import { useToast } from '../hooks/useToast'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'
import { ConferencePlanDetail, PlanComment, PlanDetail as V2PlanDetail, PlanStep } from '../lib/types'

const EMPTY_PLAN: V2PlanDetail = {
  id: "",
  title: "Untitled action plan",
  teacherId: "",
  teacherName: "Teacher",
  goal: "",
  benefit: "",
  dueDate: null,
  progress: 0,
  steps: [],
  comments: []
}

const EMPTY_CONFERENCE_PLAN: ConferencePlanDetail = {
  id: "",
  teacherId: "",
  teacherName: "Teacher",
  sessionId: "",
  practice: "Conference plan",
  updatedAt: null,
  feedback: [""],
  questions: [""],
  addedQuestions: [],
  notes: [""]
}

function dateInputValue(date: Date | null): string {
  if (!date) return ''
  return date.toISOString().slice(0, 10)
}

function formatDueDate(date: Date | null): string {
  return date ? date.toLocaleDateString() : 'No due date'
}

function Field(p: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: '1px solid var(--v2-line)',
      borderRadius: 8,
      padding: '0.7rem 0.9rem',
      background: 'var(--v2-bg-soft)',
      fontSize: '0.88rem'
    }}>
      <strong style={{
        display: 'block',
        fontSize: '0.68rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: 'var(--v2-brand-dark)',
        fontWeight: 700,
        marginBottom: '0.25rem'
      }}>{p.label}</strong>
      {p.children}
    </div>
  )
}

function Comment(p: PlanComment) {
  return (
    <div style={{ display: 'flex', gap: '0.65rem', padding: '0.85rem 0', borderBottom: '1px solid var(--v2-line-soft)' }}>
      <Avatar name={p.name} size={30} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'baseline', fontSize: '0.78rem', marginBottom: '0.2rem' }}>
          <strong style={{ fontSize: '0.82rem' }}>{p.name}</strong>
          <span style={{ color: 'var(--v2-muted)' }}>{p.time}</span>
        </div>
        <div style={{ fontSize: '0.86rem', color: 'var(--v2-ink-soft)' }}>{p.text}</div>
      </div>
    </div>
  )
}

function EditableTextArea(props: { value: string; onChange(value: string): void; minHeight?: number; placeholder?: string }) {
  return (
    <textarea
      value={props.value}
      onChange={(event) => props.onChange(event.currentTarget.value)}
      placeholder={props.placeholder}
      style={{
        width: '100%',
        minHeight: props.minHeight || 110,
        border: '1px solid var(--v2-line)',
        borderRadius: 8,
        padding: '0.8rem',
        background: 'var(--v2-white)',
        color: 'var(--v2-ink)',
        resize: 'vertical',
        lineHeight: 1.55
      }}
    />
  )
}

function ConferenceListEditor(props: {
  title: string
  items: string[]
  placeholder: string
  onChange(index: number, value: string): void
  onAdd(): void
}) {
  const items = props.items.length > 0 ? props.items : [""]
  return (
    <Card padding="1.35rem">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', gap: '0.75rem', flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{props.title}</h3>
        <Button size="sm" onClick={props.onAdd}>+ Add</Button>
      </div>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {items.map((item, index) => (
          <EditableTextArea
            key={index}
            value={item}
            minHeight={90}
            placeholder={props.placeholder}
            onChange={(value) => props.onChange(index, value)}
          />
        ))}
      </div>
    </Card>
  )
}

export function PlanDetail() {
  const { planId } = useParams<{ planId?: string }>()
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const toast = useToast()
  const [plan, setPlan] = React.useState<V2PlanDetail>(EMPTY_PLAN)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [savedLabel, setSavedLabel] = React.useState('Saved locally')
  const [conferencePlan, setConferencePlan] = React.useState<ConferencePlanDetail>(EMPTY_CONFERENCE_PLAN)
  const [commentText, setCommentText] = React.useState('')
  const [showSendConfirm, setShowSendConfirm] = React.useState(false)
  const [sending, setSending] = React.useState(false)
  const isConferencePlan = Boolean(planId && planId.startsWith('conference-'))
  const realConferencePlanId = isConferencePlan && planId ? planId.replace(/^conference-/, '') : ''
  const realPlanId = !isConferencePlan && planId && planId !== 'demo-plan' ? planId : ''
  const serializedSteps = JSON.stringify(plan.steps.map(step => ({
    step: step.step,
    person: step.person,
    timeline: step.timeline ? step.timeline.toISOString() : null
  })))
  const serializedConferencePlan = JSON.stringify({
    feedback: conferencePlan.feedback,
    questions: conferencePlan.questions,
    addedQuestions: conferencePlan.addedQuestions,
    notes: conferencePlan.notes
  })

  React.useEffect(() => {
    if (isConferencePlan) {
      return
    }

    if (!realPlanId || !auth.user) {
      const cached = window.localStorage.getItem('chalk-v2-plan-draft')
      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          setPlan({ ...EMPTY_PLAN, ...parsed, dueDate: parsed.dueDate ? new Date(parsed.dueDate) : EMPTY_PLAN.dueDate })
        } catch (error) {
          console.error('Unable to parse local v2 plan draft', error)
        }
      }
      return
    }

    let active = true
    setLoading(true)
    setError(null)
    createV2Api(firebase).getActionPlanFull(realPlanId).then(nextPlan => {
      if (!active) return
      if (nextPlan) {
        setPlan(nextPlan)
        setSavedLabel('Loaded from CHALK')
      }
      setLoading(false)
    }).catch(fetchError => {
      if (!active) return
      setError(fetchError as Error)
      setLoading(false)
    })

    return () => { active = false }
  }, [auth.user, firebase, isConferencePlan, realPlanId])

  React.useEffect(() => {
    if (!isConferencePlan || !realConferencePlanId || !auth.user) {
      return
    }

    let active = true
    setLoading(true)
    setError(null)
    createV2Api(firebase).getConferencePlanFull(realConferencePlanId).then(nextPlan => {
      if (!active) return
      if (nextPlan) {
        setConferencePlan(nextPlan)
        setSavedLabel('Loaded from CHALK')
      }
      setLoading(false)
    }).catch(fetchError => {
      if (!active) return
      setError(fetchError as Error)
      setLoading(false)
    })

    return () => { active = false }
  }, [auth.user, firebase, isConferencePlan, realConferencePlanId])

  React.useEffect(() => {
    if (isConferencePlan) {
      return
    }

    if (loading) {
      return
    }

    setSavedLabel(auth.user && realPlanId ? 'Saving...' : 'Saving locally...')
    const timeout = window.setTimeout(() => {
      if (!auth.user || !realPlanId) {
        window.localStorage.setItem('chalk-v2-plan-draft', JSON.stringify({
          ...plan,
          dueDate: plan.dueDate ? plan.dueDate.toISOString() : null
        }))
        setSavedLabel('Saved locally')
        return
      }

      createV2Api(firebase).saveActionPlanDraft(realPlanId, {
        title: plan.title,
        goal: plan.goal,
        benefit: plan.benefit,
        dueDate: plan.dueDate,
        steps: plan.steps
      }).then(() => {
        setSavedLabel('Auto-saved')
      }).catch(saveError => {
        console.error('Unable to autosave v2 action plan', saveError)
        setSavedLabel('Save failed')
      })
    }, 900)

    return () => window.clearTimeout(timeout)
  }, [auth.user, firebase, isConferencePlan, loading, plan.benefit, plan.dueDate, plan.goal, plan.title, realPlanId, serializedSteps])

  React.useEffect(() => {
    if (!isConferencePlan || loading) {
      return
    }

    setSavedLabel(auth.user && realConferencePlanId ? 'Saving...' : 'Saving locally...')
    const timeout = window.setTimeout(() => {
      if (!auth.user || !realConferencePlanId) {
        window.localStorage.setItem('chalk-v2-conference-plan-draft', JSON.stringify(conferencePlan))
        setSavedLabel('Saved locally')
        return
      }

      createV2Api(firebase).saveConferencePlanDraft(realConferencePlanId, {
        feedback: conferencePlan.feedback,
        questions: conferencePlan.questions,
        addedQuestions: conferencePlan.addedQuestions,
        notes: conferencePlan.notes
      }).then(() => {
        setSavedLabel('Auto-saved')
      }).catch(saveError => {
        console.error('Unable to autosave v2 conference plan', saveError)
        setSavedLabel('Save failed')
      })
    }, 900)

    return () => window.clearTimeout(timeout)
  }, [auth.user, conferencePlan, firebase, isConferencePlan, loading, realConferencePlanId, serializedConferencePlan])

  const updatePlan = (patch: Partial<V2PlanDetail>) => {
    setPlan(current => ({ ...current, ...patch }))
  }

  const updateConferenceList = (field: 'feedback' | 'questions' | 'addedQuestions' | 'notes', index: number, value: string) => {
    setConferencePlan(current => ({
      ...current,
      [field]: (current[field].length > 0 ? current[field] : ['']).map((item, itemIndex) => itemIndex === index ? value : item)
    }))
  }

  const addConferenceItem = (field: 'feedback' | 'questions' | 'addedQuestions' | 'notes') => {
    setConferencePlan(current => ({
      ...current,
      [field]: [...current[field], '']
    }))
  }

  const updateStep = (index: number, patch: Partial<PlanStep>) => {
    setPlan(current => ({
      ...current,
      steps: current.steps.map((step, stepIndex) => stepIndex === index ? { ...step, ...patch } : step)
    }))
  }

  const addStep = () => {
    setPlan(current => ({
      ...current,
      steps: [...current.steps, { step: '', person: '', timeline: null }]
    }))
  }

  const addComment = () => {
    const text = commentText.trim()
    if (!text) {
      return
    }

    const authorName = auth.user ? `${auth.user.firstName} ${auth.user.lastName}`.trim() || 'CHALK user' : 'Preview coach'
    setCommentText('')

    if (!auth.user || !realPlanId) {
      setPlan(current => ({
        ...current,
        comments: [...current.comments, { id: `local-${Date.now()}`, name: authorName, time: new Date().toLocaleString(), text }]
      }))
      toast.info('Comment saved locally for preview.')
      return
    }

    createV2Api(firebase).addActionPlanComment(realPlanId, { authorName, authorId: auth.user.uid, text })
      .then(comment => {
        setPlan(current => ({ ...current, comments: [...current.comments, comment] }))
        toast.success('Comment added.')
      })
      .catch(commentError => {
        console.error('Unable to add v2 plan comment', commentError)
        toast.error('Unable to add comment.')
      })
  }

  const sendToTeacher = () => {
    if (!auth.user || !realPlanId) {
      toast.info('Send-to-teacher is ready for live plans after staging signoff.')
      return
    }

    setShowSendConfirm(true)
  }

  const confirmSendToTeacher = () => {
    if (!auth.user || !realPlanId || sending) {
      return
    }

    setSending(true)
    createV2Api(firebase).markActionPlanSentToTeacher(realPlanId, auth.user.uid)
      .then(() => {
        setShowSendConfirm(false)
        setSending(false)
        toast.success('Plan marked as sent to teacher.')
      })
      .catch(sendError => {
        console.error('Unable to mark v2 plan as sent', sendError)
        setSending(false)
        toast.error('Unable to send plan.')
      })
  }

  if (loading) {
    return (
      <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
        <Skeleton width="40%" height={32} style={{ marginBottom: '1rem' }} />
        <Skeleton height={240} />
      </div>
    )
  }

  if (isConferencePlan) {
    return (
      <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--v2-muted)', marginBottom: '0.3rem' }}>
              Conference Plans / {conferencePlan.teacherName}
            </div>
            <h1 style={{ color: 'var(--v2-ink)', fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
              {conferencePlan.practice || 'Conference plan'}
            </h1>
            <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
              For {conferencePlan.teacherName} · session {conferencePlan.sessionId || 'not linked'}
            </div>
            {error && (
              <div style={{ color: 'var(--v2-warm-dark)', fontSize: '0.82rem', marginTop: '0.4rem', fontWeight: 600 }}>
                Live conference plan unavailable; edits are held locally.
              </div>
            )}
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: savedLabel === 'Save failed' ? 'var(--v2-warm-soft)' : 'var(--v2-success-soft)',
            color: savedLabel === 'Save failed' ? 'var(--v2-warm-dark)' : 'var(--v2-success)',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--v2-radius-pill)',
            fontSize: '0.78rem', fontWeight: 600
          }}>{savedLabel}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          <ConferenceListEditor
            title="Feedback prompts"
            items={conferencePlan.feedback}
            placeholder="Feedback or reflection prompt"
            onChange={(index, value) => updateConferenceList('feedback', index, value)}
            onAdd={() => addConferenceItem('feedback')}
          />
          <ConferenceListEditor
            title="Core questions"
            items={conferencePlan.questions}
            placeholder="Question for the conference"
            onChange={(index, value) => updateConferenceList('questions', index, value)}
            onAdd={() => addConferenceItem('questions')}
          />
          <ConferenceListEditor
            title="Added questions"
            items={conferencePlan.addedQuestions}
            placeholder="Additional question"
            onChange={(index, value) => updateConferenceList('addedQuestions', index, value)}
            onAdd={() => addConferenceItem('addedQuestions')}
          />
          <ConferenceListEditor
            title="Notes"
            items={conferencePlan.notes}
            placeholder="Conference notes"
            onChange={(index, value) => updateConferenceList('notes', index, value)}
            onAdd={() => addConferenceItem('notes')}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--v2-muted)', marginBottom: '0.3rem' }}>
            Action Plans / {plan.teacherName}
          </div>
          <input
            value={plan.title}
            onChange={(event) => updatePlan({ title: event.currentTarget.value })}
            style={{
              width: '100%',
              maxWidth: 620,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: 'var(--v2-ink)',
              fontSize: '1.7rem',
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}
          />
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            For {plan.teacherName} · due {formatDueDate(plan.dueDate)}
          </div>
          {error && (
            <div style={{ color: 'var(--v2-warm-dark)', fontSize: '0.82rem', marginTop: '0.4rem', fontWeight: 600 }}>
              Live plan unavailable; showing editable local draft.
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: savedLabel === 'Save failed' ? 'var(--v2-warm-soft)' : 'var(--v2-success-soft)',
            color: savedLabel === 'Save failed' ? 'var(--v2-warm-dark)' : 'var(--v2-success)',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--v2-radius-pill)',
            fontSize: '0.78rem', fontWeight: 600
          }}>{savedLabel}</span>
          <Button variant="primary" onClick={sendToTeacher}>📨 Send to teacher</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        <div>
          <Card style={{ marginBottom: '0.85rem' }} padding="1.35rem">
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>🎯 Goal</h3>
            <EditableTextArea value={plan.goal} onChange={(goal) => updatePlan({ goal })} />
          </Card>

          <Card style={{ marginBottom: '0.85rem' }} padding="1.35rem">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>📋 Action steps</h3>
              <Button size="sm" onClick={addStep}>+ Step</Button>
            </div>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {plan.steps.map((step, index) => (
                <Field key={index} label={`Step ${index + 1}`}>
                  <input
                    value={step.step || ''}
                    onChange={(event) => updateStep(index, { step: event.currentTarget.value })}
                    placeholder="Action step"
                    style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: 'var(--v2-ink)', marginBottom: '0.45rem' }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <input
                      value={step.person || ''}
                      onChange={(event) => updateStep(index, { person: event.currentTarget.value })}
                      placeholder="Owner"
                      style={{ flex: 1, minWidth: 130, border: '1px solid var(--v2-line)', borderRadius: 6, padding: '0.4rem 0.55rem', background: 'var(--v2-white)' }}
                    />
                    <input
                      type="date"
                      value={dateInputValue(step.timeline)}
                      onChange={(event) => updateStep(index, { timeline: event.currentTarget.value ? new Date(`${event.currentTarget.value}T12:00:00`) : null })}
                      style={{ border: '1px solid var(--v2-line)', borderRadius: 6, padding: '0.4rem 0.55rem', background: 'var(--v2-white)' }}
                    />
                  </div>
                </Field>
              ))}
            </div>
          </Card>

          <Card padding="1.35rem">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>📊 Measurement</h3>
              <input
                type="date"
                value={dateInputValue(plan.dueDate)}
                onChange={(event) => updatePlan({ dueDate: event.currentTarget.value ? new Date(`${event.currentTarget.value}T12:00:00`) : null })}
                style={{ border: '1px solid var(--v2-line)', borderRadius: 6, padding: '0.4rem 0.55rem', background: 'var(--v2-white)' }}
              />
            </div>
            <EditableTextArea value={plan.benefit} onChange={(benefit) => updatePlan({ benefit })} minHeight={90} />
          </Card>
        </div>

        <div>
          <Card padding="1.35rem">
            <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.65rem' }}>
              💬 Conversation
              <span style={{ fontWeight: 400, color: 'var(--v2-muted)', fontSize: '0.75rem', marginLeft: '0.5rem' }}>{plan.comments.length} messages · in CHALK</span>
            </div>

            {plan.comments.length > 0 ? plan.comments.map(comment => <Comment key={comment.id} {...comment} />) : (
              <EmptyState title="No comments yet" description="Plan comments between coach and teacher will appear here." />
            )}

            <div style={{
              marginTop: '0.85rem',
              border: '1px solid var(--v2-line)',
              borderRadius: 'var(--v2-radius-pill)',
              padding: '0.4rem 0.55rem 0.4rem 1.1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}>
              <input
                type="text"
                value={commentText}
                onChange={(event) => setCommentText(event.currentTarget.value)}
                onKeyDown={(event) => { if (event.key === 'Enter') addComment() }}
                placeholder="Write a message..."
                style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent', fontSize: '0.85rem', color: 'var(--v2-ink)' }}
              />
              <Button variant="primary" size="sm" onClick={addComment}>Send</Button>
            </div>
          </Card>

          <Card style={{ marginTop: '1rem' }} padding="1.35rem">
            <CardHeader title="📈 Progress" />
            <div style={{ height: 6, background: 'var(--v2-bg-soft)', borderRadius: 999, overflow: 'hidden', marginBottom: '0.5rem' }}>
              <div style={{ height: '100%', width: `${plan.progress}%`, background: 'var(--v2-brand)', borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--v2-muted)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{plan.progress}% complete</span><span>{plan.steps.length} steps</span>
            </div>
          </Card>
        </div>
      </div>

      {showSendConfirm && (
        <div role="dialog" aria-modal="true" aria-label="Send plan to teacher" style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(18, 24, 31, 0.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          zIndex: 1000
        }}>
          <Card style={{ width: 'min(520px, 100%)', boxShadow: 'var(--v2-shadow-lg)' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.45rem' }}>Send this plan to {plan.teacherName}?</h3>
            <p style={{ color: 'var(--v2-muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
              This will mark the action plan as sent in Firestore. Review the goal, steps, measurement date, and conversation before confirming.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <Button onClick={() => setShowSendConfirm(false)}>Cancel</Button>
              <Button variant="primary" disabled={sending} onClick={confirmSendToTeacher}>{sending ? 'Sending...' : 'Confirm send'}</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
