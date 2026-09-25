# API Contracts Update: Lead List Integration

## GET /leads

**Modifications**: Added optional `status` and `sort` query parameters.

**Query Parameters**:
- `page` (optional, default: 1): integer
- `limit` (optional, default: 20): integer
- `status` (optional): string (Must match ENUM values: `'New', 'Contacted', 'Qualified', 'Lost'`)
- `sort` (optional): string. Supported values:
  - `date_desc` (default): Sorts by Timestamp descending (newest first)
  - `date_asc`: Sorts by Timestamp ascending (oldest first)
  - `name_asc`: Sorts by FirstName then LastName ascending (A-Z)
  - `status`: Sorts by Status based on implicit pipeline priority (e.g., New -> Contacted -> Qualified -> Lost, or alphabetical depending on DB enum order; we will implement a custom case/order for this in SQL).

**Example Request**:
```http
GET /leads?page=1&limit=10&status=New&sort=name_asc
```

**Response Contract**: (Unchanged in structure, only ordering/filtering is affected)
```json
{
  "data": [
    {
      "LeadID": "uuid",
      "FirstName": "string",
      "LastName": "string",
      "Topic": "string",
      "Status": "string",
      "Source": "string",
      "Message": "string",
      "Timestamp": "ISO8601",
      "Email": "string"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```
