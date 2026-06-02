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

const messaging = read("src/v2/pages/Messaging.tsx")
const api = read("src/v2/lib/api.ts")
const types = read("src/v2/lib/types.ts")
const rules = read("firestore.rules")
const rulesSmoke = read("scripts/v2-rules-emulator-smoke.js")
const legacyApp = read("src/App.tsx")

assert(legacyApp.includes('path="/Messaging"'), "legacy app must expose /Messaging for delivery fallback")
assert(types.includes("MessagingEmail"), "V2 types must define MessagingEmail")
assert(api.includes("getMessagingEmails"), "V2 API must load messaging emails from Firestore")
assert(api.includes("saveMessagingDraft"), "V2 API must save messaging drafts to Firestore")
assert(messaging.includes("Save draft"), "V2 Messaging must expose a real save draft action")
assert(messaging.includes("createV2Api(firebase).saveMessagingDraft"), "V2 Messaging save must use the V2 API")
assert(messaging.includes("createV2Api(firebase).getMessagingEmails"), "V2 Messaging must load live draft/sent rows")
assert(messaging.includes("Email delivery remains in legacy CHALK"), "V2 Messaging must disclose delivery fallback separately from draft storage")
assert(messaging.includes("Open legacy messaging"), "V2 Messaging must still expose legacy delivery route")
assert(!messaging.includes("Messaging is delegated to legacy CHALK"), "V2 Messaging must not delegate the whole module once drafts are live")
assert(!messaging.includes("No V2 conversations shown"), "V2 Messaging must not hide live message rows")
assert(!messaging.includes("setThreads(current"), "V2 Messaging must not mutate local threads as if live")
assert(!messaging.includes("messages: [{ id: 'intro'"), "V2 Messaging must not seed a fake teacher thread")
assert(rules.includes("validEmailValue"), "Firestore rules must validate email draft shape")
assert(rulesSmoke.includes("messagingDraftBody"), "Rules smoke must include messaging draft body")
assert(rulesSmoke.includes("coach own messaging draft write"), "Rules smoke must allow owner draft writes")
assert(rulesSmoke.includes("unrelated coach messaging draft read"), "Rules smoke must deny cross-user draft reads")

if (failures.length > 0) {
  console.error("V2 messaging live-draft check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 messaging live-draft check passed")
