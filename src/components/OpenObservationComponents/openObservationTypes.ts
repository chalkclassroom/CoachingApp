import { ToolNames } from '../../constants/Constants'

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

export type OpenObservationTypeOption = {
  code: ObservationUiCode,
  label: string,
  storedType: StoredObservationType,
  description: string
}

const OPEN_OBSERVATION_STORED_TYPES: Record<ObservationUiCode, StoredObservationType> = {
  TT: 'transition',
  CC: 'climate',
  MI: 'math',
  SE: 'engagement',
  IN: 'level',
  LC: 'listening',
  SA: 'sequential',
  AC: 'AC',
  LI: 'LI'
}

const OPEN_OBSERVATION_DESCRIPTIONS: Record<ObservationUiCode, string> = {
  TT: 'Transitions between routines and activities.',
  CC: 'Warmth, responsiveness, and classroom tone.',
  MI: 'Mathematical talk, problem solving, and concepts.',
  SE: 'Active participation and sustained attention.',
  IN: 'Instructional depth and scaffolding.',
  LC: 'Teacher listening, uptake, and child voice.',
  SA: 'Clear sequences and connected learning activities.',
  AC: 'Peer interaction and cooperative play.',
  LI: 'Free-form literacy observation without the dedicated literacy checklist.'
}

export const OPEN_OBSERVATION_CODES: ObservationUiCode[] = [
  'TT',
  'CC',
  'MI',
  'SE',
  'IN',
  'LC',
  'SA',
  'AC',
  'LI'
]

export const OPEN_OBSERVATION_TYPE_OPTIONS: OpenObservationTypeOption[] = OPEN_OBSERVATION_CODES.map(code => ({
  code,
  label: ToolNames[code],
  storedType: OPEN_OBSERVATION_STORED_TYPES[code],
  description: OPEN_OBSERVATION_DESCRIPTIONS[code]
}))

export function getOpenObservationStoredType(code?: string | null): StoredObservationType | undefined {
  const option = OPEN_OBSERVATION_TYPE_OPTIONS.find(candidate => candidate.code === code)
  return option ? option.storedType : undefined
}
