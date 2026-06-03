# CHALK 2.0 — Architecture Documentation Plan

> Plan to document the architecture that emerged through the V2 sprint.
> Written in TDD/goals format parallel to `.chalk/CHALK-2-GOALS-TDD-AUDIT-PLAN.md`.
> Captures L1 (overview), L2 (component/flow detail), and L3 (formalization)
> as separate, independently approvable goals so the team can stop at any level.
>
> Current reference state: `feature/chalk-2.0-renovation` at the head of the
> 44-commit goals execution sprint (2026-06-03). Staging is authenticated and
> review-ready. All 30 tasks of `CHALK-2-GOALS-TDD-AUDIT-PLAN.md` are closed.
>
> Last updated: 2026-06-03

---

## 0. How to audit this document

Audit this plan as a documentation backlog, not an implementation plan. A reviewer should answer:

1. Does every goal produce a doc artifact whose absence would be felt?
2. Does every task have a Red spec that can fail before the doc exists?
3. Are diagrams and ADRs locked to a tooling baseline that survives in CI?
4. Is L1 separable from L2 and L3 so the team can stop at L1 without leaving a half-built map?
5. Does the plan avoid refactoring production code under the cover of "architecture"?
6. Are cross-references to existing planes and to live code paths concrete?
7. Is the optional Hexagonal/Clean formalization (Goal A6) explicitly marked as out-of-scope for CHALK 2.0?

This document is a sibling plan of:

- `.chalk/CHALK-2-PROD-READY-GWT-PLAN.md`
- `.chalk/CHALK-2-GOALS-TDD-AUDIT-PLAN.md`
- `.chalk/CHALK-2-SPRINT-PLAN.md`

---

## 1. TDD-for-Docs Operating Rules

### Red / Green / Refactor contract (adapted)

Documentation is code. Each task below follows:

1. **Red:** create or update a verification script/lint that fails because the doc, diagram, or ADR is missing, incomplete, or stale.
2. **Green:** write the doc, diagram, or ADR until the script passes.
3. **Refactor:** simplify wording, deduplicate, remove dead references.
4. **Evidence:** record the script command and its red/green output in the goal handoff.

A doc task is not done if the script never observed failing, unless the task is explicitly marked as policy-only.

### Doc test layers

| Layer | Use for | Preferred location / command |
|---|---|---|
| Markdown lint | required headings, section order, frontmatter | new node scripts under `CoachingApp/scripts/arch-*` |
| Diagram lint | Mermaid/PlantUML syntax compiles, all referenced nodes exist | `npx mmdc -i <file>` or equivalent in script |
| Code-link check | every doc reference to a file/function exists in `CoachingApp/src/v2/` or `CoachingApp/functions/` | grep-style script |
| ADR shape check | Nygard fields present, status valid, ID unique | new node script |
| Manual review | once per goal, by author + one reviewer | recorded in handoff doc |
| CI | prevent silent doc erosion | `.github/workflows/*` or documented equivalent once arch lint scripts exist |

### Sizing legend

Reuses the legend from `CHALK-2-PROD-READY-GWT-PLAN.md`:

| Size | Nominal effort | Meaning |
|---|---:|---|
| XS | 0.5-1h | Skeleton, frontmatter, small lint script |
| S | 2-4h | One diagram or one ADR |
| M | 6-12h | One section of the architecture doc with diagrams + glossary |
| L | 16-24h | Multi-diagram zone with code-link freshness checks |
| XL | 32-56h | Cross-module formalization (Hexagonal restructure) |

### Branch and deploy guardrails

- Work on `feature/chalk-2.0-renovation`.
- Push only to `fork`, not `origin`.
- This plan does not produce any production deploy.
- Diagram source files live in the repo (Mermaid in markdown, ADR markdown in `.chalk/adr/`).
- No production code change without a separate goal in `CHALK-2-PROD-READY-GWT-PLAN.md` or `CHALK-2-GOALS-TDD-AUDIT-PLAN.md`.
- Goal A5 (Capability Alignment) is the only goal that touches production code; it depends on dedicated tests and is explicitly optional.

---

## 2. Goal Map

| Goal | Outcome | Level | Effort | Required? | Depends on |
|---|---|---|---:|---|---|
| A1 | Overview architecture doc (C4 L1+L2) + layer glossary | L1 | 7-14h | Required | none |
| A2 | Architecture Decision Records foundation | L1 | 7-14h | Required | A1.1 skeleton |
| A3 | Component & boundary detail (C4 L3) for critical zones | L2 | 22-36h | Recommended | A1 |
| A4 | Sequence diagrams for complex flows | L2 | 12-25h | Recommended | A1, A3 |
| A5 | Capability alignment refactor (api.ts renaming) | L2 | 25-42h | Optional | A1, A3 |
| A6 | Hexagonal/Clean formalization | L3 | 118-204h | Out of scope for CHALK 2.0 | A1-A5; explicit go-decision |

Three execution paths:

```text
Path L1 only (minimum viable architecture doc)         : A1 + A2                    14-28h
Path L1 + L2 (recommended for CHALK 2.0 closeout)      : A1 + A2 + A3 + A4          41-89h
Path L1 + L2 + capability rename                       : A1 + A2 + A3 + A4 + A5     66-131h
Path L3 (only justified for CHALK 3.0 greenfield)      : everything above + A6      184-335h
```

Recommended sequence:

```text
A1 -> A2 -> A3 -> A4 -> (decide: stop or continue to A5) -> (decide: A6 only if CHALK 3.0)
```

Recommended starting point: **A1.1** (skeleton + check script). It unblocks A2 (ADR template lives in the same tree) and A3-A5 (diagrams attach to sections of the same root doc).

---

## 3. Goal A1 — Overview Layer (C4 L1+L2 + Glossary)

Outcome: a single root document `.chalk/CHALK-2-ARCHITECTURE.md` answers "what is CHALK 2.0, who uses it, what are the major containers, where does each layer live" without forcing the reader to navigate the codebase.

Test harness:

- Markdown lint script that asserts the doc has required headings.
- Mermaid lint that asserts every diagram compiles.
- Code-link check that asserts the glossary references real folders.

### A1.1 — Architecture doc skeleton and required-headings lint

**Given** there is no `.chalk/CHALK-2-ARCHITECTURE.md` today,
**When** a reader opens the architecture root doc,
**Then** they find a known table of contents, frontmatter, and placeholder sections for Context, Container, Glossary, ADR index, and Component/Flow detail.

Red spec:
- Add `scripts/arch-doc-required-sections.js` that asserts `.chalk/CHALK-2-ARCHITECTURE.md` exists and contains the headings: `## 1. System Context`, `## 2. Containers`, `## 3. Layer Glossary`, `## 4. ADR Index`, `## 5. Component Detail`, `## 6. Flow Sequences`, `## 7. Cross-References`. Script must fail before the doc exists.

Green proof:
- `npm run arch:doc-check` (new script) passes.
- The skeleton compiles as Markdown without broken Mermaid blocks.

Happy:
- New dev opens the doc and sees the TOC even before the diagrams are filled in.

No-happy:
- A future commit that removes a required heading fails the check.

Size: XS. Depends on: none.

### A1.2 — System Context diagram (C4 Level 1)

**Given** CHALK 2.0 has multiple user roles and external integrations,
**When** a reader reads §1 of the architecture doc,
**Then** they see one Mermaid diagram showing the CHALK system as one box, with arrows to/from Coach, Teacher, Admin, Program Leader, Site Leader, Firebase Auth, Firestore, Cloud Functions (SendGrid), and BigQuery.

