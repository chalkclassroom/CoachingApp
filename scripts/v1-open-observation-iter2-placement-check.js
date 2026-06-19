#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

function assertIncludes(label, text, expected) {
  if (!text.includes(expected)) {
    console.error(label + ' is missing expected text: ' + expected)
    process.exit(1)
  }
}

function assertNotIncludes(label, text, forbidden) {
  if (text.includes(forbidden)) {
    console.error(label + ' still contains iter1 placement/state text: ' + forbidden)
    process.exit(1)
  }
}

function assertMissing(relativePath) {
  if (exists(relativePath)) {
    console.error(relativePath + ' should be retired for iter2.')
    process.exit(1)
  }
}

function main() {
  const toolIcons = read('src/components/ToolIcons.tsx')
  const home = read('src/views/protected/HomeViews/HomePage.tsx')
  const page = read('src/views/protected/OpenObservationViews/OpenObservationPage.tsx')
  const burger = read('src/components/BurgerMenu.tsx')
  const magic8Menu = read('src/views/protected/Magic8MenuPage.tsx')
  const typeBridgePath = 'src/components/OpenObservationComponents/openObservationTypes.ts'

  assertIncludes('ToolIcons.tsx', toolIcons, 'open-observation-magic8-card')
  assertIncludes('ToolIcons.tsx', toolIcons, "history.push('/OpenObservation')")
  assertIncludes('ToolIcons.tsx', toolIcons, 'Open Observation')
  assertIncludes('ToolIcons.tsx', toolIcons, 'open-observation-results-magic8-card')
  assertIncludes('ToolIcons.tsx', toolIcons, "history.push('/OpenObservationResults')")

  assertNotIncludes('HomePage.tsx', home, 'OpenObservationIcon')
  assertNotIncludes('HomePage.tsx', home, 'Open Observation')
  assertNotIncludes('HomePage.tsx', home, 'history.push("/OpenObservation")')
  assertIncludes('HomePage.tsx', home, 'showObservationMenu')
  assertIncludes('HomePage.tsx', home, 'pathname: "/Magic8Menu"')
  assertNotIncludes('HomePage.tsx', home, 'this.showTeacherModal("Observe")')
  assertIncludes('BurgerMenu.tsx', burger, 'pathname: "/Magic8Menu"')
  assertIncludes('BurgerMenu.tsx', burger, 'Open Observations')
  assertIncludes('BurgerMenu.tsx', burger, 'this.props.history.push("/OpenObservationResults")')
  assertIncludes('Magic8MenuPage.tsx', magic8Menu, 'getTeacherList(validTeachers)')
  assertIncludes('Magic8MenuPage.tsx', magic8Menu, 'Loading teachers...')

  assertNotIncludes('OpenObservationPage.tsx', page, 'selectedTypeCode')
  assertNotIncludes('OpenObservationPage.tsx', page, 'selectedFinalTypeCode')
  assertNotIncludes('OpenObservationPage.tsx', page, 'OPEN_OBSERVATION_TYPE_OPTIONS')
  assertNotIncludes('OpenObservationPage.tsx', page, 'getOpenObservationStoredType')
  assertNotIncludes('OpenObservationPage.tsx', page, 'openAlignment')
  assertNotIncludes('OpenObservationPage.tsx', page, 'closeAlignment')
  assertNotIncludes('OpenObservationPage.tsx', page, 'updateFinalType')
  assertNotIncludes('OpenObservationPage.tsx', page, 'renderTypePicker')
  assertNotIncludes('OpenObservationPage.tsx', page, 'handleSession(')
  assertNotIncludes('OpenObservationPage.tsx', page, 'handlePushNotes')
  assertNotIncludes('OpenObservationPage.tsx', page, 'endSession(')
  assertIncludes('OpenObservationPage.tsx', page, 'notes: OpenObservationNote[]')

  if (exists(typeBridgePath)) {
    assertNotIncludes(typeBridgePath, read(typeBridgePath), '../../v2/lib/observationTypes')
  }

  assertMissing('scripts/v1-open-observation-route-check.js')
  assertMissing('scripts/v1-open-observation-type-contract-check.js')
  assertMissing('scripts/v1-open-observation-bq-compat-check.js')
  assertMissing('cypress/integration/v1/open-observation-flow.ts')
  assertIncludes('open-observation-iter2-flow.ts', read('cypress/integration/v1/open-observation-iter2-flow.ts'), 'open-observation-magic8-card')

  console.log('Open Observation iter2 placement and iter1 cleanup checks passed')
}

main()
