# Data Model: Lead Transitions and Audit Trail

## Frontend State Extensions

In `LeadDetails.tsx`:
- `isUpdating`: `boolean` - To indicate when a status transition request is in flight, allowing the UI to disable the dropdown temporarily and show a loading state.

## Modified `DetailedLead` Interface
The `Audits` array will now be actively utilized in the UI.

```typescript
interface AuditEvent {
  AuditID: string;
  LeadID: string;
  Action: string; // ENUM: 'Created', 'Updated', 'Status Changed'
  Actor: string;
  Comment: string;
  Timestamp: string;
}

// ... existing DetailedLead fields ...
  Audits: AuditEvent[];
```
