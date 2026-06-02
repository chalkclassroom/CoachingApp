# CHALK 2.0 — Staging Review Guide

> Review guide for authenticated staging preview.
>
> Staging URL: `https://chalk-dev-c6a5d.web.app`
> V2 entry: `https://chalk-dev-c6a5d.web.app/v2/home`
> Branch: `feature/chalk-2.0-renovation`
> Current fork target: `fork/feature/chalk-2.0-renovation`
> Last updated: 2026-06-01

---

## Review Scope

This is an authenticated staging preview. It is not a production launch candidate.

Use this guide to distinguish:

- **Live-ish:** reads live CHALK data where available and degrades to empty/loading/error states.
- **Partial:** workflow exists but is not full legacy parity yet.
- **Delegated:** production behavior remains in legacy CHALK for this release path.
- **Read-only:** V2 displays or routes safely but does not perform writes.

Do not treat partial or delegated interactions as durable production writes unless the route says so explicitly.

---

## Route Matrix

| Route | Status | What to review | Do not assume |
|---|---|---|---|
| `/v2/home` | Live-ish | Dashboard layout, attention queue, activity, active plans, empty/error states | Every count/card is complete production reporting |
| `/v2/teachers` | Live-ish | Teacher table, filters, empty roster behavior, profile entry | Add teammate / CSV import are production-complete |
| `/v2/teachers/:teacherId` | Partial | Teacher summary, current plan card, live-or-empty activity area | Full legacy teacher profile parity |
| `/v2/observation` | Partial | Type picker, note-taking, draft restore, notes-only completion gate | Final canonical observation completion is fully production-ready |
| `/v2/plans` | Partial/delegated | Action plan queue, filtering, conference plan delegation | Conference plan creation/editing is live in V2 |
| `/v2/plans/:planId` | Partial | Action plan detail, autosave, comments, send-to-teacher confirmation | Generic empty plan state is a durable live plan |
| `/v2/messages` | Live drafts / delegated delivery | Draft list/editor backed by Firestore plus legacy route for sending and attachments | V2 sends email through SendGrid directly |
| `/v2/resources` | Partial | Resource hub backed by real bundled CHALK assets | Every training/media asset has final production UX |
| `/v2/reports` | Delegated/live-ish | Live summary stats plus legacy delegation for exports/scheduling/profile reports | V2 advanced reporting/export is complete |
| `/v2/admin` | Read-only/delegated | Admin disclosure and links to legacy admin/users | Create/edit/import writes are enabled in V2 |
| `/v2/leader` | Delegated | Leader links to legacy dashboard/users/teachers/coaches/sites/archive/all-users/profile reports | Leader dashboard data is rendered by V2 |
| `/v2/account` | Live preferences | Locked profile identity plus persisted V2 workspace preferences | Name/email/role can be edited from V2 |
| `/v2/training` | Partial | Curated modules, truthful status labels, non-optimistic completion/skip behavior | Recommendations are fully data-driven |

---

## Reviewer Instructions

1. Log in with an approved staging account.
2. Start at `/v2/home`.
3. Visit each route in the matrix.
4. Capture issues as one of:
   - blocking production safety issue,
   - preview disclosure issue,
   - visual/UX issue,
   - backend/live-integration gap,
   - legacy delegation decision.
5. Do not request production deploy from this review alone. Production remains `NO-GO` until `docs/CHALK-2-PRODUCTION-RELEASE-CHECKLIST.md` is complete.

---

## Known Preview/Delegated Areas

The detailed stub disclosure lives in `docs/CHALK-2-STUBS-DISCLOSURE.md`.

High-level summary:

- Message drafts are live in V2; email delivery and attachments remain in legacy CHALK.
- Admin writes are delegated to legacy CHALK.
- Reports exports/scheduling/profile reports are delegated to legacy CHALK.
- Leader dashboards and leader user lists are delegated to legacy CHALK.
- Home, Teachers, Plans, Teacher Profile, Reports, Admin, and Training initialize with empty/loading/error states instead of demo rows.

---

## Preview-Ready Acceptance

This staging preview is acceptable for product review only when:

- `/v2/*` remains authenticated.
- Preview-only, partial, read-only, and delegated modules are disclosed before signoff.
- No retired demo/stub initial rows exist in `src/v2`; empty/loading/error states are used when live data is unavailable.
- Unsupported writes are hidden, disabled, delegated, or clearly marked read-only.
- Rollback remains available without touching production.

---

## Staging Rollback Drill

Known-good rollback tag: `prod-current-2026-05-29`.

Use this sequence for staging rollback review only:

```bash
git fetch --tags fork
git switch --detach prod-current-2026-05-29
npm run staging
./node_modules/.bin/firebase deploy -P staging --only firestore:rules,hosting
git switch feature/chalk-2.0-renovation
```

This command sequence intentionally uses `--only firestore:rules,hosting`; it must not deploy Functions.

Production rollback requires explicit approval before any command is run.
