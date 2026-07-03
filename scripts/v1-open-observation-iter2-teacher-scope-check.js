#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function assertIncludes(label, text, expected) {
  if (!text.includes(expected)) {
    console.error(label + ' is missing expected text: ' + expected)
    process.exit(1)
  }
}

function assertNotIncludes(label, text, forbidden) {
  if (text.includes(forbidden)) {
    console.error(label + ' still contains forbidden broad-scope text: ' + forbidden)
    process.exit(1)
  }
}

function extractBlock(label, text, marker) {
  const start = text.indexOf(marker)
  if (start === -1) {
    console.error(label + ' is missing expected marker: ' + marker)
    process.exit(1)
  }

  const openBrace = text.indexOf('{', start)
  if (openBrace === -1) {
    console.error(label + ' has no block for marker: ' + marker)
    process.exit(1)
  }

  let depth = 0
  for (let index = openBrace; index < text.length; index += 1) {
    const char = text[index]
    if (char === '{') depth += 1
    if (char === '}') {
      depth -= 1
      if (depth === 0) return text.slice(start, index + 1)
    }
  }

  console.error(label + ' block is not parseable for marker: ' + marker)
  process.exit(1)
}

function main() {
  const firebase = read('src/components/Firebase/Firebase.tsx')
  const page = read('src/views/protected/OpenObservationViews/OpenObservationPage.tsx')
  const types = read('src/constants/Types.tsx')
  const teacherModal = read('src/views/protected/HomeViews/TeacherModal.tsx')
  const openObservationTeacherList = extractBlock('Firebase.tsx', firebase, 'getOpenObservationTeacherList')

  assertIncludes('Firebase.tsx', firebase, 'getOpenObservationTeacherList')
  assertIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, "userRole === 'admin'")
  assertIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, ".where('role', '==', 'teacher')")
  assertIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, "teacher.id !== 'rJxNhJmzjRZP7xg29Ko6'")
  assertIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, "userRole === 'siteLeader' || userRole === 'programLeader'")
  assertIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, 'getOpenObservationLeaderTeacherIds')
  assertIncludes('Firebase.tsx', firebase, 'getResolvedOpenObservationTeachers')
  assertIncludes('Firebase.tsx', firebase, 'getOpenObservationLeaderTeacherIds')
  assertIncludes('Firebase.tsx', firebase, "where('school', 'in', siteNameChunk)")
  assertIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, ".collection('partners')")
  assertIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, 'userDoc.teachers')
  assertIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, 'partnerIds.length > 0')
  assertIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, 'const teacherIds = scopedTeacherIds')
  assertIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, 'normalizeTeacherId')
  assertNotIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, 'practiceTeacherId')
  assertNotIncludes('Firebase.tsx#getOpenObservationTeacherList', openObservationTeacherList, 'scopedTeacherIds.length > 0 ? scopedTeacherIds : [practiceTeacherId]')
  assertIncludes('Firebase.tsx', firebase, "replace(/^\\/?users?\\//, '')")
  assertIncludes('OpenObservationPage.tsx', page, 'getOpenObservationTeacherList')
  assertNotIncludes('OpenObservationPage.tsx', page, '.getTeacherList()')
  assertIncludes('OpenObservationPage.tsx', page, 'No teachers are assigned to you yet')
  assertIncludes('OpenObservationPage.tsx', page, 'open-obs-teacher-school')
  assertIncludes('OpenObservationPage.tsx', page, 'open-obs-teacher-classroom')
  assertIncludes('OpenObservationPage.tsx', page, "teacher.school || '-'")
  assertIncludes('OpenObservationPage.tsx', page, "teacher.classroom || '-'")
  assertIncludes('Types.tsx', types, 'classroom?: string')
  assertIncludes('TeacherModal.tsx', teacherModal, 'loading: boolean')
  assertIncludes('TeacherModal.tsx', teacherModal, 'Fetching your teachers...')

  console.log('Open Observation iter2 teacher scope checks passed')
}

main()
