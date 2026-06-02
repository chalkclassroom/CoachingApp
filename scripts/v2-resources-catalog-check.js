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

const resources = read("src/v2/pages/Resources.tsx")
const requiredAssets = [
  "src/assets/coaching-docs/Coach Handbook_9.1.21.pdf",
  "src/assets/coaching-docs/Transition Time CHALK Handout.pdf",
  "src/assets/coaching-docs/Classroom Climate CHALK Handout.pdf",
  "src/assets/coaching-docs/Early Math CHALK Handout.pdf",
  "src/assets/coaching-docs/Student Engagement CHALK Handout.pdf",
  "src/assets/coaching-docs/Literacy Definitions and Examples.pdf",
  "src/assets/coaching-docs/Associative and Cooperative Interactions CHALK Handout.pdf",
  "src/assets/coaching-docs/CLASS CHALK Crosswalk.pdf",
  "src/assets/coaching-docs/Coaching Best Practices.pdf"
]
for (const asset of requiredAssets) {
  assert(fs.existsSync(path.join(appRoot, asset)), "missing required coaching asset: " + asset)
}

assert(resources.includes("url: string"), "Resource type must include a concrete url")
assert(resources.includes("CoachHandbookUrl"), "Resources must import Coach Handbook asset")
assert(resources.includes("TransitionHandoutUrl"), "Resources must import Transition Time handout asset")
assert(resources.includes("ClassCrosswalkUrl"), "Resources must import CLASS crosswalk asset")
assert(resources.includes("window.open(resource.url"), "Open resource must open the concrete asset URL")
assert(!resources.includes("source material stays in legacy for now"), "Resources must not claim real assets are only mapped for migration")
assert(!resources.includes("useToast"), "Resources should not use toast as a substitute for opening assets")
assert(!resources.includes("format: 'Video'"), "Resources must not advertise video assets when no video URL exists")

const urlBackedResources = (resources.match(/url: /g) || []).length
assert(urlBackedResources >= 8, "Resources catalog must contain at least 8 URL-backed resources")

if (failures.length > 0) {
  console.error("V2 resources catalog check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 resources catalog check passed")
