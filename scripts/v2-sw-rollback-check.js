#!/usr/bin/env node
const fs = require("fs")
const path = require("path")

const appRoot = path.resolve(__dirname, "..")
const failures = []
function read(rel) {
  return fs.readFileSync(path.join(appRoot, rel), "utf8")
}
function exists(rel) {
  return fs.existsSync(path.join(appRoot, rel))
}
function assert(condition, message) {
  if (!condition) failures.push(message)
}

const index = read("src/index.tsx")
const docPath = "docs/CHALK-2-SW-ROLLBACK-SMOKE.md"
const doc = exists(docPath) ? read(docPath) : ""
const pkg = JSON.parse(read("package.json"))

assert(index.includes("showServiceWorkerUpdateNotice"), "Service worker update notice must exist")
assert(index.includes("controllerchange"), "Service worker controllerchange reload must exist")
assert(index.includes("New CHALK version available"), "Service worker update copy must be explicit")
assert(doc.includes("Deploy smoke"), "SW runbook must include deploy smoke")
assert(doc.includes("Rollback smoke"), "SW runbook must include rollback smoke")
assert(doc.includes("firebase deploy -P staging --only hosting"), "SW runbook must use staging hosting-only deploy")
assert(doc.includes("git switch --detach"), "SW runbook must include rollback checkout command")
assert(doc.includes("mixed asset state"), "SW runbook must check for mixed asset state")
assert(pkg.scripts["v2:sw-rollback-check"] === "node scripts/v2-sw-rollback-check.js", "package.json must expose v2:sw-rollback-check")

if (failures.length > 0) {
  console.error("V2 service worker rollback check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 service worker rollback check passed")
