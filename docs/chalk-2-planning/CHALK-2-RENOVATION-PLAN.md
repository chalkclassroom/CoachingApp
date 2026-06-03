# CHALK 2.0 — Renovation Execution Plan

> Internal planning document. Assumes the visual design (mockups in `docs/chalk-2-*.html`) has been approved.
> Drafted May 2026 · Servicios ID SAS.

---

## 1. Strategy: Strangler-fig migration, not rewrite

**Core principle**: do not freeze the live app to "rebuild it". Instead, build the new design system alongside the existing code, then migrate routes one at a time. Old and new coexist until everything has moved.

Why:
- The app is in production with real users (~600). Any extended freeze risks churn.
- The team is small (1 dev). A rewrite would take 6+ months with zero visible progress; a strangler approach ships value every 2-3 weeks.
- Recent work (login tracking, action count, responsive filter) already validated this pattern — they shipped without breaking anything.
- CHALK's leadership (Deanna, Ellie) can validate at each phase boundary before approving the next.

What this means concretely:
- New code lives in `src/v2/` (or similar prefix). Old code untouched.
- New routes use the new shell + design system. Old routes keep working.
- A feature flag (or simply route registration) decides which version is served.
- When a view is fully replaced, the old code is deleted in the same PR.

---

## 2. Stack decisions

### Keep as-is (for now)
| Layer | Current | Why keep |
|---|---|---|
| Framework | React 16 | Stable. Upgrading is a separate project. |
| State | Redux + redux-observable | Works. Migration is high-risk for low UX value. |
| Backend | Firebase (Auth, Firestore, Functions) | No reason to touch. |
| Routing | React Router v5 | Routes already exist. |

### Replace
| Layer | From | To | Why |
|---|---|---|---|
| UI library | MUI 4 (full) | MUI 4 (used selectively) + custom v2 component library | MUI 4 is EOL; their theme system doesn't support CSS variables (needed for dark/light without re-renders); v2 components give us full control over the new design language. |
| Theming | MUI theme object | CSS custom properties on `:root` | Enables instant light/dark switch, works with print, no JS re-render needed. |
| Fonts | Roboto (MUI default) | Poppins (matches chalkcoaching.com) | Brand alignment. |
| Icons | MUI icons | lucide-react (or SVG sprite) | Lighter, more modern visual language; matches the mockup. |

### Defer (Phase 4 if approved)
- React 16 → React 18 (concurrent rendering, automatic batching)
- Webpack 4 → Vite (dev server speed, smaller bundle, modern JS)
- MUI 4 → MUI 5 (if still needed after v2 lib matures)
- Dependency vulnerability cleanup (294 CVEs from GitHub warning)

---

## 3. Foundation work — Phase 0 (before any feature work)

This phase is the price of entry for everything that follows. Cuts time on every later phase.

### Design system module — `src/v2/design/`
- `tokens.ts` — colors, typography, spacing, radii, shadows, breakpoints (all as CSS var references)
- `theme.css` — CSS custom properties for light and dark, defined under `:root` and `[data-theme="dark"]`
- `globals.css` — Poppins font import, body reset, base typography

### Component library — `src/v2/components/`
Built atomically, each with light/dark support out of the box:

**Atoms:**
- `<Button>` (primary, secondary, accent, warm, sizes sm/md/lg)
- `<Input>`, `<Select>`, `<DatePicker>` (wraps @material-ui/pickers but skinned)
- `<Avatar>` (initials with gradient bg)
- `<Pill>`, `<Badge>`, `<Tag>`
- `<Icon>` (lucide wrapper)

**Molecules:**
- `<Stat>` card with icon
- `<TimelineItem>`
- `<DateRangePicker>` (the one we already built, generalized)
- `<Tooltip>` (already in MUI 4, just wrapped)
- `<Toast>` notification

**Organisms:**
- `<AppShell>` (top nav, theme toggle, user menu, content area)
- `<Card>` with header/body/action slots
- `<DataTable>` (re-implementation of the All Users table pattern, reusable)
- `<Modal>` (centered, with header/body/footer slots)
- `<EmptyState>` (illustration + CTA)

