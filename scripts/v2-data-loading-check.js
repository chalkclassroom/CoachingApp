#!/usr/bin/env node
const fs = require('fs')

const api = fs.readFileSync('src/v2/lib/api.ts', 'utf8')
const failures = []
function assert(condition, message) {
  if (!condition) failures.push(message)
}

assert(api.includes('async function safeRead'), 'api.ts must have a safeRead helper for optional live data sources')
assert(api.includes('Unable to load v2 teacher list'), 'teacher list load must be caught and logged')
assert(api.includes('Unable to resolve v2 teacher document'), 'individual teacher document resolution must be isolated')
assert(!api.includes('const [teachers, loginCounts, actionCounts] = await Promise.all(['), 'teacher rows must not use all-or-nothing Promise.all for counts')
assert(api.includes('Unable to load v2 login counts'), 'login count load must degrade safely')
assert(api.includes('Unable to load v2 action counts'), 'action count load must degrade safely')
assert(api.includes('Unable to load v2 active plans'), 'active plan load must degrade safely')
assert(api.includes('Unable to load v2 action plan steps'), 'action plan steps load must degrade safely')
assert(api.includes('Unable to load v2 training status'), 'training status load must degrade safely')

if (failures.length > 0) {
  console.error('V2 data-loading contract failed:')
  for (const failure of failures) console.error('- ' + failure)
  process.exit(1)
}

console.log('V2 data-loading contract passed')
