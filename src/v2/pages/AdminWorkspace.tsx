import * as React from 'react'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { Pill } from '../components/Pill'
import { Stat } from '../components/Stat'
import { useToast } from '../hooks/useToast'

type AdminTab = 'users' | 'programs' | 'sites'
type UserRow = { name: string; role: string; program: string; status: 'active' | 'invited' | 'archived'; lastLogin: string }
type ProgramRow = { name: string; sites: number; teachers: number; coaches: number; status: 'active' | 'setup' }
type SiteRow = { name: string; program: string; teachers: number; coaches: number; lastActivity: string }

const USERS: UserRow[] = [
  { name: 'Devon Owen', role: 'Coach', program: 'Demo Early Learning', status: 'active', lastLogin: 'Today 7:01 AM' },
  { name: 'Blair Carter', role: 'Admin', program: 'Campus Demo Center', status: 'active', lastLogin: 'Yesterday 11:10 AM' },
  { name: 'Harper Kim', role: 'Teacher', program: 'Northside Demo Academy', status: 'invited', lastLogin: 'Never' },
  { name: 'Reese Allen', role: 'Teacher', program: 'Demo Early Learning', status: 'archived', lastLogin: 'Nov 13, 2024' }
]
const PROGRAMS: ProgramRow[] = [
  { name: 'Demo Early Learning', sites: 2, teachers: 18, coaches: 3, status: 'active' },
  { name: 'River Center Demo', sites: 1, teachers: 11, coaches: 2, status: 'active' },
  { name: 'Community Demo Network', sites: 4, teachers: 24, coaches: 4, status: 'setup' }
]
const SITES: SiteRow[] = [
  { name: 'North Campus', program: 'Demo Early Learning', teachers: 9, coaches: 2, lastActivity: 'Today' },
  { name: 'River Center', program: 'River Center Demo', teachers: 11, coaches: 2, lastActivity: 'Yesterday' },
  { name: 'Westside Learning', program: 'Community Demo Network', teachers: 7, coaches: 1, lastActivity: 'May 28' }
]

function statusVariant(status: string): 'neutral' | 'brand' | 'success' {
  if (status === 'active') return 'success'
  if (status === 'setup' || status === 'invited') return 'brand'
  return 'neutral'
}

function Tab(props: { active: boolean; children: React.ReactNode; onClick(): void }) {
  return <Button size="sm" onClick={props.onClick} style={{ background: props.active ? 'var(--v2-ink)' : 'var(--v2-white)', color: props.active ? 'var(--v2-white)' : 'var(--v2-ink-soft)', borderColor: props.active ? 'var(--v2-ink)' : 'var(--v2-line)' }}>{props.children}</Button>
}

export function AdminWorkspace() {
  const toast = useToast()
  const [tab, setTab] = React.useState<AdminTab>('users')

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Admin workspace</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            Manage users, programs, and sites without leaving the renovated shell.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={() => toast.info('Bulk import remains tied to the legacy CSV backend for this slice.')}>Import users</Button>
          <Button variant="primary" onClick={() => toast.info('Creation modals will connect after admin write rules are approved.')}>+ New</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <Stat label="Users" value={USERS.length} tone="brand" icon="U" delta={{ text: 'Preview directory', trend: 'flat' }} />
        <Stat label="Programs" value={PROGRAMS.length} tone="gold" icon="P" delta={{ text: 'Active + setup', trend: 'flat' }} />
        <Stat label="Sites" value={SITES.length} tone="success" icon="S" delta={{ text: 'Across programs', trend: 'up' }} />
        <Stat label="Invites" value={USERS.filter(user => user.status === 'invited').length} tone="warm" icon="I" delta={{ text: 'Pending acceptance', trend: 'warn' }} />
      </div>

      <Card padding="1rem" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Tab active={tab === 'users'} onClick={() => setTab('users')}>Users</Tab>
          <Tab active={tab === 'programs'} onClick={() => setTab('programs')}>Programs</Tab>
          <Tab active={tab === 'sites'} onClick={() => setTab('sites')}>Sites</Tab>
        </div>
      </Card>

      {tab === 'users' && (
        <Card padding="0" style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', minWidth: 760, borderCollapse: 'collapse' }}>
            <thead><tr style={{ background: 'var(--v2-bg-soft)' }}>{['Name', 'Role', 'Program', 'Status', 'Last login', ''].map(h => <th key={h} style={{ textAlign: 'left', padding: '0.85rem 1rem', color: 'var(--v2-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>)}</tr></thead>
            <tbody>{USERS.map(user => <tr key={user.name} style={{ borderTop: '1px solid var(--v2-line-soft)' }}><td style={{ padding: '0.9rem 1rem', fontWeight: 700 }}>{user.name}</td><td style={{ padding: '0.9rem 1rem' }}>{user.role}</td><td style={{ padding: '0.9rem 1rem', color: 'var(--v2-muted)' }}>{user.program}</td><td style={{ padding: '0.9rem 1rem' }}><Pill variant={statusVariant(user.status)}>{user.status}</Pill></td><td style={{ padding: '0.9rem 1rem', color: 'var(--v2-muted)' }}>{user.lastLogin}</td><td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}><Button size="sm" onClick={() => toast.info(`${user.name} user settings opened in preview mode.`)}>Edit</Button></td></tr>)}</tbody>
          </table>
        </Card>
      )}

      {tab === 'programs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {PROGRAMS.map(program => <Card key={program.name}><CardHeader title={program.name} badge={<Pill variant={statusVariant(program.status)}>{program.status}</Pill>} /><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}><div><strong>{program.sites}</strong><div style={{ color: 'var(--v2-muted)', fontSize: '0.76rem' }}>Sites</div></div><div><strong>{program.teachers}</strong><div style={{ color: 'var(--v2-muted)', fontSize: '0.76rem' }}>Teachers</div></div><div><strong>{program.coaches}</strong><div style={{ color: 'var(--v2-muted)', fontSize: '0.76rem' }}>Coaches</div></div></div><Button size="sm" style={{ marginTop: '1rem' }} onClick={() => toast.info(`${program.name} program profile opened in preview mode.`)}>Open program</Button></Card>)}
        </div>
      )}

      {tab === 'sites' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {SITES.map(site => <Card key={site.name}><CardHeader title={site.name} /><div style={{ color: 'var(--v2-muted)', fontSize: '0.86rem', marginBottom: '0.85rem' }}>{site.program}</div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}><span>{site.teachers} teachers</span><span>{site.coaches} coaches</span></div><div style={{ color: 'var(--v2-muted)', fontSize: '0.78rem', marginTop: '0.6rem' }}>Last activity {site.lastActivity}</div></Card>)}
        </div>
      )}
    </div>
  )
}
