# CHALK Coaching - Decision Log

This document records significant architectural and design decisions made during development.

---

## 2026-05-20 - Security Audit Tracking Strategy

**Decision:** Track security audit as umbrella ticket CHALK-300 with 8 phased sub-tickets (CHALK-301..308) instead of a single monolithic ticket.

**Context:**
- Security audit covers multiple independent areas: secrets, OWASP Top 10 (10 categories), dependencies, Firestore rules, Cloud Functions IAM, final report.
- A single ticket would conflate findings of different severities and make remediation hard to triage.
- Findings of HIGH+ severity need their own remediation tickets (CHALK-310+).

**Resolution:**
- CHALK-300: umbrella + tracking log + branch coordination
- CHALK-301: secrets detection (regex + git history)
- CHALK-302: OWASP A01/A03/A07 (Access, Injection, Auth)
- CHALK-303: OWASP A02/A05 (Crypto, Misconfiguration)
- CHALK-304: OWASP A06 (Dependencies — npm audit)
- CHALK-305: OWASP A08/A09/A10 (Integrity, Logging, SSRF)
- CHALK-306: Firestore rules review
- CHALK-307: Cloud Functions IAM + secrets
- CHALK-308: Findings report + remediation backlog

**Rationale:**
- Each phase can be executed independently and time-boxed
- Findings are scoped per phase → easier to triage by severity
- Final report (CHALK-308) consolidates output into `docs/SECURITY-AUDIT-2026-05.md`
- Report NOT committed without human review — may contain references to sensitive paths/secrets
- Remediation work tracked separately (CHALK-310+) so audit ticket can close cleanly

**Out of scope:**
- Active penetration testing (analysis only)
- GCP infrastructure audit (Couture/CHALK ops responsibility)
- Auto-fix of npm audit findings (each fix evaluated for breaking changes)

---

## 2026-03-26 - Help Request: Firestore Trigger vs httpsCallable

**Decision:** Use Firestore onCreate trigger instead of httpsCallable for help request emails

**Context:**
- Help button needs to send email to chalkcoaching@gmail.com via SendGrid
- Initial implementation used `functions.https.onCall` (httpsCallable)
- Deploy failed: `cloudfunctions.functions.setIamPolicy` permission denied
- Firebase httpsCallable requires `allUsers` Cloud Functions Invoker IAM role
- Developer account (ismaeldosil@gmail.com) has Editor role but not Functions Admin

**Resolution:**
- Frontend writes to `helpRequests` Firestore collection with user info and message
- Cloud Function `funcSendHelpRequest` uses `functions.firestore.document().onCreate()` trigger
- Trigger reads document data and sends email via SendGrid
- No IAM configuration needed (Firestore triggers run with service account permissions)

**Rationale:**
- Firestore triggers don't require public HTTP endpoint permissions
- Same end result (email sent) with simpler permission model
- Document in Firestore provides audit trail of help requests
- Pattern can be reused for future email features

---

## 2026-03-30 - Migración functions.config() a process.env

**Decision:** Migrar de `functions.config().sendgrid.key` a `process.env.SENDGRID_KEY` via `.env` file

**Context:**
- Firebase Runtime Config (`functions.config()`) fue deprecado en marzo 2026
- Deploy con `functions:config:set` fallaba con error de deprecación
- SendGrid API key necesitaba configurarse para producción

**Resolution:**
- Cloud Function lee key desde `process.env.SENDGRID_KEY`
- Key almacenada en `functions/.env` (gitignored)
- Destinatario cambiado de `contact@chalkcoaching.com` a `chalkcoaching@gmail.com` (Deanna confirmó que es la casilla que monitorean)

**Nota:** Las demás Cloud Functions (BigQuery) siguen usando `functions.config().env.*` y necesitarán migración eventual.

---

## 2026-01-27 - Last Action Column Performance Strategy

**Decision:** Use batch queries instead of per-user queries for Last Action feature

**Context:**
- Deanna requested "Last Action" column showing most recent activity date
- Need to query 5 collections (~29K total records) for 599 users
- Naive approach: 599 users × 5 collections = 2,995 queries

**Resolution:**
- Query each collection once (5 total queries)
- Build Map<userId, lastDate> in memory
- Merge maps to find max date per user
- Use Promise.all() for parallel execution

**Rationale:**
- 5 queries vs 2,995 queries = ~600x improvement
- Memory footprint acceptable (~29K records)
- Response time target: < 5 seconds

**Collections queried:**
| Collection | Records | Date Field | User Field |
|------------|---------|------------|------------|
| observations | 20,727 | end | teacher (/user/ID) |
| knowledgeChecks | 6,658 | timestamp | answeredBy |
| conferencePlans | 504 | dateCreated/Modified | teacher |
| actionPlans | 453 | dateCreated/Modified | teacher |
| emails | 441 | dateCreated/Modified | user, recipientId |

