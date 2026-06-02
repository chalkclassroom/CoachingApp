# CHALK 2.0 Autonomous Production Execution Contract

Status: active execution guidance

Branch: `feature/chalk-2.0-renovation`

Remote target: `fork/feature/chalk-2.0-renovation`

Production deploy: not approved

## Why this document exists

The branch currently supports a safe Path C staging preview, but the remaining request is broader: make V2 a fully renovated product. That requires one operating contract so future agents do not mix three different targets:

- Path C: authenticated staging preview with explicit delegation.
- Path B: production coach workspace with some legacy delegation.
- Path A: full V2 production replacement.

Autonomous execution now targets Path A-quality implementation, while keeping deploy policy at NO-GO until release gates are completed and approval is recorded.

## Non-negotiable execution rules

- Push only to `fork`, not `origin`.
- Do not deploy production.
- Do not commit `.firebaserc` or `functions/.env` unless explicitly requested.
- Write the failing check first, then production code, then the passing proof.
- Unsupported workflows must be hidden, read-only, or explicitly delegated. They must not look live.
- No demo rows, fictional teacher names, local-only threads, or stub initial state may appear in `src/v2`.
- Every new Firestore read or write requires:
  - an API function in `src/v2/lib/api.ts`,
  - a rules inventory entry/check,
  - emulator allow and deny coverage,
  - UI error handling.
- Prefer legacy Firestore collections and existing backend contracts over new schemas.
- If a new schema is unavoidable, document it before implementation and add rules/tests in the same commit.

## Production architecture decisions

| Area | Default decision | Why |
| --- | --- | --- |
| Release target | Build toward Path A, ship only when gates pass | User wants all V2 product gaps closed, but production approval is separate. |
| Data contracts | Reuse legacy collections first | Reduces migration risk and preserves BigQuery/report compatibility. |
| Rules posture | Default deny unknown reads and writes | Prevents the previous auth-only wildcard from returning and avoids private module leakage through fallback rules. |
| Delegated modules | Convert to live V2 unless blocked by missing external decision | Path C delegation is acceptable for preview, not full product renovation. |
| Messaging | Do not invent a silent local schema | Needs legacy storage reuse or an explicit V2 schema + rules + migration bridge. |
| Reports | Summary may stay live-ish, advanced reports need legacy-compatible contracts | Exports/scheduling affect trust and operations. |
| Admin writes | Require role-gated API + emulator denial tests | High blast radius. |
| Leader workflows | Require role fixtures and route-level denial tests | Prevents coach/admin leakage across roles. |
| Observation completion | Must preserve legacy canonical observation shape and export path | BigQuery compatibility is a release blocker. |
| Photo/audio | Not implemented until storage/privacy/retention decision is explicit | Media capture changes privacy and storage risk. |
| Monitoring | Sentry or equivalent required for Path A/B | Console-only monitoring is preview-only. |

## Missing external decisions

The code can continue moving without these, but production cannot be approved until they are answered:

| Decision | Needed before | Default until answered |
| --- | --- | --- |
| Monitoring provider and DSN/endpoint | Path A/B production release | Adapter remains implemented but provider proof is pending. |
| Media scope: photo/audio allowed, retention, and storage bucket/path | Any photo/audio feature | Do not build media capture. |
| Messaging storage: legacy reuse vs new schema | Live V2 messaging | Keep legacy delegation until a schema is documented. |
| Report scheduling/export ownership | Advanced V2 reports | Keep reports read/delegated unless a contract exists. |
| Production release owner and rollback owner | Production deploy | NO-GO. |

## Known design risks to address during execution

- Some screens currently optimize for honest preview rather than full productivity. As modules become live, replace disclosure cards with direct workflow controls.
- Large bundled resources make the main bundle heavy. Path A needs a bundle/performance pass.
- Full Cypress legacy health is separate from scoped V2 smoke. Path A/B need expanded V2 smoke, not only static checks.
- Role navigation must be verified both by hidden nav items and direct-route access denial.
- Empty/loading/error states must be retained even after live integration; production data can still be unavailable.

## Goal execution order

1. Observation and action plan canonical workflows.
2. Live coach workspace modules: teacher profile, resources, training, account persistence.
3. Messaging, reports, admin, leader, and profile parity.
4. Release hardening: monitoring provider proof, source-map proof, Cypress expansion, performance, release notes.

Each goal should leave the branch shippable to staging and explicitly say whether production remains blocked.
