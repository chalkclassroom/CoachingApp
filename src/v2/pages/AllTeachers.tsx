import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import { TableSkeleton } from '../components/Skeleton'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'

type TeacherRow = {
  id: string
  firstName: string
  lastName: string
  role: 'teacher' | 'coach' | 'admin' | 'siteLeader' | 'programLeader'
  program: string
  status: 'active' | 'archived'
  lastLogin: string
  loginCount: number
  actionCount: number
  lastAction: { type: string; date: string }
}

const EMPTY_ROWS: TeacherRow[] = []

const roleLabel: Record<TeacherRow['role'], string> = {
  admin: 'Admin', programLeader: 'Program Leader', siteLeader: 'Site Leader',
  coach: 'Coach', teacher: 'Teacher'
}

const FilterInput = (p: { placeholder: string; value: string; onChange(value: string): void; width?: number }) => (
  <input
    placeholder={p.placeholder}
    value={p.value}
    onChange={(event) => p.onChange(event.currentTarget.value)}
    style={{
      width: p.width ?? 200,
      padding: '0.55rem 0.95rem',
      border: '1px solid var(--v2-line)',
      borderRadius: 'var(--v2-radius-pill)',
      fontSize: '0.85rem',
      background: 'var(--v2-white)',
      outline: 'none'
    }}
  />
)

const Select = (p: { children: React.ReactNode; value: string; onChange(value: string): void }) => (
  <select
    value={p.value}
    onChange={(event) => p.onChange(event.currentTarget.value)}
    style={{
    padding: '0.55rem 0.95rem',
    border: '1px solid var(--v2-line)',
    borderRadius: 'var(--v2-radius-pill)',
    fontSize: '0.85rem',
    background: 'var(--v2-white)',
    color: 'var(--v2-ink-soft)',
    cursor: 'pointer'
  }}
  >
    {p.children}
  </select>
)

const DateInput = (p: { value: string }) => (
  <input
    type="text"
    defaultValue={p.value}
    style={{
      width: 120,
      padding: '0.4rem 0.7rem',
      border: '1px solid var(--v2-line)',
      borderRadius: 'var(--v2-radius-sm)',
      fontSize: '0.82rem',
      background: 'var(--v2-white)',
      color: 'var(--v2-ink)'
    }}
  />
)

const Preset = (p: { active?: boolean; children: React.ReactNode }) => (
  <button style={{
    padding: '0.4rem 0.75rem',
    border: '1px solid var(--v2-line)',
    borderRadius: 'var(--v2-radius-pill)',
    background: p.active ? 'var(--v2-ink)' : 'var(--v2-white)',
    color: p.active ? 'var(--v2-white)' : 'var(--v2-ink-soft)',
    fontSize: '0.78rem', fontWeight: 600,
    cursor: 'pointer'
  }}>{p.children}</button>
)

function openLegacyUsers() {
  window.location.href = '/AllUsers'
}

