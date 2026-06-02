#!/usr/bin/env node
const fs = require("fs")
const path = require("path")

const appRoot = path.resolve(__dirname, "..")
const source = fs.readFileSync(path.join(appRoot, "src/v2/pages/ActionPlans.tsx"), "utf8")
const failures = []
function assert(condition, message) {
  if (!condition) failures.push(message)
}

assert(source.includes("Open legacy conference plans"), "conference plan control must be labeled as legacy/delegated")
assert(source.includes("Conference plans stay in legacy"), "conference plan action must disclose delegation in user-facing copy")
assert(!source.includes(">+ Conference plan<"), "conference plan control must not look like a live create action")
assert(!/history\.push\([^)]*conference/i.test(source), "conference plan control must not route to a local V2 create/edit path")
assert(!/demo-conference|conference-demo|fake conference/i.test(source), "conference plan control must not create fake local conference data")

if (failures.length > 0) {
  console.error("V2 conference plan delegation check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 conference plan delegation check passed")
