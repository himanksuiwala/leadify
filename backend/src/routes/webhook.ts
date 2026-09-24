import { Router } from 'express';
import { validate } from '../middleware/validate';
import { WebhookLeadSchema } from '../validators/lead';
import { getOrCreateCustomer } from '../services/customer';
import { createLeadWithAudit } from '../services/lead';
import { sendSuccess } from '../utils/response';

export const webhookRouter = Router();

webhookRouter.post('/meta-lead', validate(WebhookLeadSchema), async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, source, topic, message } = req.body;
    
    // 1. Get or create customer
    const customerId = await getOrCreateCustomer(email, firstName, lastName, phone);
    
    // 2. Create lead and audit transactionally
    const leadId = await createLeadWithAudit(customerId, source, topic, message, 'Meta Webhook');
    
    sendSuccess(res, { leadId }, undefined, 201);
  } catch (err) {
    next(err);
  }
});
