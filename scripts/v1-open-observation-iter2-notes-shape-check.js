#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function assertIncludes(label, text, expected) {
  if (!text.includes(expected)) {
    console.error(label + ' is missing expected notes-shape text: ' + expected)
    process.exit(1)
  }
}

function assertNotIncludes(label, text, forbidden) {
  if (text.includes(forbidden)) {
    console.error(label + ' still contains forbidden iter1 notes shape: ' + forbidden)
    process.exit(1)
  }
}

function main() {
  const schema = read('src/components/OpenObservationComponents/openObservationSchema.ts')
  const page = read('src/views/protected/OpenObservationViews/OpenObservationPage.tsx')

  assertIncludes('openObservationSchema.ts', schema, 'export interface OpenObservationNote')
  assertIncludes('openObservationSchema.ts', schema, 'wallClockAt: Date')
  assertIncludes('openObservationSchema.ts', schema, 'serializeOpenObservationNotes')
  assertIncludes('openObservationSchema.ts', schema, 'deserializeOpenObservationNotes')
  assertIncludes('OpenObservationPage.tsx', page, 'notes: OpenObservationNote[]')
  assertIncludes('OpenObservationPage.tsx', page, 'serializeOpenObservationNotes')
  assertIncludes('OpenObservationPage.tsx', page, 'deserializeOpenObservationNotes')
  assertIncludes('OpenObservationPage.tsx', page, 'data-testid="open-observation-note-row"')
  assertIncludes('OpenObservationPage.tsx', page, 'editingNoteId: string | null')
  assertIncludes('OpenObservationPage.tsx', page, 'editingNoteId: null')
  assertIncludes('OpenObservationPage.tsx', page, 'this.state.editingNoteId === note.id')
  assertIncludes('OpenObservationPage.tsx', page, "import EditIcon from '@material-ui/icons/Edit'")
  assertIncludes('OpenObservationPage.tsx', page, "import CheckIcon from '@material-ui/icons/Check'")
  assertIncludes('OpenObservationPage.tsx', page, "import DeleteIcon from '@material-ui/icons/Delete'")
  assertIncludes('OpenObservationPage.tsx', page, 'data-testid="open-observation-note-edit"')
  assertIncludes('OpenObservationPage.tsx', page, 'data-testid="open-observation-note-delete"')
  assertIncludes('OpenObservationPage.tsx', page, 'aria-label="Edit note"')
  assertIncludes('OpenObservationPage.tsx', page, 'aria-label="Done editing note"')
  assertIncludes('OpenObservationPage.tsx', page, 'aria-label="Delete note"')
  assertIncludes('OpenObservationPage.tsx', page, 'this.setState({ editingNoteId: note.id })')
  assertIncludes('OpenObservationPage.tsx', page, 'this.setState({ editingNoteId: null })')
  assertIncludes('OpenObservationPage.tsx', page, 'removeNote = (id: string): void')
  assertIncludes('OpenObservationPage.tsx', page, 'notes: previousState.notes.filter(note => note.id !== id)')
  assertIncludes('OpenObservationPage.tsx', page, '<Typography>{note.text}</Typography>')
  assertIncludes('OpenObservationPage.tsx', page, 'autoFocus')
  assertIncludes('OpenObservationPage.tsx', page, "inputProps={{ 'data-testid': 'open-observation-note-text' }}")
  assertIncludes('OpenObservationPage.tsx', page, 'data-testid="open-observation-note-count"')
  assertIncludes('OpenObservationPage.tsx', page, 'Observation summary (optional)')
  assertIncludes('OpenObservationPage.tsx', page, 'Use this space to record any overall reminders or impressions about the classroom')
  assertIncludes('OpenObservationPage.tsx', page, 'flushPendingNote')
  assertIncludes('OpenObservationPage.tsx', page, 'data-testid="open-observation-snapshot-discard"')
  assertIncludes('OpenObservationPage.tsx', page, 'data-testid="open-observation-resume"')
  assertIncludes('OpenObservationPage.tsx', page, 'Resume / Add more notes')
  assertIncludes('OpenObservationPage.tsx', page, 'Discard / Start over')
  assertNotIncludes('OpenObservationPage.tsx', page, 'Coach summary (optional)')
  assertNotIncludes('OpenObservationPage.tsx', page, 'notes: string')
  assertNotIncludes('OpenObservationPage.tsx', page, 'Free-form notes')

  console.log('Open Observation iter2 notes shape checks passed')
}

main()
