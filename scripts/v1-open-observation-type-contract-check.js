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

const adapterPath = 'src/components/OpenObservationComponents/openObservationTypes.ts'
const pagePath = 'src/views/protected/OpenObservationViews/OpenObservationPage.tsx'
const constants = read('src/constants/Constants.tsx')
const v2Types = read('src/v2/lib/observationTypes.ts')
const adapter = exists(adapterPath) ? read(adapterPath) : ''
const page = exists(pagePath) ? read(pagePath) : ''

const codes = ['TT', 'CC', 'MI', 'SE', 'IN', 'LC', 'SA', 'AC', 'LI']
const storedTypes = ['transition', 'climate', 'math', 'engagement', 'level', 'listening', 'sequential', 'AC', 'LI']

assert(exists(adapterPath), `${adapterPath} must exist as the V1 read-only type adapter`)
assert(adapter.includes('../../v2/lib/observationTypes'), 'Open Observation type adapter must import the authoritative V2 observationTypes mapping read-only')
assert(adapter.includes('OBSERVATION_TYPE_OPTIONS') || adapter.includes('getStoredObservationType'), 'Open Observation type adapter must reuse V2 observation type options or getter')
assert(adapter.includes('ToolNames'), 'Open Observation type adapter must reuse Constants.tsx ToolNames for labels')
assert(!adapter.includes('buildObservationStartPayload'), 'Open Observation must not use buildObservationStartPayload because LI free-form has no checklist')

for (const code of codes) {
  assert(constants.includes(`'${code}'`) || constants.includes(`${code}:`), `Constants.tsx must expose ${code}`)
  assert(v2Types.includes(`code: '${code}'`), `observationTypes.ts must expose ${code}`)
  assert(adapter.includes(code), `Open Observation adapter must include ${code}`)
}

for (const storedType of storedTypes) {
  const literal = `'${storedType}'`
  const duplicatedInAdapter = adapter.includes(`storedType: ${literal}`) || adapter.includes(`: ${literal}`) || adapter.includes(`return ${literal}`)
  assert(!duplicatedInAdapter, `Open Observation adapter must not duplicate stored type literal ${literal}`)
}

assert(page.includes('OPEN_OBSERVATION_TYPE_OPTIONS'), 'OpenObservationPage must render type options from the V1 adapter')

if (failures.length > 0) {
  console.error('V1 Open Observation type contract failed:')
  for (const failure of failures) console.error('- ' + failure)
  process.exit(1)
}

console.log('V1 Open Observation type contract passed')
