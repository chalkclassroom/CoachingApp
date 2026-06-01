import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import { useToast } from '../hooks/useToast'

type Message = { id: string; author: string; body: string; time: string; mine?: boolean }
type Thread = {
  id: string
  teacherId: string
  teacher: string
  classroom: string
  subject: string
  status: 'unread' | 'open' | 'closed'
  updated: string
  messages: Message[]
}

const EMPTY_THREADS: Thread[] = []

function statusVariant(status: Thread['status']): 'neutral' | 'brand' | 'success' {
  if (status === 'unread') return 'brand'
  if (status === 'closed') return 'success'
  return 'neutral'
}

export function Messaging() {
  const history = useHistory()
  const toast = useToast()
  const params = new URLSearchParams(history.location.search)
  const teacherName = params.get('teacherName')
  const initialThreads = React.useMemo(() => {
    if (!teacherName) return EMPTY_THREADS
    return [{
      id: 'thread-new',
      teacherId: params.get('teacher') || 'preview-teacher',
      teacher: teacherName,
      classroom: params.get('program') || 'Selected classroom',
      subject: 'New coaching message',
      status: 'open' as const,
      updated: 'Now',
      messages: [{ id: 'intro', author: 'Coach', body: `Draft a check-in for ${teacherName}.`, time: 'Now', mine: true }]
    }, ...EMPTY_THREADS]
  }, [history.location.search])

  const [threads, setThreads] = React.useState<Thread[]>(initialThreads)
  const [selectedId, setSelectedId] = React.useState(initialThreads[0]?.id || '')
  const [search, setSearch] = React.useState('')
  const [draft, setDraft] = React.useState('')

  React.useEffect(() => {
    setThreads(initialThreads)
    setSelectedId(initialThreads[0]?.id || '')
  }, [initialThreads])

  const selected = threads.find(thread => thread.id === selectedId) || threads[0]
  const normalized = search.trim().toLowerCase()
  const visibleThreads = threads.filter(thread => {
    const text = `${thread.teacher} ${thread.classroom} ${thread.subject}`.toLowerCase()
    return normalized === '' || text.includes(normalized)
  })

  const send = () => {
    const body = draft.trim()
    if (!selected || !body) return
    setThreads(current => current.map(thread => thread.id === selected.id ? {
      ...thread,
      status: 'open',
      updated: 'Now',
      messages: [...thread.messages, { id: `local-${Date.now()}`, author: 'Coach', body, time: 'Now', mine: true }]
    } : thread))
    setDraft('')
    toast.success('Message saved in the V2 preview thread.')
  }

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Messages</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            Coaching conversations, plan follow-ups, and teacher check-ins.
          </div>
        </div>
        <Button variant="primary" onClick={() => toast.info('Select a teacher to start a new conversation.')}>+ Compose</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 360px) minmax(0, 1fr)', gap: '1rem' }}>
        <Card padding="0" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--v2-line-soft)' }}>
            <input
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder="Search conversations"
              style={{ width: '100%', border: '1px solid var(--v2-line)', borderRadius: 'var(--v2-radius-pill)', padding: '0.55rem 0.85rem', background: 'var(--v2-white)' }}
            />
          </div>
          {visibleThreads.length === 0 ? (
            <EmptyState title="No conversations" description="Try a different search term." />
          ) : visibleThreads.map(thread => {
            const active = selected?.id === thread.id
            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => setSelectedId(thread.id)}
                style={{
                  width: '100%', textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--v2-line-soft)',
                  background: active ? 'var(--v2-brand-softer)' : 'var(--v2-white)'
                }}
              >
                <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                  <Avatar name={thread.teacher} size={36} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.9rem' }}>{thread.teacher}</strong>
                      <Pill variant={statusVariant(thread.status)}>{thread.status}</Pill>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--v2-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{thread.subject}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--v2-muted-soft)' }}>{thread.updated}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </Card>

        <Card padding="0" style={{ overflow: 'hidden', minHeight: 620 }}>
          {selected ? (
            <>
              <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--v2-line-soft)', display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <Avatar name={selected.teacher} size={42} />
                  <div>
                    <h2 style={{ fontSize: '1.05rem' }}>{selected.subject}</h2>
                    <div style={{ color: 'var(--v2-muted)', fontSize: '0.82rem' }}>{selected.teacher} - {selected.classroom}</div>
                  </div>
                </div>
                <Button size="sm" onClick={() => history.push(`/v2/teachers/${encodeURIComponent(selected.teacherId)}?teacherName=${encodeURIComponent(selected.teacher)}&program=${encodeURIComponent(selected.classroom)}`)}>Open profile</Button>
              </div>

              <div style={{ padding: '1.25rem', display: 'grid', gap: '0.8rem', minHeight: 390, alignContent: 'start' }}>
                {selected.messages.map(message => (
                  <div key={message.id} style={{ display: 'flex', justifyContent: message.mine ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: 620,
                      background: message.mine ? 'var(--v2-ink)' : 'var(--v2-bg-soft)',
                      color: message.mine ? 'var(--v2-white)' : 'var(--v2-ink)',
                      borderRadius: 10,
                      padding: '0.75rem 0.9rem',
                      fontSize: '0.9rem'
                    }}>
                      <div style={{ fontWeight: 700, fontSize: '0.72rem', opacity: 0.75, marginBottom: '0.2rem' }}>{message.author} - {message.time}</div>
                      {message.body}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--v2-line-soft)', padding: '1rem', display: 'grid', gap: '0.7rem' }}>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.currentTarget.value)}
                  placeholder="Write a coaching follow-up..."
                  style={{ width: '100%', minHeight: 86, resize: 'vertical', border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.8rem', background: 'var(--v2-white)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ color: 'var(--v2-muted)', fontSize: '0.78rem' }}>Preview messages stay local until the live messaging rules are approved.</span>
                  <Button variant="primary" onClick={send}>Send</Button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState title="Select a conversation" description="Choose a thread from the inbox." />
          )}
        </Card>
      </div>
    </div>
  )
}
