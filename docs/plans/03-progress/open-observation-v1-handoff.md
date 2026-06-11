# Open Observation V1 — Execution Handoff

> Scope: add V1 legacy Open Observation mode on `feature/chalk-2.0-renovation`.
> No production deploy. No origin push. Staging deploy is requested by the user and handled hosting-only after this handoff.
>
> Last updated: 2026-06-11

---

## Summary

Open Observation V1 is implemented behind the existing authenticated legacy app. A coach/admin/program leader/site leader can open `/OpenObservation`, pick a teacher, select a provisional Magic 9 focus, take free-form notes with a MM:SS timer and localStorage draft, end with required final Magic 9 alignment, and save through the legacy Firebase session path.

LI behavior follows the plan decision: Open Observation LI relies on `handleSession()` normalizing the missing checklist to `null`. `endSession()` may set `activitySetting: 'Not Recorded'` for LI, but Open Observation does not write checklist `'Not Recorded'` and does not promise LI-specific BigQuery result rows.

## Base and Final SHAs

Base SHA before Open Observation execution: `4bd0d8395` (`fix(v2): stabilize staging navigation and resources`).

Final implementation SHA before handoff-doc commit: `7a0dbef94`.

Commits added for this requirement:

| Task | Commit | Message |
|---|---|---|
| OB-1 | `6279a0283` | `test(v1): add open observation type contract` |
| OB-2 | `d374c1b64` | `feat(v1): persist open observation drafts locally` |
| OB-3 | `08a3e41fb` | `feat(v1): require final open observation alignment` |
| OB-4 | `331d6baef` | `feat(v1): expose open observation route` |
| OB-5 | `7a0dbef94` | `feat(v1): save open observations through legacy session` |

Push target: `fork feature/chalk-2.0-renovation`.  
Origin push: not used.

## Red / Green Evidence

### OB-1 — Type picker and teacher picker contract

Red:

```bash
node scripts/v1-open-observation-type-contract-check.js
```

Failed because the V1 adapter, Open Observation page, read-only V2 type mapping import, Constants labels, and 9-type option rendering did not exist yet.

Green:

```bash
node scripts/v1-open-observation-type-contract-check.js
npm run staging
```

Passed after adding `src/components/OpenObservationComponents/openObservationTypes.ts` and the initial `OpenObservationPage` shell.

Happy covered: all 9 Magic 9 type labels render from `Constants.tsx` via the V1 adapter.  
No-happy covered: duplicated stored type literals and `buildObservationStartPayload()` usage fail the contract.

### OB-2 — Free-form notes, timer, localStorage draft

Red:

```bash
node scripts/v1-open-observation-route-check.js
```

Failed because Open Observation had no named draft key, localStorage restore, corrupt-draft tolerance, or clear path.

Green:

```bash
node scripts/v1-open-observation-route-check.js
node scripts/v1-open-observation-type-contract-check.js
npm run staging
```

Passed after adding `OPEN_OBSERVATION_DRAFT_KEY`, localStorage persistence/restore, MM:SS timer, note editor, discard behavior, and a Cypress acceptance spec file.

Happy covered: draft state can persist selected teacher, provisional type, notes, elapsed seconds, and observation state.  
No-happy covered: corrupt localStorage draft is caught and cleared; Firestore draft paths are statically forbidden.

### OB-3 — Required Magic 9 alignment and canonical final type

Red:

```bash
node scripts/v1-open-observation-type-contract-check.js
```

Failed because the page did not track `selectedFinalTypeCode`, expose end/final-type/save controls, or prove that the saved stored type came from the final alignment.

Green:

```bash
node scripts/v1-open-observation-type-contract-check.js
node scripts/v1-open-observation-route-check.js
npm run staging
```

Passed after adding the final alignment dialog, `open-observation-end`, `open-observation-final-type`, `open-observation-save`, and Cypress-visible `window.openObservationLastSavedType` evidence.

Happy covered: user can end an observation and confirm a final Magic 9 alignment.  
No-happy covered: save is disabled until a final alignment and notes exist.

### OB-4 — Legacy route and Home entry point

Red:

```bash
node scripts/v1-open-observation-route-check.js
```

Failed because `App.tsx` did not import/render `OpenObservationPage`, `/OpenObservation` did not exist, and Home had no Open Observation entry.

Green:

```bash
node scripts/v1-open-observation-route-check.js
node scripts/v1-open-observation-type-contract-check.js
npm run staging
```

Passed after adding the authenticated `/OpenObservation` route and Home cards for coach/admin/program leader/site leader.

Happy covered: authorized legacy roles can navigate to Open Observation from Home.  
No-happy covered: the route stays behind `PrivateRoute`; no V2 route is used.

