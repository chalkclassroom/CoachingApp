# CHALK 2.0 Release Decision Record

Decision: Path C preview

Production decision: NO-GO

No production deploy is approved from this branch. The current branch is intended for fork/staging review only: `fork/feature/chalk-2.0-renovation`.

## Included modules

The Path C preview includes these V2 surfaces behind authenticated access and role-aware routing:

- V2 shell and role-filtered navigation.
- Coach home/dashboard summary with live-safe fallback handling.
- Teachers directory and teacher profile surface where live data exists.
- Observation draft workflow with notes-only completion gated.
- Action plan draft contract fix and legacy conference-plan delegation.
- Messaging drafts backed by the legacy `emails` collection; email delivery and attachments remain in legacy CHALK.
- Resources backed by real bundled CHALK assets.
- Training modules with truthful completion persistence behavior.
- Account settings with live V2 preference persistence and locked identity fields.
- Reports summary with advanced reports delegated to legacy.
- Admin read-only/delegated workspace.
- Leader workflow delegation to legacy routes.
- Coach/site/program profile report delegation to legacy routes.

## Delegated modules

These modules are intentionally delegated to legacy CHALK for this release decision:

- Advanced report exports and report scheduling.
- Admin create/edit/import writes.
- Leader dashboards, users, teachers, coaches, sites, archive, and all-users workflows.
- Coach profile, site profile, and program profile reports.
- Conference plan creation/editing.
- Messaging email delivery and attachments.

## Risk acceptance

Risk acceptance is limited to staging/preview review. Production risk is not accepted yet.

Accepted for Path C preview:

- Some modules intentionally route back to legacy CHALK.
- Monitoring endpoint may remain unset while previewing if console capture is acceptable.
- Full legacy Cypress suite is not treated as the V2 gate.

Not accepted for production:

- Missing monitoring provider proof with source-map association.
- Missing Cypress V2 smoke evidence against release candidate.
- Missing Firestore rules smoke evidence.
- Missing rollback tag and owner confirmation.
- Any production deploy without written approval.

## Owners

Release owner: Servicios ID SAS until CHALK assigns a release owner.

Rollback owner: Servicios ID SAS for staging preview; production rollback owner must be confirmed before production approval.

Monitoring owner: TBD before Path A/B production release; current implementation supports Sentry/equivalent endpoint but does not configure a provider.

## Decision rationale

The renovation branch has enough guardrails to support a staging preview from the fork, but it still delegates high-risk workflows and lacks production monitoring proof. The correct decision is to continue staging validation while blocking production.

## Required change to approve production

Production approval requires completing `docs/CHALK-2-PRODUCTION-RELEASE-CHECKLIST.md`, recording evidence, setting a rollback tag, configuring monitoring/source maps, and obtaining written production deploy approval.
