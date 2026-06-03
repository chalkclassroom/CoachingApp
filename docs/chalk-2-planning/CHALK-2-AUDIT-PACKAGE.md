# CHALK 2.0 — Audit Package

> Self-contained document for a third-party (or LLM) audit of the CHALK 2.0
> renovation engagement. Captures the business situation, the proposal, the
> pricing rationale ($20K fixed with flexible payment terms), the technical
> strategy, the implementation state, the risks identified, and the open
> questions.
>
> Last updated: 2026-05-20 by Servicios ID SAS

---

## 0. How to use this document

This is the **entry point** for someone reviewing the CHALK 2.0 engagement
end-to-end. It is written to be self-contained — read it linearly and you
will understand what was proposed, why, and what state the work is in.

Each section ends with a link to the **source artifact** for deeper review.

### ⚠️ Scope of this audit (revised 2026-05-20)

The engagement is a **paid fixed-price proposal with flexible payment
terms**: $20,000 USD, 10 working days, no upfront, "pay when CHALK is
ready". An earlier internal discussion experimented with delivering the
work as a goodwill gift; that idea was reverted in favor of the paid
proposal below.

Pricing IS in scope for this audit. The auditor should review:

1. **Pricing appropriateness**: is $20K reasonable for the scope? (See §6.)
2. **Flexible payment terms**: ethical and commercial implications of
   "pay when ready" — vendor cash-flow risk; trust signal to client;
   absence of enforcement leverage; clarity for CHALK's budget process.
3. **Technical strategy and code quality** (§4, §5, §7).
4. **Risks and mitigations** (§8) — including any new risks introduced by
   flexible payment terms.
5. **Open questions and unstated assumptions** (§9).
6. **Scope clarity** — will "looks like the mockup" survive contact with reality?
7. **Rollback safety** (§7.1) — zero production impact if not merged;
   staging requires manual cleanup if declined.
8. **Accessibility, data privacy, security posture.**
9. **Ethical concerns around the speculative pre-work** (vendor invested
   ~$300 of unpaid time before sending the offer).
10. **The pitch framing** — anchored in United Way feedback; does it hold
    up as honest?

If you (the auditor) find no issues, that's a finding too — say so explicitly.

---

## 1. Executive summary

**Client:** CHALK Coaching (coaching platform for early-childhood educators).
**Vendor:** Servicios ID SAS (Ismael Dosil, single developer).
**Engagement type:** Paid fixed-price product refresh ($20,000) with flexible payment timing ("pay when CHALK is ready" — no upfront, no enforced Net term). Pitched as an outbound proposal triggered by client-shared customer feedback.

**The offer being pitched (not yet accepted):**

- **$20,000 fixed price** — invoice issued on delivery
- **Flexible payment timing** — no upfront, no enforced Net term; CHALK pays on a schedule that works for their cash flow
- **10 working days delivery**
- **Single coordinated release** — no phases, no later approvals
- **Visual language**: existing CHALK brand (Poppins + cyan + coral matching chalkcoaching.com)
- **Scope**: 5 main views renovated (Home, Teachers, Observation, Plans, Training) + responsive + light/dark + bug triage
- **Rollback**: all work on `feature/chalk-2.0-renovation` branch; never merged to develop/master until approved

**Pre-approval work performed (speculative):**

- Day 1 (committed): foundation + Coach Home (commit `bbcb1640a`)
- Day 2 (committed): all 4 remaining views as visually complete mockups using real production user names (commit `763362c96`)
- Total time invested ≈ 6-8 hours = ~$270-360 in opportunity cost
- All deployed to staging at `https://chalk-dev-c6a5d.web.app/v2/home` for client preview

**Status:** Awaiting client (Deanna) and CFO (Ellie) sign-off. If declined, the branch is deleted and no code reaches production.

---

## 2. Business context

### 2.1 Prior history with the client

This is not a cold pitch. Servicios ID has delivered four prior pieces of work
for CHALK in the last 6 months, all fixed-price, all delivered on time:

| Ticket | Work | Price | Status |
|---|---|---:|---|
| CHALK-090–097 | All Users dashboard, Last Action column, archived-user login block, Help Request button | $1,575 (35h via INV-001) | Delivered Jan–Mar 2026 |
| CHALK-110–115 | Login tracking with date-range filter, "Action Count" column reused the same pattern | $350 fixed (~7h, INV-003) | Delivered May 9, 2026 |

This established trust and a known engagement model. The new pitch leverages
that trust — the line "same team that built the recent login tracking, help
request, and All Users features" appears in the proposal CTA.

**Approval flow** (durable, from prior work): Deanna requests features →
Ellie approves the budget via Slack → Ismael invoices. The new $20K offer
follows the same flow, with an added wrinkle: flexible payment timing
(no enforced Net term).

### 2.2 The trigger — United Way feedback (April 2026)

