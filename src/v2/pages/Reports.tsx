import * as React from 'react'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Skeleton } from '../components/Skeleton'
import { Stat } from '../components/Stat'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'
import { DashboardStats, PracticeTrend } from '../lib/types'

const EMPTY_STATS: DashboardStats = { underCoaching: 0, needAttention: 0, observationsThisWeek: 0, activePlans: 0 }

function openLegacyReports() {
  window.location.href = '/Reports'
}

function csvCell(value: string | number): string {
  const text = String(value)
  return '"' + text.replace(/"/g, '""') + '"'
}

function downloadReportCsv(stats: DashboardStats, trends: PracticeTrend[]) {
  const rows = [
    ['Section', 'Metric', 'Value'],
    ['Summary', 'Teachers coached', String(stats.underCoaching)],
    ['Summary', 'Need attention', String(stats.needAttention)],
    ['Summary', 'Observations this week', String(stats.observationsThisWeek)],
    ['Summary', 'Plans active', String(stats.activePlans)],
    ...trends.map(row => ['Practice trend', row.label, String(row.count)])
  ]
  const csv = rows.map(row => row.map(csvCell).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'chalk-v2-report.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function Bar(props: PracticeTrend) {
  const color = props.tone === 'warm' ? 'var(--v2-warm)' : props.tone === 'success' ? 'var(--v2-success)' : props.tone === 'gold' ? 'var(--v2-gold)' : 'var(--v2-brand)'
  return (
    <div style={{ display: 'grid', gap: '0.35rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
        <strong>{props.label}</strong>
        <span style={{ color: 'var(--v2-muted)' }}>{props.count} obs</span>
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
  const [stats, setStats] = React.useState<DashboardStats>(EMPTY_STATS)
  const [trends, setTrends] = React.useState<PracticeTrend[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!auth.user) {
      return
    }

    let active = true
    setLoading(true)
    setError(null)
    Promise.all([
      createV2Api(firebase).getDashboardStats(auth.user.uid),
      createV2Api(firebase).getPracticeTrends(auth.user.uid)
    ]).then(([nextStats, nextTrends]) => {
      if (!active) return
      setStats(nextStats)
      setTrends(nextTrends)
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
            Live coaching activity summary with CSV export. Advanced saved reports and scheduling remain in legacy CHALK until the V2 reporting contract is complete.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={() => downloadReportCsv(stats, trends)} disabled={loading || Boolean(error)}>Export CSV</Button>
          <Button variant="primary" onClick={openLegacyReports}>Open legacy reports</Button>
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
          <CardHeader title="Practice trends" />
          {trends.length === 0 ? (
            <EmptyState
              title="No observations in this range"
              description="Complete observations will populate this V2 practice trend chart."
              cta={<Button onClick={openLegacyReports}>Open legacy reports</Button>}
            />
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {trends.map(row => <Bar key={row.label} {...row} />)}
            </div>
          )}
        </Card>

        <Card padding="0" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--v2-line-soft)' }}>
            <CardHeader title="Saved reports" />
          </div>
          <EmptyState
            title="Saved and scheduled reports remain in legacy CHALK"
            description="Use the legacy reporting workspace for saved report libraries and scheduled report delivery."
            cta={<Button onClick={openLegacyReports}>Open legacy reports</Button>}
          />
        </Card>
      </div>
    </div>
  )
}
