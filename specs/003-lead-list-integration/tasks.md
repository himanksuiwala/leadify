# Implementation Tasks: Lead List Integration

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and adding necessary dependencies

- [x] T001 Install `date-fns` in `frontend/`
- [x] T002 Add Shadcn UI `badge` and `select` components in `frontend/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure (Backend updates) that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Update `PaginationQuerySchema` in `backend/src/validators/query.ts` to accept optional `status` and `sort` fields.
- [x] T004 Update `getLeads` function in `backend/src/services/lead.ts` to dynamically append `WHERE` (for status) and `ORDER BY` (for sort) clauses using safe enum mapping.

**Checkpoint**: Foundation ready - backend can now process advanced queries.

---

## Phase 3: User Story 1 - View Paginated Lead List (Priority: P1) 🎯 MVP

**Goal**: Display a list of leads with primary and secondary details.

**Independent Test**: Load the application. The lead list panel should fetch page 1 and display leads with Full Name, Topic, Status Badge, Timestamp, Source, and truncated Message.

### Implementation for User Story 1

- [x] T005 [US1] Rename `LeadListPlaceholder.tsx` to `LeadList.tsx` and define `Lead` TypeScript interface mapping to the backend payload.
- [x] T006 [US1] Update `LeadList.tsx` UI to map over `leads` array prop, rendering the required fields with `date-fns` `formatDistanceToNow` and Shadcn `Badge`.
- [x] T007 [US1] Update `MasterDetailView.tsx` to fetch the first page of leads on mount using native `fetch` and pass the data to `LeadList`.

**Checkpoint**: At this point, User Story 1 should be fully functional (page 1 loads and renders correctly).

---

## Phase 4: User Story 2 - Infinite Scroll (Priority: P1)

**Goal**: Lazily load more leads as the user scrolls down the list.

**Independent Test**: Scroll to the bottom of the lead list. The application should fetch and append the next page of leads.

### Implementation for User Story 2

- [x] T008 [US2] Update `MasterDetailView.tsx` to track `page`, `hasMore`, and `isLoading` state, and append new results to the existing `leads` array.
- [x] T009 [US2] Update `LeadList.tsx` to attach an `onScroll` event listener to its scrolling container that triggers a `onLoadMore` callback when reaching the bottom threshold.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Sort Leads (Priority: P2)

**Goal**: Sort the lead list by various criteria (Date/Time, Name, Status Priority).

**Independent Test**: Select a sorting option from a dropdown. The list should refresh and display the leads in the requested order.

### Implementation for User Story 3

- [x] T010 [US3] Add `sortOrder` state in `MasterDetailView.tsx` and implement logic to reset `page` to 1 and clear `leads` when `sortOrder` changes.
- [x] T011 [US3] Create a `SortDropdown` UI component within `LeadList.tsx` using Shadcn `Select` to let users choose between "Newest", "Oldest", "Name (A-Z)", and "Status".

**Checkpoint**: All user stories up to US3 should now be independently functional.

---

## Phase 6: User Story 4 - Filter by Status (Priority: P2)

**Goal**: Filter the lead list by clicking status chips.

**Independent Test**: Click a status filter chip. The list should refresh to show only leads matching that status.

### Implementation for User Story 4

- [x] T012 [US4] Add `statusFilter` state in `MasterDetailView.tsx` and implement logic to reset `page` to 1 and clear `leads` when `statusFilter` changes.
- [x] T013 [US4] Add status filter chips UI (e.g., small buttons for 'All', 'New', 'Contacted', 'Qualified', 'Lost') at the top of `LeadList.tsx`.

**Checkpoint**: All user stories should now be independently functional.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T014 Clean up unused imports and verify strict typing across the frontend React components.
- [x] T015 Run quickstart.md validation.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion

### Parallel Opportunities

- T003 and T004 (Backend updates) can run in parallel with Setup phase tasks.
- Frontend UI components (`LeadList.tsx` mapping) can be structured in parallel with the data fetching logic in `MasterDetailView.tsx`.
