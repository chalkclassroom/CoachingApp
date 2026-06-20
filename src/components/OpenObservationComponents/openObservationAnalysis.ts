import { OpenObservationNote } from './openObservationSchema'
import * as Constants from '../../constants/Constants'

export type Magic9PracticeCode = 'TT' | 'CC' | 'MI' | 'SE' | 'IN' | 'LC' | 'SA' | 'LI' | 'AC'
export type OpenObservationConfidence = 'Strong' | 'Moderate' | 'Light'

type TermRule = string | {
  value: string,
  weight: number
}

interface ThemeRule {
  label: string,
  terms: TermRule[]
}

interface PracticeRule {
  code: Magic9PracticeCode,
  name: string,
  themes: ThemeRule[]
}

interface ThemeMatch {
  theme: string,
  terms: string[],
  score: number
}

interface MatchResult {
  themes: string[],
  terms: string[],
  score: number,
  themeMatches: ThemeMatch[]
}

export interface OpenObservationEvidence {
  noteId: string,
  wallClockAt: Date,
  text: string,
  matchedTerms: string[],
  themes: string[],
  score: number,
  confidence: OpenObservationConfidence
}

export interface OpenObservationPracticeAlignment {
  practiceCode: Magic9PracticeCode,
  practiceName: string,
  color: string,
  themes: string[],
  evidence: OpenObservationEvidence[],
  score: number,
  confidence: OpenObservationConfidence
}

export interface OpenObservationOtherTheme {
  theme: string,
  evidence: OpenObservationEvidence[],
  noteCount: number,
  score: number,
  confidence: OpenObservationConfidence
}

export interface OpenObservationAnalysis {
  noteCount: number,
  alignedNoteCount: number,
  unalignedNoteCount: number,
  notesWithOtherThemesCount: number,
  executiveSummary: string,
  practiceAlignments: OpenObservationPracticeAlignment[],
  otherThemes: OpenObservationOtherTheme[]
}

