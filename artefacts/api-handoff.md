Backend API Handoff

1. POST /webhook/meta-lead

⚬ Purpose: Ingests incoming lead payloads from external sources.
⚬ Behavior: Checks for an existing Customer (creates one if missing), then creates a new Lead record with a default "New" status.
⚬ Audit Trigger: Automatically generates a "Lead Created" record in the audit log.

2. GET /leads

⚬ Purpose: Retrieves the directory of leads to populate the frontend list view.
⚬ Behavior: Returns an array of leads, joined with basic customer data (Name, Email), typically paginated and sorted by the newest timestamp.

3. GET /leads/:id

⚬ Purpose: Fetches comprehensive data for the Lead Detail View.
⚬ Behavior: Returns the specific Lead object, the joined Customer profile, and an array of all associated Audit records to render the Activity Timeline.

4. PATCH /leads/:id/status

⚬ Purpose: Handles business state transitions (e.g., moving a lead from "New" to "Contacted").
⚬ Payload Example: { "status": "Contacted" }
⚬ Audit Trigger: Automatically generates a "Status Changed" record in the audit log.

5. PATCH /leads/:id

⚬ Purpose: Handles standard data mutations and corrections (e.g., fixing a typo in a name or updating the budget).
⚬ Payload Example: { "firstName": "Jonathan", "topic": "4 BHK Villa" }
⚬ Audit Trigger: Automatically generates a "Lead Updated" record in the audit log.