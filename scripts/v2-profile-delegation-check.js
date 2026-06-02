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

const leader = read("src/v2/pages/LeaderWorkspace.tsx")
const reports = read("src/v2/pages/Reports.tsx")

assert(leader.includes("Profile reports remain in legacy CHALK"), "Leader workspace must disclose coach/site/program profile delegation")
for (const route of ["/CoachProfile", "/SiteProfile", "/ProgramProfile"]) {
  assert(leader.includes(route), "Leader workspace must link to legacy profile route " + route)
}
assert(!leader.includes("profile opened in preview mode"), "Profile links must not fake V2 preview behavior")
assert(reports.includes("Open legacy reports"), "Reports page must continue delegating advanced profile reports to legacy")
assert(!reports.includes("Coach Profile") && !reports.includes("Site Profile") && !reports.includes("Program Profile"), "Reports must not show unsupported profile links as complete V2 behavior")

if (failures.length > 0) {
  console.error("V2 profile delegation check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 profile delegation check passed")