export const MAGIC9_PRACTICE_RULES: PracticeRule[] = [
  {
    code: 'TT',
    name: Constants.ToolNames.TT,
    themes: [
      {
        label: 'Transitions and routines',
        terms: [
          { value: 'transition', weight: 2 },
          { value: 'transitions', weight: 2 },
          { value: 'line up', weight: 3 },
          { value: 'lining up', weight: 3 },
          { value: 'clean up', weight: 2 },
          { value: 'cleanup', weight: 2 },
          'arrival',
          'dismissal',
          { value: 'routine', weight: 2 },
          { value: 'routines', weight: 2 }
        ]
      },
      {
        label: 'Waiting and moving through the day',
        terms: [
          'waiting',
          'wait',
          'traveling',
          'walking',
          'hallway',
          'outside',
          'recess',
          'bathroom',
          { value: 'wash hands', weight: 2 },
          { value: 'handwashing', weight: 2 }
        ]
      }
    ]
  },
  {
    code: 'CC',
    name: Constants.ToolNames.CC,
    themes: [
      {
        label: 'Positive classroom climate',
        terms: ['positive', 'warm', 'safe', 'comfort', 'comfortable', 'welcoming', 'praise', 'encouragement', 'encourage']
      },
      {
        label: 'Behavior expectations and responses',
        terms: [
          { value: 'behavior', weight: 2 },
          { value: 'behaviour', weight: 2 },
          { value: 'expectation', weight: 2 },
          { value: 'expectations', weight: 2 },
          'rule',
          'rules',
          { value: 'redirect', weight: 2 },
          { value: 'redirection', weight: 2 },
          'disapproval',
          'approval'
        ]
      },
      {
        label: 'Materials and classroom setup',
        terms: [
          'materials',
          { value: 'room arrangement', weight: 2 },
          { value: 'classroom setup', weight: 2 },
          { value: 'learning area', weight: 2 },
          { value: 'learning environment', weight: 2 },
          'centers'
        ]
      }
    ]
  },
  {
    code: 'MI',
    name: Constants.ToolNames.MI,
    themes: [
      {
        label: 'Counting and numbers',
        terms: [
          { value: 'math', weight: 2 },
          'count',
          { value: 'counting', weight: 2 },
          'number',
          'numbers',
          'quantity',
          'quantities',
          'more',
          'less',
          'add',
          'subtract'
        ]
      },
      {
        label: 'Shapes, measurement, and patterns',
        terms: ['shape', 'shapes', 'pattern', 'patterns', 'measure', 'measurement', 'compare', 'graph', 'size', 'spatial']
      }
    ]
  },
  {
    code: 'SE',
    name: Constants.ToolNames.SE,
    themes: [
      {
        label: 'Child engagement',
        terms: [
          { value: 'engaged', weight: 2 },
          { value: 'engagement', weight: 2 },
          'participate',
          'participating',
          'attention',
          'focused',
          'interested',
          { value: 'on task', weight: 2 },
          { value: 'off task', weight: 2 }
        ]
      },
      {
        label: 'Activity choice and involvement',
        terms: ['activity', 'activities', 'play', 'choice', 'choices', 'involved', { value: 'hands-on', weight: 2 }, { value: 'center time', weight: 2 }]
      }
    ]
  },
  {
    code: 'IN',
    name: Constants.ToolNames.IN,
    themes: [
      {
        label: 'Questions and concept development',
        terms: [
          { value: 'open ended', weight: 3 },
          { value: 'open-ended', weight: 3 },
          'question',
          'questions',
          'why',
          'how',
          'explain',
          'predict',
          'prediction',
          'concept'
        ]
      },
      {
        label: 'Instructional support',
        terms: [
          { value: 'scaffold', weight: 3 },
          { value: 'scaffolding', weight: 3 },
          { value: 'prompt', weight: 2 },
          { value: 'prompting', weight: 2 },
          { value: 'model', weight: 2 },
          { value: 'modeling', weight: 2 },
          { value: 'demonstrate', weight: 2 },
          'feedback',
          'instruction'
        ]
      }
    ]
  },
  {
    code: 'LC',
    name: Constants.ToolNames.LC,
    themes: [
      {
        label: 'Conversation and responsive listening',
        terms: [
          'listen',
          { value: 'listening', weight: 2 },
          { value: 'conversation', weight: 2 },
          'talk',
          'talking',
          'respond',
          'response',
          'repeat',
          'repeats',
          'clarify',
          'clarifies'
        ]
      },
      {
        label: 'Extending child language',
        terms: [
          'expand',
          'expands',
          { value: 'language', weight: 2 },
          { value: 'child says', weight: 2 },
          { value: 'children said', weight: 2 },
          'comment',
          'comments',
          { value: 'eye level', weight: 2 },
          { value: 'eye-level', weight: 2 }
        ]
      }
    ]
  },
  {
    code: 'SA',
    name: Constants.ToolNames.SA,
    themes: [
      {
        label: 'Sequence and order',
        terms: ['sequence', 'sequential', 'first', 'next', 'then', 'step', 'steps', 'order', 'predictable']
      },
      {
        label: 'Rules, turns, and pretend play',
        terms: ['game', 'rules', 'turn', 'turns', { value: 'turn-taking', weight: 2 }, 'pretend', 'storyline', 'scenario', 'drawing']
      }
    ]
  },
  {
    code: 'LI',
    name: Constants.ToolNames.LI,
    themes: [
      {
        label: 'Book reading and print',
        terms: [
          { value: 'book reading', weight: 3 },
          'book',
          'reading',
          'read',
          'story',
          'print',
          'page',
          'pages',
          'author',
          'illustration'
        ]
      },
      {
        label: 'Letters, sounds, and writing',
        terms: ['letter', 'letters', 'sound', 'sounds', 'rhyming', 'alphabet', 'word', 'words', 'writing', 'journal']
      }
    ]
  },
  {
    code: 'AC',
    name: Constants.ToolNames.AC,
    themes: [
      {
        label: 'Peer interaction and cooperation',
        terms: [
          'together',
          'cooperative',
          'cooperation',
          'partner',
          'partners',
          'peer',
          'peers',
          { value: 'share', weight: 2 },
          { value: 'sharing', weight: 2 },
          { value: 'collaborate', weight: 2 }
        ]
      },
      {
        label: 'Turn-taking and shared activity',
        terms: [
          { value: 'ask each other', weight: 3 },
          'interact',
          'interaction',
          'team',
          { value: 'taking turns', weight: 3 },
          { value: 'take turns', weight: 3 },
          'game'
        ]
      }
    ]
  }
]

