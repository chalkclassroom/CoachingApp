# CHALK 2.0 — Goals TDD Audit Plan

> Execution plan for attacking the CHALK 2.0 prod-ready gaps as auditable goals.
> This translates `.chalk/CHALK-2-PROD-READY-GWT-PLAN.md` into TDD-ready work
> packages with red/green expectations, happy/no-happy coverage, dependencies,
> and audit checkpoints.
>
> Current reference state: `feature/chalk-2.0-renovation` at `c011e6d34`,
> deployed to authenticated staging at `https://chalk-dev-c6a5d.web.app`.
>
> Last updated: 2026-06-01

---

## 0. How to audit this document

Audit this plan for execution quality. The reviewer should answer:

1. Does every goal have a concrete production or preview outcome?
2. Does every task have Given/When/Then plus red and green proof?
3. Are happy and no-happy paths explicit enough to implement tests first?
4. Are dependencies and scope decisions clear enough to avoid hidden blockers?
5. Are tests assigned to the right layer: rules/emulator, contract, Cypress, CI, or manual evidence?
6. Does the plan protect the user fork and avoid accidental client repo push/deploy?
7. Does the plan preserve the distinction between preview-ready and production-ready?

This document is a child plan of:

- `.chalk/CHALK-2-PROD-READY-GWT-PLAN.md`
- `.chalk/CHALK-2-SPRINT-PLAN.md`
- `.chalk/CHALK-2-AUDIT-PACKAGE.md`

---

## 1. TDD Operating Rules

### Red / Green / Refactor contract

For each task below:

1. **Red:** create or update the failing test/spec/checklist first.
2. **Green:** implement the smallest change that passes that test.
3. **Refactor:** clean implementation without changing behavior.
4. **Evidence:** record command output or screenshot path in the goal handoff.

A task is not done if implementation exists but the red test was never observed failing, unless the task is explicitly marked as documentation-only.

### Happy / no-happy minimum

Every production behavior needs at least:

- **Happy path:** authorized user, valid data, expected workflow succeeds.
- **No-happy path:** unauthorized/wrong-role or invalid/missing data fails safely.
- **Empty path:** no data shows production-safe empty state, not demo data.
- **Refresh path:** persisted workflows survive reload when persistence is promised.

### Test layers

| Layer | Use for | Preferred location / command |
|---|---|---|
| Firestore rules/emulator | allow/deny, cross-program access, write scope | new rules test harness, likely under `CoachingApp/scripts/` or `CoachingApp/cypress/integration/v2/rules-*` if Cypress controls emulator |
| Contract tests | pure mapping, observation type codes, legacy doc shapes, fallback gating | new lightweight node scripts under `CoachingApp/scripts/v2-contract/` unless a TS runner is introduced |
| Cypress E2E | authenticated route flows, UI state, persistence, responsive smoke | `CoachingApp/cypress/integration/v2/*.ts`; `npm run test` or targeted Cypress command |
| Build checks | staging/prod compile, env flags | `npm run staging`, `npm run prod` |
| Manual evidence | only for screen reader, visual QA, or browser behavior hard to automate | screenshots plus checklist; not a substitute for Cypress on Path A/B |
| CI | prevent silent test erosion | `.github/workflows/*` or documented equivalent once tests exist |

### Branch and deploy guardrails

- Work on `feature/chalk-2.0-renovation`.
- Push only to `fork`, not `origin`.
- Do not deploy production unless explicitly instructed.
- Staging deploys should use explicit `--only firestore:rules,hosting` unless a goal specifically approves more.
- Do not commit `.firebaserc` or `functions/.env` unless explicitly requested.

---

## 2. Goal Map

| Goal | Outcome | Main PR refs | Rough effort | Depends on |
|---|---|---|---:|---|
| G1 | Preview-ready staging, honest and safe | PR-0.1, PR-0.2, PR-5.1, PR-5.2, PR-5.3, PR-6.1 | 24-40h | none |
| G2 | Firestore rules posture, fixtures, and write safety foundation | PR-0.3 | 32-48h | G1 route exposure decisions; new decision-log entry required |
| G3 | Observation + action plan canonical data workflows | PR-1.1, PR-1.2, PR-1.3, PR-1.4, PR-3.1, PR-3.2, PR-3.3 | 70-120h scoped / 124-146h full | G2 |
| G4 | Live coach workspace modules | PR-2.1, PR-2.4, PR-2.5, PR-2.6, PR-3.4 | 60-90h | G2, partial G3 |
| G5 | Reports/admin/leader parity or explicit delegation | PR-2.2, PR-2.3, PR-4.1, PR-4.2, PR-4.3, PR-4.4 | 80-160h scoped / ~164h full | G2, G3 decisions |
| G6 | Release hardening and production gate | PR-0.4, PR-5.4, PR-5.5, PR-6.2, PR-6.3 | 35-60h plus legacy Cypress repair if needed | selected release scope from G1-G5 |

