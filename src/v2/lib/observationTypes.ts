export type ObservationUiCode = 'TT' | 'CC' | 'MI' | 'SE' | 'IN' | 'LC' | 'SA' | 'AC' | 'LI'

export type StoredObservationType =
  | 'transition'
  | 'climate'
  | 'math'
  | 'engagement'
  | 'level'
  | 'listening'
  | 'sequential'
  | 'AC'
  | 'LI'

export type LiteracyChecklist =
  | 'FoundationalTeacher'
  | 'FoundationalChild'
  | 'WritingTeacher'
  | 'WritingChild'
  | 'LanguageTeacher'
  | 'ReadingTeacher'

export type ObservationTypeOption = {
  code: ObservationUiCode
  label: string
  storedType: StoredObservationType
  description: string
  requiresChecklist?: boolean
}

export type ObservationStartPayload = {
  observedBy: string
  teacher: string
  type: StoredObservationType
  checklist?: LiteracyChecklist
}

export const LITERACY_CHECKLIST_OPTIONS: LiteracyChecklist[] = [
  'FoundationalTeacher',
  'FoundationalChild',
  'WritingTeacher',
  'WritingChild',
  'LanguageTeacher',
  'ReadingTeacher'
]

export const OBSERVATION_TYPE_OPTIONS: ObservationTypeOption[] = [
  { code: 'TT', label: 'Transition Time', storedType: 'transition', description: 'Transitions between routines and activities.' },
  { code: 'CC', label: 'Classroom Climate', storedType: 'climate', description: 'Warmth, responsiveness, and classroom tone.' },
  { code: 'MI', label: 'Math Instruction', storedType: 'math', description: 'Mathematical talk, problem solving, and concepts.' },
  { code: 'SE', label: 'Student Engagement', storedType: 'engagement', description: 'Active participation and sustained attention.' },
  { code: 'IN', label: 'Level of Instruction', storedType: 'level', description: 'Instructional depth and scaffolding.' },
  { code: 'LC', label: 'Listening to Children', storedType: 'listening', description: 'Teacher listening, uptake, and child voice.' },
  { code: 'SA', label: 'Sequential Activities', storedType: 'sequential', description: 'Clear sequences and connected learning activities.' },
  { code: 'AC', label: 'Associative and Cooperative', storedType: 'AC', description: 'Peer interaction and cooperative play.' },
  { code: 'LI', label: 'Literacy Instruction', storedType: 'LI', description: 'Literacy instruction with the existing checklist path.', requiresChecklist: true }
]

export function getObservationTypeOption(code?: string | null): ObservationTypeOption | undefined {
  return OBSERVATION_TYPE_OPTIONS.find(option => option.code === code)
}

export function getStoredObservationType(code?: string | null): StoredObservationType | undefined {
  const option = getObservationTypeOption(code)
  return option ? option.storedType : undefined
}

export function getLiteracyChecklist(value?: string | null): LiteracyChecklist | undefined {
  return LITERACY_CHECKLIST_OPTIONS.find(option => option === value)
}

export function buildObservationStartPayload(coachUid: string, teacherUid: string, code?: string | null, checklist?: string | null): ObservationStartPayload {
  const option = getObservationTypeOption(code)
  if (!option) {
    throw new Error('Invalid observation type code')
  }

  const payload: ObservationStartPayload = {
    observedBy: coachUid,
    teacher: teacherUid,
    type: option.storedType
  }

  if (option.requiresChecklist) {
    const literacyChecklist = getLiteracyChecklist(checklist)
    if (!literacyChecklist) {
      throw new Error('Literacy observations require a legacy literacy checklist')
    }
    payload.checklist = literacyChecklist
  }

  return payload
}