**Layout:**
- `<Page>` (wraps view with consistent padding, max-width)
- `<Section>` (heading + content)
- `<TwoColumnGrid>` for the 2fr/1fr patterns we use everywhere

### Theme provider
- React context hooking into CSS custom properties (toggles `data-theme` attribute on `<html>`)
- `useTheme()` hook for component-level access
- localStorage persistence + system-preference fallback (or fixed light default per current call)

### Routing + Auth wrapper
- New `<V2Layout>` wraps the new AppShell around routed content
- Existing auth flow (Firebase) wired in
- Auth state piped to nav (user avatar, name, role)

### Estimate
| Item | Hours |
|---|---:|
| Design tokens + CSS variables + theme provider | 4 |
| Poppins + base typography + globals | 1 |
| Atoms (Button, Input, Select, DatePicker, Avatar, Pill, Badge, Tag, Icon) | 6 |
| Molecules (Stat, TimelineItem, DateRangePicker generalized, Toast) | 5 |
| Organisms (AppShell, Card, DataTable, Modal, EmptyState) | 8 |
| Layout components (Page, Section, grids) | 2 |
| Auth+routing wiring for v2 shell | 3 |
| Documentation + a `/v2-preview` route to demo all components | 3 |
| **Foundation total** | **32h (~$1,440)** |

---

## 4. Responsive layouts — cross-cutting commitment

Every view in v2 must adapt to viewport changes. This is not a feature, it's a requirement — applied at every component, every layout, every phase.

### Why this matters specifically for CHALK

- **Coaches use the app on iPads in classrooms** — Estimate #1019 explicitly called out "iPad landscape as primary device"
- **Admins use desktop monitors at varying sizes** — often 1366px laptops, sometimes 1920px+ monitors
- **Site leaders sometimes review on phones** during commutes
- **Resize behavior at boundary widths** (1280px, 960px) is exactly where layouts typically break — we already saw this with the All Users filter row

### Breakpoint strategy

Following Material breakpoints (already used by MUI in the current codebase, so no friction):

| Name | Width | Target devices |
|---|---|---|
| `xs` | < 600px | Phones portrait |
| `sm` | 600–959px | Phones landscape, small tablets |
| `md` | 960–1279px | Tablets landscape, small laptops |
| `lg` | 1280–1919px | Laptops, standard desktops |
| `xl` | ≥ 1920px | Large monitors |

### Per-component standards

| Pattern | Rule |
|---|---|
| **Cards & grids** | Switch from multi-column to single-column at `md` or below where density requires it (e.g. dashboard `2fr/1fr` → stacked) |
| **Data tables** | Wrap in a horizontal-scroll container; collapse non-essential columns at `sm` |
| **Forms & modals** | Full-width on `xs/sm`; centered fixed-width on `md+` |
| **Navigation** | Top-nav links collapse into a hamburger menu below `md` |
| **Filters & toolbars** | Two groups (left = primary filters, right = secondary) inline at `lg+`, stacked vertically below |
| **Date pickers** | Stack vertically when the row width forces wrap; never overflow the container |
| **Tap targets** | Minimum 44×44px (Apple HIG) for every interactive element on touch devices |
| **Font sizing** | Body 14-16px stays constant; headings scale down 1 step at `sm` and below |

### Approach

- **Mobile-first CSS** where reasonable — base styles work at `xs`, larger breakpoints add columns and breathing room
- **Container queries** for components that should respond to their parent's width (not the viewport) — supported in all modern browsers we target
- **Flexbox + CSS Grid** as the default — avoid fixed widths; let content + breakpoints decide
- **No JS-based layout** unless absolutely necessary (e.g., virtualized long lists). CSS handles 95%+ of cases.
- **No horizontal scrollbars on the page itself** — only inside intentional containers (tables)
- **Fluid typography** for hero/marketing-style headings using `clamp()` where appropriate

### Testing matrix