Recommended sequence:

```text
G1 -> G2 -> G3 -> G4 -> G5 -> G6
       \      \      \       \      /
        ------ release-scope decisions ------
```

Recommended first execution path:

1. Do **G1** to make staging review honest.
2. Do **G2** before enabling any additional live writes.
3. Choose Path B or Path C before committing to G3-G5 scope.

Sizing notes:

- G3's 70-120h assumes conference plans are delegated/read-only and PR-1.2 is reduced to result-route contract/delegation rather than full V2 result-page parity. Full G3 maps closer to 124-146h.
- G5's 80-160h assumes Path B-style delegation for advanced reports, admin writes, leader dashboards, and non-teacher profiles. Full G5 maps closer to ~164h and may grow if role fixtures reveal legacy gaps.
- G6 assumes the existing Cypress install can run. If the legacy Cypress suite itself is broken, add a separate repair spike before G6.1.

---

## 3. Goal 1 — Preview-Ready Staging

Outcome: staging can be shown for authenticated review without implying preview/local/stub flows are production-complete.

Test harness:

- Cypress route smoke for `/v2/home`, `/v2/teachers`, `/v2/plans`, `/v2/messages`, `/v2/resources`, `/v2/reports`, `/v2/admin`, `/v2/training`, `/v2/account`.
- Grep/contract check for forbidden PII and preview stubs in production mode.
- Manual responsive/a11y smoke with screenshots for selected routes.

### G1.1 — Auth and preview flag safety

**Given** V2 is deployed to staging and may later be built for production,
**When** anonymous users request `/v2/*`,
**Then** they are redirected to login unless an explicit non-production preview flag is enabled.

Red spec:
- Add Cypress/route test expecting anonymous `/v2/home` to redirect or show login, not V2 content.
- Add build/config assertion that `REACT_APP_V2_PUBLIC_PREVIEW=false` for production/staging unless deliberately changed.

Green proof:
- `npm run staging` passes.
- Anonymous route test passes against local/staging target.

Happy:
- Authenticated coach can reach `/v2/home`.

No-happy:
- Anonymous user cannot reach `/v2/home` or `/v2/messages`.

Size: S. Depends on: none.

### G1.2 — Stub disclosure and production-safe fallback gates

**Given** eight V2 pages currently include demo/stub/local fallback state,
**When** staging is prepared for review,
**Then** every stub is either hidden, explicitly disclosed, or gated as preview-only.

Red spec:
- Add a stub inventory check that fails if a known stub source is missing from the disclosure table or appears in production path without gate.
- Add Cypress check that preview-only actions show honest copy or are disabled.

Green proof:
- Stub inventory passes.
- Staging review notes list all preview-only modules.

Happy:
- Reviewer can see what is live versus preview-only.

No-happy:
- Reviewer cannot send a fake message or save fake account settings believing it is durable.

Size: M. Depends on: G1.1.

### G1.3 — Preview review guide

**Given** CHALK or an external reviewer may evaluate staging,
**When** they receive the staging link,
**Then** they also receive a route-by-route guide that labels each feature as live, partial, delegated, or preview-only.

Red spec:
- Documentation check fails if guide does not mention every V2 route in `src/v2/App.tsx`.

Green proof:
- New or updated `.chalk` review guide lists every V2 route and status.

Happy:
- Auditor can follow the guide without verbal context.

No-happy:
- Any route missing from guide blocks signoff.

Size: S. Depends on: G1.2.

### G1.4 — Responsive and accessibility smoke for preview routes

**Given** V2 staging is used for product review,
**When** core preview routes are opened at common viewport sizes,
**Then** no visible overlap, clipped primary controls, inaccessible modal trap, or unreadable contrast issue blocks review.

