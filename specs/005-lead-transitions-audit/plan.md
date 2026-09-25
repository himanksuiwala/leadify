# Implementation Plan: Lead Transitions and Audit Trail

**Branch**: `005-lead-transitions-audit` | **Date**: 2026-09-24 | **Spec**: [specs/005-lead-transitions-audit/spec.md](spec.md)

**Input**: Feature specification from `/specs/005-lead-transitions-audit/spec.md`

## Summary

This feature involves updating the `LeadDetails.tsx` component to allow status transitions via an interactive dropdown badge and rendering the `Audits` array into a chronological "Activity Timeline". We will use a Shadcn `DropdownMenu` for the status badge, triggering a `PATCH /leads/:id/status` request, and we will format the `Audits` data visually at the bottom of the details pane.

## Technical Context

**Language/Version**: TypeScript / React

**Primary Dependencies**: 
- Frontend: React (`useState`, `useEffect`), `date-fns` for timestamps.
- UI Library: Shadcn UI (`DropdownMenu` to replace the static `Badge` for interactive statuses).
- Backend: Exists (`PATCH /leads/:id/status` and `GET /leads/:id` returning `Audits`).

**Storage**: PostgreSQL (via existing backend API)

**Testing**: N/A (Manual validation via UI)

**Target Platform**: Web Browser

**Project Type**: Frontend feature enhancement

**Constraints**:
- Strict state transitions: `New` -> `Qualified` or `Dead`; `Qualified` -> `Converted` or `Dead`.
- `Converted` and `Dead` are terminal (dropdown disabled or hidden).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Modern TypeScript**: Compliant. Standard React functional patterns.
- **On-Demand Testing**: Compliant.

## Project Structure

### Documentation (this feature)

```text
specs/005-lead-transitions-audit/
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
│   │   │   └── dropdown-menu.tsx       # Shadcn UI component to be installed
│   │   └── views/
│   │       └── LeadDetails.tsx         # Component to be modified
```
