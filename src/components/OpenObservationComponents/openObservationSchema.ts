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


export interface SerializedOpenObservationNote {
  id: string,
  wallClockAt: string,
  text: string,
  editedAt?: string
}

export function serializeOpenObservationNotes(notes: OpenObservationNote[]): SerializedOpenObservationNote[] {
  return notes.map(note => ({
    id: note.id,
    wallClockAt: note.wallClockAt.toISOString(),
    text: note.text,
    editedAt: note.editedAt ? note.editedAt.toISOString() : undefined
  }))
}

export function deserializeOpenObservationNotes(notes: any): OpenObservationNote[] {
  if (!Array.isArray(notes)) {
    return []
  }

  return notes.map(note => ({
    id: String(note && note.id ? note.id : ''),
    wallClockAt: new Date(note && note.wallClockAt ? note.wallClockAt : ''),
    text: String(note && note.text ? note.text : ''),
    editedAt: note && note.editedAt ? new Date(note.editedAt) : undefined
  })).filter(note => note.id && note.text && !Number.isNaN(note.wallClockAt.getTime()))
}
