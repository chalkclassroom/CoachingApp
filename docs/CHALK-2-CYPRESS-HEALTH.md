# CHALK 2.0 Cypress Health

## Legacy Cypress health

The existing Cypress tree contains long-running legacy observation specs, example Cypress specs, and admin specs that depend on seeded users and legacy login state. Those tests are useful as historical coverage, but they are not a production gate for the CHALK 2.0 Path C preview release.

Known reason: several legacy observation specs include 60-135 second waits and assume interactive observation timing. Running the full legacy suite in every V2 release candidate would make the gate slow and brittle before V2-specific coverage is mature.

## Path C gate

Path C uses a scoped V2 gate:

- `npm run v2:ci:smoke` for static contract checks and release guardrails.
- `npm run staging` for the staging production bundle.
- `npm run v2:cypress:smoke` for the Cypress spec under `cypress/integration/v2/**/*.ts`.

The GitHub Actions workflow `.github/workflows/v2_smoke.yml` runs those commands on the renovation branch and on PRs that target staging or master.

## Release implication

A broken full legacy Cypress suite must be tracked as a separate repair spike. It should not be hidden inside G6.1. For Path A/B production release, the V2 scoped suite should be expanded beyond anonymous preview readiness before production approval.