Red spec:
- Add Cypress viewport smoke covering at least 390x844 and 1440x900 for core routes.
- Add manual a11y checklist template for keyboard/focus smoke.

Green proof:
- Cypress viewport smoke passes.
- Manual checklist includes screenshots/notes for any known limitations.

Happy:
- Route renders and primary controls are visible on mobile and desktop.

No-happy:
- If an unsupported route is visible, it is disclosed or hidden.

Size: M. Depends on: G1.3.

### G1.5 — Staging rollback drill

**Given** staging is already deployed,
**When** V2 staging needs to be rolled back,
**Then** the team can redeploy a known-good tag using the documented command sequence.

Red spec:
- Runbook check fails if rollback tag, target, and command are absent.

Green proof:
- Rollback command is documented with project alias and `--only firestore:rules,hosting`.
- Dry-run review confirms no Functions deploy.

Happy:
- Known-good tag can be checked out and rebuilt.

No-happy:
- If tag is missing, deployment is blocked.

Size: S. Depends on: G1.1.

Goal 1 Done means:

- Preview-ready definition is satisfied.
- All preview-only modules are disclosed.
- Staging can be reviewed without claiming prod-readiness.
- No production code changes are required unless gates reveal unsafe behavior.

---

## 4. Goal 2 — Firestore Rules Posture, Fixtures, and Write Safety Foundation

Outcome: no new V2 live write is enabled without explicit allow/deny tests.

Important posture note: this goal supersedes the 2026-05-28 Posture A decision in `.chalk/decision-log.md`, which retained the auth-only wildcard during the V2 sprint. G2 cannot pass meaningful denial tests while that wildcard grants broad authenticated writes. Before G2.3-G2.5, create a new decision-log entry that either narrows/removes the wildcard for V2 paths or explicitly declares G2 blocked.

Test harness:

- Emulator-backed rules tests.
- Fixture users for coach, teacher, admin, program leader, site leader, unrelated coach, anonymous.
- Data fixtures for same-program and cross-program resources.

### G2.1 — Rules posture decision and inventory manifest

**Given** V2 planned denial tests conflict with the current auth-only wildcard retained by Posture A,
**When** G2 begins,
**Then** the team records a new rules posture decision and creates an explicit inventory manifest for every V2 read/write path before writing allow/deny tests.

Red spec:
- Decision-log check fails if `.chalk/decision-log.md` has no new entry superseding or constraining Posture A for V2 paths.
- Inventory check fails if any `createV2Api()` write function in `CoachingApp/src/v2/lib/api.ts` is missing from the manifest.

Green proof:
- New decision-log entry exists with context/resolution/rationale for narrowing/removing the wildcard or declaring G2 blocked.
- Inventory manifest exists at `.chalk/CHALK-2-V2-RULES-INVENTORY.md` with columns: API function, Firestore path, operation, allowed roles, denied roles, fixture IDs, release status, test file.

Happy:
- Each enabled write has a matching rule requirement and fixture row.

No-happy:
- Unknown write path or unresolved wildcard posture blocks implementation.

Size: M. Depends on: G1.

### G2.2 — Test fixtures and emulator allow/deny harness

**Given** G2-G5 depend on stable coach, teacher, admin, leader, same-program, cross-program, and anonymous test identities,
**When** rules and E2E tests run locally,
**Then** they use repeatable seeded fixtures and an emulator allow/deny harness rather than ad hoc production data.

Red spec:
- Fixture availability test fails until seeded fixture users/resources exist for coach, teacher, admin, program leader, site leader, unrelated coach, anonymous, same-program resource, and cross-program resource.
- First allow/deny test fails for anonymous write to a protected V2 path.

Green proof:
- Fixture seed script and fixture manifest exist, referenced from `.chalk/CHALK-2-V2-RULES-INVENTORY.md`.
- Test fails before rule/harness fix and passes after denial is enforced.

Happy:
- Authorized coach fixture can write own draft.

No-happy:
- Anonymous and unrelated coach fixtures are denied.

Size: L. Depends on: G2.1.

### G2.3 — Observation draft and training status rules

**Given** V2 writes coach-local observation drafts and training status,
**When** an authenticated user writes these fields,
**Then** only the owning user or approved role can read/write the permitted shape.

