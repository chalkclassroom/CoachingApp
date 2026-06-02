#!/usr/bin/env node
const admin = require('firebase-admin')
const { fixtures } = require('./v2-rules-fixtures')

function requireEmulator() {
  if (!process.env.FIRESTORE_EMULATOR_HOST) {
    console.error('Refusing to seed rules fixtures without FIRESTORE_EMULATOR_HOST. This script is emulator-only.')
    process.exit(1)
  }
}

function getProjectId() {
  return process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || 'chalk-v2-rules-test'
}

function getDb() {
  if (admin.apps.length === 0) {
    admin.initializeApp({ projectId: getProjectId() })
  }
  return admin.firestore()
}

async function setDoc(db, path, data) {
  await db.doc(path).set(data, { merge: false })
}

async function seedFixtures() {
  requireEmulator()
  const db = getDb()
  const writes = []
  for (const user of Object.values(fixtures.users)) {
    writes.push(setDoc(db, 'users/' + user.id, user))
  }
  for (const plan of Object.values(fixtures.actionPlans)) {
    writes.push(setDoc(db, 'actionPlans/' + plan.id, plan))
  }
  for (const observation of Object.values(fixtures.observations)) {
    writes.push(setDoc(db, 'observations/' + observation.id, observation))
  }
  for (const conferencePlan of Object.values(fixtures.conferencePlans)) {
    writes.push(setDoc(db, 'conferencePlans/' + conferencePlan.id, conferencePlan))
  }

  writes.push(setDoc(db, 'users/v2-coach/partners/v2-teacher', { createdAt: new Date('2026-06-01T00:00:00.000Z') }))
  writes.push(setDoc(db, 'users/v2-unrelated-coach/partners/v2-cross-teacher', { createdAt: new Date('2026-06-01T00:00:00.000Z') }))
  writes.push(setDoc(db, 'programs/program-alpha', { name: 'Program Alpha' }))
  writes.push(setDoc(db, 'programs/program-beta', { name: 'Program Beta' }))
  writes.push(setDoc(db, 'sites/site-north', { name: 'Site North', programId: 'program-alpha' }))
  writes.push(setDoc(db, 'sites/site-south', { name: 'Site South', programId: 'program-beta' }))

  await Promise.all(writes)
  return getProjectId()
}

if (require.main === module) {
  seedFixtures()
    .then(projectId => console.log('Seeded V2 rules fixtures into Firestore emulator for project ' + projectId))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

module.exports = { seedFixtures, getProjectId }
