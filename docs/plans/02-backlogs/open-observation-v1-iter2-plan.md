# Open Observation V1 — Iteration 2 (Path Full sin F-7)

> Rebuild plan following Deanna's post-staging feedback. Implements the
> "open notes-first observation" model inside the shared legacy
> `observations/` collection, using explicit Open Observation markers,
> timestamped notes, and minimal results view. **Excludes F-7** (theme
> extraction / reclassification dashboard) which is reserved for a
> separate engagement scope.
>
> Branch: `feature/chalk-2.0-renovation`
> Ticket closure token: `Closes CHALK-OPEN-OBS-V1-ITER2`
> Last updated: 2026-06-12

---

## 0. How to Audit and Decisions

Audit this plan for scope control, data-model safety, and feedback fidelity. A reviewer should answer:

1. Does the plan implement Deanna's asks F-1 through F-5.1 verbatim from the feedback handoff?
2. Does the plan keep F-7 explicitly out of scope (or deferred), so the executor cannot silently extend?
3. Does the marked Open Observation shape in shared `observations/` avoid breaking the legacy BigQuery pipeline?
4. Are timestamped notes implemented with wall-clock time and edit capability (matching the visual spec)?
5. Is the teacher picker scoped by role (not the unbounded admin list from the first iteration)?
6. Does the menu placement remove the Home cards and live under the existing Observation section?
7. Is the snapshot at end-of-session a minimal coach-authored summary (Interpretation A) and not a system-generated digest (B)?
8. Does the plan extend `getUsersLastAction()` / `getUsersActionCounts()` to include Open Observations, OR does it explicitly defer the aggregator update?
9. Are the V2 reuse guardrails preserved (read-only import of `observationTypes.ts` removed since Magic 9 picker is gone)?

### Decisions

#### Decision A — Shared `observations/{id}` collection with Open Observation markers

> **SUPERSEDED 2026-06-12 by user direction.** The actual implementation uses
> the shared `observations/{id}` collection with marker fields
> (`openObservation: true`, `observationMode: 'open'`, `type: 'OpenObservation'`).
> The BigQuery skip guard at `functions/observationToBQ/index.js:53` was
> confirmed to handle these markers. See
> [`open-observation-v1-iter2-handoff.md`](../03-progress/open-observation-v1-iter2-handoff.md)
> for the execution record.

Status: Superseded and replaced on 2026-06-12 after user clarification.

Context: Deanna's feedback removes the Magic 9 type picker (F-1, F-2) and asks for timestamped notes (F-3). The earlier iter2 plan proposed a separate `openObservations/` collection to isolate the shape from the legacy BigQuery pipeline. The user clarified that all observations must remain together.

Decision: Open Observation writes to the shared Firestore collection `observations/{id}`. Each Open Observation doc is distinguished with `openObservation: true`, `observationMode: open`, and `type: OpenObservation`; it also keeps legacy-compatible `teacher` and `observedBy` path strings. The BigQuery trigger remains untouched and skips docs with these Open Observation markers.

Consequences:
- Positive: all observation records stay together in the product data model.
- Positive: existing dashboards can classify Open Observation from the existing `observations` query without extra collection reads.
- Positive: Firestore rules can still scope marked Open Observation docs inside the shared `observations/{id}` match.
- Negative: the doc carries compatibility fields that are not part of the user-facing Open Observation concept. These are intentional integration markers, not Magic 9 choices.

#### Decision B — No Magic 9 type at any point in the V1 flow

Status: Accepted.

Context: F-1 + F-2 + the `One More Thing Conversation.md` philosophy ("smartphone-like, reduce cognitive load") all point to removing the Magic 9 picker from start AND end.

Decision: Open Observation does not store any Magic 9 type. The shared `observations/` documents store only the sentinel `type: OpenObservation` for integration/rules/BQ-skip purposes; it is not a Magic 9 dimension assignment. The first iteration's `selectedTypeCode` and `selectedFinalTypeCode` UI states are deleted.

Consequences:
- Positive: matches Deanna's intent and the product philosophy.
- Positive: no read-only cross-tree dependency on `src/v2/lib/observationTypes.ts` (the import can be removed).
- Negative: F-7 (theme extraction → CLASS dimension mapping) is the eventual successor of "type assignment". This iteration defers F-7 entirely.

#### Decision C — Snapshot is a coach-authored summary (Interpretation A)

Status: Accepted for this iteration.

