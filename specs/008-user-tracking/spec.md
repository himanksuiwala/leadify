# Feature Specification: User Tracking & Audit Consistency

## 1. Overview
This feature introduces a robust user tracking model to the system to eliminate hardcoded audit actor strings (e.g., "Sales Agent"). It standardizes how automated actions (like webhooks) are logged and introduces a formal internal `User` entity to track accountability across leads and audits properly.

## 2. Business Context & Value
- **Why are we building this?**: The current audit trail shows generic, hardcoded strings like "Status Changed by Sales Agent" instead of identifying the actual team member (e.g., "by Aman Rawat"). This breaks accountability and trust in the system's history. Furthermore, automated systems use conflicting terminology ("Meta Webhook" vs "System Webhook"), causing confusion in analytics and history.
- **Who is this for?**: Internal team members, sales managers, and administrators who rely on accurate historical logs.
- **What is the expected outcome?**: Every manual action is definitively tied to a specific user name. Every automated action uniformly reports as "System Webhook" with generic, consistent messaging.

## 3. Scope
- **In Scope**:
  - Introduction of a new internal `User` entity to represent staff members (e.g., Sales Agents, Admins).
  - Updating the `Audit` logs to structurally link to the `User` who performed the action, rather than storing a hardcoded text string.
  - Updating the `Lead` records to support assignment to a specific `User`.
  - Enforcing a unified naming convention for all automated webhook injections: the actor must always be "System Webhook" and the comment must be "Lead created via webhook".
  - Updating the frontend UI to display the actual user's name (e.g., "Aman Rawat") in the audit timeline.
- **Out of Scope**: 
  - Building a full Role-Based Access Control (RBAC) UI or complex permission system.
  - Implementing an authentication portal or login screen (a mock logged-in user can be assumed for this iteration if auth doesn't exist).

## 4. User Scenarios & Acceptance Criteria

### Scenario 1: Manual Status Update
- **Given** an internal sales agent (Aman Rawat) is viewing a lead's details
- **When** they update the lead's status from "New" to "Qualified"
- **Then** the system logs the action.
- **And** the audit timeline explicitly displays: "Status changed to Qualified by Aman Rawat".

### Scenario 2: Webhook Ingestion
- **Given** a lead payload is submitted via the Meta Ads webhook route
- **When** the system ingests the payload and creates the lead
- **Then** the audit log explicitly records the actor as "System Webhook".
- **And** the audit comment explicitly records "Lead created via webhook" regardless of the original source platform.

## 5. Functional Requirements
1. The system must maintain a registry of internal users with at least a First Name and Last Name.
2. The audit trailing mechanism must capture a hard reference to the acting user when a human performs an action.
3. Automated endpoints (like the webhook route) must be stripped of any platform-specific actor naming (e.g., removing "Meta") and standardized to use "System Webhook".
4. The user interface rendering the audit trail must dynamically resolve and display the human actor's full name.

## 6. Success Criteria
- **Outcome 1**: 100% of new manual actions recorded in the audit trail display a real human name rather than a generic role string.
- **Outcome 2**: 100% of new automated webhook ingestions are logged uniformly as "System Webhook".
- **Outcome 3**: The database achieves referential integrity between audit logs and the internal users executing them.

## 7. Assumptions
- Since there is currently no authentication UI, the backend may use a hardcoded/mocked internal User ID to represent the "logged in" user for testing purposes until full authentication is implemented.
- Existing historical audit data containing hardcoded strings (like "Sales Agent") can either be migrated to a generic user ID or left as legacy data depending on implementation ease.
