import * as React from 'react'
import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { Skeleton } from '../components/Skeleton'
import { useToast } from '../hooks/useToast'
import { useQueryState } from '../hooks/useQueryState'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'

type Reason = 'alert' | 'win' | 'skip'
type TrainingView = 'recommended' | 'all' | 'completed'

type TrainingCard = {
  id?: string
  title: string
  icon: string
  tone: 'warm' | 'brand' | 'success' | 'gold' | 'purple'
  reason: Reason
  reasonText: string
  ctaText: string
  ctaVariant?: 'default' | 'primary'
}

const EMPTY_CARDS: TrainingCard[] = []

const toneBg: Record<TrainingCard['tone'], string> = {
  warm: 'linear-gradient(135deg, #f0523d, #d63a26)',
  brand: 'linear-gradient(135deg, #00b2ff, #006fa5)',
  success: 'linear-gradient(135deg, #2ECC71, #169c54)',
  gold: 'linear-gradient(135deg, #f0a623, #c47e15)',
  purple: 'linear-gradient(135deg, #6f39c4, #f0523d)'
}

const reasonStyle: Record<Reason | 'complete', { bg: string; fg: string }> = {
  alert:   { bg: 'var(--v2-warm-soft)', fg: 'var(--v2-warm-dark)' },
  win:     { bg: 'var(--v2-success-soft)', fg: '#15803D' },
  skip:    { bg: 'var(--v2-bg-soft)', fg: 'var(--v2-muted)' },
  complete:{ bg: 'var(--v2-success-soft)', fg: 'var(--v2-success)' }
}

function storageKey(uid: string | undefined, suffix: string): string {
  return `chalk-v2-training-${suffix}-${uid || 'preview'}`
}

function loadStoredIds(key: string): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(key) || '[]')
  } catch (error) {
    return []
  }
}