const OTHER_THEME_RULES: ThemeRule[] = [
  {
    label: 'Care routines',
    terms: ['snack', 'lunch', 'meal', 'bathroom', 'diaper', 'nap', 'rest', { value: 'handwashing', weight: 2 }, { value: 'wash hands', weight: 2 }]
  },
  {
    label: 'Safety or behavior context',
    terms: ['crying', 'upset', 'conflict', 'hit', 'pushed', 'injury', 'unsafe', 'frustrated', 'refused']
  },
  {
    label: 'Staffing or schedule context',
    terms: ['assistant', 'substitute', 'family', 'parent', 'schedule', 'late', 'ratio']
  },
  {
    label: 'Outdoor or gross motor context',
    terms: ['playground', 'outside', 'recess', 'run', 'running', 'climb', 'climbing']
  }
]

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function termValue(term: TermRule): string {
  return typeof term === 'string' ? term : term.value
}

function termWeight(term: TermRule): number {
  if (typeof term !== 'string') return term.weight
  return term.indexOf(' ') >= 0 || term.indexOf('-') >= 0 ? 2 : 1
}

function matchesTerm(text: string, term: string): boolean {
  const normalizedTerm = escapeRegExp(term.toLowerCase()).replace(/\s+/g, '\\s+')
  return new RegExp('(^|[^a-z0-9])' + normalizedTerm + '([^a-z0-9]|$)', 'i').test(text)
}

function unique(values: string[]): string[] {
  return values.filter((value, index) => values.indexOf(value) === index)
}

function confidenceFromScore(score: number, evidenceCount: number = 1): OpenObservationConfidence {
  const combinedScore = score + Math.max(0, evidenceCount - 1)
  if (combinedScore >= 5) return 'Strong'
  if (combinedScore >= 2) return 'Moderate'
  return 'Light'
}

function matchThemes(text: string, themes: ThemeRule[]): MatchResult {
  const matchedThemes: string[] = []
  const matchedTerms: string[] = []
  const themeMatches: ThemeMatch[] = []
  let score = 0

  themes.forEach(theme => {
    const themeTerms = theme.terms.filter(term => matchesTerm(text, termValue(term)))
    if (themeTerms.length > 0) {
      const terms = themeTerms.map(termValue)
      const themeScore = themeTerms.reduce((sum, term) => sum + termWeight(term), 0)
      matchedThemes.push(theme.label)
      matchedTerms.push(...terms)
      themeMatches.push({
        theme: theme.label,
        terms,
        score: themeScore
      })
      score += themeScore
    }
  })

  return {
    themes: unique(matchedThemes),
    terms: unique(matchedTerms),
    score,
    themeMatches
  }
}

function addEvidence(
  evidenceByPractice: {[key in Magic9PracticeCode]?: OpenObservationEvidence[]},
  code: Magic9PracticeCode,
  evidence: OpenObservationEvidence
): void {
  evidenceByPractice[code] = evidenceByPractice[code] || []
  evidenceByPractice[code]!.push(evidence)
}

function formatList(values: string[]): string {
  if (values.length === 0) return ''
  if (values.length === 1) return values[0]
  if (values.length === 2) return values[0] + ' and ' + values[1]
  return values.slice(0, values.length - 1).join(', ') + ', and ' + values[values.length - 1]
}

function buildExecutiveSummary(
  noteCount: number,
  alignedNoteCount: number,
  practiceAlignments: OpenObservationPracticeAlignment[],
  otherThemes: OpenObservationOtherTheme[]
): string {
  if (noteCount === 0) {
    return 'No notes were recorded for analysis.'
  }

  if (practiceAlignments.length === 0) {
    if (otherThemes.length > 0) {
      return 'No Magic 9 practice area was identified yet. The notes surfaced ' + formatList(otherThemes.slice(0, 2).map(theme => theme.theme)) + '.'
    }
    return 'No Magic 9 practice area or repeated context theme was identified from these notes.'
  }

  const topPractices = practiceAlignments.slice(0, 3).map(alignment => alignment.practiceName)
  const unalignedCount = noteCount - alignedNoteCount
  let summary = 'The strongest Magic 9 evidence points to ' + formatList(topPractices) + '.'

  if (unalignedCount > 0) {
    summary += ' ' + unalignedCount + ' note' + (unalignedCount === 1 ? '' : 's') + ' did not match a Magic 9 practice area.'
  }

  if (otherThemes.length > 0) {
    summary += ' Additional context themes include ' + formatList(otherThemes.slice(0, 2).map(theme => theme.theme)) + '.'
  }

  return summary
}

