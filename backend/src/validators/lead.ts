import { z } from 'zod';

export const WebhookLeadSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(30, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(30, "Last name is too long"),
  email: z.string().email("Invalid email format").max(100, "Email is too long"),
  phone: z.string().max(15, "Phone is too long").optional(),
  source: z.string().min(1, "Source is required").max(30, "Source is too long"),
  topic: z.string().min(1, "Topic is required").max(50, "Topic is too long"),
  message: z.string().min(1, "Message is required").max(500, "Message is too long"),
});

export const UpdateStatusSchema = z.object({
  status: z.enum(['New', 'Qualified', 'Converted', 'Dead'])
});

export const UpdateLeadSchema = z.object({
  firstName: z.string().max(30, "First name is too long").optional(),
  lastName: z.string().max(30, "Last name is too long").optional(),
  phone: z.string().max(15, "Phone is too long").optional(),
  source: z.string().max(30, "Source is too long").optional(),
  topic: z.string().max(50, "Topic is too long").optional(),
  message: z.string().max(500, "Message is too long").optional(),
});
