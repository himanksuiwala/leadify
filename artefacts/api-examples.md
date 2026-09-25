# Lead Intake API - Examples

This document outlines sample request payloads and successful responses for all 5 implemented API endpoints.

## 1. POST /webhook/meta-lead
**Description**: Ingests a new lead from a webhook (e.g. Meta Ads) and creates an audit record.

**Request Payload**:
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phone": "555-9999",
  "source": "Meta Ads",
  "topic": "1 BHK Apartment",
  "message": "Interested in viewing"
}
```

**Response** (`201 Created`):
```json
{
  "data": {
    "leadId": "f4cd0ed2-910d-4db4-8fe4-44b9a7bd0640"
  }
}
```

---

## 2. GET /leads
**Description**: Retrieves a paginated directory of leads, joined with their basic customer profile.

**Request**:
```http
GET /leads?page=1&limit=2
```

**Response** (`200 OK`):
```json
{
  "data": [
    {
      "LeadID": "9581acb3-77fb-4b76-9a3f-9b4683d89ceb",
      "CustomerID": "4de985b6-143a-49bf-99e9-54cc62af8514",
      "Source": "Meta Ads",
      "Topic": "3 BHK Villa",
      "Message": "Following up on my previous inquiry",
      "Status": "Qualified",
      "Timestamp": "2026-09-24T11:30:00.000Z",
      "FirstName": "Priya",
      "LastName": "Sharma",
      "Email": "priya.sharma@example.com"
    },
    {
      "LeadID": "3490b63b-0125-4677-be87-578f7e8a93cb",
      "CustomerID": "d2f4ab39-51a8-4e89-9a25-27a1fc9810bb",
      "Source": "Website Contact",
      "Topic": "2 BHK Apartment",
      "Message": "Looking for properties in South Delhi",
      "Status": "New",
      "Timestamp": "2026-09-23T14:45:00.000Z",
      "FirstName": "Rahul",
      "LastName": "Verma",
      "Email": "rahul.v@example.com"
    }
  ],
  "meta": {
    "total": 21,
    "page": 1,
    "limit": 2,
    "totalPages": 11
  }
}
```

---

## 3. GET /leads/:id
**Description**: Retrieves full lead details, the customer profile, and the timeline of audit events.

**Request**:
```http
GET /leads/9581acb3-77fb-4b76-9a3f-9b4683d89ceb
```

**Response** (`200 OK`):
```json
{
  "data": {
    "LeadID": "9581acb3-77fb-4b76-9a3f-9b4683d89ceb",
    "CustomerID": "4de985b6-143a-49bf-99e9-54cc62af8514",
    "Source": "Meta Ads",
    "Topic": "3 BHK Villa",
    "Message": "Following up on my previous inquiry",
    "Status": "Qualified",
    "Timestamp": "2026-09-24T11:30:00.000Z",
    "Customer": {
      "CustomerID": "4de985b6-143a-49bf-99e9-54cc62af8514",
      "FirstName": "Priya",
      "LastName": "Sharma",
      "Email": "priya.sharma@example.com",
      "Phone": "+91-9876543210"
    },
    "Audits": [
      {
        "AuditID": "e0b8a3ac-0309-4113-9118-2da8b7f8e815",
        "LeadID": "9581acb3-77fb-4b76-9a3f-9b4683d89ceb",
        "Action": "Status Changed",
        "Actor": "Sales Agent",
        "Comment": "Status changed to Qualified",
        "Timestamp": "2026-09-24T12:00:22.000Z"
      },
      {
        "AuditID": "3f822a19-b5ac-477f-a64d-df720eb070cf",
        "LeadID": "9581acb3-77fb-4b76-9a3f-9b4683d89ceb",
        "Action": "Created",
        "Actor": "System",
        "Comment": "Initial lead ingestion",
        "Timestamp": "2026-09-24T11:30:00.000Z"
      }
    ]
  }
}
```

---

## 4. PATCH /leads/:id/status
**Description**: Updates a lead's status (restricted by ENUM) and generates a "Status Changed" audit log.

**Request Payload**:
```json
{
  "status": "Qualified"
}
```

**Response** (`200 OK`):
```json
{
  "data": {
    "success": true
  }
}
```

---

## 5. PATCH /leads/:id
**Description**: Updates fields on a lead or its associated customer, and generates an "Updated" audit log.

**Request Payload**:
```json
{
  "phone": "+91-9999999999",
  "topic": "Looking for Penthouse"
}
```

**Response** (`200 OK`):
```json
{
  "data": {
    "success": true
  }
}
```