Red spec:
- Diagram lint asserts that `.chalk/CHALK-2-ARCHITECTURE.md` §1 contains exactly one ```mermaid block that includes the node labels `Coach`, `Teacher`, `Admin`, `Program Leader`, `Site Leader`, `Firebase`, `Cloud Functions`, `BigQuery`. Lint fails before the diagram is written.

Green proof:
- `npm run arch:doc-check` passes including the Mermaid block.
- Manual review confirms the diagram is readable.

Happy:
- A new dev names the 5 user roles and 4 external systems after reading §1.

No-happy:
- If any user role is removed from the codebase but remains in the diagram, code-link check flags it.

Size: S. Depends on: A1.1.

### A1.3 — Container diagram (C4 Level 2)

**Given** CHALK 2.0 runs alongside the legacy app under `/v2/*`,
**When** a reader reads §2,
**Then** they see the major deployable containers and runtime processes: Legacy React app, V2 React app (under `/v2/*`), Firebase Auth, Firestore (legacy collections + v2-narrow collections), Cloud Functions (per-function names), SendGrid worker, BigQuery ingestion pipeline.

Red spec:
- Diagram lint asserts §2 contains a Mermaid block with the nodes `Legacy App`, `V2 App`, `Firebase Auth`, `Firestore`, `Cloud Functions`, `BigQuery`. Lint also asserts that each Firestore collection box references a real path in `firestore.rules`.

Green proof:
- `npm run arch:doc-check` passes.
- Each rules-referenced collection in the diagram is found in `firestore.rules` by grep.

Happy:
- A reviewer can map "the v2 app talks to Firestore via api.ts, and api.ts talks to the legacy Firebase singleton".

No-happy:
- A removed Cloud Function silently lingering in the diagram fails the check.

Size: S. Depends on: A1.1.

### A1.4 — Layer glossary (domain / application / infrastructure / security boundary / test pyramid)

**Given** the V2 sprint produced an emergent layered architecture without naming the layers,
**When** a reader reads §3,
**Then** they see a glossary that names the layers and points to representative files in the codebase.

Red spec:
- Code-link check asserts that each glossary entry includes at least one path that exists today. The required entries are: Domain (`src/v2/lib/observationTypes.ts`), Application/Use cases (`src/v2/lib/api.ts`, `src/v2/hooks/useV2Auth.ts`), Adapters (`src/v2/lib/firebase.ts`, the `safeRead` wrapper inside `api.ts`), Infrastructure (Firebase singleton at `src/components/Firebase/Firebase.tsx`), Security boundary (`firestore.rules`), Test pyramid (`scripts/v2-*-check.js`, `cypress/integration/v2/*`).

Green proof:
- `npm run arch:doc-check` passes.
- Every referenced file resolves under `CoachingApp/`.

Happy:
- A reviewer locates the source of truth for "where the legacy Firebase boundary lives".

No-happy:
- Renaming `src/v2/lib/api.ts` without updating the glossary fails the link check.

Size: S. Depends on: A1.1.

### A1.5 — Doc lint runner and CI hook

**Given** the architecture doc must not silently rot,
**When** any commit changes `.chalk/CHALK-2-ARCHITECTURE.md` or any glossary-referenced file,
**Then** the doc lint runs as part of the v2 scripted CI.

Red spec:
- Add `npm run arch:doc-check` to `scripts/v2-cypress-ci-check.js` or the equivalent CI manifest. Until the check is wired, the CI script fails by listing it as required.

Green proof:
- CI runs the lint and reports green.
- A demo "break the doc" commit on a throwaway branch fails the CI.

Happy:
- Doc rot is caught at PR review, not at audit time.

No-happy:
- A merge that removes a required heading is rejected.

Size: XS. Depends on: A1.1, A1.2, A1.3, A1.4.

Goal A1 Done means:

- `.chalk/CHALK-2-ARCHITECTURE.md` exists with §1-§3 filled and §4-§7 stubbed.
- Doc lint runs in CI and is green.
- A new dev can read it in 20 minutes and name the layers.

---

## 4. Goal A2 — Architecture Decision Records (ADR) Foundation

Outcome: the "why" of major decisions lives in versioned ADRs, separate from the running `decision-log.md`. ADRs are immutable once accepted; the log captures ongoing dated entries.

Test harness:

- ADR shape check (Nygard fields).
- Sequential ID check.
- Status vocabulary check.

### A2.1 — ADR template and `.chalk/adr/` location

**Given** decisions today live as dated entries in `.chalk/decision-log.md`,
**When** a future decision needs to be captured at architecture-level granularity,
**Then** the team writes a numbered ADR in `.chalk/adr/NNNN-title.md` using a template with Status / Context / Decision / Consequences.

Red spec:
- Add `scripts/arch-adr-shape-check.js` that asserts every file under `.chalk/adr/` matches the template fields. Initially fails because the directory does not exist.

Green proof:
- `.chalk/adr/0000-template.md` exists.
- `npm run arch:adr-check` passes against the template alone.

Happy:
- A new ADR file copy-pasted from the template passes the shape check.

No-happy:
- An ADR missing the `## Decision` heading fails the check.

Size: XS. Depends on: A1.1.

### A2.2 — ADR-0001: Firestore rules Posture A → Posture B

**Given** the original decision-log entry (2026-05-28) recorded Posture A "keep the wildcard" and the v2 sprint then replaced it with narrow rules,
**When** a reader needs to understand why the wildcard was narrowed,
**Then** ADR-0001 captures the original decision, the trigger to revise it, the new posture, and the consequences.

Red spec:
- ADR shape check requires `.chalk/adr/0001-firestore-rules-posture.md` to exist with Status = Superseded for Posture A and a follow-up section pointing at the active rules file.

Green proof:
- ADR exists.
- `decision-log.md` keeps the dated entry but links to ADR-0001.

Happy:
- A future engineer reading `firestore.rules` lands on ADR-0001 via a header comment or via the glossary.

No-happy:
- An ADR without an explicit Status field fails the check.

Size: S. Depends on: A2.1.

### A2.3 — ADR-0002: Strangler-fig under `/v2/*`

**Given** V2 was built as a strangler-fig under a separate route prefix,
**When** a reader asks "why not a full rewrite?",
**Then** ADR-0002 captures the constraint (60-hour offer + production users), the alternative (full rewrite), the chosen path, and the consequences (dual maintenance, route protection flag, eventual cutover decision).

Red spec:
- ADR shape check requires `.chalk/adr/0002-strangler-fig-v2.md` with all Nygard fields.

Green proof:
- ADR exists and cross-references `src/App.tsx` V2PrivateRoute and `webpack.config.js` DefinePlugin entry.

Happy:
- A reviewer reads ADR-0002 and understands why legacy routes still exist.

No-happy:
- Removing the V2PrivateRoute without updating the ADR triggers the code-link check.

Size: S. Depends on: A2.1.

### A2.4 — ADR-0003: Observation type mapping (UI codes ↔ stored values)

**Given** the v2 sprint discovered that the codebase stores observation types as lowercase words (`transition`, `climate`) for 7 of 9 cases and as 2-letter codes (`LI`, `AC`) for 2 cases,
**When** a future engineer adds a new observation type,
**Then** ADR-0003 captures the discovered mapping, why it is heterogeneous, and the contract that `observationTypes.ts` enforces.

Red spec:
- ADR shape check requires `.chalk/adr/0003-observation-type-mapping.md` and the file must reference both `src/v2/lib/observationTypes.ts` and `functions/observationToBQ/index.js`.

Green proof:
- ADR exists and is cross-linked from the BQ contract check script.

Happy:
- A future LI/AC code branch keeps the same mapping convention.

No-happy:
- A PR that adds a 10th observation type without updating the ADR is caught by the inventory check (existing `v2-rules-inventory-check.js` extension).

Size: S. Depends on: A2.1.

### A2.5 — ADR policy and migration of remaining decision-log entries

**Given** `decision-log.md` contains several dated entries that mix architecture with operational notes,
**When** the team decides what belongs as an ADR vs a dated log,
**Then** the policy is written into the ADR template and obvious architecture entries are migrated.

Red spec:
- Add a check that `decision-log.md` contains a frontmatter pointer "Architecture-level decisions live in `.chalk/adr/`. This log is for dated operational and contextual records." If missing, fail.

Green proof:
- `decision-log.md` updated with the pointer.
- Any decision-log entry that meets the ADR criteria (durable architectural choice, not a transient state) has either been migrated or has a "Not an ADR" justification.

Happy:
- A future operational decision is logged in `decision-log.md` without ambiguity about its scope.

No-happy:
- An architecture-level decision logged only in `decision-log.md` is flagged at audit time as missing an ADR.

Size: XS. Depends on: A2.1, A2.2, A2.3, A2.4.

Goal A2 Done means:

- ADR template lives in `.chalk/adr/0000-template.md`.
- 3 ADRs (0001, 0002, 0003) exist and cover the highest-impact decisions.
- `decision-log.md` is reframed as the operational log; architecture decisions live in ADRs.
- An external auditor can find the "why" of every major v2 architectural choice in under 5 minutes.

---

## 5. Goal A3 — Component & Boundary Detail (C4 L3)

Outcome: for the 3 most consequential zones (data adapter, security boundary, test pyramid), a C4 Level 3 Component diagram exists with explicit dependency direction.

Test harness:

- Diagram lint (Mermaid syntax).
- Code-link check for every box in every diagram.
- Dependency-direction check: forbidden edges (e.g., domain importing from infrastructure) fail.

### A3.1 — Component diagram for `api.ts` data adapter

**Given** `src/v2/lib/api.ts` is the single entry point for v2 data access,
**When** a reader reads §5.1,
**Then** they see a Mermaid diagram showing the page components, hooks (`useV2Auth`, `useV2Firebase`), `api.ts` as the facade, the `safeRead` helper, and the legacy Firebase singleton.

Red spec:
- Diagram lint asserts §5.1 has a Mermaid block with the boxes `Pages`, `useV2Auth`, `useV2Firebase`, `api.ts` (with sub-boxes for each public function), `safeRead`, `Firebase singleton`. Each box must reference a real file or function.

Green proof:
- `npm run arch:doc-check` passes including code-link for §5.1.
- A reviewer can trace `CoachHome.tsx` → `api.getDashboardStats` → `safeRead` → `firebase.getTeacherList()`.

Happy:
- A reviewer locates "where v2 talks to Firebase" in one diagram.

No-happy:
- A new `api.ts` export that does not appear in the diagram fails a coverage check.

Size: M. Depends on: A1.

### A3.2 — Component diagram for `firestore.rules` security boundary

**Given** `firestore.rules` now contains per-collection rules and validators,
**When** a reader reads §5.2,
**Then** they see a Mermaid diagram showing role helpers (`signedIn`, `isOwner`, `isAdmin`, `canWriteUserDoc`), validators (`validObservationDraftValue`, `validActionPlanComment`, etc.), and per-collection rule blocks (`users/`, `actionPlans/`, `observations/`, `conferencePlans/`, `emails/`, fallback deny).

Red spec:
- Diagram lint asserts every helper and validator named in the diagram exists in `firestore.rules` by exact name. Fail if any name diverges.

Green proof:
- `npm run arch:doc-check` passes including code-link for §5.2.

Happy:
- An engineer adding a new write path can locate the relevant validator and rule block in seconds.

No-happy:
- Renaming a validator in `firestore.rules` without updating the diagram fails the check.

Size: M. Depends on: A1.

### A3.3 — Component diagram for the test pyramid

**Given** the v2 test pyramid spans rules emulator scripts, contract scripts under `scripts/v2-*-check.js`, and Cypress under `cypress/integration/v2/`,
**When** a reader reads §5.3,
**Then** they see a Mermaid diagram showing the 3 layers and which test belongs to which layer.

Red spec:
- Diagram lint asserts every layer references at least one real script/test path. The diagram must include `v2-rules-emulator-smoke.js`, the contract checks, and the Cypress preview-readiness spec.

Green proof:
- `npm run arch:doc-check` passes.
- The diagram count of scripts matches `ls scripts/v2-*-check.js`.

Happy:
- A reviewer chooses the right test layer for a new behavior.

No-happy:
- A new `v2-*-check.js` script is added without being placed in the pyramid; coverage check flags it.

Size: S. Depends on: A3.1, A3.2.

### A3.4 — Dependency-direction policy

**Given** Clean-Architecture-style dependency direction emerged naturally in v2,
**When** a reader reads §5.4,
**Then** they see an explicit policy: pages depend on hooks and api.ts; api.ts depends on the Firebase singleton; the Firebase singleton must not import from `src/v2/*`; `observationTypes.ts` must not import from any of the above.

Red spec:
- Add `scripts/arch-dependency-direction-check.js` that runs grep-based static checks for forbidden imports: `src/components/Firebase/*` must not import from `src/v2/*`; `src/v2/lib/observationTypes.ts` must not import from `firebase` or any `src/v2/lib/api.ts`; `src/v2/pages/*` must not import directly from `src/components/Firebase/*` (only via the bridge).

Green proof:
- Static checks pass.
- §5.4 documents the policy and points at the script.

Happy:
- A new page that tries to import the Firebase singleton directly is rejected at PR review.

No-happy:
- A future refactor that adds `src/components/Firebase/Firebase.tsx -> require('src/v2/lib/api.ts')` is caught.

Size: S. Depends on: A3.1.

### A3.5 — Component-doc freshness check

**Given** code drift can leave diagrams stale,
**When** any file under `src/v2/lib/api.ts`, `src/v2/lib/firebase.ts`, `src/v2/lib/observationTypes.ts`, or `firestore.rules` changes,
**Then** the freshness check verifies that every diagram box still maps to a live name.

Red spec:
- Extend `scripts/arch-doc-required-sections.js` to walk Mermaid blocks and assert each labeled box matches a file or symbol that exists today.

Green proof:
- Check is green for §5.1, §5.2, §5.3.

Happy:
- A renamed export breaks the diagram check before it breaks production.

No-happy:
- Stale boxes are caught at PR time, not at audit.

Size: S. Depends on: A3.1, A3.2, A3.3.

Goal A3 Done means:

- 3 Component diagrams (data adapter, rules, test pyramid) live in `.chalk/CHALK-2-ARCHITECTURE.md` §5.
- Dependency-direction policy is enforced by a static check.
- Diagram freshness is locked to live code paths.

---

## 6. Goal A4 — Sequence & Behavior Documentation

Outcome: the 4 most complex behavioral flows have sequence diagrams that explain runtime interaction across layers.

Test harness:

- Mermaid sequence diagram lint.
- Cross-link check from sequence steps to `api.ts` function names.

### A4.1 — Sequence: Observation lifecycle (start → draft → complete → BQ)

**Given** the observation flow is the highest-risk legacy-compatibility path,
**When** a reader reads §6.1,
**Then** they see a Mermaid sequenceDiagram showing Coach → V2 page → api.ts (`startObservation`) → Firebase singleton (`handleSession`) → Firestore draft → api.ts (`endObservation`) → Firebase (`endSession`) → Firestore observation doc → Cloud Function (`observationToBQ`) → BigQuery.

Red spec:
- Diagram lint asserts §6.1 contains a Mermaid sequenceDiagram with named participants matching real symbols.

Green proof:
- Diagram lint passes.
- Cross-link check confirms `startObservation`, `endObservation`, `handleSession`, `endSession`, `observationToBQ` all exist by name.

Happy:
- A new engineer can trace "what writes to BigQuery" in one read.

No-happy:
- A removed Cloud Function or renamed export fails the cross-link check.

Size: M. Depends on: A1, A3.1.

### A4.2 — Sequence: Action plan auto-save and send-to-teacher

**Given** auto-save and "send to teacher" are the most user-visible plan flows,
**When** a reader reads §6.2,
**Then** they see a sequenceDiagram covering edit → debounced save (`saveActionPlanField`) → Firestore update → comment add → send-to-teacher (`markActionPlanSentToTeacher`) → email Cloud Function.

Red spec:
- Diagram lint + cross-link as in A4.1.

Green proof:
- Diagram lint passes.
- Each step references a real api.ts export.

Happy:
- A debugger traces a missing comment by following the diagram.

No-happy:
- Replacing the comment subcollection with a denormalized array fails the cross-link.

Size: S. Depends on: A4.1.

### A4.3 — Sequence: Auth, role load, and route gating

**Given** auth and role gating involve both legacy Firebase auth and the v2 `useV2Auth` hook,
**When** a reader reads §6.3,
**Then** they see a sequenceDiagram covering login → `onAuthStateChanged` → `getUserInformation` → `V2PrivateRoute` decision → `V2_PUBLIC_PREVIEW` flag check.

Red spec:
- Diagram lint asserts named participants `Browser`, `Firebase Auth`, `useV2Auth`, `V2PrivateRoute`, `webpack DefinePlugin`. Cross-link to `useV2Auth.ts`, `App.tsx:V2PrivateRoute`, `webpack.config.js` flag entry.

Green proof:
- Diagram lint + cross-link pass.

Happy:
- A reviewer understands why anonymous traffic is denied on `/v2/*` in production.

No-happy:
- A removed `V2_PUBLIC_PREVIEW` env entry without doc update fails the check.

Size: S. Depends on: A1, A3.1.

### A4.4 — Sequence: Preview mode and stub disclosure

**Given** the V2 stubs and preview behavior are governed by both the env flag and the disclosure doc,
**When** a reader reads §6.4,
**Then** they see a sequenceDiagram covering: build with `REACT_APP_V2_PUBLIC_PREVIEW=true` → preview routes accessible to anonymous → stub data NOT shown because the sprint moved all stubs to live empty-state.

Red spec:
- Diagram lint + cross-link to `.env-cmdrc.js`, `docs/CHALK-2-STUBS-DISCLOSURE.md`.

Green proof:
- Diagram lint passes.
- §6.4 references both the env flag and the stubs disclosure doc.

Happy:
- A reviewer answers "what does a logged-out staging visitor see?" without reading code.

No-happy:
- Flipping the production env flag to `true` without doc update is caught by the preview-readiness check (already in place from G1.1).

Size: XS. Depends on: A1.

### A4.5 — Sequence freshness check

**Given** sequence diagrams reference function names by hand,
**When** any function named in §6.* is renamed in the codebase,
**Then** the cross-link check flags it.

Red spec:
- Extend `scripts/arch-doc-required-sections.js` to parse Mermaid sequenceDiagram blocks and assert each participant message references a live symbol.

Green proof:
- Check is green for §6.1-§6.4.

Happy:
- Refactors that rename functions surface the doc update as part of the same PR.

No-happy:
- Silent drift between docs and code is caught at PR time.

Size: S. Depends on: A4.1, A4.2, A4.3, A4.4.

Goal A4 Done means:

- 4 sequence diagrams live in `.chalk/CHALK-2-ARCHITECTURE.md` §6.
- Cross-link check enforces freshness.
- A reviewer can trace any of the 4 complex flows by reading one diagram.

---

## 7. Goal A5 — Capability Alignment Refactor (Optional L2)

Outcome: `api.ts` exports are named by business capability instead of CRUD operation, making the emergent application layer readable as use cases.

This goal touches production code. Skip it if scope pressure is high. Required tests must stay green throughout.

Test harness:

- Existing `scripts/v2-*-check.js` and Cypress smoke must remain green at every step.
- New `scripts/arch-api-capability-naming-check.js` forbids CRUD verbs in `api.ts` exports after the refactor.

### A5.1 — Capability vocabulary definition

**Given** `api.ts` today mixes CRUD verbs (`getX`, `saveY`) with business verbs (`endObservation`, `startObservation`),
**When** the architecture doc reaches §3 layer glossary,
**Then** a sub-section defines the capability vocabulary: `loadX` for read use cases, `commitX` for transactional writes, `recordX` for evented writes, `sendX` for outbound messages, `markX` for state transitions.

Red spec:
- Add `scripts/arch-api-capability-naming-check.js` that asserts the architecture doc §3 includes the vocabulary table. The check fails until the doc is updated.

Green proof:
- Check is green.

Happy:
- A new export to `api.ts` is named consistently from day one.

No-happy:
- The vocabulary is empty or contradictory.

Size: S. Depends on: A1.4.

### A5.2 — Rename `api.ts` exports to capability verbs

**Given** `api.ts` currently exports `getTeachersForCoach`, `getDashboardStats`, `getCoachAttention`, `getRecentActivity`, `getActivePlans`, `getActionPlanFull`, `saveActionPlanField`, `saveActionPlanDraft`, `addActionPlanComment`, `markActionPlanSentToTeacher`, `startObservation`, `endObservation`, `getTrainingRecommendations`,
**When** the refactor lands,
**Then** every export is renamed to a capability verb defined in A5.1.

Red spec:
- Capability naming check fails if any export uses `get`, `save`, `update`, `delete`, `create`, `fetch`, `do`.
- Existing test suite must already be passing before the refactor begins; any breakage during the refactor is a regression to fix immediately.

Green proof:
- Capability naming check is green.
- All existing v2 contract scripts and Cypress smoke remain green.

Happy:
- A reviewer reads `api.ts` and sees a list of business capabilities.

No-happy:
- A leftover `get` export is caught by lint.

Size: L. Depends on: A5.1.

### A5.3 — Update all callsites and tests

**Given** pages, hooks, and check scripts import `api.ts` functions by their old names,
**When** A5.2 renames are applied,
**Then** every callsite is updated and the test suite remains green.

Red spec:
- A grep-based check fails if any file imports an old name from `api.ts`.

Green proof:
- Grep check is green.
- `npm run staging` builds.
- `npm run test` (Cypress) passes against staging.
- Every script in `scripts/v2-*-check.js` that references `api.ts` functions is updated.

Happy:
- No regression in existing behavior.

No-happy:
- A stale import on a page would be caught before merge.

Size: M. Depends on: A5.2.

### A5.4 — Capability-to-file mapping table in architecture doc

**Given** the renamed exports represent business capabilities,
**When** a reader reads §3,
**Then** a table maps each capability to the file that implements it and the rules path it writes (if any).

Red spec:
- Add a check that §3 contains a capability table covering every export in `api.ts`.

Green proof:
- Check is green.

Happy:
- A product manager can ask "which file handles 'send action plan to teacher'?" and get an answer in 10 seconds.

No-happy:
- A new export without a row in the table fails the check.

Size: XS. Depends on: A5.2.

### A5.5 — Capability-naming lint in CI

**Given** future contributors might revert to CRUD verbs,
**When** any new export is added to `api.ts`,
**Then** the lint forbids `get/set/save/update/delete/create/fetch/do` prefixes.

Red spec:
- Capability lint is wired into `scripts/v2-cypress-ci-check.js`.

Green proof:
- A demo branch that adds `export function getThing` to `api.ts` is rejected.

Happy:
- Capability vocabulary holds over time.

No-happy:
- The lint cannot be silenced without a documented exception in the ADR template.

Size: XS. Depends on: A5.1, A5.2.

Goal A5 Done means:

- `api.ts` exports are named by capability.
- All callsites are updated; full test suite remains green.
- `.chalk/CHALK-2-ARCHITECTURE.md` §3 has the capability table.
- Naming lint runs in CI.

---

## 8. Goal A6 — Hexagonal/Clean Formalization (Out of Scope for CHALK 2.0)

This goal is included for completeness only. **Do not execute it inside the current $20K engagement.** It is the work that a CHALK 3.0 greenfield rewrite would require.

Outcome: `src/v2` is restructured into formal domain / application / infrastructure folders with ports as TypeScript interfaces and adapters as separate classes.

### A6.1 — Decision: is A6 worth doing for CHALK 2.0?

**Given** the V2 sprint produced an emergent layered architecture that already exhibits SOLID/Hexagonal characteristics,
**When** the team considers a formal restructure,
**Then** ADR-0004 is written to capture the decision (almost certainly: "Not in CHALK 2.0; revisit if a CHALK 3.0 greenfield is funded").

Red spec:
- ADR shape check requires `.chalk/adr/0004-hexagonal-formalization.md` with Status either `Rejected` or `Deferred` for CHALK 2.0.

Green proof:
- ADR exists.
- Decision is explicit and references the cost estimate from §2 of this plan (118-204h).

Happy:
- The team does not silently slide into a refactor.

No-happy:
- A future contributor proposing the refactor without funding is pointed at ADR-0004.

Size: M. Depends on: A2.

### A6.2 — Directory restructure into domain/application/infrastructure

**Given** A6.1 returned a go decision (only if a separate engagement is funded),
**When** the restructure begins,
**Then** `src/v2/domain/`, `src/v2/application/`, and `src/v2/infrastructure/` exist with code moved by responsibility.

Red spec:
- Static check asserts every file in `src/v2/lib/api.ts` use case maps to an `src/v2/application/*` file; every adapter (Firebase, Sentry, etc.) lives under `src/v2/infrastructure/*`; every pure module (`observationTypes`, value objects) lives under `src/v2/domain/*`.

Green proof:
- Static check is green.
- All existing tests remain green after the move.

Happy:
- A new use case has an obvious home.

No-happy:
- Any leftover file in `src/v2/lib/` after the move triggers the check.

Size: XL. Depends on: A6.1.

### A6.3 — Define ports (TypeScript interfaces) for external systems

**Given** the application layer must not depend on concrete Firebase/Cloud Function classes,
**When** ports are introduced,
**Then** `src/v2/application/ports/` defines interfaces for `FirestoreRepository`, `EmailSender`, `AuthGateway`, `ObservationExportPipeline`, and `Logger/Monitoring`.

Red spec:
- Static check asserts every application-layer file depends only on port interfaces, never on `src/v2/infrastructure/*` or on `src/components/Firebase/*`.

Green proof:
- Static check is green.
- Compilation succeeds.

Happy:
- A future swap of Firebase for another backend changes only adapters.

No-happy:
- An application function importing `firebase/firestore` directly is caught.

Size: L. Depends on: A6.2.

### A6.4 — Implement adapters that fulfill the ports

**Given** ports are defined,
**When** adapters are implemented,
**Then** each port has exactly one adapter under `src/v2/infrastructure/`, e.g., `FirebaseFirestoreRepository implements FirestoreRepository`.

Red spec:
- Static check asserts there is exactly one implementation per port and that implementations live only under `src/v2/infrastructure/`.

Green proof:
- Static check is green.
- All v2 tests remain green after wiring adapters via the V2 dependency injection point.

Happy:
- The Firebase-specific code is isolated.

No-happy:
- Two adapters for the same port (without an explicit ADR explaining why) fails the check.

Size: XL. Depends on: A6.3.

### A6.5 — Migrate `api.ts` functions to use cases that depend on ports

**Given** ports + adapters exist,
**When** use cases are written,
**Then** each use case in `src/v2/application/use-cases/` accepts its dependencies via constructor / function parameters and does not import from `src/v2/infrastructure/*`.

Red spec:
- Static check asserts that no file in `src/v2/application/use-cases/` imports from `src/v2/infrastructure/*` or from any `firebase` package.

Green proof:
- Static check is green.
- The v2 dependency injection composition root wires use cases with concrete adapters at app boot.

Happy:
- Use cases are testable with in-memory adapters.

No-happy:
- A use case bypassing the port directly to Firebase is caught.

Size: XL. Depends on: A6.4.

Goal A6 Done means:

- `src/v2` is restructured into domain/application/infrastructure with formal ports and adapters.
- All existing acceptance tests still pass.
- Use cases are individually testable without Firebase.
- **This goal must only be executed under a separate CHALK 3.0 engagement.**

---

## 9. Tooling Baseline

| Concern | Recommended tooling | Rationale |
|---|---|---|
| Diagram language | Mermaid embedded in Markdown | GitHub renders inline; no extra build step; works in the existing markdown tooling. |
| C4 specifics | Mermaid `C4Context` / `C4Container` / `C4Component` blocks, or plain `flowchart` if the C4-Mermaid extension is fragile | Avoids PlantUML server dependency. |
| ADR format | Michael Nygard template (Title, Status, Context, Decision, Consequences) | Industry standard, short, machine-checkable. |
| ADR location | `.chalk/adr/NNNN-title.md` | Sibling of decision-log; co-located with other planning artifacts. |
| Doc lint | Node scripts under `CoachingApp/scripts/arch-*.js` | Matches the existing pattern of `scripts/v2-*.js`. |
| Diagram lint | `@mermaid-js/mermaid-cli` (`mmdc`) called from the lint script | Same toolchain as GitHub's renderer. |
| CI runner | Add `arch:doc-check` to existing v2 scripted CI manifest | Reuses `scripts/v2-cypress-ci-check.js` pattern. |
| Mermaid C4 fallback | If Mermaid `C4` block proves unreliable, fall back to `flowchart` notation; document the choice in ADR-0005 | Keeps the doc renderable. |

**Constraint**: no new heavyweight tools (Structurizr, Confluence, Lucidchart). The repo must remain self-contained.

---

## 10. Per-Goal Handoff Template

Use this exact format after each architecture-doc goal:

```text
Goal: Ax - <name>
Branch: feature/chalk-2.0-renovation
Base commit: <sha>
Final commit(s): <sha list>
Pushed to: fork only / not pushed
Production code touched: yes/no (must be "no" except for A5 with explicit approval)

Red evidence:
- <command> -> failed as expected because <reason>

Green evidence:
- <command> -> passed
- <command> -> passed

Docs produced:
- <path list>

Diagrams produced:
- <path::section list>

ADRs produced or updated:
- <ADR-NNNN list>

CI hooks added:
- <list>

Reviewer:
- <name; required for goals A1, A2, A5>

Remaining risks:
- <list>
```

---

## 11. Cross-References

| Topic | Source |
|---|---|
| Sprint task plan with G/W/T | `.chalk/CHALK-2-SPRINT-PLAN.md` |
| Prod-readiness backlog | `.chalk/CHALK-2-PROD-READY-GWT-PLAN.md` |
| TDD-goals execution plan | `.chalk/CHALK-2-GOALS-TDD-AUDIT-PLAN.md` |
| Audit package | `.chalk/CHALK-2-AUDIT-PACKAGE.md` |
| Posture A→B context | `.chalk/decision-log.md` (will become ADR-0001 in A2.2) |
| V2 code root | `CoachingApp/src/v2/` |
| Data adapter (subject of A3.1, A5) | `CoachingApp/src/v2/lib/api.ts` |
| Domain module (subject of A1.4) | `CoachingApp/src/v2/lib/observationTypes.ts` |
| Security boundary (subject of A3.2) | `CoachingApp/firestore.rules` |
| Test pyramid scripts (subject of A3.3) | `CoachingApp/scripts/v2-*-check.js` |
| Cypress v2 suite (subject of A3.3) | `CoachingApp/cypress/integration/v2/` |
| BigQuery pipeline (subject of A4.1) | `CoachingApp/functions/observationToBQ/index.js` |
| Stubs disclosure (subject of A4.4) | `docs/CHALK-2-STUBS-DISCLOSURE.md` |
| Staging review guide (subject of §6.4 references) | `docs/CHALK-2-STAGING-REVIEW-GUIDE.md` |
| Release decision artifact | `docs/CHALK-2-RELEASE-DECISION.md` |

---

## 12. Auditor Checklist

Ask the next auditor to answer:

1. Are the 6 goals sequenced so the team can stop after A1, after A2, or after A4 with a coherent artifact?
2. Does every doc task have a Red spec that can fail before the artifact exists?
3. Is the diagram tooling baseline (Mermaid + Node lint) realistic for this repo, or does it require an unstated dependency?
4. Are A1.4 glossary entries cross-linked to real code paths today?
5. Are the 3 proposed ADRs (Posture, strangler-fig, observation types) the right starting set, or are any major decisions missing?
6. Are the 3 C4 L3 zones (data adapter, security boundary, test pyramid) the right targets, or should others be added (e.g., the v2 design tokens layer)?
7. Are the 4 sequence diagrams the right set, or should others be added (e.g., teacher invite flow if implemented)?
8. Is A5 capability rename the right cost/benefit, or should it be deferred to CHALK 3.0?
9. Is A6 correctly marked as out of scope for CHALK 2.0?
10. Are the cross-references in §11 sufficient for an external reader who has never seen the codebase?

Suggested response file:

`.chalk/CHALK-2-ARCHITECTURE-DOC-AUDIT-RESPONSE.md`