Red spec:
- Rules tests for owner success, other-user denial, malformed payload denial.

Green proof:
- Tests pass in emulator.

Happy:
- Coach writes own `observationDraft` and training status.

No-happy:
- Coach cannot write another user's draft or arbitrary user fields.

Size: M. Depends on: G2.2.

### G2.4 — Action plan comments and sent-state rules

**Given** V2 action plan comments and sent-to-teacher are planned live writes,
**When** a coach comments or marks a plan sent,
**Then** rules allow only scoped participants and preserve audit metadata requirements.

Red spec:
- Rules tests for same-program coach success, unrelated coach denial, teacher visibility rules, malformed comment denial.

Green proof:
- Emulator tests pass.

Happy:
- Assigned coach comments on assigned plan.

No-happy:
- Unrelated coach cannot comment or mark sent.

Size: M. Depends on: G2.2.

### G2.5 — Messaging/admin/report write gates

**Given** messaging, admin, and report writes are not all ready for production,
**When** their routes remain visible or partially visible,
**Then** unsupported writes are denied by rules and hidden/disabled by UI until implementation.

Red spec:
- Rules tests deny message/admin/report writes for unsupported paths.
- Cypress test ensures disabled/preview-only UI does not attempt unsupported writes.

Green proof:
- Denial tests pass and UI avoids unsupported writes.

Happy:
- Read-only preview is safe.

No-happy:
- Direct Firestore write attempt is denied.

Size: M. Depends on: G2.2.

Goal 2 Done means:

- Every enabled V2 write path has allow/deny tests.
- Unsupported write paths fail closed.
- Future goals can add live writes without guessing about permissions.

---

## 5. Goal 3 — Observation and Action Plan Canonical Workflows

Outcome: the two highest-risk live data flows write legacy-compatible data and pass happy/no-happy tests.

Test harness:

- Contract tests for observation type mapping and document shape.
- Emulator/rules tests from G2.
- Cypress E2E for start/draft/complete observation and action plan edit/comment/send.
- Legacy compatibility checks against legacy routes or document fixtures.

### G3.1 — Observation type and canonical payload contract

**Given** legacy observation pipelines expect specific stored type codes and fields,
**When** V2 starts and completes each observation type,
**Then** the generated payload matches the legacy-compatible contract.

Red spec:
- Contract test fails for missing/invalid stored type or required field.

Green proof:
- Contract passes for all supported observation types in `observationTypes.ts`.

Happy:
- Valid type maps to accepted stored type.

No-happy:
- Invalid type is rejected before write.

Size: M. Depends on: G2.

### G3.2 — Observation draft/complete E2E

**Given** a coach is observing a teacher,
**When** they start, draft, refresh, and complete an observation,
**Then** draft state persists safely and final completion writes canonical data once.

Red spec:
- Cypress test fails because completion/draft persistence is not fully verified.

Green proof:
- Cypress passes against seeded staging/local emulator data.

Happy:
- Start -> note -> draft save -> refresh -> complete succeeds.

No-happy:
- Completion without required teacher/type/permission fails safely and does not clear draft.

Size: L. Depends on: G3.1, G2.3.

### G3.3 — BigQuery/export compatibility check

**Given** completed observations feed export/BigQuery paths,
**When** a V2-created observation is transformed/exported,
**Then** it is accepted without special casing or data loss.

Source of truth:
- Expected export branches live in `CoachingApp/functions/observationToBQ/index.js`; audit-relevant branches were previously identified around lines 55, 95, 210, 309, and 434. Use that file, not a new invented shape.

Red spec:
- Contract fixture for V2-created observation fails against expected export shape if field missing.

Green proof:
- Fixture transform passes and differences are documented.

Happy:
- V2 observation produces export-compatible row.

No-happy:
- Missing required fields block release.

Size: M. Depends on: G3.1.

### G3.4 — Action plan list/detail/comment/send live flow

**Given** action plans are a core coach workflow,
**When** a coach lists, opens, edits, comments, and sends a plan,
**Then** V2 writes fields legacy can read and teacher visibility state is accurate.

Red spec:
- Cypress test for edit/comment/send fails before implementation is complete.
- Contract test compares V2 write shape to legacy fixture.

Green proof:
- Cypress and contract tests pass.

Happy:
- Assigned coach updates plan and legacy route reads it.

