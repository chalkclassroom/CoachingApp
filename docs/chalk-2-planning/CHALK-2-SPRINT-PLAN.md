# CHALK 2.0 — Sprint Plan (Days 3–10)

## 1. Summary

The visual mockups (Day 1 commit `bbcb1640a`, Day 2 commit `763362c96`) are shipped to staging. From here, **8 working days remain** to wire stub data to Firestore, implement interactions and writes, harden routing/auth, run cross-viewport QA, triage CHALK-provided bugs, and execute a coordinated production rollout.

### Capacity vs estimate (revised)

A previous draft of this plan claimed "95h vs 80h envelope = +15h overrun". That mixed two numbers. The honest math is:

- **Remaining capacity**: 8 working days × 8h/day = **64h**.
- **Plan estimate**: **97h across 38 tasks** (adds T3.0 Firestore rules posture decision — 2h — vs prior draft).
- **Overrun against remaining capacity**: **+33h (~+52%)**.

The 80h figure in the proposal was the *total* engagement envelope, not the post-Day-2 remainder. Days 1–2 already burned ~16h of that 80h on visual mockups + staging deploy.

### Three execution paths (must pick one before Day 3)

**Path A — Scope cuts to fit 64h within 10 days**: Drop deferrable tasks now (not at T10.3). Concretely cut 33h via §6.A below. Honors the 10-day proposal commitment. Stubs that remain (Magic 9 alignment, photo/audio capture, CSV backend, Cloud-Function recs) must be disclosed at T10.2 *before* prod signoff, not in release notes.

**Path B — Keep all 38 tasks, extend timeline**: 97h ≈ 12 working days at 8h/day. Rebrand internally as "Days 3–14 plan". Requires re-aligning Deanna/Ellie that signoff slips ~2 working days past the 10-day commitment. No price change since the offer is fixed at $20K with flexible payment.

**Path C — Hybrid**: Cut 25h via §6.A, extend by 1 working day. 72h of remaining work across 9 working days. This is **not** inside the original 80h total engagement envelope once Days 1–2 are counted (actual total ≈ 88h), but it is the lowest-risk delivery path if the vendor absorbs the extra ~8h.

The full 38-task plan below is written assuming nothing is cut (the "if we had unlimited days" reference). §6.A lists the cuts to apply if Path A or C is chosen.

### Day → Task ID summary table (uncut plan)

| Day | Task IDs | Total hours |
|---|---|---:|
| Day 3 — Foundation hardening & Firebase plumbing | T3.0, T3.1, T3.2, T3.3, T3.4, T3.5 | 14 |
| Day 4 — Coach Home data wiring | T4.1, T4.2, T4.3, T4.4 | 12 |
| Day 5 — Teachers list data wiring & filters | T5.1, T5.2, T5.3, T5.4 | 12 |
| Day 6 — Plan detail data wiring & auto-save | T6.1, T6.2, T6.3, T6.4 | 12 |
| Day 7 — Live observation data wiring | T7.1, T7.2, T7.3, T7.4 | 12 |
| Day 8 — Training page + cross-cutting interactions | T8.1, T8.2, T8.3, T8.4, T8.5 | 11 |
| Day 9 — Routing/auth/SW + responsive QA + bug triage | T9.1, T9.2, T9.3, T9.4, T9.5 | 12 |
| Day 10 — Staging review, sign-off, prod rollout | T10.1, T10.2, T10.3, T10.4, T10.5, T10.6 | 12 |
| **Total** |  | **97** |

(One new task T3.0 adds 2h vs prior draft → 97h. Path A cuts 33h to land at 64h. Path C cuts 25h and adds one working day to land at 72h remaining.)

### Workstream summary

| Workstream | Tasks | Hours |
|---|---|---:|
| Foundation & shared infrastructure | T3.0–T3.5, T8.5, T9.1 | 19 |
| Coach Home wiring | T4.1–T4.4 | 12 |
| Teachers list wiring | T5.1–T5.4 | 12 |
| Plan detail wiring | T6.1–T6.4 | 12 |
| Live observation wiring | T7.1–T7.4 | 12 |
| Training wiring | T8.1–T8.4 | 8 |
| Routing/auth/SW hardening | T9.1, T9.2 | 4 |
| Responsive QA | T9.3 | 3 |
| Bug triage | T9.4 | 3 |
| Loading/error/empty polish | T8.5, T9.5 | 5 |
| Release & sign-off | T10.1–T10.6 | 12 |

(Rows overlap — e.g. T8.5 counts in Foundation and Loading polish — so the columns do not sum to 97. Use the day table above for the authoritative total.)

---

## 2. Dependencies graph (DAG)

```
T3.0 (Firestore rules posture decision)
  ├─ T6.3 (comments thread write path)
  └─ T7.2 (observation draft write path)

T3.1 (Firebase context bridge)
  ├─ T3.2 (useV2Auth + user info loader)
  │    ├─ T3.4 (PrivateRoute wrap for /v2)
  │    └─ T4.1 (Coach Home stats wiring)
  ├─ T3.3 (v2/lib/api wrappers)
  │    ├─ T4.1, T4.2, T4.3, T4.4
  │    ├─ T5.1, T5.2, T5.3, T5.4
  │    ├─ T6.1, T6.2, T6.3, T6.4
  │    ├─ T7.1, T7.2, T7.3, T7.4
  │    └─ T8.1, T8.2, T8.3, T8.4
  └─ T3.5 (Loading/error/empty primitives + toast)
       └─ used by every page wiring task

T4.1 (stats counts) ──> T4.2 (attention list) ──> T4.3 (recent activity)
                                                       └─> T4.4 (active plans + quick actions)

T5.1 (table data wiring) ──> T5.2 (filters interactive) ──> T5.3 (Add user modal) ──> T5.4 (CSV import stub)

T6.1 (plan loader) ──> T6.2 (auto-save) ──> T6.3 (comments thread) ──> T6.4 (send-to-teacher)

T7.1 (observation session start) ──> T7.2 (timer + notes auto-save) ──> T7.3 (sidebar + shortcuts) ──> T7.4 (End & align)

T8.1 (training data model) ──> T8.2 (recommendation logic stub) ──> T8.3 (start/complete tracking) ──> T8.4 (training-gate skip)

T8.5 (theme polish, empty states, loading skeletons) depends on T3.5
T9.1 (route coexistence decision + redirects) depends on T3.4
T9.2 (service worker cache bust) depends on T9.1
T9.3 (responsive QA matrix) depends on ALL page wiring tasks (T4.*, T5.*, T6.*, T7.*, T8.*)
T9.4 (bug triage) — gated on CHALK delivering a list; risk task
T9.5 (final dark mode + accessibility pass) depends on T8.5

T10.1 (staging deploy + smoke test) depends on T9.1–T9.5
T10.2 (Deanna staging review) depends on T10.1
T10.3 (release notes + comms draft) depends on T10.2
T10.4 (production deploy) depends on T10.3
T10.5 (post-deploy verification) depends on T10.4
T10.6 (handoff + retro doc) depends on T10.5
```

---

## 3. Tasks

### T3.0: Decide Firestore rules posture for new v2 write paths
**Day**: Day 3
**Estimated**: 2h
**Files affected**: `CoachingApp/firestore.rules`, `.chalk/decision-log.md`
**Depends on**: none

**Given** `CoachingApp/firestore.rules:3-5` currently has a wildcard rule `match /{document=**} { allow read, write: if request.auth.uid != null; }` — any authenticated user can read or write anywhere. Firestore rules are additive: if any matching rule allows a request, the request is allowed. Therefore, adding stricter `match /actionPlans/{planId}/comments/{commentId}` or `match /users/{uid}` blocks above the wildcard does **not** narrow those paths; the wildcard still allows them.

New v2 writes introduced later in this sprint include T6.3 `actionPlans/{id}/comments`, T6.4 `actionPlans/{id}.sentToTeacher`, and T7.2 `users/{uid}.observationDraft`. The sprint must not pretend these paths are narrowly enforced while the wildcard remains.

**When** the developer:
1. Chooses one of two explicit rules postures before implementing new writes:
   - **Posture A — functional sprint, permissive rules disclosed**: keep the wildcard unchanged, ship v2 writes under the existing auth-only rules, and document this as residual security debt in `.chalk/decision-log.md`, T10.2 review notes, and Phase 4 security work. Do **not** claim negative-path rules tests pass.
   - **Posture B — narrow enforcement now**: expand T3.0 from 2h to a separate 6–8h rules-hardening task that replaces the wildcard with explicit legacy collection rules plus narrow v2 rules. This must be tested in the emulator before staging deploy.
2. If Posture A is selected, adds comments to `firestore.rules` explaining that the wildcard is intentionally retained for legacy compatibility and that v2 write paths inherit it until Phase 4.
3. If Posture B is selected, removes or narrows the wildcard; adds explicit allow rules for the legacy collections and new v2 paths; runs positive and negative emulator tests.
4. Documents the chosen posture in `.chalk/decision-log.md` with rationale, risk accepted, and follow-up owner.

**Then** the plan is honest about Firestore security: either the sprint accepts existing permissive rules explicitly, or it pays the extra hardening cost required for true path-level enforcement.

**Acceptance criteria**:
- `.chalk/decision-log.md` records either Posture A or Posture B.
- If Posture A: no task claims that user-scoped comment/draft writes are enforced by rules; T10.2 includes this residual risk in review notes.
- If Posture B: the wildcard is replaced or narrowed, emulator tests include user A writing as user B (must reject) and user A writing as user A (must accept), and staging rules deploy succeeds.
- T6.3 and T7.2 reference this decision before shipping new write paths.

**How to verify**:
- Read `CoachingApp/firestore.rules` and confirm whether the wildcard remains.
- Read `.chalk/decision-log.md` and confirm the posture matches the actual rules file.
- If Posture B: run emulator rules tests or manual staging writes to confirm allow/deny behavior.

**Risks**:
- Posture A is fast but keeps the existing auth-only Firestore risk. This is acceptable only if disclosed as Phase 4 debt.
- Posture B is safer but probably does not fit the 2h estimate because the app has broad legacy collection access patterns.

---

### T3.1: Wire Firebase context into v2 tree
**Day**: Day 3
**Estimated**: 2h
**Files affected**: `CoachingApp/src/v2/App.tsx`, `CoachingApp/src/App.tsx`
**Depends on**: none

**Given** the v2 app at `src/v2/App.tsx` mounts at `/v2/*` and currently receives only a `userName` string prop (see commit `bbcb1640a`). The legacy `src/App.tsx` does NOT pass the Firebase context, Redux store, or auth state into the v2 tree. The `FirebaseContext` (`src/components/Firebase/FirebaseContext.tsx`) is already created at the legacy root via `MuiThemeProvider`'s ancestor. The v2 tree currently uses only stub arrays inside page components.

