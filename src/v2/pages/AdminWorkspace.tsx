import * as React from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Stat } from '../components/Stat'

type AdminTab = 'users' | 'programs' | 'sites'

function openLegacyAdmin() {
  window.location.href = '/Admin'
}

function openLegacyAllUsers() {
  window.location.href = '/AllUsers'
}

function Tab(props: { active: boolean; children: React.ReactNode; onClick(): void }) {
  return <Button size="sm" onClick={props.onClick} style={{ background: props.active ? 'var(--v2-ink)' : 'var(--v2-white)', color: props.active ? 'var(--v2-white)' : 'var(--v2-ink-soft)', borderColor: props.active ? 'var(--v2-ink)' : 'var(--v2-line)' }}>{props.children}</Button>
}

export function AdminWorkspace() {
  const [tab, setTab] = React.useState<AdminTab>('users')

  const emptyCopy: Record<AdminTab, { title: string; description: string; cta: React.ReactNode }> = {
    users: {
      title: 'User management remains in legacy CHALK',
      description: 'Use the legacy admin workspace for user creation, bulk import, role changes, archive/restore, and all write operations.',
      cta: <Button variant="primary" onClick={openLegacyAllUsers}>Open legacy users</Button>
    },
    programs: {
      title: 'Program management remains in legacy CHALK',
      description: 'Program setup and edits require the existing legacy workflow until V2 admin write rules are scoped and tested.',
      cta: <Button variant="primary" onClick={openLegacyAdmin}>Open legacy admin</Button>
    },
    sites: {
      title: 'Site management remains in legacy CHALK',
      description: 'Site setup and assignments stay in legacy CHALK for this release path.',
      cta: <Button variant="primary" onClick={openLegacyAdmin}>Open legacy admin</Button>
    }
  }

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Admin workspace</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            Read-only V2 admin entry. Admin writes remain in legacy CHALK until scoped Firestore rules and regression tests are approved.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={openLegacyAllUsers}>Open legacy users</Button>
          <Button variant="primary" onClick={openLegacyAdmin}>Open legacy admin</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <Stat label="Users" value="Legacy" tone="brand" icon="U" delta={{ text: 'Managed in legacy', trend: 'flat' }} />
        <Stat label="Programs" value="Legacy" tone="gold" icon="P" delta={{ text: 'Managed in legacy', trend: 'flat' }} />
        <Stat label="Sites" value="Legacy" tone="success" icon="S" delta={{ text: 'Managed in legacy', trend: 'flat' }} />
        <Stat label="Invites" value="Legacy" tone="warm" icon="I" delta={{ text: 'Managed in legacy', trend: 'flat' }} />
      </div>

      <Card padding="1rem" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Tab active={tab === 'users'} onClick={() => setTab('users')}>Users</Tab>
          <Tab active={tab === 'programs'} onClick={() => setTab('programs')}>Programs</Tab>
          <Tab active={tab === 'sites'} onClick={() => setTab('sites')}>Sites</Tab>
        </div>
      </Card>

      <Card>
        <EmptyState
          title={emptyCopy[tab].title}
          description={emptyCopy[tab].description}
          cta={emptyCopy[tab].cta}
        />
      </Card>
    </div>
  )
}
