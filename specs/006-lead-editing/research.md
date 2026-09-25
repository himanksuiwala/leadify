# Research & Decisions: Lead Editing

## Technical Context

The objective is to implement a Lead Editing modal on the frontend and integrate it with the existing backend `PATCH /leads/:id` endpoint.

## Findings & Decisions

### 1. Form Validation & Allowed Fields
- **Finding**: The backend API `backend/src/validators/lead.ts` defines `UpdateLeadSchema` as allowing partial updates to: `firstName`, `lastName`, `phone`, `source`, `topic`, `message`.
- **Decision**: The Edit Lead form will include precisely these 6 fields. The frontend will pass the changed values to the API.

### 2. UI Components
- **Finding**: The user requested a modal form and quick toast notifications.
- **Decision**: We will use Shadcn's `Dialog` for the modal and `sonner` for toast notifications. These have been installed in `frontend/src/components/ui/`.

### 3. Application State Refresh
- **Finding**: After the API responds with `200 OK` indicating a successful patch, the frontend needs to show the updated values and the new Audit log ("Updated").
- **Decision**: Since `LeadDetails.tsx` already has a `refreshCounter` mechanism and `fetchLead()` side-effect, we can simply increment `refreshCounter` after a successful save. Additionally, we will call `onLeadUpdated` to update the parent Master List, but wait, the master list primarily shows `FirstName`, `LastName`, `Status`. If we edit the name, the master list should reflect it. We will update `onLeadUpdated` to pass the entire modified fields so the parent can merge them into the list state without a full refetch.
