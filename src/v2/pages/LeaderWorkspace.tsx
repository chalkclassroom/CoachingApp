import * as React from 'react'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'

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

function openLegacy(path: string) {
  window.location.href = path
}

export function LeaderWorkspace() {
  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Leader workspace</h1>
        <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
          V2 delegates leader workflows to legacy CHALK for this release path. These links preserve access to legacy leader workflows without exposing coach-only V2 data.
        </div>
      </div>

      <Card>
        <CardHeader title="Legacy leader workflows" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
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
          Coach, site, and program profile reports depend on legacy report filters and Cloud Function contracts. V2 links directly to the legacy profile workflows instead of rendering partial data.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem' }}>
          {PROFILE_ROUTES.map(route => (
            <Button key={route.path} onClick={() => openLegacy(route.path)} style={{ justifyContent: 'center' }}>
              {route.label}
            </Button>
          ))}
        </div>
      </Card>

      <Card style={{ marginTop: '1rem' }}>
        <EmptyState
          title="No V2 leader data is shown here"
          description="Leader dashboards, user lists, site profiles, program profiles, archive, and all-user administration remain in legacy CHALK until their V2 data contracts are implemented and tested."
          cta={<Button variant="primary" onClick={() => openLegacy('/LeadersDashboard')}>Open leader dashboard</Button>}
        />
      </Card>
    </div>
  )
}
