import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import { Skeleton } from '../components/Skeleton'
import { useToast } from '../hooks/useToast'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'
import { MessagingEmail } from '../lib/types'

function formatDate(date: Date | null | undefined): string {
  return date ? date.toLocaleString() : 'Not saved yet'
}

function MessageRow(props: { message: MessagingEmail; selected: boolean; onSelect(message: MessagingEmail): void }) {
  const name = props.message.recipientName || props.message.recipientFirstName || 'Recipient'
  return (
    <button
      type="button"
      onClick={() => props.onSelect(props.message)}
      style={{
        textAlign: 'left',
        border: '1px solid var(--v2-line-soft)',
        borderRadius: 8,
        background: props.selected ? 'var(--v2-brand-soft)' : 'var(--v2-white)',
        padding: '0.8rem',
        display: 'grid',
        gap: '0.35rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center' }}>
        <strong style={{ color: 'var(--v2-ink)' }}>{props.message.subject || 'Untitled draft'}</strong>
        <Pill variant={props.message.type === 'sent' ? 'success' : 'neutral'}>{props.message.type === 'sent' ? 'Sent' : 'Draft'}</Pill>
      </div>
      <div style={{ color: 'var(--v2-muted)', fontSize: '0.8rem' }}>{name} - {formatDate(props.message.dateModified)}</div>
    </button>
  )
}

export function Messaging() {
  const history = useHistory()
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const toast = useToast()
  const params = new URLSearchParams(history.location.search)
  const teacherName = params.get('teacherName') || ''
  const program = params.get('program') || 'Selected classroom'
  const teacherId = params.get('teacher') || ''
  const [messages, setMessages] = React.useState<MessagingEmail[]>([])
  const [selectedId, setSelectedId] = React.useState<string>('')
  const [subject, setSubject] = React.useState(teacherName ? 'Follow-up from CHALK coaching' : '')
  const [recipientName, setRecipientName] = React.useState(teacherName)
  const [recipientEmail, setRecipientEmail] = React.useState('')
  const [body, setBody] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const openLegacyMessaging = () => history.push('/Messaging')

  const loadMessages = React.useCallback(() => {
    if (!auth.user) return
    setLoading(true)
    setError(null)
    createV2Api(firebase).getMessagingEmails(auth.user.uid)
      .then(nextMessages => {
        setMessages(nextMessages)
        setLoading(false)
      })
      .catch(loadError => {
        setError(loadError as Error)
        setLoading(false)
      })
  }, [auth.user, firebase])

  React.useEffect(() => {
    loadMessages()
  }, [loadMessages])

  const selectMessage = (message: MessagingEmail) => {
    setSelectedId(message.id)
    setSubject(message.subject)
    setRecipientName(message.recipientName || message.recipientFirstName)
    setRecipientEmail(message.recipientEmail)
    setBody(message.emailContent)
  }

  const newDraft = () => {
    setSelectedId('')
    setSubject(teacherName ? 'Follow-up from CHALK coaching' : '')
    setRecipientName(teacherName)
    setRecipientEmail('')
    setBody('')
  }

  const saveDraft = () => {
    if (!auth.user || saving) return
    setSaving(true)
    setError(null)
    createV2Api(firebase).saveMessagingDraft(auth.user.uid, {
      id: selectedId || undefined,
      subject,
      emailContent: body,
      recipientId: teacherId,
      recipientFirstName: recipientName.split(' ')[0] || recipientName,
      recipientName,
      recipientEmail
    })
      .then(saved => {
        setSelectedId(saved.id)
        setMessages(current => [saved, ...current.filter(item => item.id !== saved.id)])
        setSaving(false)
        toast.success('Draft saved.')
      })
      .catch(saveError => {
        setError(saveError as Error)
        setSaving(false)
        toast.error('Unable to save draft.')
      })
  }

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Messages</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem', maxWidth: 760, lineHeight: 1.5 }}>
            Drafts are saved in the existing CHALK email collection. Email delivery remains in legacy CHALK until SendGrid delivery, attachments, and participant rules are approved for V2.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={newDraft}>New draft</Button>
          <Button variant="primary" onClick={openLegacyMessaging}>Open legacy messaging</Button>
        </div>
      </div>

      {error && <div style={{ color: 'var(--v2-warm-dark)', fontWeight: 600, marginBottom: '1rem' }}>Messaging data could not be synced.</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 0.85fr) minmax(0, 1.15fr)', gap: '1rem' }}>
        <Card>
          <CardHeader title="Drafts and sent messages" badge={<Pill variant="brand">Live</Pill>} />
          {loading ? (
            <Skeleton height={240} />
          ) : messages.length === 0 ? (
            <EmptyState title="No saved messages yet" description="Create a V2 draft or open legacy messaging to send an email." />
          ) : (
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {messages.map(message => <MessageRow key={message.id} message={message} selected={message.id === selectedId} onSelect={selectMessage} />)}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader title="Draft editor" badge={<Pill variant="neutral">Draft storage</Pill>} />
          {teacherName && (
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginBottom: '1rem', border: '1px solid var(--v2-line-soft)', background: 'var(--v2-bg-soft)', borderRadius: 8, padding: '0.8rem' }}>
              <Avatar name={teacherName} size={42} />
              <div>
                <strong style={{ fontSize: '1rem' }}>{teacherName}</strong>
                <div style={{ color: 'var(--v2-muted)', fontSize: '0.82rem', marginTop: '0.15rem' }}>{program}</div>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.82rem', color: 'var(--v2-muted)' }}>
              Recipient name
              <input value={recipientName} onChange={(event) => setRecipientName(event.currentTarget.value)} style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem', background: 'var(--v2-white)' }} />
            </label>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.82rem', color: 'var(--v2-muted)' }}>
              Recipient email
              <input value={recipientEmail} onChange={(event) => setRecipientEmail(event.currentTarget.value)} style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem', background: 'var(--v2-white)' }} />
            </label>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.82rem', color: 'var(--v2-muted)' }}>
              Subject
              <input value={subject} onChange={(event) => setSubject(event.currentTarget.value)} style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem', background: 'var(--v2-white)' }} />
            </label>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.82rem', color: 'var(--v2-muted)' }}>
              Message
              <textarea value={body} onChange={(event) => setBody(event.currentTarget.value)} style={{ minHeight: 180, border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.8rem', background: 'var(--v2-white)', resize: 'vertical', lineHeight: 1.55 }} />
            </label>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--v2-muted)', fontSize: '0.8rem' }}>Save stores the draft. Sending still uses the approved legacy delivery workflow.</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button onClick={openLegacyMessaging}>Open legacy messaging</Button>
                <Button variant="primary" disabled={saving || !auth.user || !subject.trim()} onClick={saveDraft}>{saving ? 'Saving...' : 'Save draft'}</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