function groupOtherEvidence(
  notes: OpenObservationEvidence[],
  alignedNoteIds: {[key: string]: boolean}
): OpenObservationOtherTheme[] {
  const grouped: {[key: string]: OpenObservationEvidence[]} = {}

  notes.forEach(note => {
    const match = matchThemes(note.text.toLowerCase(), OTHER_THEME_RULES)

    if (match.themeMatches.length > 0) {
      match.themeMatches.forEach(themeMatch => {
        grouped[themeMatch.theme] = grouped[themeMatch.theme] || []
        grouped[themeMatch.theme].push({
          ...note,
          themes: [themeMatch.theme],
          matchedTerms: themeMatch.terms,
          score: themeMatch.score,
          confidence: confidenceFromScore(themeMatch.score)
        })
      })
      return
    }

    if (!alignedNoteIds[note.noteId]) {
      const theme = 'Context / general classroom notes'
      grouped[theme] = grouped[theme] || []
      grouped[theme].push({
        ...note,
        themes: [theme],
        matchedTerms: [],
        score: 0,
        confidence: 'Light'
      })
    }
  })

  return Object.keys(grouped).map(theme => {
    const evidence = grouped[theme]
    const score = evidence.reduce((sum, item) => sum + item.score, 0)
    const noteCount = unique(evidence.map(item => item.noteId)).length
    return {
      theme,
      evidence,
      noteCount,
      score,
      confidence: confidenceFromScore(score, noteCount)
    }
  }).sort((left, right) => right.score - left.score || right.noteCount - left.noteCount || left.theme.localeCompare(right.theme))
}

export function analyzeOpenObservationNotes(notes: OpenObservationNote[]): OpenObservationAnalysis {
  const evidenceByPractice: {[key in Magic9PracticeCode]?: OpenObservationEvidence[]} = {}
  const alignedNoteIds: {[key: string]: boolean} = {}
  const allEvidence: OpenObservationEvidence[] = []

  notes.forEach(note => {
    const text = String(note.text || '').trim()
    if (!text) return

    const baseEvidence: OpenObservationEvidence = {
      noteId: note.id,
      wallClockAt: note.wallClockAt,
      text,
      matchedTerms: [],
      themes: [],
      score: 0,
      confidence: 'Light'
    }
    allEvidence.push(baseEvidence)

    const normalizedText = text.toLowerCase()

    MAGIC9_PRACTICE_RULES.forEach(rule => {
      const match = matchThemes(normalizedText, rule.themes)
      if (match.terms.length > 0) {
        alignedNoteIds[note.id] = true
        addEvidence(evidenceByPractice, rule.code, {
          ...baseEvidence,
          matchedTerms: match.terms,
          themes: match.themes,
          score: match.score,
          confidence: confidenceFromScore(match.score)
        })
      }
    })
  })

  const practiceAlignments = MAGIC9_PRACTICE_RULES.map(rule => {
    const evidence = evidenceByPractice[rule.code] || []
    const score = evidence.reduce((sum, item) => sum + item.score, 0)
    return {
      practiceCode: rule.code,
      practiceName: rule.name,
      color: Constants.Colors[rule.code],
      themes: unique(evidence.reduce((themes, item) => themes.concat(item.themes), [] as string[])),
      evidence,
      score,
      confidence: confidenceFromScore(score, evidence.length)
    }
  }).filter(alignment => alignment.evidence.length > 0)
    .sort((left, right) => right.score - left.score || left.practiceName.localeCompare(right.practiceName))

  const alignedNoteCount = Object.keys(alignedNoteIds).length
  const otherThemes = groupOtherEvidence(allEvidence, alignedNoteIds)
  const notesWithOtherThemesCount = unique(otherThemes.reduce((noteIds, theme) => {
    return noteIds.concat(theme.evidence.map(item => item.noteId))
  }, [] as string[])).length

  return {
    noteCount: notes.length,
    alignedNoteCount,
    unalignedNoteCount: allEvidence.length - alignedNoteCount,
    notesWithOtherThemesCount,
    executiveSummary: buildExecutiveSummary(notes.length, alignedNoteCount, practiceAlignments, otherThemes),
    practiceAlignments,
    otherThemes
  }
}