No-happy:
- Unassigned coach cannot update; invalid required fields show safe error and do not corrupt doc.

Size: L. Depends on: G2.4.

### G3.5 — Conference plan release decision

**Given** V2 currently has conference plan cards but no full live workflow,
**When** Path B or Path C is selected,
**Then** conference plans are either delegated/read-only or implemented with the same rules and legacy compatibility as action plans.

Red spec:
- Cypress test fails if visible create/edit controls exist without live implementation or disclosure.

Green proof:
- Controls are hidden/delegated, or full conference plan tests pass.

Happy:
- Existing conference plan opens via supported path.

No-happy:
- User cannot create a fake local-only conference plan in production.

Size: S/L depending on decision. Depends on: G3.4, SI-0.2.

Goal 3 Done means:

- Observation and action plan writes are safe enough for production scope.
- Any remaining conference-plan gap is explicitly delegated or hidden.
- BigQuery/export compatibility is verified before production release.

---

## 6. Goal 4 — Live Coach Workspace Modules

Outcome: coach-facing workspace modules stop being visual-only and either become live or are explicitly delegated/hidden.

Test harness:

- Cypress E2E for messages, teacher profile, resources, training, account.
- Rules tests for any writes.
- Contract tests for resource catalog coverage.

### G4.1 — Messaging backend decision and live thread flow

**Given** V2 messaging currently uses local preview threads,
**When** the user opens a teacher thread and sends a message,
**Then** the message persists in the approved backend schema and respects participant permissions.

Red spec:
- Cypress test sends a message, refreshes, and expects persistence; it fails before live backend wiring.
- Rules test denies unrelated coach access.

Green proof:
- Message persists after refresh and isolation tests pass.

Happy:
- Coach messages assigned teacher and thread updates unread/read state.

No-happy:
- Wrong coach cannot read/write thread; empty inbox shows production-safe empty state.

Size: L. Depends on: G2.5, backend schema decision.

### G4.2 — Teacher profile live data

**Given** teacher profile currently has fallback demo data,
**When** a coach opens `/v2/teachers/:teacherId`,
**Then** identity, plans, observations, and message actions are live or safely empty.

Red spec:
- Cypress test with seeded teacher expects live name/current plan/recent observation; fails if fallback appears.
- Empty teacher fixture expects no fake records.

Green proof:
- Live and empty profile cases pass.

Happy:
- Teacher with data shows correct current plan and recent observation.

No-happy:
- Teacher with no data shows empty state; unauthorized teacher ID denied or delegated.

Size: M. Depends on: G3, G4.1 optional for message button.

### G4.3 — Resources catalog real links

**Given** resources hub currently has static cards,
**When** a user searches and opens any resource category,
**Then** real CHALK assets open with valid links and complete category coverage.

Red spec:
- Contract test compares V2 catalog IDs/categories against expected legacy resource list.
- Link check fails for missing asset URLs.

Green proof:
- Catalog coverage and link checks pass.

Happy:
- User opens a PDF/PPTX/preview from each category.

No-happy:
- Missing asset shows safe error; broken links fail CI/check.

Size: M/L. Depends on: PR-5.5 performance check.

### G4.4 — Training status and recommendation truthfulness

**Given** training cards currently mix static recommendations and local status fallback,
**When** user completes or dismisses training,
**Then** status persists live and recommendation copy truthfully reflects static versus data-driven source.

Red spec:
- Cypress test completes training, refreshes, and expects persisted state.
- Copy check fails if static recommendation claims data-driven logic.

Green proof:
- Completion persists and copy matches source truth.

Happy:
- Coach completes a module and sees completed state after refresh.

No-happy:
- Write denied or network failure shows safe error and does not claim completion.

Size: M. Depends on: G2.3.

### G4.5 — Account settings live or read-only

**Given** account settings currently save preview preferences only,
**When** the account page is visible in production scope,
**Then** editable settings persist live or are made read-only.

Red spec:
- Cypress test fails if save toast appears but data is not persisted.

Green proof:
- Either persistence test passes or UI is read-only with no save action.

Happy:
- User edits supported setting and sees it after refresh.

No-happy:
- Unsupported setting cannot be saved deceptively.

Size: S/M. Depends on: G2.

Goal 4 Done means:

