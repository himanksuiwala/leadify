# Quickstart Validation Guide

This guide validates the e2e functionality of the Lead Intake API.

## Prerequisites
- The monolithic Docker container (`my-monolith`) must be running on port 3000.
- The database schema must be initialized with the ENUM types.

## Validation Scenarios

### 1. Ingest a New Lead
```bash
curl -X POST http://localhost:3000/webhook/meta-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "555-9999",
    "source": "Meta Ads",
    "topic": "1 BHK Apartment",
    "message": "Interested in viewing"
  }'
```
**Expected**: `201 Created`

### 2. View Lead Directory
```bash
curl http://localhost:3000/leads
```
**Expected**: `200 OK` with JSON envelope containing an array of leads, including the newly created lead for Jane Doe.

### 3. Update Lead Status
Extract the `LeadID` from the previous response and run:
```bash
curl -X PATCH http://localhost:3000/leads/<LEAD_ID>/status \
  -H "Content-Type: application/json" \
  -d '{ "status": "Qualified" }'
```
**Expected**: `200 OK`

### 4. Verify Audit Generation
Fetch the lead details to ensure the `Status Changed` audit was created:
```bash
curl http://localhost:3000/leads/<LEAD_ID>
```
**Expected**: `200 OK`. The `Audits` array should contain both the original `Created` action and the new `Status Changed` action.
