# Research Findings: Lead Intake API

## Decision 1: ENUM Enforcement
- **Decision**: Use PostgreSQL ENUMs (`CREATE TYPE ... AS ENUM`).
- **Rationale**: The user explicitly requested enforcing ENUMs at the database level for data integrity rather than relying solely on the application layer.
- **Alternatives considered**: Enforcing only via TypeScript/Zod while keeping DB columns as `TEXT`.

## Decision 2: Validation Library
- **Decision**: Zod.
- **Rationale**: Zod provides excellent TypeScript inference, ensuring that runtime validation maps perfectly to compile-time types.
- **Alternatives considered**: Joi, express-validator.

## Decision 3: Audit Trail Implementation
- **Decision**: Node.js application layer using PostgreSQL transactions.
- **Rationale**: Easier to maintain, explicitly visible in the codebase, and allows passing application context (like the Actor) into the audit log easily.
- **Alternatives considered**: PostgreSQL Triggers.

## Decision 4: Webhook Customer Matching
- **Decision**: Match by `Email`.
- **Rationale**: The `Customer` table has a `UNIQUE` constraint on `Email`.
- **Alternatives considered**: Matching by phone number or ID.
