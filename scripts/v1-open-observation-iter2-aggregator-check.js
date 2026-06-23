#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function assertIncludes(label, text, expected) {
  if (!text.includes(expected)) {
    console.error(label + ' is missing expected aggregator/save text: ' + expected)
    process.exit(1)
  }
}

function assertNotIncludes(label, text, forbidden) {
  if (text.includes(forbidden)) {
    console.error(label + ' contains forbidden text: ' + forbidden)
    process.exit(1)
  }
}

function main() {
  const firebase = read('src/components/Firebase/Firebase.tsx')
  const app = read('src/App.tsx')
  const page = read('src/views/protected/OpenObservationViews/OpenObservationPage.tsx')
  const table = read('src/components/UsersComponents/AllUsersTable.tsx')
  const results = read('src/views/protected/OpenObservationViews/OpenObservationResultsPage.tsx')
  const list = read('src/views/protected/OpenObservationViews/OpenObservationListPage.tsx')
  const schema = read('src/components/OpenObservationComponents/openObservationSchema.ts')

  assertIncludes('Firebase.tsx', firebase, 'createOpenObservation')
  assertIncludes('Firebase.tsx', firebase, 'getOpenObservation')
  assertIncludes('Firebase.tsx', firebase, 'getOpenObservationList')
  assertIncludes('Firebase.tsx', firebase, 'if (snapshot) {')
  assertIncludes('Firebase.tsx', firebase, 'observation.snapshot = snapshot')
  assertNotIncludes('Firebase.tsx', firebase, '      snapshot,')
  assertIncludes('Firebase.tsx', firebase, ".where('openObservation', '==', true)")
  assertIncludes('Firebase.tsx', firebase, ".where('coachId', '==', uid)")
  assertIncludes('Firebase.tsx', firebase, ".where('teacherId', '==', uid)")
  assertIncludes('Firebase.tsx', firebase, ".orderBy('start', 'desc')")
  assertIncludes('Firebase.tsx', firebase, 'OPEN_OBSERVATION_COLLECTION')
  assertIncludes('openObservationSchema.ts', schema, "OPEN_OBSERVATION_COLLECTION = 'observations'")
  assertIncludes('Firebase.tsx', firebase, "? 'Open Observation' : 'Observation'")
  assertIncludes('Firebase.tsx', firebase, 'openObservations: number')
  assertIncludes('Firebase.tsx', firebase, 'entry.openObservations++')
  assertIncludes('Firebase.tsx', firebase, 'data.openObservation === true')
  assertNotIncludes('Firebase.tsx', firebase, 'const [observations, knowledgeChecks, conferencePlans, actionPlans, emails, openObservations]')
  assertIncludes('Firebase.tsx', firebase, 'Open Observation is counted from observations')

  assertIncludes('AllUsersTable.tsx', table, 'openObservations: number')
  assertIncludes('AllUsersTable.tsx', table, 'open observation')
  assertIncludes('AllUsersTable.tsx', table, 'open obs')

  assertIncludes('OpenObservationPage.tsx', page, 'createOpenObservation')
  assertIncludes('OpenObservationPage.tsx', page, "history.push('/OpenObservationResults/")
  assertIncludes('OpenObservationPage.tsx', page, 'createOpenObservation')
  assertIncludes('OpenObservationPage.tsx', page, 'flushPendingNote')
  assertIncludes('OpenObservationPage.tsx', page, 'const notes = await this.flushPendingNote()')
  assertIncludes('OpenObservationPage.tsx', page, 'note ? [...previousState.notes, note] : previousState.notes')
  assertIncludes('OpenObservationPage.tsx', page, 'resumeObservation')
  assertIncludes('OpenObservationPage.tsx', page, 'open-observation-snapshot-discard')

  assertIncludes('OpenObservationResultsPage.tsx', results, 'getOpenObservation')
  assertIncludes('OpenObservationResultsPage.tsx', results, 'Open Observation Results')
  assertIncludes('OpenObservationResultsPage.tsx', results, 'coachSummary')
  assertIncludes('OpenObservationResultsPage.tsx', results, 'Observation summary:')
  assertIncludes('OpenObservationListPage.tsx', list, 'getOpenObservationList')
  assertIncludes('OpenObservationListPage.tsx', list, 'Unable to load open observations.')
  assertIncludes('OpenObservationListPage.tsx', list, 'No open observations yet.')
  assertIncludes('OpenObservationListPage.tsx', list, 'open-observation-list-row')
  assertIncludes('OpenObservationListPage.tsx', list, "history.push('/OpenObservationResults/' + id)")

  assertIncludes('App.tsx', app, 'OpenObservationResultsPage')
  assertIncludes('App.tsx', app, 'OpenObservationListPage')
  assertIncludes('App.tsx', app, 'path="/OpenObservationResults"')
  assertIncludes('App.tsx', app, 'allowedRoles={[Role.COACH, Role.ADMIN, Role.TEACHER]}')
  assertIncludes('App.tsx', app, 'path="/OpenObservationResults/:observationId"')

  console.log('Open Observation iter2 aggregator and save checks passed')
}

main()
