import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import { useToast } from '../hooks/useToast'

type ResourceCategory = 'coaching-cycle' | 'professional-development' | 'crosswalks' | 'best-practices'
type Resource = {
  id: string
  title: string
  category: ResourceCategory
  tool: string
  format: 'Guide' | 'Video' | 'Checklist' | 'Crosswalk'
  time: string
  summary: string
  recommended?: boolean
}

const RESOURCES: Resource[] = [
  { id: 'cycle-prepare', title: 'Prepare for a coaching cycle', category: 'coaching-cycle', tool: 'Coaching Cycle', format: 'Checklist', time: '8 min', summary: 'A short sequence for planning observation, feedback, and follow-up before meeting a teacher.', recommended: true },
  { id: 'transition-time', title: 'Transition Time facilitation moves', category: 'professional-development', tool: 'Transition Time', format: 'Guide', time: '14 min', summary: 'Practice examples and reflection prompts for reducing wait time between activities.', recommended: true },
  { id: 'climate-pd', title: 'Classroom Climate reflection set', category: 'professional-development', tool: 'Classroom Climate', format: 'Video', time: '18 min', summary: 'A guided module for noticing responsive language, emotional tone, and routines.' },
  { id: 'math-crosswalk', title: 'Math Instruction crosswalk', category: 'crosswalks', tool: 'Math Instruction', format: 'Crosswalk', time: '6 min', summary: 'Maps CHALK observation evidence to coaching language and aligned next steps.' },
  { id: 'feedback-conversation', title: 'Feedback conversation structure', category: 'best-practices', tool: 'Coaching Best Practices', format: 'Guide', time: '10 min', summary: 'A simple agenda for turning observation evidence into a concrete teacher-owned action plan.' },
  { id: 'student-engagement', title: 'Student Engagement look-fors', category: 'professional-development', tool: 'Student Engagement', format: 'Checklist', time: '7 min', summary: 'Observable indicators and coach prompts for increasing active participation.' },
  { id: 'literacy', title: 'Literacy Instruction resource pack', category: 'professional-development', tool: 'Literacy Instruction', format: 'Guide', time: '16 min', summary: 'Coaching notes, sample language, and action-plan examples for literacy routines.' },
  { id: 'associative', title: 'Associative and cooperative play prompts', category: 'crosswalks', tool: 'Associative/Cooperative Interactions', format: 'Crosswalk', time: '9 min', summary: 'Connects interaction evidence to classroom practice shifts and teacher reflection questions.' }
]

const categoryLabel: Record<ResourceCategory | 'all', string> = {
  all: 'All resources',
  'coaching-cycle': 'Coaching cycle',
  'professional-development': 'Professional development',
  crosswalks: 'Crosswalks',
  'best-practices': 'Best practices'
}

function formatColor(format: Resource['format']): 'neutral' | 'warn' | 'brand' | 'success' {
  if (format === 'Guide') return 'brand'
  if (format === 'Video') return 'warn'
  if (format === 'Crosswalk') return 'success'
  return 'neutral'
}

export function Resources() {
  const history = useHistory()
  const toast = useToast()
  const [category, setCategory] = React.useState<ResourceCategory | 'all'>('all')
  const [search, setSearch] = React.useState('')
  const normalized = search.trim().toLowerCase()
  const visible = RESOURCES.filter(resource => {
    const text = `${resource.title} ${resource.tool} ${resource.summary} ${resource.format}`.toLowerCase()
    return (category === 'all' || resource.category === category) && (normalized === '' || text.includes(normalized))
  })

  const openResource = (resource: Resource) => {
    if (resource.category === 'professional-development') {
      history.push('/v2/training')
      return
    }
    toast.info(`${resource.title} is mapped for the resources migration; source material stays in legacy for now.`)
  }

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Coaching resources</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            A searchable hub for coaching cycle materials, professional development, crosswalks, and best practices.
          </div>
        </div>
        <Button variant="primary" onClick={() => history.push('/v2/training')}>Open recommended training</Button>
      </div>

      <Card padding="1rem" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(['all', 'coaching-cycle', 'professional-development', 'crosswalks', 'best-practices'] as Array<ResourceCategory | 'all'>).map(item => (
              <Button key={item} size="sm" onClick={() => setCategory(item)} style={{ background: category === item ? 'var(--v2-ink)' : 'var(--v2-white)', color: category === item ? 'var(--v2-white)' : 'var(--v2-ink-soft)', borderColor: category === item ? 'var(--v2-ink)' : 'var(--v2-line)' }}>
                {categoryLabel[item]}
              </Button>
            ))}
          </div>
          <input
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search by tool, topic, or format"
            style={{ minWidth: 260, flex: '0 1 360px', border: '1px solid var(--v2-line)', borderRadius: 'var(--v2-radius-pill)', padding: '0.55rem 0.9rem', background: 'var(--v2-white)' }}
          />
        </div>
      </Card>

      {visible.length === 0 ? (
        <EmptyState title="No resources match" description="Try a broader search or a different category." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {visible.map(resource => (
            <Card key={resource.id} style={{ display: 'grid', gap: '0.9rem' }}>
              <CardHeader
                title={<span>{resource.tool}</span>}
                badge={resource.recommended ? <Pill variant="warm">Recommended</Pill> : undefined}
              />
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>{resource.title}</h3>
                <p style={{ color: 'var(--v2-muted)', fontSize: '0.86rem', minHeight: 58 }}>{resource.summary}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                <Pill variant={formatColor(resource.format)}>{resource.format}</Pill>
                <Pill>{resource.time}</Pill>
                <Pill>{categoryLabel[resource.category]}</Pill>
              </div>
              <Button size="sm" variant={resource.recommended ? 'primary' : 'default'} onClick={() => openResource(resource)} style={{ justifySelf: 'start' }}>
                Open resource
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