---

## 2026-01-27 - Program Field Legacy Format Support

**Decision:** Support multiple legacy formats for user program data

**Context:**
- Production has users with 3 different program field formats
- 98 users with valid program data, 501 without any program
- Some users have program NAME instead of ID in programs[] array

**Resolution:**
- Priority 1: `programs[]` array - check as ID first, then as name
- Priority 2: `programId` string (legacy)
- Priority 3: `program` field (could be ID or name)

**Rationale:**
- Backwards compatibility with legacy data
- No database migration required
- Handles all known data inconsistencies

---

## 2026-01-23 - Infrastructure Migration

**Decision:** Move Claude configuration files outside of CoachingApp codebase

**Context:**
- Previously, CLAUDE.md was inside CoachingApp/
- Tickets were in docs/tickets/
- Need consistent structure across projects

**Resolution:**
- Created `.claude/` for Claude-specific configurations
- Created `.chalk/` for project infrastructure (tickets, config, runbooks)
- Moved CLAUDE.md to project root
- Moved tickets to `.chalk/tickets/`

**Rationale:**
- Separates AI tooling configuration from application code
- Follows pattern established in other projects (flashhh)
- Makes it easier to manage project infrastructure independently

---

## 2026-01-22 - All Users Dashboard Complete

**Decision:** Descope edit dialogs and archive functionality to stay within budget

**Context:**
- 15h budget for All Users feature
- Core table functionality complete
- Additional features requested

**Resolution:**
- Implemented core table with search, filters, sorting, pagination
- Added edit and archive functionality after client feedback (PPT review)
- Changed export from Excel to CSV per client request

**Rationale:**
- Budget constraints require prioritization
- Core functionality delivers value
- Additional features can be quoted separately

---

## 2026-01-15 - Project Setup

**Decision:** Use existing codebase patterns

**Context:**
- Large existing codebase with established patterns
- React Class components with TypeScript
- Firebase singleton pattern

**Resolution:**
- Follow existing code style and patterns
- Use Firebase Context for data operations
- Use styled-components for styling

**Rationale:**
- Consistency with existing code
- Faster development
- Easier maintenance
---

## 2026-05-28 - CHALK 2.0 Firestore Rules Posture

**Decision:** Keep the existing auth-only wildcard during the v2 sprint and disclose it as retained legacy security debt.

**Context:**
- Current production rules allow any authenticated user to read/write any document through `match /{document=**}`.
- Adding narrower v2 path rules underneath the wildcard would not harden access because Firestore grants access if any matching rule allows it.
- Replacing the wildcard safely is a larger Phase 4 security task because legacy views still depend on broad access patterns.

**Resolution:**
- Treat new v2 draft/comment data as inheriting the legacy wildcard for this sprint.
- Do not claim document-level ownership protection until the wildcard is replaced or narrowed.
- Keep Phase 4 security hardening as the required path for real data isolation.

**Rationale:**
- Avoids a false sense of security from ineffective additive rules.
- Preserves legacy app behavior during the strangler-fig rollout.
- Makes the risk explicit for the external audit and production signoff.


---

## 2026-06-01 - CHALK 2.0 V2 Firestore Rules Posture

**Decision:** G2 supersedes the 2026-05-28 Posture A for V2 prod-readiness claims, but does not silently change production rules yet.

**Context:**
- The current `firestore.rules` file still has `match /{document=**}` with `allow read, write: if request.auth.uid != null`.
- Firestore rules are additive across matching rules; a narrower V2 deny rule cannot override that wildcard.
- Meaningful G2 denial tests for cross-user, cross-program, anonymous, and unsupported write paths cannot pass while the wildcard grants all authenticated writes.
- Replacing the wildcard safely is larger than a cosmetic V2 change because legacy CHALK still writes broadly across `users`, `actionPlans`, `observations`, `conferencePlans`, `emails`, `appointments`, `programs`, `sites`, and related subcollections.

**Resolution:**
- Treat the auth-only wildcard as active legacy security debt, not as acceptable V2 protection.
- Create an explicit V2 rules inventory before any new live V2 write is claimed production-ready.
- G2.3-G2.5 are blocked until a real emulator-backed denial harness exists and the wildcard is replaced or constrained for the relevant V2-managed fields/paths.
- Until that happens, V2 may remain behind authenticated staging and UI gates, but must not be described as production-ready for those write paths.

**Rationale:**
- Avoids false assurance from rules that cannot deny because the wildcard still allows.
- Preserves legacy app behavior until tests can prove a narrower ruleset does not break it.
- Makes the security posture auditable before implementation work resumes.
---

## 2026-06-01 - CHALK 2.0 Posture B User-Root Rule Hardening

**Decision:** Replace the auth-only write wildcard with a constrained fallback and protect root users/{uid} writes by owner/admin in the working V2 ruleset.

