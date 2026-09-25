# Feature Specification: Input Character Limits & Text Truncation

## 1. Overview
This feature enforces strict character limits across all text input fields to prevent unnecessarily long string values from being stored and processed. Additionally, it introduces UI enhancements to truncate long text elegantly, ensuring the interface remains clean while allowing users to view full text via tooltips on hover.

## 2. Business Context & Value
- **Why are we building this?**: Without input limits, users or automated systems can submit arbitrarily long strings, which degrades database performance, bloats storage, and breaks UI layouts.
- **Who is this for?**: System administrators, data processors, and end users who view lead information.
- **What is the expected outcome?**: All lead-related fields are constrained to reasonable lengths. The user interface remains visually structured even when fields reach their maximum allowed length, avoiding broken layouts or excessive scrolling.

## 3. Scope
- **In Scope**:
  - Enforcing character limits on First Name (30), Last Name (30), Email (100), Phone (15), Source (30), Topic (50), and Message (500).
  - Consistent enforcement at the database layer (schema), backend validation layer, and frontend input layer.
  - Updating the UI to use CSS ellipsis for long text blocks across lead cards and lists.
  - Adding hover tooltips over truncated text elements to reveal the full content.
- **Out of Scope**: 
  - Complex rich-text formatting for the Message field.
  - Changing the visual layout or core architecture of the Lead details page beyond truncation.

## 4. User Scenarios & Acceptance Criteria

### Scenario 1: Submitting a New Lead
- **Given** a user is creating a lead via the Mock Webhook Simulator
- **When** they attempt to type or paste a string longer than the allowed limit (e.g., 600 characters in the Message field)
- **Then** the input field should visually prevent further character entry.
- **And** submitting the form directly via API with excessive characters should yield a validation error.

### Scenario 2: Editing an Existing Lead
- **Given** an agent is editing a lead using the Edit Lead Modal
- **When** they input data into any field
- **Then** the frontend must restrict the input to the defined maximum lengths.

### Scenario 3: Viewing Long Text in the UI
- **Given** a lead exists with a 500-character message and 50-character topic
- **When** the lead is displayed in the list view or details panel
- **Then** the text should be cleanly truncated with an ellipsis (...) if it exceeds its visual container.
- **And** hovering over the truncated text displays a tooltip containing the complete text.

## 5. Functional Requirements
1. The database schema must constrain the respective columns to their maximum character lengths instead of unbounded `TEXT`.
2. The backend API must reject payloads that exceed the defined limits with a clear validation error.
3. The frontend input elements (inputs and textareas) must utilize `maxLength` attributes.
4. The frontend UI components rendering lead data must apply CSS truncation (e.g., `text-overflow: ellipsis`) and wrap the text in a tooltip component.
5. The specific limits to enforce are:
   - First Name: 30 chars
   - Last Name: 30 chars
   - Email: 100 chars
   - Phone: 15 chars
   - Source: 30 chars
   - Topic: 50 chars
   - Message: 500 chars

## 6. Success Criteria
- **Outcome 1**: Zero new records can be created or updated with string lengths exceeding the documented limits.
- **Outcome 2**: API payloads exceeding the limits fail with an HTTP 400 Bad Request.
- **Outcome 3**: The user interface does not break its layout when rendering leads with maximum-length text. Users can access the full text via a tooltip.

## 7. Assumptions
- Existing database records that currently exceed these limits will either be truncated automatically during migration, or left as legacy data if the migration supports it, without breaking the application.
- Tooltips will use a standard design system component (e.g., Radix/Shadcn) that is already available in the project.
