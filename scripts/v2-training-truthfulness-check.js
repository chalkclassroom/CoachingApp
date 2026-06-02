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

const training = read("src/v2/pages/Training.tsx")
const api = read("src/v2/lib/api.ts")
const rules = read("firestore.rules")

assert(api.includes("getTrainingStatus"), "V2 API must load persisted training status")
assert(api.includes("markTrainingCompleted"), "V2 API must persist training completion")
assert(api.includes("dismissTrainingRecommendation"), "V2 API must persist dismissed recommendations")
assert(rules.includes("v2TrainingStatus"), "rules must allow constrained v2TrainingStatus updates")
assert(!training.includes("Based on patterns in recent observations and action plans"), "Training header must not imply recommendations are data-driven unless they are")
assert(!api.includes("Recommended from recent observations"), "Training recommendations must not claim recent-observation analysis")
assert(!api.includes("Recurring coaching theme"), "Training recommendations must not claim recurring theme analysis")
assert(!api.includes("Recommended when goals are not measurable"), "Training recommendations must not claim goal analysis")
assert(training.includes("Curated CHALK training modules"), "Training page must disclose static/curated recommendation source")
assert(training.includes("api.markTrainingCompleted(auth.user.uid, id).then(() => {"), "Training completion must update UI only after live write succeeds")
assert(training.includes("api.dismissTrainingRecommendation(auth.user.uid, id).then(() => {"), "Training dismiss must update UI only after live write succeeds")
assert(training.includes("Unable to mark training complete"), "Training completion failure must show safe error")
assert(training.includes("Unable to skip training"), "Training dismiss failure must show safe error")

if (failures.length > 0) {
  console.error("V2 training truthfulness check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 training truthfulness check passed")
