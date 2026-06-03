# CHALK 2.0 — Quick Index

Start here. Use the file paths to dive into the actual content.

## ⚠️ Note for any auditor / reviewer (revised 2026-05-20)

**Current engagement state:** paid fixed-price proposal at **$20,000** with
**flexible payment timing** (no upfront, "pay when CHALK is ready"). An
earlier internal draft framed this as a gift; that has been reverted.

Pricing IS in scope for the audit. Focus on: technical strategy, risks
(including those introduced by flexible payment terms), implementation
quality, pricing appropriateness, and ethical/communication questions.

## For an external auditor (entry point)

→ **`.chalk/CHALK-2-AUDIT-PACKAGE.md`** — self-contained audit document
  with reasoning, risks, open questions, and a checklist. Read this first.
  Section §0 explains the current audit scope.

## Client-facing documents (what Deanna gets)

| File | What it is |
|---|---|
| `docs/CHALK-2.0-Proposal.pdf` | The formal offer |
| `docs/CHALK-2.0-Mockup.zip` | Downloadable interactive prototype (unzip and open `index.html`) |
| `https://chalk-dev-c6a5d.web.app/v2/home` | Live preview on staging |

## Source for the client docs (edit-then-regenerate)

| File | Generates |
|---|---|
| `docs/chalk-2-proposal.html` | The PDF (via Chrome headless `--print-to-pdf`) |
| `docs/chalk-2-app-mockup.html` | The mockup zip's `index.html` |
| `docs/chalk-2-demo.html` | The mockup zip's `walkthrough.html` |

## Internal documents

| File | Purpose |
|---|---|
| `.chalk/CHALK-2-AUDIT-PACKAGE.md` | **This is the deep-dive document.** Technical strategy, risks, implementation state, open questions. |
| `.chalk/CHALK-2-RENOVATION-PLAN.md` | The 13-section internal engineering plan (predates the $15K offer; documents the original phased thinking) |
| `.chalk/CHALK-2-SPRINT-PLAN.md` | **Days 3–10 task-by-task plan in Given-When-Then format.** 38 tasks, 97h estimate against 64h remaining capacity (+33h / ~+52%), dependencies DAG, scope risks, 3 execution paths (A: cut 33h, B: extend timeline, C: cut 25h + 1 day to 72h remaining / ~88h total). Written for cross-LLM audit; revised after first audit pass exposed math errors and integration risks. |
| `.chalk/CHALK-2-PROD-READY-GWT-PLAN.md` | **Post-staging prod-readiness backlog in Given-When-Then format.** Covers remaining P0/P1/P2 work after V2 staging deploy: release gates, Firestore rules, observation/action-plan pipeline integrity, live messaging/admin/reports/resources, route parity, QA, accessibility, release runbooks, sizing, dependency DAG, quantified scope cuts, stubs disclosure, and monitoring/source-map requirements. |
| `.chalk/CHALK-2-GOALS-TDD-AUDIT-PLAN.md` | **Execution plan for attacking prod-ready gaps as auditable goals.** Breaks the backlog into six goals with TDD red/green rules, happy/no-happy specs, test layers, dependencies, estimates, rules-posture reconciliation, fixture setup, release guardrails, and a goal-level audit checklist. |
| `.chalk/CHALK-2-ARCHITECTURE-DOC-PLAN.md` | **TDD-style plan for documenting the architecture that emerged through the V2 sprint.** Six goals (A1-A6) covering C4 L1+L2 overview + ADR foundation (required), C4 L3 component detail + sequence flows (recommended), capability rename refactor (optional), and Hexagonal/Clean formalization (out of scope for CHALK 2.0, reserved for a potential CHALK 3.0 greenfield). 30 tasks with Given/When/Then, Red specs, doc-lint runners, and a per-goal handoff template. Includes tooling baseline (Mermaid + Node lint scripts), forbidden-tools list, and an auditor checklist. |
| `.chalk/CHALK-2-STUBS-DISCLOSURE.md` | **Central preview/stub disclosure.** Lists current V2 fallback/static/local data paths and their fix/delegation paths before client signoff. |
| `.chalk/CHALK-2-STAGING-REVIEW-GUIDE.md` | **Authenticated staging review guide.** Route-by-route status matrix for V2, including live-ish, partial, preview-only, and delegated areas. |
| `.chalk/CHALK-2-GOAL-1-RESPONSIVE-A11Y-SMOKE.md` | **Goal 1 responsive/a11y smoke artifact.** Documents automated anonymous viewport coverage and the authenticated manual checklist. |
| `.chalk/CHALK-2-GOAL-1-HANDOFF.md` | **Goal 1 execution handoff.** Captures red/green evidence, commit, push target, covered paths, and remaining risks. |
| `.chalk/CHALK-2-V2-RULES-INVENTORY.md` | **G2 rules inventory.** Maps every V2 API write to Firestore paths, roles, denied roles, fixtures, release status, and planned tests. |
| `.chalk/CHALK-2-V2-RULES-FIXTURES.md` | **G2 rules fixture manifest.** Synthetic users/resources required for allow/deny and role tests. |
| `.chalk/CHALK-2-GOAL-2-HANDOFF.md` | **Goal 2 foundation handoff.** Captures G2.1/G2.2 red/green evidence and explicitly blocks G2.3-G2.5 until wildcard hardening. |
| `.chalk/CHALK-2-STAGING-DEPLOY-2026-06-01.md` | **Staging deploy handoff.** Records deployed commit, checks, Firebase target, and V1 rollback commands. |
| `.chalk/CHALK-2-INDEX.md` | (This document) |
| `.chalk/TICKETS.md` | Full client work history |
| `.chalk/decision-log.md` | Architecture decision records |

## Background (why this engagement exists)

| File | Why it matters |
|---|---|
| `docs/United Way Feedback - April 2026.md` | The customer feedback that triggered this proposal |
| `docs/SECURITY-AUDIT-2026-05.md` | Separate dependency audit; informs Phase 4 (deferred from current offer) |

## Code in progress

| Path | Status |
|---|---|
| Branch `feature/chalk-2.0-renovation` | Not merged to client repo. Current V2 work is committed on the fork branch and deployed to authenticated staging. |
| `CoachingApp/src/v2/` | All v2 code lives here. Isolated. |
| `CoachingApp/src/App.tsx` | 2-line addition mounts `/v2/*` route |

## Regeneration commands

```bash
# Regenerate proposal PDF after editing the HTML source
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=docs/CHALK-2.0-Proposal.pdf \
  file://$(pwd)/docs/chalk-2-proposal.html

# Regenerate the mockup zip after editing the HTML sources
mkdir -p /tmp/CHALK-2.0-Mockup
cp docs/chalk-2-app-mockup.html /tmp/CHALK-2.0-Mockup/index.html
cp docs/chalk-2-demo.html /tmp/CHALK-2.0-Mockup/walkthrough.html
# (README.txt is preserved if it already exists in /tmp)
cd /tmp && zip -r $OLDPWD/docs/CHALK-2.0-Mockup.zip CHALK-2.0-Mockup/ -x "*.DS_Store"

# Build and deploy the v2 preview to staging, only after approval
cd CoachingApp
npm run staging
./node_modules/.bin/firebase deploy -P staging --only firestore:rules,hosting

# Staging rollback from the known-good production tag, only after approval
git fetch --tags fork
git switch --detach prod-current-2026-05-29
npm run staging
./node_modules/.bin/firebase deploy -P staging --only firestore:rules,hosting
git switch feature/chalk-2.0-renovation
```

---

Last updated: 2026-06-03
