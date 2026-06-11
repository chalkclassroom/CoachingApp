import { ToolNames } from '../../constants/Constants'
import {
  OBSERVATION_TYPE_OPTIONS,
  ObservationTypeOption,
  ObservationUiCode,
  StoredObservationType,
  getStoredObservationType
} from '../../v2/lib/observationTypes'

export type OpenObservationTypeOption = ObservationTypeOption & {
  label: string
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

export const OPEN_OBSERVATION_TYPE_OPTIONS: OpenObservationTypeOption[] = OPEN_OBSERVATION_CODES.map(code => {
  const source = OBSERVATION_TYPE_OPTIONS.find(option => option.code === code)
  if (!source) {
    throw new Error(`Missing Open Observation type option for ${code}`)
  }

  return {
    ...source,
    label: ToolNames[code]
  }
})

export function getOpenObservationStoredType(code?: string | null): StoredObservationType | undefined {
  return getStoredObservationType(code)
}
