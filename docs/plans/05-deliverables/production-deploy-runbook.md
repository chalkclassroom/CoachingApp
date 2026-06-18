# Production Deploy Runbook

Do not execute this runbook until the user explicitly approves the production cutover.

## Ordered Steps

1. On `feature/chalk-2.0-renovation` at the intended commit.

2. Hosting:

   ```bash
   npm run deploy
   ```

   This equals `removebuild` + `target:apply hosting cqrefpwa cqrefpwa` + `npm run prod` + `firebase deploy --only hosting:cqrefpwa`.
   Default project = `cqrefpwa` (prod).

3. Rules:

   ```bash
   firebase deploy --only firestore:rules --project cqrefpwa
   ```

   REQUIRED for Open Observation privacy; run only after the production rules diff confirms the branch ruleset is safe.

4. Functions: NOT deployed.

5. Post-deploy verify:

   ```bash
   curl -I https://cqrefpwa.web.app/
   curl -I https://cqrefpwa.web.app/OpenObservation
   ```

   Confirm fresh `Last-Modified`, spot-check `/OpenObservation`, and confirm a permission path.

6. Rollback:

   ```bash
   git checkout <prior-prod-commit>
   npm run deploy
   ```

   For rules, redeploy the previous ruleset.

## Preflight Notes

- On this machine, direct `npm run prod` fails under Node 24 without `NODE_OPTIONS=--openssl-legacy-provider` because this app uses Webpack 4. The production env config itself builds successfully when that option is set.
- The current live production Firestore ruleset is much more permissive than the branch ruleset. Do not deploy rules until the explicit-rule hardening has been accepted as a production behavior change, not merely an Open Observation-only change.
