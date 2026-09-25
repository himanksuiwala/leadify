# Implementation Plan: Lead List Integration

**Branch**: `003-lead-list-integration` | **Date**: 2026-09-24 | **Spec**: [specs/003-lead-list-integration/spec.md](spec.md)

**Input**: Feature specification from `/specs/003-lead-list-integration/spec.md`

## Summary

Implement a paginated, filterable, and sortable lead list on the frontend. The list will feature infinite scrolling using a native `onScroll` event, render relative timestamps using `date-fns`, and use Shadcn UI components for styling and layout. The backend `/leads` API will be updated to accept `status` and `sort` query parameters to support server-side filtering and ordering.

## Technical Context

**Language/Version**: TypeScript (Node.js backend, React frontend)

**Primary Dependencies**: 
- Backend: Express, pg, zod (for query validation)
- Frontend: React (native fetch/useEffect/useState), date-fns, lucide-react, Shadcn UI (`badge`, `select`)

**Storage**: PostgreSQL

**Testing**: N/A (On-demand testing principle)

**Target Platform**: Web Browsers (Mobile and Desktop)

**Project Type**: Full-stack feature (Backend API update + Frontend UI integration)

**Performance Goals**: Smooth infinite scroll rendering, optimized DB queries for filtering/sorting

**Constraints**: Must use native `fetch` and `onScroll` for data loading without heavy external fetching libraries

**Scale/Scope**: Moderate. Involves updating one API endpoint and implementing a moderately complex frontend component state.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **On-Demand Testing**: Compliant. No automated tests will be written for this feature.
- **Modern TypeScript**: Compliant. We will use React functional components, hooks, and async/await.
- **Observability**: Compliant. The backend API will log database query failures if they occur.

## Project Structure

### Documentation (this feature)

```text
specs/003-lead-list-integration/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api.md           # API Contract Updates
└── tasks.md             # Phase 2 output (to be generated)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── routes/
│   │   └── leads.ts         # Update query parsing
│   ├── validators/
│   │   └── query.ts         # Add status and sort to schema
│   └── services/
│       └── lead.ts          # Update SQL queries for filtering/sorting

frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # Install badge, select, select-item
│   │   └── views/
│   │       ├── MasterDetailView.tsx    # Add fetching logic, filters, sorting state
│   │       └── LeadListPlaceholder.tsx # Convert to LeadList (real data map)
│   └── lib/                 # Utility functions (date formatting)
```

**Structure Decision**: Both backend and frontend structures will be updated in place following the existing architectural patterns.
