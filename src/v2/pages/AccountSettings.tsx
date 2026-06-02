import * as React from 'react'
import { Card, CardHeader } from '../components/Card'
import { Pill } from '../components/Pill'
import { useV2Auth } from '../hooks/useV2Auth'

function ReadOnlyPreference(props: { title: string; value: string; description: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', border: '1px solid var(--v2-line-soft)', borderRadius: 8, padding: '0.85rem', background: 'var(--v2-bg-soft)' }}>
      <span>
        <strong>{props.title}</strong>
        <div style={{ color: 'var(--v2-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{props.description}</div>
      </span>
      <Pill variant="neutral">{props.value}</Pill>
    </div>
  )
}

export function AccountSettings() {
  const auth = useV2Auth()
  const userName = auth.user ? `${auth.user.firstName} ${auth.user.lastName}`.trim() || 'Coach' : 'Preview coach'

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Account settings</h1>
        <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem', lineHeight: 1.5 }}>
          Profile and workspace preferences for {userName}. This V2 screen is read-only; editable account preferences are managed in legacy CHALK until the persistence contract is approved.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.8fr) minmax(360px, 1.2fr)', gap: '1rem' }}>
        <Card>
          <CardHeader title="Profile" badge={<Pill variant="brand">{auth.user?.role || 'coach'}</Pill>} />
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.82rem', color: 'var(--v2-muted)' }}>Name<input value={userName} readOnly style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem', background: 'var(--v2-bg-soft)' }} /></label>
            <label style={{ display: 'grid', gap: '0.25rem', fontSize: '0.82rem', color: 'var(--v2-muted)' }}>Email<input value={auth.user?.email || 'preview@chalk.local'} readOnly style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem', background: 'var(--v2-bg-soft)' }} /></label>
          </div>
        </Card>

        <Card>
          <CardHeader title="Workspace preferences" badge={<Pill variant="neutral">Read-only</Pill>} />
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <ReadOnlyPreference title="Daily coaching digest" value="Legacy" description="Notification preferences stay in legacy CHALK for this release." />
            <ReadOnlyPreference title="Action plan alerts" value="Legacy" description="Due-plan and teacher-visible alerts use the existing CHALK notification path." />
            <ReadOnlyPreference title="Default report range" value="30 days" description="V2 reports default to a safe 30-day window until saved preferences are implemented." />
          </div>
        </Card>
      </div>
    </div>
  )
}
