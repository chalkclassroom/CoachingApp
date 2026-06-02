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
assert(types.includes("AdminProgramRow"), "V2 types must define AdminProgramRow")
assert(types.includes("AdminSiteRow"), "V2 types must define AdminSiteRow")
assert(api.includes("getAdminUsers"), "V2 API must load admin users")
assert(api.includes("setUserArchived"), "V2 API must archive/unarchive users")
assert(api.includes("getAdminPrograms"), "V2 API must load admin programs")
assert(api.includes("getAdminSites"), "V2 API must load admin sites")
assert(api.includes("saveAdminProgram"), "V2 API must save admin program edits")
assert(api.includes("saveAdminSite"), "V2 API must save admin site edits")
assert(admin.includes("createV2Api(firebase).getAdminUsers"), "AdminWorkspace must load users through the V2 API")
assert(admin.includes("createV2Api(firebase).setUserArchived"), "AdminWorkspace archive action must use the V2 API")
assert(admin.includes("createV2Api(firebase).getAdminPrograms"), "AdminWorkspace must load programs through the V2 API")
assert(admin.includes("createV2Api(firebase).getAdminSites"), "AdminWorkspace must load sites through the V2 API")
assert(admin.includes("createV2Api(firebase).saveAdminProgram"), "AdminWorkspace program save must use the V2 API")
assert(admin.includes("createV2Api(firebase).saveAdminSite"), "AdminWorkspace site save must use the V2 API")
assert(!admin.includes("Program edits remain in legacy CHALK"), "AdminWorkspace must not delegate program edits once V2 saves them")
assert(!admin.includes("Site edits remain in legacy CHALK"), "AdminWorkspace must not delegate site edits once V2 saves them")
assert(admin.includes("Archive") && admin.includes("Unarchive"), "AdminWorkspace must expose archive/unarchive controls")
assert(admin.includes("Live users"), "AdminWorkspace must label user management as live")
assert(!admin.includes("Admin writes remain in legacy CHALK"), "AdminWorkspace must not claim all admin writes are delegated")
assert(!admin.includes("User management remains in legacy CHALK"), "AdminWorkspace must not delegate the whole user workflow")
assert(!admin.includes("useToast as fake"), "AdminWorkspace check sanity")
assert(rulesSmoke.includes("admin archive user write"), "Rules smoke must allow admin archive writes")
assert(rulesSmoke.includes("coach archive user write"), "Rules smoke must deny non-admin archive writes")
assert(rulesSmoke.includes("admin program directory write"), "Rules smoke must allow admin program writes")
assert(rulesSmoke.includes("admin site directory write"), "Rules smoke must allow admin site writes")

if (failures.length > 0) {
  console.error("V2 admin live-user check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 admin live-user check passed")
