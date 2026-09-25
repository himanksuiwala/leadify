# Data Model & Interfaces: Mock Webhook Simulator

## Component Interfaces

### MockWebhookView Component
A new full-page React component: `MockWebhookView.tsx`.

**State**:
- Form state object tracking: `firstName`, `lastName`, `email`, `phone`, `topic`, `message`.
- `isSubmitting` boolean.

**Integration**:
```http
POST /webhook/meta-lead
Content-Type: application/json

{
  "firstName": "string (Required)",
  "lastName": "string (Required)",
  "email": "string (Required, Email format)",
  "phone": "string (Optional)",
  "source": "Meta Ads",
  "topic": "string (Required)",
  "message": "string (Required)"
}
```

### AppNavbar Component
Updated to contain a new external link button in the right-side actions div.

### LeadList Component
Updated to include a `RefreshCw` icon button that triggers a refetch of the leads API.
