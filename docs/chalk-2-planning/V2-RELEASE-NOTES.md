# CHALK 2.0 - Draft Release Notes

## What is included

- New CHALK 2.0 preview route under `/v2`.
- Updated coach dashboard with live-data wrappers and preview fallbacks.
- Teachers table with search, role/status filters, local CSV preview import, and local add-teammate preview.
- Editable plan detail view with autosave, comments, progress, and send-to-teacher marking for real plans.
- Live observation start flow with legacy-safe observation type mapping, timer, notes, local/Firestore draft saving, pause/resume, and tag insertion.
- Training recommendations surface with action toasts and future backend wrapper.
- Safer service worker update behavior.

## Not included in this sprint

- Photo capture.
- Audio capture.
- Production CSV-backed user import.
- Full auth-account teammate creation.
- Cloud Function recommendation scoring.
- Magic 9 alignment wizard after observation.
- Firestore document-level ownership hardening.

## Required before production

- Staging review signoff.
- Production logged-out route smoke test.
- Acceptance of current Firestore Posture A or approval of Phase 4 hardening.
