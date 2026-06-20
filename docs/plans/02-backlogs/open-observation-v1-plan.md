# Open Observation V1 — TDD G/W/T Plan

> Formal plan for adding an Open Observation mode to the legacy CHALK app.
> This is V1 work only: no V2 route changes, no production deploy, no new
> Firestore schema, and no new observation write path.
>
> Branch: `feature/chalk-2.0-renovation`
> Ticket closure token: `Closes CHALK-OPEN-OBS-V1`
> Last updated: 2026-06-11

---

## 0. How to Audit and Decisions

Audit this plan for scope control, testability, and pipeline safety. A reviewer should answer:

1. Does the plan preserve the legacy observation write path through `handleSession()` and `endSession()`?
2. Does every task have Given/When/Then, red proof, green proof, happy path, no-happy path, size, hours, and dependencies?
3. Does the plan reuse the existing observation type contracts instead of inventing a parallel mapping?
4. Does LI Open Observation have a clear and tested Firestore/BQ behavior?
5. Does the final stored type come from the Magic 9 alignment step rather than the initial provisional picker?
6. Does the plan stay inside V1 code paths and avoid touching `src/v2/`, `.firebaserc`, `functions/.env`, or production deploys?
7. Are manual checks limited to evidence that is hard to automate?

### Decisions

#### Decision A — Observation type source of truth

Status: Accepted for this plan.

Context: `docs/plans/03-progress/next-v1-requirement.md` originally suggested duplicating the V2 mapping into V1 to preserve separation. The final requirement supersedes that suggestion.

Decision: `src/v2/lib/observationTypes.ts` is the authoritative mapping from UI codes `TT, CC, MI, SE, IN, LC, SA, AC, LI` to stored observation types. V1 Open Observation may make a read-only cross-tree import from that file, preferably through a small V1 adapter under `src/components/OpenObservationComponents/`. The adapter must not duplicate the mapping and must not modify any file under `src/v2/`.

Consequences:

- Positive: one mapping prevents V1/V2 drift and protects BigQuery compatibility.
- Negative: V1 now has a narrow read-only dependency on a V2 library file.
- Guardrail: `scripts/v1-open-observation-type-contract-check.js` must fail if V1 introduces a duplicated type map or hard-coded stored type list.

Important implementation note: Open Observation should reuse `OBSERVATION_TYPE_OPTIONS` and/or `getStoredObservationType()`, but it must not blindly use `buildObservationStartPayload()` for LI Open Observation. That helper models the checklist-based observation flow and intentionally throws when LI lacks a legacy checklist. Open Observation LI is free-form and therefore needs the selected stored type plus the LI checklist behavior below.

#### Decision B — LI free-form behavior

Status: Accepted for this plan.

Decision: choose option (i). LI Open Observation writes `checklist: null` on the observation document.

Rationale:

- `Firebase.handleSession()` already normalizes an absent checklist to `null`.
- `Not Recorded` is already semantically tied to `activitySetting` in `endSession()`, not to checklist selection.
- Open Observation LI is intentionally different from the dedicated Literacy Instruction checklist tool: it records free-form notes under `type: 'LI'` but does not promise LI-specific BigQuery result rows.

Required proof:

- The Firestore observation document remains valid with `type: 'LI'` and `checklist: null`.
- `functions/observationToBQ/index.js` does not throw when processing an LI Open Observation document.
- If no LI-specific BQ result row is produced, that behavior is asserted and documented as intentional for Open Observation LI.

#### Decision C — Provisional type at start, canonical type at end

Status: Accepted for this plan.

Decision: the type selected at the start of the session is provisional. It may scope labels, color, and in-session context. The type confirmed in the Magic 9 alignment step is canonical and is the stored type passed to `handleSession()` / `endSession()`.

Required proof: OB-3 must test a user who starts with one type, changes alignment at end, and saves an observation whose stored `type` equals the final alignment choice, not the initial pick.

#### User-approved defaults retained

| Default | Plan decision |
|---|---|
| UI style | Legacy MUI 4 conventions, not V2 visual system |
| Entry point | Button inside existing observation tools/menu area |
| Alignment | Required at end before save |
| Free-form scope | All 9 observation types, including LI |
| Timer | Simple MM:SS elapsed timer |
| Draft persistence | `localStorage`, not Firestore draft writes |
| Branch | Continue on `feature/chalk-2.0-renovation` |
| Push | Fork only, never origin |
| Deploy | No production deploy; staging only on explicit later request |

