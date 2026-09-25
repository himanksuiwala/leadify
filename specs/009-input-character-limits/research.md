# Research & Decisions: Input Character Limits

## 1. Database Column Types
**Decision**: We will alter the `TEXT` columns to `VARCHAR(n)` with the specified limits (30, 50, 100, 500) directly in `seed.ts`. PostgreSQL's `VARCHAR(n)` strictly enforces length at the DB layer, fulfilling Outcome 1. Existing seeded data (which is mock data) fits well within these bounds, so no truncation scripts are needed.

## 2. API Validation
**Decision**: We will update the Zod schemas in `backend/src/validators/lead.ts`. Specifically, `.max(n, "Custom error message")` will be appended to the respective fields in `WebhookLeadSchema` and `UpdateLeadSchema`.

## 3. Tooltip Component
**Decision**: The project already has `frontend/src/components/ui/tooltip.tsx` built with Shadcn/Radix. We will wrap text elements in `LeadDetails` and `LeadList` that commonly overflow (e.g. Message, Topic, Name, Email) in a `Tooltip` and a container styled with `truncate` (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap`). 
