# Data Model & Interfaces: User Tracking

## Database Schema Changes

### `User` (New Table)
```sql
CREATE TABLE "User" (
  "UserID" UUID PRIMARY KEY,
  "FirstName" TEXT NOT NULL,
  "LastName" TEXT NOT NULL,
  "Email" TEXT UNIQUE NOT NULL
);
```

### `Lead` (Modified Table)
- Add `"AssignedTo" UUID REFERENCES "User"("UserID") ON DELETE SET NULL`

### `Audit` (Modified Table)
- Drop `"Actor" TEXT`
- Add `"ActorID" UUID REFERENCES "User"("UserID") ON DELETE SET NULL`

## API Contract Adjustments

The GET `/leads/:id` endpoint will now return `User` data joined onto the Audits.

```json
{
  "LeadID": "uuid",
  "AssignedTo": "uuid",
  "Audits": [
    {
      "AuditID": "uuid",
      "Action": "Updated",
      "Comment": "Status changed to Qualified",
      "Timestamp": "2023-10-01...",
      "User": {
        "FirstName": "Aman",
        "LastName": "Rawat"
      }
    }
  ]
}
```
