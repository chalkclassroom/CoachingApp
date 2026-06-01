import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import { TableSkeleton } from '../components/Skeleton'
import { useToast } from '../hooks/useToast'
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

const ROWS: TeacherRow[] = [
  { id: '1', firstName: 'Alex', lastName: 'Rivera', role: 'teacher', program: 'Demo Early Learning', status: 'active', lastLogin: '5/19/26, 8:32 AM', loginCount: 14, actionCount: 8, lastAction: { type: 'Observation', date: '5/18/26, 2:14 PM' } },
  { id: '2', firstName: 'Morgan', lastName: 'Lee', role: 'teacher', program: 'River Center Demo', status: 'active', lastLogin: '5/20/26, 9:15 AM', loginCount: 22, actionCount: 12, lastAction: { type: 'Action Plan', date: '5/19/26, 4:42 PM' } },
  { id: '3', firstName: 'Jamie', lastName: 'Chen', role: 'teacher', program: 'Demo Early Learning', status: 'active', lastLogin: '5/14/26, 9:05 PM', loginCount: 7, actionCount: 3, lastAction: { type: 'Observation', date: '5/14/26, 9:05 PM' } },
  { id: '4', firstName: 'Sam', lastName: 'Taylor', role: 'teacher', program: 'River Center Demo', status: 'active', lastLogin: '5/17/26, 7:18 AM', loginCount: 5, actionCount: 2, lastAction: { type: 'Observation', date: '5/15/26, 10:22 AM' } },
  { id: '5', firstName: 'Casey', lastName: 'Brooks', role: 'teacher', program: 'Demo Early Learning', status: 'active', lastLogin: '5/19/26, 2:48 PM', loginCount: 9, actionCount: 5, lastAction: { type: 'Training', date: '5/19/26, 3:00 PM' } },
  { id: '6', firstName: 'Riley', lastName: 'Nguyen', role: 'teacher', program: 'Campus Demo Center', status: 'active', lastLogin: '5/18/26, 11:02 AM', loginCount: 6, actionCount: 1, lastAction: { type: 'Observation', date: '5/12/26, 9:30 AM' } },
  { id: '7', firstName: 'Jordan', lastName: 'Patel', role: 'teacher', program: 'Northside Demo Academy', status: 'active', lastLogin: '5/19/26, 4:14 PM', loginCount: 11, actionCount: 4, lastAction: { type: 'Conference Plan', date: '5/16/26, 1:48 PM' } },
  { id: '8', firstName: 'Taylor', lastName: 'Morgan', role: 'teacher', program: 'River Center Demo', status: 'active', lastLogin: '5/13/26, 8:01 AM', loginCount: 4, actionCount: 2, lastAction: { type: 'Email', date: '5/13/26, 10:11 AM' } },
  { id: '9', firstName: 'Avery', lastName: 'Quinn', role: 'teacher', program: 'Westside Demo Learning', status: 'active', lastLogin: 'Never', loginCount: 0, actionCount: 1, lastAction: { type: 'Observation', date: '5/11/26, 2:00 PM' } },
  { id: '10', firstName: 'Emery', lastName: 'Stone', role: 'teacher', program: 'Campus Demo Center', status: 'active', lastLogin: '5/20/26, 7:42 AM', loginCount: 18, actionCount: 6, lastAction: { type: 'Conference Plan', date: '5/19/26, 11:30 AM' } },
  { id: '11', firstName: 'Parker', lastName: 'Davis', role: 'teacher', program: 'Community Demo Network', status: 'active', lastLogin: '5/16/26, 1:22 PM', loginCount: 3, actionCount: 1, lastAction: { type: 'Observation', date: '5/16/26, 2:45 PM' } },
  { id: '12', firstName: 'Quinn', lastName: 'Larsen', role: 'teacher', program: 'Community Demo Network', status: 'active', lastLogin: '5/18/26, 9:55 AM', loginCount: 8, actionCount: 4, lastAction: { type: 'Training', date: '5/18/26, 10:30 AM' } },
  { id: '13', firstName: 'Harper', lastName: 'Kim', role: 'teacher', program: 'Northside Demo Academy', status: 'active', lastLogin: '5/15/26, 3:12 PM', loginCount: 6, actionCount: 2, lastAction: { type: 'Action Plan', date: '5/14/26, 4:22 PM' } },
  { id: '14', firstName: 'Reese', lastName: 'Allen', role: 'teacher', program: 'Demo Early Learning', status: 'archived', lastLogin: '11/13/24, 1:20 PM', loginCount: 0, actionCount: 0, lastAction: { type: 'Email', date: '11/13/24, 1:20 PM' } },
  { id: '15', firstName: 'Devon', lastName: 'Owen', role: 'coach', program: 'Demo Early Learning', status: 'active', lastLogin: '5/20/26, 7:01 AM', loginCount: 25, actionCount: 32, lastAction: { type: 'Observation', date: '5/20/26, 10:00 AM' } },
  { id: '16', firstName: 'Marlowe', lastName: 'Reed', role: 'coach', program: 'Campus Demo Center', status: 'active', lastLogin: '5/19/26, 4:30 PM', loginCount: 19, actionCount: 27, lastAction: { type: 'Conference Plan', date: '5/19/26, 5:00 PM' } },
  { id: '17', firstName: 'Skyler', lastName: 'Holt', role: 'coach', program: 'Community Demo Network', status: 'active', lastLogin: '5/20/26, 6:55 AM', loginCount: 21, actionCount: 24, lastAction: { type: 'Action Plan', date: '5/20/26, 9:14 AM' } },
  { id: '18', firstName: 'Blair', lastName: 'Carter', role: 'admin', program: 'Campus Demo Center', status: 'active', lastLogin: '5/19/26, 11:10 AM', loginCount: 12, actionCount: 8, lastAction: { type: 'Email', date: '5/19/26, 11:20 AM' } },
]

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

