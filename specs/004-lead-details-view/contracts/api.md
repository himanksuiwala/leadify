# API Contracts: Lead Details View

## GET /leads/:id

**Description**: Retrieves full lead details, the customer profile, and the timeline of audit events. (The frontend will ignore the `Audits` array for now).

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
    "Audits": []
  }
}
```
