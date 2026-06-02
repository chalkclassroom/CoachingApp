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
const legacyApp = read("src/App.tsx")

assert(legacyApp.includes('path="/Messaging"'), "legacy app must expose /Messaging before V2 delegates there")
assert(messaging.includes("Messaging is delegated to legacy CHALK"), "V2 Messaging must disclose delegation")
assert(messaging.includes("history.push('/Messaging')"), "V2 Messaging must provide a route into legacy /Messaging")
assert(messaging.includes("Open legacy messaging"), "V2 Messaging must label the legacy action clearly")
assert(!messaging.includes("local-1780361547041"), "V2 Messaging must not create local fake sent messages")
assert(!messaging.includes("Message saved in the V2 preview thread"), "V2 Messaging must not claim local messages were saved")
assert(!messaging.includes("Preview messages stay local"), "V2 Messaging must not keep preview-only messaging copy in production scope")
assert(!messaging.includes("setThreads(current"), "V2 Messaging must not mutate local threads as if live")
assert(!messaging.includes("messages: [{ id: 'intro'"), "V2 Messaging must not seed a fake teacher thread")

if (failures.length > 0) {
  console.error("V2 messaging delegation check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 messaging delegation check passed")
