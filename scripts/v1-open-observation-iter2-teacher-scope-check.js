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

function main() {
  const firebase = read('src/components/Firebase/Firebase.tsx')
  const page = read('src/views/protected/OpenObservationViews/OpenObservationPage.tsx')
  const types = read('src/constants/Types.tsx')
  const teacherModal = read('src/views/protected/HomeViews/TeacherModal.tsx')

  assertIncludes('Firebase.tsx', firebase, 'getOpenObservationTeacherList')
  assertIncludes('Firebase.tsx', firebase, ".collection('partners')")
  assertIncludes('Firebase.tsx', firebase, 'userDoc.teachers')
  assertIncludes('Firebase.tsx', firebase, 'partnerIds.length > 0')
  assertIncludes('Firebase.tsx', firebase, 'normalizeTeacherId')
  assertIncludes('Firebase.tsx', firebase, "replace(/^\\/?users?\\//, '')")
  assertIncludes('OpenObservationPage.tsx', page, 'getOpenObservationTeacherList')
  assertNotIncludes('OpenObservationPage.tsx', page, '.getTeacherList()')
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
