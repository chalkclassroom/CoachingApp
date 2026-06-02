# CHALK 2.0 — Goal 1 Responsive and A11y Smoke

> Evidence note for G1.4 in `.chalk/CHALK-2-GOALS-TDD-AUDIT-PLAN.md`.
>
> Last updated: 2026-06-01

---

## Automated No-Happy Smoke

Covered by `CoachingApp/cypress/integration/v2/preview-readiness.ts`.

The Cypress smoke checks anonymous access against core V2 routes at:

- `390x844`
- `1440x900`

Expected result:

- Anonymous visitors are redirected to `/`.
- `.v2-root` is not present.
- V2 preview content is not exposed through responsive route rendering.

Routes covered:

- `/v2/home`
- `/v2/teachers`
- `/v2/plans`
- `/v2/messages`
- `/v2/resources`
- `/v2/reports`
- `/v2/admin`
- `/v2/leader`
- `/v2/training`
- `/v2/account`

---

## Authenticated Manual Smoke Checklist

Authenticated visual smoke requires approved staging credentials. This document does not claim that authenticated visual review has been completed without those credentials.

For each route in `docs/CHALK-2-STAGING-REVIEW-GUIDE.md`, check:

- Primary heading and navigation are visible at `390x844`.
- Primary heading and navigation are visible at `1440x900`.
- Primary controls do not overlap adjacent content.
- Modals, if opened, can be dismissed with keyboard and visible controls.
- Tab order reaches the primary controls in a predictable order.
- Focus is visible on interactive controls.
- Preview-only, partial, read-only, or delegated modules show honest status/disclosure.

Record screenshots or notes here before external staging signoff:

| Route | 390x844 | 1440x900 | Keyboard/focus notes | Issues |
|---|---|---|---|---|
| `/v2/home` | Pending authenticated review | Pending authenticated review | Pending | Pending |
| `/v2/teachers` | Pending authenticated review | Pending authenticated review | Pending | Pending |
| `/v2/observation` | Pending authenticated review | Pending authenticated review | Pending | Pending |
| `/v2/plans` | Pending authenticated review | Pending authenticated review | Pending | Pending |
| `/v2/messages` | Pending authenticated review | Pending authenticated review | Pending | Pending |
| `/v2/resources` | Pending authenticated review | Pending authenticated review | Pending | Pending |
| `/v2/reports` | Pending authenticated review | Pending authenticated review | Pending | Pending |
| `/v2/admin` | Pending authenticated review | Pending authenticated review | Pending | Pending |
| `/v2/leader` | Pending authenticated review | Pending authenticated review | Pending | Pending |
| `/v2/training` | Pending authenticated review | Pending authenticated review | Pending | Pending |
| `/v2/account` | Pending authenticated review | Pending authenticated review | Pending | Pending |
