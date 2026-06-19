import { OpenObservationNote } from './openObservationSchema'
import * as Constants from '../../constants/Constants'

export type Magic9PracticeCode = 'TT' | 'CC' | 'MI' | 'SE' | 'IN' | 'LC' | 'SA' | 'LI' | 'AC'

interface ThemeRule {
  label: string,
  terms: string[]
}

interface PracticeRule {
  code: Magic9PracticeCode,
  name: string,
  themes: ThemeRule[]
}

export interface OpenObservationEvidence {
  noteId: string,
  wallClockAt: Date,
  text: string,
  matchedTerms: string[],
  themes: string[]
}

export interface OpenObservationPracticeAlignment {
  practiceCode: Magic9PracticeCode,
  practiceName: string,
  color: string,
  themes: string[],
  evidence: OpenObservationEvidence[]
}

export interface OpenObservationOtherTheme {
  theme: string,
  evidence: OpenObservationEvidence[]
}

export interface OpenObservationAnalysis {
  noteCount: number,
  alignedNoteCount: number,
  unalignedNoteCount: number,
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
        terms: ['transition', 'transitions', 'line up', 'lining up', 'clean up', 'cleanup', 'arrival', 'dismissal', 'routine', 'routines']
      },
      {
        label: 'Waiting and moving through the day',
        terms: ['waiting', 'wait', 'traveling', 'walking', 'hallway', 'outside', 'recess', 'bathroom', 'wash hands', 'handwashing']
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
        terms: ['behavior', 'behaviour', 'expectation', 'expectations', 'rule', 'rules', 'redirect', 'redirection', 'disapproval', 'approval']
      },
      {
        label: 'Materials and classroom setup',
        terms: ['materials', 'room arrangement', 'classroom setup', 'learning area', 'learning environment', 'centers']
      }
    ]
  },
  {
    code: 'MI',
    name: Constants.ToolNames.MI,
    themes: [
      {
        label: 'Counting and numbers',
        terms: ['math', 'count', 'counting', 'number', 'numbers', 'quantity', 'quantities', 'more', 'less', 'add', 'subtract']
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
        terms: ['engaged', 'engagement', 'participate', 'participating', 'attention', 'focused', 'interested', 'on task', 'off task']
      },
      {
        label: 'Activity choice and involvement',
        terms: ['activity', 'activities', 'play', 'choice', 'choices', 'involved', 'hands-on', 'center time']
      }
    ]
  },
  {
    code: 'IN',
    name: Constants.ToolNames.IN,
    themes: [
      {
        label: 'Questions and concept development',
        terms: ['open ended', 'open-ended', 'question', 'questions', 'why', 'how', 'explain', 'predict', 'prediction', 'concept']
      },
      {
        label: 'Instructional support',
        terms: ['scaffold', 'scaffolding', 'prompt', 'prompting', 'model', 'modeling', 'demonstrate', 'feedback', 'instruction']
      }
    ]
  },
  {
    code: 'LC',
    name: Constants.ToolNames.LC,
    themes: [
      {
        label: 'Conversation and responsive listening',
        terms: ['listen', 'listening', 'conversation', 'talk', 'talking', 'respond', 'response', 'repeat', 'repeats', 'clarify', 'clarifies']
      },
      {
        label: 'Extending child language',
        terms: ['expand', 'expands', 'language', 'child says', 'children said', 'comment', 'comments', 'eye level', 'eye-level']
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
        terms: ['game', 'rules', 'turn', 'turns', 'turn-taking', 'pretend', 'storyline', 'scenario', 'drawing']
      }
    ]
  },
  {
    code: 'LI',
    name: Constants.ToolNames.LI,
    themes: [
      {
        label: 'Book reading and print',
        terms: ['book', 'reading', 'read', 'story', 'print', 'page', 'pages', 'author', 'illustration']
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
        terms: ['together', 'cooperative', 'cooperation', 'partner', 'partners', 'peer', 'peers', 'share', 'sharing', 'collaborate']
      },
      {
        label: 'Turn-taking and shared activity',
        terms: ['ask each other', 'interact', 'interaction', 'group', 'team', 'taking turns', 'take turns', 'game']
      }
    ]
  }
]