export function AllTeachers() {
  const history = useHistory()
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const [rows, setRows] = React.useState<TeacherRow[]>(EMPTY_ROWS)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [search, setSearch] = React.useState('')
  const [roleFilter, setRoleFilter] = React.useState('all')
  const [statusFilter, setStatusFilter] = React.useState('active')

  React.useEffect(() => {
    if (!auth.user) {
      return
    }

    let active = true
    setLoading(true)
    setError(null)
    createV2Api(firebase).getTeachersForCoach(auth.user.uid).then(nextRows => {
      if (!active) return
      setRows(nextRows.length > 0 ? nextRows as TeacherRow[] : [])
      setLoading(false)
    }).catch(fetchError => {
      if (!active) return
      setError(fetchError as Error)
      setLoading(false)
    })

    return () => { active = false }
  }, [auth.user, firebase])

  const normalizedSearch = search.trim().toLowerCase()
  const filteredRows = rows.filter(row => {
    const text = `${row.firstName} ${row.lastName} ${row.program} ${roleLabel[row.role]}`.toLowerCase()
    const matchesSearch = normalizedSearch === '' || text.includes(normalizedSearch)
    const matchesRole = roleFilter === 'all' || row.role === roleFilter
    const matchesStatus = statusFilter === 'all' || row.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const openProfile = (row: TeacherRow) => {
    history.push(`/v2/teachers/${encodeURIComponent(row.id)}?teacherName=${encodeURIComponent(`${row.firstName} ${row.lastName}`.trim())}&program=${encodeURIComponent(row.program)}`)
  }

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>All Teachers</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            {filteredRows.length} of {rows.length} teammates · login activity and recent action data
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="primary" onClick={openLegacyUsers}>Open legacy users</Button>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: 'var(--v2-white)',
        borderRadius: 'var(--v2-radius)',
        padding: '1rem 1.25rem',
        border: '1px solid var(--v2-line-soft)',
        boxShadow: 'var(--v2-shadow-sm)',
        marginBottom: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <FilterInput placeholder="🔍 Search teachers, programs, sites…" value={search} onChange={setSearch} />
          <Select value={roleFilter} onChange={setRoleFilter}><option value="all">All roles</option><option value="teacher">Teacher</option><option value="coach">Coach</option><option value="admin">Admin</option><option value="siteLeader">Site Leader</option><option value="programLeader">Program Leader</option></Select>
          <Select value={statusFilter} onChange={setStatusFilter}><option value="all">All statuses</option><option value="active">Active</option><option value="archived">Archived</option></Select>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--v2-muted)', fontWeight: 500 }}>Date range:</span>
          <DateInput value="04/20/26" />
          <span style={{ color: 'var(--v2-muted)' }}>→</span>
          <DateInput value="05/20/26" />
          <Preset>7d</Preset>
          <Preset active>30d</Preset>
          <Preset>90d</Preset>
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: 'var(--v2-white)',
        borderRadius: 'var(--v2-radius)',
        border: '1px solid var(--v2-line-soft)',
        boxShadow: 'var(--v2-shadow-sm)',
        overflow: 'auto'
      }}>
        {loading ? (
          <div style={{ padding: '1rem' }}>
            <TableSkeleton rows={8} cols={7} />
          </div>
        ) : filteredRows.length === 0 ? (
          <EmptyState title="No teammates match these filters" description="Adjust the search, role, status, or date range and try again." />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: 0, minWidth: 1180 }}>
            <thead>
              <tr style={{ background: 'var(--v2-bg-soft)' }}>
                {['Name', 'Role · Program', 'Status', 'Last Login', 'Login Count', 'Action Count', 'Last Action', ''].map((h, i) => (
                  <th key={i} style={{
                    textAlign: 'left',
                    padding: '0.85rem 1rem',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--v2-muted)',
                    borderBottom: '1px solid var(--v2-line)'
                  }}>
                    {h}
                    {(h === 'Login Count' || h === 'Action Count') && (
                      <div style={{ fontWeight: 400, color: 'var(--v2-muted-soft)', fontSize: '0.7rem', textTransform: 'none', letterSpacing: 0, marginTop: '0.15rem' }}>Last 30 days</div>
                    )}
                    {h === 'Last Action' && (
                      <div style={{ fontWeight: 400, color: 'var(--v2-muted-soft)', fontSize: '0.7rem', textTransform: 'none', letterSpacing: 0, marginTop: '0.15rem' }}>all time</div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--v2-line-soft)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <Avatar name={`${r.firstName} ${r.lastName}`} size={30} />
                      <strong>{r.firstName} {r.lastName}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', color: 'var(--v2-ink-soft)' }}>
                    {roleLabel[r.role]} · {r.program}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem' }}>
                    <Pill variant={r.status === 'active' ? 'success' : 'neutral'}>
                      {r.status === 'active' ? 'Active' : 'Archived'}
                    </Pill>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', color: 'var(--v2-ink-soft)' }}>{r.lastLogin}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', fontWeight: 700, textAlign: 'right' }}>{r.loginCount}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', fontWeight: 700, textAlign: 'right' }}>
                    <span style={{ borderBottom: r.actionCount > 0 ? '1px dotted var(--v2-muted-soft)' : 'none', cursor: 'help' }}>
                      {r.actionCount}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', color: 'var(--v2-ink-soft)' }}>
                    {r.lastAction.type} — {r.lastAction.date}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <Button size="sm" onClick={() => openProfile(r)}>Open</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--v2-muted)', textAlign: 'center' }}>
        {error ? 'Live data unavailable; showing last loaded rows' : `Showing ${filteredRows.length} of ${rows.length} records`}
      </div>

    </div>
  )
}
