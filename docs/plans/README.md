# CHALK 2.0 — Plans

All planning artifacts for the CHALK 2.0 renovation engagement live in this tree.
Organized by **type** (strategic → backlog → progress → decisions → deliverables),
not by phase, so plans that span phases (audit revisions, sprint replans) stay
findable.

> **Engagement state** (as of last update): paid fixed-price proposal at **$20,000**
> with flexible payment timing. Pricing is in scope for external audit.
> Technical strategy, risks, implementation quality, and ethics are all auditable.

> **Active work**: **Open Observation on V1 (legacy CHALK)** — confirmed by client,
> Friday start proposed, $400 / 3-4 days. Details:
> [`03-progress/next-v1-requirement.md`](03-progress/next-v1-requirement.md).
> V2 refresh on hold until CHALK secures budget.

---

## Where things live

### [01-strategic/](01-strategic/) — one-time strategy + audit
The "why" and the "what" of the engagement. Slow-changing.

| File | Purpose |
|---|---|
| [`audit-package.md`](01-strategic/audit-package.md) | Self-contained external audit doc with reasoning, risks, open questions. **External auditor entry point.** |
| [`renovation-plan.md`](01-strategic/renovation-plan.md) | 13-section internal engineering plan (predates the $15K offer; documents the original phased thinking) |
| [`sprint-plan.md`](01-strategic/sprint-plan.md) | Days 3–10 task-by-task plan in Given-When-Then format. 38 tasks, 97h estimate against 64h remaining capacity. Original sprint plan; superseded by `02-backlogs/` artifacts. |

### [02-backlogs/](02-backlogs/) — execution plans in G/W/T format
Iterations of the "how". Each later plan supersedes the earlier ones for active execution.

| File | Purpose |
|---|---|
| [`prod-ready-gwt-plan.md`](02-backlogs/prod-ready-gwt-plan.md) | Post-staging prod-readiness backlog. 30 PR items with sizing, DAG, scope cuts, stubs disclosure, monitoring/source-map requirements. |
| [`goals-tdd-audit-plan.md`](02-backlogs/goals-tdd-audit-plan.md) | TDD execution plan derived from the backlog. 6 goals × 5 tasks with red/green specs, happy/no-happy paths, test layers, rules-posture reconciliation. **All 30 tasks closed as of 2026-06-10.** |
| [`architecture-doc-plan.md`](02-backlogs/architecture-doc-plan.md) | TDD-style plan for documenting the architecture that emerged. 6 goals (A1-A6) covering C4 L1+L2 (required), C4 L3 + flows (recommended), capability rename (optional), Hexagonal/Clean formalization (out of scope for CHALK 2.0). |
| [`open-observation-v1-plan.md`](02-backlogs/open-observation-v1-plan.md) | V1 legacy Open Observation execution plan (iteration 1). 1 goal / 5 tasks (OB-1..OB-5), TDD red/green specs, LI `checklist: null` decision, final-type alignment contract, BQ compatibility guardrails. **Shipped to staging; superseded by iter2 plan.** |
| [`open-observation-v1-iter2-plan.md`](02-backlogs/open-observation-v1-iter2-plan.md) | Iteration 2 plan after Deanna feedback. New `openObservations/` collection, no Magic 9 pickers, timestamped notes, school/classroom subtitle, role-scoped picker, snapshot at end, aggregator extension. F-7 (theme extraction / reclassification) explicitly deferred. **Executed in [`03-progress/open-observation-v1-iter2-handoff.md`](03-progress/open-observation-v1-iter2-handoff.md).** |

### [03-progress/](03-progress/) — goal handoffs + dated artifacts
The "what actually happened". Append-only; goals close here.

