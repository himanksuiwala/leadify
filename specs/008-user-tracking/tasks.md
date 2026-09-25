# Implementation Tasks: User Tracking & Audit Consistency

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

*(No pure setup tasks required for this feature, jumping to Foundational DB changes)*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T001 Update `backend/src/seed.ts` to create the `"User"` table with `UserID` (UUID), `FirstName`, `LastName`, and `Email`.
- [X] T002 Update `backend/src/seed.ts` to alter `Lead` table to include `"AssignedTo" UUID REFERENCES "User"("UserID") ON DELETE SET NULL`.
- [X] T003 Update `backend/src/seed.ts` to alter `Audit` table: replace `"Actor" TEXT` with `"ActorID" UUID REFERENCES "User"("UserID") ON DELETE SET NULL`.
- [X] T004 Update `backend/src/seed.ts` data injection logic: Insert "Aman Rawat" and "System Webhook" into the User table. Map CSV fields "Sales Agent" to Aman's UUID, and "Meta Webhook" to System's UUID when inserting audits.

**Checkpoint**: Foundation ready - DB contains the User table and referential integrity is established.

---

## Phase 3: User Story 1 - Manual Status Update (Priority: P1) 🎯 MVP

**Goal**: Manual lead updates fetch a real user UUID and save it to the Audit log, which the UI renders as the human name.

**Independent Test**: Update a lead status in UI, verify DB Audit contains a valid `ActorID`, verify UI timeline renders "Aman Rawat".

### Implementation for User Story 1

- [X] T005 [US1] Update `backend/src/services/lead.ts`: `getLeadDetails` must execute a `JOIN "User" ON "Audit"."ActorID" = "User"."UserID"` so the returned Audit array includes `{ FirstName, LastName }` of the user.
- [X] T006 [US1] Update `backend/src/services/lead.ts`: `updateLeadStatus` and `updateLeadDetails` must accept `actorId` (UUID) instead of `actor` (string) and execute the `INSERT INTO "Audit"` with the UUID.
- [X] T007 [US1] Update `backend/src/routes/leads.ts`: Instead of hardcoding `'Sales Agent'`, run a quick query to fetch "Aman Rawat"'s UUID from the DB and pass it to the service functions.
- [X] T008 [US1] Update `frontend/src/components/views/LeadDetails.tsx`: Adjust the activity timeline rendering to read `audit.User.FirstName` + `audit.User.LastName` instead of `audit.Actor`. (Handle potential nulls safely).

**Checkpoint**: At this point, manual updates correctly trace to a User and the UI reflects this.

---

## Phase 4: User Story 2 - Webhook Ingestion (Priority: P2)

**Goal**: Webhook payloads are assigned to the generic "System Webhook" user and use standardized comments.

**Independent Test**: Hit the webhook endpoint, verify DB Audit contains System's `ActorID` and the generic comment.

### Implementation for User Story 2

- [X] T009 [US2] Update `backend/src/services/lead.ts`: `createLeadWithAudit` must accept `actorId` (UUID) instead of `actor` (string). Standardize the comment strictly to `'Lead created via webhook'`.
- [X] T010 [US2] Update `backend/src/routes/webhook.ts`: Fetch the "System Webhook" user's UUID from the DB and pass it to `createLeadWithAudit` instead of passing the string `'Meta Webhook'`.

**Checkpoint**: At this point, all automated logs trace correctly to the generic System user.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T011 Run quickstart.md validation (re-seed DB, test manual flow, test webhook flow).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)**: MUST complete first (T001-T004). Without DB changes, backend queries will fail.
- **User Stories (Phase 3+)**: Depend on Foundational. US1 and US2 can be executed in parallel since they touch different routes.
- **Polish**: Depends on all stories.

### Parallel Opportunities

- T005 (Lead reading) and T006 (Lead writing) can be worked on simultaneously.
- T008 (Frontend) can be done anytime after T005 is defined.
