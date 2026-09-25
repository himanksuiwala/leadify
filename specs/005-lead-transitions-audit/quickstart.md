# Quickstart: Validation Guide for Lead Transitions and Audit Trail

## Prerequisites
- Both Backend and Frontend must be running locally (`npm run dev`).
- The database should be seeded with leads.

## Validation Scenarios

### 1. Status Transition Dropdown
- **Action**: Click on a lead in the Master List that has a "New" status. Then click its status badge in the header.
- **Expected Outcome**: A dropdown menu appears showing "Qualified" and "Dead" options. 

### 2. Performing a Transition
- **Action**: Select "Qualified" from the dropdown.
- **Expected Outcome**: The status badge updates to "Qualified". The dropdown should now only show "Converted" and "Dead". 

### 3. Terminal States
- **Action**: Transition the lead to "Converted" or "Dead".
- **Expected Outcome**: The badge updates, but clicking it no longer opens a dropdown (or the dropdown shows no valid next states).

### 4. Audit Trail Visibility
- **Action**: Scroll to the bottom of the lead details pane after performing a transition.
- **Expected Outcome**: The "Activity Timeline" should be visible. It should contain a chronological list of events, including the original "Created" event and the newly triggered "Status Changed" event(s) resulting from Scenario 2 & 3.
