# Implementation Plan: Lead Details View

**Branch**: `004-lead-details-view` | **Date**: 2026-09-24 | **Spec**: [specs/004-lead-details-view/spec.md](spec.md)

**Input**: Feature specification from `/specs/004-lead-details-view/spec.md`

## Summary

Implement the Lead Details View in the frontend by replacing the existing `LeadDetailsPlaceholder` with a fully functional `LeadDetails` component. This component will fetch and display comprehensive information (Contact Card, Action Buttons, Message, Source) for the currently selected lead using the `/leads/:id` endpoint. 

## Technical Context

**Language/Version**: TypeScript / React

**Primary Dependencies**: 
- Frontend: React (`useEffect`, `useState`), `date-fns` for timestamps, `lucide-react` for icons (Phone, Mail, MessageSquare), and Shadcn UI (Badge, Button).
- Backend: None (API endpoint already exists and serves the data).

**Storage**: PostgreSQL (via existing backend API)

**Testing**: N/A (On-demand manual testing)

**Target Platform**: Web Browsers

**Project Type**: Frontend feature addition

**Performance Goals**: Fast, flicker-free loading of lead details when switching between leads.

**Constraints**:
- The contact card must remain sticky at the top while scrolling the message.
- Exclude the Audit log for now.

**Scale/Scope**: Small. Primarily involves UI layout and a simple `fetch` request.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Modern TypeScript**: Compliant. Uses React functional components and hooks.
- **On-Demand Testing**: Compliant. No automated test suites are requested.

## Project Structure

### Documentation (this feature)

```text
specs/004-lead-details-view/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api.md           # API reference
└── tasks.md             # Phase 2 output (to be generated)
```

### Source Code

```text
frontend/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── button.tsx              # Shadcn UI component to be installed
│   │   └── views/
│   │       └── LeadDetails.tsx         # Replaces LeadDetailsPlaceholder.tsx
│   └── hooks/                          # existing use-mobile hook
```
