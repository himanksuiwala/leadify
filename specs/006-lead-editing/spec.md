# Feature Specification: Lead Editing

## 1. Overview
This feature introduces the ability for users to edit and update a lead's core information directly from the Lead Details view. Users will interact with an "Edit" button that opens a pre-populated modal form, allowing them to modify fields such as name, phone, source, topic, and message, and save the changes which will be recorded in the system audit trail.

## 2. Business Context & Value
- **Why are we building this?**: As sales conversations progress, contact information or lead context often changes. Agents need a frictionless way to update these details without leaving the context of their workflow.
- **Who is this for?**: Sales agents and managers interacting with leads.
- **What is the expected outcome?**: Users can update lead and customer details quickly, with immediate visual feedback (toast notifications), and all updates are tracked in the activity timeline.

## 3. Scope
- **In Scope**:
  - Adding an "Edit" button to the top-right of the Contact Card Header.
  - Implementing a modal (Dialog component) containing an edit form.
  - Pre-populating the form with the lead's current values for: First Name, Last Name, Phone, Source, Topic, and Message.
  - Submitting the updated values to the API (`PATCH /leads/:id`).
  - Displaying success/failure notifications using the `sonner` toast system.
  - Closing the modal automatically upon success, or immediately if the user clicks "Cancel" (no unsaved changes warning).
- **Out of Scope**: 
  - Updating the customer's Email address (restricted field).
  - Bulk editing multiple leads at once.
  - Validating phone number formats beyond basic required checks.

## 4. User Scenarios & Acceptance Criteria

### Scenario 1: Opening the Edit Modal
- **Given** a user is viewing a lead's details
- **When** the user clicks the "Edit" button in the header
- **Then** a modal opens displaying a form with the fields First Name, Last Name, Phone, Source, Topic, and Message.
- **And** the form fields are pre-filled with the lead's current data.

### Scenario 2: Canceling Edits
- **Given** the user has opened the edit modal and optionally made changes
- **When** the user clicks the "Cancel" button or clicks outside the modal
- **Then** the modal closes immediately without saving and without warning prompts.

### Scenario 3: Saving Edits Successfully
- **Given** the user has made changes to the lead's information in the modal
- **When** the user clicks "Save"
- **Then** the system sends the updated data to the backend.
- **And** upon a successful response, the modal closes.
- **And** a success toast notification appears.
- **And** the lead details view automatically refreshes to display the updated information and a new "Updated" entry in the Activity Timeline.

## 5. Functional Requirements
1. The "Edit" button must be visually positioned in the Contact Card header alongside the quick action buttons (Call/Email/Chat).
2. The Edit Modal must use standard UI components (Dialog, Input, Label, Textarea) to maintain design consistency.
3. The form must capture and submit a subset of editable fields matching the backend validation schema.
4. The frontend must implement `sonner` for non-blocking success/error toast notifications.
5. The application state must be refreshed after a successful update so the UI reflects the new values.

## 6. Success Criteria
- **Outcome 1**: Users can successfully modify a lead's information and see the updated values instantly.
- **Outcome 2**: The process of saving an update takes less than 2 seconds of perceived wait time, reinforced by immediate toast feedback.
- **Outcome 3**: The user interface does not block or heavily interrupt the workflow when deciding to cancel an edit.

## 7. Assumptions
- The backend `PATCH /leads/:id` endpoint natively handles partial updates (only fields that are changed need to be submitted).
- The backend automatically creates an "Updated" audit log entry when the PATCH request succeeds.