export function Training() {
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const toast = useToast()
  const [cards, setCards] = React.useState<TrainingCard[]>(EMPTY_CARDS)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [view, setView] = useQueryState<TrainingView>('view', 'recommended', ['recommended', 'all', 'completed'])
  const [completedIds, setCompletedIds] = React.useState<string[]>(() => loadStoredIds(storageKey(undefined, 'completed')))
  const [dismissedIds, setDismissedIds] = React.useState<string[]>(() => loadStoredIds(storageKey(undefined, 'dismissed')))

  React.useEffect(() => {
    const uid = auth.user?.uid
    setCompletedIds(loadStoredIds(storageKey(uid, 'completed')))
    setDismissedIds(loadStoredIds(storageKey(uid, 'dismissed')))
  }, [auth.user])

  React.useEffect(() => {
    if (!auth.user) {
      return
    }

    let active = true
    const api = createV2Api(firebase)
    setLoading(true)
    setError(null)

    Promise.all([
      api.getTrainingRecommendations(auth.user.uid),
      api.getTrainingStatus(auth.user.uid)
    ]).then(([nextCards, status]) => {
      if (!active) return
      setCards(nextCards.length > 0 ? nextCards : [])
      setCompletedIds(Object.keys(status).filter(id => status[id]?.completedAt))
      setDismissedIds(Object.keys(status).filter(id => status[id]?.dismissedAt && !status[id]?.completedAt))
      setLoading(false)
    }).catch(fetchError => {
      if (!active) return
      setError(fetchError as Error)
      setLoading(false)
    })

    return () => { active = false }
  }, [auth.user, firebase])

  React.useEffect(() => {
    const uid = auth.user?.uid
    window.localStorage.setItem(storageKey(uid, 'completed'), JSON.stringify(completedIds))
    window.localStorage.setItem(storageKey(uid, 'dismissed'), JSON.stringify(dismissedIds))
  }, [auth.user, completedIds, dismissedIds])

  const visibleCards = cards.filter(card => {
    const id = card.id || card.title
    if (view === 'completed') return completedIds.includes(id)
    if (view === 'recommended') return !completedIds.includes(id) && !dismissedIds.includes(id)
    return !dismissedIds.includes(id) || completedIds.includes(id)
  })

  const markCompleted = (id: string) => {
    setCompletedIds(current => current.includes(id) ? current : [...current, id])
    setDismissedIds(current => current.filter(item => item !== id))
  }

  const dismissCard = (id: string) => {
    setDismissedIds(current => current.includes(id) ? current : [...current, id])
  }

  const handleCardAction = (card: TrainingCard) => {
    const id = card.id || card.title
    const api = createV2Api(firebase)

    if (card.reason === 'skip') {
      if (!auth.user) {
        dismissCard(id)
        toast.info(`${card.title} skipped locally.`)
        return
      }

      api.dismissTrainingRecommendation(auth.user.uid, id).then(() => {
        dismissCard(id)
        toast.info(`${card.title} skipped.`)
      }).catch(error => {
        console.error('Unable to skip training', error)
        toast.error('Unable to skip training.')
      })
      return
    }

    if (!auth.user) {
      markCompleted(id)
      toast.success(`${card.title} marked complete locally.`)
      return
    }

    api.markTrainingCompleted(auth.user.uid, id).then(() => {
      markCompleted(id)
      toast.success(`${card.title} marked complete.`)
    }).catch(error => {
      console.error('Unable to mark training complete', error)
      toast.error('Unable to mark training complete.')
    })
  }

  const tabStyle = (key: TrainingView): React.CSSProperties => ({
    background: view === key ? 'var(--v2-ink)' : 'var(--v2-white)',
    color: view === key ? 'var(--v2-white)' : 'var(--v2-ink-soft)',
    border: '1px solid var(--v2-line)'
  })

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Training tailored to your coaching</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            Curated CHALK training modules with completion status saved per coach — recommended, not required.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button style={tabStyle('recommended')} onClick={() => setView('recommended')}>Recommended</Button>
          <Button style={tabStyle('all')} onClick={() => setView('all')}>All training</Button>
          <Button style={tabStyle('completed')} onClick={() => setView('completed')}>Completed</Button>
        </div>
      </div>

      {error && (
        <div style={{ color: 'var(--v2-warm-dark)', fontWeight: 600, marginBottom: '1rem' }}>Live training recommendations unavailable; showing local recommendations.</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {loading ? [0, 1, 2].map(i => (
          <div key={i} style={{
            background: 'var(--v2-white)',
            borderRadius: 'var(--v2-radius)',
            border: '1px solid var(--v2-line-soft)',
            overflow: 'hidden',
            boxShadow: 'var(--v2-shadow-sm)',
            padding: '1.1rem'
          }}>
            <Skeleton height={120} style={{ marginBottom: '1rem' }} />
            <Skeleton width="70%" height={20} style={{ marginBottom: '0.7rem' }} />
            <Skeleton height={34} style={{ marginBottom: '0.8rem' }} />
            <Skeleton width="45%" height={30} />
          </div>
        )) : visibleCards.length === 0 ? (
          <div style={{ gridColumn: '1 / -1' }}>
            <EmptyState title="No training in this view" description="Completed and skipped recommendations are tracked per coach." />
          </div>
        ) : visibleCards.map((c, i) => {
          const id = c.id || c.title
          const complete = completedIds.includes(id)
          const statusStyle = complete ? reasonStyle.complete : reasonStyle[c.reason]
          return (
            <div key={id || i} style={{
              background: 'var(--v2-white)',
              borderRadius: 'var(--v2-radius)',
              border: '1px solid var(--v2-line-soft)',
              overflow: 'hidden',
              boxShadow: 'var(--v2-shadow-sm)'
            }}>
              <div style={{
                height: 120,
                background: toneBg[c.tone],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '2rem'
              }}>
                {c.icon}
              </div>
              <div style={{ padding: '1.1rem' }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 600, marginBottom: '0.35rem' }}>{c.title}</h4>
                <div style={{
                  fontSize: '0.76rem',
                  padding: '0.4rem 0.6rem',
                  borderRadius: 6,
                  margin: '0.5rem 0 0.8rem',
                  fontWeight: 600,
                  background: statusStyle.bg,
                  color: statusStyle.fg
                }}>{complete ? '✓ Completed for this coach' : c.reasonText}</div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <Button
                    variant={complete ? 'default' : c.ctaVariant === 'primary' ? 'primary' : 'default'}
                    size="sm"
                    disabled={complete}
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => handleCardAction(c)}
                  >
                    {complete ? 'Completed' : c.ctaText}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
