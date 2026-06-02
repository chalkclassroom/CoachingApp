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
const planDetail = read("src/v2/pages/PlanDetail.tsx")
const actionPlans = read("src/v2/pages/ActionPlans.tsx")
const rules = read("firestore.rules")
const legacyFirebase = read("src/components/Firebase/Firebase.tsx")

const legacyFields = ["coach", "teacher", "tool", "dateModified", "goal", "goalTimeline", "benefit", "status"]
for (const field of legacyFields) {
  assert(legacyFirebase.includes(field), "legacy action plan source must still reference field " + field)
}

assert(api.includes("export async function getActionPlanFull"), "V2 API must expose getActionPlanFull")
assert(api.includes("firebase.db.collection('actionPlans').doc(planId).get()"), "getActionPlanFull must read the legacy actionPlans document")
assert(api.includes("firebase.getActionStepsForExport(planId)"), "getActionPlanFull must read legacy actionSteps via getActionStepsForExport")
assert(api.includes("collection('comments').orderBy('createdAt', 'asc')"), "getActionPlanFull must read comments in createdAt order")
assert(api.includes("teacherId: data.teacher || ''"), "getActionPlanFull must map legacy teacher field to teacherId")
assert(api.includes("title: data.tool || data.practice || 'Action plan'"), "getActionPlanFull must map legacy tool/practice to title")
assert(api.includes("dueDate: toDate(data.goalTimeline || data.achieveBy)"), "getActionPlanFull must map legacy due-date fields")

assert(api.includes("export async function saveActionPlanDraft"), "V2 API must expose saveActionPlanDraft")
assert(api.includes("if (patch.title !== undefined) update.tool = patch.title"), "saveActionPlanDraft must update legacy tool field")
assert(api.includes("if (patch.goal !== undefined) update.goal = patch.goal"), "saveActionPlanDraft must update legacy goal field")
assert(api.includes("if (patch.benefit !== undefined) update.benefit = patch.benefit"), "saveActionPlanDraft must update legacy benefit field")
assert(api.includes("if (patch.dueDate !== undefined) update.goalTimeline = patch.dueDate"), "saveActionPlanDraft must update legacy goalTimeline field")
assert(api.includes("dateModified: new Date()"), "saveActionPlanDraft/send must update dateModified")
assert(!api.includes("firebase.saveActionStep(planId, String(index)"), "saveActionPlanDraft must not rely on the legacy update-only saveActionStep helper because V2-added steps may not exist yet")
assert(api.includes("collection('actionSteps').doc(String(index)).set"), "saveActionPlanDraft must write actionSteps with a create-or-update set")
assert(api.includes("{ merge: true }"), "actionSteps fallback must merge instead of replacing unknown legacy fields")

assert(api.includes("export async function addActionPlanComment"), "V2 API must expose addActionPlanComment")
assert(api.includes("authorId: comment.authorId || null"), "comments must include an authorId for rules/audit")
assert(api.includes("createdAt"), "comments must include createdAt")
assert(api.includes("text: comment.text"), "comments must write text")

assert(api.includes("export async function markActionPlanSentToTeacher"), "V2 API must expose markActionPlanSentToTeacher")
assert(api.includes("sentToTeacher: true"), "send flow must mark sentToTeacher=true")
assert(api.includes("sentToTeacherAt: new Date()"), "send flow must write sentToTeacherAt timestamp")
assert(api.includes("sentToTeacherBy: sentBy"), "send flow must write sentToTeacherBy")

assert(planDetail.includes("createV2Api(firebase).getActionPlanFull(realPlanId)"), "PlanDetail must load live plans through V2 API")
assert(planDetail.includes("createV2Api(firebase).saveActionPlanDraft(realPlanId"), "PlanDetail must autosave live plan edits through V2 API")
assert(planDetail.includes("createV2Api(firebase).addActionPlanComment(realPlanId"), "PlanDetail must add live comments through V2 API")
assert(planDetail.includes("createV2Api(firebase).markActionPlanSentToTeacher(realPlanId"), "PlanDetail must send live plans through V2 API")
assert(planDetail.includes("showSendConfirm"), "PlanDetail must require confirmation before send-to-teacher")
assert(!planDetail.includes("DEMO_PLAN"), "PlanDetail must not retain DEMO_PLAN preview data")
assert(!planDetail.includes("chalk-v2-plan-draft"), "PlanDetail must not persist action plan edits to a local preview draft")
assert(!planDetail.includes("Saved locally"), "PlanDetail action plans must not present local-only drafts as saved")
assert(!planDetail.includes("Saving locally"), "PlanDetail action plans must not autosave to local-only storage")
assert(!planDetail.includes("Comment saved locally"), "PlanDetail comments must not be accepted for local-only action plans")
assert(!planDetail.includes("Additional plan actions remain in legacy CHALK"), "PlanDetail must not show a fake More action for unsupported plan actions")
assert(!actionPlans.includes("DEMO_PLANS"), "ActionPlans list must not retain DEMO_PLANS preview data")
assert(!actionPlans.includes("/v2/plans/demo-plan"), "ActionPlans must not route new action plans to a fake demo-plan detail")
assert(actionPlans.includes("window.location.href = '/ActionPlans'"), "New action plan creation must route to the approved legacy action plan list until V2 create is implemented")

assert(rules.includes("function validActionPlanUpdate"), "firestore.rules must define validActionPlanUpdate")
assert(rules.includes('changed.hasOnly(["tool", "practice", "goal", "benefit", "goalTimeline", "achieveBy", "status", "dateModified", "sentToTeacher", "sentToTeacherAt", "sentToTeacherBy"])'), "rules must restrict action plan root update fields")
assert(rules.includes("function validActionPlanComment"), "firestore.rules must define validActionPlanComment")
assert(rules.includes("request.resource.data.authorId == request.auth.uid"), "comment rules must bind authorId to request auth")
assert(rules.includes("text.size() <= 2000"), "comment rules must cap comment length")

if (failures.length > 0) {
  console.error("V2 action plan contract check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 action plan contract check passed")
