# CHALK 2.0 - Staging Deploy Handoff

> Deploy record for the CHALK 2.0 staging preview with V1 rollback path.
>
> Date: 2026-06-01

---

## Deploy Summary

| Field | Value |
|---|---|
| Project | `chalk-dev-c6a5d` |
| Hosting URL | `https://chalk-dev-c6a5d.web.app` |
| V2 URL | `https://chalk-dev-c6a5d.web.app/v2/home` |
| Branch | `feature/chalk-2.0-renovation` |
| Initial deploy commit | `229356c51` |
| Current validated branch head | `6089e652e` |
| Rollback V1 tag | `prod-current-2026-05-29` -> `1b4463024` |
| Tag pushed to | `fork` only |
| Deploy command | `./node_modules/.bin/firebase deploy -P staging --only firestore:rules,hosting` |
| Production touched | No |
| Functions deployed | No |

---

## Pre-Deploy Gates

- `npm run v2:preview-check` -> passed.
- `npm run v2:rules-check` -> passed.
- `npm run removebuild` -> passed.
- `npm run staging` -> passed with existing webpack asset-size warnings only.

---

## Deploy Result

- Firebase deployed `firestore, hosting` to `chalk-dev-c6a5d`.
- Firestore rules compiled successfully.
- Firebase warned that rules use old rules version 1; this is existing rules debt.
- Hosting uploaded 119 files from `build` and released successfully.

Post-deploy HTTP checks:

- `curl -I https://chalk-dev-c6a5d.web.app` -> HTTP 200.
- `curl -I https://chalk-dev-c6a5d.web.app/v2/home` -> HTTP 200.

---

## Rollback to V1 Staging

Use this only if staging needs to return to the known-good V1 production snapshot:

```bash
cd /Users/admin/Projects/Couture/chalk-coaching/CoachingApp
git fetch --tags fork
git switch --detach prod-current-2026-05-29
npm run removebuild
npm run staging
./node_modules/.bin/firebase deploy -P staging --only firestore:rules,hosting
git switch feature/chalk-2.0-renovation
```

This rollback deploys hosting and Firestore rules only. It does not deploy Functions and does not touch production.

---

## Return to V2 Staging After Rollback

```bash
cd /Users/admin/Projects/Couture/chalk-coaching/CoachingApp
git switch feature/chalk-2.0-renovation
npm run removebuild
npm run staging
./node_modules/.bin/firebase deploy -P staging --only firestore:rules,hosting
```

---

## Notes

- `.firebaserc` and `functions/.env` remain local pre-existing changes and were not committed for this deploy.
- `prod-current-2026-05-29` was pushed to `fork` so rollback is not local-only.
- Staging is for authenticated preview/review; this is not a production release.

---

## Hotfix: Partial Live Data Failures

| Field | Value |
|---|---|
| Date | 2026-06-01 |
| Commit deployed | `32c767259` |
| Issue | Most V2 screens could show live-data load errors because optional Firebase reads failed all-or-nothing. |
| Fix | `src/v2/lib/api.ts` now degrades teacher docs, login counts, action counts, active plans, action-plan steps, and training status independently. |
| Contract | `npm run v2:data-loading-check` |
| Deploy command | `./node_modules/.bin/firebase deploy -P staging --only firestore:rules,hosting` |
| Production touched | No |
| Functions deployed | No |

Verification:

- `npm run v2:data-loading-check` -> passed.
- `npm run v2:preview-check` -> passed.
- `npm run v2:rules-check` -> passed.
- `npm run staging` -> passed with existing webpack asset-size warnings only.
- `curl -I https://chalk-dev-c6a5d.web.app` -> HTTP 200.
- `curl -I https://chalk-dev-c6a5d.web.app/v2/home` -> HTTP 200.

Reviewer note: Firebase Hosting returns `cache-control: max-age=3600`, and the app has a service worker. If a browser keeps showing the previous data-loading behavior, use hard refresh, clear site data, or test in an incognito window before judging the hotfix.

---

## Hotfix: Console Errors and Missing Index

| Field | Value |
|---|---|
| Date | 2026-06-01 |
| Hosting/rules commit deployed | `925b57732` |
| Index commit deployed | `1eb8328ec` |
| Logger cleanup commit deployed | `698029ef8` |
| Issues | `site.webmanifest` served fallback HTML, undefined literacy training payload crashed Redux, and the V2 dashboard observation count query required a missing Firestore index. |
| Fix | Static manifests are emitted into `build`, `training-literacy-state` tolerates an undefined payload, `firestore.indexes.json` now preserves existing staging indexes plus the new `observations(observedBy ASC, end ASC)` index, and `redux-logger` is development-only so staging no longer logs Redux state. |
| Contracts | `npm run v2:console-check`, `npm run v2:preview-check`, `npm run v2:data-loading-check`, `npm run v2:rules-check` |
| Hosting/rules deploy command | `./node_modules/.bin/firebase deploy -P staging --only firestore:rules,hosting` |
| Index deploy command | `./node_modules/.bin/firebase deploy -P staging --only firestore:indexes` |
| Production touched | No |
| Functions deployed | No |

Verification:

- `npm run v2:console-check` -> passed.
- `npm run v2:preview-check` -> passed.
- `npm run v2:data-loading-check` -> passed.
- `npm run v2:rules-check` -> passed.
- `npm run staging` -> passed with existing webpack asset-size warnings only.
- Production bundle check -> `redux-logger` absent from non-sourcemap build artifacts.
- `curl -I https://chalk-dev-c6a5d.web.app/site.webmanifest` -> HTTP 200, `content-type: application/manifest+json`.
- `curl -I https://chalk-dev-c6a5d.web.app/manifest.json` -> HTTP 200, `content-type: application/json`.
- `curl -I https://chalk-dev-c6a5d.web.app/v2/home` -> HTTP 200.

Reviewer note: the Firestore index deploy completed successfully, but new composite indexes can take time to finish building in Firebase. If the V2 dashboard observation count still throws the same missing-index error immediately after deploy, wait for the index build to complete and retry with a hard refresh or incognito window.

---

## Hotfix: Empty Admin Data Loads

| Field | Value |
|---|---|
| Date | 2026-06-01 |
| Commit deployed | `6089e652e` |
| Issue | V2 reused legacy coach-scoped reads. For an admin staging user with no partners, teacher and action-plan reads returned empty arrays, making screens appear to lose data. App-level teacher loading also dispatched before teacher promises resolved. |
| Fix | `App.tsx` now awaits teacher document promises before dispatching. V2 falls back to `getTeacherData()` for admin teacher rows and to recent global `actionPlans` for admin active-plan preview. Legacy empty-array debug logs were removed. |
| Contracts | `npm run v2:data-loading-check`, `npm run v2:console-check`, `npm run v2:preview-check`, `npm run v2:rules-check` |
| Deploy command | `./node_modules/.bin/firebase deploy -P staging --only firestore:rules,hosting` |
| Production touched | No |
| Functions deployed | No |

Verification:

- `npm run v2:data-loading-check` -> passed.
- `npm run v2:console-check` -> passed.
- `npm run v2:preview-check` -> passed.
- `npm run v2:rules-check` -> passed.
- `npm run staging` -> passed with existing webpack asset-size warnings only.
- `curl -I https://chalk-dev-c6a5d.web.app/v2/home` -> HTTP 200.
- Published `index.html` references `/production.e2b5e9e95eadb27e83ce.js`.

Reviewer note: this was a read-path bug, not evidence of Firestore deletes. The console logs showed empty query results and premature Redux dispatches, not document removal.