### OB-5 — Legacy save path and BQ compatibility

Red:

```bash
node scripts/v1-open-observation-bq-compat-check.js
```

Failed because Open Observation did not call `handleSession`, `handlePushNotes`, or `endSession`, and did not document LI checklist-null behavior.

Green:

```bash
node scripts/v1-open-observation-bq-compat-check.js
node scripts/v1-open-observation-type-contract-check.js
node scripts/v1-open-observation-route-check.js
npm run staging
```

Passed after replacing the temporary save with the legacy session flow:

```ts
await firebase.handleSession({
  observedBy: currentUser.uid,
  teacher: this.state.selectedTeacherId,
  type: storedType,
  checklist: undefined // handleSession writes missing checklist as null.
})
firebase.handlePushNotes(this.state.notes.trim())
firebase.endSession()
```

Happy covered: save uses the existing `observations` write path inside `Firebase.endSession()`.  
No-happy covered: direct `db.collection('observations')` writes from the page are forbidden; LI checklist-null does not promise LI-specific BQ result rows.

## Verification Commands Run

```bash
node scripts/v1-open-observation-type-contract-check.js
node scripts/v1-open-observation-route-check.js
node scripts/v1-open-observation-bq-compat-check.js
npm run staging
```

All commands passed. `npm run staging` still emits the pre-existing Webpack asset-size warnings for large legacy PDFs/images and the main bundle.

Cypress status: `cypress/integration/v1/open-observation-flow.ts` was added as the acceptance harness, but not executed in this handoff because `cypress.json` points to `http://localhost:8080` and the app requires an authenticated Firebase session. The automated static/contract checks above are the evidence used for this pass; authenticated Cypress execution should be run once a seeded/staging login flow is available.

## LI Behavior Verified

Chosen behavior: option (i), `checklist: null`.

Evidence:

- `Firebase.handleSession()` contains `checklist: mEntry.checklist ? mEntry.checklist : null`.
- Open Observation passes `checklist: undefined`, so the written observation document receives `checklist: null` through the legacy path.
- `Firebase.endSession()` keeps `'Not Recorded'` scoped to LI `activitySetting`, not checklist.
- `functions/observationToBQ/index.js` has LI-specific result branches only for known checklist variants such as `FoundationalTeacher`; no `checklist === null` LI result row is promised.
- `scripts/v1-open-observation-bq-compat-check.js` asserts that distinction.

## Final-Type Contract Verified

The initial type picker is provisional. The final Magic 9 alignment is canonical.

Evidence:

- `OpenObservationPage` tracks `selectedTypeCode` and `selectedFinalTypeCode` separately.
- The save path calls `getOpenObservationStoredType(this.state.selectedFinalTypeCode)`.
- `scripts/v1-open-observation-type-contract-check.js` fails if that final-type conversion disappears.
- The Cypress spec includes a scenario that starts with one type and saves a different final alignment.

## Files Touched by This Requirement

Production code:

- `src/components/OpenObservationComponents/openObservationTypes.ts`
- `src/views/protected/OpenObservationViews/OpenObservationPage.tsx`
- `src/App.tsx`
- `src/views/protected/HomeViews/HomePage.tsx`

Checks/specs:

- `scripts/v1-open-observation-type-contract-check.js`
- `scripts/v1-open-observation-route-check.js`
- `scripts/v1-open-observation-bq-compat-check.js`
- `cypress/integration/v1/open-observation-flow.ts`

Docs:

- `docs/plans/02-backlogs/open-observation-v1-plan.md`
- `docs/plans/03-progress/open-observation-v1-handoff.md`
- `docs/plans/README.md`

Files intentionally not touched:

- `.firebaserc`
- `functions/.env`
- `src/v2/**`
- `firestore.rules`

## Remaining Risks

1. Authenticated Cypress was authored but not executed because the local Cypress setup has no seeded login/session in this pass.
2. The BQ compatibility test is a static contract check, not a full Cloud Function integration test against BigQuery.
3. Open Observation saves free-form notes as one legacy note entry. If CHALK expects timestamped multi-note chunks, that is a follow-up UX requirement.
4. Home now has an additional card; visual layout compiled, but final visual QA should happen in staging with real viewport sizes.

## Deploy Status

Production: not deployed.  
Origin: not pushed.  
Fork: pushed to `fork/feature/chalk-2.0-renovation`.  
Staging: deployed hosting-only to `https://chalk-dev-c6a5d.web.app` from commit `a71dfc303`.

Verification:

```bash
curl -I https://chalk-dev-c6a5d.web.app
curl -I https://chalk-dev-c6a5d.web.app/OpenObservation
```

Both returned HTTP 200 on 2026-06-11. No Functions deploy was run.
