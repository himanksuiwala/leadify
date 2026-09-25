# Implementation Tasks: Lead Intake API

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Update `backend/package.json` to install `zod`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Update `backend/src/seed.ts` to execute `CREATE TYPE lead_status AS ENUM ('New', 'Qualified', 'Converted', 'Dead')` and `CREATE TYPE audit_action AS ENUM ('Created', 'Updated', 'Status Changed')` before creating tables.
- [x] T003 Update `backend/src/seed.ts` to alter `Customer`, `Lead`, and `Audit` table definitions to use these new ENUMs and constraints exactly as defined in data-model.md.
- [x] T004 Create standard validation middleware in `backend/src/middleware/validate.ts` that catches Zod errors and returns 400 Bad Request.
- [x] T005 [P] Create standard `{ data, meta }` response formatter wrapper in `backend/src/utils/response.ts`.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Webhook Lead Ingestion (Priority: P1) 🎯 MVP

**Goal**: As a webhook publisher, I want to send a lead payload to the system so that new leads are automatically ingested and tracked.

**Independent Test**: Can be tested by sending a POST request to `/webhook/meta-lead` with a valid JSON payload and verifying that a customer, a lead, and an audit record are created in the database.

### Implementation for User Story 1

- [x] T006 [P] [US1] Create validation schema for Webhook payload in `backend/src/validators/lead.ts`.
- [x] T007 [US1] Implement Customer matching/creation service logic in `backend/src/services/customer.ts`.
- [x] T008 [US1] Implement transaction logic in `backend/src/services/lead.ts` to create Lead and Audit record atomically.
- [x] T009 [US1] Create `backend/src/routes/webhook.ts` and implement `POST /webhook/meta-lead`.
- [x] T010 [US1] Register the webhook router in `backend/src/index.ts`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Retrieve Lead Directory (Priority: P2)

**Goal**: As a sales agent, I want to view a list of leads so that I can see who to contact next.

**Independent Test**: Can be tested by hitting `GET /leads` and ensuring the response conforms to the standard envelope format (`{ data: [], meta: {} }`) containing joined customer details.

### Implementation for User Story 2

- [x] T011 [P] [US2] Create validation schema for pagination query params in `backend/src/validators/query.ts`.
- [x] T012 [US2] Implement paginated lead list database query joining Customer data in `backend/src/services/lead.ts`.
- [x] T013 [US2] Create `backend/src/routes/leads.ts` and implement `GET /leads`.
- [x] T014 [US2] Register the leads router in `backend/src/index.ts`.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - View Lead Details (Priority: P2)

**Goal**: As a sales agent, I want to view the full details of a specific lead, including their activity timeline, so that I have context before contacting them.

**Independent Test**: Can be tested by fetching `GET /leads/:id` and verifying it returns the Lead, Customer profile, and Audit records.

### Implementation for User Story 3

- [x] T015 [US3] Implement full lead details database query joining Customer and Audit data in `backend/src/services/lead.ts`.
- [x] T016 [US3] Implement `GET /leads/:id` endpoint in `backend/src/routes/leads.ts`.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Update Lead Status (Priority: P3)

**Goal**: As a sales agent, I want to update a lead's status so that the pipeline reflects reality.

**Independent Test**: Can be tested by sending a PATCH to `/leads/:id/status`, checking the response, and verifying an audit record was created in the database.

### Implementation for User Story 4

- [x] T017 [P] [US4] Create validation schema for status update in `backend/src/validators/lead.ts` using the ENUM.
- [x] T018 [US4] Implement transactional status update and "Status Changed" audit creation in `backend/src/services/lead.ts`.
- [x] T019 [US4] Implement `PATCH /leads/:id/status` endpoint in `backend/src/routes/leads.ts`.

---

## Phase 7: User Story 5 - Edit Lead Details (Priority: P3)

**Goal**: As a sales agent, I want to correct or update a lead's information so that records remain accurate.

**Independent Test**: Can be tested by sending a PATCH to `/leads/:id` with partial updates.

### Implementation for User Story 5

- [x] T020 [P] [US5] Create partial validation schema for lead updates in `backend/src/validators/lead.ts`.
- [x] T021 [US5] Implement transactional lead details update and "Lead Updated" audit creation in `backend/src/services/lead.ts`.
- [x] T022 [US5] Implement `PATCH /leads/:id` endpoint in `backend/src/routes/leads.ts`.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T023 Rebuild Docker container and run quickstart validation to verify e2e flow.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed sequentially in priority order (P1 → P2 → P3)

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)
- **User Story 3 (P2)**: Depends on US2 routing setup.
- **User Story 4 (P3)**: Depends on US2/US3.
- **User Story 5 (P3)**: Depends on US2/US3.

### Parallel Opportunities

- Zod schemas in Phase 3, 4, 6, 7 can be written in parallel.
- Middleware and Response utilities in Phase 2 can be written in parallel with DB updates.
