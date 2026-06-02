# CHALK 2.0 Monitoring Gate

## Sentry/equivalent behavior

CHALK 2.0 now has a lightweight monitoring adapter in `src/v2/lib/monitoring.ts`. It captures render errors from the V2 error boundary and global browser errors/unhandled promises.

The adapter sends JSON to `process.env.V2_MONITORING_ENDPOINT` when configured. That endpoint can be Sentry, a Sentry relay, Cloud Logging ingestion, or another equivalent provider. If the endpoint is blank, events are logged to the console and Path A/B production release is not approved.

## Release ID

Webpack defines `process.env.V2_RELEASE_ID` from `REACT_APP_V2_RELEASE_ID`. The payload includes `releaseId` so monitoring events can be tied back to a Git SHA, release tag, or staging candidate.

## Source maps

Webpack is configured with `devtool: "source-map"`, so production and staging builds emit source maps. For Path A/B, those source maps must be uploaded to or associated with the selected monitoring provider for the same `V2_RELEASE_ID` before production approval.

Path C preview can proceed with console/event capture only if stakeholders accept that stack traces may not be provider-symbolicated yet.

## Manual proof before Path A/B

1. Set `REACT_APP_V2_RELEASE_ID` to the candidate SHA/tag.
2. Set `REACT_APP_V2_MONITORING_ENDPOINT` to the provider ingestion endpoint.
3. Build staging or production.
4. Trigger a controlled V2 render error.
5. Confirm the event appears with the expected release ID and readable source-mapped stack.
