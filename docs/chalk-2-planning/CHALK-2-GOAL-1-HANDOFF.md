# CHALK 2.0 — Goal 1 Handoff

Goal: G1 - Preview-ready staging
Branch: feature/chalk-2.0-renovation
Base commit: c011e6d34
Final commit(s): e8d4dfdd, e6942f7ce
Pushed to: fork only (`fork/feature/chalk-2.0-renovation`)
Deploy: none

---

## Red Evidence

- `npm run v2:preview-check` -> failed as expected before the staging review guide and stubs disclosure existed.
- `npm run v2:preview-check` -> failed as expected when `.chalk/CHALK-2-GOAL-1-RESPONSIVE-A11Y-SMOKE.md` was temporarily removed:
  - smoke artifact missing,
  - mobile viewport missing,
  - desktop viewport missing,
  - keyboard checklist missing,
  - authenticated visual coverage overclaim guard missing.
- Cypress initially could not run until the local Cypress binary was installed and run outside the sandbox. That was an environment setup failure, not a product behavior failure.

## Green Evidence

- `npm run v2:preview-check` -> passed.
- `npm run v2:data-loading-check` -> passed.
- `npm run v2:console-check` -> passed.
- `npm run v2:rules-check` -> passed.
- `npm run v2:rules-smoke:test` -> passed after rerunning sequentially; the first parallel seed attempt left the emulator port busy.
- `npm run v2:rules-seed:test` -> passed after clearing the stale Firestore emulator process.
- `npm run staging` -> passed with existing webpack asset-size warnings only.
- `./node_modules/.bin/cypress run --config baseUrl=http://localhost:43020 --spec cypress/integration/v2/preview-readiness.ts` -> passed, 18 tests / 18 passing / 0 failing.

## Happy Paths Covered

- Authenticated staging review is documented route-by-route in `.chalk/CHALK-2-STAGING-REVIEW-GUIDE.md`.
- Each V2 route is labeled as live-ish, partial, preview-only, or delegated.
- All known preview/static/fallback stubs are removed from `src/v2` initial state and remain disclosed in `.chalk/CHALK-2-STUBS-DISCLOSURE.md` as a regression checklist.
- Staging rollback commands are documented against tag `prod-current-2026-05-29` using `--only firestore:rules,hosting`.

## No-Happy Paths Covered

- Anonymous `/v2/*` route access redirects to `/` instead of exposing `.v2-root`.
- No-happy Cypress coverage runs at `390x844` and `1440x900` for:
  - `/v2/home`,
  - `/v2/teachers`,
  - `/v2/plans`,
  - `/v2/messages`,
  - `/v2/resources`,
  - `/v2/reports`,
  - `/v2/admin`,
  - `/v2/training`,
  - `/v2/account`.
- Readiness script fails if forbidden pilot/client terms reappear in `src/v2`.
- Readiness script fails if retired stub tokens reappear in `src/v2`, or if route guide, smoke checklist, or rollback command evidence are missing.

## Manual Evidence

- `.chalk/CHALK-2-GOAL-1-RESPONSIVE-A11Y-SMOKE.md` exists as the manual authenticated visual/a11y checklist.
- Authenticated visual smoke is explicitly not claimed complete without approved staging credentials.

## Preview/Prod Disclosure Changes

- `.chalk/CHALK-2-STAGING-REVIEW-GUIDE.md` documents review scope, route matrix, preview-ready criteria, and staging rollback drill.
- `.chalk/CHALK-2-STUBS-DISCLOSURE.md` centralizes retired V2 preview/local/fallback data paths and records `e6942f7ce` as the source-level removal commit.
- `.chalk/CHALK-2-GOAL-1-RESPONSIVE-A11Y-SMOKE.md` documents automated anonymous viewport coverage and the pending authenticated manual smoke.
- `.chalk/CHALK-2-INDEX.md` references the new G1 artifacts and no longer instructs rollback by deleting the client branch on `origin`.

## Rollback tag verification

- `prod-current-2026-05-29` exists locally and on `fork`.
- Annotated tag object: `cdf2240aadb5b8cc8100fe31b9d967ba1c7477f7`.
- Dereferenced production commit: `1b4463024d2ec9e3de45d24d6ce2b82aebf6ec57`.
- Documented staging rollback command uses `./node_modules/.bin/firebase deploy -P staging --only firestore:rules,hosting`, so Functions are excluded.

## Remaining Risks

- Authenticated route visual/a11y smoke still requires approved staging credentials and should be completed before external signoff.
- G1 does not make V2 production-ready; it makes staging review honest and safer.
- Cypress 5.6.0 requires a local binary cache and must run outside the sandbox on this Mac.
- `.firebaserc` and `functions/.env` remain local pre-existing changes and were not included in the G1 commits.
