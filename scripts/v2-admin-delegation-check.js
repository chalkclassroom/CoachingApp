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

assert(access.includes("admin: ['admin']"), "Admin route must remain admin-only")
assert(!admin.includes("useToast"), "AdminWorkspace must not use toast as fake write behavior")
assert(!admin.includes("Import users"), "AdminWorkspace must not show import action without live backend")
assert(!admin.includes("+ New"), "AdminWorkspace must not show create action without live backend")
assert(!admin.includes("preview mode"), "AdminWorkspace must not claim preview edit/open behavior")
assert(!admin.includes(">Edit</Button>"), "AdminWorkspace must not expose edit button without scoped write tests")
assert(admin.includes("Admin writes remain in legacy CHALK"), "AdminWorkspace must disclose delegated write scope")
assert(admin.includes("Open legacy admin"), "AdminWorkspace must expose explicit legacy admin delegation")
assert(admin.includes("window.location.href = '/Admin'"), "AdminWorkspace must route to legacy /Admin")
assert(admin.includes("window.location.href = '/AllUsers'"), "AdminWorkspace must route all-user management to legacy /AllUsers")

if (failures.length > 0) {
  console.error("V2 admin delegation check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 admin delegation check passed")
