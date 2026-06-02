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
const rules = readApp('firestore.rules')
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
assert(/Posture B User-Root Rule Hardening/i.test(decisionLog), 'decision log must include the Posture B user-root hardening entry')
assert(/G2.3 user-root denial smoke now passes/i.test(decisionLog), 'decision log must record G2.3 user-root denial evidence')
assert(/User-Root Payload Shape Hardening/i.test(decisionLog), 'decision log must include the G2.3 payload-shape hardening entry')
assert(/G2.3 payload-shape smoke now passes/i.test(decisionLog), 'decision log must record G2.3 payload-shape smoke evidence')
assert(/Posture B Action-Plan Write Hardening/i.test(decisionLog), 'decision log must include the Posture B action-plan hardening entry')
assert(/G2.4 action-plan smoke now passes/i.test(decisionLog), 'decision log must record G2.4 action-plan smoke evidence')
assert(/Unsupported Preview Write Gates/i.test(decisionLog), 'decision log must include the G2.5 unsupported preview write gates entry')
assert(/G2.5 unsupported-path smoke now passes/i.test(decisionLog), 'decision log must record G2.5 unsupported-path smoke evidence')

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

assert(/auth-only write wildcard has been removed/i.test(inventory), 'inventory must state that the auth-only write wildcard has been removed from the working ruleset')
assert(/G2\.3 user-root ownership and basic payload-shape denial.*emulator green/i.test(inventory), 'inventory must state G2.3 user-root ownership and payload-shape denial are emulator green')
assert(/G2\.4 action-plan comment\/sent-state denial.*emulator green/i.test(inventory), 'inventory must state G2.4 action-plan denial is emulator green')
assert(/G2\.5 unsupported preview write denial are emulator green/i.test(inventory), 'inventory must state G2.5 unsupported preview write denial is emulator green')
assert(rules.includes("rules_version = '2'"), 'firestore.rules must use rules_version 2 for recursive wildcard semantics')
assert(rules.includes('function canWriteUserDoc'), 'firestore.rules must define root user write ownership helper')
assert(rules.includes('function validObservationDraftValue'), 'firestore.rules must define observationDraft shape helper')
assert(rules.includes('function validOwnerUserUpdate'), 'firestore.rules must define owner user-field update helper')
assert(rules.includes('function canWriteActionPlan'), 'firestore.rules must define action-plan write participant helper')
assert(!rules.includes('match /actionPlans/{document=**}'), 'firestore.rules must not retain a broad actionPlans recursive write wildcard')
assert(rules.includes('allow write: if isAdmin();'), 'firestore.rules must restrict at least one admin workspace write surface to admin-only')
assert(rules.includes('allow write: if false'), 'firestore.rules fallback must deny unknown writes')
assert(!rules.includes('allow read, write: if request.auth.uid != null'), 'firestore.rules must not retain the auth-only read/write wildcard')
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
