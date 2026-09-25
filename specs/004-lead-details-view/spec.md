# Feature Specification: Lead Details View

## 1. Overview
The Lead Details View allows sales agents to view comprehensive information about a specific lead they have selected from the master list. The interface is optimized to provide immediate access to contact information, the core inquiry (topic and message), and quick action buttons for communication. 

## 2. Business Context & Value
- **Why are we building this?**: To give agents a clear, organized view of a lead's intent and contact information so they can quickly prepare for and initiate a conversation. 
- **Who is this for?**: Sales agents and representatives managing the lead pipeline.
- **What is the expected outcome?**: Agents can process leads faster and take immediate action (call, email, chat) without hunting for contact details.

## 3. Scope
- **In Scope**:
  - Sticky header contact card displaying Name, Status Badge, Topic, Email, and Phone.
  - Three primary quick action buttons: Call, Email, and Chat.
  - A dedicated Message card for reading the full inquiry comfortably.
  - Secondary metadata display (Source, Timestamp).
  - Integration with the lead details API endpoint to fetch data for the selected lead.
- **Out of Scope**: 
  - Rendering the Audit Log (timeline of events) is excluded for now.
  - Actually triggering phone calls, emails, or chat windows (buttons will be dummy actions).
  - Editing lead details.

## 4. User Scenarios & Acceptance Criteria

### Scenario 1: Viewing a Selected Lead
- **Given** a user has clicked on a lead in the Master List
- **When** the Lead Details view loads
- **Then** the user should see a sticky Contact Card at the top displaying the lead's Full Name, a color-coded Status Badge, Topic, Email, and Phone number.
- **And** the user should see three distinct action buttons (Call, Email, Chat) with both text and icons.
- **And** the user should see the full inquiry message in a clearly separated, readable card below the contact details.
- **And** the user should see secondary information like Source and ingestion Timestamp.

### Scenario 2: Maintaining Context on Scroll
- **Given** the user is viewing a lead with a very long message or future additional details
- **When** the user scrolls down the details pane
- **Then** the Contact Card (Name, Status, quick actions) should remain sticky at the top of the view so contact actions are always accessible.

## 5. Functional Requirements
1. The view must display the lead's Full Name alongside the Status Badge at the top.
2. The view must display the lead's Topic, Email, and Phone number directly beneath the Name.
3. The view must include "Call", "Email", and "Chat" buttons that are visually distinct and include icons.
4. The full `Message` string must be displayed inside a distinct card with a light background.
5. The `Source` and `Timestamp` must be displayed in a secondary block.
6. The old "Lead Details (X)" placeholder header must be completely removed.
7. The application must fetch this data by calling the lead detail API using the ID of the selected lead.

## 6. Success Criteria
- **Outcome 1**: All required lead information (Contact info, Topic, Message, Source, Timestamp) is visible on the screen without horizontal scrolling.
- **Outcome 2**: The sticky contact card remains visible at the top of the detail pane regardless of vertical scroll depth.
- **Outcome 3**: Quick action buttons are immediately identifiable and accessible within 1 second of the view loading.

## 7. Assumptions
- The dummy action buttons will not have functional `href` or `onClick` behaviors assigned to them in this iteration.
- The `Phone` field may be empty/null for some leads, but the UI will gracefully handle missing data (e.g., hiding the field or showing "N/A").
