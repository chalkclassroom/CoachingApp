import * as React from 'react'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Pill } from '../components/Pill'

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
  { id: '1', firstName: 'Dawn', lastName: 'Johnson', role: 'teacher', program: 'Preschool Promise', status: 'active', lastLogin: '5/19/26, 8:32 AM', loginCount: 14, actionCount: 8, lastAction: { type: 'Observation', date: '5/18/26, 2:14 PM' } },
  { id: '2', firstName: 'Chrystaline', lastName: 'Glenn', role: 'teacher', program: 'All Our Children Elite Childcare', status: 'active', lastLogin: '5/20/26, 9:15 AM', loginCount: 22, actionCount: 12, lastAction: { type: 'Action Plan', date: '5/19/26, 4:42 PM' } },
  { id: '3', firstName: 'Kerry', lastName: 'Leedy', role: 'teacher', program: 'Preschool Promise', status: 'active', lastLogin: '5/14/26, 9:05 PM', loginCount: 7, actionCount: 3, lastAction: { type: 'Observation', date: '5/14/26, 9:05 PM' } },
  { id: '4', firstName: 'Shonnell', lastName: 'Wilkins', role: 'teacher', program: 'All Our Children Elite Childcare', status: 'active', lastLogin: '5/17/26, 7:18 AM', loginCount: 5, actionCount: 2, lastAction: { type: 'Observation', date: '5/15/26, 10:22 AM' } },
  { id: '5', firstName: 'Cassie', lastName: 'Sexton', role: 'teacher', program: 'Preschool Promise', status: 'active', lastLogin: '5/19/26, 2:48 PM', loginCount: 9, actionCount: 5, lastAction: { type: 'Training', date: '5/19/26, 3:00 PM' } },
  { id: '6', firstName: 'Rene’e', lastName: 'Johnson', role: 'teacher', program: 'Vanderbilt Child and Family Center', status: 'active', lastLogin: '5/18/26, 11:02 AM', loginCount: 6, actionCount: 1, lastAction: { type: 'Observation', date: '5/12/26, 9:30 AM' } },
  { id: '7', firstName: 'Nicole', lastName: 'Broomfield', role: 'teacher', program: 'Excel Prep Academy', status: 'active', lastLogin: '5/19/26, 4:14 PM', loginCount: 11, actionCount: 4, lastAction: { type: 'Conference Plan', date: '5/16/26, 1:48 PM' } },
  { id: '8', firstName: 'Tyquaona', lastName: 'Montgomery', role: 'teacher', program: 'All Our Children Elite Childcare', status: 'active', lastLogin: '5/13/26, 8:01 AM', loginCount: 4, actionCount: 2, lastAction: { type: 'Email', date: '5/13/26, 10:11 AM' } },
  { id: '9', firstName: 'Ann', lastName: 'James', role: 'teacher', program: 'Rex Childcare & Early Learning', status: 'active', lastLogin: 'Never', loginCount: 0, actionCount: 1, lastAction: { type: 'Observation', date: '5/11/26, 2:00 PM' } },
  { id: '10', firstName: 'Michelle', lastName: 'Kreitzer', role: 'teacher', program: 'Vanderbilt Child and Family Center', status: 'active', lastLogin: '5/20/26, 7:42 AM', loginCount: 18, actionCount: 6, lastAction: { type: 'Conference Plan', date: '5/19/26, 11:30 AM' } },
  { id: '11', firstName: 'Ciera', lastName: 'Davis', role: 'teacher', program: 'United Way', status: 'active', lastLogin: '5/16/26, 1:22 PM', loginCount: 3, actionCount: 1, lastAction: { type: 'Observation', date: '5/16/26, 2:45 PM' } },
  { id: '12', firstName: 'Ja’Naye', lastName: 'Lattimore', role: 'teacher', program: 'United Way', status: 'active', lastLogin: '5/18/26, 9:55 AM', loginCount: 8, actionCount: 4, lastAction: { type: 'Training', date: '5/18/26, 10:30 AM' } },
  { id: '13', firstName: 'Mitzi', lastName: 'Keesee', role: 'teacher', program: 'Excel Prep Academy', status: 'active', lastLogin: '5/15/26, 3:12 PM', loginCount: 6, actionCount: 2, lastAction: { type: 'Action Plan', date: '5/14/26, 4:22 PM' } },
  { id: '14', firstName: 'Tina', lastName: 'Arnold', role: 'teacher', program: 'Preschool Promise', status: 'archived', lastLogin: '11/13/24, 1:20 PM', loginCount: 0, actionCount: 0, lastAction: { type: 'Email', date: '11/13/24, 1:20 PM' } },
  { id: '15', firstName: 'Tisha', lastName: 'Owen', role: 'coach', program: 'Preschool Promise', status: 'active', lastLogin: '5/20/26, 7:01 AM', loginCount: 25, actionCount: 32, lastAction: { type: 'Observation', date: '5/20/26, 10:00 AM' } },
  { id: '16', firstName: 'Dana', lastName: 'Al-Sarraj', role: 'coach', program: 'Vanderbilt Child and Family Center', status: 'active', lastLogin: '5/19/26, 4:30 PM', loginCount: 19, actionCount: 27, lastAction: { type: 'Conference Plan', date: '5/19/26, 5:00 PM' } },
  { id: '17', firstName: 'Latara', lastName: 'Holt', role: 'coach', program: 'United Way', status: 'active', lastLogin: '5/20/26, 6:55 AM', loginCount: 21, actionCount: 24, lastAction: { type: 'Action Plan', date: '5/20/26, 9:14 AM' } },
  { id: '18', firstName: 'Caroline', lastName: 'Christopher', role: 'admin', program: 'Vanderbilt Child and Family Center', status: 'active', lastLogin: '5/19/26, 11:10 AM', loginCount: 12, actionCount: 8, lastAction: { type: 'Email', date: '5/19/26, 11:20 AM' } },
]