The catalyst for the pitch is a feedback summary the client shared in April,
documenting that **United Way is reducing its dependence on CHALK** (moving
from mandatory to mini-grant model; transitioning observation work to Google
Rubrics). The document also catalogued specific UX complaints:

- "The platform is glitchy and clunky"
- "The dashboard is not intuitive or useful"
- "Conducting observations in CHALK is challenging and restrictive"
- "Strong preference for in-platform storage and sharing" (currently requires PDF download)
- "Requiring training before observation is seen as unnecessary and burdensome"
- "Major frustration with lack of responsiveness and follow-through"

**Source:** `docs/United Way Feedback - April 2026.md`

This is the entire justification used in the pitch. Without this document,
the proposal would be unprompted vendor marketing. With it, it's framed as a
direct response to client-surfaced concerns.

### 2.3 The strategic insight

CHALK's existing customers had United Way as a mandate-driven anchor. With
that mandate gone, CHALK must now **win voluntary adoption** against
general-purpose tools (Google Rubrics, Google Forms, etc.). The product's
quality bar has risen.

This shapes the urgency framing in the pitch: not "we noticed problems",
but "your own customer surfaced these problems, and they matter beyond just
that customer".

---

## 3. The proposal — what was actually offered

### 3.1 Final terms

| Field | Value |
|---|---|
| Price | **$20,000 USD fixed** |
| Timeline | **10 working days** from approval |
| Visual language | Existing CHALK brand (Poppins + cyan `#00b2ff` + coral `#f0523d`) — no rebrand |
| Scope (in) | 5 main views: Home, Teachers, Observation, Plans, Training. Plus light/dark theme, responsive layouts (iPad-first), bug triage from CHALK-provided list, staging review + production rollout |
| Scope (out, separately quotable) | Full in-app coach↔teacher messaging system, mobile-first observation with offline, Program Leader analytics dashboard, personalized learning pathways, tech-debt modernization (React 18, Vite, dependency upgrades) |
| Inputs required from CHALK | Slack approval from Ellie, concrete bug list, preview sign-off, commitment to review staging within 48h |
| Payment | **Flexible — pay when CHALK is ready.** Invoice issued on delivery; CHALK sets the payment schedule. No upfront. No enforced Net term. |
| Rate equivalence | $45/hr × ~80h × ~5.6× fixed-price premium = $20K (or ~3.6× over the original 123h plan estimate) |

**Source:** `docs/CHALK-2.0-Proposal.pdf` (rendered from `docs/chalk-2-proposal.html`)

### 3.2 Evolution of the price (decision history)

The proposal went through five pricing iterations during the planning conversation:

1. **First draft (phased, ranges)**:
   - Phase 1: $1,500–$2,500 (3–4 weeks)
   - Phase 2: $3,000–$6,000 (6–8 weeks)
   - Phase 3: $8,000–$20,000 (10–16 weeks)
   - Total range: $12,500–$28,500
   - Rationale: matches conventional fixed-price-per-phase modeling. Lets client stop after any phase.

2. **Second iteration (compressed Phase 1)**:
   - Client (Ismael) directed: "3 days, charge 60%"
   - Phase 1 only: $1,800 fixed (3 days)
   - Phases 2/3 kept as-is for future engagement
   - Rationale: ship the smallest piece first, lower commitment barrier.

3. **Third iteration (single offer at $15K)**:
   - Client directed: "fixed price for all the site changes using existing chalkcoaching.com styles, 10 days, $15K"
   - Combined what was previously Phase 1 + Phase 2 into one delivery
   - Removed phased commitment structure
   - Rationale: present a clean single decision, get one executive yes.

4. **Fourth iteration (gift framing — experimental, reverted)**:
   - Client briefly considered delivering the work as a goodwill gift
   - Documents temporarily updated to mark pricing "out of audit scope"
   - Reverted after revisiting — see iteration 5.

5. **Final (paid + flexible terms)**:
   - Client directed: "$20K and pay me when you can"
   - Headline: **$20,000 fixed**
   - Payment timing: **flexible — pay when CHALK is ready**, no upfront, no enforced Net term
   - Rationale: the work has real value; charge for it. Flexible payment removes the cash-flow barrier to client approval while signaling trust. Adds $5K over the $15K iteration to absorb the implicit financing cost (vendor effectively extending an interest-free credit line).

**Audit question:** is $20K + flexible terms appropriate for ~80 hours of compressed delivery?

| Calculation | Value |
|---|---:|
| 10 days × 8h × $45/hr standard rate | $3,600 |
| Implied effective rate at 80h delivery | ~$250/hr |
| Implied effective rate if work takes 123h (plan estimate) | ~$163/hr |
| Original phased range mid-point (P1 + P2) | $5,750 (mid of $4,500–$8,500) |
| Original phased range top (P1 + P2 + small P3 starter) | ~$10K–$12K |
| Deferred-payment "carry cost" at 8% APR over 12 months on $20K | ~$1,600 |

