# Implementation Tasks: Lead Editing

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Move Shadcn components (`dialog.tsx`, `sonner.tsx`, `label.tsx`, `textarea.tsx`) to `frontend/src/components/ui/` if they were created in a temporary or `@` alias directory.
- [X] T002 Add `<Toaster />` from `sonner` to `frontend/src/App.tsx` or `frontend/src/main.tsx` to enable global toast notifications.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Opening Edit Modal & Canceling (Priority: P1) 🎯 MVP

**Goal**: Users can open a pre-populated edit modal from the Lead Details pane and cancel without saving.

**Independent Test**: Click "Edit", verify fields are populated, click "Cancel", verify modal closes instantly.

### Implementation for User Story 1

- [X] T003 [US1] Create `frontend/src/components/views/EditLeadModal.tsx` scaffolding a Shadcn `Dialog` that receives `lead`, `isOpen`, and `onOpenChange` props.
- [X] T004 [US1] Inside `EditLeadModal.tsx`, build a form containing inputs for `firstName`, `lastName`, `phone`, `source`, `topic`, and `message`. Pre-populate them with the current `lead` prop values.
- [X] T005 [US1] In `frontend/src/components/views/LeadDetails.tsx`, import `EditLeadModal` and add an "Edit" button (using Lucide `Edit2` or similar icon) next to the Call/Email/Chat action buttons in the Contact Card Header.
- [X] T006 [US1] In `frontend/src/components/views/LeadDetails.tsx`, wire up the "Edit" button to toggle the `isOpen` state of the `EditLeadModal`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Saving Edits Successfully (Priority: P2)

**Goal**: Users can submit changes to the backend and see immediate UI updates with toast notifications.

**Independent Test**: Edit fields, save, verify toast appears, and UI (both details pane and master list) reflects the new data.

### Implementation for User Story 2

- [X] T007 [US2] In `frontend/src/components/views/EditLeadModal.tsx`, implement the `onSave` handler to collect form state and execute a `PATCH` request to `http://localhost:3000/leads/${lead.LeadID}`. Disable the button and show a loader while saving.
- [X] T008 [US2] In `frontend/src/components/views/EditLeadModal.tsx`, upon success, call `toast.success("Lead updated successfully")`, invoke `onSuccess(updatedFields)`, and close the modal.
- [X] T009 [US2] In `frontend/src/components/views/LeadDetails.tsx`, update the `onLeadUpdated` prop signature to accept `(id: string, updatedFields: any)`. Pass this handler to `EditLeadModal.onSuccess` and trigger `setRefreshCounter` to fetch fresh details and audit logs.
- [X] T010 [US2] In `frontend/src/components/views/MasterDetailView.tsx`, update the `onLeadUpdated` callback to merge the `updatedFields` (like `FirstName` and `LastName`) into the `leads` array state so the left sidebar reflects changes instantly.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T011 Run `quickstart.md` validation to ensure end-to-end functionality (modal opens, updates data, closes, refreshes view, and audit trail updates).
- [X] T012 Code cleanup: remove any unused imports in `LeadDetails.tsx` and `MasterDetailView.tsx`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: N/A for this feature
- **User Stories (Phase 3+)**: All depend on Phase 1 completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Setup (Phase 1)
- **User Story 2 (P2)**: Must start after User Story 1 is completed (relies on the modal scaffolding)

### Parallel Opportunities

- T001 and T002 can be executed in parallel.
- Modifying `MasterDetailView.tsx` (T010) can happen in parallel with building `EditLeadModal.tsx` API logic (T007).

---

## Parallel Example: User Story 2

```bash
# Work on API integration in the modal while simultaneously updating parent component state
Task: "In frontend/src/components/views/EditLeadModal.tsx, implement the onSave handler..."
Task: "In frontend/src/components/views/MasterDetailView.tsx, update the onLeadUpdated callback..."
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 3: User Story 1 (Modal scaffolding)
3. **STOP and VALIDATE**: Test opening the modal and verifying fields are pre-populated.

### Incremental Delivery

1. Complete Setup
2. Add User Story 1 → Test modal opening/closing (MVP!)
3. Add User Story 2 → Test API integration and state syncing → Deploy/Demo
