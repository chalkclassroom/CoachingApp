#!/usr/bin/env node
const fs = require('fs')

const failures = []
function assert(condition, message) {
  if (!condition) failures.push(message)
}

const reducer = fs.readFileSync('src/state/reducers/training-literacy-state.ts', 'utf8')
assert(reducer.includes('action.literacyTraining || {}'), 'training literacy reducer must tolerate undefined literacyTraining payload')

const indexes = JSON.parse(fs.readFileSync('firestore.indexes.json', 'utf8'))
const hasObservationDashboardIndex = indexes.indexes.some(index => {
  if (index.collectionGroup !== 'observations' || index.queryScope !== 'COLLECTION') return false
  const fields = index.fields.map(field => field.fieldPath + ':' + field.order).join('|')
  return fields === 'observedBy:ASCENDING|end:ASCENDING'
})
assert(hasObservationDashboardIndex, 'firestore.indexes.json must include observations observedBy ASC + end ASC index')

const store = fs.readFileSync('src/state/store.ts', 'utf8')
assert(store.includes("process.env.NODE_ENV === 'development'"), 'redux-logger must be gated to development builds only')
assert(!store.includes("from 'redux-logger'"), 'redux-logger must not be imported statically into production bundles')
assert(!store.includes('const logger = createLogger()'), 'redux-logger must not be instantiated unconditionally')
assert(store.includes('const middleware: Middleware[] = [thunk]'), 'production/staging Redux middleware must start without redux-logger')
assert(store.includes("require('redux-logger')"), 'redux-logger must only be loaded through the development-only branch')

const webpack = fs.readFileSync('webpack.config.js', 'utf8')
assert(webpack.includes('class StaticPublicAssetPlugin'), 'webpack must emit static manifest files into build')
assert(webpack.includes("'manifest.json'"), 'webpack static asset plugin must emit manifest.json')
assert(webpack.includes("'site.webmanifest'"), 'webpack static asset plugin must emit site.webmanifest')
assert(webpack.includes("'mstile-150x150.png'"), 'webpack static asset plugin must emit mstile icon referenced by web manifests')

const firebaseSource = fs.readFileSync("src/components/Firebase/Firebase.tsx", "utf8")
assert(!firebaseSource.includes("teacher list"), "legacy Firebase teacher list must not log empty arrays in staging")
assert(!firebaseSource.includes("idArr is2"), "legacy Firebase action plan list must not log empty arrays in staging")

const pill = fs.readFileSync("src/v2/components/Pill.tsx", "utf8")
assert(pill.includes("warm:"), "Pill must support the warm variant used by resources/review badges")
assert(pill.includes("|| map.neutral"), "Pill must fall back to neutral instead of crashing on unknown variants")

const authHook = fs.readFileSync("src/v2/hooks/useV2Auth.ts", "utf8")
const v2App = fs.readFileSync("src/v2/App.tsx", "utf8")
assert(authHook.includes("V2AuthProvider"), "V2 auth state must be shared through a provider instead of reloading per page")
assert(v2App.includes("<V2AuthProvider>"), "V2App must mount V2AuthProvider around V2Routes")

const queryState = fs.existsSync("src/v2/hooks/useQueryState.ts") ? fs.readFileSync("src/v2/hooks/useQueryState.ts", "utf8") : ""
assert(queryState.includes("history.replace"), "V2 tab/filter state must be written to the URL with history.replace")
for (const page of ["ActionPlans", "AdminWorkspace", "Resources", "Training"]) {
  const body = fs.readFileSync(`src/v2/pages/${page}.tsx`, "utf8")
  assert(body.includes("useQueryState"), page + " must keep tab/filter state in the URL so refresh preserves it")
}

if (failures.length > 0) {
  console.error('V2 console hygiene check failed:')
  for (const failure of failures) console.error('- ' + failure)
  process.exit(1)
}

console.log('V2 console hygiene check passed')
