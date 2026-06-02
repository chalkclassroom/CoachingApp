#!/usr/bin/env node
const fs = require("fs")
const path = require("path")

const appRoot = path.resolve(__dirname, "..")
const failures = []
function read(rel) {
  return fs.readFileSync(path.join(appRoot, rel), "utf8")
}
function assert(condition, message) {
  if (!condition) failures.push(message)
}

const account = read("src/v2/pages/AccountSettings.tsx")
const api = read("src/v2/lib/api.ts")
const types = read("src/v2/lib/types.ts")
const rules = read("firestore.rules")
const rulesSmoke = read("scripts/v2-rules-emulator-smoke.js")

assert(types.includes("AccountPreferences"), "V2 types must define AccountPreferences")
assert(api.includes("getAccountPreferences"), "V2 API must read account preferences from Firestore")
assert(api.includes("saveAccountPreferences"), "V2 API must persist account preferences to Firestore")
assert(account.includes("Save preferences"), "AccountSettings must expose a real save action")
assert(account.includes("onChange="), "AccountSettings must expose controlled preference inputs")
assert(account.includes("createV2Api(firebase).saveAccountPreferences"), "AccountSettings save action must call the V2 API")
assert(!account.includes("managed in legacy CHALK"), "AccountSettings must not delegate editable preferences to legacy CHALK")
assert(!account.includes("This V2 screen is read-only"), "AccountSettings must not claim the whole screen is read-only")
assert(account.includes("readOnly"), "Profile identity fields must remain readOnly")
assert(rules.includes("v2Preferences"), "Firestore rules must allow scoped v2Preferences updates")
assert(rules.includes("validPreferencesValue"), "Firestore rules must validate v2Preferences shape")
assert(rulesSmoke.includes("accountPreferencesBody"), "Rules smoke must include an account preferences allow/deny body")
assert(rulesSmoke.includes("coach own account preferences write"), "Rules smoke must allow owner account preferences writes")
assert(rulesSmoke.includes("unrelated coach account preferences write"), "Rules smoke must deny cross-user account preferences writes")

if (failures.length > 0) {
  console.error("V2 account persistence check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 account persistence check passed")
