#!/usr/bin/env node
const http = require('http')
const { seedFixtures, getProjectId } = require('./v2-rules-seed-fixtures')

function base64url(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function fakeFirebaseToken(uid, extraClaims = {}) {
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
      firebase: { sign_in_provider: 'custom' },
      ...extraClaims
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

function draftBody() {
  return {
    fields: {
      observationDraft: {
        mapValue: {
          fields: {
            teacherUid: { stringValue: 'v2-teacher' },
            typeCode: { stringValue: 'CC' },
            storedType: { stringValue: 'CC' },
            notes: { stringValue: 'Rules smoke draft' },
            elapsedSeconds: { integerValue: '60' },
            updatedAt: { timestampValue: new Date('2026-06-01T00:00:00.000Z').toISOString() }
          }
        }
      }
    }
  }
}

function assertStatus(label, response, expected) {
  if (response.status !== expected) {
    console.error(label + ' expected HTTP ' + expected + ' but got ' + response.status)
    console.error(response.body)
    process.exit(1)
  }
}

async function main() {
  const projectId = await seedFixtures()
  const host = process.env.FIRESTORE_EMULATOR_HOST
  const base = 'http://' + host + '/v1/projects/' + projectId + '/databases/(default)/documents'
  const url = base + '/users/v2-coach?updateMask.fieldPaths=observationDraft'

  const anonymous = await request('PATCH', url, draftBody())
  assertStatus('anonymous observationDraft write', anonymous, 403)

  const coach = await request('PATCH', url, draftBody(), fakeFirebaseToken('v2-coach'))
  assertStatus('coach own observationDraft write', coach, 200)

  const unrelatedCoach = await request('PATCH', url, draftBody(), fakeFirebaseToken('v2-unrelated-coach'))
  assertStatus('unrelated coach observationDraft write', unrelatedCoach, 403)

  const teacher = await request('PATCH', url, draftBody(), fakeFirebaseToken('v2-teacher'))
  assertStatus('teacher cross-user observationDraft write', teacher, 403)

  const admin = await request('PATCH', url, draftBody(), fakeFirebaseToken('v2-admin'))
  assertStatus('admin observationDraft override write', admin, 200)

  console.log('V2 rules emulator smoke passed')
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
