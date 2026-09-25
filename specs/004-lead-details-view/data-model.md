# Data Model: Lead Details View

## Frontend State Model (`LeadDetails`)

- `leadData`: `DetailedLead | null` - The data fetched from the API for the currently selected lead.
- `isLoading`: `boolean` - Indicates if the details request is in flight.
- `error`: `string | null` - Any error message encountered during fetching.

## `DetailedLead` Interface
Maps to the response payload from `GET /leads/:id`:
- `LeadID`: string
- `Topic`: string
- `Status`: string (ENUM)
- `Source`: string
- `Message`: string
- `Timestamp`: string
- `Customer`: Object
  - `CustomerID`: string
  - `FirstName`: string
  - `LastName`: string
  - `Email`: string
  - `Phone`: string | null
