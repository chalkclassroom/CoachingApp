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

const pkg = JSON.parse(read("package.json"))
const workflowPath = ".github/workflows/v2_smoke.yml"
const workflow = exists(workflowPath) ? read(workflowPath) : ""
const healthPath = "docs/CHALK-2-CYPRESS-HEALTH.md"
const health = exists(healthPath) ? read(healthPath) : ""
const preview = read("cypress/integration/v2/preview-readiness.ts")

assert(pkg.scripts && pkg.scripts["v2:cypress:smoke"], "package.json must define v2:cypress:smoke")
assert(pkg.scripts && pkg.scripts["v2:ci:smoke"], "package.json must define v2:ci:smoke")
assert(workflow.includes("V2 smoke"), "V2 smoke workflow must exist")
assert(workflow.includes("yarn run v2:ci:smoke"), "Workflow must run the V2 CI smoke command")
assert(workflow.includes("yarn run v2:cypress:smoke"), "Workflow must run the scoped V2 Cypress smoke spec")
assert(workflow.includes("yarn run localdev"), "Workflow must start the local dev server before Cypress")
assert(preview.includes("/v2/leader"), "V2 Cypress preview readiness spec must cover the leader route")
assert(health.includes("Legacy Cypress health"), "Cypress health doc must document legacy suite status")
assert(health.includes("not a production gate"), "Cypress health doc must state legacy suite is not the V2 production gate")
assert(health.includes("Path C gate"), "Cypress health doc must document the accepted Path C gate")

if (failures.length > 0) {
  console.error("V2 Cypress CI check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 Cypress CI check passed")
