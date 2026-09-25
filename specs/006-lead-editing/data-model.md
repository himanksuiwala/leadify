# Data Model & Interfaces: Lead Editing

## Entity Updates

No new entities are being created for this feature. We are updating the existing `Lead` and `Customer` rows via a unified payload.

## Component Interfaces

### EditLeadModal Component

A new functional React component will be created: `EditLeadModal.tsx`.

**Props**:
```typescript
interface EditLeadModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  lead: DetailedLead;
  onSuccess: (updatedFields: Partial<DetailedLead>) => void;
}
```

**State**:
- Uses standard React state or a form library (e.g., `react-hook-form` if available, or just controlled state variables) to track the 6 editable fields.
- Tracks `isSubmitting` boolean for disabling the Save button and showing a loader.

## Integration

The modal will call:
```http
PATCH /leads/:id
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "source": "string",
  "topic": "string",
  "message": "string"
}
```
*Note: The backend intelligently routes `firstName`, `lastName`, and `phone` to the Customer table, and the rest to the Lead table.*
