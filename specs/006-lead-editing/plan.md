# Implementation Plan: Lead Editing

**Branch**: `006-lead-editing` | **Date**: 2026-09-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/006-lead-editing/spec.md`

## Summary

Implement a Shadcn-based modal to edit lead information (Name, Phone, Source, Topic, Message). The frontend will interact with the `PATCH /leads/:id` endpoint and provide non-blocking toast notifications via `sonner`. The UI will optimistically/actively refresh both the detail view and the master list after successful updates.

## Technical Context

**Language/Version**: TypeScript, React, Node.js

**Primary Dependencies**: Shadcn UI (`dialog`, `sonner`, `input`, `textarea`, `label`), Lucide React

**Storage**: PostgreSQL (via existing backend services)

**Testing**: Standard local manual validation (no automated UI tests prescribed)

**Target Platform**: Web browsers (Desktop and Mobile layout)

**Project Type**: Full-stack Web Application

**Performance Goals**: Sub-second UI updates; immediate modal closing on cancellation.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Component Standard**: Uses existing Shadcn components (Dialog, Input) ensuring design consistency.
- **API Standard**: Integrates seamlessly with the pre-existing backend REST architecture for updates.

## Project Structure

### Documentation (this feature)

```text
specs/006-lead-editing/
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
│   ├── components/
│   │   ├── ui/
│   │   │   ├── dialog.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── label.tsx
│   │   └── views/
│   │       ├── EditLeadModal.tsx   # NEW
│   │       ├── LeadDetails.tsx     # MODIFIED
│   │       └── MasterDetailView.tsx # MODIFIED
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
