# Implementation Tasks: Lead Transitions and Audit Trail

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install Shadcn UI `dropdown-menu` component in `frontend/`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

*(No backend tasks required; the `PATCH` endpoint and `Audits` array already exist).*

**Checkpoint**: Foundation ready - user story implementation can begin.

---

## Phase 3: User Story 1 - Updating Lead Status (Priority: P1) 🎯 MVP

**Goal**: Allow users to transition the lead's status via a dropdown and persist it via the API.

**Independent Test**: Click the status badge, see the dropdown, select a valid option, and observe the status update.

### Implementation for User Story 1

- [x] T002 [US1] In `frontend/src/components/views/LeadDetails.tsx`, import `DropdownMenu` components and replace the static `Badge` with an interactive dropdown trigger (styled similarly to the badge).
- [x] T003 [US1] In `frontend/src/components/views/LeadDetails.tsx`, implement a helper function to compute `allowedTransitions` based on the current status (`New` -> `Qualified`|`Dead`, `Qualified` -> `Converted`|`Dead`, else `[]`).
- [x] T004 [US1] In `frontend/src/components/views/LeadDetails.tsx`, implement `handleStatusChange(newStatus)` which sends a `PATCH` to `http://localhost:3000/leads/${lead.LeadID}/status`. It should set an `isUpdating` state, and upon success, re-fetch the lead details.

**Checkpoint**: Users can successfully transition a lead's status, and the backend persists it.

---

## Phase 4: User Story 2 - Terminal States (Priority: P2)

**Goal**: Prevent interactions on leads that have reached a terminal state.

**Independent Test**: Viewing a "Converted" or "Dead" lead should show a static badge with no dropdown.

### Implementation for User Story 2

- [x] T005 [US2] In `frontend/src/components/views/LeadDetails.tsx`, conditionally render the interactive `DropdownMenu` only if `allowedTransitions.length > 0`. Otherwise, render a static `Badge`.

**Checkpoint**: Invalid transitions are blocked by the UI.

---

## Phase 5: User Story 3 - Viewing the Audit Trail (Priority: P3)

**Goal**: Display a chronological timeline of all actions performed on the lead.

**Independent Test**: Scroll to the bottom of the details pane and see the "Activity Timeline".

### Implementation for User Story 3

- [x] T006 [US3] In `frontend/src/components/views/LeadDetails.tsx`, extend the `DetailedLead` interface to include `Audits: AuditEvent[]`.
- [x] T007 [US3] In `frontend/src/components/views/LeadDetails.tsx`, add an "Activity Timeline" section at the bottom. Map over `lead.Audits` (sorted chronologically if necessary) to render a vertical timeline showing the `Action`, `Actor`, and `Timestamp` for each event.

**Checkpoint**: All user stories are independently functional.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T008 Code cleanup (remove unused imports).
- [x] T009 Run quickstart.md validation.

---

## Dependencies & Execution Order
- **Setup** must complete first.
- **US1**, **US2**, and **US3** all modify `LeadDetails.tsx`, so tasks T002 through T007 must be executed sequentially to avoid file conflicts.
