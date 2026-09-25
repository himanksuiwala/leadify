# Implementation Plan: User Tracking & Audit Consistency

**Branch**: `008-user-tracking` | **Date**: 2026-09-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/008-user-tracking/spec.md`

## Summary

Introduce an internal `User` table to standardise audit trails. Transition `Audit` and `Lead` tables to use relational foreign keys for acting users, and replace hardcoded "Sales Agent" strings with a real user identity. Unify webhook logging to consistently state "System Webhook". The DB seed script will be overhauled to scaffold this new identity structure.

## Technical Context

**Language/Version**: TypeScript, Node.js, React

**Primary Dependencies**: PostgreSQL (via `pg`), Express, React Router

**Storage**: PostgreSQL

**Testing**: Standard local manual validation

**Target Platform**: Web browsers

**Project Type**: Full-stack Web Application

**Performance Goals**: N/A

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Database Standard**: All tables must have a primary key (UUID) and maintain strong referential integrity (foreign keys).

## Project Structure

### Documentation (this feature)

```text
specs/008-user-tracking/
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
│   ├── db/
│   │   └── schema/ (Implicitly inside seed.ts)
│   ├── seed.ts                   # MODIFIED (Add User table, alter logic)
│   ├── routes/
│   │   ├── leads.ts              # MODIFIED (Remove 'Sales Agent')
│   │   └── webhook.ts            # MODIFIED (Use 'System Webhook')
│   └── services/
│       └── lead.ts               # MODIFIED (Update SQL queries to handle UUID)

frontend/
├── src/
│   ├── components/
│   │   └── views/
│   │       ├── LeadDetails.tsx   # MODIFIED (Render User Name)
│   │       └── MasterDetailView.tsx
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
