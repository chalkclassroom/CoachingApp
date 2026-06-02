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

const liveObservation = read("src/v2/pages/LiveObservation.tsx")
const api = read("src/v2/lib/api.ts")

assert(api.includes("requiresCanonicalObservationEntries"), "API must guard completion behind canonical observation entries")
assert(api.includes("canonical coded entries"), "API guard must explain canonical coded entries are required")
assert(liveObservation.includes("hasCanonicalObservationEntries"), "LiveObservation must check for canonical entries before presenting completion")
assert(liveObservation.includes("canCompleteObservation"), "LiveObservation must compute whether completion is currently allowed")
assert(liveObservation.includes("Completion requires coded observation entries"), "LiveObservation must disclose why notes-only V2 sessions cannot complete yet")
assert(liveObservation.includes("if (auth.user && !hasCanonicalObservationEntries)"), "completeObservation must no-op safely when live completion lacks canonical entries")
assert(liveObservation.includes("disabled={!canCompleteObservation || completing}"), "Complete button must be disabled until canonical entries exist")
assert(liveObservation.includes("V2 notes are saved as a draft"), "Blocked completion copy must tell the user the draft is preserved")

if (failures.length > 0) {
  console.error("V2 observation completion gate check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 observation completion gate check passed")
