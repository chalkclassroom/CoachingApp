# CHALK 2.0 - Staging Review Notes

Last updated: 2026-05-28

## Build / preview

- Local preview: `http://127.0.0.1:42020/v2/home`
- Build gate used: `cd CoachingApp && npm run staging`
- Standalone `tsc --noEmit` remains out of gate because this repo currently has TS 3.7 / modern `@types/*` incompatibilities.

## Security posture

- Firestore rules remain on the legacy auth-only wildcard.
- New v2 write paths inherit that wildcard until Phase 4 security hardening.
- This is documented as Posture A in `.chalk/decision-log.md`; do not claim user-scoped rules enforcement yet.

## Implemented for v2 sprint preview

- `/v2` route is protected by default in production, staging, and localdev. Public preview requires explicitly setting `REACT_APP_V2_PUBLIC_PREVIEW=true` for a reviewed demo build.
- v2 consumes the existing Firebase singleton through `V2FirebaseProvider`; no second Firebase app is created by v2.
- `useV2Auth()` loads current auth/user information for v2 pages.
- v2 API wrappers isolate legacy Firebase methods from v2 page components.
- Dashboard, Teachers, Plan Detail, Observation, and Training pages have loading/empty/error states.
- Observation type picker maps UI codes to the legacy values required by the BigQuery pipeline.
- Service worker registration now handles update detection and reload on controller change.

## Stub / scope disclosure before production signoff

These controls are deliberately constrained for this release:

- Add teammate: adds a row to the v2 preview list only; it does not create an auth account or assign full CHALK roles.
- CSV import: parses basic CSV rows into the v2 preview list only; it does not persist users or replace the existing backend workflow.
- Send to teacher: for a real action plan, it marks the plan as sent in Firestore; it does not send email/push notifications.
- Photo/audio capture: out of scope; controls show a toast and do not capture media.
- Training recommendations: wrapper is ready, but current recommendations are local until a Cloud Function or scoring backend is approved.
- Magic 9 alignment after observation: out of scope for this sprint.

## Production blockers

- Run staging review with Deanna/CHALK and accept the stub disclosure above.
- Decide whether to keep Posture A for launch or fund Phase 4 rules hardening first.
- Run logged-out smoke test on staging and production builds: `/v2/home` must redirect to `/` when preview flag is false.
- Deploy requires Firebase project access and explicit approval.