- Coach workspace modules are not pretending to be live.
- Messaging/profile/resources/training/account have either production behavior or explicit delegation.

---

## 7. Goal 5 — Reports, Admin, Leader Parity or Delegation

Outcome: non-coach and advanced workflows are either implemented, read-only, or explicitly delegated to legacy without dead ends.

Test harness:

- Cypress role-based nav and direct-route tests.
- Contract tests for report metrics where implemented.
- Rules tests for admin writes if enabled.

### G5.1 — Role-based navigation and direct-route access

**Given** V2 nav currently shows broad workspace areas,
**When** users with teacher, coach, admin, site leader, and program leader roles log in,
**Then** they see appropriate navigation and direct unsupported routes are denied or delegated.

Red spec:
- Cypress role fixture test fails if unsupported routes are visible or direct access leaks data.

Green proof:
- Role nav and direct access tests pass.

Happy:
- Coach sees coach workspace.

No-happy:
- Teacher or unrelated role cannot access admin-only V2 data.

Size: L. Depends on: G2, release path decision.

### G5.2 — Reports live/delegated contract

**Given** V2 reports are partial,
**When** reports are included in the selected release scope,
**Then** metrics and exports match legacy or advanced reporting is delegated to legacy.

Red spec:
- Contract test compares V2 metric fixtures to legacy expected output.
- Cypress test ensures export/schedule buttons are live or hidden/delegated.

Green proof:
- Metrics match or buttons route to legacy with context.

Happy:
- User opens report summary and gets accurate data.

No-happy:
- Export/schedule cannot produce fake success.

Size: L/XL. Depends on: G3.

### G5.3 — Admin read-only or live writes

**Given** admin writes are high-risk,
**When** admin workspace is included in V2,
**Then** it is either read-only with legacy delegation or fully permissioned with tests.

Red spec:
- Cypress test fails if create/edit/import buttons are visible without live implementation/disclosure.
- Rules tests fail until admin write permissions are scoped.

Green proof:
- Read-only/delegated admin path passes, or full write tests pass.

Happy:
- Admin views real users/programs/sites.

No-happy:
- Coach/teacher cannot access admin data; unsupported write hidden/denied.

Size: L/XL. Depends on: G2, SI-0.4.

### G5.4 — Leader route delegation contract

**Given** leader workflows may remain legacy in Path B,
**When** a leader navigates from V2,
**Then** leader routes preserve context and do not dead-end or expose coach-only data.

Red spec:
- Cypress leader account test fails if route is missing, dead-ended, or unauthorized data appears.

Green proof:
- Delegation or V2 implementation works for leader dashboard/users/teachers/coaches/sites/archive/all-users.

Happy:
- Leader reaches supported dashboard or legacy route.

No-happy:
- Leader-only route is not visible to coach/teacher.

Size: L/XL. Depends on: G5.1.

### G5.5 — Coach/site/program profile delegation contract

**Given** legacy has coach, site, and program profiles beyond teacher profile,
**When** V2 links to those entities,
**Then** each link opens a V2 implementation or legacy route with correct context.

Red spec:
- Cypress link test fails for missing or dead-end profile route.

Green proof:
- Profile route/delegation tests pass.

Happy:
- User opens profile from admin/leader list.

No-happy:
- Unsupported profile link is not rendered as complete V2 behavior.

Size: M/L. Depends on: G5.1, G5.3.

Goal 5 Done means:

- Advanced workflows are honest and role-safe.
- The selected release path has no dead-end routes.
- Any legacy delegation is intentional and tested.

---

## 8. Goal 6 — Release Hardening and Production Gate

Outcome: selected release path can be shipped or withheld based on objective gates.

Test harness:

- Cypress smoke suite in CI.
- `npm run staging` and `npm run prod`.
- Sentry/equivalent error capture with source maps.
- Service worker update/rollback smoke.
- Release checklist artifact.

### G6.1 — Cypress V2 smoke suite and CI wiring

**Given** V2 production readiness depends on repeatable smoke tests and the legacy Cypress suite may not be healthy,
**When** a PR or release-candidate branch is updated,
**Then** the V2 smoke suite runs automatically or a documented blocker prevents release.

Preflight:
- Run a Cypress health check against the existing suite before adding V2 specs. If legacy Cypress is broken, create a separate repair spike and do not hide that work inside G6.1.

