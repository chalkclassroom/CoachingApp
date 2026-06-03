# CHALK 2.0 — Stubs Disclosure

> Central disclosure of preview/local/fallback data paths previously identified in V2.
>
> These items were preview safety risks. Their initial-state source stubs are retired in the current branch; this file remains as an audit registry and regression checklist.
>
> Last updated: 2026-06-01

---

## Disclosure Statement

The V2 staging preview still includes partial and delegated modules, but the source-level initial-state demo rows listed below have been retired. They are not production data paths. Production release requires live integration, explicit legacy delegation, or hiding/removing unsupported controls.

---

## Current Status

`npm run v2:preview-check` fails if any retired stub token below reappears in `src/v2`. Pages now initialize with production-safe empty/loading/error states, read-only disclosures, or legacy delegation instead of demo rows.

## Retired Stub Inventory

| Source | Stub/token | Historical behavior | Current safe path | Production path |
|---|---|---|---|---|
| `CoachHome.tsx` | `STUB_ATTENTION` | Fallback attention queue appeared when live attention data was unavailable | Empty/error state | Live-derived queue |
| `CoachHome.tsx` | `STUB_ACTIVITY` | Fallback recent activity appeared in preview | Empty/error state | Live recent activity |
| `CoachHome.tsx` | `STUB_PLANS` | Fallback active plans appeared in preview | Empty/error state | Live active plans |
| `AllTeachers.tsx` | `ROWS` | Fictional roster appeared when live teacher list was unavailable | Empty/error state | Live roster only |
| `ActionPlans.tsx` | `DEMO_PLANS` | Fictional action/conference plans drove the workspace shell | Empty/live action plan queue and conference plan delegation | Live plans or legacy delegation |
| `Messaging.tsx` | `THREADS` | Preview inbox threads were local/static | Legacy `/Messaging` delegation | Real message backend or keep delegated |
| `Messaging.tsx` | `seeded` | Query-string teacher context created local preview thread | Legacy `/Messaging` delegation | Approved message schema |
| `PlanDetail.tsx` | `DEMO_PLAN` | Demo action plan powered `/v2/plans/demo-plan` and local draft behavior | Require live plan ID, block local drafts, and route creation/recovery to legacy action plans | Live plan contract or explicit legacy creation flow |
| `TeacherProfile.tsx` | `DEMO_TEACHERS` | Profile fallback showed fictional teacher summary | Live-or-empty teacher profile | Live teacher profile or legacy delegation |
| `Reports.tsx` | `DEFAULT_STATS` | Report stats fell back to static values | Live summary or zero/empty stats plus delegation | Live reports contract |
| `Training.tsx` | `CARDS` | Static training cards looked data-recommended | Curated module labels with persisted status | Data-driven recommendations if implemented |

---

## Required Reviewer Disclosure

Use this language before staging signoff:

```text
The V2 staging preview includes partial and delegated modules. These are safe for visual/product review but are not all production data paths yet: Messages, Admin writes, advanced Reports, Leader workflows, profile reports, editable Account preferences, conference plans, and selected observation completion flows. Production release requires either live integration, explicit legacy delegation, or hiding these controls.
```

---

## Audit Cross-References

- Prod-ready plan: `.chalk/CHALK-2-PROD-READY-GWT-PLAN.md`
- Goal plan: `.chalk/CHALK-2-GOALS-TDD-AUDIT-PLAN.md`
- V2 app routes: `CoachingApp/src/v2/App.tsx`
- V2 API wrappers: `CoachingApp/src/v2/lib/api.ts`
