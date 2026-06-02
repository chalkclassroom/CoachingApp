import * as React from 'react'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { Pill } from '../components/Pill'
import { Skeleton } from '../components/Skeleton'
import { useToast } from '../hooks/useToast'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api, DEFAULT_ACCOUNT_PREFERENCES } from '../lib/api'
import { AccountPreferences } from '../lib/types'

type PreferenceRowProps = {
  title: string
  description: string
  checked: boolean
  onChange(value: boolean): void
}

function PreferenceRow(props: PreferenceRowProps) {
  return (
    <label style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', border: '1px solid var(--v2-line-soft)', borderRadius: 8, padding: '0.85rem', background: 'var(--v2-bg-soft)' }}>
      <span>
        <strong>{props.title}</strong>
        <div style={{ color: 'var(--v2-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{props.description}</div>
      </span>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(event) => props.onChange(event.currentTarget.checked)}
        style={{ width: 20, height: 20, marginTop: 2 }}
      />
    </label>
  )
}

function FieldLabel(props: { children: React.ReactNode }) {
  return <span style={{ fontSize: '0.82rem', color: 'var(--v2-muted)' }}>{props.children}</span>
}

export function AccountSettings() {
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const toast = useToast()
  const [preferences, setPreferences] = React.useState<AccountPreferences>(DEFAULT_ACCOUNT_PREFERENCES)
  const [lastSaved, setLastSaved] = React.useState<AccountPreferences>(DEFAULT_ACCOUNT_PREFERENCES)
  const [loading, setLoading] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const userName = auth.user ? `${auth.user.firstName} ${auth.user.lastName}`.trim() || 'Coach' : 'Coach'
  const dirty = JSON.stringify(preferences) !== JSON.stringify(lastSaved)

  React.useEffect(() => {
    if (!auth.user) {
      return
    }

    let active = true
    setLoading(true)
    setError(null)

    createV2Api(firebase).getAccountPreferences(auth.user.uid)
      .then(nextPreferences => {
        if (!active) return
        setPreferences(nextPreferences)
        setLastSaved(nextPreferences)
        setLoading(false)
      })
      .catch(loadError => {
        if (!active) return
        setError(loadError as Error)
        setLoading(false)
      })

    return () => { active = false }
  }, [auth.user, firebase])

  const updatePreferences = (patch: Partial<AccountPreferences>) => {
    setPreferences(current => ({ ...current, ...patch }))
  }

  const savePreferences = () => {
    if (!auth.user || saving) {
      return
    }

    setSaving(true)
    setError(null)
    createV2Api(firebase).saveAccountPreferences(auth.user.uid, preferences)
      .then(saved => {
        setLastSaved(saved)
        setPreferences(saved)
        setSaving(false)
        toast.success('Preferences saved.')
      })
      .catch(saveError => {
        setError(saveError as Error)
        setSaving(false)
        toast.error('Unable to save preferences.')
      })
  }

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Account settings</h1>
        <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem', lineHeight: 1.5 }}>
          Profile identity for {userName} stays locked to CHALK account records. Workspace preferences below are saved to your V2 account profile.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.8fr) minmax(360px, 1.2fr)', gap: '1rem' }}>
        <Card>
          <CardHeader title="Profile" badge={<Pill variant="brand">{auth.user?.role || 'coach'}</Pill>} />
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <label style={{ display: 'grid', gap: '0.25rem' }}>
              <FieldLabel>Name</FieldLabel>
              <input value={userName} readOnly style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem', background: 'var(--v2-bg-soft)' }} />
            </label>
            <label style={{ display: 'grid', gap: '0.25rem' }}>
              <FieldLabel>Email</FieldLabel>
              <input value={auth.user?.email || ''} readOnly style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem', background: 'var(--v2-bg-soft)' }} />
            </label>
          </div>
        </Card>

        <Card>
          <CardHeader title="Workspace preferences" badge={<Pill variant={dirty ? 'warn' : 'success'}>{dirty ? 'Unsaved' : 'Saved'}</Pill>} />
          {loading ? (
            <Skeleton height={180} />
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <PreferenceRow
                title="Daily coaching digest"
                description="Receive a daily summary of teacher activity and follow-up needs."
                checked={preferences.dailyDigestEnabled}
                onChange={(dailyDigestEnabled) => updatePreferences({ dailyDigestEnabled })}
              />
              <PreferenceRow
                title="Action plan alerts"
                description="Notify me when action plans are due or marked teacher-visible."
                checked={preferences.actionPlanAlertsEnabled}
                onChange={(actionPlanAlertsEnabled) => updatePreferences({ actionPlanAlertsEnabled })}
              />
              <label style={{ display: 'grid', gap: '0.35rem', border: '1px solid var(--v2-line-soft)', borderRadius: 8, padding: '0.85rem', background: 'var(--v2-bg-soft)' }}>
                <strong>Default report range</strong>
                <span style={{ color: 'var(--v2-muted)', fontSize: '0.8rem' }}>Used by V2 dashboard and reporting screens when a custom date range is not selected.</span>
                <select
                  value={preferences.defaultReportRangeDays}
                  onChange={(event) => updatePreferences({ defaultReportRangeDays: Number(event.currentTarget.value) as AccountPreferences['defaultReportRangeDays'] })}
                  style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.65rem', background: 'var(--v2-white)', maxWidth: 220 }}
                >
                  <option value={7}>7 days</option>
                  <option value={30}>30 days</option>
                  <option value={90}>90 days</option>
                </select>
              </label>

              {error && (
                <div style={{ color: 'var(--v2-warm-dark)', fontSize: '0.82rem', fontWeight: 600 }}>
                  Preferences could not be synced. Try saving again after the connection recovers.
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--v2-muted)', fontSize: '0.8rem' }}>{dirty ? 'You have unsaved changes.' : 'Preferences are up to date.'}</span>
                <Button variant="primary" disabled={!dirty || saving || !auth.user} onClick={savePreferences}>
                  {saving ? 'Saving...' : 'Save preferences'}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
