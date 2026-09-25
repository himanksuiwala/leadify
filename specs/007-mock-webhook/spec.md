# Feature Specification: Mock Webhook Simulator

## 1. Overview
This feature introduces a dedicated route (`/mock-webhook`) that acts as an interactive simulator for the `POST /webhook/meta-lead` backend endpoint. It allows users to manually dispatch test payloads into the system to verify the ingestion pipeline. Additionally, it adds a refresh mechanism to the Lead List to easily fetch the newly ingested data.

## 2. Business Context & Value
- **Why are we building this?**: Testing webhook ingestion usually requires external tools like Postman or triggering actual Meta Ads. Providing an in-app simulator allows sales managers, developers, and QA to rapidly mock inbound leads without leaving the system.
- **Who is this for?**: Internal team members (developers, testers, admins).
- **What is the expected outcome?**: Users can fill out a form, hit submit, and instantly see a test lead pop up in their dashboard upon refreshing.

## 3. Scope
- **In Scope**:
  - Creating a new React route `/mock-webhook`.
  - Adding a "Mock Webhook" button (with a tilted arrow icon) in the top-right of the global App Header that opens the route in a new tab.
  - Rendering an informational alert card at the top of the simulator page explaining its purpose.
  - Rendering a form with inputs for: First Name, Last Name, Email, Phone, Topic, and Message.
  - Enforcing strict frontend validation (making required fields mandatory in the UI to prevent backend rejection).
  - Hardcoding the `source` payload value to "Meta Ads".
  - Submitting the payload to `POST /webhook/meta-lead`.
  - Showing a success toast notification and clearing the form upon success.
  - Adding a "Reload" icon button in the `LeadList` header next to the status filter to manually refresh the list.
- **Out of Scope**: 
  - Simulating webhooks for sources other than "Meta Ads".
  - Modifying backend schemas.

## 4. User Scenarios & Acceptance Criteria

### Scenario 1: Navigating to Simulator
- **Given** a user is anywhere in the main application
- **When** they click the "Mock Webhook" button in the global header
- **Then** a new browser tab opens pointing to `/mock-webhook`.
- **And** the page displays an informational card explaining that this is a testing utility.

### Scenario 2: Submitting a Mock Lead
- **Given** the user is on the `/mock-webhook` page
- **When** they fill out all required fields and submit the form
- **Then** the UI sends a POST request to the backend.
- **And** upon a `201 Created` response, a success toast appears.
- **And** the form inputs are completely reset to empty.

### Scenario 3: Validation Blocking
- **Given** the user is on the simulator page
- **When** they leave a required field (e.g., Email) empty and attempt to submit
- **Then** the UI prevents submission and highlights the missing required field.

### Scenario 4: Refreshing the Dashboard
- **Given** the user has just successfully submitted a mock lead
- **When** they return to their main application tab and click the new "Reload" icon button above the Lead List
- **Then** the Lead List refetches its data, and the newly created mock lead appears at the top.

## 5. Functional Requirements
1. The App Header must contain a new navigation link styled as a button with a standard `target="_blank"` behavior.
2. The `/mock-webhook` page must use Shadcn components (Card, Input, Textarea, Label, Button) matching the core aesthetic.
3. The form state must map perfectly to the JSON payload expected by the API.
4. The LeadList component must expose a manual trigger for its `fetchLeads` side-effect.

## 6. Success Criteria
- **Outcome 1**: Test leads can be ingested completely via the UI without requiring API clients.
- **Outcome 2**: The form enforces strict validation to ensure 100% success rate of payloads reaching the backend.
- **Outcome 3**: Users can refresh the main list with a single click rather than doing a hard page reload.

## 7. Assumptions
- The backend `POST /webhook/meta-lead` route is active and accepts requests from `localhost`.
- Opening the simulator in a new tab is preferred so the user doesn't lose their place in the CRM.
