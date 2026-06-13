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
  assertIncludes('OpenObservationPage.tsx', page, 'data-testid="open-observation-note-count"')
  assertIncludes('OpenObservationPage.tsx', page, 'Coach summary (optional)')
  assertNotIncludes('OpenObservationPage.tsx', page, 'notes: string')
  assertNotIncludes('OpenObservationPage.tsx', page, 'Free-form notes')

  console.log('Open Observation iter2 notes shape checks passed')
}

main()
