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

const docPath = "docs/CHALK-2-RELEASE-DECISION.md"
const doc = exists(docPath) ? read(docPath) : ""
const pkg = JSON.parse(read("package.json"))

for (const required of [
  "Decision: Path C preview",
  "Production decision: NO-GO",
  "Included modules",
  "Delegated modules",
  "Risk acceptance",
  "Rollback owner",
  "Release owner",
  "Monitoring owner",
  "No production deploy",
  "fork/feature/chalk-2.0-renovation"
]) {
  assert(doc.includes(required), "Decision record must include: " + required)
}
assert(pkg.scripts["v2:release-decision-check"] === "node scripts/v2-release-decision-check.js", "package.json must expose v2:release-decision-check")

if (failures.length > 0) {
  console.error("V2 release decision check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 release decision check passed")
