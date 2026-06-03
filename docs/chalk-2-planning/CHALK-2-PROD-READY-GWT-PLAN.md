# CHALK 2.0 — Prod-Ready Pending Scope Plan

> Given/When/Then backlog for an external LLM or human audit.
> Captures what remains to move CHALK 2.0 from authenticated staging preview
> to a production-ready replacement or phased production release.
>
> Current reference state: `feature/chalk-2.0-renovation` at `c011e6d34`,
> deployed to staging at `https://chalk-dev-c6a5d.web.app`.
>
> Last updated: 2026-06-01

---

## 0. Audit Instructions

Audit this document for technical completeness, not pricing. A reviewer should check:

1. Whether any legacy workflow is missing from the prod-ready scope.
2. Whether each Given/When/Then is concrete enough to test.
3. Whether the acceptance criteria are sufficient for production.
4. Whether Firestore rules, privacy, data integrity, accessibility, service worker, and rollback risks are covered.
5. Whether preview-only behavior can accidentally reach real users.
6. Whether first production release should be full replacement or phased coach-workspace release.

### Current V2 State

| Area | Current state |
|---|---|
| Shell / design system | Implemented and deployed to staging |
| Auth bridge | Implemented behind `/v2` private route |
| Coach Home | Live-ish dashboard with fallback data |
| Teachers table | Live-ish list with fallback data |
| Teacher profile | Partial; fallback/profile summary only |
| Observation | Partial; valid stored type picker and draft behavior |
| Action Plan detail | Partial live integration; fallback/local draft behavior |
| Plans workspace | Visual shell for action + conference plans |
| Messages | Preview/local only |
| Resources | Searchable shell; real content not fully wired |
| Reports | Partial metrics shell; exports/details/scheduling not live |
| Admin | Preview shell only |
| Account | Preview preferences only |
| Training | Partial recommendations/completion tracking |

### Definition of Production-Ready

- No production-visible workflow silently falls back to demo data.
- Every visible button either performs the promised action or is intentionally hidden/disabled.
- Firestore reads/writes are scoped by role and tested for allow/deny cases.
- Legacy data pipelines, especially observation export/BigQuery, continue to work.
- Core screens pass desktop/tablet/mobile QA.
- Accessibility and service worker behavior are acceptable for real users.
- Rollback can restore the previous production app quickly.

### Definition of Preview-Ready

Preview-ready is weaker than production-ready. V2 is preview-ready only when:

- `/v2/*` remains authenticated or is deployed on a temporary preview channel with demo-only data.
- Every preview-only module is disclosed before reviewer signoff.
- Demo/fallback rows are fictional and cannot be confused with real CHALK records.
- Buttons that do not perform live writes are labeled, disabled, hidden, or included in the stubs disclosure table.
- The reviewer guide states which flows are live, partial, delegated to legacy, or visual-only.
- Staging can be rolled back without affecting production.

Current assessment: staging is close to preview-ready for an authenticated internal/client review, but it is not production-ready. See Path C in §8 for the rough 24-40h delta from current staging to a clean preview-ready handoff.

### Scope Inputs Before Execution

| ID | Decision needed | Options | Blocks |
|---|---|---|---|
| SI-0.1 | Photo/audio evidence scope | Remove/disable controls for first release, or implement secure media capture/storage | PR-3.3 |
| SI-0.2 | First production release shape | Path A full replacement, Path B coach workspace with legacy delegation, or Path C staging/demo only | All PR prioritization |
| SI-0.3 | Monitoring provider approval | Add Sentry Browser SDK + Cloud Logging review, or define an approved equivalent | PR-6.3 |
| SI-0.4 | Admin risk posture | Read-only V2 admin first, or live create/edit/archive/import | PR-2.2, PR-4.1 |
| SI-0.5 | Results strategy | Build V2 results now, or delegate to legacy result routes with contract tests | PR-1.2, PR-4.3 |

### Sizing Legend

These are rough implementation estimates for planning and audit comparison, not client commitments.

| Size | Nominal effort | Meaning |
|---|---:|---|
| XS | 0.5-1h | Config, copy, small gating, or command documentation |
| S | 2-4h | Narrow code path or one concise artifact |
| M | 6-12h | One meaningful workflow or multi-screen QA slice |
| L | 16-24h | Live integration with rules/tests or several related screens |
| XL | 32-56h | Cross-role or cross-module parity work |

### PR Sizing and Dependency Matrix