const roleLabel: Record<TeacherRow['role'], string> = {
  admin: 'Admin', programLeader: 'Program Leader', siteLeader: 'Site Leader',
  coach: 'Coach', teacher: 'Teacher'
}

const FilterInput = (p: { placeholder: string; value?: string; width?: number }) => (
  <input
    placeholder={p.placeholder}
    defaultValue={p.value}
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

const Select = (p: { children: React.ReactNode }) => (
  <select style={{
    padding: '0.55rem 0.95rem',
    border: '1px solid var(--v2-line)',
    borderRadius: 'var(--v2-radius-pill)',
    fontSize: '0.85rem',
    background: 'var(--v2-white)',
    color: 'var(--v2-ink-soft)',
    cursor: 'pointer'
  }}>{p.children}</select>
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
  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>All Teachers</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            {ROWS.length} teammates · login activity and recent action data
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button>📥 Import CSV</Button>
          <Button variant="primary">+ Add teammate</Button>
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
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <FilterInput placeholder="🔍 Search teachers, programs, sites…" />
          <Select><option>All roles</option><option>Teacher</option><option>Coach</option></Select>
          <Select><option>Active</option><option>Archived</option></Select>
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
        <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: 0, minWidth: 1100 }}>
          <thead>
            <tr style={{ background: 'var(--v2-bg-soft)' }}>
              {['Name', 'Role · Program', 'Status', 'Last Login', 'Login Count', 'Action Count', 'Last Action'].map((h, i) => (
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
                    <div style={{ fontWeight: 400, color: 'var(--v2-muted-soft)', fontSize: '0.7rem', textTransform: 'none', letterSpacing: 0, marginTop: '0.15rem' }}>Apr 20 – May 20</div>
                  )}
                  {h === 'Last Action' && (
                    <div style={{ fontWeight: 400, color: 'var(--v2-muted-soft)', fontSize: '0.7rem', textTransform: 'none', letterSpacing: 0, marginTop: '0.15rem' }}>all time</div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(r => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--v2-muted)', textAlign: 'center' }}>
        Showing 1-{ROWS.length} of {ROWS.length} records
      </div>
    </div>
  )
}