Context: F-6 (snapshot) had three plausible interpretations in the feedback handoff. Without Deanna's verbatim text, we pick the lowest-risk option that is recognizably a snapshot.

Decision: At end of session, the coach is prompted with one optional text field "Summary of what you observed". If they fill it, it stores as `snapshot.coachSummary` on the doc. If they skip it, the field is absent. No system-generated digest, no extracted themes.

Consequences:
- Positive: cheap to build, hard to get wrong.
- Negative: if Deanna's verbatim text turns out to mean a system-generated digest (Interpretation B), this needs a follow-up. Documented as known divergence.

#### Decision D — F-7 explicitly out of scope

Status: Accepted.

Context: F-7 (theme extraction / CLASS dimension mapping / reclassification dashboard) is estimated at 30-50h. The Path Full sin F-7 scope is 24-40h. The original $400 quote covered the first iteration; the rebuild is a new conversation.

Decision: This plan implements the data model and UI surfaces that would later host F-7, but no extractor, no dashboard. Results page in OB2-5 is a read-only viewer of saved snapshots + notes, not an analytical view.

Consequences:
- Positive: clear scope boundary.
- Positive: F-7 can be a clean follow-up engagement when CHALK secures budget.
- Negative: Deanna may interpret "results" as the F-7 dashboard. Disclose at staging review.

#### Decision E — Teacher picker scoped by role

Status: Accepted.

Context: B-2 in the feedback handoff. Admin sees all teachers via legacy `getTeacherList()`. This is a privacy concern independent of the rebuild.

Decision: Open Observation calls a new method `firebase.getOpenObservationTeacherList(uid)` that scopes by acting user's assigned teachers regardless of role. Admin must explicitly switch into "act as coach X" elsewhere to observe teachers under that coach's scope; this is the same approach legacy uses for other workflows.

Consequences:
- Positive: closes the leakage at the source.
- Positive: keeps the legacy `getTeacherList()` untouched (other consumers of it keep working).
- Negative: a new method on Firebase singleton — additive only.

#### Decision F — Menu placement under Magic 8 Menu

Status: Accepted.

Context: B-1 in the feedback handoff. First iteration added Home cards (4 for coach/admin/program leader/site leader). Plan called for "button inside existing observation tools/menu area" — interpretation diverged.

Decision: Open Observation appears as a card in the existing Magic 8 Menu page (`Magic8MenuPage.tsx` or equivalent host), alongside the 9 standard observation tools. Home cards from OB-4 are removed.

Consequences:
- Positive: matches Deanna's verbatim placement intent.
- Positive: Home regains its prior layout.
- Negative: requires identifying the exact host file. Codex must grep `Magic8` in `src/views/protected/` and confirm.

#### Decision G — Aggregator extension is in scope

Status: Accepted.

Context: Open Observation docs now live in `observations/`, so the aggregators must classify marked docs separately from standard Magic 9 observations.

Decision: OB2-5 extends both aggregators to count docs with `openObservation === true` or `observationMode === open` as action source "Open Observation" while continuing to count all other `observations` docs as standard observations.

Consequences:
- Positive: feature shows up in the Action Breakdown column Deanna already uses for engagement tracking (`Usage Data - Edited.xls`).
- Positive: no additional collection queries are needed.
- Negative: `Firebase.tsx` must preserve the distinction between standard observations and Open Observation markers. Bounded by an explicit contract test.

#### Decision H — Bypass legacy TeacherModal for Open Observation entry

Status: Accepted (added 2026-06-12 after pre-execution audit).

Context: The pre-execution audit at `docs/plans/03-progress/open-observation-v1-iter2-preexec-audit.md` §1 surfaced that the existing Observation flow forces users through `HomeViews/TeacherModal` BEFORE landing on `/Magic8Menu`. That modal calls legacy unbounded `getTeacherList()`. If Open Observation is merely added as a 10th card in `ToolIcons`, the unscoped picker still appears first — defeating Decision E.

Decision: the Open Observation card in `ToolIcons.tsx` (rendered by `Magic8MenuPage`) navigates directly to `/OpenObservation`. It does NOT pre-select a teacher via `TeacherModal`. The new scoped picker (`getOpenObservationTeacherList(uid)` per Decision E) lives inside `OpenObservationPage` and is the only picker the user sees.