Red spec:
- CI/workflow check fails or is absent before wiring.
- Cypress health check or V2 specs fail before route/test fixtures are fixed.

Green proof:
- Cypress health status is documented.
- CI runs V2 smoke or documented local command is accepted only for Path C.

Happy:
- Smoke passes for selected release routes.

No-happy:
- Broken route or auth leak fails CI.

Size: L. Depends on: selected G1-G5 scope.

### G6.2 — Sentry/equivalent with source maps

**Given** production runtime errors must be diagnosable,
**When** V2 is built for production,
**Then** client errors are captured with release ID and readable source-mapped stack traces.

Red spec:
- Controlled staging error does not appear in monitoring or appears minified-only.

Green proof:
- Controlled error appears with release tag and readable stack.

Happy:
- Runtime error in V2 page appears in monitoring.

No-happy:
- Missing sourcemaps blocks Path A/B release.

Size: M. Depends on: SI-0.3.

### G6.3 — Service worker deploy/rollback smoke

**Given** CHALK uses service worker caching,
**When** staging is deployed twice or rolled back,
**Then** browser clients receive a consistent bundle and do not get stuck on stale V2 assets.

Red spec:
- Manual/Cypress browser test documents current stale-cache behavior or missing update prompt.

Green proof:
- Update/reload behavior is observed and documented after deploy and rollback.

Happy:
- User gets updated bundle after deploy.

No-happy:
- Rollback does not leave a broken mixed asset state.

Size: M. Depends on: G1.5.

### G6.4 — Production release checklist

**Given** production deploy should be gated,
**When** release candidate is ready,
**Then** release checklist requires build, rules tests, Cypress, monitoring, rollback tag, release notes, and explicit deploy command.

Red spec:
- Checklist validation fails if any required evidence is missing.

Green proof:
- Checklist artifact is complete for the candidate.

Happy:
- All gates pass and deploy command is reviewed.

No-happy:
- Missing rollback tag or failing rules test blocks deploy.

Size: S. Depends on: G6.1-G6.3.

### G6.5 — Production/no-production decision record

**Given** V2 may be preview-ready before production-ready,
**When** stakeholders ask whether to ship,
**Then** the team has a decision record that states Path A/B/C, included modules, delegated modules, risk acceptance, and rollback owner.

Red spec:
- Decision record check fails if path, included modules, delegated modules, and risk owner are missing.

Green proof:
- Decision record exists before any production deploy.

Happy:
- Stakeholders can see why release is approved or held.

No-happy:
- Ambiguous release status blocks deploy.

Size: S. Depends on: G6.4.

Goal 6 Done means:

- Release candidate is objectively gated.
- Monitoring and sourcemaps exist for Path A/B.
- Rollback and no-go criteria are documented.

---

## 9. TDD Execution Template Per Goal

Use this exact handoff format after each goal:

```text
Goal: Gx - <name>
Branch: feature/chalk-2.0-renovation
Base commit: <sha>
Final commit(s): <sha list>
Pushed to: fork only / not pushed
Deploy: none / staging only / production explicitly approved

Red evidence:
- <command> -> failed as expected because <reason>

Green evidence:
- <command> -> passed
- <command> -> passed

Happy paths covered:
- <list>

No-happy paths covered:
- <list>

Manual evidence:
- <screenshot/checklist path, only if applicable>

Preview/prod disclosure changes:
- <list>

Remaining risks:
- <list>
```

---

## 10. Goal-Level Audit Checklist

Ask the next auditor to answer:

1. Are the six goals sequenced correctly?
2. Does G2 correctly supersede or block on the old Posture A wildcard decision?
3. Are fixtures explicit enough to support G2-G5 without hidden setup work?
4. Are G3 and G5 scoped estimates honest relative to the underlying PR math?
5. Are any TDD red specs too vague to fail before implementation?
6. Are happy/no-happy cases adequate for each goal?
7. Are any tasks too large and should be split before execution?
8. Are Cypress and emulator layers assigned correctly?
9. Does the plan protect against fake demo data reaching production?
10. Does the plan over-rely on manual checks?
11. Are there missing CI/deploy guardrails?
12. Which goal should be started first, and what exact test should be written first?

Suggested response file:

`.chalk/CHALK-2-GOALS-TDD-AUDIT-RESPONSE.md`