| PR | Size | Est. hours | Depends on | Path A | Path B | Path C |
|---|---:|---:|---|---|---|---|
| PR-0.1 | S | 2 | none | Required | Required | Required |
| PR-0.2 | M | 8 | PR-0.1 | Required | Required | Required |
| PR-0.3 | L | 20 | PR-0.1 | Required | Required | Defer unless write paths are previewed |
| PR-0.4 | S | 3 | none | Required | Required | Required |
| PR-1.1 | L | 20 | PR-0.3 | Required | Required | Defer |
| PR-1.2 | XL | 40 | PR-1.1, SI-0.5 | Required | Delegate acceptable | Defer |
| PR-1.3 | L | 24 | PR-0.3 | Required | Required | Defer |
| PR-1.4 | L | 20 | PR-0.3, PR-1.3 | Required | Delegate/read-only acceptable | Defer |
| PR-2.1 | L | 20 | PR-0.3 | Required | Required | Stub disclosure only |
| PR-2.2 | XL | 40 | PR-0.3, SI-0.4 | Required | Read-only/delegate | Stub disclosure only |
| PR-2.3 | XL | 40 | PR-1.1, PR-1.3 | Required | Delegate advanced reports | Stub disclosure only |
| PR-2.4 | L | 20 | PR-5.5 | Required | Required | Link validation only |
| PR-2.5 | M | 12 | PR-1.1, PR-1.3, PR-2.1 | Required | Required | Stub disclosure only |
| PR-2.6 | S | 4 | PR-0.3 | Required | Required if account visible | Stub disclosure only |
| PR-3.1 | M | 8 | PR-1.1, PR-1.2 | Required | Required | Defer |
| PR-3.2 | M | 12 | PR-1.1 | Required | Required | Defer |
| PR-3.3 | S/L | 2 or 24 | SI-0.1, PR-0.3 if implemented | Required: 2h remove/disable or 24h implement | Required: 2h remove/disable or 24h implement | Decide/remove controls |
| PR-3.4 | M | 12 | PR-0.3, PR-1.1 | Required | Required | Static preview acceptable |
| PR-4.1 | XL | 40 | PR-2.2, SI-0.4 | Required | Delegate | Defer |
| PR-4.2 | L | 20 | PR-2.2, PR-2.5 | Required | Delegate | Defer |
| PR-4.3 | M | 12 | PR-1.1, PR-1.2, SI-0.5 | Required | Required as delegation contract | Defer |
| PR-4.4 | M | 12 | PR-0.1, PR-2.2, PR-4.1 | Required | Required | Required for preview nav safety |
| PR-5.1 | M | 10 | Visible routes selected | Required | Required | Smoke only |
| PR-5.2 | M | 12 | Visible routes selected | Required | Required | Smoke only |
| PR-5.3 | M | 8 | PR-0.4 | Required | Required | Required |
| PR-5.4 | L | 18 | PR-1.x/2.x selected for release | Required | Required | Minimal route smoke |
| PR-5.5 | S | 4 | none | Required | Required | Recommended |
| PR-6.1 | S | 4 | PR-0.2, stubs disclosure | Required | Required | Required |
| PR-6.2 | S | 4 | PR-0.4, PR-5.4 | Required | Required | Defer |
| PR-6.3 | M | 8 | SI-0.3, PR-6.2 | Required | Required | Defer |

PR-3.3 estimate footnote: use the 2h branch if SI-0.1 decides to remove/disable media controls for first release; use the 24h branch if SI-0.1 decides to implement secure media capture/storage. Do not add both.

Estimated totals:

| Path | Scope | Rough effort |
|---|---|---:|
| Path A | Full V2 production replacement | 460-480h |
| Path B | Coach-workspace production with explicit legacy delegation | 240-280h |
| Path C | Authenticated staging/client preview only | 24-40h |

### Dependency DAG Summary

```text
PR-0.1 ─┬─ PR-0.2 ── PR-6.1
        └─ PR-4.4

PR-0.3 ─┬─ PR-1.1 ─┬─ PR-1.2 ─┬─ PR-3.1
        │          │          └─ PR-4.3
        │          └─ PR-3.2 ── PR-3.4
        ├─ PR-1.3 ─┬─ PR-1.4
        │          └─ PR-2.3
        ├─ PR-2.1 ─┬─ PR-2.5
        │          └─ PR-5.4
        ├─ PR-2.2 ─┬─ PR-4.1
        │          └─ PR-4.2
        └─ PR-2.6

SI-0.1 ── PR-3.3
SI-0.3 ── PR-6.3
PR-0.4 ── PR-5.3 ── PR-6.2 ── PR-6.3
PR-5.5 ── PR-2.4
```

---

## 1. P0 Release Gates

### PR-0.1 — Production flag and route exposure gate

**Given** V2 is mounted under `/v2/*`,
**When** production is built and deployed,
**Then** `/v2/*` remains protected by authenticated routing unless a deliberate production release flag is enabled.

Acceptance criteria:
- `REACT_APP_V2_PUBLIC_PREVIEW=false` in production.
- Anonymous users cannot view `/v2/home`, `/v2/teachers`, `/v2/messages`, or any V2 workspace route.
- Legacy app remains reachable for authenticated users while V2 is phased in.

How to verify:
- Run `npm run prod`.
- In incognito, visit `/v2/home`; expect login redirect.
- Confirm `process.env.V2_PUBLIC_PREVIEW` is false in production config.

Risks / audit questions:
- Should staging remain authenticated, or should we use a temporary preview channel with demo-only data?

