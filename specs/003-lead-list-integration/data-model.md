# Data Model: Lead List Integration

## Frontend State Model (`MasterDetailView` or `LeadList`)

- `leads`: `Lead[]` - The accumulated list of fetched leads.
- `page`: `number` - Current page number for pagination.
- `hasMore`: `boolean` - Whether there are more pages to fetch.
- `isLoading`: `boolean` - Indicates if a network request is currently in flight.
- `statusFilter`: `string | null` - The currently selected status filter (e.g., "New", "Qualified").
- `sortOrder`: `string` - The currently selected sort order (e.g., `date_desc`, `date_asc`, `name_asc`, `status`).

## API Data Transfer Object (Lead)
This represents the shape of the data returned by the `/leads` API for each item in the list:
- `LeadID`: string (UUID)
- `FirstName`: string
- `LastName`: string
- `Topic`: string
- `Status`: string (ENUM: 'New', 'Contacted', 'Qualified', 'Lost')
- `Source`: string
- `Message`: string
- `Timestamp`: string (ISO 8601 Date String)
- `Email`: string (Secondary info from Customer table)
