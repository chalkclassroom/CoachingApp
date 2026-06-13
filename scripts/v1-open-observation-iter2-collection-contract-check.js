#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function assertIncludes(label, text, expected) {
  if (!text.includes(expected)) {
    console.error(label + ' is missing expected contract text: ' + expected)
    process.exit(1)
  }
}

function assertNotIncludes(label, text, forbidden) {
  if (text.includes(forbidden)) {
    console.error(label + ' still contains forbidden iter1 contract text: ' + forbidden)
    process.exit(1)
  }
}

function main() {
  const schemaPath = path.join(root, 'src/components/OpenObservationComponents/openObservationSchema.ts')
  if (!fs.existsSync(schemaPath)) {
    console.error('Missing Open Observation iter2 schema at src/components/OpenObservationComponents/openObservationSchema.ts')
    process.exit(1)
  }

  const schema = read('src/components/OpenObservationComponents/openObservationSchema.ts')
  assertIncludes('openObservationSchema.ts', schema, "OPEN_OBSERVATION_COLLECTION = 'observations'")
  assertIncludes('openObservationSchema.ts', schema, 'export interface OpenObservationNote')
  assertIncludes('openObservationSchema.ts', schema, 'export interface OpenObservationDoc')
  assertIncludes('openObservationSchema.ts', schema, "status: 'in_progress' | 'completed' | 'archived'")
  assertNotIncludes('openObservationSchema.ts', schema, 'typeCode')
  assertNotIncludes('openObservationSchema.ts', schema, 'storedType')

  assertIncludes('openObservationSchema.ts', schema, 'openObservation: true')
  assertIncludes('openObservationSchema.ts', schema, "observationMode: 'open'")
  assertIncludes('openObservationSchema.ts', schema, 'teacher: string')
  assertIncludes('openObservationSchema.ts', schema, 'observedBy: string')

  console.log('Open Observation iter2 collection contract checks passed')
}

main()
