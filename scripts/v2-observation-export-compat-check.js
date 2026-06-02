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

const api = read("src/v2/lib/api.ts")
const bq = read("functions/observationToBQ/index.js")
const observationTypes = read("src/v2/lib/observationTypes.ts")

const storedTypes = Array.from(observationTypes.matchAll(/storedType: '([^']+)'/g)).map(match => match[1])
const uniqueStoredTypes = Array.from(new Set(storedTypes))
const bqBranches = new Set(Array.from(bq.matchAll(/session\.type\.toLowerCase\(\) === "([^"]+)"/g)).map(match => match[1]))
const bqLiteracyChecklists = new Set(Array.from(bq.matchAll(/session\.type === "LI" && session\.checklist === "([^"]+)"/g)).map(match => match[1]))

for (const type of uniqueStoredTypes) {
  if (type === "LI") continue
  assert(bqBranches.has(type.toLowerCase()), "observationToBQ missing branch for stored type " + type)
}
for (const checklist of ["FoundationalTeacher", "FoundationalChild", "WritingTeacher", "WritingChild", "LanguageTeacher", "ReadingTeacher"]) {
  assert(bqLiteracyChecklists.has(checklist), "observationToBQ missing literacy checklist branch " + checklist)
}

const guardIndex = api.indexOf("requiresCanonicalObservationEntries")
const endSessionIndex = api.indexOf("firebase.endSession(new Date())")
assert(guardIndex !== -1, "completeObservation must guard export-triggering endSession with requiresCanonicalObservationEntries")
assert(endSessionIndex !== -1, "completeObservation must still call legacy endSession after compatibility guard")
assert(guardIndex !== -1 && endSessionIndex !== -1 && guardIndex < endSessionIndex, "canonical entry guard must run before firebase.endSession(new Date())")
assert(api.includes("canonical coded entries"), "guard error must explain that canonical coded entries are required before export")

if (failures.length > 0) {
  console.error("V2 observation export compatibility check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 observation export compatibility check passed")
