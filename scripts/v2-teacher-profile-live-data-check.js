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

const profile = read("src/v2/pages/TeacherProfile.tsx")
const api = read("src/v2/lib/api.ts")

assert(profile.includes("createV2Api(firebase).getTeachersForCoach(auth.user.uid)"), "TeacherProfile must load teacher rows from V2 API")
assert(!profile.includes("/v2/plans/demo-plan"), "TeacherProfile must not route to demo-plan")
assert(!profile.includes("May 20, 2026"), "TeacherProfile must not render fake plan update dates")
assert(!profile.includes("May 19, 2026"), "TeacherProfile must not render fake teacher message dates")
assert(!profile.includes("Teacher message"), "TeacherProfile must not render fake teacher message timeline items")
assert(profile.includes("No live teacher record loaded"), "TeacherProfile must disclose missing live teacher records safely")
assert(profile.includes("No recent live activity"), "TeacherProfile must show an empty timeline when live data is absent")
assert(profile.includes("history.push('/v2/plans')"), "TeacherProfile plan action must route to the live plans workspace")
assert(api.includes("getTeachersForCoach"), "V2 API must expose getTeachersForCoach for profile data")

if (failures.length > 0) {
  console.error("V2 teacher profile live-data check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 teacher profile live-data check passed")
