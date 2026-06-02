# CHALK 2.0 Production Release Checklist

Production status: HOLD

This checklist is a gate, not an approval. CHALK 2.0 can be reviewed as a Path C preview candidate, but production remains blocked until every required evidence row is filled and written approval is recorded.

## Required evidence

| Gate | Required evidence | Current status |
| --- | --- | --- |
| Static V2 smoke | `npm run v2:ci:smoke` output attached to release notes | Pending per release candidate |
| Staging build | `npm run staging` output attached | Pending per release candidate |
| Production build | `npm run prod` output attached | Pending per release candidate |
| Firestore rules smoke | `npm run v2:rules-smoke:test` output attached | Pending per release candidate |
| Cypress V2 smoke | `npm run v2:cypress:smoke` output attached or CI link attached | Pending per release candidate |
| Monitoring proof | Controlled V2 error appears in Sentry/equivalent provider with release ID | Pending provider endpoint |
| Source map association | Source map association verified for the same `V2_RELEASE_ID` | Pending provider setup |
| Service worker rollback smoke | Service worker rollback smoke completed from `docs/CHALK-2-SW-ROLLBACK-SMOKE.md` | Pending staging deploy/rollback exercise |
| Rollback tag | Rollback tag exists and is pushed before production deploy | Pending explicit tag |
| Release notes | Release notes enumerate included modules, delegated modules, stubs, and known risks | Pending candidate |
| Approval | Written owner approval for production | Not granted |

## Explicit production deploy command

Do not run this unless every gate above is complete and approval is recorded:

`npm run removebuild && npm run prod && firebase deploy --only hosting:cqrefpwa`

No production deploy without written approval.

## No-go conditions

Block production if any condition is true:

- Cypress V2 smoke fails or was not run.
- Firestore rules smoke fails or was not run.
- Monitoring proof is missing for Path A/B.
- Source map association is missing for Path A/B.
- Rollback tag is absent or unpushed.
- Service worker rollback smoke was not completed.
- Release notes do not disclose delegated modules.
- Stakeholder approval is ambiguous.

## Path C preview note

A staging-only Path C preview may proceed without production approval if it uses hosting-only deploy, keeps production untouched, and records the preview URL, commit SHA, smoke results, and rollback SHA.
