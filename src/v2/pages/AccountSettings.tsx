import * as React from 'react'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { Pill } from '../components/Pill'
import { useToast } from '../hooks/useToast'
import { useV2Auth } from '../hooks/useV2Auth'

export function AccountSettings() {
  const auth = useV2Auth()
  const toast = useToast()
  const userName = auth.user ? `${auth.user.firstName} ${auth.user.lastName}`.trim() || 'Coach' : 'Preview coach'
  const [settings, setSettings] = React.useState({ digest: true, planAlerts: true, theme: 'system', defaultRange: '30' })

  const toggle = (key: 'digest' | 'planAlerts') => setSettings(current => ({ ...current, [key]: !current[key] }))
  const save = () => toast.success('Account preferences saved for the V2 preview.')

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Account settings</h1>
        <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
          Profile, notifications, and workspace defaults for {userName}.
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
          <CardHeader title="Workspace preferences" />
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
              <span><strong>Daily coaching digest</strong><div style={{ color: 'var(--v2-muted)', fontSize: '0.8rem' }}>Summary of teachers needing attention.</div></span>
              <input type="checkbox" checked={settings.digest} onChange={() => toggle('digest')} />
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
              <span><strong>Action plan alerts</strong><div style={{ color: 'var(--v2-muted)', fontSize: '0.8rem' }}>Notify when plans are due or teacher-visible.</div></span>
              <input type="checkbox" checked={settings.planAlerts} onChange={() => toggle('planAlerts')} />
            </label>
            <label style={{ display: 'grid', gap: '0.35rem' }}>
              <strong>Default report range</strong>
              <select value={settings.defaultRange} onChange={(event) => setSettings(current => ({ ...current, defaultRange: event.currentTarget.value }))} style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem', background: 'var(--v2-white)' }}>
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
              </select>
            </label>
            <Button variant="primary" onClick={save} style={{ justifySelf: 'start' }}>Save preferences</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
