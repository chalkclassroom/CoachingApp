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

const docPath = "docs/CHALK-2-PRODUCTION-RELEASE-CHECKLIST.md"
const doc = exists(docPath) ? read(docPath) : ""
const pkg = JSON.parse(read("package.json"))

for (const required of [
  "Production status: HOLD",
  "Rollback tag",
  "npm run v2:ci:smoke",
  "npm run staging",
  "npm run prod",
  "npm run v2:rules-smoke:test",
  "npm run v2:cypress:smoke",
  "Monitoring proof",
  "Source map association",
  "Service worker rollback smoke",
  "Release notes",
  "Explicit production deploy command",
  "No production deploy without written approval"
]) {
  assert(doc.includes(required), "Production checklist must include: " + required)
}
assert(pkg.scripts["v2:release-checklist-check"] === "node scripts/v2-release-checklist-check.js", "package.json must expose v2:release-checklist-check")

if (failures.length > 0) {
  console.error("V2 production checklist check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 production checklist check passed")
