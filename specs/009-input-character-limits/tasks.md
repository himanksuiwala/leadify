# Tasks: Input Character Limits

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

*(No general setup tasks needed for this feature)*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T001 Update database schema in `backend/src/seed.ts` to convert `TEXT` to `VARCHAR(n)` for First/Last Name (30), Email (100), Phone (15), Source (30), Topic (50), and Message (500).

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Submitting a New Lead (Priority: P1) 🎯 MVP

**Goal**: Enforce character limits when creating a new lead via the mock webhook simulator so that oversized payloads are rejected and the UI prevents long input.

**Independent Test**: Try typing >30 chars in First Name in the Mock Webhook UI and try cURLing the meta-webhook endpoint with a 501-char message.

### Implementation for User Story 1

- [x] T002 [P] [US1] Update validation schema `WebhookLeadSchema` in `backend/src/validators/lead.ts` to enforce max lengths (FirstName/LastName: 30, Email: 100, Phone: 15, Source: 30, Topic: 50, Message: 500).
- [x] T003 [P] [US1] Update `frontend/src/components/views/MockWebhookView.tsx` to add standard HTML `maxLength` attributes to all form inputs/textareas corresponding to the defined limits.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Editing an Existing Lead (Priority: P2)

**Goal**: Enforce character limits when updating a lead in the main app interface.

**Independent Test**: Open the Edit Lead modal, attempt to type past the limit in any field, and it should block input. Sending an API patch with excessive chars should return 400.

### Implementation for User Story 2

- [x] T004 [P] [US2] Update validation schema `UpdateLeadSchema` in `backend/src/validators/lead.ts` to enforce max lengths (FirstName/LastName: 30, Phone: 15, Source: 30, Topic: 50, Message: 500).
- [x] T005 [P] [US2] Update `frontend/src/components/views/EditLeadModal.tsx` to add `maxLength` attributes to all relevant form inputs matching the backend bounds.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Viewing Long Text in the UI (Priority: P3)

**Goal**: Gracefully render maximum-length strings in the UI by truncating them and showing tooltips on hover to prevent layout breakage.

**Independent Test**: Load the lead list and lead details pages with a lead containing exactly 500 chars in message; verify layout is clean and hover reveals the full text.

### Implementation for User Story 3

- [x] T006 [P] [US3] Update `frontend/src/components/views/LeadDetails.tsx` to wrap long text areas (like Topic and Message) with a truncation class (`truncate`) and the Shadcn `Tooltip` component.
- [x] T007 [P] [US3] Update `frontend/src/components/views/LeadList.tsx` to wrap table cells with long text using a truncation class and the Shadcn `Tooltip` component where applicable.

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T008 Run `quickstart.md` validation (re-seed DB, test mock webhook frontend, test direct curl, test UI hover tooltips).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2).
- **User Story 2 (P2)**: Can start after Foundational (Phase 2).
- **User Story 3 (P3)**: Can start after Foundational (Phase 2).

### Parallel Opportunities

- All backend validation updates (T002, T004) can be done in parallel.
- All frontend UI updates (T003, T005, T006, T007) can be done in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational DB Schema Update
2. Complete Phase 3: User Story 1 (Webhook form + validation)
3. **STOP and VALIDATE**: Test User Story 1 independently

### Incremental Delivery

1. Foundation ready (DB Schema)
2. Add User Story 1 → Test Mock Webhook Simulator independence
3. Add User Story 2 → Test Edit Lead independence
4. Add User Story 3 → Test UI truncation/tooltips independence
5. Polish (Quickstart Validation)
