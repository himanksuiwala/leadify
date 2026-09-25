# Research & Decisions: Mock Webhook Simulator

## Technical Context

We need to build a new route `/mock-webhook` to test the backend API `POST /webhook/meta-lead`.

## Findings & Decisions

### 1. Webhook API Schema & Payload
- **Finding**: According to `backend/src/validators/lead.ts`, the backend endpoint strictly requires `firstName`, `lastName`, `email`, `source`, `topic`, and `message`. `phone` is optional.
- **Decision**: The React form in `/mock-webhook` will use HTML5 `required` attributes (or manual state validation) for all the required fields. `source` will be permanently hardcoded to "Meta Ads" in the payload and shown as disabled or just hidden in the form.

### 2. Frontend Routing
- **Finding**: The application uses React Router in `frontend/src/App.tsx`.
- **Decision**: We will add a new `<Route path="/mock-webhook" element={<MockWebhookView />} />` to `App.tsx`. 

### 3. Header Link and Navigation
- **Finding**: The user requested a button in the top-right of the header with a tilted arrow.
- **Decision**: We will use the `ArrowUpRight` or `ExternalLink` icon from Lucide React inside `AppNavbar.tsx`. The button will be an `<a>` tag with `target="_blank"` styled as a Shadcn Button.

### 4. Refreshing the Lead List
- **Finding**: The user wants a reload button on the Lead List.
- **Decision**: We will add a `RefreshCw` icon button next to the Status filter in `LeadList.tsx`. Clicking it will manually trigger `fetchLeads()` by incrementing the existing `refreshCounter`.
