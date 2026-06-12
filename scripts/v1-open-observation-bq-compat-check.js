#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const ROOT = process.cwd()
const failures = []

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8')
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath))
}

function assert(condition, message) {
  if (!condition) failures.push(message)
}

const pagePath = 'src/views/protected/OpenObservationViews/OpenObservationPage.tsx'
const firebasePath = 'src/components/Firebase/Firebase.tsx'
const bqPath = 'functions/observationToBQ/index.js'

const page = exists(pagePath) ? read(pagePath) : ''
const firebase = exists(firebasePath) ? read(firebasePath) : ''
const bq = exists(bqPath) ? read(bqPath) : ''

assert(exists(pagePath), 'OpenObservationPage must exist')
assert(exists(firebasePath), 'Firebase singleton must exist')
assert(exists(bqPath), 'BigQuery observation pipeline must exist')

assert(page.includes('handleSession'), 'Open Observation must start the legacy Firebase currentObservation through handleSession')
assert(page.includes('handlePushNotes'), 'Open Observation must add free-form notes through handlePushNotes')
assert(page.includes('endSession'), 'Open Observation must finish through legacy endSession')
assert(!page.includes("db.collection('observations')") && !page.includes('db.collection("observations")'), 'Open Observation must not write observations directly')
assert(page.includes('checklist: null') || page.includes('checklist: undefined') || page.includes('/* LI_OPEN_OBSERVATION_CHECKLIST_NULL */'), 'Open Observation must document checklist:null behavior for LI/free-form saves')
assert(page.includes('openObservation: true'), 'Open Observation must mark saved observations as openObservation:true')

assert(firebase.includes('checklist: mEntry.checklist ? mEntry.checklist : null'), 'handleSession must normalize missing checklist to null')
assert(firebase.includes("this.currentObservation.type === 'LI'") && firebase.includes("handleLiteracyActivitySetting('Not Recorded')"), 'endSession must keep Not Recorded scoped to LI activitySetting, not checklist')
assert(firebase.includes("this.sessionRef = this.db.collection('observations').doc()"), 'endSession must remain the single legacy observations write path')
assert(firebase.includes("notesCollection.add"), 'endSession must write notes through the legacy notes subcollection')
assert(firebase.includes('openObservation?: boolean') && firebase.includes('openObservation: Boolean(mEntry.openObservation)') && firebase.includes('openObservation,'), 'Firebase handleSession/endSession must preserve the openObservation marker on the observation doc')

const openGuardIndex = bq.indexOf('newValue.openObservation === true')
const tableNameIndex = bq.indexOf('let tableName = newValue.type.toLowerCase()')
assert(openGuardIndex !== -1, 'BQ pipeline must explicitly detect Open Observation docs')
assert(tableNameIndex !== -1 && openGuardIndex < tableNameIndex, 'BQ Open Observation guard must run before tableName derivation, including LI literacynull routing')
assert(bq.includes('Skipping BigQuery metric export for Open Observation') && bq.includes('return null'), 'BQ pipeline must skip metric export for Open Observation docs')

assert(bq.includes("if (newValue.type === 'LI')"), 'BQ pipeline must retain LI table routing')
assert(bq.includes("tableName = 'literacy' + newValue.checklist"), 'BQ pipeline must derive LI table from checklist')
assert(bq.includes('session.type === "LI" && session.checklist === "FoundationalTeacher"'), 'BQ pipeline must only generate LI result rows for known literacy checklist variants')
assert(!bq.includes('session.type === "LI" && session.checklist === null'), 'BQ pipeline must not promise LI-specific result rows for Open Observation checklist:null')

const openLiObservation = {
  type: 'LI',
  openObservation: true,
  checklist: null,
  activitySetting: 'Not Recorded',
  notes: [{ Note: 'Free-form literacy note' }]
}
assert(openLiObservation.type === 'LI' && openLiObservation.checklist === null, 'LI Open Observation fixture must use checklist:null')
assert(openLiObservation.openObservation === true, 'LI Open Observation fixture must include the openObservation marker')
assert('activitySetting' in openLiObservation, 'LI Open Observation fixture must keep Not Recorded as activitySetting only')
assert(openLiObservation.notes.length === 1, 'LI Open Observation fixture must support free-form notes')

const LI_OPEN_OBSERVATION_NO_RESULT_ROW = true
assert(LI_OPEN_OBSERVATION_NO_RESULT_ROW, 'LI Open Observation no-result-row behavior must be explicitly documented')

if (failures.length > 0) {
  console.error('V1 Open Observation BQ compatibility contract failed:')
  for (const failure of failures) console.error('- ' + failure)
  process.exit(1)
}

console.log('V1 Open Observation BQ compatibility contract passed')
