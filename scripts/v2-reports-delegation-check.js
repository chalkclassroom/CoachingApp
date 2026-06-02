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

const reports = read("src/v2/pages/Reports.tsx")

assert(!reports.includes("useToast"), "Reports must not use toast as fake report/export/schedule behavior")
assert(!reports.includes("Export CSV"), "Reports must not show Export CSV unless it is live")
assert(!reports.includes("Schedule report"), "Reports must not show Schedule report unless it is live")
assert(!reports.includes("preview opened from V2 reports"), "Saved report open must not fake preview behavior")
assert(reports.includes("Open legacy reports"), "Reports must expose explicit legacy reports delegation")
assert(reports.includes("window.location.href = '/Reports'"), "Reports delegation must route to legacy /Reports")
assert(reports.includes("No live practice trend data"), "Practice trends must show production-safe empty state")
assert(reports.includes("Advanced report exports and scheduling remain in legacy CHALK"), "Reports must disclose unsupported export/schedule scope")

if (failures.length > 0) {
  console.error("V2 reports delegation check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 reports delegation check passed")
