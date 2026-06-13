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

  assertIncludes('Firebase.tsx', firebase, 'createOpenObservation')
  assertIncludes('Firebase.tsx', firebase, 'getOpenObservation')
  assertIncludes('Firebase.tsx', firebase, 'OPEN_OBSERVATION_COLLECTION')
  assertIncludes('Firebase.tsx', firebase, "updateIfNewer(userId, endDate, 'Open Observation')")
  assertIncludes('Firebase.tsx', firebase, 'openObservations: number')
  assertIncludes('Firebase.tsx', firebase, 'entry.openObservations++')
  assertIncludes('Firebase.tsx', firebase, 'total queries: +2 for openObservations')

  assertIncludes('AllUsersTable.tsx', table, 'openObservations: number')
  assertIncludes('AllUsersTable.tsx', table, 'open observation')
  assertIncludes('AllUsersTable.tsx', table, 'open obs')

  assertIncludes('OpenObservationPage.tsx', page, 'createOpenObservation')
  assertIncludes('OpenObservationPage.tsx', page, "history.push('/OpenObservationResults/")
  assertNotIncludes('OpenObservationPage.tsx', page, "collection('observations')")

  assertIncludes('OpenObservationResultsPage.tsx', results, 'getOpenObservation')
  assertIncludes('OpenObservationResultsPage.tsx', results, 'Open Observation Results')
  assertIncludes('OpenObservationResultsPage.tsx', results, 'coachSummary')

  assertIncludes('App.tsx', app, 'OpenObservationResultsPage')
  assertIncludes('App.tsx', app, 'path="/OpenObservationResults/:observationId"')

  console.log('Open Observation iter2 aggregator and save checks passed')
}

main()
