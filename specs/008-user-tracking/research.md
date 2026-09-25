# Research & Decisions: User Tracking

## 1. Mocking Authentication
**Decision**: Since there is no auth system, the backend routes (`routes/leads.ts`) will fetch the first available user from the new `User` table (e.g., `SELECT "UserID" FROM "User" LIMIT 1`) and use their ID as the `ActorID` for all operations. This avoids hardcoding a UUID in the source code while still properly utilizing the relational integrity of the database.

## 2. Handling System Webhooks
**Decision**: For `POST /webhook/meta-lead`, we will pass `null` for `ActorID` (or leave it empty) in the `Lead` assignment, but for the `Audit` log, we will define a convention: if `ActorID` is NULL, we can use the `Actor` string column for "System Webhook". Wait, the `Audit` table's `Actor` column is currently a `TEXT`. Should we drop it and replace it with `ActorID`? 
If we replace it with `ActorID (UUID)`, what do we do about webhooks? 
**Alternative**: 
1. The `Audit` table keeps `Actor` (TEXT) for system actions and adds `ActorID` (UUID) for user actions. 
2. We create a "System Webhook" user in the `User` table.

**Final Decision**: We will create a dedicated "System Webhook" user in the `User` table during seeding. This maintains strict referential integrity for *all* logs. The webhook route will fetch this specific System User's ID to record the action. Wait, no. The user specifically said "withe generic message/comment like "Lead created via webhook" like but we need to make sure that this is consitent across." 
Let's keep it simple: Add `ActorID (UUID REFERENCES "User")` to `Audit`. Create a "System" user in the DB during seeding.

## 3. Database Migration / Seeding
**Decision**: We will wipe and reseed the DB. The `seed.ts` script will be updated to:
1. Create `User` table.
2. Insert a default user ("Aman Rawat", "aman@example.com").
3. Insert a system user ("System", "Webhook", "system@webhook.local").
4. Alter `Lead` to have `AssignedTo UUID REFERENCES "User"`.
5. Alter `Audit` to replace `Actor TEXT` with `ActorID UUID REFERENCES "User"`.
6. Map the audit CSV's "Sales Agent" to Aman Rawat's UUID, and "Meta Webhook" to the System UUID.
