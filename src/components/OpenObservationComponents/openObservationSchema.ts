export const OPEN_OBSERVATION_COLLECTION = 'openObservations'

export type OpenObservationStatus = 'in_progress' | 'completed' | 'archived'

export interface OpenObservationNote {
  id: string,
  wallClockAt: Date,
  text: string,
  editedAt?: Date
}

export interface OpenObservationSnapshot {
  coachSummary?: string
}

export interface OpenObservationDoc {
  coachId: string,
  teacherId: string,
  start: Date,
  end: Date | null,
  notes: OpenObservationNote[],
  snapshot?: OpenObservationSnapshot,
  status: 'in_progress' | 'completed' | 'archived',
  createdAt: Date,
  updatedAt: Date
}

export const OPEN_OBSERVATION_STATUSES: OpenObservationStatus[] = [
  'in_progress',
  'completed',
  'archived'
]
