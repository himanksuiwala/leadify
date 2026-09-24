import { z } from 'zod';

export const WebhookLeadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  source: z.string().min(1, "Source is required"),
  topic: z.string().min(1, "Topic is required"),
  message: z.string().min(1, "Message is required"),
});

export const UpdateStatusSchema = z.object({
  status: z.enum(['New', 'Qualified', 'Converted', 'Dead'])
});

export const UpdateLeadSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
  topic: z.string().optional(),
  message: z.string().optional(),
});