Consequences:
- Positive: closes the unbounded-list leak end-to-end.
- Positive: keeps the rest of the Magic 8 Menu flow untouched (other tools still use TeacherModal).
- Negative: Open Observation has a slightly different UX from the other 9 tools (no pre-select, picker appears inside the tool). This is intentional and matches Deanna's visual spec.
- Implementation guidance: the new card must wire `onClick={() => history.push('/OpenObservation')}` directly, NOT trigger the modal flow that other cards use.

#### Decision I — Scoped read access, no admin read-all in iter2

Status: Accepted (added 2026-06-12 after pre-execution audit).

Context: The pre-execution audit §5 flagged that OB2-1 originally said "admin can read all" in the rules block. Deanna's feedback explicitly says no one should see programs they don't have access to. CHALK does not currently model program-scoped admins, so a global admin read rule contradicts the privacy intent.

Decision: the shared `observations/{id}` rules block applies the following stricter allow cases only when a doc is marked as Open Observation:
- `create`: signed-in user IS the owner coach (`coachId == request.auth.uid`).
- `read`: signed-in user IS the owner coach OR the teacher of the session (`teacherId == request.auth.uid`).
- `update`: signed-in user IS the owner coach.
- `delete`: denied (archive via status field, no hard delete in iter2).
- All other reads/writes denied. **No admin/leader read-all rule.**

Admin and program-leader access to Open Observation data is **deferred** to a follow-up engagement where program-scoped membership can be properly modeled.

Consequences:
- Positive: most conservative interpretation of Deanna's privacy feedback.
- Positive: rules are simple and emulator tests are straightforward.
- Negative: admin cannot review Open Observations from staging until the follow-up rules work lands. **Mitigation**: document this as a known limitation in the iter2 handoff + staging review notes.

### User-approved defaults retained

| Default | This iteration |
|---|---|
| UI style | Legacy MUI 4 |
| Entry point | Magic 8 Menu (revised from "Home cards" of iteration 1) |
| Magic 9 picker | **Removed entirely** (revised from "required at end") |
| Free-form scope | **All notes free-form; no per-type variation** |
| Timer | Wall-clock based; each note carries `HH:MM AM/PM` |
| Draft persistence | `localStorage` per session ID |
| Branch | Continue on `feature/chalk-2.0-renovation` |
| Push | Fork only |
| Deploy | No production deploy; staging only on explicit later request |

### Open questions surviving this plan

1. **Should `classroom` field be added to the user Firestore schema?** The visual spec for the teacher picker shows `School Name — Class Name`. If users today lack a `classroom` field, the subtitle shows `—` until backfilled. Codex must grep and report.
2. **Snapshot field shape**: this plan assumes a single `coachSummary: string`. If Deanna meant "snapshot of notes" (system-generated), this is wrong but documented as Interpretation A in §0 Decision C.

---

## 1. TDD Operating Rules

This plan inherits the operating rules from `docs/plans/02-backlogs/goals-tdd-audit-plan.md` §1 by reference. Do not duplicate or weaken them during execution.

Test harness layers used in this iteration:

| Layer | Use for | Location |
|---|---|---|
| Firestore rules emulator | Allow/deny on marked Open Observation docs in shared `observations/{id}` | `scripts/v1-open-observation-iter2-rules-check.js` + emulator config |
| Contract scripts | Schema shape of marked Open Observation docs, aggregator integration | `scripts/v1-open-observation-iter2-collection-contract-check.js`, `scripts/v1-open-observation-iter2-aggregator-check.js` |
| Cypress E2E | Authenticated picker → notes → end → results flow | `cypress/integration/v1/open-observation-iter2-flow.ts` |
| Build checks | `npm run staging` passes | n/a |
| Manual evidence | School/Class subtitle visual at staging, snapshot save flow | screenshots |

Required check scripts (exact names; reference them in Red specs):

- `scripts/v1-open-observation-iter2-rules-check.js`
- `scripts/v1-open-observation-iter2-collection-contract-check.js`
- `scripts/v1-open-observation-iter2-notes-shape-check.js`
- `scripts/v1-open-observation-iter2-teacher-scope-check.js`
- `scripts/v1-open-observation-iter2-aggregator-check.js`
- `scripts/v1-open-observation-iter2-placement-check.js`

Required Cypress spec:

- `cypress/integration/v1/open-observation-iter2-flow.ts`

---

## 2. Goal Outcome

