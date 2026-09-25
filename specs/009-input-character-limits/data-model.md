# Data Model & Interfaces: Input Character Limits

## Database Schema Changes (in `seed.ts`)

### `User` Table
- `FirstName`: `VARCHAR(30)`
- `LastName`: `VARCHAR(30)`
- `Email`: `VARCHAR(100)`

### `Customer` Table
- `FirstName`: `VARCHAR(30)`
- `LastName`: `VARCHAR(30)`
- `Email`: `VARCHAR(100)`
- `Phone`: `VARCHAR(15)`

### `Lead` Table
- `Source`: `VARCHAR(30)`
- `Topic`: `VARCHAR(50)`
- `Message`: `VARCHAR(500)`

## API Contract Adjustments

Payloads exceeding the `max` length bounds for `POST /webhook/meta-lead` and `PATCH /leads/:id` will now receive a standard 400 Bad Request error from the Zod validation middleware with a `details` array describing the length violation.
