import * as React from 'react'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import { Skeleton } from '../components/Skeleton'
import { Stat } from '../components/Stat'
import { useToast } from '../hooks/useToast'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'
import { AdminUserRow } from '../lib/types'

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

function userName(user: AdminUserRow): string {
  return `${user.firstName} ${user.lastName}`.trim() || user.email || user.id
}

function roleLabel(role: string): string {
  if (role === 'programLeader') return 'Program leader'
  if (role === 'siteLeader') return 'Site leader'
  return role || 'User'
}

export function AdminWorkspace() {
  const firebase = useV2Firebase()
  const toast = useToast()
  const [tab, setTab] = React.useState<AdminTab>('users')
  const [users, setUsers] = React.useState<AdminUserRow[]>([])
  const [search, setSearch] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [updatingId, setUpdatingId] = React.useState('')
  const [error, setError] = React.useState<Error | null>(null)

  const loadUsers = React.useCallback(() => {
    setLoading(true)
    setError(null)
    createV2Api(firebase).getAdminUsers()
      .then(nextUsers => {
        setUsers(nextUsers)
        setLoading(false)
      })
      .catch(loadError => {
        setError(loadError as Error)
        setLoading(false)
      })
  }, [firebase])

  React.useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const toggleArchive = (user: AdminUserRow) => {
    setUpdatingId(user.id)
    createV2Api(firebase).setUserArchived(user.id, !user.archived)
      .then(result => {
        setUsers(current => current.map(item => item.id === user.id ? { ...item, archived: result.archived } : item))
        setUpdatingId('')
        toast.success(result.archived ? 'User archived.' : 'User restored.')
      })
      .catch(updateError => {
        setError(updateError as Error)
        setUpdatingId('')
        toast.error('Unable to update user archive state.')
      })
  }

  const normalized = search.trim().toLowerCase()
  const visibleUsers = users.filter(user => {
    const haystack = `${userName(user)} ${user.email} ${user.role} ${user.programs.join(' ')} ${user.sites.join(' ')}`.toLowerCase()
    return normalized === '' || haystack.includes(normalized)
  })

  const activeCount = users.filter(user => !user.archived).length
  const archivedCount = users.filter(user => user.archived).length
  const coachCount = users.filter(user => user.role === 'coach').length
  const teacherCount = users.filter(user => user.role === 'teacher').length

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Admin workspace</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            Live users with archive and restore controls. Program, site, import, invite, and role-edit workflows still use the legacy admin workspace.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={openLegacyAllUsers}>Open legacy users</Button>
          <Button variant="primary" onClick={openLegacyAdmin}>Open legacy admin</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <Stat label="Active users" value={activeCount} tone="brand" icon="U" delta={{ text: 'Live users', trend: 'flat' }} />
        <Stat label="Archived" value={archivedCount} tone="warm" icon="A" delta={{ text: 'Restorable', trend: archivedCount > 0 ? 'warn' : 'flat' }} />
        <Stat label="Coaches" value={coachCount} tone="gold" icon="C" delta={{ text: 'Role count', trend: 'flat' }} />
        <Stat label="Teachers" value={teacherCount} tone="success" icon="T" delta={{ text: 'Role count', trend: 'flat' }} />
      </div>

      <Card padding="1rem" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Tab active={tab === 'users'} onClick={() => setTab('users')}>Users</Tab>
            <Tab active={tab === 'programs'} onClick={() => setTab('programs')}>Programs</Tab>
            <Tab active={tab === 'sites'} onClick={() => setTab('sites')}>Sites</Tab>
          </div>
          {tab === 'users' && (
            <input
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder="Search users, roles, programs, sites"
              style={{ minWidth: 280, flex: '0 1 380px', border: '1px solid var(--v2-line)', borderRadius: 'var(--v2-radius-pill)', padding: '0.55rem 0.9rem', background: 'var(--v2-white)' }}
            />
          )}
        </div>
      </Card>

      {error && <div style={{ color: 'var(--v2-warm-dark)', fontWeight: 600, marginBottom: '1rem' }}>Admin data could not be synced.</div>}

      {tab !== 'users' ? (
        <Card>
          <EmptyState
            title={tab === 'programs' ? 'Program edits remain in legacy CHALK' : 'Site edits remain in legacy CHALK'}
            description="Use the legacy admin workspace for create/edit/import workflows while V2 keeps user archive controls live and scoped."
            cta={<Button variant="primary" onClick={openLegacyAdmin}>Open legacy admin</Button>}
          />
        </Card>
      ) : loading ? (
        <Card><Skeleton height={260} /></Card>
      ) : visibleUsers.length === 0 ? (
        <Card><EmptyState title="No users match this view" description="Clear the search or open legacy users for advanced filters." /></Card>
      ) : (
        <Card padding="0" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--v2-line-soft)' }}>
            <CardHeader title="Live users" badge={<Pill variant="brand">{visibleUsers.length}</Pill>} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ color: 'var(--v2-muted)', textAlign: 'left', borderBottom: '1px solid var(--v2-line-soft)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>User</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Role</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Scope</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem' }} />
                </tr>
              </thead>
              <tbody>
                {visibleUsers.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--v2-line-soft)' }}>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <strong>{userName(user)}</strong>
                      <div style={{ color: 'var(--v2-muted)', fontSize: '0.78rem', marginTop: '0.15rem' }}>{user.email || user.id}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>{roleLabel(user.role)}</td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--v2-muted)' }}>
                      {[...user.programs, ...user.sites].slice(0, 3).join(', ') || 'Global'}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}><Pill variant={user.archived ? 'warn' : 'success'}>{user.archived ? 'Archived' : 'Active'}</Pill></td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <Button size="sm" disabled={updatingId === user.id} onClick={() => toggleArchive(user)}>
                        {user.archived ? 'Unarchive' : 'Archive'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