The $20K number is **substantially above** the original phased upper bound for the same
scope. Justifications offered in the proposal:

1. Fixed timeline / fixed price = Servicios ID absorbs all overage risk.
2. Compressed delivery (10 days for ~6 weeks of phased work) requires deep focus.
3. No phase-gate negotiation overhead.
4. Design + dev bundled (the interactive mockup is the spec, so no separate design phase).

**Reviewer should consider:** is the premium justified? Or is this leaning
into the client's willingness to pay rather than reflecting actual cost?
The honest read: the premium is partly justified by risk transfer, partly
by client signaling that they want a clean number for executive approval.

### 3.3 Mockup deliverables

In addition to the proposal PDF, the client receives:

1. **`docs/CHALK-2.0-Mockup.zip`** — a downloadable folder containing:
   - `index.html` — interactive multi-view mockup (top-nav switches between Home / Teachers / Observation / Plans / Training)
   - `walkthrough.html` — scrollable single-page narrative version
   - `README.txt` — usage instructions
2. **Live staging URL** (added in Day 2): `https://chalk-dev-c6a5d.web.app/v2/home` — the actual app running the new design, populated with the client's real production user names (Tisha Owen, Dawn Johnson, Chrystaline Glenn, Kerry Leedy, Shonnell Wilkins, etc.).

**Source for mockup HTML:** `docs/chalk-2-app-mockup.html` and `docs/chalk-2-demo.html`

### 3.4 Email pitch (current draft — short, casual)

The pitch email is intentionally short and direct, leaning on the live
preview rather than the formal PDF:

```
Hi Deanna,

Quick one — I built out what a renovated CHALK could look like.
You can poke at the live preview here:

   https://chalk-dev-c6a5d.web.app/v2/home

Click around the top nav (Home / Teachers / Observation / Plans /
Training), try the light/dark toggle. It's using your real coach and
teacher names so you can see how it'd feel on your platform.

If you like the direction, I'll do the full refactor of the platform —
the work that takes it from where it is today to what's in the preview —
for $20,000. No upfront, no rush on payment. Net 15, Net 60, whatever
works for CHALK works for me. I'd rather get the work into your team's
hands and sort the invoicing on your timeline than gate it on a payment
schedule.

Your existing platform stays untouched until we agree and ship. If you
decide not to proceed, the preview goes away.

Happy to jump on 30 minutes anytime.

Best,
Ismael
```

The formal proposal PDF (`docs/CHALK-2.0-Proposal.pdf`) is available as a
follow-up artifact if CHALK wants the structured version. The existing
platform is untouched. Everything new lives under /v2/ and can
be removed in one minute if you decide not to proceed.

Would love 30 minutes to walk you and Ellie through it.