No open user question survives this planning step. The only semantic choice was LI behavior, and this plan chooses `checklist: null`.

---

## 1. TDD Operating Rules

This plan inherits the operating rules from `docs/plans/02-backlogs/goals-tdd-audit-plan.md` §1 by reference. Do not duplicate or weaken them during execution.

Applied here, each OB task must follow:

1. Red: create or update the failing check/script/Cypress spec first.
2. Green: implement the smallest V1 change that passes the red test.
3. Refactor: clean only the touched implementation, with no surrounding cleanup.
4. Evidence: record command output and failure/pass reason in `docs/plans/03-progress/open-observation-v1-handoff.md`.

Branch/deploy guardrails inherited and narrowed for this work:

- Work on `feature/chalk-2.0-renovation`.
- Push only to `fork`, never `origin`.
- Do not deploy production.
- Do not deploy staging unless explicitly requested during execution.
- Do not commit `.firebaserc` or `functions/.env`.
- Do not modify files under `src/v2/`; the observation type dependency is read-only.

---

## 2. Goal Outcome

Goal: OB — Open Observation for legacy CHALK.

Outcome: a coach can launch an Open Observation from the legacy app, choose a teacher, choose an initial provisional type, take free-form notes with an MM:SS timer and reload-safe local draft, complete a required Magic 9 alignment step, and save the observation through the existing `Firebase.handleSession()` / `Firebase.endSession()` path with a BQ-compatible stored type.

Test harness:

| Layer | Use for | Required location / command |
|---|---|---|
| Contract scripts | Type mapping, route registration, legacy write shape, BQ compatibility | `scripts/v1-open-observation-type-contract-check.js`, `scripts/v1-open-observation-route-check.js`, `scripts/v1-open-observation-bq-compat-check.js` |
| Cypress E2E | User flow, draft persistence, end alignment, final type override | `cypress/integration/v1/open-observation-flow.ts` |
| Build checks | Legacy app compiles with the new V1 route/components | `npm run staging` as build-only evidence; no deploy |
| Manual evidence | Legacy MUI fit, observation menu placement, timer/notes visual sanity | screenshots/checklist in handoff only if execution reaches UI |

Sizing summary:

| Task | Size | Estimated hours | Depends on |
|---|---:|---:|---|
| OB-1 | S | 2-4h | none |
| OB-2 | M | 6-8h | OB-1 |
| OB-3 | M | 6-8h | OB-1, OB-2 |
| OB-4 | S | 2-4h | OB-1 |
| OB-5 | M | 6h | OB-1, OB-2, OB-3, OB-4 |
| Total |  | 22-30h |  |

This plan stays inside the original 22-30h target by keeping the UI scope minimal and treating LI/BQ proof as a focused contract harness rather than a pipeline refactor. If OB-5 discovers that the pipeline itself needs code changes, that is a scope escalation and should pause for user approval.

---

## 3. Per-Task Plan

### OB-1 — Type picker and teacher picker contract

**Given** a coach starts Open Observation from legacy CHALK,  
**When** the page loads,  
**Then** it shows a live teacher picker and exactly the 9 observation types using labels from `Constants.tsx` and stored values from `observationTypes.ts`.

Red spec:

- Create `scripts/v1-open-observation-type-contract-check.js` first.
- It fails until V1 Open Observation references `src/v2/lib/observationTypes.ts` read-only and `src/constants/Constants.tsx` for labels.
- It fails if a duplicated 9-type stored mapping appears under `src/views/protected/OpenObservationViews/` or `src/components/OpenObservationComponents/`.
- It fails if any UI code outside `TT, CC, MI, SE, IN, LC, SA, AC, LI` is introduced.

Green proof:

- `node scripts/v1-open-observation-type-contract-check.js` passes.
- The checker confirms all 9 constants labels map to the authoritative stored types.

Happy:

- Coach sees all 9 type options with legacy display labels.
- Coach can select a teacher from the live legacy teacher source.

No-happy:

- Empty teacher list shows a safe empty state and blocks start.
- Invalid or missing type selection blocks start and does not create an observation.

Size: S.  
Estimated hours: 2-4h.  
Depends on: none.