const OTHER_THEME_RULES: ThemeRule[] = [
  {
    label: 'Care routines',
    terms: ['snack', 'lunch', 'meal', 'bathroom', 'diaper', 'nap', 'rest', 'handwashing', 'wash hands']
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

function matchesTerm(text: string, term: string): boolean {
  const normalizedTerm = escapeRegExp(term.toLowerCase()).replace(/\s+/g, '\\s+')
  return new RegExp('(^|[^a-z0-9])' + normalizedTerm + '([^a-z0-9]|$)', 'i').test(text)
}

function unique(values: string[]): string[] {
  return values.filter((value, index) => values.indexOf(value) === index)
}

function matchThemes(text: string, themes: ThemeRule[]): { themes: string[], terms: string[] } {
  const matchedThemes: string[] = []
  const matchedTerms: string[] = []

  themes.forEach(theme => {
    const themeTerms = theme.terms.filter(term => matchesTerm(text, term))
    if (themeTerms.length > 0) {
      matchedThemes.push(theme.label)
      matchedTerms.push(...themeTerms)
    }
  })

  return {
    themes: unique(matchedThemes),
    terms: unique(matchedTerms)
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

function groupOtherEvidence(notes: OpenObservationEvidence[]): OpenObservationOtherTheme[] {
  const grouped: {[key: string]: OpenObservationEvidence[]} = {}

  notes.forEach(note => {
    const match = matchThemes(note.text.toLowerCase(), OTHER_THEME_RULES)
    const theme = match.themes.length > 0 ? match.themes[0] : 'Context / general classroom notes'
    grouped[theme] = grouped[theme] || []
    grouped[theme].push({
      ...note,
      themes: match.themes.length > 0 ? match.themes : [theme],
      matchedTerms: match.terms
    })
  })

  return Object.keys(grouped).map(theme => ({
    theme,
    evidence: grouped[theme]
  }))
}

export function analyzeOpenObservationNotes(notes: OpenObservationNote[]): OpenObservationAnalysis {
  const evidenceByPractice: {[key in Magic9PracticeCode]?: OpenObservationEvidence[]} = {}
  const alignedNoteIds: {[key: string]: boolean} = {}
  const unalignedEvidence: OpenObservationEvidence[] = []

  notes.forEach(note => {
    const text = String(note.text || '').trim()
    if (!text) return

    let hasPracticeMatch = false
    const normalizedText = text.toLowerCase()

    MAGIC9_PRACTICE_RULES.forEach(rule => {
      const match = matchThemes(normalizedText, rule.themes)
      if (match.terms.length > 0) {
        hasPracticeMatch = true
        alignedNoteIds[note.id] = true
        addEvidence(evidenceByPractice, rule.code, {
          noteId: note.id,
          wallClockAt: note.wallClockAt,
          text,
          matchedTerms: match.terms,
          themes: match.themes
        })
      }
    })

    if (!hasPracticeMatch) {
      unalignedEvidence.push({
        noteId: note.id,
        wallClockAt: note.wallClockAt,
        text,
        matchedTerms: [],
        themes: []
      })
    }
  })

  const practiceAlignments = MAGIC9_PRACTICE_RULES.map(rule => {
    const evidence = evidenceByPractice[rule.code] || []
    return {
      practiceCode: rule.code,
      practiceName: rule.name,
      color: Constants.Colors[rule.code],
      themes: unique(evidence.reduce((themes, item) => themes.concat(item.themes), [] as string[])),
      evidence
    }
  }).filter(alignment => alignment.evidence.length > 0)

  return {
    noteCount: notes.length,
    alignedNoteCount: Object.keys(alignedNoteIds).length,
    unalignedNoteCount: unalignedEvidence.length,
    practiceAlignments,
    otherThemes: groupOtherEvidence(unalignedEvidence)
  }
}