Best,
Ismael
```

**Audit question:** is the framing appropriate? It anchors strongly in the
client's own feedback (UW summary), explicitly mentions rollback safety, and
makes a low-commitment ask (30-min call). The pitch leans on prior trust
without explicitly invoking it.

---

## 4. The internal plan (deeper than the proposal)

The proposal is the **client-facing** view. The internal plan is the
engineering reality of how the work would be executed.

**Source:** `.chalk/CHALK-2-RENOVATION-PLAN.md` (13 sections)

### 4.1 Strategy: strangler-fig migration

The plan does **not** propose a rewrite. New code lives in `src/v2/` and
coexists with the existing app indefinitely. Migration happens route by route.
Old code is deleted only after its v2 equivalent is live.

This is the same pattern used for the recently shipped login tracking and
action count features, where new functionality was added to existing pages
without freezing development.

### 4.2 Stack decisions

| Layer | Keep | Replace |
|---|---|---|
| React 16 / Redux / Firebase | ✅ kept (upgrades are Phase 4, separate engagement) | — |
| MUI 4 | Used selectively for atoms that still work | New v2 components built without MUI |
| Theming | — | CSS custom properties on `:root`-like wrapper (enables instant light/dark) |
| Fonts | — | Poppins (Google Fonts, scoped to .v2-root) |
| Icons | — | Emoji glyphs in mockup; recommend `lucide-react` later (deferred) |

**Why CSS variables instead of MUI 4 theme:**
- MUI 4's theme is a JS object, requiring full React re-render on theme switch.
- CSS variables flip on the `data-theme` attribute — zero re-render.
- Required because the user explicitly wants light/dark toggle in the offer.

**Why no MUI in new components:**
- MUI 4 is end-of-life. Avoiding it now keeps the migration path to MUI 5 (or to no UI lib) open.
- Reduces coupling between v2 design system and a third-party library.

### 4.3 Foundation (Phase 0 in original plan)

Items the plan considered necessary before any feature work:

- Design tokens module (`tokens.css`)
- Theme provider hook (`useTheme.ts`)
- Component library (Button, Avatar, Pill, Card, Stat, etc.)
- Layout shell (top nav)
- Routing integration

These were **partially built** during the Day 1 / Day 2 speculative work
(see §5).

### 4.4 Responsive commitment (new section added at user request)

Section 4 of the plan documents responsive behavior as a cross-cutting
commitment, not a feature. Material Design breakpoints (xs/sm/md/lg/xl) are
the deterministic boundary. iPad landscape (1024×768) is called out as the
primary device per a separate earlier estimate from the client (Estimate #1019).

**Audit question:** the Day 1/2 implementation has limited responsive testing
so far. The plan claims responsive is "factored into Phase 0 component design"
— in practice the components use Flexbox and breakpoint-aware styles, but a
full QA matrix across the listed viewports has not been executed yet.

### 4.5 Estimated effort breakdown (from plan)

| Phase | Original effort estimate | Original cost estimate |
|---|---:|---:|
| Phase 0 — Foundation | 32h | (bundled with P1) |
| Phase 1 — Quick wins | 30.5h | $1,500–$2,500 |
| Phase 2 — Medium | 61h | $3,000–$6,000 |
| Phase 3 — Big plays | 118h | $8,000–$20,000 |
| Phase 4 — Tech debt | 72h | $3,000–$4,000 |

The $20K single-offer scope covers approximately Phase 0 + Phase 1 + Phase 2
(31.5h + 30.5h + 61h = ~123h of original estimate). 10 working days ≈ 80h.

**Implication:** the offer compresses 123h of estimated work into 80h. This
requires either (a) skipping foundation polish, (b) cutting Phase 2 items,
or (c) accepting reduced quality. The plan does not explicitly resolve this
tension.

**Reviewer question:** is this gap honestly disclosed in the proposal?
Answer: No. The proposal lists all the items as "included" but does not
disclose the original estimate suggested ~50% more time.

---

## 5. Implementation state — what's on the branch right now

Two days of speculative implementation has been performed before client approval.

**Branch:** `feature/chalk-2.0-renovation`
**Commits:** `bbcb1640a` (Day 1), `763362c96` (Day 2)
**Staging URL:** `https://chalk-dev-c6a5d.web.app/v2/home`

### 5.1 Day 1 (commit `bbcb1640a`)

- `src/v2/design/tokens.css` — CSS custom properties for light and dark
- `src/v2/design/globals.css` — Poppins font, scoped resets under `.v2-root`
- `src/v2/hooks/useTheme.ts` — light/dark toggle, localStorage persistence
- `src/v2/components/` — Button, Avatar (deterministic gradient by name), Pill, Card+CardHeader, Stat
- `src/v2/layout/AppShell.tsx` — top nav with theme toggle and user pill
- `src/v2/pages/CoachHome.tsx` — full Coach Home view with stub data using real CHALK teacher names
- `src/v2/pages/PlaceholderPage.tsx` — placeholders for the other 4 views
- `src/v2/App.tsx` — v2 router mounted under `/v2/*`
- `src/App.tsx` — added 2-line surgical addition: `import { V2App }` and one new `<Route path="/v2">`

### 5.2 Day 2 (commit `763362c96`)

Placeholders replaced with full mockup views:

- `src/v2/pages/AllTeachers.tsx` — table with filter row (Search/Role/Status/Date range/presets/Export), 18 rows of real production user names + login counts + action counts + last actions
- `src/v2/pages/LiveObservation.tsx` — open observation mode for Dawn Johnson at Preschool Promise, with timer/notes/auto-save/sidebar of Magic 9 tags + shortcuts
- `src/v2/pages/PlanDetail.tsx` — action plan "Reducing transition time" for Chrystaline Glenn with threaded conversation between Tisha and Chrystaline
- `src/v2/pages/Training.tsx` — six adaptive training recommendation cards with explicit reasons

### 5.3 Verification performed

- `tsc --noEmit` returns 0 errors in `src/`
- Webpack production build completes clean
- Staging deploy verified to serve the v2 bundle
- All 5 routes accessible via top nav
- Light/dark toggle works and persists across reloads

### 5.4 What is NOT implemented