### PR-0.2 — Preview/demo data cannot leak to production users

**Given** V2 pages contain preview-safe fallback data,
**When** a live user visits V2 in production,
**Then** no demo records appear as if they are real CHALK data.

Acceptance criteria:
- Each fallback is removed, hidden behind non-prod flag, or replaced by production-safe empty/loading/error state.
- No real pilot names, client names, private meeting content, or fake teacher quotes are bundled.
- Empty states do not imply fake activity.

How to verify:
- Grep `src/v2` for `preview`, `demo`, `local`, real names, and known client terms.
- Test a coach account with no data and confirm no fake records appear.

Risks / audit questions:
- Fictional demo names are privacy-safe but still misleading if shown to real users.

### PR-0.3 — Firestore rules for every new V2 path

**Given** V2 introduces or uses new write paths,
**When** any V2 write is enabled,
**Then** Firestore rules explicitly allow only intended roles and deny cross-program or anonymous access.

Acceptance criteria:
- Rules cover `users/{uid}.observationDraft`, action plan comments, sent-to-teacher state, training status, messages/threads, admin writes, report schedules/exports if stored.
- Rules tests include allowed and denied scenarios.
- Current old-rules-version warning is addressed or explicitly accepted with rationale.

How to verify:
- Run emulator-backed rules tests.
- Attempt denied reads/writes as unrelated coach, teacher, anonymous user, and wrong-program leader.

Risks / audit questions:
- Existing rules debt must not justify broad access for new V2 paths.

### PR-0.4 — Rollback tag and release runbook

**Given** production already required rollback once during V2 work,
**When** V2 is prepared for production deployment,
**Then** there is a fresh production rollback tag, hosting release ID, and command-level rollback runbook.

Acceptance criteria:
- Fresh rollback tag exists immediately before production deploy.
- Firebase hosting version/release ID is recorded.
- Deploy command excludes Functions unless intentionally approved.
- Rollback path is reviewed before deploy.

Command-level rollback notes:

This repo's current local Firebase CLI does not expose `hosting:rollback`; verify with `./node_modules/.bin/firebase help hosting:rollback`. The practical rollback path is redeploying from a known-good git tag.

Staging rollback pattern:

```bash
git fetch --tags origin fork
git switch --detach <rollback-tag>
npm run removebuild
npm run staging
./node_modules/.bin/firebase deploy -P staging --only firestore:rules,hosting --non-interactive
git switch feature/chalk-2.0-renovation
```

Production rollback pattern:

```bash
git fetch --tags origin fork
git switch --detach <prod-rollback-tag>
npm run removebuild
npm run prod
./node_modules/.bin/firebase deploy -P cqrefpwa --only firestore:rules,hosting --non-interactive
git switch feature/chalk-2.0-renovation
```

How to verify:
- Confirm tag, hosting release ID, and rollback command sequence before production deploy.
- Confirm the deploy command uses the intended Firebase project/target and excludes Functions.

Risks / audit questions:
- `deploy:stage` currently includes Functions-related behavior and should not be reused blindly.
- Rollback command may need target-specific adjustment if `.firebaserc` hosting targets change.

---

## 2. P0 Data and Pipeline Integrity

### PR-1.1 — Observation completion writes canonical legacy-compatible docs

**Given** legacy reports/export/BigQuery expect observation records in specific shapes,
**When** a coach completes an observation in V2,
**Then** V2 writes the canonical fields required by legacy and export pipelines.

Acceptance criteria:
- V2 uses valid stored observation type codes.
- Completed docs include teacher, coach, start/end, notes, type, checklist where needed, aligned tags, strength/opportunity/next-step fields.
- Draft cleanup occurs only after successful write.
- BigQuery/export transforms accept V2-created records.

How to verify:
- Complete one observation per tool in staging.
- Confirm legacy results and export pipeline can read them.

Risks / audit questions:
- Current flow is partial and may depend on legacy helper side effects.

### PR-1.2 — Observation result pages parity

**Given** legacy exposes result pages for multiple observation tools,
**When** a user opens results from V2,
**Then** they see a V2 result page or are intentionally delegated to a working legacy result route with context preserved.

Acceptance criteria:
- For each tool, either a V2 result component is implemented and tested, or a legacy delegation URL is implemented with the correct observation ID/context.
- Result links exist from observation completion, teacher profile, and reports where appropriate.
- Tool labels, scores, and route params are correct for Transition Time, Classroom Climate, Level of Instruction, Listening to Children, Associative/Cooperative Interactions, Math Instruction, Sequential Activities, Literacy Instruction, and Student Engagement.

How to verify:
- Create/load one observation per tool and navigate to result view.

Risks / audit questions:
- Full redesign of all result pages may be too big for first production release; explicit legacy delegation may be acceptable.

### PR-1.3 — Action plan writes preserve legacy semantics

**Given** action plans are a core CHALK workflow,
**When** V2 creates, edits, comments on, or sends an action plan,
**Then** legacy lists, teacher visibility, exports, and history continue to work.

