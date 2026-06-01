import * as React from 'react'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import { Skeleton } from '../components/Skeleton'
import { Stat } from '../components/Stat'
import { useToast } from '../hooks/useToast'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'
import { DashboardStats } from '../lib/types'

type PracticeRow = { label: string; value: number; tone: 'brand' | 'warm' | 'success' | 'gold' }
type ReportRow = { id: string; title: string; scope: string; updated: string; status: 'ready' | 'draft' | 'scheduled' }

const EMPTY_STATS: DashboardStats = { underCoaching: 0, needAttention: 0, observationsThisWeek: 0, activePlans: 0 }
const PRACTICES: PracticeRow[] = []
const REPORTS: ReportRow[] = []

function statusVariant(status: ReportRow['status']): 'neutral' | 'brand' | 'success' {
  if (status === 'ready') return 'success'
  if (status === 'scheduled') return 'brand'
  return 'neutral'
}

function Bar(props: PracticeRow) {
  const color = props.tone === 'warm' ? 'var(--v2-warm)' : props.tone === 'success' ? 'var(--v2-success)' : props.tone === 'gold' ? 'var(--v2-gold)' : 'var(--v2-brand)'
  return (
    <div style={{ display: 'grid', gap: '0.35rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
        <strong>{props.label}</strong>
        <span style={{ color: 'var(--v2-muted)' }}>{props.value}%</span>
      </div>
      <div style={{ height: 10, background: 'var(--v2-bg-soft)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${props.value}%`, background: color }} />
      </div>
    </div>
  )
}

export function Reports() {
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const toast = useToast()
  const [stats, setStats] = React.useState<DashboardStats>(EMPTY_STATS)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!auth.user) {
      return
    }

    let active = true
    setLoading(true)
    setError(null)
    createV2Api(firebase).getDashboardStats(auth.user.uid).then(nextStats => {
      if (!active) return
      setStats(nextStats)
      setLoading(false)
    }).catch(fetchError => {
      if (!active) return
      setError(fetchError as Error)
      setLoading(false)
    })

    return () => { active = false }
  }, [auth.user, firebase])

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Reports</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            Operational reporting for coaching activity, observation trends, and training follow-through.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={() => toast.info('CSV export will reuse the legacy report export backend after signoff.')}>Export CSV</Button>
          <Button variant="primary" onClick={() => toast.info('Report scheduling is mapped for the admin release slice.')}>Schedule report</Button>
        </div>
      </div>

      {error && <div style={{ color: 'var(--v2-warm-dark)', fontWeight: 600, marginBottom: '1rem' }}>Live report stats unavailable.</div>}

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          {[0, 1, 2, 3].map(i => <Card key={i}><Skeleton height={84} /></Card>)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <Stat label="Teachers coached" value={stats.underCoaching} tone="brand" icon="T" delta={{ text: 'Active links', trend: 'flat' }} />
          <Stat label="Need attention" value={stats.needAttention} tone="warm" icon="!" delta={{ text: 'Follow-up queue', trend: stats.needAttention > 0 ? 'warn' : 'flat' }} />
          <Stat label="Observations" value={stats.observationsThisWeek} tone="success" icon="O" delta={{ text: 'This week', trend: 'up' }} />
          <Stat label="Plans active" value={stats.activePlans} tone="gold" icon="P" delta={{ text: 'Current cycle', trend: 'flat' }} />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 0.9fr) minmax(420px, 1.4fr)', gap: '1rem' }}>
        <Card>
          <CardHeader title="Observation practice trends" />
          <div style={{ display: 'grid', gap: '1rem' }}>
            {PRACTICES.map(row => <Bar key={row.label} {...row} />)}
          </div>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.78rem', marginTop: '1rem' }}>
            Percent indicates teachers with at least one recent observation or plan touch in that practice area.
          </div>
        </Card>

        <Card padding="0" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--v2-line-soft)' }}>
            <CardHeader title="Saved reports" />
          </div>
          {REPORTS.length === 0 ? <EmptyState title="No saved reports" description="Create a report to see it here." /> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 620 }}>
              <thead>
                <tr style={{ background: 'var(--v2-bg-soft)' }}>
                  {['Report', 'Scope', 'Updated', 'Status', ''].map(header => (
                    <th key={header} style={{ textAlign: 'left', padding: '0.85rem 1rem', color: 'var(--v2-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--v2-line)' }}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REPORTS.map(report => (
                  <tr key={report.id} style={{ borderBottom: '1px solid var(--v2-line-soft)' }}>
                    <td style={{ padding: '0.9rem 1rem', fontWeight: 700 }}>{report.title}</td>
                    <td style={{ padding: '0.9rem 1rem', color: 'var(--v2-muted)' }}>{report.scope}</td>
                    <td style={{ padding: '0.9rem 1rem', color: 'var(--v2-muted)' }}>{report.updated}</td>
                    <td style={{ padding: '0.9rem 1rem' }}><Pill variant={statusVariant(report.status)}>{report.status}</Pill></td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}><Button size="sm" onClick={() => toast.info(`${report.title} preview opened from V2 reports.`)}>Open</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  )
}
