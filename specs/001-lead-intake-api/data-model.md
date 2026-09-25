# Data Model: Lead Intake API

## PostgreSQL ENUM Types

- `lead_status`: `'New'`, `'Qualified'`, `'Converted'`, `'Dead'`
- `audit_action`: `'Created'`, `'Updated'`, `'Status Changed'`

## Tables

### Customer
- `CustomerID` (UUID, Primary Key)
- `FirstName` (TEXT, Not Null)
- `LastName` (TEXT, Not Null)
- `Email` (TEXT, Unique, Not Null)
- `Phone` (TEXT)

### Lead
- `LeadID` (UUID, Primary Key)
- `CustomerID` (UUID, Foreign Key -> Customer.CustomerID, ON DELETE CASCADE)
- `Source` (TEXT)
- `Topic` (TEXT)
- `Message` (TEXT)
- `Status` (lead_status, Default: 'New')
- `Timestamp` (TIMESTAMP)

### Audit
- `AuditID` (UUID, Primary Key)
- `LeadID` (UUID, Foreign Key -> Lead.LeadID, ON DELETE CASCADE)
- `Action` (audit_action)
- `Actor` (TEXT)
- `Comment` (TEXT)
- `Timestamp` (TIMESTAMP)
