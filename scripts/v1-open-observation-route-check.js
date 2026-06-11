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
const appPath = 'src/App.tsx'
const homePath = 'src/views/protected/HomeViews/HomePage.tsx'
const page = exists(pagePath) ? read(pagePath) : ''
const app = exists(appPath) ? read(appPath) : ''
const home = exists(homePath) ? read(homePath) : ''

assert(exists(pagePath), 'OpenObservationPage must exist under the legacy protected views tree')
assert(page.includes('OPEN_OBSERVATION_DRAFT_KEY'), 'Open Observation must use a named localStorage draft key')
assert(page.includes('localStorage'), 'Open Observation draft must persist through localStorage')
assert(page.includes('restoreDraft') || page.includes('loadDraft'), 'Open Observation must restore drafts after refresh')
assert(page.includes('clearDraft'), 'Open Observation must clear draft state on discard or save')
assert(page.includes('try') && page.includes('catch'), 'Open Observation localStorage restore must tolerate corrupt draft data')
assert(!page.includes('observationDraft'), 'Open Observation must not reuse the V2 Firestore observationDraft path')
assert(!page.includes("collection('observationDraft") && !page.includes('collection("observationDraft'), 'Open Observation must not create Firestore draft collections')

assert(!page.includes("db.collection('observations')") && !page.includes('db.collection("observations")'), 'Open Observation page must not write observations directly')
assert(!page.includes('/v2/'), 'Open Observation page must not route through V2')

assert(app.includes('OpenObservationPage'), 'App.tsx must import and render OpenObservationPage')
assert(app.includes('path="/OpenObservation"'), 'App.tsx must expose the /OpenObservation route')
assert(app.includes('Role.COACH') && app.includes('Role.ADMIN') && app.includes('Role.PROGRAMLEADER') && app.includes('Role.SITELEADER'), 'Open Observation route must be available to coach/admin/program/site leader roles')
assert(home.includes('/OpenObservation'), 'HomePage must link to /OpenObservation')
assert(home.includes('Open Observation'), 'HomePage must label the Open Observation entry')
assert(!home.includes('/v2/'), 'HomePage Open Observation entry must not route through V2')


if (failures.length > 0) {
  console.error('V1 Open Observation route/draft contract failed:')
  for (const failure of failures) console.error('- ' + failure)
  process.exit(1)
}

console.log('V1 Open Observation route/draft contract passed')
