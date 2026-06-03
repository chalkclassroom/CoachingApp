# CHALK 2.0 - Goal 2 Handoff

Goal: G2 - Firestore rules posture and write safety foundation
Branch: feature/chalk-2.0-renovation
Base commit: e8d4dfdd
Final commit(s): e3f0e4a3b, 229356c51, c7f9c8aa1, 00ea64b97, 5b342f18b
Pushed to: fork only (fork/feature/chalk-2.0-renovation)
Deploy: none
Completion status: G2 foundation is green for the current V2 write surfaces. Rules are not deployed; broader legacy compatibility review is still required before any staging or production rules deploy.

---

## Red Evidence

- npm run v2:rules-check failed before the rules inventory, fixtures manifest, emulator config, seed script, smoke script, and decision-log entries existed.
- npm run v2:rules-seed:emulator without FIRESTORE_EMULATOR_HOST failed closed, proving the seed script will not write outside the emulator.
- G2.3 red: v2-unrelated-coach could write users/v2-coach.observationDraft under the old auth-only wildcard.
- G2.3 payload red: v2-coach could write a malformed observationDraft before field-shape gates existed.
- G2.4 red: v2-unrelated-coach could create actionPlans/v2-same-program-plan/comments/v2-unrelated-comment under the old actionPlans wildcard.
- G2.5 red: v2-coach could write programs/v2-preview-program under the old programs wildcard.

## Green Evidence

- npm run v2:rules-check passed.
- npm run v2:rules-seed:test passed; Firestore Emulator used isolated port 43081 and seeded synthetic fixtures.
- npm run v2:rules-smoke:test passed after G2.3, G2.4, and G2.5 gates were added.
- npm run v2:preview-check passed after the G1/G2 document updates.
- npm run v2:data-loading-check passed.
- npm run v2:console-check passed.
- npm run staging passed for G1.2 earlier with existing webpack asset-size warnings only; no rules deploy was run.

## Happy Paths Covered

- Authenticated coach fixture can write its own observationDraft with valid shape.
- Authenticated coach fixture can write its own v2TrainingStatus map.
- Admin fixture can override users/v2-coach observationDraft.
- Assigned coach can create an action plan comment with authorId matching request.auth.uid.
- Teacher participant can read the assigned action plan comment.
- Assigned coach can mark an action plan sent with sentToTeacher, sentToTeacherAt, sentToTeacherBy, and dateModified metadata.

## No-Happy Paths Covered

- Anonymous write to users/v2-coach.observationDraft is denied.
- Unrelated coach and teacher cross-user writes to users/v2-coach.observationDraft are denied.
- Malformed observationDraft is denied.
- Owner attempt to mutate arbitrary root user field role is denied.
- Unrelated coach action plan comment write is denied.
- Malformed action plan comment is denied.
- Unrelated coach sent-to-teacher write is denied.
- Unsupported messages and reports writes are denied by fallback.
- Coach program/site admin workspace writes are denied; programs and sites writes are now admin-only in the working ruleset.

## Preview/Prod Disclosure Changes

- .chalk/decision-log.md records Posture B user-root hardening, user-root payload-shape hardening, action-plan write hardening, and unsupported preview write gates.
- .chalk/CHALK-2-V2-RULES-INVENTORY.md now marks G2.3, G2.4, and G2.5 emulator smoke as green for the current V2 write foundation.
- scripts/v2-rules-inventory-check.js fails if those decision-log and inventory claims disappear or if the broad actionPlans wildcard is reintroduced.

## Remaining Risks

- The hardened firestore.rules have not been deployed to staging or production.
- Legacy compatibility still needs review before rules deploy because observations, conferencePlans, emails, appointments, archives, and actionPlans create remain broader legacy surfaces.
- v2TrainingStatus validation is currently a map gate, not deep semantic validation of every nested training key.
- actionPlans create remains signed-in for legacy compatibility and should be narrowed only after legacy create flows are covered.
- G3 still needs observation finalization and BigQuery/export contract tests before observation writes are production-ready.
- .firebaserc and functions/.env remain local pre-existing changes and were not included in G2 commits.
