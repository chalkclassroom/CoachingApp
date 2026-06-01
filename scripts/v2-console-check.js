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

if (failures.length > 0) {
  console.error('V2 console hygiene check failed:')
  for (const failure of failures) console.error('- ' + failure)
  process.exit(1)
}

console.log('V2 console hygiene check passed')
