# Validation Guide: Input Character Limits

## End-to-End Validation Scenario

1. **Re-seed the Database**:
   - Stop backend/docker.
   - Re-run the `seed.ts` script to rebuild the schema with `VARCHAR(n)` columns.
   - Start backend.

2. **Test Frontend Input Constraints**:
   - Open the Mock Webhook page (`/mock-webhook`).
   - Try typing more than 30 characters in the First Name field.
   - **Expected**: The input simply stops accepting characters at 30.

3. **Test API Constraints**:
   - Make a direct cURL `PATCH /leads/:id` with a `message` exceeding 500 characters.
   - **Expected**: API returns 400 Bad Request with a Zod validation error about `message`.

4. **Test UI Truncation**:
   - Submit a lead with exactly a 500-character message (e.g. "A" repeated 500 times).
   - View the Lead in the Lead List and Lead Details pages.
   - **Expected**: The message cell/block is truncated with `...` and does not break the layout.
   - **Expected**: Hovering over the truncated text displays a standard Tooltip containing the full string.
