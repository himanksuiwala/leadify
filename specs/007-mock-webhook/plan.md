# Implementation Plan: Mock Webhook Simulator

**Branch**: `007-mock-webhook` | **Date**: 2026-09-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/007-mock-webhook/spec.md`

## Summary

Implement a dedicated route (`/mock-webhook`) with a Shadcn-styled form to simulate Meta Ads webhook payloads. Add an external link button in the main header and a manual refresh button in the Lead List to fetch newly ingested data.

## Technical Context

**Language/Version**: TypeScript, React, Node.js

**Primary Dependencies**: Shadcn UI (`card`, `input`, `textarea`, `label`, `button`), Lucide React, React Router (for new route)

**Storage**: PostgreSQL (via existing backend services)

**Testing**: Standard local manual validation

**Target Platform**: Web browsers (Desktop and Mobile layout)

**Project Type**: Full-stack Web Application

**Performance Goals**: Instant UI feedback and fast context switching via new tab.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Component Standard**: Uses existing Shadcn components ensuring design consistency.
- **Routing Standard**: Follows Vite/React routing patterns already established in `App.tsx`.

## Project Structure

### Documentation (this feature)

```text
specs/007-mock-webhook/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (pending)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── App.tsx                        # MODIFIED (Add route)
│   ├── components/
│   │   ├── layout/
│   │   │   └── AppNavbar.tsx          # MODIFIED (Add Header button)
│   │   ├── ui/
│   │   │   └── card.tsx               # NEW (If not already installed)
│   │   └── views/
│   │       ├── MockWebhookView.tsx    # NEW
│   │       └── LeadList.tsx           # MODIFIED (Add reload button)
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
