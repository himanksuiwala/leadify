# Feature Specification: Lead Intake API

**Feature Branch**: `001-lead-intake-api`

**Created**: 2026-09-24

**Status**: Draft

**Input**: User description: "implement lead intake service API endpoints as per api_handoff.md with zod validation, pg transactions for audit, and DB enums"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Webhook Lead Ingestion (Priority: P1)

As a webhook publisher, I want to send a lead payload to the system so that new leads are automatically ingested and tracked.

**Why this priority**: Without the ability to ingest leads, the system has no data. This is the primary business value driver.

**Independent Test**: Can be tested by sending a POST request to `/webhook/meta-lead` with a valid JSON payload and verifying that a customer, a lead, and an audit record are created in the database.

**Acceptance Scenarios**:

1. **Given** a new lead payload with an unseen email, **When** the webhook is triggered, **Then** a new Customer is created, a new Lead is created with status "New", and a "Lead Created" Audit record is added.
2. **Given** a lead payload with an existing customer email, **When** the webhook is triggered, **Then** the existing Customer is linked to the new Lead, and a "Lead Created" Audit record is added.
3. **Given** an invalid payload, **When** the webhook is triggered, **Then** the system returns a 400 error detailing validation failures.

---

### User Story 2 - Retrieve Lead Directory (Priority: P2)

As a sales agent, I want to view a list of leads so that I can see who to contact next.

**Why this priority**: Users need to see the ingested leads to take action.

**Independent Test**: Can be tested by hitting `GET /leads` and ensuring the response conforms to the standard envelope format (`{ data: [], meta: {} }`) containing joined customer details.

**Acceptance Scenarios**:

1. **Given** existing leads in the database, **When** requesting `/leads`, **Then** the system returns an array of leads joined with basic Customer data (Name, Email), sorted by the newest timestamp.

---

### User Story 3 - View Lead Details (Priority: P2)

As a sales agent, I want to view the full details of a specific lead, including their activity timeline, so that I have context before contacting them.

**Why this priority**: Detailed context is necessary for effective sales conversations.

**Independent Test**: Can be tested by fetching `GET /leads/:id` and verifying it returns the Lead, Customer profile, and Audit records.

**Acceptance Scenarios**:

1. **Given** a valid lead ID, **When** requesting `/leads/:id`, **Then** the system returns the lead object, associated customer profile, and an array of all audit records.
2. **Given** a non-existent lead ID, **When** requesting `/leads/:id`, **Then** the system returns a 404 Not Found error.

---

### User Story 4 - Update Lead Status (Priority: P3)

As a sales agent, I want to update a lead's status (e.g., from "New" to "Contacted") so that the pipeline reflects reality.

**Why this priority**: Status tracking is core to CRM functionality, but comes after ingestion and viewing.

**Independent Test**: Can be tested by sending a PATCH to `/leads/:id/status`, checking the response, and verifying an audit record was created in the database.

**Acceptance Scenarios**:

1. **Given** a valid lead and status transition, **When** requesting `PATCH /leads/:id/status`, **Then** the lead status is updated and a "Status Changed" Audit record is generated transactionally.
2. **Given** an invalid status string, **When** requesting `PATCH /leads/:id/status`, **Then** the system rejects the update with a 400 error.

---

### User Story 5 - Edit Lead Details (Priority: P3)

As a sales agent, I want to correct or update a lead's information so that records remain accurate.

**Why this priority**: Data correction is a standard operation but less critical than state transitions.

**Independent Test**: Can be tested by sending a PATCH to `/leads/:id` with partial updates.

**Acceptance Scenarios**:

1. **Given** valid update data, **When** requesting `PATCH /leads/:id`, **Then** the lead data is updated and a "Lead Updated" Audit record is generated transactionally.

### Edge Cases

- What happens when a webhook is sent with missing mandatory fields? The system will reject it with a 400 Bad Request and detailed schema validation errors.
- How does the system handle concurrent updates to the same lead? PostgreSQL transactions will ensure atomicity for the audit log generation.
- What if the database transaction fails during an update? The entire operation (both the update and the audit creation) will roll back, ensuring no orphaned data.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST expose a `POST /webhook/meta-lead` endpoint that accepts lead payloads, matches/creates customers by Email, creates a Lead, and logs a "Lead Created" Audit record in a single transaction.
- **FR-002**: System MUST expose a `GET /leads` endpoint returning a paginated list of leads with basic customer data (Name, Email), sorted newest-first, wrapped in `{ data, meta }`.
- **FR-003**: System MUST expose a `GET /leads/:id` endpoint returning the Lead, Customer profile, and all Audit records.
- **FR-004**: System MUST expose a `PATCH /leads/:id/status` endpoint to update the Lead status and create a "Status Changed" Audit record transactionally.
- **FR-005**: System MUST expose a `PATCH /leads/:id` endpoint to update standard lead fields and create a "Lead Updated" Audit record transactionally.
- **FR-006**: System MUST enforce PostgreSQL ENUMs for `Lead.Status` ('New', 'Qualified', 'Converted', 'Dead') and `Audit.Action` ('Created', 'Updated', 'Status Changed').
- **FR-007**: System MUST validate all incoming requests using strict Zod schemas.

### Key Entities

- **Customer**: Represents a unique person identified by their Email.
- **Lead**: Represents a specific inquiry or intent from a Customer.
- **Audit**: Tracks the history of actions performed on a specific Lead.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of API responses follow the `{ data, meta }` envelope format.
- **SC-002**: 100% of incoming payloads failing schema validation receive a descriptive 400 error rather than a 500 internal server error.
- **SC-003**: 100% of successful mutations (status change, updates, creation) result in exactly one corresponding Audit record, guaranteed by transactions.
- **SC-004**: Database rejects invalid ENUM string insertions natively.

## Assumptions

- We are assuming PostgreSQL is the primary database.
- Zod is available for runtime validation.
- We will be modifying the existing DB schema and seed script to implement the ENUMs before coding the endpoints.
- Pagination for `GET /leads` will use simple `page` and `limit` query parameters with sensible defaults (e.g., page 1, limit 20).
