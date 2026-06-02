import * as React from 'react'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import { Skeleton } from '../components/Skeleton'
import { Stat } from '../components/Stat'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'
import { LeaderSummary } from '../lib/types'

const LEADER_ROUTES = [
  { label: 'Leader dashboard', path: '/LeadersDashboard' },
  { label: 'Users overview', path: '/LeadersUsers' },
  { label: 'Teachers', path: '/LeadersTeachers' },
  { label: 'Coaches', path: '/LeadersCoaches' },
  { label: 'Sites', path: '/LeadersSites' },
  { label: 'Archive', path: '/LeadersArchive' },
  { label: 'All users', path: '/LeadersAllUsers' }
]

const PROFILE_ROUTES = [
  { label: 'Coach profile report', path: '/CoachProfile' },
  { label: 'Site profile report', path: '/SiteProfile' },
  { label: 'Program profile report', path: '/ProgramProfile' }
]

const EMPTY_SUMMARY: LeaderSummary = { programs: 0, sites: 0, teachers: 0, coaches: 0, archivedUsers: 0 }

function openLegacy(path: string) {
  window.location.href = path
}

export function LeaderWorkspace() {
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const [summary, setSummary] = React.useState<LeaderSummary>(EMPTY_SUMMARY)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!auth.user) return
    let active = true
    setLoading(true)
    setError(null)
    createV2Api(firebase).getLeaderSummary({ role: auth.user.role, programs: auth.user.programs, sites: auth.user.sites })
      .then(nextSummary => {
        if (!active) return
        setSummary(nextSummary)
        setLoading(false)
      })
      .catch(loadError => {
        if (!active) return
        setError(loadError as Error)
        setLoading(false)
      })
    return () => { active = false }
  }, [auth.user, firebase])

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Leader workspace</h1>
        <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
          Live leader summary for your CHALK scope. Advanced legacy leader workflows remain available below while V2 parity expands.
        </div>
      </div>

      {error && <div style={{ color: 'var(--v2-warm-dark)', fontWeight: 600, marginBottom: '1rem' }}>Leader summary could not be synced.</div>}

      {loading ? (
        <Card style={{ marginBottom: '1rem' }}><Skeleton height={130} /></Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <Stat label="Programs" value={summary.programs} tone="brand" icon="P" delta={{ text: 'Live leader summary', trend: 'flat' }} />
          <Stat label="Sites" value={summary.sites} tone="gold" icon="S" delta={{ text: 'Scoped', trend: 'flat' }} />
          <Stat label="Teachers" value={summary.teachers} tone="success" icon="T" delta={{ text: 'Active', trend: 'flat' }} />
          <Stat label="Coaches" value={summary.coaches} tone="warm" icon="C" delta={{ text: 'Active', trend: 'flat' }} />
          <Stat label="Archived" value={summary.archivedUsers} tone="warm" icon="A" delta={{ text: 'Legacy restore available', trend: summary.archivedUsers > 0 ? 'warn' : 'flat' }} />
        </div>
      )}

      <Card>
        <CardHeader title="Advanced legacy leader workflows" badge={<Pill variant="neutral">Fallback</Pill>} />
        <div style={{ color: 'var(--v2-muted)', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '1rem' }}>
          Use these links for detailed leader dashboards, archive management, all-user views, and management flows while V2 keeps the summary live.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem' }}>
          {LEADER_ROUTES.map(route => (
            <Button key={route.path} onClick={() => openLegacy(route.path)} style={{ justifyContent: 'center' }}>
              {route.label}
            </Button>
          ))}
        </div>
      </Card>

      <Card style={{ marginTop: '1rem' }}>
        <CardHeader title="Profile reports remain in legacy CHALK" />
        <div style={{ color: 'var(--v2-muted)', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '1rem' }}>
          Coach, site, and program profile reports depend on legacy report filters and Cloud Function contracts. V2 links directly to the legacy profile workflows instead of rendering partial report data.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem' }}>
          {PROFILE_ROUTES.map(route => (
            <Button key={route.path} onClick={() => openLegacy(route.path)} style={{ justifyContent: 'center' }}>
              {route.label}
            </Button>
          ))}
        </div>
      </Card>

      {(summary.programs + summary.sites + summary.teachers + summary.coaches) === 0 && !loading && (
        <Card style={{ marginTop: '1rem' }}>
          <EmptyState
            title="No leader-scoped data found"
            description="Your current account has no programs or sites attached, or staging data is unavailable for this scope."
            cta={<Button variant="primary" onClick={() => openLegacy('/LeadersDashboard')}>Open leader dashboard</Button>}
          />
        </Card>
      )}
    </div>
  )
}
