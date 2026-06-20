# Production Deploy Runbook

Do not execute this runbook until the user explicitly approves the production cutover.

## Scope

- Deploy Open Observation V1 iter2 and the cached teacher roster fix to production hosting.
- Deploy the surgical production Open Observation ruleset in `firestore.prod-oo.rules`.
- Deploy the Firestore indexes required by the Open Observation list.
- Do not deploy functions.
- Do not mutate production data.

## Pre-Deploy Gates

All gates must be green before production:

1. Deanna signs off on the staging review.
2. The user gives an explicit production GO.
3. The current production Firestore rules are exported and compared against `firestore.prod-oo.rules`.
4. `firestore.prod-oo.rules` passes emulator checks for Open Observation permissions and legacy behavior preservation.
5. Rollback branch/tag are available:
   - Branch: `fix/prod-rollback-load-20260612`
   - Tag: `prod-rollback-loadable-no-open-observation-20260612`
   - Commit: `49859a9af`

## Production Rules Validation Already Completed

Validation date: 2026-06-20.

Live production rules exported from:

- Release: `projects/cqrefpwa/releases/cloud.firestore`
- Ruleset: `projects/cqrefpwa/rulesets/7c458f48-5f5d-4445-b417-787110773ce3`

The live production rules are the 2019 auth-only wildcard plus public writes for `pilotForm` and `emailList`:

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
    match /pilotForm/{document=**} {
      allow write;
    }
    match /emailList/{document=**} {
      allow write;
    }
  }
}
```

`firestore.prod-oo.rules` preserves that behavior for every non-`observations` collection via:

```js
match /{collection}/{document=**} {
  allow read, write: if signedIn() && collection != "observations";
}
```

The `observations` collection is excluded from the fallback so Open Observation privacy can be enforced:

- Open Observation create: owner coach only, with valid doc shape.
- Open Observation read: owner coach, observed teacher, or admin.
- Open Observation update: owner coach only, immutable identity/marker fields.
- Open Observation delete: denied; archive via `status`.
- Non-Open-Observation observations keep legacy authenticated read/write/delete behavior.

## Build

From `feature/chalk-2.0-renovation` at the intended commit:

```bash
npm run removebuild
NODE_OPTIONS=--openssl-legacy-provider npm run prod
```

## Hosting Deploy

Deploy only hosting to the production site:

```bash
./node_modules/.bin/firebase target:apply hosting cqrefpwa cqrefpwa --project cqrefpwa
./node_modules/.bin/firebase deploy --project cqrefpwa --only hosting:cqrefpwa --non-interactive
```

## Rules And Indexes Deploy

Do not deploy the branch's hardened `firestore.rules` to production for this cutover.

Use a temporary Firebase config that points rules to `firestore.prod-oo.rules` and indexes to the branch's `firestore.indexes.json`:

```bash
cat > /tmp/firebase.prod-oo.json <<'EOF'
{
  "firestore": {
    "rules": "firestore.prod-oo.rules",
    "indexes": "firestore.indexes.json"
  }
}
EOF
./node_modules/.bin/firebase deploy --project cqrefpwa --config /tmp/firebase.prod-oo.json --only firestore:rules,firestore:indexes --non-interactive
```

This deploys:

- `firestore.prod-oo.rules`, not `firestore.rules`.
- Composite indexes from `firestore.indexes.json`, including the Open Observation list indexes.
- No functions.
- No hosting, unless hosting was deployed separately in the previous step.

## Post-Deploy Verification

```bash
curl -sI https://cqrefpwa.web.app/
curl -sI https://cqrefpwa.web.app/OpenObservation
curl -sI https://cqrefpwa.web.app/OpenObservationResults
```

Verify:

1. `https://cqrefpwa.web.app/` returns `HTTP 200` with a fresh `last-modified`.
2. `/OpenObservation` loads for an authorized coach/admin account.
3. `/OpenObservationResults` loads and the list query does not show a missing-index error.
4. A coach can create/save an Open Observation.
5. The owning coach, observed teacher, and admin can read the saved result.
6. An unrelated coach or program leader cannot read that Open Observation.
7. Hard delete of an Open Observation is denied.
8. One legacy non-OO flow still works, for example the standard observation menu and a saved non-OO observation.

## Rollback

### Hosting Rollback

```bash
git fetch origin --tags
git switch --detach 49859a9af
npm run removebuild
NODE_OPTIONS=--openssl-legacy-provider npm run prod
./node_modules/.bin/firebase target:apply hosting cqrefpwa cqrefpwa --project cqrefpwa
./node_modules/.bin/firebase deploy --project cqrefpwa --only hosting:cqrefpwa --non-interactive
```

### Rules Rollback

Before the production rules cutover, keep a copy of the live rules source at `/tmp/prod-live-firestore.rules`.

To restore that source:

```bash
cat > /tmp/firebase.prod-rules-rollback.json <<'EOF'
{
  "firestore": {
    "rules": "/tmp/prod-live-firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
EOF
./node_modules/.bin/firebase deploy --project cqrefpwa --config /tmp/firebase.prod-rules-rollback.json --only firestore:rules --non-interactive
```

Known previous production ruleset id:

```text
projects/cqrefpwa/rulesets/7c458f48-5f5d-4445-b417-787110773ce3
```
