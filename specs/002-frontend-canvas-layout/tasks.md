# Implementation Tasks: Frontend Canvas Layout

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Tailwind CSS and PostCSS in `frontend/`
- [x] T002 Initialize Shadcn UI CLI with React configuration in `frontend/`
- [x] T003 Create directory structure in `frontend/src/` for `components/ui`, `components/layout`, and `components/views`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Install Shadcn UI `sidebar` component (and its dependencies like `button`, `sheet`, `tooltip`)
- [x] T005 [P] Create `LeadListPlaceholder` component in `frontend/src/components/views/LeadListPlaceholder.tsx`
- [x] T006 [P] Create `LeadDetailsPlaceholder` component in `frontend/src/components/views/LeadDetailsPlaceholder.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Desktop Shell Layout (Priority: P1) 🎯 MVP

**Goal**: As a desktop user, I want to see a full-screen application shell with a persistent sidebar, top navigation bar, and split content area.

**Independent Test**: Load the app on a desktop viewport. The sidebar should be expanded on the left, the navbar on top right, and the content split between Lead List (left) and Lead Details (right) with placeholders.

### Implementation for User Story 1

- [x] T007 [US1] Create `AppSidebar` component using Shadcn Sidebar primitives in `frontend/src/components/layout/AppSidebar.tsx` (must include "Leads/Home" menu item and Lucide icon)
- [x] T008 [US1] Create `AppNavbar` component in `frontend/src/components/layout/AppNavbar.tsx` (must include a SidebarTrigger and placeholder title)
- [x] T009 [US1] Create `MasterDetailView` component for desktop in `frontend/src/components/views/MasterDetailView.tsx` (renders list and details side-by-side using grid/flex)
- [x] T010 [US1] Create `AppShell` component integrating SidebarProvider, AppSidebar, AppNavbar, and MasterDetailView in `frontend/src/components/layout/AppShell.tsx`
- [x] T011 [US1] Update `frontend/src/App.tsx` and `frontend/src/index.css` to render the `AppShell` full screen

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently on desktop

---

## Phase 4: User Story 2 - Mobile Responsive Layout (Priority: P1)

**Goal**: As a mobile user, I want the application layout to automatically adapt to my screen size so that it remains usable.

**Independent Test**: Load the app on a mobile viewport. The sidebar should be collapsed to a hamburger menu. The main content should only show the Lead List. Tapping a lead hides the list and shows the Lead Details with a back button.

### Implementation for User Story 2

- [x] T012 [US2] Update `MasterDetailView.tsx` to include UI state tracking (`selectedItemId` and mobile detection)
- [x] T013 [US2] Update `MasterDetailView.tsx` to implement conditional rendering for mobile (show only Lead List if no item is selected, show only Lead Details if selected)
- [x] T014 [US2] Add mock interaction to `LeadListPlaceholder.tsx` to simulate selecting an item (passes an ID up to MasterDetailView)
- [x] T015 [US2] Add a "Back" button to `LeadDetailsPlaceholder.tsx` that clears the `selectedItemId` when clicked in mobile view

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently across desktop and mobile

---

## Phase 5: User Story 3 - Visual Design System Integration (Priority: P2)

**Goal**: Ensure a consistent, modern visual aesthetic applied to the application shell.

**Independent Test**: Inspect the layout to verify the usage of a coherent design system for typography, colors, and layout spacing.

### Implementation for User Story 3

- [x] T016 [US3] Refine Tailwind CSS classes across `AppShell.tsx`, `AppSidebar.tsx`, and `AppNavbar.tsx` for optimal padding, borders, and responsive behaviors
- [x] T017 [US3] Refine typography and styling in `LeadListPlaceholder.tsx` and `LeadDetailsPlaceholder.tsx` to match Shadcn visual standards

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T018 Code cleanup and removal of unused initial Vite boilerplate from `App.tsx` and `App.css`
- [x] T019 Run quickstart.md validation to verify end-to-end responsivenss and master-detail behavior

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Extends US1 component logic
- **User Story 3 (P2)**: Can start after User Story 1 and 2

### Parallel Opportunities

- Placeholder creation tasks (T005, T006) can run in parallel
- Once Foundational phase completes, developers can tackle `AppSidebar` and `MasterDetailView` components simultaneously.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently on desktop
5. Proceed to User Story 2 for full responsive MVP

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently on desktop (Desktop MVP!)
3. Add User Story 2 → Test independently on mobile (Mobile MVP!)
4. Add User Story 3 → Test independently (Polished Final Product)
