#!/usr/bin/env node
const http = require('http')
const admin = require('firebase-admin')

function requireEmulator() {
  if (!process.env.FIRESTORE_EMULATOR_HOST) {
    console.error('Refusing to run Open Observation rules checks without FIRESTORE_EMULATOR_HOST. Use firebase emulators:exec.')
    process.exit(1)
  }
}

function getProjectId() {
  return process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || 'chalk-open-observation-rules-test'
}

function getDb() {
  if (admin.apps.length === 0) {
    admin.initializeApp({ projectId: getProjectId() })
  }
  return admin.firestore()
}

function base64url(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function fakeFirebaseToken(uid) {
  const now = Math.floor(Date.now() / 1000)
  const projectId = getProjectId()
  return [
    base64url({ alg: 'none', typ: 'JWT' }),
    base64url({
      aud: projectId,
      iss: 'https://securetoken.google.com/' + projectId,
      sub: uid,
      user_id: uid,
      iat: now,
      exp: now + 3600,
      firebase: { sign_in_provider: 'custom' }
    }),
    ''
  ].join('.')
}

function request(method, url, body, token) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const payload = body ? JSON.stringify(body) : ''
    const req = http.request({
      method,
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        ...(token ? { Authorization: 'Bearer ' + token } : {})
      }
    }, res => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => resolve({ status: res.statusCode, body: data }))
    })
    req.on('error', reject)
    if (payload) req.write(payload)
    req.end()
  })
}

function timestamp(value) {
  return { timestampValue: new Date(value).toISOString() }
}

function noteFields(text = 'Children moved from centers to circle time.') {
  return {
    id: { stringValue: 'note-1' },
    wallClockAt: timestamp('2026-06-01T14:05:00.000Z'),
    text: { stringValue: text },
    editedAt: timestamp('2026-06-01T14:06:00.000Z')
  }
}

function openObservationBody(overrides = {}) {
  const fields = {
    coachId: { stringValue: overrides.coachId || 'open-coach' },
    teacherId: { stringValue: overrides.teacherId || 'open-teacher' },
    observedBy: { stringValue: '/user/' + (overrides.coachId || 'open-coach') },
    teacher: { stringValue: '/user/' + (overrides.teacherId || 'open-teacher') },
    openObservation: { booleanValue: true },
    observationMode: { stringValue: 'open' },
    type: { stringValue: overrides.type || 'OpenObservation' },
    checklist: { nullValue: null },
    completed: { booleanValue: overrides.completed === undefined ? true : overrides.completed },
    timezone: { stringValue: 'UTC' },
    activitySetting: { nullValue: null },
    lastClickTime: timestamp('2026-06-01T14:20:00.000Z'),
    entries: { arrayValue: {} },
    start: timestamp('2026-06-01T14:00:00.000Z'),
    end: overrides.end === undefined ? { nullValue: null } : overrides.end,
    notes: {
      arrayValue: {
        values: [{
          mapValue: {
            fields: noteFields(overrides.noteText)
          }
        }]
      }
    },
    snapshot: {
      mapValue: {
        fields: {
          coachSummary: { stringValue: overrides.coachSummary || 'Transition routines and student engagement were observed.' }
        }
      }
    },
    status: { stringValue: overrides.status || 'completed' },
    createdAt: timestamp('2026-06-01T14:00:00.000Z'),
    updatedAt: timestamp('2026-06-01T14:20:00.000Z')
  }

  if (overrides.extraTypeField) {
    fields.type = { stringValue: 'TransitionTime' }
  }

  if (overrides.missingNotes) {
    delete fields.notes
  }

  return { fields }
}

async function seedFixtures() {
  const db = getDb()
  await Promise.all([
    db.doc('users/open-coach').set({ id: 'open-coach', role: 'coach', firstName: 'Open', lastName: 'Coach' }),
    db.doc('users/open-teacher').set({ id: 'open-teacher', role: 'teacher', firstName: 'Open', lastName: 'Teacher' }),
    db.doc('users/open-unrelated-coach').set({ id: 'open-unrelated-coach', role: 'coach', firstName: 'Other', lastName: 'Coach' }),
    db.doc('users/open-admin').set({ id: 'open-admin', role: 'admin', firstName: 'Admin', lastName: 'User' }),
    db.doc('users/open-program-leader').set({ id: 'open-program-leader', role: 'programLeader', firstName: 'Program', lastName: 'Leader' })
  ])
}

function assertStatus(label, response, expected) {
  if (response.status !== expected) {
    console.error(label + ' expected HTTP ' + expected + ' but got ' + response.status)
    console.error(response.body)
    process.exit(1)
  }
}

async function main() {
  requireEmulator()
  await seedFixtures()

  const projectId = getProjectId()
  const base = 'http://' + process.env.FIRESTORE_EMULATOR_HOST + '/v1/projects/' + projectId + '/databases/(default)/documents'
  const docUrl = base + '/observations/open-observation-rules-smoke'

  const ownerCreate = await request('PATCH', docUrl, openObservationBody(), fakeFirebaseToken('open-coach'))
  assertStatus('owner-coach create observations open doc', ownerCreate, 200)

  const ownerRead = await request('GET', docUrl, null, fakeFirebaseToken('open-coach'))
  assertStatus('owner-coach read observations open doc', ownerRead, 200)

  const teacherRead = await request('GET', docUrl, null, fakeFirebaseToken('open-teacher'))
  assertStatus('teacher-of-session read observations open doc', teacherRead, 200)

  const unrelatedCoachRead = await request('GET', docUrl, null, fakeFirebaseToken('open-unrelated-coach'))
  assertStatus('unrelated coach read observations open doc', unrelatedCoachRead, 403)

  const adminRead = await request('GET', docUrl, null, fakeFirebaseToken('open-admin'))
  assertStatus('admin read-all observations open doc', adminRead, 200)

  const programLeaderRead = await request('GET', docUrl, null, fakeFirebaseToken('open-program-leader'))
  assertStatus('program leader read-all observations open doc', programLeaderRead, 403)

  const anonymousRead = await request('GET', docUrl)
  assertStatus('anonymous read observations open doc', anonymousRead, 403)

  const ownerUpdate = await request('PATCH', docUrl, openObservationBody({ status: 'archived' }), fakeFirebaseToken('open-coach'))
  assertStatus('owner-coach archive observations open doc', ownerUpdate, 200)

  const hardDelete = await request('DELETE', docUrl, null, fakeFirebaseToken('open-coach'))
  assertStatus('owner-coach hard-delete observations open doc', hardDelete, 403)

  const malformedDoc = await request('PATCH', base + '/observations/open-observation-malformed', openObservationBody({ extraTypeField: true }), fakeFirebaseToken('open-coach'))
  assertStatus('type field rejected from observations open doc', malformedDoc, 403)

  console.log('Open Observation iter2 rules checks passed')
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
