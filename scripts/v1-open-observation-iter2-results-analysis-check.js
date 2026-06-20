#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function assertIncludes(label, text, expected) {
  if (!text.includes(expected)) {
    console.error(label + ' is missing expected analysis text: ' + expected)
    process.exit(1)
  }
}

function assertNotIncludes(label, text, forbidden) {
  if (text.includes(forbidden)) {
    console.error(label + ' contains forbidden analysis text: ' + forbidden)
    process.exit(1)
  }
}

function main() {
  const analysisPath = 'src/components/OpenObservationComponents/openObservationAnalysis.ts'
  const resultsPath = 'src/views/protected/OpenObservationViews/OpenObservationResultsPage.tsx'
  const analysis = read(analysisPath)
  const resultsPage = read(resultsPath)

  ;['TT', 'CC', 'MI', 'SE', 'IN', 'LC', 'SA', 'LI', 'AC'].forEach(code => {
    assertIncludes(analysisPath, analysis, "code: '" + code + "'")
    assertIncludes(analysisPath, analysis, 'Constants.ToolNames.' + code)
  })

  assertIncludes(analysisPath, analysis, 'analyzeOpenObservationNotes')
  assertIncludes(analysisPath, analysis, 'practiceAlignments')
  assertIncludes(analysisPath, analysis, 'otherThemes')
  assertIncludes(analysisPath, analysis, 'alignedNoteCount')
  assertIncludes(analysisPath, analysis, 'unalignedNoteCount')
  assertIncludes(analysisPath, analysis, 'notesWithOtherThemesCount')
  assertIncludes(analysisPath, analysis, 'executiveSummary')
  assertIncludes(analysisPath, analysis, 'confidenceFromScore')
  assertIncludes(analysisPath, analysis, 'score: number')
  assertIncludes(analysisPath, analysis, 'OpenObservationConfidence')
  assertIncludes(analysisPath, analysis, 'weight: number')
  assertIncludes(analysisPath, analysis, 'Context / general classroom notes')
  assertIncludes(analysisPath, analysis, 'groupOtherEvidence(allEvidence, alignedNoteIds)')
  assertNotIncludes(analysisPath, analysis, 'firebase.')
  assertNotIncludes(analysisPath, analysis, 'fetch(')

  assertIncludes(resultsPath, resultsPage, 'analyzeOpenObservationNotes(observation.notes || [])')
  assertIncludes(resultsPath, resultsPage, 'Magic 9 Alignment')
  assertIncludes(resultsPath, resultsPage, 'Other Themes')
  assertIncludes(resultsPath, resultsPage, 'open-observation-analysis-disclaimer')
  assertIncludes(resultsPath, resultsPage, 'matching keywords')
  assertIncludes(resultsPath, resultsPage, 'not an AI analysis or a formal score')
  assertIncludes(resultsPath, resultsPage, '(observation.notes || []).length')
  assertIncludes(resultsPath, resultsPage, 'this.renderNotes(observation.notes || [])')
  assertIncludes(resultsPath, resultsPage, 'analysis.executiveSummary')
  assertIncludes(resultsPath, resultsPage, 'Signals:')
  assertIncludes(resultsPath, resultsPage, 'open-observation-analysis-confidence')
  assertIncludes(resultsPath, resultsPage, 'open-observation-magic9-alignment')
  assertIncludes(resultsPath, resultsPage, 'open-observation-magic9-practice')
  assertIncludes(resultsPath, resultsPage, 'open-observation-other-themes')
  assertIncludes(resultsPath, resultsPage, 'renderAnalysis')
  assertIncludes(resultsPath, resultsPage, 'renderPracticeAlignment')

  console.log('Open Observation iter2 results analysis checks passed')
}

main()