A coach (or scoped admin/leader) navigates from the Magic 8 Menu to Open Observation, picks a teacher from their assigned roster (with school + classroom shown), records free-form timestamped notes during the session, optionally edits any note, optionally writes a coach summary at end, and saves a marked document to the shared `observations/{id}` collection. The new document flows into legacy "Last Action" and "Action Count" aggregators so dashboards remain consistent. No Magic 9 pickers are present at any point. No production code changes outside V1 legacy code paths.

---

## 3. Tasks

### OB2-1 — Shared `observations/` contract + Firestore rules + fixtures

**Given** all CHALK observation records must stay in the shared `observations/` collection,
**When** Open Observation iteration 2 saves a session,
**Then** the document lands in `observations/{id}` with explicit Open Observation markers, timestamped notes, an optional snapshot, and rules that enforce coach ownership and scoped access for marked docs.

Red spec:
- New `scripts/v1-open-observation-iter2-rules-check.js` asserts that `firestore.rules` includes Open Observation-specific logic inside the shared `observations/{id}` block per **Decision I** (scoped read access, no admin read-all):
  - `create`: signed-in user is owner coach (`coachId == request.auth.uid`).
  - `read`: signed-in user is owner coach OR teacher of session.
  - `update`: signed-in user is owner coach.
  - `delete`: denied.
  - All other access denied (no admin/leader rule).
- New `scripts/v1-open-observation-iter2-collection-contract-check.js` asserts that the schema includes `coachId`, `teacherId`, `start`, `end`, `notes` (array), `snapshot` (optional), and `status` (in `'in_progress' | 'completed' | 'archived'`).
- Both checks fail until the rules block and a documented schema (in this plan or a sibling JSON) exist.

Green proof:
- Rules emulator runs allow/deny per the criteria above and is green.
- Contract script is green.
- `npm run staging` builds.

Happy:
- An assigned coach creates an open observation and reads it back.
- The teacher of that session can read it.

No-happy:
- An unrelated coach cannot read or write.
- An admin (without being owner-coach or teacher) cannot read — confirms Decision I.
- A program leader (without being owner-coach or teacher) cannot read — confirms Decision I.
- Anonymous cannot read or write.
- A malformed payload (missing `notes` array or wrong-shape `start`) is rejected.
- A hard-delete attempt by any role is denied.

Size: M. Estimated hours: 6-8h. Depends on: none.

---

### OB2-2 — Teacher picker rework (school+classroom subtitle, role-scoped)

**Given** the first iteration uses `firebase.getTeacherList()` which returns all teachers for admin role, and the picker shows only first/last name,
**When** a coach (or scoped admin/leader) opens the picker,
**Then** they see only teachers within their assigned scope, each row showing first+last name AND a `School — Classroom` subtitle.

Red spec:
- New `scripts/v1-open-observation-iter2-teacher-scope-check.js` greps `OpenObservationPage` source for `getTeacherList()` and fails until the legacy unbounded call is replaced. Asserts that `getOpenObservationTeacherList(uid)` (or equivalent scoped name) appears in `Firebase.tsx`.
- Cypress test `cypress/integration/v1/open-observation-iter2-flow.ts` asserts the picker rendering includes a subtitle DOM element per row (selector `.open-obs-teacher-school` or equivalent).

Green proof:
- Both scripts green.
- Manual QA: log in as admin on staging, open picker, verify scoped subset.
- Manual QA: subtitle renders for teachers whose user doc has `classroom`; renders `—` for teachers whose doc lacks the field. Codex MUST grep + report which case applies.

Happy:
- Coach sees their assigned teachers with school + classroom.
- Admin sees a scoped list (TBD: whose? Codex documents the chosen rule in §0 Decisions of the handoff).

No-happy:
- Unrelated admin does not see teachers outside their assigned scope.
- Picker does not load the full 615-user dataset.

Size: M. Estimated hours: 4-6h. Depends on: OB2-1.

---

### OB2-3 — Magic 8 Menu placement + TeacherModal bypass + remove Home cards + remove Magic 9 pickers

**Given** the first iteration added Home cards for 4 roles, required Magic 9 selection at start + end, and the existing Observation flow forces all tools through `HomeViews/TeacherModal` (which uses unbounded legacy `getTeacherList()`),
**When** the iteration 2 entry surfaces,
**Then** Open Observation appears as a card in `src/components/ToolIcons.tsx` (rendered by `Magic8MenuPage`), the Home cards are removed entirely, no Magic 9 picker appears in the flow, AND the Open Observation card navigates directly to `/OpenObservation` bypassing `TeacherModal` per **Decision H**.

