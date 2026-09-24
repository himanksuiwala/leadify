import { Router } from 'express';
import { validate, validateQuery } from '../middleware/validate';
import { PaginationQuerySchema } from '../validators/query';
import { UpdateLeadSchema, UpdateStatusSchema } from '../validators/lead';
import { getLeads, getLeadDetails, updateLeadStatus, updateLeadDetails } from '../services/lead';
import { sendSuccess } from '../utils/response';

export const leadsRouter = Router();

// GET /leads
leadsRouter.get('/', async (req, res, next) => {
  try {
    const { page, limit, status, sort } = await PaginationQuerySchema.parseAsync(req.query);

    const { data, total } = await getLeads(page, limit, status, sort);
    
    sendSuccess(res, data, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    next(err);
  }
});

// GET /leads/:id
leadsRouter.get('/:id', async (req, res, next) => {
  try {
    const lead = await getLeadDetails(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    sendSuccess(res, lead);
  } catch (err) {
    next(err);
  }
});

// PATCH /leads/:id/status
leadsRouter.patch('/:id/status', validate(UpdateStatusSchema), async (req, res, next) => {
  try {
    await updateLeadStatus(req.params.id as string, req.body.status, 'Sales Agent');
    sendSuccess(res, { success: true });
  } catch (err) {
    if (err instanceof Error && err.message === 'Lead not found') {
      return res.status(404).json({ error: 'Lead not found' });
    }
    next(err);
  }
});

// PATCH /leads/:id
leadsRouter.patch('/:id', validate(UpdateLeadSchema), async (req, res, next) => {
  try {
    await updateLeadDetails(req.params.id as string, req.body, 'Sales Agent');
    sendSuccess(res, { success: true });
  } catch (err) {
    if (err instanceof Error && err.message === 'Lead not found') {
      return res.status(404).json({ error: 'Lead not found' });
    }
    next(err);
  }
});