Acceptance criteria:
- V2 list loads all relevant plans, not just a small active subset.
- Filters for active, overdue, sent, complete, draft, and teacher are accurate.
- Autosave writes expected fields.
- Comments are persisted and ordered.
- Send-to-teacher state persists with audit fields.
- Legacy `/ActionPlans` and `/ActionPlan` can read V2-modified records.

How to verify:
- Create/edit/send/comment in V2 staging.
- Open the same record in legacy and compare Firestore document shape.

Risks / audit questions:
- Local-only draft behavior must not be presented as durable production save.

### PR-1.4 — Conference plan full workflow

**Given** legacy includes conference plans,
**When** users manage conference plans in V2,
**Then** they can list, create, edit, send/share, and reopen conference plans with legacy-compatible data.

Acceptance criteria:
- `/v2/plans` distinguishes action plans and conference plans.
- Existing conference plans load from Firestore.
- Create/edit/send/share is live or hidden.
- Permission rules match legacy roles.

How to verify:
- Create in legacy and load in V2.
- Create/edit in V2 and load in legacy.

Risks / audit questions:
- Current V2 shows conference cards but creation is deferred.

---

## 3. P1 Live Product Modules

### PR-2.1 — Messaging live inbox and threads

**Given** `/v2/messages` currently uses preview/local state,
**When** a coach opens, sends, searches, or starts a thread,
**Then** V2 reads and writes real CHALK message data with correct participants, permissions, timestamps, and read/unread state.

Acceptance criteria:
- Inbox loads real threads for authenticated user.
- Teacher profile opens or creates thread with that teacher.
- Sending persists after refresh.
- Read/unread state updates correctly.
- Unauthorized users cannot read threads outside their scope.

How to verify:
- Send coach-to-teacher and teacher-to-coach messages in staging.
- Log in as another coach and confirm isolation.

Risks / audit questions:
- Decide whether to reuse legacy messaging storage or introduce a new schema with bridge/migration.

### PR-2.2 — Admin users/programs/sites live management

**Given** `/v2/admin` is currently preview rows and toast-only actions,
**When** an admin manages users, programs, sites, invites, roles, or archives,
**Then** V2 performs authorized backend operations or hides unsupported writes.

Acceptance criteria:
- Users tab loads real users with role, status, program/site mapping, and last login where available.
- Programs and sites load real records.
- Create/edit/archive/import are implemented or hidden.
- Admin routes/buttons are hidden or denied for non-admins.

How to verify:
- Test as admin, coach, teacher, site leader, and program leader.
- Compare with legacy `/Admin`, `/AllUsers`, `/MyPrograms`, `/NewProgram`, `/NewSite`.

Risks / audit questions:
- Admin writes are high-risk; first production release may be read-only with legacy delegation.

### PR-2.3 — Reports live data, details, scheduling, and export

**Given** `/v2/reports` has partial metrics and preview report rows,
**When** a user opens, filters, exports, or schedules a report,
**Then** V2 uses real report sources and preserves existing reporting semantics.

Acceptance criteria:
- Metrics match legacy for same user/date range.
- Saved report rows load from live source or documented equivalent.
- Report detail pages exist or delegate to legacy.
- CSV/export uses approved backend and correct scope.
- Scheduling is implemented or hidden.

How to verify:
- Compare V2 with legacy `/Reports`, `/ReportsList`, `/ReportImages`, `/ReportDesc`.
- Export CSV and validate row counts.

Risks / audit questions:
- Report correctness matters more than visual redesign.

### PR-2.4 — Coaching resources real content wiring

**Given** `/v2/resources` is a searchable shell,
**When** a user opens a resource,
**Then** the real PDF/PPTX/preview/content opens reliably and matches the legacy catalog.

Acceptance criteria:
- Covers Coaching Cycle, Professional Development Materials, Transition Time, Classroom Climate, Math Instruction, Level of Instruction, Student Engagement, Listening to Children, Sequential Activities, Literacy Instruction, Associative/Cooperative Interactions, Coaching Best Practices, and CHALK Crosswalks.
- Search/filter returns expected resources.
- Assets open without broken links.

How to verify:
- Click every resource card in staging.
- Compare count/category coverage against legacy `/CoachingResources/*`.

Risks / audit questions:
- Assets are large; performance and caching need review.

### PR-2.5 — Teacher profile full live parity

**Given** `/v2/teachers/:teacherId` is partial,
**When** a coach opens a teacher profile,
**Then** it displays live teacher identity, plans, observations, messages, training, and profile actions without misleading fallbacks.

Acceptance criteria:
- Teacher identity and program/site/classroom come from live source.
- Current plans and recent observations are live.
- Message, plan, observation, and report links preserve context.
- Missing data shows production-safe empty states.

How to verify:
- Compare against legacy `/TeacherProfile` for teachers with full data, no plans, no observations, and archived status.

Risks / audit questions:
- Legacy also has coach/site/program profiles; see PR-4.2.

### PR-2.6 — Account settings live persistence

