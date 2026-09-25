# Feature Specification: Lead List Integration

**Feature Branch**: `003-lead-list-integration`

**Created**: 2026-09-24

**Status**: Draft

**Input**: User description: "Hook the Lead data in the Lead-list section so that the leads can be rendered in there in neat-manner. You can refer to /leads endpoint... lazy load the items... filter and sorting capability..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Paginated Lead List (Priority: P1)

As a sales agent, I want to see a list of leads with their primary and secondary details so that I can quickly assess the pipeline.

**Why this priority**: Displaying the data is the core functionality of the lead list view.

**Independent Test**: Load the application. The lead list panel should populate with actual leads fetched from the backend, displaying the correct details (Full Name, Topic, Status Badge, Relative Timestamp, Source, truncated Message).

**Acceptance Scenarios**:
1. **Given** the app is loaded, **When** the lead list mounts, **Then** it fetches and displays the first page of leads from the API.
2. **Given** a lead in the list, **Then** I see the full name, topic, status badge with color coding, relative timestamp, source, and a 1-line message snippet.
3. **Given** a lead in the list, **Then** the LeadID and CustomerID are not visibly rendered to the user.

---

### User Story 2 - Infinite Scroll (Priority: P1)

As a sales agent, I want to lazily load more leads as I scroll down the list so that I don't have to click through pagination buttons.

**Why this priority**: Essential for a smooth user experience when dealing with many leads.

**Independent Test**: Scroll to the bottom of the lead list. The application should fetch and append the next page of leads without clearing the current list.

**Acceptance Scenarios**:
1. **Given** a list of leads, **When** I scroll to the bottom of the container, **Then** the next page of leads is automatically fetched and appended to the list.
2. **Given** the last page of leads has been reached, **When** I scroll to the bottom, **Then** no additional API requests are made.

---

### User Story 3 - Sort Leads (Priority: P2)

As a sales agent, I want to sort the lead list by various criteria (Date/Time, Name, Status Priority) so that I can prioritize my outreach.

**Why this priority**: Crucial for workflow efficiency, allowing agents to focus on the oldest, newest, or highest priority leads.

**Independent Test**: Select a sorting option from a dropdown. The list should refresh and display the leads in the requested order.

**Acceptance Scenarios**:
1. **Given** the lead list, **When** I select "Date/Time (Newest to Oldest)" from the sort dropdown, **Then** the list resets and displays leads sorted by timestamp descending.
2. **Given** the lead list, **When** I select "Name (A-Z)", **Then** the list sorts alphabetically by first name.

---

### User Story 4 - Filter by Status (Priority: P2)

As a sales agent, I want to filter the lead list by clicking status chips so that I can view only the leads that are in a specific stage (e.g., "New").

**Why this priority**: Allows agents to focus on specific segments of the pipeline.

**Independent Test**: Click a status filter chip. The list should refresh to show only leads matching that status.

**Acceptance Scenarios**:
1. **Given** the lead list, **When** I click the "New" filter chip, **Then** the list resets and displays only leads with the "New" status.
2. **Given** an active filter, **When** I click the "All" chip (or deselect the active filter), **Then** the list shows all leads again.

### Edge Cases

- What happens if the API request fails? The UI should gracefully display an error state or a retry button.
- What happens if there are no leads matching the selected filter? The list should display an "empty state" message (e.g., "No leads found").
- What happens if the user scrolls very fast? The infinite scroll should debounce or lock subsequent requests while a fetch is already in flight.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The backend `/leads` API MUST be updated to support optional `status` (string) and `sort` (string) query parameters.
- **FR-002**: The frontend MUST fetch data from the `/leads` endpoint using native `fetch` and `useEffect`.
- **FR-003**: The UI MUST format the lead's ISO timestamp into a relative time (e.g., "2 hours ago") using `date-fns`.
- **FR-004**: The UI MUST render a status badge with specific color coding (e.g., Blue for New, Orange for Contacted, Green for Qualified).
- **FR-005**: The UI MUST detect scrolling to the bottom of the list container via a native `onScroll` event listener.
- **FR-006**: The UI MUST provide a dropdown menu to select a sort order: Date/Time (Newest to Oldest), Date/Time (Oldest to Newest), Name (A-Z), Status Priority.
- **FR-007**: The UI MUST provide filter chips for the available lead statuses.
- **FR-008**: Changing a filter or sort option MUST reset the pagination back to page 1 and clear the current list before fetching new results.

### Key Entities

- **Lead**: The data object retrieved from the API, containing `LeadID`, `FirstName`, `LastName`, `Topic`, `Source`, `Status`, `Message`, and `Timestamp`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The lead list correctly displays fetched data and accurately reflects the UI specifications (truncation, formatting, hidden IDs).
- **SC-002**: Infinite scrolling fetches sequential pages without duplicating items or crashing.
- **SC-003**: Server-side filtering and sorting accurately order and constrain the dataset returned to the frontend.

## Assumptions

- The backend database already contains seeded lead data to test the listing functionality.
- The `status` ENUM used for filtering perfectly matches the ENUMs defined in the backend schema (`'New', 'Contacted', 'Qualified', 'Lost'`).
