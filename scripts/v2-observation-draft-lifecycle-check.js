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
const rules = read("firestore.rules")

assert(liveObservation.includes("window.localStorage.setItem('chalk-v2-observation-draft'"), "LiveObservation must persist the draft locally")
assert(liveObservation.includes("window.localStorage.getItem('chalk-v2-observation-draft')"), "LiveObservation must restore a compatible local draft after refresh")
assert(liveObservation.includes("restoredDraftRef"), "LiveObservation must guard draft restore from repeated replays")
assert(liveObservation.includes("draft.teacherUid === teacherUid"), "draft restore must match teacherUid before replaying notes")
assert(liveObservation.includes("draft.typeCode === selectedOption.code"), "draft restore must match observation type before replaying notes")
assert(liveObservation.includes("draft.storedType === storedObservationType"), "draft restore must match stored legacy type before replaying notes")
assert(liveObservation.includes("setNotes(draft.notes"), "draft restore must replay notes")
assert(liveObservation.includes("setElapsedSeconds("), "draft restore must replay elapsed seconds")
assert(liveObservation.includes("Draft restored"), "draft restore must surface a restored status")
assert(liveObservation.includes("Unable to restore v2 observation draft"), "draft restore must handle malformed local data safely")

assert(api.includes("saveObservationDraft"), "V2 API must expose saveObservationDraft")
assert(api.includes("observationDraft: draft"), "saveObservationDraft must write the user observationDraft field")
assert(api.includes("observationDraft: null"), "completeObservation must clear the server draft only after completion")
assert(rules.includes("validObservationDraftValue"), "firestore.rules must validate observationDraft shape")
assert(rules.includes('draft.keys().hasOnly(["teacherUid", "teacherName", "classroomName", "sessionName", "typeCode", "storedType", "checklist", "notes", "elapsedSeconds", "updatedAt"])'), "rules must keep observationDraft fields constrained")

if (failures.length > 0) {
  console.error("V2 observation draft lifecycle check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 observation draft lifecycle check passed")
