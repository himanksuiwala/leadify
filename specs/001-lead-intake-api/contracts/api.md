# API Contracts

## Standard Response Envelope

```typescript
type ApiResponse<T> = {
  data: T;
  meta?: Record<string, any>;
};
```

## 1. POST /webhook/meta-lead

**Payload Schema (Zod)**
```typescript
const WebhookLeadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  source: z.string(),
  topic: z.string(),
  message: z.string(),
});
```
**Response**: `201 Created`

## 2. GET /leads

**Query Parameters**
- `page`: number (default 1)
- `limit`: number (default 20)

**Response**: `200 OK`
```typescript
type LeadsResponse = ApiResponse<Array<{
  LeadID: string;
  Source: string;
  Topic: string;
  Message: string;
  Status: 'New' | 'Qualified' | 'Converted' | 'Dead';
  Timestamp: string;
  Customer: {
    FirstName: string;
    LastName: string;
    Email: string;
  }
}>>;
```

## 3. GET /leads/:id

**Response**: `200 OK`
```typescript
type LeadDetailResponse = ApiResponse<{
  LeadID: string;
  Source: string;
  Topic: string;
  Message: string;
  Status: string;
  Timestamp: string;
  Customer: {
    CustomerID: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone?: string;
  };
  Audits: Array<{
    AuditID: string;
    Action: 'Created' | 'Updated' | 'Status Changed';
    Actor: string;
    Comment: string;
    Timestamp: string;
  }>;
}>;
```

## 4. PATCH /leads/:id/status

**Payload Schema (Zod)**
```typescript
const UpdateStatusSchema = z.object({
  status: z.enum(['New', 'Qualified', 'Converted', 'Dead'])
});
```
**Response**: `200 OK`

## 5. PATCH /leads/:id

**Payload Schema (Zod)**
```typescript
const UpdateLeadSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
  topic: z.string().optional(),
  message: z.string().optional(),
});
```
**Response**: `200 OK`
