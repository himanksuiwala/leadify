# Feature Specification: Lead Transitions and Audit Trail

## 1. Overview
This feature introduces the ability for sales agents to advance leads through a strict pipeline flow (e.g., from "New" to "Qualified" to "Converted") directly from the Lead Details view. Additionally, it implements an "Activity Timeline" (Audit Trail) that displays a chronological history of all actions performed on that lead, ensuring full transparency.

## 2. Business Context & Value
- **Why are we building this?**: Agents need a way to officially progress leads through the sales pipeline. Tracking these changes via an audit trail is critical for accountability and understanding the lifecycle of a lead.
- **Who is this for?**: Sales agents handling pipeline progression, and sales managers monitoring activity.
- **What is the expected outcome?**: Agents can seamlessly update a lead's status without leaving the detail view, and anyone viewing the lead can see the complete history of its progression.

## 3. Scope
- **In Scope**:
  - Replacing the static status badge in the Lead Details header with an interactive Dropdown.
  - Enforcing strict state transitions:
    - `New` → `Qualified` or `Dead`
    - `Qualified` → `Converted` or `Dead`
    - `Converted` / `Dead` → Terminal (No further transitions)
  - Triggering an API request to persist the transition.
  - Rendering a chronological Activity Timeline at the bottom of the Lead Details view using the `Audits` data.
- **Out of Scope**: 
  - Bulk updating statuses for multiple leads at once.
  - Adding free-text notes/comments to the audit log (only automatic status change audits are in scope for the UI transition).

## 4. User Scenarios & Acceptance Criteria

### Scenario 1: Updating Lead Status
- **Given** a user is viewing a lead in the "New" status
- **When** the user clicks the interactive status badge
- **Then** a dropdown appears offering only "Qualified" and "Dead" as options.
- **When** the user selects "Qualified"
- **Then** the system updates the lead's status, visually refreshes the badge to reflect the new state, and adds a new "Status Changed" entry to the Activity Timeline.

### Scenario 2: Terminal States
- **Given** a user is viewing a lead that is "Converted" or "Dead"
- **When** the user looks at the status badge
- **Then** the badge is visually distinct but not interactive (clicking it does nothing, or it clearly indicates it is locked).

### Scenario 3: Viewing the Audit Trail
- **Given** a user is viewing a lead that has been updated multiple times
- **When** the user scrolls to the bottom of the Lead Details pane
- **Then** they should see an "Activity Timeline" displaying a chronological list of events (e.g., "Created", "Status Changed") showing the actor and timestamp for each event.

## 5. Functional Requirements
1. The status badge must be an interactive component (e.g., a Dropdown) if the lead is in a non-terminal state.
2. The dropdown must enforce the strict pipeline logic defined in the scope (preventing skipping states or moving backwards).
3. Selecting a new status must trigger an API request to save the change and refresh the local view data.
4. An Activity Timeline section must be rendered beneath the Lead Information, mapping over the `Audits` array.
5. The timeline must display the Action, Actor, and formatted Timestamp for each audit event.

## 6. Success Criteria
- **Outcome 1**: Agents can successfully transition a lead's status within 2 clicks from the detail view.
- **Outcome 2**: Invalid status transitions (e.g., "New" to "Converted") are completely impossible via the UI.
- **Outcome 3**: All historical actions for a lead are visible in a unified, chronological timeline.

## 7. Assumptions
- The backend API (`PATCH /leads/:id/status`) automatically generates the corresponding Audit log entry for a status change.
- The `Audits` array returned by the API is already sorted (or can be easily sorted chronologically by the frontend).