Red spec:
- New `scripts/v1-open-observation-iter2-placement-check.js` asserts:
  - The Open Observation card markup exists in `src/components/ToolIcons.tsx` for observation mode only (NOT practice mode, NOT training mode).
  - The card's onClick navigates directly to `/OpenObservation` (regex: `history.push\(['"]/OpenObservation['"]\)` or equivalent React Router pattern). It MUST NOT delegate to the legacy `TeacherModal`-based teacher pre-selection.
  - `HomePage.tsx` does NOT contain any Open Observation card markup or `OpenObservationIcon` import.
  - `OpenObservationPage.tsx` does NOT contain `selectedTypeCode`, `selectedFinalTypeCode`, `OPEN_OBSERVATION_TYPE_OPTIONS`, `getOpenObservationStoredType`, or any final-alignment dialog code.
  - `OpenObservationPage.tsx` does NOT import from `src/v2/lib/observationTypes.ts` or from `openObservationTypes.ts` if that file remains.

Green proof:
- All negative assertions pass.
- `npm run staging` builds.
- Manual QA: visit /Home → no Open Observation card. Visit /Magic8Menu in observation mode → Open Observation card present as 10th card. Click → navigates straight to `/OpenObservation` without TeacherModal appearing first.

Happy:
- Coach navigates Magic 8 Menu (observation mode) → Open Observation card → directly into `/OpenObservation` → scoped teacher picker renders.

No-happy:
- Home still has Open Observation cards (failure).
- Any Magic 9 picker control surfaces (failure).
- TeacherModal appears between the Magic 8 Menu click and the Open Observation page (failure — Decision H violated).
- Open Observation card appears in practice or training mode of Magic 8 Menu (failure — out of scope).

Size: M. Estimated hours: 4-6h. Depends on: OB2-2.

---

### OB2-4 — Timestamped notes data model + UI editor + localStorage draft

**Given** Deanna's visual spec at `../../sources/01-open-observation-feedback/timestamped-notes-spec.png` shows a `Time | Notes` table with wall-clock timestamps, edit pencils per row, and a `New Note` input with `+` button,
**When** a coach records notes during a session,
**Then** each note is added with wall-clock time `HH:MM AM/PM`, editable post-creation, persisted in `localStorage` until session end, and saved as an ordered array on the marked `observations/{id}` document.

Red spec:
- New `scripts/v1-open-observation-iter2-notes-shape-check.js` asserts:
  - The notes state in `OpenObservationPage.tsx` is an array, not a string.
  - Each note in the saved doc carries `id`, `wallClockAt`, `text`, and optionally `editedAt`.
  - The legacy `firebase.handlePushNotes(string)` is NOT called in the Open Observation save path.
- Cypress test asserts: type a note → see it in the table with current wall-clock time → click pencil → edit → see `(edited)` indicator or updated text → add a second note → both persist after refresh.

Green proof:
- All scripts green.
- Cypress acceptance covers happy path.
- Manual QA: lose network mid-session, refresh, recover draft from localStorage.

Happy:
- Coach records 3 notes, edits one, refreshes, all 3 survive.

No-happy:
- A blank "New Note" submission is rejected (no empty note inserted).
- Corrupt localStorage draft is cleared without crashing the page.

Size: L. Estimated hours: 8-10h. Depends on: OB2-3.

---

### OB2-5 — End-session snapshot + minimal results read view + aggregator extension

**Given** Open Observation docs are marked inside the shared legacy `observations/` collection,
**When** a coach ends a session,
**Then** they are prompted with one optional "Summary of what you observed" field, the document is saved to `observations/{id}` with `status: 'completed'`, a simple results page renders the saved snapshot + notes read-only, and `getUsersLastAction()` + `getUsersActionCounts()` classify marked docs as Open Observations.

Red spec:
- New `scripts/v1-open-observation-iter2-aggregator-check.js` asserts:
  - `Firebase.tsx` `getUsersLastAction()` classifies marked docs from the existing `observations` query as `Open Observation`.
  - `Firebase.tsx` `getUsersActionCounts()` increments `entry.openObservations` for marked docs from the existing `observations` query.
  - The action label `'Open Observation'` is exposed somewhere in the legacy enum used by the Action Breakdown column.
- Cypress test asserts: end session → snapshot prompt → enter "kids responded well to the song" → save → results page shows the snapshot + the notes timeline read-only.

Green proof:
- Aggregator script green.
- Cypress acceptance green.
- Manual QA on Teacher Profile in staging: Action Breakdown column reflects the new "Open Observation" count.

Happy:
- Coach ends session, fills snapshot, sees results page, closes, refreshes, results still there.
- Coach skips snapshot, save still works, results page renders without snapshot section.

No-happy:
- A session in `in_progress` does not appear in aggregators.
- An archived session does not appear in counts.

Size: L. Estimated hours: 8-12h. Depends on: OB2-4.

---

## 4. Done means

- All 5 OB2 tasks closed with red/green evidence in commits.
- Cypress acceptance suite passes against staging with seeded data.
- All 6 contract scripts in §1 are green via `npm run staging` and `node scripts/v1-open-observation-iter2-*.js`.
- Rules emulator allow/deny scenarios all pass.
- Teacher Profile + All Users Action Breakdown columns include Open Observation as a recognized action.
- No code outside V1 legacy paths touched (`src/v2/`, `.firebaserc`, `functions/.env`, `firestore.rules` except for the new block).
- `docs/plans/03-progress/open-observation-v1-iter2-handoff.md` exists with per-task red/green commands, commit shas, and remaining risks.
- Staging deploy hosting-only on explicit user request (not automatic).

---

## 5. Risks

| Risk | Mitigation |
|---|---|
| Aggregator extension introduces N+1 queries on Teacher Profile | OB2-5 contract test must measure and document query count vs baseline |
| `classroom` field missing from user docs causes empty subtitles | OB2-2 displays `—` as graceful fallback; backfill is a CHALK admin task, not in scope |
| Magic 8 Menu host file is not where Codex assumes | OB2-3 starts with a grep + report step before changes |
| Cypress E2E flaky due to seeded-login dependency | Mirror the iteration 1 handoff residual risk; document if it persists |
| New rules introduce a security gap not caught by the 4 emulator assertions | Add at least 2 extra denial scenarios (cross-program leader, cross-coach) |
| F-7 expectations leak from Deanna during staging review | Disclose `§0 Decision D` verbatim in T10.2-equivalent review notes |

---

## 6. Reference cross-links

| Topic | Source |
|---|---|
| Original requirement (iteration 1) | `docs/plans/03-progress/next-v1-requirement.md` |
| Iteration 1 plan | `docs/plans/02-backlogs/open-observation-v1-plan.md` |
| Iteration 1 handoff | `docs/plans/03-progress/open-observation-v1-handoff.md` |
| Feedback audit driving this iteration | `docs/plans/03-progress/open-observation-deanna-feedback-handoff.md` |
| Operating rules (TDD) | `docs/plans/02-backlogs/goals-tdd-audit-plan.md` §1, §9 |
| Sizing legend + dependency-matrix format | `docs/plans/02-backlogs/prod-ready-gwt-plan.md` |
| Deanna visual spec — teacher picker | `../../sources/01-open-observation-feedback/teacher-picker-spec.png` |
| Deanna visual spec — timestamped notes | `../../sources/01-open-observation-feedback/timestamped-notes-spec.png` |
| Product philosophy | `../../sources/01-open-observation-feedback/one-more-thing-conversation.md` |
| Legacy session API | `src/components/Firebase/Firebase.tsx:444` `getTeacherList`, `:1026` `handleSession`, `:1057` `endSession` |
| Action Breakdown column shape (existing) | `Firebase.tsx:4777` `getUsersLastAction()`, `:4875` `getUsersActionCounts()` |

---

## 7. Audit Checklist

Ask the next auditor to answer:

1. Does the plan keep F-7 explicitly out of scope, with a documented divergence path for when it returns?
2. Does the new collection schema cover the timestamped-notes contract from the visual spec?
3. Are role-scoping rules tightened enough on the new collection that admin cannot see all teachers' Open Observations by default?
4. Does the aggregator extension introduce any performance regression on Teacher Profile?
5. Is the Magic 8 Menu placement correctly identified by Codex before any code change?
6. Is the BigQuery legacy pipeline truly untouched (no read/write to the new collection from `functions/observationToBQ/index.js`)?
7. Does the plan list every existing reference that must be cleaned up (removed `selectedTypeCode`, removed Home cards, removed observationTypes.ts import)?

Suggested response file: `docs/plans/03-progress/open-observation-v1-iter2-audit-response.md`.

---

Last updated: 2026-06-12