| File | Purpose |
|---|---|
| [`goal-1-handoff.md`](03-progress/goal-1-handoff.md) | Goal 1 (Preview-Ready Staging) execution handoff with red/green evidence, commit, push target, covered paths. |
| [`goal-1-responsive-a11y-smoke.md`](03-progress/goal-1-responsive-a11y-smoke.md) | Goal 1 responsive/a11y smoke artifact. Automated anonymous viewport coverage + authenticated manual checklist. |
| [`goal-2-handoff.md`](03-progress/goal-2-handoff.md) | Goal 2 (Firestore Rules) foundation handoff. Includes the wildcard-hardening narrative. |
| [`v2-rules-inventory.md`](03-progress/v2-rules-inventory.md) | G2 rules inventory. Maps every V2 API write to Firestore paths, roles, denied roles, fixtures, release status, planned tests. |
| [`v2-rules-fixtures.md`](03-progress/v2-rules-fixtures.md) | G2 rules fixture manifest. Synthetic users/resources for allow/deny and role tests. |
| [`staging-deploy-2026-06-01.md`](03-progress/staging-deploy-2026-06-01.md) | Staging deploy handoff. Records deployed commit, checks, Firebase target, V1 rollback commands. |
| [`next-v1-requirement.md`](03-progress/next-v1-requirement.md) | **Confirmed**: Open Observation on V1 (legacy CHALK). Quoted $400 / 3-4 days; Friday start proposed. Includes scope, risks, open technical questions, G/W/T draft. V2 refresh on hold pending CHALK budget. |
| [`open-observation-v1-handoff.md`](03-progress/open-observation-v1-handoff.md) | Open Observation V1 execution handoff. Records OB-1..OB-5 commits, red/green evidence, LI `checklist: null` proof, final alignment proof, and staging/deploy status. |
| [`open-observation-deanna-feedback-handoff.md`](03-progress/open-observation-deanna-feedback-handoff.md) | Post-staging audit of Open Observation V1 against Deanna's feedback. Bugs vs product-scope vs new features, teacher-scoping risk, recommended architecture (new `openObservations/` collection), Path Min (~4-6h bug fixes) vs Path Full (~24-40h rebuild), pending verbatim Deanna message. |
| [`open-observation-v1-iter2-handoff.md`](03-progress/open-observation-v1-iter2-handoff.md) | Open Observation V1 iteration 2 execution handoff. Records OB2-1..OB2-5 commits, red/green evidence, Decision H/I verification, aggregator query impact, iter1 cleanup, and deploy status. |

### [04-decisions/](04-decisions/) — architectural decisions
Where the "why" of structural choices lives, separate from operational logs.

| File | Purpose |
|---|---|
| [`decision-log.md`](04-decisions/decision-log.md) | Operational dated decisions (Firestore rules posture transitions, scope, deployment). |
| [`adr/`](04-decisions/adr/) | Numbered Architecture Decision Records (Nygard format). Ready for population once Goal A2 of the architecture-doc-plan executes. |

### [05-deliverables/](05-deliverables/) — client-facing outputs
What CHALK and the reviewers see. Stays in sync with what runs in production.

| File | Purpose |
|---|---|
| [`staging-review-guide.md`](05-deliverables/staging-review-guide.md) | Authenticated staging review guide. Route-by-route status matrix for V2 (live-ish, partial, preview-only, delegated). |
| [`stubs-disclosure.md`](05-deliverables/stubs-disclosure.md) | Central preview/stub disclosure. Current V2 fallback/static/local data paths and fix/delegation paths before client signoff. |
| [`release-decision.md`](05-deliverables/release-decision.md) | Production release decision artifact (go/no-go gates). |
| [`production-release-checklist.md`](05-deliverables/production-release-checklist.md) | Pre-deploy checklist with rollback commands. |
| [`monitoring.md`](05-deliverables/monitoring.md) | Post-release monitoring runbook (Sentry + Firebase/Cloud Logging). |
| [`sw-rollback-smoke.md`](05-deliverables/sw-rollback-smoke.md) | Service worker rollback smoke test. |
| [`cypress-health.md`](05-deliverables/cypress-health.md) | Cypress v2 suite health record. |
| [`autonomous-prod-execution.md`](05-deliverables/autonomous-prod-execution.md) | Autonomous prod-execution runbook. |
| [`release-notes.md`](05-deliverables/release-notes.md) | V2 release notes draft for end-user comms. |
| [`review-notes.md`](05-deliverables/review-notes.md) | V2 staging review notes capturing Deanna feedback + stubs disclosure. |