**Context:**
- G2.3 red test proved v2-unrelated-coach could write users/v2-coach.observationDraft under the auth-only wildcard.
- Firestore rule OR semantics mean no narrower deny can override a permissive recursive wildcard.
- The first production-relevant V2 write path is user-root observationDraft / v2TrainingStatus, so that path needs real ownership protection before G3 can build on it.

**Resolution:**
- Add rules_version = 2.
- Keep authenticated reads broad for legacy compatibility.
- Remove global authenticated writes from the recursive fallback.
- Allow root users/{userId} create/update/delete only for the owning user or admin.
- Preserve authenticated writes for known legacy top-level collections while G2.4/G2.5 expand coverage.
- G2.3 user-root denial smoke now passes in the Firestore emulator: anonymous denied, owner allowed, unrelated coach denied, teacher denied, admin allowed.

**Rationale:**
- This converts the previous documented risk into an executable rule boundary for the first V2-managed user field.
- It does not claim full production-ready security yet; G2.4/G2.5 still need action-plan/comment/training and unsupported-path denial coverage.
- Staging/prod deploy should wait for those compatibility checks unless explicitly accepted as a narrow security hardening deploy.

---

## 2026-06-01 - CHALK 2.0 Posture B Action-Plan Write Hardening

**Decision:** Constrain V2-relevant action plan comments and sent-to-teacher writes to assigned coach/admin participants in the working ruleset.

**Context:**
- G2.4 red test proved v2-unrelated-coach could create a comment on actionPlans/v2-same-program-plan under the retained actionPlans authenticated wildcard.
- V2 Plan Detail has two production-relevant write paths before full G3/G4 completion: comments and sent-to-teacher audit metadata.
- Teacher participants need visibility into comments, but V2 does not yet require teacher-originated comment writes.

**Resolution:**
- Replace the broad actionPlans recursive write rule with participant-aware helpers.
- Allow assigned coach/admin updates to approved action plan fields and sent-to-teacher metadata only when audit fields are present.
- Allow assigned coach/admin comment creation only with authorId matching request.auth.uid and a non-empty text payload.
- Allow teacher participants to read action plan comments.
- G2.4 action-plan smoke now passes in the Firestore emulator: assigned coach comment allowed, teacher read allowed, unrelated coach denied, malformed comment denied, assigned coach sent-state allowed, unrelated coach sent-state denied.

**Rationale:**
- This removes another permissive legacy write surface from the V2 production-readiness path without claiming full legacy security parity.
- G2.5 unsupported-path denial coverage remains pending before rules should be deployed as a full G2 completion.

---

## 2026-06-01 - CHALK 2.0 Posture B Unsupported Preview Write Gates

**Decision:** Keep unsupported V2 messaging/report writes fail-closed and restrict admin workspace program/site writes to admins in the working ruleset.

**Context:**
- G2.5 red test proved v2-coach could write programs/v2-preview-program under the legacy programs authenticated wildcard.
- V2 messaging, reports, and admin workspace are still preview/partial surfaces and must not create unsupported durable writes by accident.
- Unknown collections already fall through to the deny fallback, but programs/sites were explicit legacy allowlists.

**Resolution:**
- Keep unknown messages/reports writes denied by the recursive fallback.
- Change programs/{document=**} and sites/{document=**} from authenticated write to admin-only write, while retaining authenticated reads.
- G2.5 unsupported-path smoke now passes in the Firestore emulator: messages write denied, reports write denied, coach program write denied, coach site write denied.

**Rationale:**
- Preview UI can remain visible without silently opening new write paths to non-admin users.
- This completes the G2 rules foundation for the currently enabled V2 write surfaces, while broader legacy compatibility still needs review before any production rules deploy.

---

## 2026-06-01 - CHALK 2.0 Posture B User-Root Payload Shape Hardening

**Decision:** Limit owner updates on users/{uid} to V2-managed observationDraft and v2TrainingStatus fields with basic payload validation in the working ruleset.

**Context:**
- G2.3 ownership rules blocked cross-user writes, but an owning user could still write arbitrary root user fields.
- V2 only needs owner writes for observation drafts and training status during this phase.
- Admin override remains necessary for legacy/admin workflows while broader compatibility is audited.

**Resolution:**
- Add validObservationDraftValue() with required teacherUid, typeCode, storedType, notes, elapsedSeconds, and updatedAt fields.
- Add validOwnerUserUpdate() so owners can update only observationDraft and v2TrainingStatus.
- Keep admin override for root user updates.
- G2.3 payload-shape smoke now passes in the Firestore emulator: valid draft allowed, malformed draft denied, owner training status allowed, owner arbitrary role mutation denied, cross-user writes denied.

**Rationale:**
- This converts G2.3 from ownership-only to a minimal field-level contract for the V2-managed user fields.
- Full semantic validation of every nested training status key can be expanded later, but arbitrary root user mutation is no longer allowed for non-admin owners.
