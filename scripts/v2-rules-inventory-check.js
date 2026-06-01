#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const appRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(appRoot, '..')
const chalkRoot = path.join(repoRoot, '.chalk')
const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}
function readApp(rel) {
  return fs.readFileSync(path.join(appRoot, rel), 'utf8')
}
function readChalk(rel) {
  return fs.readFileSync(path.join(chalkRoot, rel), 'utf8')
}
function existsChalk(rel) {
  return fs.existsSync(path.join(chalkRoot, rel))
}
function tableHasRow(markdown, firstCell) {
  return new RegExp('\\|\\s*' + firstCell + '\\s*\\|').test(markdown)
}

const api = readApp('src/v2/lib/api.ts')
const decisionLogExists = existsChalk('decision-log.md')
const inventoryExists = existsChalk('CHALK-2-V2-RULES-INVENTORY.md')
const fixturesExists = existsChalk('CHALK-2-V2-RULES-FIXTURES.md')
const fixtureSourceExists = fs.existsSync(path.join(appRoot, 'scripts/v2-rules-fixtures.js'))
const seedScriptExists = fs.existsSync(path.join(appRoot, 'scripts/v2-rules-seed-fixtures.js'))
const emulatorConfigExists = fs.existsSync(path.join(appRoot, 'firebase.v2-rules.json'))
const smokeScriptExists = fs.existsSync(path.join(appRoot, 'scripts/v2-rules-emulator-smoke.js'))

assert(decisionLogExists, '.chalk/decision-log.md must exist')
assert(inventoryExists, '.chalk/CHALK-2-V2-RULES-INVENTORY.md must exist')
assert(fixturesExists, '.chalk/CHALK-2-V2-RULES-FIXTURES.md must exist')
assert(fixtureSourceExists, 'scripts/v2-rules-fixtures.js must exist')
assert(seedScriptExists, 'scripts/v2-rules-seed-fixtures.js must exist')
assert(emulatorConfigExists, 'firebase.v2-rules.json must exist for isolated rules tests')
assert(smokeScriptExists, 'scripts/v2-rules-emulator-smoke.js must exist')

let decisionLog = ''
let inventory = ''
let fixtures = ''
if (decisionLogExists) decisionLog = readChalk('decision-log.md')
if (inventoryExists) inventory = readChalk('CHALK-2-V2-RULES-INVENTORY.md')
if (fixturesExists) fixtures = readChalk('CHALK-2-V2-RULES-FIXTURES.md')

assert(/2026-06-01 - CHALK 2\.0 V2 Firestore Rules Posture/.test(decisionLog), 'decision log must include the 2026-06-01 V2 rules posture entry')
assert(/supersedes the 2026-05-28 Posture A/i.test(decisionLog), 'decision log must explicitly supersede or constrain Posture A')
assert(/G2\.3-G2\.5 are blocked/i.test(decisionLog), 'decision log must block G2.3-G2.5 until real denial rules/harness exist')

const createApiBodyMatch = api.match(/export function createV2Api\(firebase: any\) \{[\s\S]*?return \{([\s\S]*?)\n  \}\n\}/)
assert(Boolean(createApiBodyMatch), 'createV2Api() object must be parseable')
const writePrefixes = /^(save|add|mark|start|complete|dismiss)/
const writeFunctions = createApiBodyMatch
  ? Array.from(createApiBodyMatch[1].matchAll(/^\s{4}([a-zA-Z0-9_]+):/gm)).map(match => match[1]).filter(name => writePrefixes.test(name))
  : []
assert(writeFunctions.length > 0, 'createV2Api() write functions must be detected')

const requiredHeaders = ['API function', 'Firestore path', 'Operation', 'Allowed roles', 'Denied roles', 'Fixture IDs', 'Release status', 'Test file']
for (const header of requiredHeaders) {
  assert(inventory.includes(header), 'rules inventory must include column: ' + header)
}
for (const fn of writeFunctions) {
  assert(tableHasRow(inventory, fn), 'rules inventory must document write function: ' + fn)
}

const fixtureTerms = [
  'coach',
  'teacher',
  'admin',
  'programLeader',
  'siteLeader',
  'unrelatedCoach',
  'anonymous',
  'sameProgramActionPlan',
  'crossProgramActionPlan'
]
for (const term of fixtureTerms) {
  assert(fixtures.includes(term), 'fixture manifest must include ' + term)
}

assert(/auth-only wildcard remains in production rules today/i.test(inventory), 'inventory must state that the auth-only wildcard remains active today')
assert(/not production-ready/i.test(inventory), 'inventory must state G2 is not production-ready until emulator denial tests pass')
if (seedScriptExists) {
  const seedScript = fs.readFileSync(path.join(appRoot, 'scripts/v2-rules-seed-fixtures.js'), 'utf8')
  assert(seedScript.includes('FIRESTORE_EMULATOR_HOST'), 'seed script must require FIRESTORE_EMULATOR_HOST')
  assert(seedScript.includes('process.exit(1)'), 'seed script must fail closed when emulator host is absent')
}
if (emulatorConfigExists) {
  const emulatorConfig = JSON.parse(fs.readFileSync(path.join(appRoot, 'firebase.v2-rules.json'), 'utf8'))
  assert(emulatorConfig.emulators && emulatorConfig.emulators.firestore && emulatorConfig.emulators.firestore.port === 43081, 'isolated rules emulator must use port 43081')
}

if (failures.length > 0) {
  console.error('V2 rules inventory check failed:')
  for (const failure of failures) console.error('- ' + failure)
  process.exit(1)
}

console.log('V2 rules inventory check passed')
