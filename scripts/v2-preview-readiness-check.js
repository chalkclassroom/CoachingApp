#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const appRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(appRoot, '..')
const chalkRoot = path.join(repoRoot, '.chalk')

const failures = []
function read(rel) {
  return fs.readFileSync(path.join(appRoot, rel), 'utf8')
}
function readChalk(rel) {
  return fs.readFileSync(path.join(chalkRoot, rel), 'utf8')
}
function existsChalk(rel) {
  return fs.existsSync(path.join(chalkRoot, rel))
}
function assert(condition, message) {
  if (!condition) failures.push(message)
}

const env = read('.env-cmdrc.js')
const app = read('src/App.tsx')
const v2Routes = read('src/v2/App.tsx')

assert(/production[\s\S]*REACT_APP_V2_PUBLIC_PREVIEW:\s*false/.test(env), 'production REACT_APP_V2_PUBLIC_PREVIEW must be false')
assert(/staging[\s\S]*REACT_APP_V2_PUBLIC_PREVIEW:\s*false/.test(env), 'staging REACT_APP_V2_PUBLIC_PREVIEW must be false')
assert(/development[\s\S]*REACT_APP_V2_PUBLIC_PREVIEW:\s*false/.test(env), 'development REACT_APP_V2_PUBLIC_PREVIEW must be false')
assert(app.includes('process.env.V2_PUBLIC_PREVIEW'), 'src/App.tsx must gate /v2 with process.env.V2_PUBLIC_PREVIEW')
assert(app.includes('V2PrivateRoute'), 'src/App.tsx must protect /v2 with V2PrivateRoute when public preview is false')

const forbidden = [
  'Chrystaline', 'Kerry', 'Shonnell', 'Cassie', 'Tisha', 'Latara', 'Dana',
  'Preschool Promise', 'All Our Children', 'United Way', 'Vanderbilt', 'Dawn Johnson'
]
const v2Dir = path.join(appRoot, 'src/v2')
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return [full]
  })
}
for (const file of walk(v2Dir)) {
  if (!/\.(ts|tsx|css)$/.test(file)) continue
  const body = fs.readFileSync(file, 'utf8')
  for (const term of forbidden) {
    assert(!body.includes(term), `forbidden real/client term '${term}' found in ${path.relative(appRoot, file)}`)
  }
}

const reviewGuide = 'CHALK-2-STAGING-REVIEW-GUIDE.md'
const stubsGuide = 'CHALK-2-STUBS-DISCLOSURE.md'
const smokeGuide = 'CHALK-2-GOAL-1-RESPONSIVE-A11Y-SMOKE.md'
assert(existsChalk(reviewGuide), `.chalk/${reviewGuide} must exist`)
assert(existsChalk(stubsGuide), `.chalk/${stubsGuide} must exist`)
assert(existsChalk(smokeGuide), `.chalk/${smokeGuide} must exist`)

let review = ''
let stubs = ''
let smoke = ''
if (existsChalk(reviewGuide)) review = readChalk(reviewGuide)
if (existsChalk(stubsGuide)) stubs = readChalk(stubsGuide)
if (existsChalk(smokeGuide)) smoke = readChalk(smokeGuide)

const routes = [
  '/v2/home',
  '/v2/teachers',
  '/v2/teachers/:teacherId',
  '/v2/observation',
  '/v2/plans',
  '/v2/plans/:planId',
  '/v2/messages',
  '/v2/resources',
  '/v2/reports',
  '/v2/admin',
  '/v2/account',
  '/v2/training'
]
for (const route of routes) {
  assert(v2Routes.includes(route.replace(':teacherId', ':teacherId').replace(':planId', ':planId')) || review.includes(route), `route ${route} must be represented in V2 route source or guide`)
  assert(review.includes(route), `review guide must document route ${route}`)
}

const stubRows = [
  ['CoachHome.tsx', 'STUB_ATTENTION'],
  ['CoachHome.tsx', 'STUB_ACTIVITY'],
  ['CoachHome.tsx', 'STUB_PLANS'],
  ['AllTeachers.tsx', 'ROWS'],
  ['ActionPlans.tsx', 'DEMO_PLANS'],
  ['Messaging.tsx', 'THREADS'],
  ['Messaging.tsx', 'seeded'],
  ['PlanDetail.tsx', 'DEMO_PLAN'],
  ['TeacherProfile.tsx', 'DEMO_TEACHERS'],
  ['Reports.tsx', 'DEFAULT_STATS'],
  ['Training.tsx', 'CARDS']
]
for (const [file, token] of stubRows) {
  assert(stubs.includes(file), `stubs disclosure must mention ${file}`)
  assert(stubs.includes(token), `stubs disclosure must mention ${token}`)
}
assert(/not production data path/i.test(stubs), 'stubs disclosure must explicitly say preview stubs are not production data paths')
assert(/preview-only|partial|delegated|live-ish/i.test(review), 'review guide must classify route status')
assert(/authenticated staging/i.test(review), 'review guide must identify staging as authenticated')
assert(/prod-current-2026-05-29/.test(review), 'review guide must name the rollback tag')
assert(/git switch --detach prod-current-2026-05-29/.test(review), 'review guide must include rollback checkout command')
assert(/firebase deploy -P staging --only firestore:rules,hosting/.test(review), 'review guide must include staging rollback deploy command without Functions')
assert(/390x844/.test(smoke), 'responsive/a11y smoke must document mobile viewport')
assert(/1440x900/.test(smoke), 'responsive/a11y smoke must document desktop viewport')
assert(/keyboard/i.test(smoke), 'responsive/a11y smoke must include keyboard focus checklist')
assert(/authenticated visual smoke requires approved staging credentials/i.test(smoke), 'responsive/a11y smoke must not overclaim authenticated visual coverage')

if (failures.length > 0) {
  console.error('V2 preview-readiness check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('V2 preview-readiness check passed')
