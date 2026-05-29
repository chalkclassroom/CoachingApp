import * as React from 'react'
import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { Skeleton } from '../components/Skeleton'
import { useToast } from '../hooks/useToast'
import { useV2Auth } from '../hooks/useV2Auth'
import { useV2Firebase } from '../lib/firebase'
import { createV2Api } from '../lib/api'

type Reason = 'alert' | 'win' | 'skip'

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

const CARDS: TrainingCard[] = [
  { title: 'Smooth Transitions', icon: '⏱', tone: 'warm', reason: 'alert', reasonText: '⚠ 3 of your teachers flagged in this area', ctaText: 'Start (18 min)', ctaVariant: 'primary' },
  { title: 'Open-Ended Questions', icon: '🗣', tone: 'brand', reason: 'alert', reasonText: '⚠ Recurring theme in last 5 observations', ctaText: 'Start (24 min)', ctaVariant: 'primary' },
  { title: 'Classroom Climate', icon: '💚', tone: 'success', reason: 'win', reasonText: '✓ You scored in the top 10% — refresh available', ctaText: 'Refresh (8 min)' },
  { title: 'Conscious Discipline Foundations', icon: '📚', tone: 'purple', reason: 'skip', reasonText: 'Completed in 2024 — skip unless needed', ctaText: 'Review notes' },
  { title: 'Using Magic 9 effectively', icon: '📊', tone: 'gold', reason: 'skip', reasonText: 'Optional · recommended for new coaches', ctaText: 'Not now' },
  { title: 'Writing better action plans', icon: '🎯', tone: 'warm', reason: 'alert', reasonText: '⚠ Your last 2 plans had no measurable goals', ctaText: 'Start (12 min)', ctaVariant: 'primary' }
]

const toneBg: Record<TrainingCard['tone'], string> = {
  warm: 'linear-gradient(135deg, #f0523d, #d63a26)',
  brand: 'linear-gradient(135deg, #00b2ff, #006fa5)',
  success: 'linear-gradient(135deg, #2ECC71, #169c54)',
  gold: 'linear-gradient(135deg, #f0a623, #c47e15)',
  purple: 'linear-gradient(135deg, #6f39c4, #f0523d)'
}

const reasonStyle: Record<Reason, { bg: string; fg: string }> = {
  alert:   { bg: 'var(--v2-warm-soft)', fg: 'var(--v2-warm-dark)' },
  win:     { bg: 'var(--v2-success-soft)', fg: '#15803D' },
  skip:    { bg: 'var(--v2-bg-soft)', fg: 'var(--v2-muted)' }
}

export function Training() {
  const firebase = useV2Firebase()
  const auth = useV2Auth()
  const toast = useToast()
  const [cards, setCards] = React.useState<TrainingCard[]>(CARDS)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (!auth.user) {
      return
    }

    let active = true
    setLoading(true)
    setError(null)
    createV2Api(firebase).getTrainingRecommendations(auth.user.uid).then(nextCards => {
      if (!active) return
      setCards(nextCards.length > 0 ? nextCards : [])
      setLoading(false)
    }).catch(fetchError => {
      if (!active) return
      setError(fetchError as Error)
      setLoading(false)
    })

    return () => { active = false }
  }, [auth.user, firebase])

  const handleCardAction = (card: TrainingCard) => {
    if (card.reason === 'skip') {
      toast.info(`${card.title} is optional for this coach right now.`)
      return
    }
    toast.info(`${card.title} training opens from the existing CHALK training library.`)
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Training tailored to your coaching</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            Based on patterns in your recent observations and action plans — recommended, not required.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button>All training</Button>
          <Button>Completed</Button>
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
        )) : cards.length === 0 ? (
          <div style={{ gridColumn: '1 / -1' }}>
            <EmptyState title="No training recommendations" description="Training recommendations will appear after recent observations and action plans are available." />
          </div>
        ) : cards.map((c, i) => (
          <div key={c.id || i} style={{
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
                background: reasonStyle[c.reason].bg,
                color: reasonStyle[c.reason].fg
              }}>{c.reasonText}</div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <Button
                  variant={c.ctaVariant === 'primary' ? 'primary' : 'default'}
                  size="sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleCardAction(c)}
                >
                  {c.ctaText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
