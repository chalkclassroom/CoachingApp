# CHALK 2.0 - V2 Firestore Rules Inventory

> G2.1 manifest for V2 read/write paths before emulator-backed rule hardening.
>
> Last updated: 2026-06-01

---

## Current Posture

The auth-only write wildcard has been removed from the working V2 ruleset. Authenticated reads remain broad for legacy compatibility, but unknown writes now fall through to deny. Root users/{uid} writes are constrained to the owning user or admin. Known legacy top-level collections retain authenticated write access while compatibility coverage expands.

This inventory is not full production-ready evidence yet. G2.3 user-root ownership and basic payload-shape denial, G2.4 action-plan comment/sent-state denial, and G2.5 unsupported preview write denial are emulator green for the current V2 write foundation.

---

## V2 Write Inventory

| API function | Firestore path | Operation | Allowed roles | Denied roles | Fixture IDs | Release status | Test file |
|---|---|---|---|---|---|---|---|
| saveActionPlanField | actionPlans/{planId} | update fields + dateModified | assigned coach or admin after G2 rules hardening | anonymous, unrelatedCoach, cross-program coach, malformed patch | coach, admin, unrelatedCoach, sameProgramActionPlan, crossProgramActionPlan | Blocked until emulator denial tests and legacy compatibility rules exist | scripts/v2-rules-emulator.test.js (planned) |
| saveActionPlanDraft | actionPlans/{planId}; actionPlans/{planId}/actionSteps/{stepId} | update plan fields and steps | assigned coach or admin after G2 rules hardening | anonymous, unrelatedCoach, cross-program coach, malformed steps | coach, admin, unrelatedCoach, sameProgramActionPlan, crossProgramActionPlan | Blocked until emulator denial tests and legacy compatibility rules exist | scripts/v2-rules-emulator.test.js (planned) |
| addActionPlanComment | actionPlans/{planId}/comments/{commentId} | create comment | assigned coach or admin; teacher participant read visibility | anonymous, unrelatedCoach, cross-program user, malformed comment | coach, teacher, admin, unrelatedCoach, sameProgramActionPlan, crossProgramActionPlan | G2.4 emulator green for coach create, teacher read, unrelated denial, malformed denial | scripts/v2-rules-emulator-smoke.js |
| markActionPlanSentToTeacher | actionPlans/{planId} | update sentToTeacher fields | assigned coach or admin | anonymous, unrelatedCoach, teacher marking sent, malformed audit metadata | coach, teacher, admin, unrelatedCoach, sameProgramActionPlan, crossProgramActionPlan | G2.4 emulator green for assigned coach sent-state and unrelated denial | scripts/v2-rules-emulator-smoke.js |
| saveConferencePlanDraft | conferencePlans/{planId} | update feedback, questions, addedQuestions, notes, and dateModified | assigned coach or admin | anonymous, unrelatedCoach, malformed list payloads | coach, admin, unrelatedCoach | Emulator green for assigned coach update, unrelated denial, malformed payload denial | scripts/v2-rules-emulator-smoke.js |
| startObservation | observations/{observationId}; observations/{observationId}/entries/{entryId}; observations/{observationId}/notes/{noteId} through legacy Firebase.handleSession | create observation session and child notes/entries | coach or admin after G3 observation contract rules | anonymous, teacher, unrelatedCoach, invalid type code | coach, teacher, admin, unrelatedCoach | Delegated to legacy session writer until G3.1/G3.3 | scripts/v2-rules-emulator.test.js (planned) |
| saveObservationDraft | users/{coachUid} | set observationDraft | owning coach or admin | anonymous, unrelatedCoach, teacher, malformed draft, arbitrary user field mutation | coach, teacher, admin, unrelatedCoach | G2.3 emulator green for root user ownership and basic draft shape denial | scripts/v2-rules-emulator-smoke.js |
| completeObservation | observations/{observationId}; observations/{observationId}/notes/{noteId}; users/{coachUid} | push notes, end session, clear observationDraft | owning coach or admin after G3 observation contract rules | anonymous, unrelatedCoach, malformed completion payload | coach, admin, unrelatedCoach | Partially blocked: draft clear needs G2.3; observation finalization needs G3 | scripts/v2-rules-emulator.test.js (planned) |
| markTrainingCompleted | users/{uid} | set v2TrainingStatus.{trainingId}.completedAt | owning user or admin | anonymous, unrelatedCoach, arbitrary user field mutation | coach, teacher, admin, unrelatedCoach | G2.3 emulator green for owner v2TrainingStatus map write; deeper nested key validation later | scripts/v2-rules-emulator-smoke.js |
| dismissTrainingRecommendation | users/{uid} | set v2TrainingStatus.{trainingId}.dismissedAt | owning user or admin | anonymous, unrelatedCoach, arbitrary user field mutation | coach, teacher, admin, unrelatedCoach | Covered by same G2.3 v2TrainingStatus owner map gate; deeper nested key validation later | scripts/v2-rules-emulator-smoke.js |
| saveAccountPreferences | users/{uid} | set v2Preferences | owning user or admin | anonymous, unrelatedCoach, malformed preferences, arbitrary user field mutation | coach, admin, unrelatedCoach | Emulator green for owner write, unrelated denial, malformed payload denial | scripts/v2-rules-emulator-smoke.js |
| saveMessagingDraft | emails/{emailId} | create or update draft email payload | draft owner | anonymous, unrelatedCoach, cross-user writer, malformed owner payload | coach, unrelatedCoach | Emulator green for own draft write/read and cross-user denial | scripts/v2-rules-emulator-smoke.js |
| setUserArchived | users/{userId} | update archived flag | admin | anonymous, coach, teacher, unrelatedCoach | admin, coach, teacher | Emulator green for admin archive write and coach denial | scripts/v2-rules-emulator-smoke.js |
| saveAdminProgram | programs/{programId} | create or update program directory fields | admin | anonymous, coach, teacher, unrelatedCoach | admin, coach | Emulator green for admin program write and coach denial | scripts/v2-rules-emulator-smoke.js |
| saveAdminSite | sites/{siteId} | create or update site directory fields | admin | anonymous, coach, teacher, unrelatedCoach | admin, coach | Emulator green for admin site write and coach denial | scripts/v2-rules-emulator-smoke.js |

