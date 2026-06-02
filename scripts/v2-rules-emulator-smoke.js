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

function malformedDraftBody() {
  return {
    fields: {
      observationDraft: {
        mapValue: {
          fields: {
            teacherUid: { stringValue: "v2-teacher" },
            notes: { stringValue: "Missing required type fields" }
          }
        }
      }
    }
  }
}

function trainingStatusBody() {
  return {
    fields: {
      v2TrainingStatus: {
        mapValue: {
          fields: {
            transitions: {
              mapValue: {
                fields: {
                  completedAt: { timestampValue: new Date("2026-06-01T00:03:00.000Z").toISOString() }
                }
              }
            }
          }
        }
      }
    }
  }
}

function arbitraryUserFieldBody() {
  return {
    fields: {
      role: { stringValue: "admin" }
    }
  }
}

function commentBody(options = {}) {
  const authorId = options.authorId || "v2-coach"
  const text = options.text || "Rules smoke comment"
  return {
    fields: {
      authorName: { stringValue: "V2 Coach" },
      authorId: { stringValue: authorId },
      text: { stringValue: text },
      createdAt: { timestampValue: new Date("2026-06-01T00:05:00.000Z").toISOString() }
    }
  }
}

function malformedCommentBody() {
  return {
    fields: {
      authorName: { stringValue: "V2 Coach" },
      authorId: { stringValue: "v2-coach" },
      createdAt: { timestampValue: new Date("2026-06-01T00:05:00.000Z").toISOString() }
    }
  }
}

function sentBody(sentBy = "v2-coach") {
  const timestamp = new Date("2026-06-01T00:10:00.000Z").toISOString()
  return {
    fields: {
      sentToTeacher: { booleanValue: true },
      sentToTeacherAt: { timestampValue: timestamp },
      sentToTeacherBy: { stringValue: sentBy },
      dateModified: { timestampValue: timestamp }
    }
  }
}

function previewWriteBody() {
  return {
    fields: {
      name: { stringValue: "V2 preview unsupported write" },
      createdAt: { timestampValue: new Date("2026-06-01T00:20:00.000Z").toISOString() }
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

  const malformedDraft = await request("PATCH", url, malformedDraftBody(), fakeFirebaseToken("v2-coach"))
  assertStatus("malformed observationDraft write", malformedDraft, 403)

  const trainingStatusUrl = base + "/users/v2-coach?updateMask.fieldPaths=v2TrainingStatus"
  const trainingStatus = await request("PATCH", trainingStatusUrl, trainingStatusBody(), fakeFirebaseToken("v2-coach"))
  assertStatus("coach own training status write", trainingStatus, 200)

  const arbitraryUserFieldUrl = base + "/users/v2-coach?updateMask.fieldPaths=role"
  const arbitraryUserField = await request("PATCH", arbitraryUserFieldUrl, arbitraryUserFieldBody(), fakeFirebaseToken("v2-coach"))
  assertStatus("coach arbitrary user field write", arbitraryUserField, 403)

  const unrelatedCoach = await request('PATCH', url, draftBody(), fakeFirebaseToken('v2-unrelated-coach'))
  assertStatus('unrelated coach observationDraft write', unrelatedCoach, 403)

  const teacher = await request('PATCH', url, draftBody(), fakeFirebaseToken('v2-teacher'))
  assertStatus('teacher cross-user observationDraft write', teacher, 403)

  const admin = await request('PATCH', url, draftBody(), fakeFirebaseToken('v2-admin'))
  assertStatus('admin observationDraft override write', admin, 200)

  const commentUrl = base + "/actionPlans/v2-same-program-plan/comments/v2-smoke-comment"
  const coachComment = await request("PATCH", commentUrl, commentBody(), fakeFirebaseToken("v2-coach"))
  assertStatus("assigned coach action plan comment write", coachComment, 200)

  const teacherCommentRead = await request("GET", commentUrl, null, fakeFirebaseToken("v2-teacher"))
  assertStatus("teacher action plan comment read", teacherCommentRead, 200)

  const unrelatedCommentUrl = base + "/actionPlans/v2-same-program-plan/comments/v2-unrelated-comment"
  const unrelatedComment = await request("PATCH", unrelatedCommentUrl, commentBody({ authorId: "v2-unrelated-coach" }), fakeFirebaseToken("v2-unrelated-coach"))
  assertStatus("unrelated coach action plan comment write", unrelatedComment, 403)

  const malformedCommentUrl = base + "/actionPlans/v2-same-program-plan/comments/v2-malformed-comment"
  const malformedComment = await request("PATCH", malformedCommentUrl, malformedCommentBody(), fakeFirebaseToken("v2-coach"))
  assertStatus("malformed action plan comment write", malformedComment, 403)

  const sentUrl = base + "/actionPlans/v2-same-program-plan?updateMask.fieldPaths=sentToTeacher&updateMask.fieldPaths=sentToTeacherAt&updateMask.fieldPaths=sentToTeacherBy&updateMask.fieldPaths=dateModified"
  const coachSent = await request("PATCH", sentUrl, sentBody("v2-coach"), fakeFirebaseToken("v2-coach"))
  assertStatus("assigned coach action plan sent-state write", coachSent, 200)

  const unrelatedSent = await request("PATCH", sentUrl, sentBody("v2-unrelated-coach"), fakeFirebaseToken("v2-unrelated-coach"))
  assertStatus("unrelated coach action plan sent-state write", unrelatedSent, 403)

  const messageWrite = await request("PATCH", base + "/messages/v2-preview-thread", previewWriteBody(), fakeFirebaseToken("v2-coach"))
  assertStatus("unsupported messages write", messageWrite, 403)

  const reportWrite = await request("PATCH", base + "/reports/v2-preview-report", previewWriteBody(), fakeFirebaseToken("v2-coach"))
  assertStatus("unsupported reports write", reportWrite, 403)

  const coachProgramWrite = await request("PATCH", base + "/programs/v2-preview-program", previewWriteBody(), fakeFirebaseToken("v2-coach"))
  assertStatus("coach unsupported admin program write", coachProgramWrite, 403)

  const coachSiteWrite = await request("PATCH", base + "/sites/v2-preview-site", previewWriteBody(), fakeFirebaseToken("v2-coach"))
  assertStatus("coach unsupported admin site write", coachSiteWrite, 403)

  console.log("V2 rules emulator smoke passed")
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
