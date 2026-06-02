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

const admin = read("src/v2/pages/AdminWorkspace.tsx")
const access = read("src/v2/access.ts")
const api = read("src/v2/lib/api.ts")
const types = read("src/v2/lib/types.ts")
const rulesSmoke = read("scripts/v2-rules-emulator-smoke.js")

assert(access.includes("admin: ['admin']"), "Admin route must remain admin-only")
assert(types.includes("AdminUserRow"), "V2 types must define AdminUserRow")
assert(api.includes("getAdminUsers"), "V2 API must load admin users")
assert(api.includes("setUserArchived"), "V2 API must archive/unarchive users")
assert(admin.includes("createV2Api(firebase).getAdminUsers"), "AdminWorkspace must load users through the V2 API")
assert(admin.includes("createV2Api(firebase).setUserArchived"), "AdminWorkspace archive action must use the V2 API")
assert(admin.includes("Archive") && admin.includes("Unarchive"), "AdminWorkspace must expose archive/unarchive controls")
assert(admin.includes("Live users"), "AdminWorkspace must label user management as live")
assert(!admin.includes("Admin writes remain in legacy CHALK"), "AdminWorkspace must not claim all admin writes are delegated")
assert(!admin.includes("User management remains in legacy CHALK"), "AdminWorkspace must not delegate the whole user workflow")
assert(!admin.includes("useToast as fake"), "AdminWorkspace check sanity")
assert(rulesSmoke.includes("admin archive user write"), "Rules smoke must allow admin archive writes")
assert(rulesSmoke.includes("coach archive user write"), "Rules smoke must deny non-admin archive writes")

if (failures.length > 0) {
  console.error("V2 admin live-user check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 admin live-user check passed")
