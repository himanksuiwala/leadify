# Research: Lead Details View

## Sticky Contact Card Header
- **Decision**: Use Tailwind's `sticky top-0 z-10 bg-white` utility classes on the contact card wrapper.
- **Rationale**: This allows the lead's name and quick action buttons to remain visible even if the message content overflows the vertical space. 

## Action Buttons
- **Decision**: Utilize Shadcn UI's `Button` component with Lucide React icons (`Phone`, `Mail`, `MessageSquare`).
- **Rationale**: Provides consistent styling with the rest of the application. The buttons will just have a generic hover state and won't execute actual intents.

## Data Fetching
- **Decision**: Fetch details using a `useEffect` hook whenever `selectedItemId` changes. Use an AbortController to cancel stale requests if the user clicks through leads quickly.
- **Rationale**: Standard React pattern for dependent data fetching without external libraries.
