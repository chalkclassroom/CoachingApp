import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Pill } from '../components/Pill'
import CoachHandbookUrl from '../../assets/coaching-docs/Coach Handbook_9.1.21.pdf'
import TransitionHandoutUrl from '../../assets/coaching-docs/Transition Time CHALK Handout.pdf'
import ClassroomClimateHandoutUrl from '../../assets/coaching-docs/Classroom Climate CHALK Handout.pdf'
import EarlyMathHandoutUrl from '../../assets/coaching-docs/Early Math CHALK Handout.pdf'
import StudentEngagementHandoutUrl from '../../assets/coaching-docs/Student Engagement CHALK Handout.pdf'
import LiteracyDefinitionsUrl from '../../assets/coaching-docs/Literacy Definitions and Examples.pdf'
import AssociativeHandoutUrl from '../../assets/coaching-docs/Associative and Cooperative Interactions CHALK Handout.pdf'
import ClassCrosswalkUrl from '../../assets/coaching-docs/CLASS CHALK Crosswalk.pdf'
import CoachingBestPracticesUrl from '../../assets/coaching-docs/Coaching Best Practices.pdf'

type ResourceCategory = 'coaching-cycle' | 'professional-development' | 'crosswalks' | 'best-practices'
type Resource = {
  id: string
  title: string
  category: ResourceCategory
  tool: string
  format: 'PDF' | 'PPTX'
  time: string
  summary: string
  url: string
  recommended?: boolean
}

const RESOURCES: Resource[] = [
  { id: 'coach-handbook', title: 'Coach Handbook', category: 'coaching-cycle', tool: 'Coaching Cycle', format: 'PDF', time: 'Reference', summary: 'Core CHALK coaching workflow, expectations, and cycle guidance.', url: CoachHandbookUrl, recommended: true },
  { id: 'transition-time-handout', title: 'Transition Time handout', category: 'professional-development', tool: 'Transition Time', format: 'PDF', time: 'Handout', summary: 'Guidance and examples for observing and coaching classroom transitions.', url: TransitionHandoutUrl, recommended: true },
  { id: 'classroom-climate-handout', title: 'Classroom Climate handout', category: 'professional-development', tool: 'Classroom Climate', format: 'PDF', time: 'Handout', summary: 'Prompts for noticing responsive language, emotional tone, and routines.', url: ClassroomClimateHandoutUrl },
  { id: 'early-math-handout', title: 'Early Math handout', category: 'professional-development', tool: 'Math Instruction', format: 'PDF', time: 'Handout', summary: 'Examples and coach language for math talk, concepts, and problem solving.', url: EarlyMathHandoutUrl },
  { id: 'student-engagement-handout', title: 'Student Engagement handout', category: 'professional-development', tool: 'Student Engagement', format: 'PDF', time: 'Handout', summary: 'Observable indicators and prompts for increasing active participation.', url: StudentEngagementHandoutUrl },
  { id: 'literacy-definitions', title: 'Literacy definitions and examples', category: 'professional-development', tool: 'Literacy Instruction', format: 'PDF', time: 'Reference', summary: 'Definitions and examples used by the literacy observation path.', url: LiteracyDefinitionsUrl },
  { id: 'associative-handout', title: 'Associative and cooperative interactions handout', category: 'professional-development', tool: 'Associative/Cooperative Interactions', format: 'PDF', time: 'Handout', summary: 'Connects interaction evidence to classroom practice shifts and teacher reflection.', url: AssociativeHandoutUrl },
  { id: 'class-crosswalk', title: 'CLASS CHALK Crosswalk', category: 'crosswalks', tool: 'CLASS Crosswalk', format: 'PDF', time: 'Reference', summary: 'Maps CHALK practices to CLASS-aligned observation and coaching language.', url: ClassCrosswalkUrl },
  { id: 'coaching-best-practices', title: 'Coaching Best Practices', category: 'best-practices', tool: 'Coaching Best Practices', format: 'PDF', time: 'Guide', summary: 'Best-practice guidance for coaching communication, planning, and follow-up.', url: CoachingBestPracticesUrl }
]

const categoryLabel: Record<ResourceCategory | 'all', string> = {
  all: 'All resources',
  'coaching-cycle': 'Coaching cycle',
  'professional-development': 'Professional development',
  crosswalks: 'Crosswalks',
  'best-practices': 'Best practices'
}

function formatColor(format: Resource['format']): 'brand' | 'success' {
  if (format === 'PPTX') return 'success'
  return 'brand'
}

export function Resources() {
  const history = useHistory()
  const [category, setCategory] = React.useState<ResourceCategory | 'all'>('all')
  const [search, setSearch] = React.useState('')
  const normalized = search.trim().toLowerCase()
  const visible = RESOURCES.filter(resource => {
    const text = `${resource.title} ${resource.tool} ${resource.summary} ${resource.format}`.toLowerCase()
    return (category === 'all' || resource.category === category) && (normalized === '' || text.includes(normalized))
  })

  const openResource = (resource: Resource) => {
    window.open(resource.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="v2-page" style={{ padding: '2rem 2.5rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Coaching resources</h1>
          <div style={{ color: 'var(--v2-muted)', fontSize: '0.92rem', marginTop: '0.3rem' }}>
            A searchable hub for CHALK coaching cycle materials, professional development handouts, crosswalks, and best-practice guides.
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
