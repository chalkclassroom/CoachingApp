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

assert(account.includes("read-only"), "AccountSettings must disclose read-only state")
assert(account.includes("managed in legacy CHALK"), "AccountSettings must delegate unsupported preferences to legacy CHALK")
assert(!account.includes("useToast"), "AccountSettings must not use toast as fake persistence")
assert(!account.includes("Save preferences"), "AccountSettings must not show a save button without persistence")
assert(!account.includes("setSettings"), "AccountSettings must not maintain local editable preferences")
assert(!account.includes("onChange="), "AccountSettings must not expose editable controls without persistence")
assert(account.includes("readOnly"), "Profile fields must remain readOnly")

if (failures.length > 0) {
  console.error("V2 account read-only check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 account read-only check passed")
