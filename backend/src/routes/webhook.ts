import { Router } from 'express';
import { validate } from '../middleware/validate';
import { WebhookLeadSchema } from '../validators/lead';
import { getOrCreateCustomer } from '../services/customer';
import { createLeadWithAudit } from '../services/lead';
import { sendSuccess } from '../utils/response';
import { query } from '../db';

export const webhookRouter = Router();

const getSystemActorId = async () => {
  const result = await query(`SELECT "UserID" FROM "User" WHERE "FirstName" = 'System' LIMIT 1`);
  if (result.rows.length === 0) throw new Error('No system user found');
  return result.rows[0].UserID;
};

webhookRouter.post('/meta-lead', validate(WebhookLeadSchema), async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, source, topic, message } = req.body;
    
    // 1. Get or create customer
    const customerId = await getOrCreateCustomer(email, firstName, lastName, phone);
    
    // 2. Create lead and audit transactionally
    const systemId = await getSystemActorId();
    const leadId = await createLeadWithAudit(customerId, source, topic, message, systemId);
    
    sendSuccess(res, { leadId }, undefined, 201);
  } catch (err) {
    next(err);
  }
});