Every PR includes a visual sanity check at these viewports before merge:

| Viewport | Why |
|---|---|
| 375 × 667 | iPhone SE — minimum supported phone |
| 768 × 1024 | iPad portrait |
| **1024 × 768** | **iPad landscape — primary CHALK device** |
| 1280 × 800 | Typical laptop |
| 1920 × 1080 | Large monitor |

Plus a **dynamic resize check**: drag the browser corner from wide to narrow to wide — no layout jumps, no overlapping content, no scrollbars appearing/disappearing in unexpected places.

### Budget impact

Already factored into Phase 0 component design and per-phase QA budgets. **Not a separate line item** — building responsive from day 1 is dramatically faster than retrofitting. The testing matrix adds ~1-2 hours per phase for the resize-check pass, already included in QA estimates.

---

## 5. Phase 1 — Quick wins on new system (5-7 weeks elapsed, including Phase 0)

### Deliverables
1. **New Coach Home** (`/home`, replaces `/Home`) — dashboard with stats cards, attention list, recent activity, active plans, quick actions
2. **Auto-save on coaching/action plans** — Firestore listener writes on every change, debounced 1.5s
3. **"Send to teacher"** — replaces download buttons on plans, writes a record + triggers existing SendGrid Cloud Function
4. **New "Add user" modal** — single-step, role as pills, CSV import path stubbed
5. **Remove pre-observation training gate** for users with `role === 'coach' && yearsActive > 1` (or simpler: any non-`teacher` role)
6. **Bug triage** — pending concrete list from CHALK

### Backend changes
| Change | Risk |
|---|---|
| New Firestore field on plans: `lastSavedAt`, `sentToTeacher: { sentAt, by }` | Low — additive |
| Reuse existing `funcSendHelpRequest` SendGrid integration for plan-share emails | Low — known code |
| No schema migrations needed | — |

### Backend hours
| Item | Hours |
|---|---:|
| Auto-save mechanism + Firestore writes | 3 |
| Send-to-teacher Cloud Function adaptation | 2 |
| Training-gate skip rule | 1 |

### Frontend hours
| Item | Hours |
|---|---:|
| Coach Home view (stats, attention list, timeline, plans, quick actions) | 10 |
| Auto-save UI + indicator | 1.5 |
| Send-to-teacher button + confirmation modal | 2 |
| Add-user modal with role pills + CSV stub | 4 |
| Training gate logic + UI fallback | 1 |
| Bug triage (estimate placeholder until list provided) | 4 |
| QA across staging + prod deploy | 2 |
| **Phase 1 total** | **30.5h** |

### Phase 1 cost
**~$1,400** (frontend) **+ $270** (backend) = **~$1,670**
Combined with Foundation (Phase 0): **~$3,100**

**Recommendation**: bundle Phase 0 + Phase 1 as a single commercial milestone since Phase 0 has no standalone value.

---

## 6. Phase 2 — Medium initiatives (6-8 weeks elapsed)

### Deliverables
1. **Open Observation Mode** — timed free-form notes, auto-save, photo/audio capture stubs, end-and-align flow
2. **Post-observation Magic 9 alignment** — interactive screen mapping notes to framework dimensions
3. **In-app plan sharing with audit trail + comments** — supersedes the "Send to teacher" v1 with full threaded conversation
4. **Adaptive training engine** — Cloud Function analyzes observation patterns, returns training recommendations; UI consumes
5. **Bulk CSV import for users** — backend processor + UI flow
6. **UX polish across navigation, empty states, error messages, loading skeletons**
7. **Teachers list** migrated to v2 shell (already has login/action counts — port the design)

### Backend changes
| Change | Risk |
|---|---|
| New `observationDraft` collection with auto-save semantics | Medium — new schema, indexing |
| `magic9Mapping` field on observations linking notes to dimensions | Low |
| `planComments` subcollection | Low |
| `funcRecommendTraining` Cloud Function (Firestore trigger on new observation) | Medium — non-trivial logic |
| `funcImportUsers` Cloud Function for CSV processing | Medium — auth user creation |

