#!/usr/bin/env node
const admin = require('firebase-admin')
const { fixtures } = require('./v2-rules-fixtures')

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  console.error('Refusing to seed rules fixtures without FIRESTORE_EMULATOR_HOST. This script is emulator-only.')
  process.exit(1)
}

const projectId = process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || 'chalk-v2-rules-test'

if (admin.apps.length === 0) {
  admin.initializeApp({ projectId })
}

const db = admin.firestore()

async function setDoc(path, data) {
  await db.doc(path).set(data, { merge: false })
}

async function seed() {
  const writes = []
  for (const user of Object.values(fixtures.users)) {
    writes.push(setDoc('users/' + user.id, user))
  }
  for (const plan of Object.values(fixtures.actionPlans)) {
    writes.push(setDoc('actionPlans/' + plan.id, plan))
  }
  for (const observation of Object.values(fixtures.observations)) {
    writes.push(setDoc('observations/' + observation.id, observation))
  }

  writes.push(setDoc('users/v2-coach/partners/v2-teacher', { createdAt: new Date('2026-06-01T00:00:00.000Z') }))
  writes.push(setDoc('users/v2-unrelated-coach/partners/v2-cross-teacher', { createdAt: new Date('2026-06-01T00:00:00.000Z') }))
  writes.push(setDoc('programs/program-alpha', { name: 'Program Alpha' }))
  writes.push(setDoc('programs/program-beta', { name: 'Program Beta' }))
  writes.push(setDoc('sites/site-north', { name: 'Site North', programId: 'program-alpha' }))
  writes.push(setDoc('sites/site-south', { name: 'Site South', programId: 'program-beta' }))

  await Promise.all(writes)
  console.log('Seeded V2 rules fixtures into Firestore emulator for project ' + projectId)
}

seed().catch(error => {
  console.error(error)
  process.exit(1)
})
