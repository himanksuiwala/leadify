# Implementation Plan: Input Character Limits

**Branch**: `009-input-character-limits` | **Date**: 2026-09-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/009-input-character-limits/spec.md`

## Summary

Enforce text character limits (First/Last Name, Source, Topic, Message, Email, Phone) across the PostgreSQL database schema (using `VARCHAR(n)`), the backend Express validation layer (Zod), and frontend React inputs (`maxLength`). Update UI to handle long texts gracefully using CSS ellipsis and hover tooltips.

## Technical Context

**Language/Version**: TypeScript, Node.js, React

**Primary Dependencies**: PostgreSQL, Express, Zod, Radix/Shadcn UI (for Tooltips)

**Storage**: PostgreSQL

**Testing**: Standard local manual validation

**Target Platform**: Web browsers

**Project Type**: Full-stack Web Application

**Performance Goals**: N/A

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Database Standard**: Use appropriate datatypes (e.g., VARCHAR(n)) to prevent unbounded storage unless strictly necessary.

## Project Structure

### Documentation (this feature)

```text
specs/009-input-character-limits/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (pending)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── seed.ts                   # MODIFIED (Change TEXT to VARCHAR)
│   └── validators/
│       └── lead.ts               # MODIFIED (Add .max(n) to Zod schemas)

frontend/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── tooltip.tsx       # ADDED/VERIFIED (Shadcn Tooltip)
│   │   └── views/
│   │       ├── EditLeadModal.tsx # MODIFIED (Add maxLength to inputs)
│   │       ├── MockWebhookView.tsx # MODIFIED (Add maxLength to inputs)
│   │       ├── LeadDetails.tsx   # MODIFIED (Add truncation and tooltip)
│   │       └── LeadList.tsx      # MODIFIED (Add truncation to columns)
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