### Estimate breakdown
| Component | Hours |
|---|---:|
| Open Observation Mode (UI + auto-save + state mgmt) | 14 |
| Magic 9 post-alignment flow (UI + persistence) | 8 |
| Plan sharing v2 (comments, audit trail UI) | 8 |
| `funcRecommendTraining` Cloud Function | 6 |
| Adaptive training UI cards + actions | 5 |
| CSV import backend + UI | 6 |
| Teachers list migration to v2 | 4 |
| UX polish pass (empty states, errors, loading) | 6 |
| QA across staging + prod deploy | 4 |
| **Phase 2 total** | **61h** |

### Phase 2 cost
**~$2,750** (at $45/hr)
Suggested fixed-price: **$3,000-$4,000** depending on scope sharpening.

---

## 7. Phase 3 — Big plays (8-12 weeks elapsed)

### Deliverables
1. **Full Coach Home personalization** — per-user widget layout, saved filters, "pin to top"
2. **Magic 9 as overlay** — coaches can opt out of framework entirely; reports still aggregate
3. **In-app coach ↔ teacher messaging** — full thread per teacher, notifications, unread counts
4. **Mobile-first observation experience** — tablet/phone optimized layout, touch gestures, offline support
5. **Program Leader analytics dashboard** — site-level metrics, cohort comparisons, trends
6. **Personalized learning pathways** — multi-module recommendations based on observation patterns

### Estimate breakdown
| Component | Hours |
|---|---:|
| Coach Home personalization (drag-drop widgets, saved filters) | 16 |
| Magic 9 overlay mode + reporting adaptation | 10 |
| Messaging system (UI + Firestore + notifications) | 24 |
| Mobile-first observation (responsive + offline cache) | 24 |
| Program Leader analytics dashboard | 20 |
| Learning pathways engine v2 | 16 |
| QA + deploy | 8 |
| **Phase 3 total** | **118h** |

### Phase 3 cost
**~$5,300** (at $45/hr)
Suggested fixed-price: **$6,000-$8,000**

---

## 8. Phase 4 — Tech debt & modernization (optional)

Decoupled from feature work. Only if CHALK wants to invest in platform longevity.

| Initiative | Effort | Why |
|---|---:|---|
| React 16 → React 18 | 12h | Newer features, better perf |
| MUI 4 → MUI 5 (or remove MUI entirely) | 16h | EOL on MUI 4; concentrate on v2 lib |
| Webpack 4 → Vite | 10h | Dev experience, faster builds |
| Dependency security cleanup (294 CVEs) | 14h | Compliance, peace of mind |
| Test coverage uplift | 20h | Long-term stability |
| **Phase 4 total** | **72h (~$3,250)** |

---

## 9. Total timeline & investment

| Phase | Elapsed time | Calendar | Cost (suggested fixed-price) |
|---|---|---|---:|
| 0 — Foundation | weeks 1-3 | 3 weeks | (bundled with Phase 1) |
| 1 — Quick wins | weeks 4-7 | 4 weeks | **$3,000 – $3,500** |
| 2 — Medium | weeks 8-13 | 6 weeks | **$3,500 – $5,000** |
| 3 — Big plays | weeks 14-25 | 12 weeks | **$6,500 – $9,000** |
| 4 — Tech debt | (separate engagement) | 8 weeks | **$3,000 – $4,000** |
| **End-to-end** | **~6 months** | **~25 weeks** | **$13,000 – $17,500** (Phases 0-3) |

Rate stays at **$45/hr** for consistency with prior engagements.

---

