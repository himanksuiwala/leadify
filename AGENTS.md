# AI Development and Workflow Documentation

I developed this project using a **Spec-Driven Development (SDD)** methodology, heavily assisted by **Google Gemini** acting as my primary AI coding assistant throughout the entire software lifecycle. 

There are no major sections of this codebase authored entirely manually. Instead, my effort was focused on directing the AI, defining requirements, reviewing outputs, and finalizing architectural decisions.

---

## 1. AI Development Tools

* **Google Gemini**: Served as my primary AI pair programmer.
* **Usage Scope**:
  * **Architecture & Scaffolding**: Generating the initial monolithic `Dockerfile`, `supervisord.conf`, and project structure.
  * **Specification**: Drafting and refining feature specifications (`spec.md`, `plan.md`, `tasks.md`).
  * **Implementation (Coding)**: Writing frontend components (React/Vite) and backend services (Node.js/Express).
  * **Debugging**: Resolving Docker networking issues and database transaction errors.
  * **Documentation**: Generating architecture diagrams (`db_schema.mermaid`), API documentation, and README instructions based on the final implementation.

## 2. Development Workflow

I followed a strict **Spec-Driven Development (SDD)** workflow for this project, managed via directories under `specs/` (e.g., `001-lead-intake-api`, `002-frontend-canvas-layout`). 

The flow followed this sequence:
`Requirements → Specification → Iterative Refinement → Implementation → Validation → Documentation`

1. **Requirements**: I provided a high-level prompt or goal (e.g., "Build a lead intake API with Zod validation").
2. **Specification**: Gemini generated a comprehensive `spec.md` containing Acceptance Scenarios and User Stories.
3. **Iterative Refinement**: I discussed edge cases with Gemini (e.g., handling duplicate emails), finalized the data model, and created an implementation `plan.md`.
4. **Implementation**: Gemini executed the plan step-by-step using a generated `tasks.md` checklist.
5. **Validation**: I validated the application behavior locally against the acceptance scenarios.
6. **Documentation**: Gemini read the finalized codebase to produce accurate artifacts (like `README.md`).

## 3. Prompting Approach

I structured my prompts to be highly contextual, guiding the AI through specific phases rather than asking for the entire application at once. 

Representative prompt categories I used included:

* **Project Scaffolding**: 
  * *"Set up a monolithic Dockerfile that installs PostgreSQL, Node 20, builds a Vite frontend, and runs both via Supervisor."*
* **Requirement/Specification Creation**: 
  * *"Implement lead intake service API endpoints as per api_handoff.md with Zod validation, pg transactions for audit, and DB enums."*
* **Specification Refinement**: 
  * *"Update the schema diagram so that the User table is included and the Audit table uses an ActorID foreign key instead of a string."*
* **Feature Implementation**: 
  * *"Execute the tasks defined in specs/004-lead-details-view/tasks.md."*
* **Code Review/Refactoring**: 
  * *"Change the architecture flowchart from TD (vertical) to LR (horizontal) to save space."*

## 4. AI-Generated Content

The vast majority of the code and text in this repository was generated or heavily modified by Gemini. Specific AI-generated artifacts include:

* **Project Scaffolding**: `Dockerfile`, `.dockerignore`, `entrypoint.sh`, `supervisord.conf`.
* **Feature Implementations**: All REST API routes (`backend/src/routes`), database services (`backend/src/services`), and React UI components (`frontend/src/components/views`).
* **Database Management**: The `seed.ts` script for dropping, creating, and seeding PostgreSQL tables.
* **Specifications**: All Markdown files located inside my `specs/` directory branches.
* **Documentation**: `README.md`, `db_schema.mermaid`, `api-examples.md`.

## 5. Human-Written / Human-Owned Work

While the AI wrote the code, I retained absolute ownership over the system's design and behavior. There were no major sections written entirely manually. My involvement consisted of:

* **Defining requirements**: Establishing the core business logic, such as prioritizing a Meta webhook integration.
* **Creating/refining specifications**: Reviewing Gemini's proposed data models and forcing adjustments (e.g., ensuring Audit tables tracked specific actor IDs).
* **Reviewing AI-generated output**: Auditing the frontend UI for usability and the backend for transaction safety.
* **Validating behavior**: Manually testing the Docker container and local dev environment to ensure setup instructions were accurate.
* **Making final architecture decisions**: Deciding to stick with a monolithic Docker container for simplicity rather than over-engineering a `docker-compose` setup too early.

## 6. Architecture Decisions

I actively chose the following architectural decisions to keep the system simple, maintainable, and aligned with the initial requirements:

* **Monolithic Containerization**: The database, backend API, and frontend static files are all bundled into a single Docker image using Supervisor. This trades horizontal scalability for extreme deployment simplicity (one `docker run` command).
* **Static Asset Serving**: Instead of deploying a separate Nginx container or CDN, the Node.js Express backend serves the pre-built React (Vite) files. 
* **Database Integrity**: Utilizing PostgreSQL UUIDs for all primary keys, strong foreign key constraints, and ENUMs (`lead_status`, `audit_action`) to prevent dirty data at the database level.
* **Centralized Validation**: All API inputs are strictly validated at runtime using `Zod` middleware before they reach the database services.
* **Data Flow**: The frontend fetches data via a REST API. External integrations push data synchronously via a Webhook endpoint (`/webhook/meta-lead`), which handles Customer creation, Lead insertion, and Audit logging in a single database transaction.