---

## Companion tree: source materials

Source materials (visual specs, frameworks, meetings, product history,
engagement data) consolidated under [`../sources/`](../sources/). The
Iteration 2 plan and the Deanna feedback handoff cite files there directly.

## How to navigate

- **External auditor without context**: start at [`01-strategic/audit-package.md`](01-strategic/audit-package.md). It is self-contained.
- **Reviewer auditing Open Observation iter2**: start at [`03-progress/open-observation-v1-iter2-handoff.md`](03-progress/open-observation-v1-iter2-handoff.md), then cross-check [`02-backlogs/open-observation-v1-iter2-plan.md`](02-backlogs/open-observation-v1-iter2-plan.md).
- **Reviewer evaluating prod readiness**: start at [`05-deliverables/staging-review-guide.md`](05-deliverables/staging-review-guide.md), then [`05-deliverables/stubs-disclosure.md`](05-deliverables/stubs-disclosure.md).
- **LLM auditing a plan**: each plan in [`02-backlogs/`](02-backlogs/) has its own `§0 How to audit` section and a checklist at the end.
- **Anyone needing Deanna's source materials**: navigate to [`../sources/`](../sources/) — `01-` for the Open Observation feedback, `02-` for CLASS/Pyramid/Conscious-Discipline crosswalks, `03-` for meeting records, `04-` for product history, `05-` for engagement data.

---

## Conventions

- **Naming**: `kebab-case.md`. No `CHALK-2-` prefix — location implies it.
- **Cross-references**: relative paths from `docs/plans/` root. Avoid absolute `/docs/plans/...` paths so the tree is portable.
- **ADRs**: numbered `NNNN-title.md` under `04-decisions/adr/`. Nygard fields (Title / Status / Context / Decision / Consequences). Status valid values: `Proposed`, `Accepted`, `Superseded`, `Rejected`, `Deferred`.
- **Goal handoffs**: filename `goal-N-handoff.md` for each goal closed. One per goal.
- **Dated artifacts**: append `-YYYY-MM-DD` when the file describes a specific date (e.g. `staging-deploy-2026-06-01.md`).
- **Frozen-in-time plans**: once a plan in `02-backlogs/` is closed, leave it as-is. New plans are new files, not edits.

---

## Tracking integrity

| Check | Where |
|---|---|
| Required headings and Mermaid syntax in arch doc | `scripts/arch-doc-required-sections.js` (created during Goal A1.5 of the architecture-doc-plan) |
| ADR shape | `scripts/arch-adr-shape-check.js` (created during Goal A2) |
| V2 rules inventory ↔ rules.firestore freshness | `scripts/v2-rules-inventory-check.js` (already wired) |
| Cross-references not broken | manual grep, scheduled to add to CI |

---

## Source files (not part of plans/)

The following live outside `docs/plans/` because they are not planning artifacts:

- `CoachingApp/src/v2/` — V2 application code.
- `CoachingApp/scripts/v2-*-check.js` — TDD contract checks consumed by CI.
- `CoachingApp/cypress/integration/v2/` — V2 Cypress acceptance suite.
- `CoachingApp/firestore.rules` — security boundary (referenced from architecture-doc-plan §3.2).
- `CoachingApp/functions/observationToBQ/index.js` — BQ ingestion pipeline (referenced from architecture-doc-plan §4.1).
- `../.chalk/TICKETS.md` — legacy client work history (separate from V2 plans).
- `../docs/` (project root) — client-facing proposal PDFs + mockups.

---

Last updated: 2026-06-12
