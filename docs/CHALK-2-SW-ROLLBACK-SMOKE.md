# CHALK 2.0 Service Worker Deploy/Rollback Smoke

This runbook is for staging validation only. It does not authorize production deploy.

## Preflight

- Confirm the rollback tag or SHA exists locally.
- Confirm the candidate branch is pushed to the fork.
- Confirm `npm run v2:ci:smoke` and `npm run staging` pass locally or in CI.
- Use hosting-only deploys for this smoke. Do not deploy Functions or Firestore rules as part of service worker validation.

## Deploy smoke

1. Build the candidate bundle:

   `npm run removebuild && npm run staging`

2. Deploy staging hosting only:

   `firebase deploy -P staging --only hosting`

3. Open staging in a clean browser session and load `/v2/home` after logging in with a safe test account.
4. Refresh once and confirm the same hashed JS bundle remains available.
5. In a second tab, keep the old page open.
6. Deploy a second candidate build with a different bundle hash using the same hosting-only command.
7. Return to the first tab and confirm one of these happens:

   - the CHALK update notice appears and the Refresh button loads the new bundle, or
   - `controllerchange` reloads the page exactly once.

8. Confirm the console does not show a mixed asset state such as missing chunk JS, stale service-worker cache errors, or a V2 page loading without its CSS/assets.

## Rollback smoke

1. Capture the current branch name:

   `git branch --show-current`

2. Check out the known rollback tag or SHA without moving the branch:

   `git switch --detach <rollback-tag-or-sha>`

3. Build rollback assets:

   `npm run removebuild && npm run staging`

4. Redeploy staging hosting only:

   `firebase deploy -P staging --only hosting`

5. Reopen staging and confirm the rollback bundle loads.
6. In a previously open candidate tab, refresh and confirm the page does not enter a mixed asset state.
7. Return to the working branch:

   `git switch feature/chalk-2.0-renovation`

## Failure criteria

Block release if any of these occur:

- stale tabs keep loading an unavailable JS chunk,
- CSS/assets come from a different release than the main JS bundle,
- the update notice appears repeatedly after refresh,
- rollback requires Functions or Firestore rules deploy to recover hosting,
- users cannot recover with one refresh.
