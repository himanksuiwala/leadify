import { z } from 'zod';

export const PaginationQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default(1 as any),
  limit: z.string().regex(/^\d+$/).transform(Number).default(20 as any),
});
