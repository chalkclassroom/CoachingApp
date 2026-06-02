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

const accessPath = path.join(appRoot, "src/v2/access.ts")
const appShell = read("src/v2/layout/AppShell.tsx")
const app = read("src/v2/App.tsx")
const access = fs.existsSync(accessPath) ? fs.readFileSync(accessPath, "utf8") : ""

assert(access.includes("V2_NAV_ITEMS"), "V2 role policy must expose V2_NAV_ITEMS")
assert(access.includes("canAccessV2Area"), "V2 role policy must expose canAccessV2Area")
assert(access.includes("admin: [") && access.includes("'admin'"), "Admin route must be admin-only in the shared access policy")
assert(access.includes("reports: [") && access.includes("'siteLeader'") && access.includes("'programLeader'"), "Reports must be available to leader roles in the shared access policy")
assert(access.includes("teacher: [") && !/teacher:s*[[^]]*admin/.test(access), "Teacher nav must not include admin")
assert(!/teacher:s*[[^]]*reports/.test(access), "Teacher nav must not include reports")
assert(!/coach:s*[[^]]*admin/.test(access), "Coach nav must not include admin")
assert(appShell.includes("getV2NavItemsForRole"), "AppShell must filter nav through getV2NavItemsForRole")
assert(!appShell.includes("NAV_ITEMS.map"), "AppShell must not render every NAV_ITEMS entry unconditionally")
assert(app.includes("GuardedV2Route"), "V2 direct routes must use GuardedV2Route")
assert(app.includes("Unsupported V2 route"), "Unsupported direct routes must render an explicit denial/delegation state")
assert(app.includes('area=\"admin\"'), "Admin route must declare its access area")
assert(app.includes('area=\"reports\"'), "Reports route must declare its access area")

if (failures.length > 0) {
  console.error("V2 role access check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 role access check passed")
