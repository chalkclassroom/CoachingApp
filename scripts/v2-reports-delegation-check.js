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
const api = read("src/v2/lib/api.ts")
const types = read("src/v2/lib/types.ts")

assert(types.includes("PracticeTrend"), "V2 types must define PracticeTrend")
assert(api.includes("getPracticeTrends"), "V2 API must load practice trends from observations")
assert(reports.includes("createV2Api(firebase).getPracticeTrends"), "Reports must load practice trends through the V2 API")
assert(reports.includes("Practice trends"), "Reports must render a practice trends section")
assert(!reports.includes("const PRACTICES: PracticeRow[] = []"), "Reports must not use an empty static practice trend list")
assert(!reports.includes("No live practice trend data"), "Reports must not delegate all practice trend data")
assert(!reports.includes("useToast"), "Reports must not use toast as fake report/export/schedule behavior")
assert(!reports.includes("Export CSV"), "Reports must not show Export CSV unless it is live")
assert(!reports.includes("Schedule report"), "Reports must not show Schedule report unless it is live")
assert(!reports.includes("preview opened from V2 reports"), "Saved report open must not fake preview behavior")
assert(reports.includes("Open legacy reports"), "Reports must expose explicit legacy reports fallback for exports/scheduling")
assert(reports.includes("window.location.href = '/Reports'"), "Reports fallback must route to legacy /Reports")
assert(reports.includes("Advanced report exports and scheduling remain in legacy CHALK"), "Reports must disclose unsupported export/schedule scope")

if (failures.length > 0) {
  console.error("V2 reports live-trends check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 reports live-trends check passed")
