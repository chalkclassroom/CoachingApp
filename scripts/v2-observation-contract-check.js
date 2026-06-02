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

const observationTypes = read("src/v2/lib/observationTypes.ts")
const api = read("src/v2/lib/api.ts")
const bq = read("functions/observationToBQ/index.js")

const optionMatches = Array.from(observationTypes.matchAll(/\{ code: '([^']+)', label: '([^']+)', storedType: '([^']+)', description: '([^']+)'(, requiresChecklist: true)? \}/g))
const options = optionMatches.map(match => ({
  code: match[1],
  label: match[2],
  storedType: match[3],
  requiresChecklist: Boolean(match[5])
}))

const expected = {
  TT: { storedType: "transition" },
  CC: { storedType: "climate" },
  MI: { storedType: "math" },
  SE: { storedType: "engagement" },
  IN: { storedType: "level" },
  LC: { storedType: "listening" },
  SA: { storedType: "sequential" },
  AC: { storedType: "AC" },
  LI: { storedType: "LI", requiresChecklist: true }
}

assert(options.length === Object.keys(expected).length, "observation options must stay at the expected 9 legacy-compatible UI codes")
const seen = new Set()
for (const option of options) {
  assert(!seen.has(option.code), "duplicate observation UI code: " + option.code)
  seen.add(option.code)
  const expectedOption = expected[option.code]
  assert(Boolean(expectedOption), "unexpected observation UI code: " + option.code)
  if (expectedOption) {
    assert(option.storedType === expectedOption.storedType, option.code + " must store as " + expectedOption.storedType + ", got " + option.storedType)
    assert(Boolean(option.requiresChecklist) === Boolean(expectedOption.requiresChecklist), option.code + " requiresChecklist mismatch")
  }
}
for (const code of Object.keys(expected)) {
  assert(seen.has(code), "missing observation UI code: " + code)
}

const bqTypes = new Set(Array.from(bq.matchAll(/session\.type\.toLowerCase\(\) === "([^"]+)"/g)).map(match => match[1]))
const bqLiteracyChecklists = new Set(Array.from(bq.matchAll(/session\.type === "LI" && session\.checklist === "([^"]+)"/g)).map(match => match[1]))
const expectedLiteracyChecklists = ["FoundationalTeacher", "FoundationalChild", "WritingTeacher", "WritingChild", "LanguageTeacher", "ReadingTeacher"]

for (const option of options) {
  if (option.storedType === "LI") continue
  assert(bqTypes.has(option.storedType.toLowerCase()), option.code + " stored type " + option.storedType + " must have an observationToBQ branch")
}
for (const checklist of expectedLiteracyChecklists) {
  assert(bqLiteracyChecklists.has(checklist), "observationToBQ must support literacy checklist " + checklist)
}

assert(observationTypes.includes("LITERACY_CHECKLIST_OPTIONS"), "observationTypes.ts must expose literacy checklist options for LI")
assert(api.includes("buildObservationStartPayload"), "startObservation must use a canonical payload builder")
assert(!api.includes("getStoredObservationType(typeCode) || typeCode"), "startObservation must reject invalid UI codes instead of falling back to the raw typeCode")
assert(!api.includes("checklist: typeCode === 'LI' ? 'LI' : undefined"), "LI observations must use a real legacy literacy checklist, not checklist=LI")

if (failures.length > 0) {
  console.error("V2 observation contract check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 observation contract check passed")
