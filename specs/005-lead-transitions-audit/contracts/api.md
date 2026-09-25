# API Contracts: Lead Transitions and Audit Trail

## PATCH /leads/:id/status

**Description**: Updates a lead's status and automatically generates a "Status Changed" audit log entry in the backend.

**Request Payload**:
```json
{
  "status": "Qualified"
}
```
*Note: Valid values are 'New', 'Qualified', 'Converted', 'Dead'.*

**Response** (`200 OK`):
```json
{
  "data": {
    "success": true
  }
}
```

*Note: After a successful PATCH, the frontend should either re-fetch `GET /leads/:id` to get the updated status and new audit log entry, or manually optimistically update the local state.*
