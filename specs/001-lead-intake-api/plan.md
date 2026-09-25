# Implementation Plan: Lead Intake API

**Branch**: `001-lead-intake-api` | **Date**: 2026-09-24 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-lead-intake-api/spec.md`

## Summary

Implement robust REST API endpoints in the Express backend using Zod validation and PostgreSQL transactions to ingest leads, manage status updates, and auto-generate audit logs with strictly enforced DB ENUMs.

## Technical Context

**Language/Version**: Node.js (TypeScript)

**Primary Dependencies**: Express.js, Zod, pg (PostgreSQL client)

**Storage**: PostgreSQL

**Testing**: On-Demand (No tests required by default per constitution)

**Target Platform**: Dockerized Linux Server

**Project Type**: Web Service API (Backend)

**Performance Goals**: N/A (Standard REST performance)

**Constraints**: Must strictly use Database ENUMs; Audits must be generated inside SQL Transactions.

**Scale/Scope**: 5 endpoints

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **On-Demand Testing**: Compliant (no automated tests are prescribed).
- **Modern and Quality TypeScript**: Compliant (using TypeScript, Zod, and modular Express routes).

## Project Structure

### Documentation (this feature)

```text
specs/001-lead-intake-api/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (to be generated)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── index.ts        # Express entry point
│   ├── db.ts           # PostgreSQL client
│   ├── seed.ts         # Updated to enforce DB ENUMs
│   └── routes/         # Express API routes
```

**Structure Decision**: Selected Option 2 (Web application) because the backend code resides exclusively in the `backend/` directory.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*No violations.*
