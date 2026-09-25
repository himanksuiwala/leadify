# Implementation Tasks: Mock Webhook Simulator

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Ensure `card` Shadcn component exists in `frontend/src/components/ui/` (install if missing).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Navigation to Simulator (Priority: P1) 🎯 MVP

**Goal**: Users can access the simulator via a dedicated route and header button.

**Independent Test**: Click "Mock Webhook" in header, verify it opens a new tab at `/mock-webhook` showing a placeholder view.

### Implementation for User Story 1

- [X] T002 [US1] Create `frontend/src/components/views/MockWebhookView.tsx` returning a basic layout with an informational card explaining the page's purpose.
- [X] T003 [US1] In `frontend/src/App.tsx`, add a new `<Route path="/mock-webhook" element={<MockWebhookView />} />`.
- [X] T004 [US1] In `frontend/src/components/layout/AppNavbar.tsx`, add a "Mock Webhook" button (using an `<a>` tag with `target="_blank"` styled via Shadcn button variants) alongside an `ArrowUpRight` icon.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Stories 2 & 3 - Simulator Form & Validation (Priority: P2)

**Goal**: Users can submit test payloads with strict validation that prevents backend errors.

**Independent Test**: Submit empty form (fails in UI). Fill form, submit, verify success toast and form reset.

### Implementation for User Story 2 & 3

- [X] T005 [US2] In `frontend/src/components/views/MockWebhookView.tsx`, build the form with Shadcn components (Input, Textarea, Button). Bind HTML `required` attributes to First Name, Last Name, Email, Topic, and Message to enforce validation before submission.
- [X] T006 [US2] Implement the form submission handler to POST to `http://localhost:3000/webhook/meta-lead`. Hardcode `"source": "Meta Ads"`. Handle success (toast & reset) and error (toast).

**Checkpoint**: The simulator should fully work and inject leads into the DB.

---

## Phase 5: User Story 4 - Refreshing the Dashboard (Priority: P3)

**Goal**: Users can quickly pull new leads into the Master List without reloading the whole page.

**Independent Test**: Click the new Refresh button on the list and observe the network request.

### Implementation for User Story 4

- [X] T007 [US4] In `frontend/src/components/views/LeadList.tsx`, add a small icon-only `<Button variant="outline">` with a `RefreshCw` icon next to the "Filter by Status" select dropdown.
- [X] T008 [US4] Wire the refresh button to trigger `fetchLeads()` (by incrementing `refreshCounter` if one exists, or by adding one to the dependency array).

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T009 Run `quickstart.md` validation.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Stories (Phase 3+)**: Depend on Setup completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### Parallel Opportunities

- T007/T008 (Lead List refresh) can be worked on entirely in parallel with the Mock Webhook page creation.

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and 3 to establish routing.
2. Complete Phase 4 to make the mock fully functional.
3. Complete Phase 5 to tie the workflow together.