- No real Firebase integration in v2 views — all data is stub data
- Auto-save is visual only (no Firestore writes)
- "Send to teacher" button is visual only (no Cloud Function call)
- No actual mobile-specific testing (responsive CSS is in place but not QA'd at all breakpoints)
- No bug triage performed (depends on client providing the list)
- No tests added (the plan acknowledges this as Phase 4 work)

---

## 6. Pricing rationale — fully explicit (REVISED — paid engagement, $20K)

> 🔄 **Revised 2026-05-20**: pricing IS in audit scope again. An earlier
> draft of this document marked it out of scope due to a "gift" framing;
> that has been reverted. The engagement is now a paid proposal at
> **$20,000** with flexible payment timing. The numbers below have been
> updated. The historical $15K analysis is retained at the end of this
> section for context.

### 6.1 The numbers

| | Value |
|---|---:|
| Headline price (current offer) | **$20,000 fixed** |
| Hours of work claimed in offer | ~80h (10 days × 8h) |
| Hours of work per internal plan estimate for same scope | ~123h |
| Implied effective hourly (at 80h claimed) | ~$250/h |
| Implied effective hourly (at 123h plan estimate) | ~$163/h |
| Standard rate from prior engagements | $45/h |
| Markup over standard rate | ~3.6×–5.6× |

### 6.2 Justifications used

1. **Fixed-price risk transfer**: vendor absorbs all overages. If the work
   takes 15 days instead of 10, the client still pays $20K. This is a real
   risk being priced in — and amplified by the flexible payment terms
   (vendor takes timeline AND cash-flow risk).

2. **Compressed delivery premium**: 10-day compressed delivery requires
   sustained daily output. A vendor doing this exclusively for 2 weeks is
   forgoing other engagements.

3. **Design + dev bundling**: the interactive preview serves as the spec —
   meaning the design discovery and UX iteration cost is paid upfront and
   bundled into the price. Compare to typical separate-phase design work
   ($3K-5K) + development ($8K-12K) = $11K-17K range. $20K sits just above
   that range, reflecting the timeline compression and flexible-payment risk.

4. **Flexible payment as relationship investment**: "pay when ready"
   reduces friction for client approval and signals trust. The trade-off is
   the vendor effectively extends an interest-free credit line of $20K to
   CHALK. The $20K headline absorbs this implicit financing cost.

5. **End-to-end ownership**: no hand-offs, no QA team coordination cost, no
   PM overhead. Single contact, single contract.

### 6.3 Counterarguments

1. **Reality check on hours**: 3.6–5.6× the hourly base is high. Typical
   fixed-price premiums in this kind of engagement are 1.5–2.5× hourly. The
   premium here suggests either (a) significant risk transfer (timeline +
   payment timing), (b) capacity pricing (vendor charging what the client
   will pay), or (c) hidden margin.

2. **Scope ambiguity**: "5 main views renovated" is loose. The vendor could
   ship five barely-functional views and call it done. There is no
   explicit acceptance criteria document — only the visual preview as spec.

3. **Bug triage dependency**: "bug triage from CHALK-provided list" is
   included, but the list doesn't exist yet. This could easily expand or
   contract scope.

4. **Original phased estimate suggests $5K-8.5K for the same scope**: the
   ~3× increase relative to phased pricing is not explained in the
   client-facing proposal.

5. **Flexible payment terms can mask underpricing risk**: if CHALK pays in
   18 months instead of 2 months, the time-value-of-money cost erodes the
   premium. Was this modeled? No explicit calculation has been shared.

### 6.4 Recommended audit verdict criteria

The pricing is defensible **if**:
- The vendor truly absorbs overage risk (no add-on invoices mid-stream)
- The 10-day timeline is met or beaten
- The mockup is fully implemented (not 60% of it)
- The bug list, when provided, is genuinely triaged

The pricing is **questionable** if:
- The vendor extends the timeline mid-engagement
- "Mockup" interpretation shrinks during build
- Bug triage is deferred to a separate quote
- Quality of the delivered views falls short of the mockup fidelity

---

## 7. Technical strategy — auditor checks

### 7.1 Rollback claim verification

The accurate claim is: **zero production impact if the branch is not
merged or deployed to production. Staging preview remains live until
overwritten or explicitly cleared.** An auditor can verify this:

- **All v2 code** lives in `src/v2/*`. Run `find src/v2 -type f` to confirm.
- **Only modification outside v2**: 2 lines in `src/App.tsx`:
  - `import { V2App } from './v2/App'`
  - `<Route path="/v2" render={...} />`
- **No package.json changes**: confirmed.
- **No build config changes**: confirmed.
- **No Firebase changes**: confirmed (no rules, indexes, functions touched).
- **No data migrations**: confirmed (v2 uses stub data only).
- **Production hosting (`cqrefpwa.web.app`)**: untouched. The branch has
  never been deployed there.

**What is NOT automatically reverted:**
- **Staging hosting** (`chalk-dev-c6a5d.web.app`) currently serves the v2
  preview. It stays live until someone redeploys staging from `develop`,
  or until the staging hosting target is explicitly cleared. The preview
  URL is technically public (no auth required for v2 routes) — see §8
  risks.
- The branch itself remains on GitHub until deleted. No cost, but visible.

**Rollback procedure if rejected:**
```bash
# 1. Remove the branch
git push origin --delete feature/chalk-2.0-renovation
git branch -D feature/chalk-2.0-renovation

# 2. Overwrite staging so the v2 preview is no longer publicly accessible
git checkout develop && git pull
cd CoachingApp
npx rimraf build
npx env-cmd -e staging npx webpack --mode=production
npx firebase deploy -P staging --only hosting
```

Step 2 is critical and easy to forget. Without it, the v2 preview URL
remains live indefinitely.

This claim **holds up** under inspection, with the staging-cleanup caveat
explicitly noted.

### 7.2 Coexistence of legacy + v2

Both UI worlds run in the same React app. The two-line addition in App.tsx
ensures `/v2/*` routes go to V2App. All other routes remain unchanged. Auth
state, Redux store, Firebase context — all shared.

**Potential issue:** the v2 routes do not check auth. Anyone with the URL
can preview them. This is intentional for the demo phase but would need to
be wrapped in `<PrivateRoute>` before production rollout.

### 7.3 Scoped CSS to prevent leakage

All v2 styles are scoped to `.v2-root` (a wrapper class on the v2 App). This
prevents Poppins font / CSS variable values from bleeding into legacy MUI
pages. Verified by inspecting `tokens.css` and `globals.css`.

**Edge case:** the Google Fonts import (`@import url(...)`) in `globals.css`
loads Poppins for the entire document, not just `.v2-root`. The font itself
is loaded globally even on legacy pages. Bandwidth-only impact; no visual
leakage because legacy pages explicitly set Roboto via MUI.

### 7.4 Theme persistence across legacy and v2

The `useTheme` hook stores user preference under `chalk-v2-theme` in
localStorage. Keyed separately from any future legacy app theme. No conflict.

---

## 8. Risks identified

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Client (Deanna+Ellie) rejects the offer entirely | Medium | $270-360 of pre-work wasted; small relative to engagement value | Branch deletion only — no permanent cost. |
| 2 | Client accepts but scope expands ("can you also add X?") | High | Erodes margin during 10-day sprint | Proposal explicitly lists "out of scope" items as separately quotable. Must enforce mid-sprint. |
| 3 | Bug list from CHALK is too vague to triage in remaining time | High | Bug-triage portion of scope becomes contentious | Plan explicitly conditions this on a "concrete list" from CHALK. |
| 4 | Service Worker cache (Workbox) causes users to see old bundle after deploy | High (we hit this in CHALK-110) | Confused users, false reports of "broken" | Same mitigation as before: hard refresh / SW unregister documented. |
| 5 | Concurrent commits from another contributor (`thompchr@gmail.com`) overwrite our hosting deploy | Medium (we hit this in CHALK-115) | Lost work, deploy churn | Coordinate via Slack before deploys. |
| 6 | The 10-day timeline is unrealistic given the 123h plan estimate | Medium | Vendor delivers reduced quality, extends timeline, or trims scope | Risk priced into the $20K headline. Vendor absorbs overages — and absorbs them again via deferred payment if CHALK delays. Discipline on scope boundaries during sprint is the only enforcement. |
| 11 | Flexible payment timing — CHALK pays "when ready" — pushes vendor cash-flow into uncertainty | Medium | Vendor effectively extends interest-free credit. If CHALK takes 12+ months to pay, time-value-of-money erodes the premium. | Mitigated only by relationship trust. No formal mechanism in the proposal. Auditor should flag whether vendor can sustain this if CHALK is slow. |
| 12 | "Pay when ready" terms ambiguous to CHALK's internal AP / budget process | Medium | CHALK's finance team may flag a vendor proposal with no Net term as non-compliant with policy | The proposal explicitly states "flexible — pay when CHALK is ready" but doesn't define a fallback (e.g., 12-month outside date). Auditor should suggest adding one. |
| 7 | Speculative pre-build creates false impression that the offer is "almost done" | Low | Client may push for discount ("you've already done half") | Be transparent about how much remains. |
| 8 | Quality of stub data leaks into accepted real implementation (e.g., hardcoded "Dawn Johnson" stays in code) | Medium | Embarrassing bug in production | Code review step before merge: scan for any string that's a teacher name. |
| 9 | The proposal mentions "responsive iPad-first" but no responsive QA has been done | Medium | Promised feature underdelivered | Reserve time in the 10-day plan for explicit viewport testing. |
| 10 | No tests written for v2 components | High | Future regressions go undetected | Acknowledge in plan; allocate test work to Phase 4 (separate engagement). |

**Auditor question:** are there risks not listed here?

Candidates the auditor should consider:
- **Compliance / accessibility**: v2 components have no ARIA attributes, no
  keyboard navigation testing, no screen reader review. This is education
  software used in early-childhood settings — some users may have
  accessibility needs.
- **Data privacy**: the mockup uses real production user names (Dawn
  Johnson, Tina Arnold, etc.) in the staging build. While Deanna sees her
  own platform's data normally, the staging URL is technically public.
- **No active pentest or security review** has been run on the v2 routes
  (they're stubs, no auth required, but still). Reference §11 for the
  security audit that was done on dependencies.

---

## 9. Open questions / assumptions

### 9.1 Unverified assumptions in the offer

- **Assumption 1**: Ellie will approve $20,000. Prior approvals have ranged $200–$1,800. This is an order of magnitude larger. The flexible-payment framing is intended to reduce the approval friction, but CHALK's internal budget process may still require a defined NET term — not verified.
- **Assumption 2**: 10 working days is achievable. The plan estimates 123h for the scope; 10 working days at 8h/day = 80h. Either work compresses or scope reduces — and the vendor absorbs that compression entirely under fixed-price.
- **Assumption 3**: "Pay when ready" doesn't translate into "never pay". Vendor is trusting the relationship. No formal outside date is specified.
- **Assumption 3**: The mockup is the spec. There is no separate written specification document beyond the HTML mockup. Any ambiguity resolves to "what the HTML shows".
- **Assumption 4**: The client has the necessary bug list ready. The plan and proposal both require this; if absent, scope shifts.
- **Assumption 5**: Other CHALK contributors won't overwrite deploys mid-sprint. Saw this happen in CHALK-115. No coordination protocol established.

### 9.2 Questions for the auditor to raise with the vendor

1. Is $20K appropriate for the stated scope? What's the modeled scenario
   for if CHALK takes a long time to pay?
2. What happens if the bug list contains 50 hours of work? Is it cut, or is
   the scope quietly reduced?
3. Has the vendor verified that the design works at all stated breakpoints,
   or only desktop?
4. Is there a written acceptance criteria document, or is "looks like the
   preview" the contract?
5. If CHALK asks for "just one more thing" mid-sprint, what's the vendor's
   process for declining or absorbing?
6. Is there an outside-date for payment under "flexible terms"? If CHALK
   pays in month 18, is that acceptable, or does the vendor have a
   timeline of their own?

### 9.3 Ethical communication note

The client-facing email pitch is brief and emphasizes the flexible payment
("Net 15, Net 60, whatever works for CHALK"). The proposal PDF still
displays the $20K headline and "flexible — pay when ready" payment terms
prominently. There is no hidden cost or surprise — the offer is what the
documents say.

The earlier gift-framing experiment was reverted before sending. If any
client-facing artifact references "gift" or "no invoice", it's a stale
draft and should be regenerated.

Specifically, the auditor should verify:
- The PDF (`docs/CHALK-2.0-Proposal.pdf`) reflects $20K, flexible terms, no "gift" language
- The email pitch in §3.4 of this document matches what is actually being sent
- The CTA button in the PDF says "Approve — $20,000 / 10 days / pay when ready"

---

## 10. Index of artifacts (all files an auditor should review)

### 10.1 Client-facing artifacts (what Deanna receives)

| File | Purpose | Length |
|---|---|---:|
| `docs/CHALK-2.0-Proposal.pdf` | Formal proposal | 131KB · ~5 printed pages |
| `docs/CHALK-2.0-Mockup.zip` | Downloadable interactive mockup | 24KB |
| `docs/CHALK-2.0-Mockup.zip` › `index.html` | Multi-view interactive prototype | 46KB |
| `docs/CHALK-2.0-Mockup.zip` › `walkthrough.html` | Scrollable narrative version | 57KB |
| `docs/CHALK-2.0-Mockup.zip` › `README.txt` | Usage instructions | 1.3KB |
| Live staging URL | `https://chalk-dev-c6a5d.web.app/v2/home` (and `/v2/teachers`, etc.) | — |

### 10.2 Source HTML (for editing / regeneration)

| File | Generates |
|---|---|
| `docs/chalk-2-proposal.html` | The proposal PDF |
| `docs/chalk-2-app-mockup.html` | The interactive mockup `index.html` |
| `docs/chalk-2-demo.html` | The walkthrough |

### 10.3 Internal documents (vendor-only)

| File | Purpose |
|---|---|
| `.chalk/CHALK-2-RENOVATION-PLAN.md` | The 13-section internal plan including stack decisions, phasing, risks, process. The technical truth behind the proposal. |
| `.chalk/CHALK-2-AUDIT-PACKAGE.md` | (This document) |
| `.chalk/TICKETS.md` | The full work history with the client (CHALK-090 → CHALK-115 done; CHALK-200/CHALK-201 representing the new renovation work in progress) |
| `.chalk/decision-log.md` | Earlier architecture decision records (predates this engagement) |

### 10.4 Context documents (audit background)

| File | What it tells the auditor |
|---|---|
| `docs/United Way Feedback - April 2026.md` | The catalyst — verbatim summary of customer feedback |
| `docs/SECURITY-AUDIT-2026-05.md` | Dependency / library audit run separately; not part of the $20K scope but informs Phase 4 reasoning |
| `resources/budget/Invoice INV-001 _ Servicios ID SAS - CHALK Coaching.pdf` | First invoice (35h × $45 = $1,575) for context on prior pricing |
| `resources/budget/Estimate #1019 - Help_Support Chatbot _ CHALK Coaching.pdf` | Prior estimate; mentions iPad landscape as primary device |

### 10.5 Implementation artifacts (the actual code)

| Path | What's there |
|---|---|
| `CoachingApp/src/v2/design/tokens.css` | Design tokens + light/dark CSS variables |
| `CoachingApp/src/v2/design/globals.css` | Scoped resets + Poppins font import |
| `CoachingApp/src/v2/hooks/useTheme.ts` | Theme hook with localStorage |
| `CoachingApp/src/v2/components/` | Button, Avatar, Pill, Card, Stat |
| `CoachingApp/src/v2/layout/AppShell.tsx` | Top nav with theme toggle |
| `CoachingApp/src/v2/pages/CoachHome.tsx` | Dashboard view |
| `CoachingApp/src/v2/pages/AllTeachers.tsx` | Teachers list with filter row |
| `CoachingApp/src/v2/pages/LiveObservation.tsx` | Open-mode observation view |
| `CoachingApp/src/v2/pages/PlanDetail.tsx` | Action plan with conversation |
| `CoachingApp/src/v2/pages/Training.tsx` | Adaptive training cards |
| `CoachingApp/src/v2/App.tsx` | v2 router |
| `CoachingApp/src/App.tsx` | Legacy app router (2-line addition for `/v2`) |

### 10.6 Branch state

```
Branch: feature/chalk-2.0-renovation
Base:   master (a7ffd1209)
Commits ahead of master:
  bbcb1640a  feat(v2): scaffold CHALK 2.0 renovation — design system, AppShell, Coach Home  (Day 1)
  763362c96  feat(v2): build full mockup — All Teachers, Live Observation, Plan Detail, Training  (Day 2)
Branch status: pushed to origin, NOT merged.
```

---

## 11. Related security audit (separate engagement)

A dependency-security audit was conducted in parallel and is **not part of
the $20K scope**. Findings are relevant because Phase 4 of the original plan
(deferred from the current offer) addresses much of what the security audit
flagged.

**Source:** `docs/SECURITY-AUDIT-2026-05.md`

Summary findings:
- 276 vulnerabilities in app (19 critical, 111 high)
- 35 vulnerabilities in functions (2 critical, 19 high)
- Most critical: `crypto-js` PBKDF2 weakness (used in production), `jspdf` DoS, deprecated `@material-ui/core@4`, Firebase SDK 4 majors behind
- Recommended immediate batch (6 point upgrades, ~$200-270, 4-6h) deliberately excluded from the $20K offer

The auditor reviewing this engagement should note that **the offer does not
address known security vulnerabilities** — that's a separate, smaller
engagement that should be priced and delivered independently.

---

## 12. Auditor checklist

For an LLM (or human) auditor, the questions to actively answer:

**Pricing & commercial:**
- [ ] Is $20,000 appropriate for the stated scope and risk profile? (See §6 for the explicit rationale + counterarguments.)
- [ ] Do the "flexible payment terms — pay when CHALK is ready" introduce risk that should be capped (e.g., an outside payment date)?
- [ ] Has the time-value-of-money impact of deferred payment been modeled? If CHALK pays in 12+ months, does the $20K headline still cover the work?
- [ ] Is the implied effective hourly ($163-$250/h) justifiable, or is it capacity pricing?

**Technical:**
- [ ] Is the 10-day timeline realistic, or does it set up a quality compromise? (123h plan vs 80h offer.)
- [ ] Is the rollback claim accurate? Production impact: zero if not merged/deployed. Staging preview: must be explicitly cleared (§7.1).
- [ ] Code quality review: are the v2 components well-built, or are they throw-away mock code that won't survive integration with real Firebase data?
- [ ] Are there scope items in the offer that won't actually be delivered in 10 days?

**Risks & ethics:**
- [ ] Are the risks in §8 comprehensive? What's missing?
- [ ] Are accessibility, data privacy, and security treated appropriately? (Note: real production user names are visible on the staging URL.)
- [ ] Is the pitch framing honest? It anchors strongly in the United Way feedback.
- [ ] Is the acceptance criteria adequate? ("Looks like the preview" — is that enough?)
- [ ] If CHALK asks for "just one more thing" mid-sprint, what's the vendor's process?
- [ ] What would the auditor change in the proposal before sending?

If the auditor produces a written response, it should land in
`.chalk/CHALK-2-AUDIT-RESPONSE.md` for the vendor's review.

---

End of audit package. Last update: 2026-05-20.
