#!/usr/bin/env node
const fs = require("fs")
const path = require("path")

const appRoot = path.resolve(__dirname, "..")
const failures = []
function read(rel) {
  return fs.readFileSync(path.join(appRoot, rel), "utf8")
}
function exists(rel) {
  return fs.existsSync(path.join(appRoot, rel))
}
function assert(condition, message) {
  if (!condition) failures.push(message)
}

const webpack = read("webpack.config.js")
const env = read(".env-cmdrc.js")
const boundary = read("src/v2/components/ErrorBoundary.tsx")
const app = read("src/v2/App.tsx")
const monitorPath = "src/v2/lib/monitoring.ts"
const monitor = exists(monitorPath) ? read(monitorPath) : ""
const docPath = "docs/CHALK-2-MONITORING.md"
const doc = exists(docPath) ? read(docPath) : ""

assert(webpack.includes('devtool: "source-map"'), "Webpack must emit source maps")
assert(webpack.includes("process.env.V2_RELEASE_ID"), "Webpack must define process.env.V2_RELEASE_ID")
assert(webpack.includes("process.env.V2_MONITORING_ENDPOINT"), "Webpack must define process.env.V2_MONITORING_ENDPOINT")
assert(env.includes("REACT_APP_V2_RELEASE_ID"), "Env config must expose REACT_APP_V2_RELEASE_ID")
assert(env.includes("REACT_APP_V2_MONITORING_ENDPOINT"), "Env config must expose REACT_APP_V2_MONITORING_ENDPOINT")
assert(monitor.includes("captureV2Error"), "V2 monitoring module must export captureV2Error")
assert(monitor.includes("installV2GlobalErrorHandlers"), "V2 monitoring module must install global error handlers")
assert(monitor.includes("releaseId"), "Monitoring payload must include releaseId")
assert(monitor.includes("sourceMapHint"), "Monitoring payload must include sourceMapHint")
assert(monitor.includes("sendBeacon") || monitor.includes("fetch("), "Monitoring must send payloads to a configured endpoint")
assert(boundary.includes("captureV2Error"), "ErrorBoundary must report render errors")
assert(app.includes("installV2GlobalErrorHandlers"), "V2App must install global monitoring handlers")
assert(doc.includes("Sentry/equivalent"), "Monitoring doc must name Sentry/equivalent behavior")
assert(doc.includes("source maps"), "Monitoring doc must document source map handling")
assert(doc.includes("Path A/B"), "Monitoring doc must gate Path A/B on provider source map association")

if (failures.length > 0) {
  console.error("V2 monitoring check failed:")
  for (const failure of failures) console.error("- " + failure)
  process.exit(1)
}

console.log("V2 monitoring check passed")