**Given** `/v2/account` has preview-only preferences,
**When** a user changes preferences or profile settings,
**Then** changes persist through approved schema or unsupported controls are hidden.

Acceptance criteria:
- Read-only profile fields are accurate.
- Editable preferences persist across refresh/login.
- Unsupported settings are not shown as saveable.
- Legacy `/Account` or `/MyAccount` remains consistent.

How to verify:
- Save settings, refresh, log out/in, and compare legacy account state.

Risks / audit questions:
- New preference schema requires rules and migration decisions.

---

## 4. P1 Observation and Training Completion

### PR-3.1 — Previous observation context

**Given** V2 references previous observation detail,
**When** a coach starts a new observation for a teacher,
**Then** V2 surfaces the relevant previous observation or hides the link when unavailable.

Acceptance criteria:
- Previous observation card loads latest relevant observation for selected teacher/tool.
- Link opens V2 or legacy result page.
- Empty state is clear when no previous observation exists.

How to verify:
- Test teacher with prior observation and teacher without one.

Risks / audit questions:
- Wrong previous observation can mislead coaching decisions.

### PR-3.2 — Magic 8/9 alignment and keyboard shortcuts

**Given** renovation goal includes quick note tagging and framework alignment,
**When** a coach takes notes,
**Then** Magic 8/9 chips and shortcut behavior are reliable, accessible, and stored in final observation.

Acceptance criteria:
- Tags are tool-appropriate.
- Shortcuts do not conflict with browser/screen-reader defaults.
- Tags persist to draft and final observation.
- Tags appear in completion summary/results.

How to verify:
- Use mouse and keyboard only on each supported observation type.
- Refresh mid-observation and confirm draft restoration.

Risks / audit questions:
- Shortcut features can harm accessibility if not tested.

### PR-3.3 — Implement photo/audio scope decision

**Given** SI-0.1 defines whether photo/audio evidence is in or out of scope for first production release,
**When** the observation toolbar is prepared for production,
**Then** the UI either removes/disables media controls or implements secure evidence capture/storage according to the approved decision.

Acceptance criteria:
- If out of scope, controls are removed or disabled and no copy promises media capture.
- If in scope, uploads are permissioned, retained/deleted according to policy, and audited.
- Any storage path has explicit Firestore/Storage rules and privacy review.
- Observation completion does not reference unavailable media evidence.

How to verify:
- Review final observation toolbar.
- If implemented, test upload/read/delete permissions as coach, teacher, unrelated coach, and anonymous user.

Risks / audit questions:
- Media evidence creates privacy, consent, retention, and storage-cost risk.

### PR-3.4 — Training modules and completion gate

**Given** V2 training has recommendation cards and partial completion tracking,
**When** a user completes, dismisses, or revisits training,
**Then** completion state and skip/gating rules match product expectations and legacy training routes.

Acceptance criteria:
- All legacy training subroutes are represented or delegated.
- Completion persists to live user state.
- Dismiss/skip is explicit and reversible where needed.
- Recommendations are derived from real signals or labeled static.

How to verify:
- Complete training, refresh, log out/in, and compare state.
- Open training for each observation tool.

Risks / audit questions:
- “Recommended” language must be truthful if there is no real recommendation engine.

---

## 5. P2 Legacy Route Parity

### PR-4.1 — Leader dashboard and leader management parity

**Given** legacy has leader-specific routes,
**When** a leader user accesses V2,
**Then** core leader dashboard, user, teacher, coach, site, archive, and all-user workflows exist or safely delegate to legacy.

Acceptance criteria:
- V2 implements or explicitly delegates `/LeadersDashboard`, `/LeadersUsers`, `/LeadersTeachers`, `/LeadersCoaches`, `/LeadersSites`, `/LeadersArchive`, and `/LeadersAllUsers`.
- Delegated routes preserve role/context and do not dead-end.
- Role-specific nav does not expose irrelevant coach-only views.
- Counts and permissions match legacy for every implemented route.

How to verify:
- Test with leader account and compare route-by-route with legacy.

Risks / audit questions:
- Leader workflows may be outside first production slice but must be explicit.

### PR-4.2 — Coach, site, and program profile parity

**Given** legacy includes profile routes beyond teacher profile,
**When** a user opens coach, site, or program profile links,
**Then** V2 provides equivalent screens or delegates to legacy with context preserved.

Acceptance criteria:
- V2 implements or explicitly delegates `/CoachProfile`, `/SiteProfile`, and `/ProgramProfile`.
- Profile links preserve IDs/context.
- Unsupported profile types do not dead-end and are not presented as renovated if delegated.

How to verify:
- Navigate to each profile type from admin/leader areas.

Risks / audit questions:
- Partial profile parity can create inconsistent role experiences.

### PR-4.3 — Observation tool route and delegation contract

**Given** legacy exposes separate observation routes per tool,
**When** a user enters V2 observation workflows,
**Then** each tool has a clear V2 route/type mapping and an explicit delegation contract for results/training paths.