---

## Unsupported Preview Writes

Reports, CSV import, export scheduling, and the unsupported `messages` collection remain preview-only or delegated until an explicit backend path and rule row are added here. V2 messaging drafts use the documented `emails` path. Account settings use the documented `users/{uid}.v2Preferences` path. Program/site writes are admin-only in the working ruleset.

---

## Next Harness Work

1. Add emulator-backed rules tests under `scripts/v2-rules-emulator.test.js` or an equivalent harness.
2. Seed fixtures from `docs/plans/03-progress/v2-rules-fixtures.md`.
3. Expand later G3/G4 coverage for full action-plan draft, observation finalization, and training payload-shape rules.
4. Run broader legacy compatibility checks before deploying the hardened ruleset beyond staging.
5. Update this inventory whenever createV2Api() adds or removes a write function.

---

## Implemented Harness Evidence

- `npm run v2:rules-check` verifies the decision-log entry, inventory rows, fixture manifest, seed script, isolated emulator config, and smoke script.
- `npm run v2:rules-seed:test` starts Firestore Emulator on port 43081 and seeds synthetic fixtures.
- `npm run v2:rules-smoke:test` starts Firestore Emulator on port 43081, seeds fixtures, confirms anonymous V2 user-field writes are denied, confirms authenticated coach own-draft writes are allowed, confirms unrelated coach and teacher cross-user writes are denied, and confirms admin override is allowed.

This now satisfies the G2.3 user-root ownership and basic payload-shape smoke for observationDraft/v2TrainingStatus/v2Preferences, the G2.4 action-plan comment/sent-state smoke, the conference-plan draft smoke, the messaging draft ownership smoke, the admin program/site write smoke, and the G2.5 unsupported preview write smoke. Later goals still need full payload-shape coverage for every draft/training/observation path and legacy compatibility review before production rules deploy.