## 10. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| MUI 4 / React 16 interop quirks slow down v2 components | Medium | Build v2 components without MUI dependencies (use raw HTML + CSS). MUI used only where it adds clear value (Tooltip, DatePicker). |
| Service Worker cache issue (we hit this in login tracking deploy) | High | Bump SW version on every deploy; document the user-facing reload step; consider replacing Workbox precache with cache-first runtime caching. |
| Concurrent dev by other contributors (saw thompchr@gmail.com deploying) | Medium | Coordinate via Slack before deploys; use feature branches; consider a deploy lock or scheduled windows. |
| Scope creep within phases | Medium | Fixed-price per phase; out-of-scope items become next phase's input; written change-order process. |
| Firestore costs spike with new collections (observation drafts, comments) | Low | Compose drafts as user updates a doc, not separate docs. Composite indexes added only as needed. Monitor in Firebase console. |
| CHALK team doesn't deliver the bug list | High | Without it, Phase 1 bug-triage budget is held aside or de-scoped. State this clearly in the engagement letter. |

---

## 11. Process & communication

### Per-phase workflow
1. **Kickoff call** (30 min) — confirm scope, deliverables, timeline
2. **Sprint check-ins** — weekly written summary via Slack, mid-phase video call
3. **Staging review** — Deanna validates UI before prod deploy
4. **Production deploy** — coordinated; release notes shared
5. **Closeout** — invoice, retro notes, next-phase scoping

### Daily practice
- All work in feature branches → PR to `develop` → release PR to `master` (same pattern we've used)
- Visual regression testing: screenshots of v2 routes captured on each deploy
- Bug log maintained in `.chalk/BUGS-V2.md` so issues surface to CHALK transparently

### What CHALK provides
- **Phase 1 starter**: concrete bug list, Deanna available for 2 alignment calls
- **Phase 2 starter**: Magic 9 framework documentation (current source of truth)
- **Phase 3 starter**: messaging/notification preferences, mobile usage patterns from current users
- **Throughout**: timely staging review (within 48h of deploy) so velocity isn't blocked

---

## 12. What's needed to start

1. **Approval signal** from Deanna and Ellie (Slack confirmation is enough)
2. **Phase 0 + Phase 1 fixed-price** confirmation (suggested $3,000 - $3,500 combined)
3. **Bug list** for Phase 1's stability work (CHALK to provide within first week)
4. **Slack channel** for daily comms (or continue current channel)
5. **Kickoff call** scheduled — 30 minutes to align on Phase 1 specifics

Once these are in place, week-1 starts with Phase 0 foundation work and v2 route at `/v2-preview` available to CHALK by end of week 2 for early visual feedback.

---

## 13. Out of scope (separately quotable)

The following are NOT included in this plan but can be priced separately if CHALK wants them:

- **Auto-logout / session timeout** (Deanna's earlier security flag) — ~3h, ~$135
- **Marketing site refresh** (chalkcoaching.com) — out of our usual app scope; Squarespace work
- **Mobile native apps** (iOS / Android) — would require React Native re-implementation
- **Customer support / responsiveness improvements** — internal CHALK team responsibility, not dev work
- **Multi-language / i18n** — non-trivial; would be its own phase
- **HIPAA / FERPA compliance audit** — legal/compliance work, not dev

---

## Appendix A — File / module organization

```
CoachingApp/src/
├── components/           # existing v1 (untouched during migration)
├── views/                # existing v1 (untouched during migration)
├── v2/                   # ← new code lives here
│   ├── design/
│   │   ├── tokens.ts
│   │   ├── theme.css
│   │   ├── globals.css
│   │   └── README.md
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ...
│   │   └── index.ts      # barrel export
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Page.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── CoachHome.tsx
│   │   ├── Observation.tsx
│   │   ├── PlanDetail.tsx
│   │   ├── Training.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useToast.ts
│   │   └── useBreakpoint.ts
│   └── lib/              # backend wrappers, helpers
└── App.tsx               # routes both v1 and v2
```

Routes:
- `/Home` — v1 (until Phase 1 ships, then redirects to `/home`)
- `/home` — v2 Coach Home (Phase 1)
- `/observe/live` — v2 Open Observation (Phase 2)
- `/plans/:type/:id` — v2 plan detail (Phase 2)
- `/training` — v2 Adaptive Training (Phase 2)
- ... legacy routes redirect once equivalent v2 route ships

---

End of plan.
