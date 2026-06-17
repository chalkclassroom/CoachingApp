# CHALK 2.0 - V2 Rules Fixtures

> Fixture manifest for G2 allow/deny tests. These IDs are synthetic and must not be production user IDs.
>
> Last updated: 2026-06-01

---

## Auth Fixtures

| Fixture ID | Role | Program/site relationship | Purpose |
|---|---|---|---|
| coach | coach | program-alpha / site-north | Primary authorized coach for same-program writes |
| teacher | teacher | program-alpha / site-north | Teacher participant for same-program action plan visibility |
| admin | admin | global | Administrative override fixture where product accepts admin override |
| programLeader | programLeader | program-alpha | Program-level read/write fixture for later G5 parity tests |
| siteLeader | siteLeader | program-alpha / site-north | Site-level read/write fixture for later G5 parity tests |
| unrelatedCoach | coach | program-beta / site-south | No-happy cross-program denial fixture |
| anonymous | anonymous | none | No-auth denial fixture |

---

## Data Fixtures

| Fixture ID | Collection/path | Ownership | Purpose |
|---|---|---|---|
| sameProgramActionPlan | actionPlans/v2-same-program-plan | coach + teacher, program-alpha | Happy-path action plan update/comment/send tests |
| crossProgramActionPlan | actionPlans/v2-cross-program-plan | unrelatedCoach, program-beta | No-happy cross-program denial tests |
| coachUserDoc | users/v2-coach | coach | observationDraft and v2TrainingStatus happy path |
| unrelatedCoachUserDoc | users/v2-unrelated-coach | unrelatedCoach | other-user denial path |
| teacherUserDoc | users/v2-teacher | teacher | teacher participant visibility tests |
| sameProgramObservation | observations/v2-same-program-observation | coach + teacher | Later G3 observation finalization tests |

---

## Seed Script Requirement

A future G2.2 implementation should turn this manifest into a deterministic emulator seed script. Until then, these rows are the required source of truth for rule tests and Cypress role fixtures.
