# Implementation Tasks: Lead Details View

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependencies.

- [x] T001 Install Shadcn UI `button` component in `frontend/`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure.

*(No backend tasks required; `GET /leads/:id` already provides the necessary data).*

**Checkpoint**: Foundation ready - UI implementation can begin.

---

## Phase 3: User Story 1 - Viewing a Selected Lead (Priority: P1) 🎯 MVP

**Goal**: Display comprehensive information for a selected lead, including a sticky contact card and message block.

**Independent Test**: Click a lead in the list. The details pane should load the data from `/leads/:id` and display the Name, Status, Topic, Email, Phone, Message, Source, and Timestamp.

### Implementation for User Story 1

- [x] T002 [US1] Rename `LeadDetailsPlaceholder.tsx` to `LeadDetails.tsx` and define the `DetailedLead` TypeScript interface.
- [x] T003 [US1] Add a `useEffect` hook in `LeadDetails.tsx` to fetch `http://localhost:3000/leads/${selectedItemId}` and store `leadData`, handling loading and error states.
- [x] T004 [US1] Build the UI layout in `LeadDetails.tsx`: implement a `sticky top-0 z-10 bg-white` contact card header containing Name, Status Badge, Topic, Email, Phone, and the three dummy action buttons (Call, Email, Chat) using Lucide icons.
- [x] T005 [US1] Add the Message card and secondary info (Source, Timestamp) beneath the contact card in `LeadDetails.tsx`.
- [x] T006 [US1] Update `MasterDetailView.tsx` to import the new `LeadDetails` component instead of the placeholder.

**Checkpoint**: At this point, clicking a lead displays their full details successfully.

---

## Phase 4: User Story 2 - Maintaining Context on Scroll (Priority: P2)

**Goal**: Keep contact actions visible when reading long messages.

**Independent Test**: Scroll down a long lead message. The contact card remains pinned to the top.

### Implementation for User Story 2

- [x] T007 [US2] Ensure the parent container of `LeadDetails.tsx` has `relative` positioning and `overflow-y-auto` so the sticky header behaves correctly within the detail pane.

**Checkpoint**: Both user stories are fully functional.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Quality assurance.

- [x] T008 Clean up unused imports, dummy text, and old placeholders.
- [x] T009 Run quickstart.md validation to ensure everything works end-to-end.

---

## Dependencies & Execution Order

- **Phase 1** must happen first (installing Button).
- **Phase 3** (US1) depends on Phase 1. Tasks T002 through T006 should be done sequentially.
- **Phase 4** (US2) is essentially CSS layout validation following US1.
