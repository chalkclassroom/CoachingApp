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

const access = read("src/v2/access.ts")
const app = read("src/v2/App.tsx")
const pagePath = path.join(appRoot, "src/v2/pages/LeaderWorkspace.tsx")
const leader = fs.existsSync(pagePath) ? fs.readFileSync(pagePath, "utf8") : ""

assert(access.includes("leader"), "Shared access policy must define a leader V2 area")
assert(access.includes("leader: ['admin', 'siteLeader', 'programLeader']"), "Leader area must be available to siteLeader and programLeader")
assert(access.includes("coach: ['home', 'teachers', 'observation', 'plans', 'messages', 'resources', 'training', 'account']"), "Coach nav must not include leader workspace")
assert(access.includes("teacher: ['home', 'resources', 'training', 'account']"), "Teacher nav must not include leader workspace")
assert(app.includes("LeaderWorkspace"), "V2 routes must import/render LeaderWorkspace")
assert(app.includes('path=\"/v2/leader\"') && app.includes('area=\"leader\"'), "Leader direct route must be guarded by leader access area")
assert(leader.includes("legacy leader workflows"), "LeaderWorkspace must disclose legacy delegation")
for (const route of ["/LeadersDashboard", "/LeadersUsers", "/LeadersTeachers", "/LeadersCoaches", "/LeadersSites", "/LeadersArchive", "/LeadersAllUsers"]) {
  assert(leader.includes(route), "LeaderWorkspace must delegate to legacy " + route)
}
assert(!leader.includes("useToast"), "LeaderWorkspace must not fake navigation with toast")

if (failures.length > 0) {
  console.error("V2 leader delegation check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 leader delegation check passed")