This does not duplicate PR-1.2. PR-1.2 decides and verifies rendered result pages. PR-4.3 verifies that every legacy tool route has a valid V2 entry point, stored type mapping, and either a V2 result/training route or an intentional legacy delegation target.

Acceptance criteria:
- Route/type mapping is implemented for Transition Time, Level of Instruction, Classroom Climate, Listening to Children, Associative/Cooperative Interactions, Math Instruction, Sequential Activities, Literacy Instruction, and Student Engagement.
- Stored type codes match legacy accepted values.
- Each tool has a valid start route, result route/delegation, and training/resource route/delegation.

How to verify:
- Start, draft, complete, view result, and open training for each tool.

Risks / audit questions:
- Unified V2 observation page is acceptable only if mappings are complete and tested.

### PR-4.4 — Navigation and role-based IA

**Given** V2 nav currently shows broad workspace navigation,
**When** users with different roles log in,
**Then** nav shows appropriate areas and direct URL access is permissioned.

Acceptance criteria:
- Teacher, coach, admin, program leader, and site leader nav states are defined.
- Unsupported V2 routes are hidden or safely delegated.
- Direct route access is denied by permissions, not just hidden nav.

How to verify:
- Log in as each role and test nav plus direct URL access.

Risks / audit questions:
- A single nav may be acceptable for staging but not production.

---

## 6. P1/P2 QA, Accessibility, and Reliability

### PR-5.1 — Responsive QA matrix

**Given** CHALK is used on varied devices,
**When** V2 is production-bound,
**Then** core screens work at mobile, tablet, laptop, and desktop sizes without overlap or unusable controls.

Acceptance criteria:
- Test viewports: 375x667, 390x844, 768x1024, 1024x768, 1440x900.
- Screens tested: Home, Teachers, Teacher profile, Observation, Plans list/detail, Messages, Resources, Reports, Admin, Training, Account.

How to verify:
- Browser screenshots or Playwright snapshots for each viewport/screen.

Risks / audit questions:
- Tables and two-column layouts may need mobile-specific patterns.

### PR-5.2 — Accessibility pass

**Given** V2 includes custom controls,
**When** the app is production-bound,
**Then** workflows are keyboard-navigable and screen-reader friendly.

Acceptance criteria:
- Buttons have accessible names.
- Focus states are visible.
- Forms have labels.
- Tables have meaningful headers.
- Color contrast passes WCAG AA for text.
- Modal focus behavior is acceptable.

How to verify:
- Keyboard-only pass.
- Automated axe/Lighthouse pass.
- Manual screen-reader smoke test.

Risks / audit questions:
- Emoji/icon-only controls need labels or accessible alternatives.

### PR-5.3 — Service worker and cache update behavior

**Given** CHALK is a PWA with service worker caching,
**When** V2 is deployed or rolled back,
**Then** users do not get stuck on stale JS bundles or mismatched legacy/V2 assets.

Acceptance criteria:
- Update notification or reload strategy is visible and tested.
- Rollback invalidates or updates cached V2 bundles.
- Repeated staging deploys do not leave app in inconsistent state.

How to verify:
- Load staging, deploy new build, revisit, and confirm update behavior.
- Roll back staging and confirm bundle mismatch does not break app.

Risks / audit questions:
- Current SW update handling may be console-only or incomplete.

### PR-5.4 — End-to-end smoke suite

**Given** V2 touches core workflows,
**When** a production candidate is cut,
**Then** smoke tests validate auth, routing, major reads/writes, and no obvious runtime crashes.

Acceptance criteria:
- Smoke covers login, home load, teachers search/profile, observation draft/complete, plans list/detail/comment/send, messages read/send, reports load/export if enabled, admin read-only/write if enabled.
- Tests run against staging without mutating production data.

Tooling decision:
- Use the existing Cypress setup for production smoke automation unless it proves blocked.
- Manual checklist is supplemental only; it is not an acceptable substitute for the release smoke suite on Path A or Path B.
- If Cypress cannot cover a browser state reliably, document the gap and add a targeted manual step with screenshot evidence.
- Add CI wiring so the V2 smoke suite runs automatically on pull requests or release-candidate branches once the suite exists.

How to verify:
- Run the V2 Cypress smoke suite against staging.
- Confirm CI runs the suite on the selected branch/PR trigger, or document why CI wiring is blocked.
- Attach command output and any manual screenshot exceptions to release notes.

Risks / audit questions:
- Existing Cypress suite may not cover V2 and will need new specs.

### PR-5.5 — Performance and bundle review

**Given** webpack warns about large bundles/assets,
**When** V2 is production-bound,
**Then** performance impact is measured and accepted or reduced.

Acceptance criteria:
- Bundle-size warning is documented with mitigation or acceptance.
- Large coaching docs are not eagerly loaded on initial V2 route.
- Initial V2 route remains usable on typical school network conditions.

How to verify:
- Lighthouse/WebPageTest on staging.
- Network waterfall for `/v2/home` and `/v2/resources`.