### OB-2 — Free-form notes, timer, and localStorage draft

**Given** a coach has selected a teacher and provisional type,  
**When** they take free-form notes during an Open Observation,  
**Then** notes, selected teacher, provisional type, and elapsed MM:SS timer state persist to `localStorage` and survive refresh without writing any Firestore draft.

Red spec:

- Extend `cypress/integration/v1/open-observation-flow.ts` first with a draft persistence scenario.
- The spec fails until note text persists across reload and can be cleared after successful save/discard.
- Add a static assertion to `scripts/v1-open-observation-route-check.js` that no Firestore draft path or new collection schema is introduced for Open Observation drafts.

Green proof:

- Targeted Cypress open-observation draft scenario passes.
- `node scripts/v1-open-observation-route-check.js` passes.
- `npm run staging` compiles.

Happy:

- Coach writes multiple notes, refreshes, and resumes with the same notes and elapsed state.
- Timer displays as MM:SS and continues from the restored draft baseline.

No-happy:

- Corrupt `localStorage` draft is ignored safely with a clear empty state.
- Discard clears only Open Observation draft keys and does not affect legacy observation state.

Size: M.  
Estimated hours: 6-8h.  
Depends on: OB-1.

### OB-3 — Required Magic 9 alignment and canonical final type

**Given** a coach has in-session free-form notes and a provisional starting type,  
**When** they end the Open Observation,  
**Then** a required Magic 9 alignment step confirms the canonical type and the final saved observation uses that final stored type.

Red spec:

- Extend `cypress/integration/v1/open-observation-flow.ts` first with a final-type override scenario.
- The spec starts with one provisional type, chooses a different Magic 9 alignment type at end, saves, and fails until the saved observation type equals the alignment choice.
- Add or extend `scripts/v1-open-observation-type-contract-check.js` to assert the final type is resolved through `getStoredObservationType()` / `OBSERVATION_TYPE_OPTIONS`, not a local switch statement.

Green proof:

- Targeted Cypress final-alignment scenario passes.
- `node scripts/v1-open-observation-type-contract-check.js` passes.
- Evidence shows `Firebase.handleSession()` receives the canonical final stored type.

Happy:

- Coach starts as `TT`, aligns to `CC`, and the saved observation has `type: 'climate'`.
- Coach starts and aligns to `AC`, and the saved observation has `type: 'AC'`.

No-happy:

- Attempting to end without alignment keeps the modal open and does not save.
- Invalid alignment value blocks save and logs no observation.

Size: M.  
Estimated hours: 6-8h.  
Depends on: OB-1, OB-2.

### OB-4 — Legacy entry point and route registration

**Given** legacy CHALK already has observation tools and protected routes,  
**When** Open Observation ships,  
**Then** a coach can reach it from the existing observation menu/home area through a protected legacy route, without adding a V2 route or top-level redesign.

Red spec:

- Create `scripts/v1-open-observation-route-check.js` first if not already created in OB-2.
- It fails until `src/App.tsx` registers a protected V1 route for Open Observation.
- It fails until the entry point points to that route from the existing legacy observation menu/home area.
- It fails if any new route or component for this feature is placed under `src/v2/`.

Green proof:

- `node scripts/v1-open-observation-route-check.js` passes.
- Cypress can navigate from the legacy entry point to the Open Observation page.
- `npm run staging` compiles.

Happy:

- Authenticated coach clicks Open Observation and lands on the new flow.
- Legacy observation tools remain reachable.

No-happy:

- Anonymous user cannot access the protected Open Observation route.
- Users without teacher data see a safe blocked state rather than a broken form.

Size: S.  
Estimated hours: 2-4h.  
Depends on: OB-1.

### OB-5 — Legacy write path, BigQuery compatibility, and release evidence

**Given** Open Observation writes must remain compatible with existing reports, exports, and BigQuery,  
**When** a coach saves an Open Observation,  
**Then** it uses the legacy `handleSession()` / `endSession()` path and produces an observation document shape that the BigQuery pipeline can process without schema changes.

Red spec:

- Create `scripts/v1-open-observation-bq-compat-check.js` first.
- It fails until the Open Observation save path uses the Firebase singleton `handleSession()`, `handlePushNotes()`, and `endSession()` rather than a direct `db.collection('observations').add/set` path.
- It checks at least `transition`, `climate`, `AC`, and `LI` fixture shapes against `functions/observationToBQ/index.js` branch expectations.
- It asserts LI Open Observation uses `type: 'LI'` and `checklist: null`, and that processing does not throw. If no LI-specific BQ result row is produced, the script documents and asserts that as intentional.

Green proof:

- `node scripts/v1-open-observation-bq-compat-check.js` passes.
- `node scripts/v1-open-observation-type-contract-check.js` passes.
- `node scripts/v1-open-observation-route-check.js` passes.
- `npm run staging` passes as build-only evidence.
- Cypress Open Observation flow passes.

Happy:

- Saving a non-LI Open Observation writes an observation doc with expected `observedBy`, `teacher`, `start`, `end`, `completed`, `type`, `timezone`, and notes subcollection shape.
- Saving an LI Open Observation writes `checklist: null` and does not break BQ processing.

No-happy:

- Save is blocked when teacher, notes, or final alignment type is missing.
- A direct Firestore observation write path fails the contract check.
- BQ fixture mismatch blocks done status.

Size: M.  
Estimated hours: 6h.  
Depends on: OB-1, OB-2, OB-3, OB-4.

---

## 4. Done Means

Open Observation V1 is done only when all of the following are true:

- A coach can reach Open Observation from the legacy observation menu/home entry point.
- Teacher picker uses live legacy teacher data and safe empty/error states.
- Type picker displays 9 labels from `Constants.tsx` and stored values from `observationTypes.ts`.
- Type selected at start is provisional; type confirmed at Magic 9 alignment is canonical.
- Free-form notes and timer persist through refresh via `localStorage` only.
- End save uses the legacy Firebase singleton path: `handleSession()`, note push behavior, and `endSession()`.
- No new observation collection schema or direct write path is introduced.
- LI Open Observation writes `checklist: null`, does not throw in BQ compatibility testing, and does not promise LI-specific result rows.
- Required scripts pass: `v1-open-observation-type-contract-check.js`, `v1-open-observation-route-check.js`, and `v1-open-observation-bq-compat-check.js`.
- Required Cypress spec passes: `cypress/integration/v1/open-observation-flow.ts`.
- `npm run staging` passes as build-only evidence.
- No staging or production deploy occurs unless separately requested after audit.

---

## 5. Scope Boundaries

In scope:

- Legacy V1 Open Observation page/container.
- Legacy MUI 4-compatible components under `src/components/OpenObservationComponents/`.
- Protected route and existing observation menu/home entry point.
- Free-form notes, MM:SS timer, localStorage draft, required Magic 9 alignment.
- Contract scripts and Cypress smoke specific to Open Observation.

Out of scope:

- V2 product refresh work.
- New Firestore schemas or security rules.
- New Cloud Functions or BigQuery schema changes.
- Photo/audio evidence.
- New reports UI.
- Production deploy.
- Staging deploy unless explicitly requested after execution.

---

## 6. Dependency Matrix

| Task | Depends on | Why |
|---|---|---|
| OB-1 | none | Type/teacher contract anchors the rest of the flow. |
| OB-2 | OB-1 | Draft state needs selected teacher/type context. |
| OB-3 | OB-1, OB-2 | Alignment saves notes and final type. |
| OB-4 | OB-1 | Route can land on the picker once type/teacher contract exists. |
| OB-5 | OB-1, OB-2, OB-3, OB-4 | BQ/release proof needs the complete save path and route. |

Execution order:

```text
OB-1 -> OB-2 -> OB-3 -> OB-4 -> OB-5
  \                  \       /
   ------- contract checks ---
```

---

## 7. File Ownership Plan

Expected production-code write areas during Prompt 2 execution:

- `src/views/protected/OpenObservationViews/`
- `src/components/OpenObservationComponents/`
- `src/App.tsx`
- Existing legacy observation menu/home file selected by route discovery.

Expected test/script write areas:

- `scripts/v1-open-observation-type-contract-check.js`
- `scripts/v1-open-observation-bq-compat-check.js`
- `scripts/v1-open-observation-route-check.js`
- `cypress/integration/v1/open-observation-flow.ts`

Do not touch:

- `src/v2/` files.
- `.firebaserc`.
- `functions/.env`.
- `firestore.rules` unless a later audit explicitly proves legacy signed-in writes are insufficient.
- Existing docs/plans reorganization.

---

## 8. Test and Command Expectations

Minimum execution commands for Prompt 2:

```bash
node scripts/v1-open-observation-type-contract-check.js
node scripts/v1-open-observation-route-check.js
node scripts/v1-open-observation-bq-compat-check.js
npm run staging
```

Cypress command may use the repo's existing Cypress runner. The handoff must record the exact command used for `cypress/integration/v1/open-observation-flow.ts`.

Red evidence must capture a meaningful failure reason. A task is not complete if the red test never failed before implementation, except for this documentation-only plan.

---

## 9. Per-Goal Handoff Template

Use `docs/plans/02-backlogs/goals-tdd-audit-plan.md` §9 as the base template. The Open Observation handoff must be written to:

`docs/plans/03-progress/open-observation-v1-handoff.md`

Additional required fields for this V1 work:

```text
LI behavior:
- checklist: null
- BQ result-row expectation: no LI-specific result row promised for Open Observation LI
- Contract proof: <command/output>

Canonical type proof:
- Initial type used in test: <code/stored type>
- Final alignment type used in test: <code/stored type>
- Saved observation type observed: <stored type>

Write path proof:
- handleSession/endSession path verified by: <script/spec>
- Direct Firestore observation writes absent: <script/spec>
```

---

## 10. Known Risks and Mitigations

| Risk | Mitigation |
|---|---|
| LI free-form semantics differ from dedicated LI checklist tool | Choose `checklist: null`; document no LI-specific result rows promised; require BQ no-throw contract. |
| Cross-tree import from V1 to V2 creates architectural discomfort | ADR-style decision in §0; read-only import only; no `src/v2` modifications. |
| Alignment modal grows beyond the 3-4 day quote | Keep alignment to single required type confirmation plus optional note/tag affordance; no AI/manual rubric expansion. |
| Direct Firestore write is faster to implement but risky | OB-5 contract fails direct `observations` writes outside legacy Firebase singleton. |
| LocalStorage draft persists stale data | OB-2 no-happy path requires corrupt/stale draft handling and explicit discard. |
| Existing Cypress legacy suite may be brittle | Add targeted V1 spec; do not repair broad Cypress suite unless it blocks this flow and is documented. |

---

## 11. Cross-References

| Reference | Why it matters |
|---|---|
| `docs/plans/03-progress/next-v1-requirement.md` | Source requirement, Slack context, defaults, draft OB-1..OB-5 outline. |
| `docs/plans/02-backlogs/goals-tdd-audit-plan.md` | TDD rules, handoff template, audit checklist style. |
| `docs/plans/02-backlogs/prod-ready-gwt-plan.md` | Sizing legend and dependency-matrix style. |
| `src/v2/lib/observationTypes.ts` | Authoritative UI code to stored type mapping; read-only import. |
| `src/constants/Constants.tsx` | Legacy display labels and colors for the 9 observation tools. |
| `src/components/Firebase/Firebase.tsx` | Existing `handleSession()`, `handlePushNotes()`, and `endSession()` write path. |
| `functions/observationToBQ/index.js` | BigQuery ingestion branches and LI checklist behavior. |
| `cypress/integration/ac/observation.ts`, `cc/observation.ts`, `mi/observation.ts`, `sa/observation.ts` | Existing legacy Cypress observation examples and selectors. |

---

## 12. Audit Checklist

Ask the next auditor to answer:

1. Is `checklist: null` the correct LI Open Observation behavior, and does OB-5 prove BQ does not throw?
2. Does the plan avoid using `buildObservationStartPayload()` where it would incorrectly require a LI checklist?
3. Are the type mapping and label sources strict enough to prevent a parallel V1 mapping from drifting?
4. Does OB-3 sufficiently prove that final Magic 9 alignment overrides the provisional starting type?
5. Are the three required scripts enough to catch direct Firestore writes, route placement mistakes, and BQ shape regressions?
6. Is the Cypress scope narrow enough for a $400 / 3-4 day V1 change while still proving happy/no-happy paths?
7. Are any files missing from the ownership plan, especially the legacy observation menu entry point?

Suggested response file:

`docs/plans/02-backlogs/open-observation-v1-audit-response.md`