**When** the developer extends `V2App` to consume `FirebaseContext` directly via `React.useContext(FirebaseContext)`, exposes it through a thin `V2FirebaseProvider` that re-exports the same instance under a v2-specific context (so v2 components don't import from `../components/Firebase`), and verifies that the legacy `<Route path="/v2" render={...}>` placement in `src/App.tsx` happens INSIDE `MuiThemeProvider` but logically owns its own context boundary.

**Then** any v2 page can call `useV2Firebase()` and receive the same Firebase singleton legacy pages use. No new Firebase instance is created. The staging build (`npm run staging`) compiles without errors. Note: standalone `tsc --noEmit` is currently broken in this repo due to TS 3.7 vs modern @types/* mismatches. The webpack build transpiles TypeScript through Babel and is the practical compile gate, but it is **not** a full standalone type-check.

**Acceptance criteria**:
- A new file `src/v2/lib/firebase.ts` exports `useV2Firebase()` hook returning the existing Firebase instance.
- The hook resolves the same instance on `/Home` (legacy) and `/v2/home` (v2) — verified by a temporary `console.log(firebase.db === window.__legacyFb)` check during development.
- No second Firebase app is initialized (verify by inspecting `firebase.apps.length` in dev tools — must equal 1).
- `npm run staging` builds without errors (the Babel/Webpack pipeline is the working compile gate; standalone `tsc --noEmit` fails on legacy @types/* and is NOT the gate).

**How to verify**:
- `cd CoachingApp && npm run staging` exits 0.
- Run `npm run localdev` locally, navigate to `/v2/home`, open dev tools, evaluate `firebase.apps.length` → must be 1.
- Add a temporary `console.log` in `V2App` printing `fb.auth.currentUser?.uid` and confirm it matches the value on `/Home`.

**Risks**:
- The legacy `App.tsx` uses `MuiThemeProvider` wrapping ALL routes; v2 styles must remain scoped via `.v2-root` (already verified in Day 1). No structural change to legacy routing required.

---

### T3.2: Build v2 auth hook + load current user
**Day**: Day 3
**Estimated**: 2h
**Files affected**: `CoachingApp/src/v2/hooks/useV2Auth.ts` (new), `CoachingApp/src/v2/App.tsx`
**Depends on**: T3.1

**Given** the legacy app already subscribes to `firebase.auth.onAuthStateChanged` in `src/App.tsx` (line 199–233) and dispatches `coachLoaded(firstName, role, user)` to Redux. The v2 app currently receives `userName` as a hardcoded prop (`'Tisha Owen'` fallback in `src/App.tsx:284`). v2 pages also need `userId`, `role`, and `firstName`/`lastName` for filtering observation/plan queries.

**When** the developer creates `src/v2/hooks/useV2Auth.ts` that:
1. Uses `useV2Firebase()` to access the Firebase instance.
2. Subscribes to `auth.onAuthStateChanged` and stores `{ uid, email, isAnonymous }`.
3. Calls `firebase.getUserInformation()` (line 916) on auth-state change to load the full `UserDocument` (firstName, lastName, role, programs).
4. Exposes `{ user, loading, error }` from the hook.
5. Replaces the `userName` prop pattern by reading user info via the hook inside `AppShell` and pages.

**Then** every v2 page can read the current user's `uid`, `firstName`, `lastName`, and `role` synchronously after first render. The greeting "Good morning, Tisha" reflects the actual logged-in user, not a hardcoded prop.

**Acceptance criteria**:
- `useV2Auth()` returns `{ user: { uid, firstName, lastName, role, programs } | null, loading: boolean, error: Error | null }`.
- Coach Home greeting uses `user.firstName` from the hook, falling back to "Coach" only while `loading === true`.
- AppShell avatar shows initials computed from the live user's name (not from `userName` prop).
- Signing out via legacy `/Home` page reflects in `/v2/home` within 1s (auth listener fires).

**How to verify**:
- Sign in as Tisha (production prod-like test user on staging), navigate to `/v2/home`, confirm "Good morning, Tisha" appears.
- Sign out via legacy `/MyAccount`, navigate to `/v2/home` — should redirect (after T3.4) or show login prompt.
- Add a `<pre>{JSON.stringify(user)}</pre>` debug element temporarily; verify role and uid.

**Risks**:
- Race condition between auth-state-changed firing and page mount. Mitigation: keep `loading=true` until user info loads, render a skeleton.

---

### T3.3: Create v2 data API wrappers
**Day**: Day 3
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/lib/api.ts` (new), `CoachingApp/src/v2/lib/types.ts` (new)
**Depends on**: T3.1, T3.2

**Given** Firebase methods live on the singleton `src/components/Firebase/Firebase.tsx` and have inconsistent return shapes (some `Promise<void>`, some `Map`, some untyped arrays). v2 pages need narrow, typed read functions. The audit doc (§5.4) explicitly flags that "no real Firebase integration in v2 views" is the gap to close.

**When** the developer creates `src/v2/lib/api.ts` exporting strongly-typed wrappers:
- `getCoachAttention(uid, opts)` — returns teachers needing attention for a coach (delegates to `getTeacherList` + per-teacher last-observation date logic).
- `getDashboardStats(uid, range)` — returns `{ underCoaching, needAttention, observationsThisWeek, activePlans }` (composes `getTeacherList`, `getCoachActionPlans`, observations query).
- `getRecentActivity(uid, limit)` — returns the 4 most recent events across observations/plans/emails/training for this coach.
- `getActivePlans(uid)` — returns top 2 active action plans with progress + due date (delegates to `getCoachActionPlans`).
- `getTeachersForCoach(uid, range)` — returns the table rows for the Teachers view (delegates to `getAllUsers` filtered to the coach's partners, plus `getUsersLoginCounts` and `getUsersActionCounts`).
- `getActionPlanFull(planId)` — returns the plan + action steps + comments (composes `getActionStepsForExport` line 3340).
- `saveActionPlanField(planId, patch)` — debounced auto-save wrapper around `saveActionPlan` line 3812.
- `startObservation(coachUid, teacherUid, type)` — wraps `handleSession` line 1026.
- `endObservation()` — wraps `endSession` line 1057.
- `getTrainingRecommendations(uid)` — initially returns stub data; later swappable for Cloud Function.
- Plus typed interfaces in `lib/types.ts` for `AttentionItem`, `ActivityItem`, `PlanItem`, `TeacherRow`, `PlanDetail`, etc.

**Then** v2 pages import only from `src/v2/lib/api.ts`. No v2 page imports from `src/components/Firebase`. This isolates the legacy surface area so future Phase 4 modernization can replace the backend without touching v2 pages.

**Acceptance criteria**:
- File `src/v2/lib/api.ts` exports at least 10 typed functions covering the wirings above.
- File `src/v2/lib/types.ts` exports `AttentionItem`, `ActivityItem`, `PlanItem`, `TeacherRow`, `PlanDetail`, `ObservationSession`, `TrainingCard`.
- Every function in `api.ts` returns `Promise<T>` with a non-`void` `T`, or `Promise<T | null>` for not-found cases.
- `grep -rn "from '../../components/Firebase'" src/v2` returns 0 matches (v2 isolation).
- `npm run staging` builds without errors (the Babel/Webpack pipeline is the compile gate; standalone `tsc --noEmit` is broken in this repo and not the gate).

**How to verify**:
- `cd CoachingApp && npm run staging` exits 0.
- `grep -rn "Firebase'" src/v2` shows only the bridge in `lib/firebase.ts`.

**Risks**:
- `getCoachAttention` requires defining "needs attention" criteria. Mockup says: no observation in 45d, action plan overdue, Magic 9 score dropped, no activity recently. **Ambiguity flag**: "Magic 9 score dropped" requires Magic 9 score history — not currently computed. **Proposed default**: derive from `funcRecentObservations` (line 881) "missing in last 30d" + "plan due in next 7d" + "no login in 30d". Document the simplification.

---

### T3.4: Add V2PrivateRoute for /v2/* with non-exact matching
**Day**: Day 3
**Estimated**: 2h
**Files affected**: `CoachingApp/src/App.tsx`, `CoachingApp/webpack.config.js`, `CoachingApp/.env-cmdrc.js`
**Depends on**: T3.2

**Given** TWO blocking constraints discovered during audit review:

1. **`PrivateRoute` hardcodes `exact`** at `src/App.tsx:130`:
   ```tsx
   function PrivateRoute({ auth, allowedRoles = [], ...rest }) {
     if (auth && ...) {
       return <Route exact {...rest} />   // ← hardcoded, breaks child paths
     }
     ...
   }
   ```
   If we mount `<PrivateRoute path="/v2" ...>`, ONLY `/v2` matches — child routes `/v2/home`, `/v2/teachers`, `/v2/plans/:id`, etc. would NOT match. The naive wrap breaks every v2 page.

2. **The project is Webpack, not Vite.** Webpack exposes envs via `DefinePlugin` declared explicitly at `CoachingApp/webpack.config.js:105`. `VITE_*` prefixes do nothing. The convention in this repo is `REACT_APP_*` (see line 106–108 using `process.env.REACT_APP_USE_LOCAL_FIRESTORE` etc.).

**When** the developer:

1. **Creates a sibling component `V2PrivateRoute`** in `src/App.tsx` that mirrors `PrivateRoute` minus the `exact` flag:
   ```tsx
   function V2PrivateRoute({ auth, ...rest }: { auth: boolean }): React.ReactElement {
     if (auth) return <Route {...rest} />;   // ← no exact; child paths match
     return <Route {...rest} render={(props) => (
       <Redirect to={{ pathname: '/', state: { from: props.location } }} />
     )} />;
   }
   ```
2. **Replaces lines 283-284** in `src/App.tsx` with:
   ```tsx
   {process.env.V2_PUBLIC_PREVIEW ? (
     <Route path="/v2" render={(): React.ReactElement => <V2App />} />
   ) : (
     <V2PrivateRoute auth={auth} path="/v2" render={(): React.ReactElement => <V2App />} />
   )}
   ```
3. **Adds the env to DefinePlugin** in `webpack.config.js` (new line after line 108):
   ```js
   'process.env.V2_PUBLIC_PREVIEW': process.env.REACT_APP_V2_PUBLIC_PREVIEW === 'true',
   ```
4. **Adds the env to `CoachingApp/.env-cmdrc.js`** under `staging` (set `REACT_APP_V2_PUBLIC_PREVIEW: 'true'` until T10.3) and under `production` (omit or set to `'false'`).
5. **Removes the `userName` prop** from `V2App` (now sourced via `useV2Auth` inside).

**Then** on production builds the v2 routes require auth; on staging builds the public-preview path remains open. Child paths `/v2/home`, `/v2/teachers/`, etc. all match correctly.

**Acceptance criteria**:
- Navigating to `/v2/home` in a logged-out browser on a production build redirects to `/`.
- Navigating to `/v2/home` in a logged-out browser on staging-preview build loads the page.
- Navigating to `/v2/teachers`, `/v2/plans/123`, `/v2/observation` (all child paths) on either build matches the corresponding v2 page.
- `webpack.config.js` DefinePlugin block includes `process.env.V2_PUBLIC_PREVIEW`.
- `CoachingApp/.env-cmdrc.js` has the new var in staging + production targets.

**How to verify**:
- `npm run staging` → open `build/index.html` → navigate to `/v2/home`, `/v2/teachers`, `/v2/plans/abc123`. Each loads.
- `REACT_APP_V2_PUBLIC_PREVIEW=false npx env-cmd -e production npx webpack --mode=production` then serve build/ and navigate to `/v2/home` logged-out → confirm redirect.
- `grep V2_PUBLIC_PREVIEW CoachingApp/webpack.config.js CoachingApp/.env-cmdrc.js` shows the new entries.

**Risks**:
- `CoachingApp/.env-cmdrc.js` edit may conflict with concurrent work by `thompchr@gmail.com`. Coordinate via Slack.
- If the production env leaves `REACT_APP_V2_PUBLIC_PREVIEW=true`, prod v2 would remain public. Mitigation: T10.4 must include a logged-out smoke test for `/v2/home` and fail deploy verification unless it redirects to `/`.

---

### T3.5: Build loading/error/empty primitives + toast
**Day**: Day 3
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/components/Skeleton.tsx` (new), `CoachingApp/src/v2/components/EmptyState.tsx` (new), `CoachingApp/src/v2/components/ErrorBoundary.tsx` (new), `CoachingApp/src/v2/components/Toast.tsx` (new), `CoachingApp/src/v2/hooks/useToast.ts` (new)
**Depends on**: none (can run in parallel with T3.1–T3.4)

**Given** every page wiring task that follows needs three rendering states: loading (data fetching), empty (no records), error (fetch failed). Day 1/2 mockups have only the "happy path" data state. The audit (§5.4) explicitly notes "no loading states" as missing.

**When** the developer implements:
1. `<Skeleton width={N} height={M} />` — gray pulsing rectangle (CSS `@keyframes pulse`).
2. `<TableSkeleton rows={N} cols={M} />` — composes Skeleton into the All Teachers row shape.
3. `<StatSkeleton />` — 4-card row matching the dashboard stats layout.
4. `<EmptyState icon={ReactNode} title={string} description={string} cta?={ReactNode} />` — centered illustration block.
5. `<ErrorBoundary fallback={ReactNode}>` — class component with `componentDidCatch` that logs to console.
6. `<Toast />` rendered globally inside v2 AppShell, controlled by `useToast` hook (`toast.success(msg)`, `toast.error(msg)`).

**Then** every v2 page can wrap its data fetch in `if (loading) return <Skeleton/>; if (error) return <ErrorState/>; if (!data.length) return <EmptyState/>; return <RealUI/>`.

**Acceptance criteria**:
- 5 new components and 1 new hook exist with TypeScript prop types.
- Skeleton animates (visible CSS animation, even reduced-motion respected via `@media (prefers-reduced-motion)`).
- `<Toast>` displays in bottom-right by default, auto-dismisses after 3.5s, supports `tone: 'success' | 'error' | 'info'`.
- `<ErrorBoundary>` does not catch async errors (caller responsibility) but does catch render errors and shows the fallback.

**How to verify**:
- Create a temporary test route `/v2/__primitives` (delete after demo) that renders one of each. Confirm visual behavior across light/dark.
- `npm run staging` builds without errors.

**Risks**: none identified.

---

### T4.1: Wire Coach Home stats to live data
**Day**: Day 4
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/pages/CoachHome.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T3.2, T3.3, T3.5

**Given** `src/v2/pages/CoachHome.tsx:108-138` renders 4 hardcoded stat cards with stub values (12, 4, 8, 6). The mockup `chalk-2-app-mockup.html:945-970` shows the same stats with deltas. Firebase methods exist: `getTeacherList`, `getCoachActionPlans`, `funcRecentObservations`.

**When** the developer:
1. Replaces the stub stats block with `const stats = useDashboardStats(user.uid)` that calls `api.getDashboardStats(user.uid, currentWeek)`.
2. Implements `api.getDashboardStats` to compute:
   - `underCoaching`: count of `getTeacherList()` results filtered by `role==='teacher'` and `archived===false`.
   - `needAttention`: count from `api.getCoachAttention(uid)` (uses the 4 criteria: 45d no observation, plan overdue, low activity, archived-imminent).
   - `observationsThisWeek`: query `observations` where `observedBy === '/user/' + uid` AND `end >= startOfWeek`.
   - `activePlans`: count of `getCoachActionPlans()` filtered by `status === 'Active'`.
3. Renders `<StatSkeleton/>` during loading, the live values once loaded, and `<EmptyState>` if `underCoaching === 0`.
4. Computes deltas where feasible: "↑ 33% vs avg" requires `funcRecentObservations` historical average. **Ambiguity flag**: the mockup invents specific delta strings. **Proposed default**: implement `underCoaching` and `activePlans` with real values; implement `observationsThisWeek` with a real value AND a delta vs prior-week count; implement `needAttention` with a real count AND a delta vs last-week's count (cached in localStorage). If a delta cannot be computed (no prior data), render "No change this week".

**Then** the 4 stat cards reflect real numbers for the logged-in coach within 2s of mount. Stale data is not shown — loading skeleton appears first.

**Acceptance criteria**:
- The 4 stat cards render values from Firestore queries, not from `STUB_*` arrays.
- Network tab shows queries against `users`, `observations`, `actionPlans` on page mount.
- For a coach with 0 active plans, the "Action plans active" card shows `0` (not hidden).
- For a coach with 12+ teachers, the "Under coaching" card shows the actual count.
- Page mount-to-stats-rendered latency under 2s on a fast connection (verified with Chrome Performance tab).

**How to verify**:
- Sign in as Tisha on staging, visit `/v2/home`, compare stat values to `/Home` (legacy). Counts of teachers should match.
- Use Chrome devtools Performance tab to record page load; confirm stat cards rendered within 2s of `DOMContentLoaded`.
- Sign in as a new coach with no teachers — confirm all 4 cards show 0 (not crashed).

**Risks**:
- `getCoachActionPlans` queries `where('coach', '==', uid)` which requires a composite index already present. Verify by checking `firestore.indexes.json`.

---

### T4.2: Wire teachers-needing-attention list
**Day**: Day 4
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/pages/CoachHome.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T4.1

**Given** `CoachHome.tsx:29-34` defines `STUB_ATTENTION` with 4 hardcoded teachers (Dawn Johnson, Chrystaline Glenn, Kerry Leedy, Shonnell Wilkins). The mockup shows each row with avatar, name, reason pill, context (role · program), CTA button.

**When** the developer:
1. Implements `api.getCoachAttention(uid)` to return up to 4 `AttentionItem` records sorted by severity:
   - **Danger (red pill)**: no observation in 45+ days (query `observations.where('teacher','==','/user/'+id).orderBy('end','desc').limit(1)`).
   - **Warn (gold pill)**: action plan past `goalTimeline` (overdue).
   - **Warn (gold pill)**: at least 1 observation in last 30d but most recent Magic 9 dimension score below threshold. **Default if score history not computable**: skip this rule, surface "Login count dropped" instead (use `getUsersLoginCounts` comparing last 30d vs prior 30d).
   - **Neutral (gray pill)**: `lastLogin` more than 30 days ago and is not archived.
2. Each item carries `{ id, firstName, lastName, role, program, reason, context, cta }`. The `cta` action maps to a path:
   - "Schedule obs" → opens a modal (T8.5) or navigates to `/v2/observation?teacher={id}` (decide based on T7.1 design).
   - "Open plan" → `/v2/plans?teacher={id}` (Plans index doesn't exist in mockup; use deep link to most recent active plan).
   - "Send check-in" → opens email composer modal (T6.4 reuses Send-to-teacher modal).
3. Replaces the JSX `STUB_ATTENTION.map(...)` with the live list and adds loading skeleton + empty state ("No teachers need attention right now").

**Then** the attention card shows up to 4 real teachers ranked by severity, each with a working CTA.

**Acceptance criteria**:
- The list renders 0–4 teachers based on the live criteria.
- Clicking "Open plan" navigates to `/v2/plans/{planId}` (deep-linked) — the URL must change.
- Clicking "Send check-in" opens a modal with the teacher's name pre-populated.
- Clicking "Schedule obs" either opens an observation-start modal OR navigates to `/v2/observation` — DOCUMENT the chosen flow in code comments.
- Empty state shows when 0 teachers match any criterion.

**How to verify**:
- Sign in as Tisha, view `/v2/home`, verify the 4 teachers shown are derived from real data (cross-reference with `/Home` legacy view).
- Click "Open plan" for Chrystaline; confirm URL becomes `/v2/plans/<id>` and the plan loads.
- Manually archive one of the listed teachers in Firestore (or use legacy AllUsers archive); refresh `/v2/home` — that teacher should drop from the list.

**Risks**:
- The "Magic 9 score dropped" criterion may not be computable in 3h. **Mitigation**: ship the simpler login/observation criteria; document the gap in code comment.

---

### T4.3: Wire recent activity timeline
**Day**: Day 4
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/pages/CoachHome.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T4.1

**Given** `CoachHome.tsx:36-41` defines `STUB_ACTIVITY` with 4 events. The mockup `chalk-2-app-mockup.html:1037-1053` shows a timeline with tone dots (success/warn/brand). The `ACTION-LOG-SOURCES.md` doc enumerates 5 sources (observations, conference plans, action plans, emails, knowledge checks).

**When** the developer:
1. Implements `api.getRecentActivity(uid, limit=10)` that:
   - Queries observations where `observedBy === '/user/' + uid` ordered by `end desc limit 5`.
   - Queries `actionPlans` where `coach === uid` ordered by `dateModified desc limit 5`.
   - Queries `conferencePlans` where `coach === uid` ordered by `dateModified desc limit 5`.
   - Queries `emails` where `user === uid` (sent by coach) ordered by `dateModified desc limit 5`.
   - Queries `knowledgeChecks` where `answeredBy === uid` ordered by `timestamp desc limit 5`.
   - Merges all 5 result lists, picks the top `limit` by timestamp, formats each as `{ title, meta, tone, timestamp }`.
2. Formats `meta` as `{teacherName} · {humanReadableAgo}` (e.g. "22 min ago" using date-fns or a small helper).
3. Replaces `STUB_ACTIVITY.map(...)` with the live list.
4. Adds loading skeleton + empty state ("No recent activity").

**Then** the timeline shows the coach's last 4 events ordered by recency, with correct tone dots.

**Acceptance criteria**:
- Each timeline item has a tone dot color matching its event type (Observation=success, Email=brand, Action Plan overdue=warn, Training=success).
- Times use "X min ago", "X hours ago", "Yesterday", or "MMM DD" depending on age.
- Limit is exactly 4 in the home page (mockup shows 4).
- Clicking "All →" link navigates to `/v2/activity` (page not yet built — for now, log a TODO comment and link to `/v2/home` or open a `<Toast>` "Coming soon").
- Sources rule reflects `ACTION-LOG-SOURCES.md`: observations log at session end; plans log on create+edit; emails log on draft save (not send).

**How to verify**:
- Sign in as Tisha, perform an observation on staging (end it), refresh `/v2/home` — confirm "Observation completed · <teacher> · just now" appears.
- Save a draft email; confirm "Email" event appears with brand-tone dot.
- Query Firestore directly for last 4 cross-source events; confirm timeline matches.

**Risks**:
- 5 parallel queries × all sources = ~2000 docs scanned per home load. **Mitigation**: scope each query with `.limit(5)`. If still slow, add a memoized cache invalidated every 30s via `setInterval` or stale-while-revalidate pattern.

---

### T4.4: Wire active plans + quick action buttons
**Day**: Day 4
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/pages/CoachHome.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T4.1

**Given** `CoachHome.tsx:43-46` defines `STUB_PLANS` with 2 hardcoded plans. The mockup shows 2 mini-plan cards with title, teacher first-initial, progress bar (65%, 30%), and due date. The header has two action buttons: "📅 Schedule" and "▶ Start observation".

**When** the developer:
1. Implements `api.getActivePlans(uid)` to return the top 2 most recently active action plans for the coach:
   - Query `actionPlans where coach === uid where status === 'Active'`, order by `dateModified desc`, limit 2.
   - For each, fetch the `actionSteps` subcollection and compute `progress = (completedSteps / totalSteps) * 100`. **Ambiguity flag**: the legacy schema does NOT track step completion (steps have `step`, `person`, `timeline` fields only). **Proposed default**: compute progress as `(steps with timeline in the past) / totalSteps` — i.e. "due-date past" as a proxy for "completed". Document in code as a known approximation.
   - Format `due` as "Due MMM DD" from `goalTimeline`.
2. Replaces `STUB_PLANS.map(...)` with the live list.
3. Wires the "▶ Start observation" header button to open a teacher-picker modal (lightweight: dropdown of `getTeacherList` results, click → navigate to `/v2/observation?teacher={id}`).
4. Wires the "📅 Schedule" button to a no-op `<Toast>` "Scheduling — coming in next sprint" (mockup doesn't define this flow; out of MVP).
5. Wires the "Open plan" CTA in each plan-mini to navigate to `/v2/plans/{planId}`.
6. Wires the top-level "View all teachers →" card link to `/v2/teachers`.

**Then** the active-plans card shows real progress for real plans, and the action buttons either deep-link or show explicit "coming soon" toasts.

**Acceptance criteria**:
- The 2 mini-plan cards reflect actual plans owned by the coach.
- Progress bar width matches the computed percentage (e.g. 65% → `width: 65%`).
- Clicking a plan-mini navigates to `/v2/plans/{realPlanId}` and the plan loads (T6.1).
- Clicking "▶ Start observation" opens a modal with teacher dropdown; selecting a teacher navigates to `/v2/observation?teacher={id}`.
- Clicking "📅 Schedule" shows a toast "Scheduling features coming in a future release" — does not crash, does not break layout.
- Empty state shows "No active plans" when count is 0.

**How to verify**:
- Sign in as Tisha; verify the 2 plans shown are the most recently edited active plans.
- Click each plan-mini; URL changes to `/v2/plans/...` and plan loads.
- Click "Start observation" → modal opens → pick Dawn → URL becomes `/v2/observation?teacher=<DawnId>`.
- Click "Schedule" → toast appears, no navigation.

**Risks**:
- Progress computation is a documented approximation; Deanna may want a "mark step complete" feature, which is OUT OF SCOPE per audit §3.1.

---

### T5.1: Wire All Teachers table to live data
**Day**: Day 5
**Estimated**: 4h
**Files affected**: `CoachingApp/src/v2/pages/AllTeachers.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T3.3

**Given** `src/v2/pages/AllTeachers.tsx:19-38` defines a hardcoded `ROWS` array with 18 teachers including real CHALK names. The mockup `chalk-2-app-mockup.html:1102-1170` shows a table with columns: Name, Role · Program, Status, Last Login, Login Count, Action Count, Last Action. The legacy `AllUsersPage` (line 47–56) already wires these from `getAllUsers`, `getUsersLoginCounts`, `getUsersActionCounts`.

**When** the developer:
1. Implements `api.getTeachersForCoach(uid, rangeStart, rangeEnd)`:
   - Calls `firebase.getTeacherList()` (line 444) to get teachers visible to this coach.
   - For coaches/admins/leaders, includes all coach-managed teachers + coaches.
   - For each user, attaches `loginCount` from `getUsersLoginCounts(start, end)` and `actionCount` from `getUsersActionCounts(start, end)`.
   - Attaches `lastAction.type` and `lastAction.date` from `getUsersLastAction()`.
   - Attaches `lastLogin` from the `users.lastLogin` field.
2. Replaces `ROWS` with `useTeachers(user.uid, range)` that calls the wrapper and returns `{ rows, loading, error }`.
3. Renders `<TableSkeleton rows={8} cols={7}/>` while loading.
4. Renders the live table with the same column structure already defined.
5. Adds an empty-state ("No teachers match these filters") when the filtered list is empty.

**Then** the table reflects real user data scoped to the logged-in coach. Default range is "last 30 days" (matches mockup's "Apr 20 – May 20" example).

**Acceptance criteria**:
- The table renders the actual users associated with the coach (verify count matches `/Home` legacy view of teachers).
- Login Count and Action Count columns reflect real numbers (cross-check against legacy `/AllUsers` for admin).
- Last Action column shows real `{Source} — {Date}` strings from `getUsersLastAction`.
- Status pill shows `Active` or `Archived` based on `archived` boolean.
- Date range defaults to today minus 30 days through today.

**How to verify**:
- Sign in as Tisha, navigate to `/v2/teachers`, compare table contents to legacy `/MyTeachers` or `/AllUsers` for same date range. Counts must match.
- Pick one teacher, count their `observations` for the range manually in Firestore, compare to Action Count cell.

**Risks**:
- `getUsersActionCounts` is expensive (~500 docs across 5 collections). For 12 teachers it's fine; for 600 it may be slow. Already in production for `/AllUsers`, so latency is known acceptable.

---

### T5.2: Make filters interactive
**Day**: Day 5
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/pages/AllTeachers.tsx`
**Depends on**: T5.1

**Given** the search input, role select, status select, date-range inputs, and 7d/30d/90d preset buttons are visual-only (`FilterInput`, `Select`, `DateInput`, `Preset` are uncontrolled in current code, lines 45–99 of `AllTeachers.tsx`).

**When** the developer:
1. Converts `FilterInput`, `Select`, `DateInput`, `Preset` to controlled components fed by `useState`.
2. Adds a top-level `useReducer` (or `useState`-grouped) in `AllTeachers` storing `{ search, role, status, rangeStart, rangeEnd, activePreset }`.
3. Implements debounced search (250ms) that filters `rows` client-side by case-insensitive match on `firstName + lastName + program`.
4. Implements role and status filtering client-side.
5. Implements date range: changing the date inputs OR clicking a preset (7d/30d/90d) re-fetches `getTeachersForCoach` with new range (because login/action counts depend on range).
6. Active preset highlights; manual date edit clears preset.
7. Format dates as `MM/DD/YY` (matches mockup).

**Then** the user can:
- Type "dawn" → table shows only Dawn Johnson.
- Pick "Coach" role → only coach rows shown.
- Click "7d" → date inputs update to today-7 → today, table reloads with new login/action counts.

**Acceptance criteria**:
- Search input: debounced 250ms, filters by first/last/program substring.
- Role select: 4 options (All, Teacher, Coach, Admin); filters rows.
- Status select: 2 options (Active, Archived); filters rows.
- Date inputs: change triggers data reload (loading skeleton appears).
- Preset buttons (7d/30d/90d): clicking updates dates AND active state; manual date edit clears active preset.
- Filter row remains responsive: stacks below `md` breakpoint (already in CSS via media query).
- "Showing 1-N of M records" counter at bottom reflects the filtered count, not the total.

**How to verify**:
- Type "ann" → only Ann James shown.
- Click "Coach" → only Tisha, Dana, Latara shown.
- Click "7d" → date inputs become today-7 → today and Login Count column updates.
- Click 7d then change start date manually → preset un-highlights.

**Risks**:
- The `<input type="text">` in current `DateInput` is not a real date picker. The mockup uses `<input type="date">`. Replace with `type="date"` for consistency; document that the mockup's `MM/DD/YY` display is decorative (browser handles localization).

---

### T5.3: Build Add Teammate modal
**Day**: Day 5
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/pages/AllTeachers.tsx`, `CoachingApp/src/v2/components/Modal.tsx` (new), `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T3.5, T5.1

**Given** the header has a "+ Add teammate" button (line 117 of `AllTeachers.tsx`) that does nothing on click. The renovation plan (§5) calls for a "new Add-user modal with role pills + CSV stub". Legacy code at `src/views/protected/AdminViews/NewUserPage.tsx` already handles the backend write.

**When** the developer:
1. Builds `<Modal>` component with header/body/footer slots, centered overlay, backdrop click closes, Esc closes.
2. Wires the "+ Add teammate" button to open an `AddTeammateModal`:
   - Fields: First name, Last name, Email, Role (pill selector: Teacher / Coach / Site Leader), Program (dropdown of available programs for the logged-in user).
   - Submit button: "Send invite".
3. On submit, calls `api.createUser({ firstName, lastName, email, role, programId })` which wraps the legacy Firebase function (locate the existing `createUser` or `createUserWithEmailAndPassword` flow used by `NewUserPage.tsx`).
4. On success, shows `<Toast tone="success">Invite sent to {email}</Toast>`, closes modal, refreshes the table.
5. On error (duplicate email, validation fail), shows toast and keeps modal open with inline error message.

**Then** an admin/coach can add a new teammate without leaving the v2 Teachers page.

**Acceptance criteria**:
- Modal opens on button click; closes on backdrop click, Esc, or X button.
- Required fields validated client-side (all 5 fields non-empty, email is `@`-shaped).
- Role pills: only one active at a time; visual highlight matches mockup style.
- Program dropdown: populated from `programs` collection filtered by user's `programs` array (admins see all, leaders see their programs).
- Successful create adds the new user to the table within 2s.
- Failed create shows error message inside modal.
- Tab order is logical (first name → last name → email → role → program → submit).

**How to verify**:
- Click "+ Add teammate"; modal opens.
- Submit empty form; see validation errors.
- Submit valid form; modal closes, table updates with the new row.
- Refresh page; new user persists.
- Inspect Firestore `users` collection; new doc has correct fields.

**Risks**:
- Creating a user typically requires creating an Auth account too. Verify whether legacy `NewUserPage` uses `createUserWithEmailAndPassword` directly or relies on a Cloud Function (admin SDK). If Cloud Function, scope creep alarm — may not be in current `funcUpdateCoach`. **Mitigation**: if blocked, ship the modal as "Save user-doc only, send invite via existing `funcSendHelpRequest` pattern" and surface as a known limitation.

---

### T5.4: Stub CSV import
**Day**: Day 5
**Estimated**: 2h
**Files affected**: `CoachingApp/src/v2/pages/AllTeachers.tsx`, `CoachingApp/src/v2/components/Modal.tsx`
**Depends on**: T5.3

**Given** the header also has a "📥 Import CSV" button that does nothing. The renovation plan (§5) explicitly calls CSV import a "stubbed" Phase 1 deliverable; full implementation is in Phase 2. Audit §3.1 states the offer includes "5 main views renovated" — CSV is mentioned in the mockup so it should at least appear non-broken.

**When** the developer:
1. Wires the "📥 Import CSV" button to open an `ImportCSVModal`:
   - Header: "Bulk import teammates"
   - Body: a download link "Get template CSV" → triggers download of a 1-row CSV with headers `firstName,lastName,email,role,program`.
   - File-drop area: visual only, accepts `.csv` files via `<input type="file" accept=".csv">`.
   - Submit: shows a `<Toast tone="info">CSV import is coming in a future release. Use 'Add teammate' for individual invites.</Toast>` and closes.
2. Documents in code comments that backend implementation (`funcImportUsers`) is Phase 2 scope.

**Then** clicking "Import CSV" is non-destructive, informs the user, and doesn't expose a broken feature.

**Acceptance criteria**:
- Button click opens a modal with template-download link.
- Template CSV downloads correctly (`Content-Disposition: attachment; filename=chalk-teammates-template.csv`).
- Selecting a file shows the filename in the modal.
- Submitting shows the "coming in a future release" toast and closes.
- No backend write occurs.

**How to verify**:
- Click "📥 Import CSV"; verify modal opens.
- Click "Get template CSV"; verify download.
- Select any CSV; click submit; verify toast and modal close.
- Inspect Firestore — no new docs.

**Risks**: none — this is intentionally stubbed.

---

### T6.1: Wire Plan Detail to live data
**Day**: Day 6
**Estimated**: 4h
**Files affected**: `CoachingApp/src/v2/pages/PlanDetail.tsx`, `CoachingApp/src/v2/App.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T3.3, T3.5

**Given** `src/v2/pages/PlanDetail.tsx` hardcodes the "Reducing transition time" plan for Chrystaline Glenn (lines 46–73, 86–106) and renders 3 stub action steps. The route is `/v2/plans` with no `:planId` param. Firebase has `getActionStepsForExport` (line 3340) and `saveActionPlan` (line 3812) ready to consume.

**When** the developer:
1. Changes the route in `src/v2/App.tsx` from `<Route path="/v2/plans" ...>` to `<Route path="/v2/plans/:planId" ...>` + a separate `<Route path="/v2/plans" ...>` for an index (T6.1.5).
2. Implements `api.getActionPlanFull(planId)` that returns `{ id, teacherFirstName, teacherLastName, teacherId, goal, goalTimeline, benefit, dateCreated, dateModified, status, actionSteps[], comments[] }`:
   - Fetches `actionPlans/{planId}` doc.
   - Fetches `actionPlans/{planId}/actionSteps` subcollection.
   - Fetches the teacher's user doc for name display.
   - Fetches `actionPlans/{planId}/comments` subcollection (new collection — T6.3).
3. Replaces the hardcoded Plan Detail JSX with live data.
4. Renders breadcrumb "Action Plans / {teacher.firstName} {teacher.lastName}" using live teacher name.
5. Renders header title from `plan.goal` (truncated to 60 chars).
6. Renders subtitle "For {teacher} · created {plan.dateCreated} · due {plan.goalTimeline}" with live dates.
7. Renders 3 action-step `<Field>` blocks using live `actionSteps[i].step` and `actionSteps[i].timeline` (label = "Step N · By MMM DD" from timeline).
8. Renders the "📈 Progress" card with the computed `progress` from T4.4's progress logic.
9. **Index page (T6.1 secondary scope)**: `/v2/plans` shows a list of all action plans for the coach (reuses `getCoachActionPlans`) with each row clickable to `/v2/plans/{id}`.

**Then** navigating to `/v2/plans/{realPlanId}` loads the actual plan from Firestore.

**Acceptance criteria**:
- The page loads for any valid `actionPlanId` from `actionPlans` collection.
- Breadcrumb, title, subtitle, and action steps reflect Firestore data.
- A 404 page or `<EmptyState>` shows for invalid IDs.
- `/v2/plans` (no ID) shows a list of plans for the coach, sorted by `dateModified desc`.
- Clicking a plan row in the list navigates to `/v2/plans/{id}` and the plan loads.

**How to verify**:
- Open Firestore console, pick any existing actionPlan doc ID, navigate to `/v2/plans/{thatId}`; verify the plan loads with matching goal text and steps.
- Navigate to `/v2/plans/nonexistent-id`; verify the not-found state appears.
- Navigate to `/v2/plans`; verify the list shows all coach's plans.

**Risks**:
- Conference plans use a different collection (`conferencePlans`) but the mockup is specifically an action plan. **Ambiguity flag**: the mockup shows ONLY action plan structure. **Proposed default**: only wire action plans in the 10-day sprint; conference plans use existing legacy `/ConferencePlan` route. Document.

---

### T6.2: Auto-save plan fields
**Day**: Day 6
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/pages/PlanDetail.tsx`, `CoachingApp/src/v2/lib/api.ts`, `CoachingApp/src/v2/hooks/useAutoSave.ts` (new)
**Depends on**: T6.1

**Given** the mockup shows "✓ Saved 3s ago" pill (header right). The plan view in v2 currently has no editable fields. The renovation plan (§5) explicitly lists "Auto-save on coaching/action plans" as a Phase 1 deliverable. Legacy `saveActionPlan` already updates `dateModified` (line 3826).

**When** the developer:
1. Builds `useAutoSave<T>(value, saveFn, delay=1500)` hook that:
   - Tracks `lastSavedAt: Date | null`.
   - On `value` change, sets a debounced timer.
   - After `delay`ms idle, calls `saveFn(value)` and updates `lastSavedAt`.
   - Returns `{ status: 'idle' | 'pending' | 'saving' | 'saved' | 'error', lastSavedAt }`.
2. Makes the plan's `goal`, `benefit`, and per-step `step` fields editable: `<Field>` becomes a `<contenteditable>` or `<textarea>` with `value` state.
3. Wires `useAutoSave` for each field. On change → "Saving…" → 1.5s pause → call `api.saveActionPlanField` → update "✓ Saved Xs ago".
4. Header pill shows `useAutoSave` status: pulsing green dot + "Auto-saving…" while pending; static "✓ Saved Xs ago" when idle.
5. Time-ago counter updates every 10s.
6. On Firestore write failure, shows "⚠ Couldn't save — retrying" and retries with exponential backoff (max 3 attempts), then surfaces `<Toast tone="error">`.

**Then** the coach can edit the plan's goal, benefit, and steps inline. Every edit auto-saves within ~2s of typing stopping.

**Acceptance criteria**:
- Typing in the Goal field shows "Saving…" within 100ms of last keystroke.
- After 1.5s idle, status becomes "✓ Saved Xs ago" and Firestore `actionPlans/{id}.goal` is updated.
- `dateModified` is also updated (legacy `saveActionPlan` already does this).
- Editing a step calls `saveActionStep` (line 3844) on the right subcollection doc.
- Network failure simulation (DevTools offline mode) shows error state and retries after coming back online.
- Closing the tab during a pending save does NOT lose data (the save fires on `beforeunload` via the hook).

**How to verify**:
- Open `/v2/plans/{id}`; edit goal text; wait 2s; reload page; verify text persists.
- Toggle DevTools offline; edit; verify error indicator; toggle online; verify recovery.
- Open Firestore console; watch `actionPlans/{id}` field-by-field updates.

**Risks**:
- Concurrent edit conflict: two coaches editing same plan. **Default**: last-write-wins (Firestore default). Document as a known limitation. **Out of scope**: collaborative editing / operational-transform.

---

### T6.3: Comments thread (in-app messaging on plan)
**Day**: Day 6
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/pages/PlanDetail.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T6.1, T3.0

**Given** the mockup `chalk-2-app-mockup.html:1320-1351` shows a conversation between Tisha and Chrystaline with 3 messages and an input box at bottom. Current code (`PlanDetail.tsx:115-147`) renders 3 hardcoded `<Comment>` components. The renovation plan (§6) describes "in-app plan sharing with audit trail + comments" as a Phase 2 item — partially included in the $20K scope per audit §3.1's "5 main views renovated" mockup.

**When** the developer:
1. Defines a new subcollection schema: `actionPlans/{planId}/comments/{commentId}` with fields `{ userId, userFirstName, userLastName, text, timestamp }`.
2. Implements `api.getPlanComments(planId)` and `api.addPlanComment(planId, text)`:
   - `getPlanComments`: orders by `timestamp asc`.
   - `addPlanComment`: writes a doc with current user's uid + name + text + `serverTimestamp()`.
3. Replaces hardcoded `<Comment>` components with `comments.map(c => <Comment ...>)`.
4. Wires the input box at bottom: typing + Enter or Send button → calls `addPlanComment` → optimistically appends to local list → updates on Firestore confirmation.
5. After successful add, refreshes `dateModified` on the parent plan doc (so the activity feed in Coach Home picks it up).
6. Auto-scrolls to bottom on new comment.

**Then** Tisha can write a comment on Chrystaline's plan, it persists to Firestore, and is visible on subsequent loads or to Chrystaline if she opens the same plan URL.

**Acceptance criteria**:
- Empty plan shows "No messages yet" placeholder.
- Existing plans show all comments in chronological order.
- Typing + Send writes a new doc to `actionPlans/{id}/comments` subcollection.
- The new comment appears immediately in the UI (optimistic) and is confirmed by Firestore within 2s.
- Avatar uses the message author's name (gradient-generated initials).
- Time format: "MMM D · h:mm A" matching mockup.

**How to verify**:
- Open a plan, send a test message; refresh page; verify it persists.
- Open Firestore console; verify the new doc appears in the `comments` subcollection.
- Sign in as a different user (or use legacy admin tools to switch users) and open the same plan URL; verify the message is visible.

**Risks**:
- Security posture depends on T3.0. With the current wildcard, comments are functionally allowed but not narrowly enforced; do not claim user-scoped enforcement unless the wildcard is replaced or narrowed.
- Audit §8 risk #8: "Code review step before merge: scan for any string that's a teacher name". Make sure no hardcoded comment strings remain after this task.

---

### T6.4: Send-to-teacher button + confirmation modal
**Day**: Day 6
**Estimated**: 2h
**Files affected**: `CoachingApp/src/v2/pages/PlanDetail.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T6.3 (reuses comment infrastructure)

**Given** the mockup shows a primary action button "📨 Send to teacher" in the plan header. The renovation plan (§5) lists "'Send to teacher' — replaces download buttons on plans, writes a record + triggers existing SendGrid Cloud Function". Cloud Function `funcSendEmail` (`/Users/admin/Projects/Couture/chalk-coaching/CoachingApp/functions/funcSendEmail/index.js`) is already wired to SendGrid.

**When** the developer:
1. Wires the "📨 Send to teacher" button to open a confirmation modal.
2. Modal shows: "Send this plan to {teacherFirstName} via email?" with a textarea pre-populated with a default message ("Hi {firstName}, please review the action plan we discussed. Reply here or in CHALK to start the conversation. — {coachName}").
3. Submit:
   - Calls `firebase.saveEmail` (line 4119) to persist a draft of `{ recipient: teacher, subject: "Action plan: {plan.goal}", emailContent: textarea + link to /v2/plans/{id} }`.
   - Calls `firebase.sendEmail` (line 399) which encrypts and invokes `funcSendEmail`.
   - On success, calls `firebase.changeDraftToSent` (line 4286) to mark the email as sent.
   - Writes `sentToTeacher: { sentAt: Timestamp.now(), by: coachUid }` field on the plan doc (additive — per renovation plan §5).
   - Adds a comment automatically: "📨 {coachName} sent this plan to {teacherName}" (system message).
4. On success, closes modal, shows `<Toast tone="success">Plan sent to {teacherName}</Toast>`.
5. Disables the button (and shows "✓ Sent {date}" instead) once a `sentToTeacher` field exists.

**Then** clicking "Send to teacher" emails the plan link and records the action.

**Acceptance criteria**:
- Modal opens on button click.
- Default message is pre-populated and editable.
- Submit triggers an actual SendGrid email (verify in SendGrid dashboard or staging-only test inbox).
- Firestore plan doc has new field `sentToTeacher: { sentAt, by }`.
- A system comment is appended to the plan's comments subcollection.
- Button state changes to "✓ Sent" after success.

**How to verify**:
- Create or use a test plan with a test teacher whose email is your own.
- Click "Send to teacher"; submit; check your inbox.
- Inspect Firestore: `actionPlans/{id}.sentToTeacher` field exists with correct values.
- Inspect comments subcollection: system message appended.

**Risks**:
- `funcSendEmail` requires the message to be CryptoJS-encrypted client-side (`Firebase.tsx:399` is `sendEmail` which doesn't encrypt; the legacy MessagingView does the encryption). Need to replicate the encryption pattern. **Mitigation**: copy the encryption code from `src/views/protected/MessagingViews/MessagingView.tsx` or wherever `sendEmail` is called with proper payload. Test on staging before claiming feature complete.

---

### T7.1: Wire Live Observation session start
**Day**: Day 7
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/pages/LiveObservation.tsx`, `CoachingApp/src/v2/App.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T3.3, T3.5

**Given** `src/v2/pages/LiveObservation.tsx` hardcodes Dawn Johnson at Preschool Promise (lines 73–80, 130–138) and renders 5 stub notes (lines 157–162). The route is `/v2/observation` (no params). Firebase has `handleSession` (line 1026) for session start.

**Given (additional constraint from audit)**: UI tool codes in `CoachingApp/src/constants/Constants.tsx:14-22` are not the same as the values legacy writes to `observations.type`. The downstream BigQuery pipeline in `CoachingApp/functions/observationToBQ/index.js:55` derives the destination table from `newValue.type.toLowerCase()`. Legacy starts sessions with storage values like `transition`, `climate`, `math`, `engagement`, `level`, `listening`, `sequential`, plus exact `AC` and `LI`. If v2 writes `TT` or `CC` directly, BigQuery looks for tables `tt` or `cc`, which is wrong.

**Required mapping**:

| UI code | UI label | Stored `observations.type` |
|---|---|---|
| `TT` | Transition Time | `transition` |
| `CC` | Classroom Climate | `climate` |
| `MI` | Math Instruction | `math` |
| `SE` | Student Engagement | `engagement` |
| `IN` | Level of Instruction | `level` |
| `LC` | Listening to Children | `listening` |
| `SA` | Sequential Activities | `sequential` |
| `AC` | Associative and Cooperative Interactions | `AC` |
| `LI` | Literacy Instruction | `LI` plus a required `checklist` value |

**When** the developer:
1. Changes route to `/v2/observation/:sessionId?` and accepts `?teacher={id}&type={CODE}` query params where `CODE` is a UI code from the table above.
2. On mount:
   - If `?teacher=` is set but `?type=` is missing, render an inline "Pick what you're observing" type picker using labels from `Constants.ToolNames`.
   - Once the user picks a type, map the UI code to the stored legacy type before calling `api.startObservation(coachUid, teacherId, storedType, checklist?)`.
   - For `LI`, either require a checklist subtype before starting or route the coach to the existing legacy literacy flow. Do not start an `LI` observation without `checklist`, because `observationToBQ` derives `literacy${checklist}`.
   - Load the teacher's user doc to display name + classroom + program.
3. The "Open Observation" framing in the mockup is honored as a UI affordance, but stored data remains legacy-compatible.
4. Renders context bar with live teacher name, program, classroom. The session activity label is editable inline.
5. Removes the hardcoded notes in the notes div — replaces with an empty contenteditable.
6. Renders "Auto-saved · 4s ago" pill controlled by T7.2.
7. "Cancel" button calls `firebase.discardSession` (line 1120) and navigates back to `/v2/home`.

**Then** clicking "▶ Start observation" → teacher picker → type picker → `/v2/observation?teacher=…&type=TT` starts a real session whose stored `observations.type` is `transition`, so it flows correctly through existing BigQuery and reporting paths.

**Acceptance criteria**:
- Visiting `/v2/observation` without `?teacher=` shows an empty state "Pick a teacher to start observing" with a teacher picker dropdown.
- Visiting `/v2/observation?teacher={id}` (no type) shows a type picker rendering all supported dimensions from `Constants.ToolNames`.
- Visiting `/v2/observation?teacher={id}&type=TT` initializes a session in memory with `firebase.currentObservation.type === 'transition'`.
- Visiting `/v2/observation?teacher={id}&type=CC` initializes `firebase.currentObservation.type === 'climate'`.
- `LI` cannot start without a valid checklist, or it routes to legacy literacy.
- Type picker labels come from `Constants.tsx`, but storage values come from the explicit legacy mapping above.
- "Cancel" navigates away and clears in-memory session.
- No new type codes are introduced. `grep -rn "'OO'" src functions` returns 0 matches.

**How to verify**:
- From /v2/home, click "Start observation" → pick Dawn → URL = `/v2/observation?teacher=<DawnId>` → see type picker → pick "Transition Time" → URL becomes `/v2/observation?teacher=<DawnId>&type=TT` → session begins with stored type `transition`.
- Click Cancel → returns to /v2/home → `firebase.currentObservation === null`.
- Open Firestore observations collection after T7.4 end and confirm the new doc stores the legacy type value, not the UI code.

**Risks**:
- `handleSession` sets `this.currentObservation` on the Firebase singleton — survives across React renders but NOT across page reloads. The "auto-save" feature for observations (T7.2) needs a different persistence mechanism. **Default**: use the `users/{uid}.observationDraft` field path; surface "in-flight observation lost on page refresh after the draft cycle" as a known limitation. Document in T10.2 review.
- Reusing legacy stored types means v2 cannot capture a truly free-form observation that doesn't fit the existing CHALK dimensions. **Acceptance**: keep free-form UI affordances, but persist only legacy-compatible observation types in this sprint.

---

### T7.2: Timer + notes auto-save to Firestore draft
**Day**: Day 7
**Estimated**: 4h
**Files affected**: `CoachingApp/src/v2/pages/LiveObservation.tsx`, `CoachingApp/src/v2/hooks/useAutoSave.ts`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T7.1, T6.2 (reuses auto-save hook), T3.0

**Given** the mockup shows a running timer (14:32) and a notes div with timestamped entries. Real implementation needs a persistent timer (so the page survives reload) and auto-save of notes content.

**When** the developer:
1. Builds a `useTimer(startedAt)` hook that returns `{ elapsed: 'MM:SS' }` updated every second.
2. Stores `session.start` (a `Date`) on `firebase.currentObservation.start` already (line 1037).
3. Implements `api.saveObservationDraft(sessionId, notesText)` that writes to a new `observationDrafts/{sessionId}` doc (or amends `users/{uid}/drafts/observation` — single-draft-per-user model). **Default**: use single-draft per user (`users/{uid}/observationDraft` map) to avoid creating a new top-level collection.
4. Wires `useAutoSave` on the notes contenteditable: every 1.5s of idle, writes the current text + last-modified timestamp to the user's `observationDraft` field.
5. Updates the "Auto-saved · Xs ago" pill from the hook status.
6. On page load, if `users/{uid}.observationDraft` exists with an `inProgress: true`, prompts the user "Resume your in-progress observation?".
7. Implements a basic timestamp insertion: cmd-T (or button-click) inserts `<span class="ts">{currentElapsed}</span> ` at cursor position in the notes.

**Then** the coach can type notes, see them auto-save every 1.5s, and resume if they close and reopen the tab.

**Acceptance criteria**:
- Timer ticks every second, shows MM:SS format.
- Typing in notes shows "Saving…" then "Auto-saved · Xs ago".
- Closing tab and reopening within 24h shows a "Resume observation?" banner with the saved notes pre-loaded.
- Cmd-T (mac) / Ctrl-T (win) inserts a timestamp tag at cursor.
- "Pause" button stops the timer; resuming continues from same offset.

**How to verify**:
- Start observation, type 200 chars of notes, watch save pill.
- Refresh page; verify "Resume observation?" prompt; accept; notes pre-loaded.
- Hit Cmd-T; verify a timestamp pill is inserted at cursor.
- Watch Firestore: `users/{uid}.observationDraft.text` updates every 1.5s.

**Risks**:
- contenteditable + auto-save introduces XSS if user pastes HTML. **Mitigation**: strip HTML on input (`innerText` only) and re-render with sanitized timestamp tags as React elements.
- Firestore doc field-size limit is 1MB. A long observation could approach this. **Mitigation**: if notes >100KB, write to a subcollection instead.

---

### T7.3: Sidebar — Magic 9 tags, shortcuts, last observation
**Day**: Day 7
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/pages/LiveObservation.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T7.2

**Given** the mockup right sidebar shows: Magic 9 quick tags (9 chips), keyboard shortcuts (⌘T, ⌘K, ⌘P, ⌘↵), and "Last observation" card with title + summary + view link. Current code (`LiveObservation.tsx:178-202`) renders these statically.

**When** the developer:
1. Wires Magic 9 chips: clicking a chip inserts `<Tag>{name}</Tag>` at cursor in the notes editor.
2. Implements keyboard shortcuts (`useEffect` adding window keydown listener):
   - Cmd/Ctrl-T → insert timestamp.
   - Cmd/Ctrl-K → opens a tag picker dialog.
   - Cmd/Ctrl-P → opens photo upload (stub — toast "Photo upload coming soon").
   - Cmd/Ctrl-Enter → triggers "End & align" (T7.4).
3. Implements `api.getLastObservation(teacherId)` returning the most recent completed observation for that teacher:
   - Title: type ("Open observation" / "Morning circle" — derive from session type or activitySetting).
   - Date: `end.toDate()`.
   - Summary: stub — render "Strengths in {top dimension}, opportunity in {bottom dimension}" using Magic 9 score data if available, else "Last observation completed {date}".
4. "View →" link navigates to `/v2/observation/{lastObservationId}` (which is a read-only mode; for sprint scope, just open the legacy observation results URL `/{Type}Results?sessionId={id}`).

**Then** the sidebar is fully interactive — chips insert tags, shortcuts work, last-observation card shows real data.

**Acceptance criteria**:
- Clicking "Listening" chip inserts `Listening` tag into the notes at cursor position.
- Pressing Cmd-T inserts the current elapsed timestamp.
- Pressing Cmd-Enter triggers end-and-align flow.
- "Last observation" card shows real metadata for the current teacher's most recent completed observation.
- View link navigates somewhere reasonable (legacy results page acceptable).

**How to verify**:
- During an active observation, click chips → tags appear in notes.
- Press shortcuts → expected behaviors happen.
- Verify "Last observation" card shows real data (cross-check with legacy view).

**Risks**:
- contenteditable cursor position is fiddly cross-browser. **Mitigation**: use `Selection`/`Range` APIs carefully; fallback to "append to end" if cursor position fails.

---

### T7.4: End & align to framework — write observation doc
**Day**: Day 7
**Estimated**: 2h
**Files affected**: `CoachingApp/src/v2/pages/LiveObservation.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T7.2

**Given** the mockup has primary button "End & align to framework →" at bottom of notes (line 1233 of mockup HTML). Legacy `endSession` (line 1057) writes the observation doc to Firestore. The renovation plan (§6) describes a separate "Magic 9 alignment screen" as a Phase 2 item; for the $20K sprint, a minimal version is needed (the alignment screen itself may be deferred).

**When** the developer:
1. Wires the "End & align" button:
   - Calls `api.endObservation()` which:
     - Reads the current `firebase.currentObservation` state.
     - Parses notes text into `entries` (each timestamp-prefixed paragraph = one entry with extracted tags).
     - Calls `firebase.endSession()` (line 1057) which writes the doc to `observations` collection.
     - Clears the draft from `users/{uid}.observationDraft`.
2. After successful write, navigates to a new minimal alignment screen `/v2/observation/{newSessionId}/align`. **Default**: ship a stub screen that shows "Observation saved. Alignment screen coming soon." with a "Back to home" button. Audit the gap as a Phase 2 scope item.
3. Shows toast "Observation saved" on success.

**Then** clicking "End & align" persists the observation as a completed `observations` doc and the coach is taken to a confirmation screen.

**Acceptance criteria**:
- The button writes a new doc to `observations` collection with the correct teacher, observedBy, start, end, notes, and `type` matching the picker choice from T7.1 (one of the 9 codes in `Constants.tsx`).
- `users/{uid}.observationDraft` is cleared after save.
- The session is recorded in the Activity Log (verifiable on Home page T4.3) within a refresh.
- Confirmation screen shows; "Back to home" returns to /v2/home.
- The teacher's "Last Action" updates to "Observation" within 2 minutes (next Home load).

**How to verify**:
- Run a 1-minute observation; click End & align; check Firestore for new doc in `observations` with correct fields.
- Verify `users/{uid}.observationDraft.inProgress` is false or field is removed.
- Return to /v2/home; verify "Observation completed" appears in Recent Activity.

**Risks**:
- The Magic 9 alignment screen is the most complex Phase 2 item (renovation plan §6, 8h budget). Cutting it to a stub is **the largest scope reduction** in this sprint. Document explicitly in T10.2 review notes before prod signoff and restate in T10.3 release notes.

---

### T8.1: Wire Training cards to real data model
**Day**: Day 8
**Estimated**: 3h
**Files affected**: `CoachingApp/src/v2/pages/Training.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T3.3

**Given** `src/v2/pages/Training.tsx:16-23` hardcodes 6 training cards with stub reasons ("3 of your teachers flagged…", "Recurring theme in last 5 observations…"). The renovation plan (§6) describes a Cloud Function `funcRecommendTraining` as Phase 2 — out of $20K scope. Existing training modules live in legacy `/Training` route.

**When** the developer:
1. Defines a `trainings` data shape: `{ id, title, icon, tone, durationMinutes, completedAt?, lastReviewedAt? }`.
2. Hardcodes the 6 training modules (Smooth Transitions, Open-Ended Questions, Classroom Climate, Conscious Discipline, Magic 9 effectively, Writing better action plans) in `src/v2/lib/trainings.ts` (data file, not stub). These match the existing legacy training modules where possible (Classroom Climate, Sequential Activities, etc.).
3. Implements `api.getTrainingRecommendations(uid)` that returns one card per training module, with a computed `reason` based on simple rules:
   - **Alert ("⚠ 3 of your teachers flagged…")**: count of observations where the dimension was rated low for any of the coach's teachers in the last 30d. **Simplification**: count observations of type matching the training topic (e.g. "Transitions" training → count of observations with `type==='TT'` for this coach's teachers).
   - **Win ("✓ Top 10%…")**: if the coach has completed at least 5 sessions of this type and the average score is in the top quartile across all coaches. **Simplification**: if completed, mark as "Refresh available".
   - **Skip ("Completed in 2024 — skip unless needed")**: if `users/{uid}/training/{moduleId}.lastCompleted` exists.
4. Replaces `CARDS` const with `useTrainingRecommendations(uid)`.

**Then** the 6 cards still appear (same titles, same icons) but with reason text derived from real per-coach activity.

**Acceptance criteria**:
- 6 cards render with correct titles and icons.
- Each card's "reason" text comes from `api.getTrainingRecommendations`, not from a hardcoded array.
- For coaches with no observation history, "alert" reasons show "Foundational — recommended" (graceful fallback).
- For coaches who completed a module, "skip" reasons reference the completion date.

**How to verify**:
- Sign in as Tisha; load `/v2/training`; verify each card's reason reflects her data.
- Sign in as a fresh test account with no activity; verify cards show fallback reasons (no crashes).

**Risks**:
- The "recommendation logic" is intentionally simplistic for sprint scope. Document in code that proper logic is Phase 2 (`funcRecommendTraining`).

---

### T8.2: Wire Start / Refresh / Review-notes actions
**Day**: Day 8
**Estimated**: 2h
**Files affected**: `CoachingApp/src/v2/pages/Training.tsx`, `CoachingApp/src/v2/App.tsx`
**Depends on**: T8.1

**Given** the cards have CTAs: "Start (18 min)", "Start (24 min)", "Refresh (8 min)", "Review notes", "Not now", "Start (12 min)". Current implementation (lines 86–94) renders Button but click does nothing.

**When** the developer:
1. Each training card's CTA navigates to the legacy training URL for that module (where one exists):
   - Smooth Transitions → `/TransitionTimeTraining`
   - Open-Ended Questions → `/ListeningToChildrenTraining` (closest match — document the mapping)
   - Classroom Climate → `/ClassroomClimateTraining`
   - Conscious Discipline → no legacy module → shows a `<Toast tone="info">Module coming soon</Toast>` (or links to coaching resources `/CoachingResources/ProfessionalDevelopmentMaterials/`).
   - Magic 9 effectively → links to `/CoachingResources/ChalkCrosswalks`
   - Writing better action plans → no legacy → toast.
2. "Not now" button dismisses the card for 7 days (writes to `users/{uid}.trainingDismissals[moduleId]` with a future date). Card disappears on next load if dismissed.
3. "Review notes" links to `/CoachingResources/ProfessionalDevelopmentMaterials/{module}`.

**Then** clicking a training CTA takes the user into the existing legacy training, which already handles knowledge checks correctly.

**Acceptance criteria**:
- 5 of 6 cards navigate to a working legacy URL.
- The 6th card (where no legacy module exists) shows a coming-soon toast.
- "Not now" hides the card and persists the dismissal.
- Dismissed cards reappear after 7 days.

**How to verify**:
- Click each CTA; verify navigation or toast.
- Click "Not now"; refresh; verify card hidden.
- Manually advance the dismissal date in Firestore; refresh; verify card returns.

**Risks**:
- Going from v2 → legacy → back to v2 may cause SW cache issues. Document in T9.2.

---

### T8.3: Track training completion (knowledge check submit)
**Day**: Day 8
**Estimated**: 2h
**Files affected**: `CoachingApp/src/v2/pages/Training.tsx`, `CoachingApp/src/v2/lib/api.ts`
**Depends on**: T8.1

**Given** legacy `pushKnowledgeCheck` (line 995) already writes to `knowledgeChecks` collection on quiz answer submit. The v2 Training page should reflect completions without modifying legacy code.

**When** the developer:
1. On `/v2/training` page mount, queries `knowledgeChecks where answeredBy === uid` and tallies completions per module type.
2. For each module, if user has answered >=80% of its questions correctly, marks `users/{uid}/training/{moduleId}.completedAt = serverTimestamp()`.
3. Reflects this on subsequent loads as "Completed {date}".
4. Re-uses `api.getTrainingRecommendations` to compute the win/skip state.

**Then** completing a training in the legacy flow surfaces on the v2 Training page on next visit.

**Acceptance criteria**:
- Completing all knowledge checks in `/TransitionTimeTraining` marks the Smooth Transitions card as "✓ You scored…" or "Completed".
- Completion persists across reloads.

**How to verify**:
- Submit answers to all questions in legacy training; return to /v2/training; verify state change.

**Risks**: none — read-only of existing data.

---

### T8.4: Implement training-gate skip rule
**Day**: Day 8
**Estimated**: 1h
**Files affected**: `CoachingApp/src/v2/pages/LiveObservation.tsx`, `CoachingApp/src/v2/App.tsx`
**Depends on**: T7.1

**Given** the renovation plan (§5) explicitly calls for "Remove pre-observation training gate for users with role === 'coach' && yearsActive > 1 (or simpler: any non-teacher role)". Audit §3.1 mentions "training-gate skip rule" as a Phase 1 deliverable. Legacy `getUnlockedSections` (line 1281) returns the array used to gate Magic 8 menu.

**When** the developer:
1. When navigating to `/v2/observation?teacher={id}`, checks if user role is `coach`/`admin`/`siteLeader`/`programLeader` — if yes, skips any training-required check.
2. For `teacher` role, applies legacy rule (training required before observe).
3. Documents in code that the v2 entry point bypasses the legacy `Magic8Menu` flow entirely; the v2 observation is a unified "Open mode" that doesn't gate on training.
4. **Ambiguity flag**: legacy `getUnlockedSections` returns a numeric array indicating which dimensions are "unlocked" per training. **Proposed default**: in v2 Open Mode, ALL dimensions are available as Magic 9 tags regardless of training status. Document as v2 simplification.

**Then** any non-teacher user can start an observation directly from /v2/home without first completing a training module.

**Acceptance criteria**:
- A coach with empty `unlocked` array can still visit `/v2/observation?teacher=...` and use the editor.
- A teacher account (if any) is blocked — redirect to /v2/training with toast "Complete a training first".
- No spurious navigation to legacy `/Magic8Menu` from v2.

**How to verify**:
- Use a test coach account with `unlocked = []`; verify observation accessible.
- Use a teacher account; verify redirect to /v2/training.

**Risks**: none.

---

### T8.5: Cross-page polish — empty states, loading, error
**Day**: Day 8
**Estimated**: 3h
**Files affected**: all `src/v2/pages/*.tsx`
**Depends on**: T3.5, T4.1–T4.4, T5.1–T5.4, T6.1–T6.4, T7.1–T7.4, T8.1–T8.4

**Given** each page is wired (T4–T8 above) but loading/empty/error states are only included on the happy path. The audit (§5.4) lists these as missing.

**When** the developer audits each page and ensures:
1. **Loading**: skeleton matches the final layout (4 stat skeletons, table skeleton, card skeletons).
2. **Empty**: friendly empty-state with icon, title, description, optional CTA. Examples:
   - Coach Home, no teachers: "Add your first teammate" CTA → opens Add Teammate modal.
   - Teachers table, filtered to 0: "No teachers match these filters" with "Clear filters" link.
   - Plan Detail, no comments: "Start the conversation".
   - Training, no recommendations: "You're all caught up!".
3. **Error**: explicit error card with retry button and "Contact support" link.
4. All async calls wrapped in try/catch; errors update local state, not unhandled-rejection.

**Then** every v2 page handles all 3 non-happy states gracefully.

**Acceptance criteria**:
- Disabling network in DevTools and visiting each page shows the correct error state.
- Visiting each page with a fresh test account (no teachers, no plans, no observations) shows the empty state.
- Each error state has a Retry button that re-fetches.

**How to verify**:
- For each page: load fresh test account, verify empty state.
- For each page: open DevTools → Network → Offline; refresh; verify error state.
- Click retry on error state with network back online; verify recovery.

**Risks**: time-consuming and easily de-scoped. **Mitigation**: prioritize empty states (most visible to Deanna's review) over error states (rarer).

---

### T9.1: Routing decision — coexistence vs replacement
**Day**: Day 9
**Estimated**: 2h
**Files affected**: `CoachingApp/src/App.tsx`, `CoachingApp/src/v2/App.tsx`, `.chalk/V2-ROUTING.md` (new)
**Depends on**: T3.4

**Given** the renovation plan (§13 appendix) sketches "Routes: `/Home` v1 (until Phase 1 ships, then redirects to `/home`)". The strangler-fig strategy (audit §4.1) supports coexistence. The audit §3.1 includes "5 main views renovated" — the 5 v2 routes (`/v2/home`, `/v2/teachers`, `/v2/observation`, `/v2/plans`, `/v2/training`). Legacy routes exist for all 5.

**When** the developer makes and documents a routing decision:
**Recommended approach (coexistence with explicit migration)**:
1. **Keep all legacy routes working** (`/Home`, `/MyTeachers`, `/Magic8Menu`, `/ActionPlans`, `/Training`).
2. **Make `/v2/*` the recommended path** for the 5 renovated views.
3. **Add v2 banner on legacy pages**: A small "Try the new CHALK 2.0" banner on `/Home` linking to `/v2/home`. This drives organic discovery without forcing the cutover.
4. **NO automatic redirects in this sprint**. Deanna pilots v2 with select coaches; once validated (Phase 2 of audit), redirect legacy → v2.
5. Document the decision in `.chalk/V2-ROUTING.md` with rationale.

**Then** users can choose v2 or legacy without anything breaking; communication (T10.3) explains the choice.

**Acceptance criteria**:
- `.chalk/V2-ROUTING.md` exists with the decision, alternatives considered (full cutover, automatic redirect, A/B test), and rationale.
- Legacy `/Home` page renders a small banner "Try the new CHALK home — preview" linking to `/v2/home`.
- No legacy routes are removed.
- No automatic redirects added.
- Bookmarks to legacy routes still work.

**How to verify**:
- Visit `/Home`; see banner.
- Visit `/MyTeachers`; legacy page loads.
- Visit `/v2/home`; v2 loads.
- Document is committed.

**Risks**:
- Banner addition is a small modification to legacy `HomePage.tsx`. May trigger merge conflicts with other contributors. Coordinate via Slack.

---

### T9.2: Service Worker cache mitigation
**Day**: Day 9
**Estimated**: 2h
**Files affected**: `CoachingApp/webpack.config.js`, `CoachingApp/src/index.tsx`, `.chalk/deploy-checklist.md`
**Depends on**: T9.1

**Given** the audit (§8 risk #4) flags Service Worker cache as a high-likelihood issue ("we hit this in CHALK-110"). The real production service worker is generated by `WorkboxPlugin.GenerateSW` in `CoachingApp/webpack.config.js:114-119`; `public/service-worker.js` is not the source of truth for the production build and should not be manually version-bumped as the mitigation.

**When** the developer:
1. Inspects `WorkboxPlugin.GenerateSW` in `webpack.config.js` and confirms `clientsClaim` and `skipWaiting` are set.
2. Adds a client-side update flow in `src/index.tsx`: on SW registration, listen for `updatefound` / `controllerchange` and show a lightweight update prompt or force a single controlled reload after the new worker activates.
3. Avoids manual edits to generated `build/service-worker.js` or stale `public/service-worker.js` as part of normal deploy.
4. Documents the deploy-time SW verification in `.chalk/deploy-checklist.md`: build, deploy, open an already-cached tab, confirm it updates or prompts within 60s.

**Then** when a new build deploys, users either see an update prompt or get a controlled reload onto the new bundle without requiring manual hard refresh as the default path.

**Acceptance criteria**:
- `npm run staging` generates `build/service-worker.js` via Workbox.
- An already-open staging tab receives the new service worker after a second deploy.
- The app shows an update prompt or performs one controlled reload; it does not loop reload.
- Cold-load (new browser session) serves the latest bundle without manual refresh.
- `.chalk/deploy-checklist.md` documents the SW update verification.

**How to verify**:
- Deploy current state to staging.
- Make a visible change (e.g. dashboard title text) and deploy again.
- Open the staging URL in a browser tab that already had the prior version cached; observe the update prompt or controlled reload.

**Risks**:
- SW changes can lock users on a broken version if the new SW doesn't activate properly. **Mitigation**: test the upgrade path on a personal device before claiming complete.

---

### T9.3: Responsive QA matrix
**Day**: Day 9
**Estimated**: 3h
**Files affected**: all `src/v2/pages/*.tsx` (CSS adjustments only), `src/v2/design/responsive.css` (new)
**Depends on**: T4.1–T8.4

**Given** the renovation plan (§4) commits to responsive layouts at viewports 375 / 768 / 1024 / 1280 / 1920. Day 1/2 code uses inline styles with no `@media` queries except the global mockup CSS at `@media (max-width: 900px)`.

**When** the developer:
1. Adds a `src/v2/design/responsive.css` with breakpoint-based overrides for the 5 documented viewports.
2. Tests each of the 5 v2 pages at each of 5 viewports (25 viewport-page combos).
3. Fixes layout issues found, focusing on:
   - Coach Home: stats stack to 2x2 at <768, 1x4 at >=768.
   - Teachers table: horizontal-scroll wrapper at <1024.
   - Observation: sidebar moves below main content at <960.
   - Plan detail: 2fr/1fr grid collapses to 1fr at <960.
   - Training: 3-col grid → 2-col at 960, 1-col at <600.
4. Top nav: hamburger menu below 900px (collapse the 5 links into a menu icon).
5. Tap targets: minimum 44×44px on all interactive elements.

**Then** every v2 page is usable at every documented viewport with no horizontal page-scroll and no overlapping content.

**Acceptance criteria**:
- At 375px width: all pages render without horizontal scrollbar; nav collapses to hamburger.
- At 768px: stats are 2x2 on Coach Home; table is horizontally scrollable.
- At 1024px (iPad landscape): all pages render close to design intent.
- At 1280px and 1920px: pages center within max-width 1400px container.
- All buttons measure at least 44px tall on touch viewports.
- Dynamic resize: drag window corner; no layout jumps; no scrollbars appearing/disappearing.

**How to verify**:
- Use Chrome DevTools device toolbar at each of 5 widths; visually inspect each of 5 pages.
- Record findings in a markdown table; resolve each failing case.
- Manual resize test: open at 1920, drag to 320, drag back to 1920; no layout breaks.

**Risks**:
- Inline-style refactor for responsive is tedious. **Mitigation**: introduce a few utility classes in `responsive.css` (e.g. `.v2-stack-md`, `.v2-row-md`) and apply via `className` rather than re-architecting each component.

---

### T9.4: Bug triage execution
**Day**: Day 9
**Estimated**: 3h
**Files affected**: TBD per bugs reported
**Depends on**: CHALK provides a bug list (gating dependency)

**Given** the audit (§3.1) includes "bug triage from CHALK-provided list" in the $20K scope. The risk doc (§8 risk #3) flags "Bug list from CHALK is too vague to triage in remaining time" as high probability. The list has not yet been delivered as of 2026-05-28.

**When** the developer:
1. **Day 8 EOD or Day 9 AM**: requests the bug list from Deanna via Slack with a hard deadline (Day 9 noon).
2. If list provided: prioritizes by user impact × fix cost; commits to addressing as many as fit in 3h.
3. For each bug: writes the fix on a feature branch off `feature/chalk-2.0-renovation`, commits with `fix(legacy): <description>` (legacy bugs likely outside v2/).
4. Documents un-addressed bugs in `.chalk/V2-BUG-TRIAGE.md` with severity and effort estimate for follow-up.
5. If list NOT provided by Day 9 noon: ship without bug fixes; document explicitly in T10.3 release notes that "no bug list was received".

**Then** as many bugs as fit in 3h are fixed; the rest are documented for a future engagement.

**Acceptance criteria**:
- A bug triage doc exists listing all bugs received, with severity, fix-effort estimate, and resolution status.
- Fixed bugs are committed with clear messages.
- Unfixed bugs are explicitly called out in release notes.

**How to verify**:
- Read `.chalk/V2-BUG-TRIAGE.md`.
- `git log feature/chalk-2.0-renovation` shows the fix commits.

**Risks**:
- **The biggest unknown in this sprint**. If CHALK delivers a 50-hour bug list, only 3h can be addressed; communication is critical.
- **Mitigation**: explicit Slack message Day 8 with the deadline; do not silently absorb scope.

---

### T9.5: Final dark mode + accessibility pass
**Day**: Day 9
**Estimated**: 2h
**Files affected**: `src/v2/design/tokens.css`, all `src/v2/pages/*.tsx`, `src/v2/components/*.tsx`
**Depends on**: T8.5

**Given** the v2 root supports `data-theme="dark"` via CSS variables (Day 1 commit). Audit §8 candidate risks notes "v2 components have no ARIA attributes, no keyboard navigation testing".

**When** the developer:
1. Toggles to dark mode on each page; identifies contrast/legibility issues; fixes via token adjustments (NOT per-page overrides).
2. Adds ARIA labels to interactive elements without text labels: theme toggle, hamburger menu, notification bell, modal close buttons.
3. Adds `aria-live="polite"` to the auto-save status pill.
4. Adds keyboard navigation: Tab order, focus rings (use `:focus-visible` CSS), Esc closes modals (already in T3.5 modal).
5. Ensures all images/icons have either `alt` text or `aria-hidden="true"`.
6. Verifies color contrast against WCAG AA (4.5:1 for body text, 3:1 for large text) using DevTools Lighthouse or axe DevTools.

**Then** v2 is usable via keyboard alone and meets basic accessibility standards.

**Acceptance criteria**:
- All interactive elements reachable via Tab in logical order.
- Focus rings visible on keyboard focus (use `:focus-visible` so mouse users don't see them).
- Dark mode has no contrast failures on Lighthouse accessibility audit.
- All form fields have associated labels (`<label>` or `aria-label`).
- Lighthouse accessibility score >= 90 on each of the 5 pages.

**How to verify**:
- Run Lighthouse on each page in dark and light mode; record scores.
- Test entire flow keyboard-only (Tab/Enter/Esc only) from login → /v2/home → /v2/observation → end observation.
- Use axe DevTools to scan for ARIA violations.

**Risks**:
- True accessibility audit is a multi-day effort; this is a sprint-scoped sweep. Document residual gaps for future engagement.

---

### T10.1: Staging deploy + smoke test
**Day**: Day 10
**Estimated**: 2h
**Files affected**: none (deploy operation)
**Depends on**: T9.1, T9.2, T9.3, T9.5

**Given** the branch `feature/chalk-2.0-renovation` has all wirings, fixes, and polish committed. The current staging deploy is from Day 2 (visual mockups only). Production is untouched.

**When** the developer:
1. Pulls latest `feature/chalk-2.0-renovation`.
2. Runs `cd CoachingApp && npm install` (ensure deps unchanged).
3. Builds staging: `npm run staging` — must exit 0 (this is the compile gate; standalone `tsc --noEmit` is broken in the repo and is NOT used).
4. Verifies the build output (`build/`) is populated.
5. Deploys: `npx firebase deploy -P staging --only hosting`.
6. Smoke test: as a logged-in test user, navigate through all 5 v2 routes; verify each loads with real data; verify auto-save works; verify theme toggle works; verify responsive on iPad portrait + landscape.
7. Captures screenshots of each route in both themes (saved to `.chalk/v2-staging-screenshots/`).

**Then** staging is live with the fully-wired v2, and screenshots are evidence for Deanna's review.

**Acceptance criteria**:
- Deploy succeeds without errors.
- All 5 routes load at `https://chalk-dev-c6a5d.web.app/v2/{home,teachers,observation,plans,training}`.
- A test observation can be created, edited, and ended; verifiable in staging Firestore.
- A test plan comment can be posted.
- Light/dark toggle works on every page.
- 10 screenshots stored for review (5 pages × 2 themes).

**How to verify**:
- Visit staging URL; navigate.
- `find .chalk/v2-staging-screenshots -type f | wc -l` shows at least 10 images.

**Risks**:
- Concurrent deploys from `thompchr@gmail.com` (audit §8 risk #5). Coordinate via Slack before deploy.

---

### T10.2: Deanna staging review
**Day**: Day 10
**Estimated**: 2h (vendor time; Deanna's calendar separately)
**Files affected**: `.chalk/V2-REVIEW-NOTES.md` (new)
**Depends on**: T10.1

**Given** the engagement requires Deanna's sign-off before prod deploy (audit §11). Audit §3.1: "Inputs required from CHALK: Slack approval from Ellie, concrete bug list, preview sign-off".

**When** the developer:
1. Drafts a **STUBS DISCLOSURE** section in `.chalk/V2-REVIEW-NOTES.md` BEFORE the walkthrough call, listing every placeholder shipped:
   - Magic 9 alignment screen (T7.4) — confirmation screen only, no interactive mapping
   - Training recommendations (T8.1) — client-side heuristic, not the Cloud-Function-backed `funcRecommendTraining` from the renovation plan
   - CSV import (T5.4) — modal + template download only, no backend processing
   - Photo/audio capture during observation — buttons exist on mockup, will show "coming soon" toast
   - In-app messaging is plan-scoped only (T6.3), not a standalone messaging product
   - Magic 9 score "dropped" attention rule (T4.2) — falls back to login-count proxy
2. Sends Slack message to Deanna + Ellie BEFORE the walkthrough call with: staging URL, screenshot bundle, the stubs-disclosure section verbatim, explicit ask: "Please confirm these placeholders are acceptable for prod ship — list any that are blockers."
3. Hosts a 30-min walk-through call (or async screenshare). During the call, ALWAYS demo each stub explicitly so Deanna sees what is and isn't real, not just the happy paths.
4. Captures Deanna's feedback in `.chalk/V2-REVIEW-NOTES.md`: list of approved items, requested changes (with severity), stubs accepted vs flagged as blockers, change-orders needed.
5. If a stub is flagged as a blocker: it becomes the gate for prod deploy — either de-scope from v2 routes (hide the button) or extend the timeline to implement it. Do NOT ship a flagged stub.

**Then** Deanna has full visibility into what's real vs placeholder BEFORE prod signoff, not as a surprise in T10.3 release notes. Sign-off is recorded (or list of blockers is clear), enabling T10.4 prod deploy.

**Acceptance criteria**:
- `.chalk/V2-REVIEW-NOTES.md` contains a **STUBS DISCLOSURE** section that enumerates every placeholder by name.
- Slack message sent before the walkthrough call includes the verbatim stubs list.
- Each feedback item has a status: Addressed / Deferred (with rationale) / Out of scope (with quote-followup note) / Blocker.
- No stub flagged as a blocker reaches prod (verified at T10.4).
- Explicit Slack confirmation "approved for prod deploy with stubs as listed" or list of blockers.

**How to verify**:
- Review the notes doc.
- Check Slack for explicit approval.

**Risks**:
- Deanna unavailable on Day 10 → prod deploy slips into Day 11. Bake into communication. The renovation plan timeline expects 48h staging-review SLA; if 24h slip is acceptable, no extra cost.

---

### T10.3: Release notes + user communication
**Day**: Day 10
**Estimated**: 2h
**Files affected**: `docs/V2-RELEASE-NOTES.md` (new), `docs/V2-USER-EMAIL.md` (new)
**Depends on**: T10.2

**Given** the production deploy will introduce a new `/v2/*` URL space. Existing users (~600) need to know it exists and how to access it. The audit (§8 risk #4) and renovation plan (§10) both flag SW cache mitigation as user-facing.

**When** the developer:
1. Drafts `docs/V2-RELEASE-NOTES.md` covering:
   - **What's new** in plain language (the 5 renovated views, the auto-save, the dark mode, the inline plan messaging).
   - **What's unchanged** (login flow, account management, the legacy observation tools).
   - **Known limitations** — copies verbatim the `STUBS DISCLOSURE` list from T10.2's `.chalk/V2-REVIEW-NOTES.md` (which Deanna has already accepted as part of signoff). This is not a surprise reveal — it's a public restatement of what Deanna approved.
   - **Where to find it** (`/v2/home`; banner on `/Home`).
   - **What to do if the page looks broken** (hard refresh; clear SW cache instructions).
2. Drafts a user email (`docs/V2-USER-EMAIL.md`) for Deanna to send to coaches/admins, written warmly, 1 paragraph, includes the URL and a Loom-style screenshot or GIF.
3. Sends both to Deanna for her to publish/send post-deploy.

**Then** Deanna has ready-to-send communications for her users.

**Acceptance criteria**:
- Release notes doc exists with all 5 sections.
- User email is <150 words, includes URL and a screenshot.
- Both docs are reviewed by Deanna before T10.4.

**How to verify**:
- Read both files; verify completeness and tone.

**Risks**: none.

---

### T10.4: Production deploy
**Day**: Day 10
**Estimated**: 2h
**Files affected**: none (deploy + branch merge)
**Depends on**: T10.3

**Given** sign-off from T10.2 and release notes from T10.3. Production hosts at `cqrefpwa.web.app`. The PrivateRoute wrap (T3.4) has been flipped to "wrapped" (no public preview).

**When** the developer:
1. Coordinates with `thompchr@gmail.com` via Slack: "Deploying production at HH:MM. Hold all deploys for 60 minutes."
2. Merges `feature/chalk-2.0-renovation` → `develop`.
3. From `develop`, opens release PR → `master`.
4. Merges release PR.
5. On `master`:
   - `cd CoachingApp && rm -rf build`
   - `npx env-cmd -e production npx webpack --mode=production`
   - Verifies `build/service-worker.js` was regenerated by Workbox and that the precache manifest changed.
   - `npx firebase deploy -P default --only hosting`
6. Verifies the prod URL loads.
7. Tags the release: `git tag v2.0.0 && git push origin v2.0.0`.
8. Announces in Slack: deploy complete, send-comms triggered.

**Then** production is live with the new v2 routes; existing routes unchanged.

**Acceptance criteria**:
- Logged-out `cqrefpwa.web.app/v2/home` redirects to `/` (public preview disabled).
- `cqrefpwa.web.app/v2/home` loads successfully after auth for an admin user.
- `cqrefpwa.web.app/Home` still loads with the legacy app.
- No regression on legacy routes (run a quick smoke test on `/Home`, `/MyTeachers`, `/AllUsers`, `/ActionPlans`).
- Banner from T9.1 visible on `/Home`.
- Workbox-generated SW update flow verified; older clients are prompted or controlled-reloaded on next visit.
- Git tag `v2.0.0` exists.

**How to verify**:
- Sign in to production; navigate to `/v2/home`; verify wiring.
- Sign in to production; navigate to `/Home`; verify legacy still works.
- `git log master --oneline` shows the release merge commit.
- `git tag -l v2.0.0` lists the tag.

**Risks**:
- Deploy fails or breaks legacy. **Mitigation**: rollback procedure documented in audit §7.1; can be executed within 5 minutes (revert master, redeploy).

---

### T10.5: Post-deploy verification + monitoring
**Day**: Day 10
**Estimated**: 2h
**Files affected**: `docs/V2-POST-DEPLOY-LOG.md` (new)
**Depends on**: T10.4

**Given** prod is deployed. First 2h are the highest-risk period for SW cache issues and user-reported breakage.

**When** the developer:
1. Monitors Firebase console (Firestore Reads/Writes) for unusual traffic patterns.
2. Monitors Cloud Functions logs for `funcSendEmail` errors.
3. Spot-checks Sentry/error-monitoring (if installed; otherwise relies on user reports).
4. Pings Deanna at 30, 60, 120 minutes post-deploy with status updates.
5. If a critical bug surfaces: triages within 30 min; either hot-fixes or rolls back per audit §7.1 procedure.
6. Documents the deploy timeline + any incidents in `docs/V2-POST-DEPLOY-LOG.md`.

**Then** the deploy is monitored for the first 2 hours; issues caught and resolved or rolled back.

**Acceptance criteria**:
- No P0 bugs in the first 2h, OR P0 bug rolled back within 30 min of discovery.
- Post-deploy log exists with timeline, traffic stats, incidents.
- Deanna receives 3 status updates (30/60/120 min).

**How to verify**:
- Read the post-deploy log.
- Check Firestore + Functions metrics.

**Risks**:
- A P0 bug discovered after 2h is on the user/Deanna to report. Document this expectation.

---

### T10.6: Handoff + retro doc
**Day**: Day 10
**Estimated**: 2h
**Files affected**: `docs/V2-HANDOFF.md` (new), `.chalk/CHALK-2-RETRO.md` (new)
**Depends on**: T10.5

**Given** the sprint is over. Audit §11 expects "Closeout — invoice, retro notes, next-phase scoping".

**When** the developer:
1. Writes `docs/V2-HANDOFF.md` for CHALK's internal use:
   - Architecture overview (v2 lives in `src/v2/`).
   - Key files and where to make common changes.
   - How to add a new v2 page.
   - How to swap the stubbed training-recommendation logic for the Phase 2 Cloud Function.
   - How to disable v2 if needed (toggle the route registration in `App.tsx`).
2. Writes `.chalk/CHALK-2-RETRO.md` internally:
   - What went well.
   - What ran over (likely: scope vs hours, bug triage).
   - Lessons for the next phase.
   - Items deferred to Phase 2 / 3 (Magic 9 alignment, in-app messaging, observation drafts persistence, photo/audio capture, full Cloud Function-backed recommendations).
3. Issues the invoice with flexible payment terms per audit §3.1.
4. Sends a closeout Slack to Deanna and Ellie: "Sprint complete. Invoice attached. Handoff doc at `docs/V2-HANDOFF.md`. Pay when ready."

**Then** the engagement is formally closed, and the next phase is set up.

**Acceptance criteria**:
- Handoff doc exists with at least 5 sections.
- Retro doc exists with at least 3 sections.
- Invoice sent.
- Closeout Slack message sent.

**How to verify**:
- Read the docs.
- Verify Slack message.

**Risks**:
- Vendor may underestimate handoff time; the retro is the easiest to skip.

---

## 4. Out of scope

Explicitly NOT included in the 10-day sprint (per audit §3.1 "Out of scope, separately quotable"):

- **Full in-app coach↔teacher messaging system** (a generic messaging inbox / thread per teacher / notifications / unread counts). The plan-scoped comments thread (T6.3) is the minimal version included; the standalone messaging product is Phase 3.
- **Mobile-first observation with offline support** (PWA install, IndexedDB queue, service-worker-mediated sync). Phase 3.
- **Program Leader analytics dashboard** (site-level rollups, cohort comparisons, trends). Phase 3.
- **Personalized learning pathways** (multi-module sequencing, completion graph). Phase 3.
- **Cloud-Function-backed training recommendations** (`funcRecommendTraining` with real ML/heuristic logic). T8.1 ships a simple client-side stub.
- **Magic 9 post-observation alignment screen** (interactive mapping of notes to dimensions). T7.4 ships a confirmation stub.
- **Tech-debt modernization**: React 16 → 18, Webpack 4 → Vite, MUI 4 → MUI 5, dependency CVE cleanup (276 vulnerabilities per audit §11). Phase 4.
- **Postgres migration** from Firestore. Not on any current roadmap.
- **Auto-logout / session timeout** (audit §13).
- **Marketing site refresh** (chalkcoaching.com).
- **Mobile native apps** (iOS/Android React Native).
- **Multi-language / i18n**.
- **HIPAA / FERPA compliance audit**.
- **Photo/Audio capture in observations** — buttons render but show "coming soon" toasts.
- **CSV import backend** (`funcImportUsers`) — frontend stub only (T5.4).
- **Magic 9 score time-series** — T4.2 falls back to login-count-based "attention" criteria.
- **Conference plan v2** — only action plans are renovated; conference plans use legacy `/ConferencePlan`.

---

## 5. Audit checklist

A reviewer of this plan should be able to answer:

**Completeness**:
- [ ] Are all 5 mockup views fully wired (read + write where applicable)?
- [ ] Are loading/empty/error states defined for each view?
- [ ] Is the v2-to-legacy coexistence strategy documented and shipped (T9.1)?
- [ ] Are Service Worker cache concerns addressed (T9.2)?
- [ ] Is responsive QA executed across the 5 documented viewports (T9.3)?
- [ ] Is the bug triage process scaffolded with explicit gating on CHALK's deliverable (T9.4)?
- [ ] Is sign-off captured before prod deploy (T10.2)?
- [ ] Is a rollback procedure documented and rehearsed (audit §7.1, referenced in T10.4)?

**Estimation honesty**:
- [ ] Does the plan acknowledge the 97h estimate exceeds the 64h *remaining* capacity (Days 3–10) by 33h (~52%)? **Yes — flagged explicitly in §1 with three execution paths.**
- [ ] Does the plan identify which items would be cut first if time runs short? **Yes — see "Scope risks" below.**
- [ ] Are stubs (T7.4 alignment, T8.1 recs logic, T5.4 CSV) clearly documented as stubs, not real implementations?

**Dependencies**:
- [ ] Does each task's "Depends on" reference earlier task IDs that have been completed at the point this task starts?
- [ ] Does any task depend on a CHALK deliverable (bug list, sign-off) that's outside vendor control?
- [ ] Is the DAG cycle-free?

**Verification**:
- [ ] Does each acceptance criterion specify an observable behavior (UI state, Firestore write, network request) rather than subjective quality?
- [ ] Does each "How to verify" specify a concrete command, URL, or click sequence?

**Risk management**:
- [ ] Is the SW cache risk mitigated?
- [ ] Is the concurrent-contributor risk addressed via Slack coordination notes?
- [ ] Is the "Magic 9 alignment is a stub" deferral communicated to Deanna before prod deploy (T10.2)?
- [ ] Is the "real production user names in stub data" risk (audit §8 risk #8) addressed by the wiring tasks removing those stubs?

---

## 6. Scope risks surfaced during planning

1. **Capacity vs estimate: 97h plan vs 64h remaining capacity (+33h / ~+52%)**. See §1 for the corrected math. Three execution paths: A (cut scope to 64h), B (extend to ~12 working days), C (cut 25h + extend by 1 day to land at 72h remaining). See §6.A for the explicit cut menu.
2. **Bug triage as a wild card**: T9.4 hard-capped at 3h. If CHALK delivers a 50h bug list, only 3h fits. Communication via Slack on Day 8 is the only mitigation.
3. **Magic 9 alignment stub**: the largest single deferral. The mockup's "End & align to framework →" button is honest at the click but the alignment UI is a placeholder. **Recommendation**: explicitly disclose this in T10.2 review notes (and copy verbatim into T10.3 release notes), surfaced BEFORE signoff.
4. **Photo/audio capture in observation**: visual buttons in the mockup that show "coming soon" toasts. May be perceived as "promised in mockup, not delivered". **Mitigation**: review with Deanna in T10.2 STUBS DISCLOSURE.
5. **Magic 9 score "dropped" attention rule (T4.2)**: requires score time-series the system doesn't easily compute. Replaced with login-count-based proxy. Documented in code and T10.2 disclosure.
6. **Auth gate flip (T3.4)**: switching `/v2` from public-preview to V2PrivateRoute is a single env-var toggle (`REACT_APP_V2_PUBLIC_PREVIEW=false`). If forgotten before prod deploy, production routes would be open to anyone with the URL. Add to T10.4 deploy checklist: logged-out `/v2/home` smoke test must redirect to `/`.
7. **Webpack build memory**: the legacy bundle is already large. Adding v2 components increases bundle size by ~30KB (estimated). Verify `npm run prod` doesn't OOM on slower CI/CD environments.
8. **Service Worker upgrade path**: SW changes can lock users on a broken version. Audit §8 risk #4 documents the procedural mitigation (hard refresh comms) but a botched SW upgrade is a P0 incident waiting to happen. T9.2 is the prevention; T10.5 monitoring catches it within 2h.
9. **PrivateRoute hardcodes `exact`**: discovered during audit review. T3.4 was rewritten to introduce a sibling `V2PrivateRoute` without the `exact` flag. Without this fix, all v2 child paths would fail to match.
10. **TypeScript 3.7 + modern @types/* don't typecheck cleanly via standalone `tsc --noEmit`**: discovered during audit review. The Babel/Webpack build pipeline (`npm run staging`) is the working compile gate, but not a full type-check. All acceptance criteria in this plan were rewritten away from standalone tsc.
11. **Observation `type` field is downstream-coupled**: discovered during audit review. UI codes in `Constants.tsx:14-22` must be mapped to the legacy stored values consumed by `functions/observationToBQ/index.js` (`TT -> transition`, `CC -> climate`, etc.). T7.1 was rewritten to use this mapping instead of inventing a new `'OO'` code or storing UI codes directly.
12. **firestore.rules is permissive (any auth user can read/write anywhere)**: documented in audit §11 Phase 4 as broader rules debt. T3.0 was rewritten as a rules-posture decision because stricter path rules cannot override the current wildcard; true narrow enforcement requires replacing or narrowing the wildcard.

---

## 6.A Scope-cut menu (apply if Path A or C chosen)

These are ordered by lowest-pain-first. Cut from the top until the target capacity is met.

| # | Cut | Hours saved | Pain |
|---:|---|---:|---|
| 1 | **Drop T5.4 (CSV import stub).** Hide the "Import CSV" button entirely. | 2 | Low. Mockup shows it but it was always a stub. |
| 2 | **Drop T9.4 (bug triage).** Move to a paid follow-on engagement after Day 10. Document explicitly in T10.2. | 3 | Low–Medium. Was already a wildcard. |
| 3 | **Drop T8.5 (loading/empty/error polish for non-blocking states).** Keep only error states; rely on browser-default loading. | 3 | Medium. UX feels less finished. |
| 4 | **Drop T9.5 (final dark mode + a11y pass).** Ship dark mode without a11y audit; defer Lighthouse compliance to Phase 4. | 2 | Medium. Risk of user-reported contrast bugs. |
| 5 | **Trim T7.3 (sidebar interactions).** Ship Magic 9 chips as click-to-insert but cut keyboard shortcuts and "last observation" sidebar card. | 2 | Medium. Mockup shows shortcuts as a feature highlight. |
| 6 | **Drop T6.4 (Send-to-teacher).** Coaches keep using legacy email composer; v2 plan view links out. | 2 | Medium. Mockup has prominent "Send to teacher" button. |
| 7 | **Drop T5.3 (Add Teammate modal).** Header button shows toast "Use the legacy Add User page" linking to `/AddUser`. | 3 | Medium-High. Mockup shows it as a primary CTA. |
| 8 | **Drop T6.3 (comments thread).** Plan view shows a banner "Conversation threading coming soon". | 3 | High. Was a Phase 1 deliverable in renovation plan. |
| 9 | **Drop the entire Training page wiring (T8.1–T8.4).** /v2/training shows the existing 6 module cards as static; clicking still links to legacy `/Training` flows. Save 8h. | 8 | High. Mockup has this as a featured view. |
| 10 | **Drop T9.3 (responsive QA matrix down to 1 viewport).** Ship at desktop-only; add a `<MobileBanner>` "Best viewed on desktop" below 900px. | 2 | High. Renovation plan committed to responsive at 5 viewports. |
| 11 | **Defer T7.2 (observation auto-save to draft) to Phase 2.** Coach must complete observation in one sitting; no resume. | 4 | High. Was a marquee feature. |

**Path A target (cut 33h to hit 64h)**: apply cuts 1–9 = 28h, plus trim cuts 10–11 partially (e.g. T9.3 to 2h, T7.2 to 2h via simpler localStorage-only approach) = 33h.

**Path C target (cut 25h + add 1 working day to hit 72h remaining)**: apply cuts 1–7 = 17h, defer T7.2 observation draft auto-save = 4h, and trim the Training wiring by 4h (keep static cards + links, defer completion tracking and recommendation refresh). This preserves T6.3 in-app comments while acknowledging the actual total engagement is ~88h including Days 1–2.

**Recommendation: Path C.** It preserves the in-app messaging (T6.3), sheds the riskiest duplicated/stubbed interactions (CSV, Add Teammate, Send-to-teacher), and gives the sprint one extra working day. It no longer claims to fit inside the original 80h total once Days 1–2 are counted; the vendor absorbs ~8h of extra effort or re-aligns the client before Day 3.

---

End of plan.