Risks / audit questions:
- Resources hub may increase load pressure if assets are loaded eagerly.

---

## 7. P0/P1 Release Process

### PR-6.1 — Staging signoff checklist

**Given** staging is deployed with V2,
**When** reviewers evaluate it,
**Then** they know which features are production-ready and which are preview-only.

Acceptance criteria:
- Staging review guide exists with routes and expected behavior.
- Preview-only modules are labeled in review notes.
- Known risks and out-of-scope items are listed.

How to verify:
- Another LLM/human can follow the guide without verbal context.

Risks / audit questions:
- Demoing preview-only behavior as finished creates trust and scope risk.

### PR-6.2 — Production release checklist

**Given** V2 will eventually ship to production,
**When** the release candidate is ready,
**Then** deploy is gated on build, tests, rules, auth, monitoring, and rollback.

Acceptance criteria:
- `npm run prod` passes.
- Firestore rules tests pass.
- Smoke suite passes.
- Rollback tag is created.
- Release notes are written.
- Production deploy command is reviewed and excludes Functions unless intended.

How to verify:
- Checklist completed before deploy.

Risks / audit questions:
- Production deploy should not rely on stale scripts or wrong Firebase targets.

### PR-6.3 — Post-release monitoring and rollback decision points

**Given** production users may hit issues not seen in staging,
**When** V2 is released,
**Then** monitoring signals and rollback/hotfix decision thresholds are defined.

Monitoring decision:
- Preferred: add Sentry Browser SDK for client runtime errors and release tagging, plus Firebase/Google Cloud Logging review for Firestore rules, Functions, and hosting/deploy signals.
- If Sentry is not approved, SI-0.3 must name an equivalent before production. "Firebase Console only" is not sufficient for Path A or Path B.

Acceptance criteria:
- Monitor login errors, route errors, client runtime exceptions, Firestore permission errors, write failures, and service worker update issues.
- V2 production release has a release identifier in the monitoring tool.
- Production source maps are uploaded to Sentry/equivalent or symbolication is otherwise proven; minified-only stack traces are not acceptable for Path A or Path B.
- Rollback thresholds are documented.
- Rollback approver is defined.

How to verify:
- Trigger a controlled client error in staging and confirm it appears in Sentry/equivalent with release tag and readable stack trace.
- Review Firebase/Cloud Logging locations for backend/deploy signals.

Risks / audit questions:
- Quiet write failures can look like a successful release without monitoring.

---

## 8. Suggested Execution Paths

### Path A — Full production replacement

Use if CHALK expects V2 to replace legacy broadly.

Rough effort: 460-480h. This should be treated as a large phased program, not a short cleanup sprint.

Required sequence:
1. PR-0.1 through PR-0.4.
2. PR-1.1 through PR-1.4.
3. PR-2.1 through PR-2.6.
4. PR-3.1 through PR-3.4.
5. PR-4.1 through PR-4.4.
6. PR-5.1 through PR-6.3.

Risk: large scope; likely needs phased delivery and interim releases.

### Path B — Production V2 for coach workspace, legacy delegation for advanced roles

Use if first production release can target coach workflows while keeping leader/admin/report-heavy workflows in legacy.

Rough effort: 240-280h, depending on how much reporting/results work is delegated. This is the recommended production path unless CHALK explicitly requires full admin/leader replacement on day one.

Required:
1. PR-0.1 through PR-0.4.
2. PR-1.1 through PR-1.3.
3. PR-2.1, PR-2.4, PR-2.5, PR-2.6.
4. PR-3.1 through PR-3.4.
5. PR-4.4 role-based nav/delegation.
6. PR-5.1 through PR-6.3.

Can delegate initially:
- Admin writes.
- Leader dashboards.
- Advanced report builders/exports.
- Coach/site/program profile detail.

Risk: must communicate clearly that V2 is a renovated coach workspace, not a full admin replacement yet.

### Path C — Staging/demo-ready only

Use if goal is polished client preview before acceptance, not production cutover.

Rough effort: 24-40h. This path should produce a clean review experience, not a production candidate.

Required:
1. PR-0.1 and PR-0.2.
2. Hide or label preview-only actions.
3. Responsive/accessibility smoke pass on visible routes.
4. Staging review guide.

Risk: should not be described as production-ready.

---


## 9. Scope-Cuts Menu

If timeline pressure appears, cut or delegate in this order before weakening P0 data/security gates:

| Cut | What to do | Product impact | Saves ~ | Preserves prod safety? |
|---|---|---|---:|---|
| C-1 | Keep Admin writes in legacy; make V2 admin read-only or hidden | Admins still use legacy for account management | 20-30h | Yes |
| C-2 | Delegate leader dashboards to legacy | Leaders see mixed experience | 35-45h | Yes |
| C-3 | Delegate advanced reports/export/scheduling to legacy | Reports remain accurate but less renovated | 25-35h | Yes |
| C-4 | Delegate observation result pages to legacy with contract links | Visual parity incomplete | 28-40h | Yes, if context preserved |
| C-5 | Make conference plans read-only/delegated | Conference workflow not fully renovated | 16-20h | Yes |
| C-6 | Remove photo/audio controls from first release | Less evidence capture ambition | 22h | Yes, safer |
| C-7 | Rename training recommendations to static resource suggestions | Less personalization | 6-10h | Yes, more honest |
| C-8 | Make account preferences read-only | Fewer user settings | 2-4h | Yes |
| C-9 | Resource hub links to legacy assets without custom V2 readers | Less polished resources | 8-16h | Yes |
| C-10 | Limit first production release to coach role | Admin/leader roles remain legacy | 80-120h | Yes |
| C-11 | Keep coach/site/program profiles delegated to legacy | Profile parity incomplete | 16-20h | Yes |

Do not cut:

- PR-0.1 auth/route exposure gate.
- PR-0.2 preview/demo data safety.
- PR-0.3 rules for any enabled write path.
- PR-1.1/PR-1.3 compatibility for any enabled observation/action-plan write path.
- PR-0.4 rollback readiness.

## 10. Stubs Disclosure Aggregator

Before any CHALK/Deanna signoff, disclose these preview/local/fallback areas in one place. Each item must be fixed, hidden, or explicitly accepted as preview-only.

| Current source | Pattern | Why it matters | Fix path | Cut path |
|---|---|---|---|---|
| `CoachHome.tsx` | `STUB_ATTENTION`, `STUB_ACTIVITY`, `STUB_PLANS` | Home can show fictional coaching activity if live load fails or no user exists | Replace with live empty/error states; no fake fallback in prod | Label as preview-only and hide from production nav |
| `AllTeachers.tsx` | `ROWS` initial list | Fictional roster can appear as real teacher data | Initialize empty; load live; show empty/error | Keep only in preview channel |
| `ActionPlans.tsx` | `DEMO_PLANS` | Fictional plans/conference plans can imply live plan status | Load real plans or show empty/error | Disclose as visual-only plan workspace |
| `Messaging.tsx` | `THREADS` and `seeded` local threads | Messages appear sent but are not live | Wire real message backend; see PR-2.1 schema decision risk | Hide messages from first prod release |
| `PlanDetail.tsx` | `DEMO_PLAN`, local draft fallback | Local edits can look durable | Require real plan ID for prod writes; empty state otherwise | Demo route only in preview channel |
| `TeacherProfile.tsx` | `DEMO_TEACHERS` fallback | Teacher profile can mix fallback with live context | Remove fallback for prod; live empty/error states | Keep profile delegated to legacy |
| `Reports.tsx` | `DEFAULT_STATS`, static `REPORTS` | Reports can be inaccurate | Wire live report source; delegate export/detail to legacy | Hide reports from first prod release |
| `Training.tsx` | `CARDS`, localStorage status fallback | Recommendations may look data-driven when static | Wire live status and truthful recommendation source | Rename as static resources in preview |

Disclosure template for staging notes:

```text
The V2 staging preview includes several preview-only modules. These are safe for visual/product review but are not production data paths yet: [list modules]. Production release requires either live integration, explicit legacy delegation, or hiding these controls.
```

## 11. Cross-References for Auditors

| Topic | Source |
|---|---|
| Original renovation strategy | `.chalk/CHALK-2-RENOVATION-PLAN.md` |
| Earlier task-level sprint plan with G/W/T | `.chalk/CHALK-2-SPRINT-PLAN.md` |
| Audit package and risk framing | `.chalk/CHALK-2-AUDIT-PACKAGE.md` |
| Firestore posture decision | `.chalk/decision-log.md` |
| V2 code root | `CoachingApp/src/v2/` |
| V2 route mount/private route | `CoachingApp/src/App.tsx` |
| Stored observation type mapping | `CoachingApp/src/v2/lib/observationTypes.ts` |
| V2 API wrappers | `CoachingApp/src/v2/lib/api.ts` |
| Firebase deploy config | `CoachingApp/firebase.json`, `CoachingApp/.firebaserc` |

## 12. Auditor Checklist

Ask the auditor to answer:

1. Are any P0 items missing?
2. Which current V2 modules are unsafe to expose to real users?
3. Which Given/When/Then scenarios are too vague to test?
4. Are the size tiers and hour estimates plausible?
5. Are the dependency matrix and DAG complete enough to sequence work?
6. Which scope cuts should be chosen for the selected release path?
7. Is the stubs disclosure table complete for the current codebase?
8. Is Path A, B, or C the right next execution strategy?
9. Are Firestore rules and data privacy risks sufficiently covered?
10. Are observation and action plan legacy pipeline risks sufficiently covered?
11. Does the plan over-invest in visual parity and under-invest in backend correctness?
12. What additional QA or CI/CD wiring should be required before production?
13. What should be communicated to CHALK before they review staging?

Suggested response file:

`.chalk/CHALK-2-PROD-READY-AUDIT-RESPONSE.md`
