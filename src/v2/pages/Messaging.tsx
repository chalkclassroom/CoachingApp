import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'

export function Messaging() {
  const history = useHistory()
  const params = new URLSearchParams(history.location.search)
  const teacherName = params.get('teacherName') || ''
  const program = params.get('program') || 'Selected classroom'
  const teacherId = params.get('teacher') || ''
  const openLegacyMessaging = () => history.push('/Messaging')

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Messages</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem', maxWidth: 720, lineHeight: 1.5 }}>
            Messaging is delegated to legacy CHALK until the V2 backend schema, email delivery behavior, attachments, and participant rules are approved.
          </div>
        </div>
        <Button variant="primary" onClick={openLegacyMessaging}>Open legacy messaging</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 0.9fr) minmax(0, 1.1fr)', gap: '1rem' }}>
        <Card>
          <CardHeader title="Legacy handoff" badge={<Pill variant="brand">Delegated</Pill>} />
          <div style={{ color: 'var(--v2-ink-soft)', fontSize: '0.9rem', lineHeight: 1.6, display: 'grid', gap: '0.75rem' }}>
            <p style={{ margin: 0 }}>
              Use the existing CHALK messaging workspace for drafts, sent messages, templates, attachments, and email delivery. V2 does not store local preview messages in production scope.
            </p>
            <p style={{ margin: 0 }}>
              This avoids showing a conversation as sent when it has not persisted through the approved messaging backend.
            </p>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Button variant="primary" onClick={openLegacyMessaging}>Open legacy messaging</Button>
          </div>
        </Card>

        {teacherName ? (
          <Card>
            <CardHeader title="Selected teacher" badge={<Pill variant="neutral">Context preserved</Pill>} />
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginBottom: '1rem' }}>
              <Avatar name={teacherName} size={46} />
              <div>
                <strong style={{ fontSize: '1rem' }}>{teacherName}</strong>
                <div style={{ color: 'var(--v2-muted)', fontSize: '0.82rem', marginTop: '0.15rem' }}>{program}</div>
                {teacherId && <div style={{ color: 'var(--v2-muted-soft)', fontSize: '0.72rem', marginTop: '0.15rem' }}>Teacher ID: {teacherId}</div>}
              </div>
            </div>
            <p style={{ color: 'var(--v2-muted)', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '1rem' }}>
              V2 keeps this teacher context visible, but composing and sending remain in legacy CHALK for this release.
            </p>
            <Button onClick={openLegacyMessaging}>Open legacy messaging</Button>
          </Card>
        ) : (
          <Card>
            <EmptyState title="No V2 conversations shown" description="Messaging is intentionally delegated until the live schema and permissions are implemented." />
          </Card>
        )}
      </div>
    </div>
  )
}