export function AllTeachers() {
  const history = useHistory()
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const toast = useToast()
  const csvInputRef = React.useRef<HTMLInputElement | null>(null)
  const [rows, setRows] = React.useState<TeacherRow[]>(ROWS)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [search, setSearch] = React.useState('')
  const [roleFilter, setRoleFilter] = React.useState('all')
  const [statusFilter, setStatusFilter] = React.useState('active')
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [draft, setDraft] = React.useState({ firstName: '', lastName: '', role: 'teacher', program: '' })

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

  const addLocalTeammate = () => {
    if (!draft.firstName.trim() || !draft.lastName.trim()) {
      toast.error('First and last name are required.')
      return
    }

    setRows(current => [{
      id: `local-${Date.now()}`,
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
      role: draft.role as TeacherRow['role'],
      program: draft.program.trim() || 'Unassigned',
      status: 'active',
      lastLogin: 'Never',
      loginCount: 0,
      actionCount: 0,
      lastAction: { type: 'None', date: 'Never' }
    }, ...current])
    setDraft({ firstName: '', lastName: '', role: 'teacher', program: '' })
    setShowAddModal(false)
    toast.success('Teammate added to this preview list.')
  }

  const importCsv = (file: File | null) => {
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const content = String(reader.result || '')
      const lines = content.split(/\r?\n/).filter(Boolean)
      if (lines.length < 2) {
        toast.error('CSV needs a header row and at least one teammate row.')
        return
      }

      const headers = lines[0].split(',').map(header => header.trim().toLowerCase())
      const imported = lines.slice(1).map((line, index) => {
        const cols = line.split(',').map(col => col.trim())
        const value = (name: string) => cols[headers.indexOf(name)] || ''
        return {
          id: `csv-${Date.now()}-${index}`,
          firstName: value('firstname') || value('first_name') || value('first') || 'Imported',
          lastName: value('lastname') || value('last_name') || value('last') || `Teacher ${index + 1}`,
          role: (value('role') as TeacherRow['role']) || 'teacher',
          program: value('program') || value('school') || 'Imported CSV',
          status: 'active' as const,
          lastLogin: 'Never',
          loginCount: 0,
          actionCount: 0,
          lastAction: { type: 'None', date: 'Never' }
        }
      })

      setRows(current => [...imported, ...current])
      toast.success(`${imported.length} CSV rows added to this preview list.`)
    }
    reader.readAsText(file)
  }

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
          <input
            ref={csvInputRef}
            type="file"
            accept=".csv,text/csv"
            style={{ display: 'none' }}
            onChange={(event) => importCsv(event.currentTarget.files ? event.currentTarget.files[0] : null)}
          />
          <Button onClick={() => csvInputRef.current?.click()}>📥 Import CSV</Button>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>+ Add teammate</Button>
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
        {error ? 'Live data unavailable; showing current local rows' : `Showing ${filteredRows.length} of ${rows.length} records`}
      </div>

      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(18, 24, 31, 0.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 900
        }}>
          <div style={{
            width: 'min(420px, calc(100vw - 2rem))',
            background: 'var(--v2-white)',
            borderRadius: 10,
            boxShadow: 'var(--v2-shadow-lg)',
            padding: '1.25rem',
            border: '1px solid var(--v2-line-soft)'
          }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.9rem' }}>Add teammate</h3>
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              <input placeholder="First name" value={draft.firstName} onChange={(event) => setDraft(current => ({ ...current, firstName: event.currentTarget.value }))} style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem' }} />
              <input placeholder="Last name" value={draft.lastName} onChange={(event) => setDraft(current => ({ ...current, lastName: event.currentTarget.value }))} style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem' }} />
              <select value={draft.role} onChange={(event) => setDraft(current => ({ ...current, role: event.currentTarget.value }))} style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem', background: 'var(--v2-white)' }}>
                <option value="teacher">Teacher</option>
                <option value="coach">Coach</option>
                <option value="siteLeader">Site Leader</option>
                <option value="programLeader">Program Leader</option>
                <option value="admin">Admin</option>
              </select>
              <input placeholder="Program or site" value={draft.program} onChange={(event) => setDraft(current => ({ ...current, program: event.currentTarget.value }))} style={{ border: '1px solid var(--v2-line)', borderRadius: 8, padding: '0.7rem' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={addLocalTeammate}>Add</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
