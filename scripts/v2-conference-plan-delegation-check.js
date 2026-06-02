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

const actionPlans = read("src/v2/pages/ActionPlans.tsx")
const planDetail = read("src/v2/pages/PlanDetail.tsx")
const api = read("src/v2/lib/api.ts")
const types = read("src/v2/lib/types.ts")
const rules = read("firestore.rules")
const rulesSmoke = read("scripts/v2-rules-emulator-smoke.js")

assert(types.includes("ConferencePlanItem"), "V2 types must define ConferencePlanItem")
assert(types.includes("ConferencePlanDetail"), "V2 types must define ConferencePlanDetail")
assert(api.includes("getConferencePlans"), "V2 API must load conference plan list")
assert(api.includes("getConferencePlanFull"), "V2 API must load conference plan detail")
assert(api.includes("saveConferencePlanDraft"), "V2 API must persist conference plan edits")
assert(actionPlans.includes("createV2Api(firebase).getConferencePlans"), "ActionPlans must load conference plans through V2 API")
assert(actionPlans.includes("kind: 'conference'"), "ActionPlans must render conference plan rows")
assert(!actionPlans.includes("Open legacy conference plans"), "conference plan control must not delegate the whole workflow")
assert(!actionPlans.includes("Conference plans stay in legacy"), "conference plan action must not disclose full legacy delegation once live")
assert(planDetail.includes("isConferencePlan"), "PlanDetail must branch for conference plan detail")
assert(planDetail.includes("createV2Api(firebase).saveConferencePlanDraft"), "PlanDetail must persist conference plan edits through V2 API")
assert(rules.includes("validConferencePlanUpdate"), "Firestore rules must validate conference plan updates")
assert(rulesSmoke.includes("conferencePlanBody"), "Rules smoke must include conference plan body")
assert(rulesSmoke.includes("assigned coach conference plan write"), "Rules smoke must allow assigned coach conference plan writes")
assert(rulesSmoke.includes("unrelated coach conference plan write"), "Rules smoke must deny unrelated coach conference plan writes")

if (failures.length > 0) {
  console.error("V2 conference plan live check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 conference plan live check passed")
