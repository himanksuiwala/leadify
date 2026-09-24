import { query, pool } from '../db';
import crypto from 'crypto';

export const createLeadWithAudit = async (
  customerId: string,
  source: string,
  topic: string,
  message: string,
  actorId: string
) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const leadId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    await client.query(
      'INSERT INTO "Lead" ("LeadID", "CustomerID", "Source", "Topic", "Message", "Status", "Timestamp") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [leadId, customerId, source, topic, message, 'New', timestamp]
    );

    const auditId = crypto.randomUUID();
    await client.query(
      'INSERT INTO "Audit" ("AuditID", "LeadID", "Action", "ActorID", "Comment", "Timestamp") VALUES ($1, $2, $3, $4, $5, $6)',
      [auditId, leadId, 'Created', actorId, 'Lead created via webhook', timestamp]
    );

    await client.query('COMMIT');
    return leadId;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const getLeads = async (page: number, limit: number, status?: string, sort?: string) => {
  const offset = (page - 1) * limit;
  const params: any[] = [];
  let whereClause = '';
  
  if (status) {
    whereClause = `WHERE l."Status" = $1`;
    params.push(status);
  }

  let orderByClause = 'ORDER BY l."Timestamp" DESC'; // default date_desc
  if (sort === 'date_asc') {
    orderByClause = 'ORDER BY l."Timestamp" ASC';
  } else if (sort === 'name_asc') {
    orderByClause = 'ORDER BY c."FirstName" ASC, c."LastName" ASC';
  } else if (sort === 'status') {
    orderByClause = `
      ORDER BY CASE l."Status"
        WHEN 'New' THEN 1
        WHEN 'Qualified' THEN 2
        WHEN 'Converted' THEN 3
        WHEN 'Dead' THEN 4
        ELSE 5
      END ASC, l."Timestamp" DESC
    `;
  }

  params.push(limit);
  const limitIdx = params.length;
  params.push(offset);
  const offsetIdx = params.length;

  const result = await query(`
    SELECT l.*, c."FirstName", c."LastName", c."Email"
    FROM "Lead" l
    JOIN "Customer" c ON l."CustomerID" = c."CustomerID"
    ${whereClause}
    ${orderByClause}
    LIMIT $${limitIdx} OFFSET $${offsetIdx}
  `, params);

  const countQuery = status 
    ? { text: 'SELECT COUNT(*) FROM "Lead" l WHERE l."Status" = $1', values: [status] }
    : { text: 'SELECT COUNT(*) FROM "Lead" l', values: [] };

  const countResult = await query(countQuery.text, countQuery.values);
  return {
    data: result.rows,
    total: parseInt(countResult.rows[0].count, 10)
  };
};

export const getLeadDetails = async (leadId: string) => {
  const leadResult = await query(`
    SELECT l.*, 
           c."CustomerID" as "Cust_ID", c."FirstName", c."LastName", c."Email", c."Phone"
    FROM "Lead" l
    JOIN "Customer" c ON l."CustomerID" = c."CustomerID"
    WHERE l."LeadID" = $1
  `, [leadId]);

  if (leadResult.rows.length === 0) return null;

  const leadRow = leadResult.rows[0];
  const auditResult = await query(`
    SELECT a.*, u."FirstName" as "UserFirstName", u."LastName" as "UserLastName"
    FROM "Audit" a
    LEFT JOIN "User" u ON a."ActorID" = u."UserID"
    WHERE a."LeadID" = $1
    ORDER BY a."Timestamp" DESC
  `, [leadId]);

  const customer = {
    CustomerID: leadRow.Cust_ID,
    FirstName: leadRow.FirstName,
    LastName: leadRow.LastName,
    Email: leadRow.Email,
    Phone: leadRow.Phone
  };

  // Clean up lead object by removing customer fields
  delete leadRow.Cust_ID;
  delete leadRow.FirstName;
  delete leadRow.LastName;
  delete leadRow.Email;
  delete leadRow.Phone;

  return {
    ...leadRow,
    Customer: customer,
    Audits: auditResult.rows.map(row => {
      const { UserFirstName, UserLastName, ...audit } = row;
      return {
        ...audit,
        User: UserFirstName ? { FirstName: UserFirstName, LastName: UserLastName } : null
      };
    })
  };
};

export const updateLeadStatus = async (leadId: string, status: string, actorId: string) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const timestamp = new Date().toISOString();

    const updateRes = await client.query(
      'UPDATE "Lead" SET "Status" = $1 WHERE "LeadID" = $2 RETURNING "LeadID"',
      [status, leadId]
    );

    if (updateRes.rows.length === 0) {
      throw new Error('Lead not found');
    }

    const auditId = crypto.randomUUID();
    await client.query(
      'INSERT INTO "Audit" ("AuditID", "LeadID", "Action", "ActorID", "Comment", "Timestamp") VALUES ($1, $2, $3, $4, $5, $6)',
      [auditId, leadId, 'Status Changed', actorId, `Status changed to ${status}`, timestamp]
    );

    await client.query('COMMIT');
    return true;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const updateLeadDetails = async (
  leadId: string, 
  updates: { firstName?: string, lastName?: string, phone?: string, source?: string, topic?: string, message?: string },
  actorId: string
) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Update Customer if needed
    if (updates.firstName || updates.lastName || updates.phone) {
      const leadRes = await client.query('SELECT "CustomerID" FROM "Lead" WHERE "LeadID" = $1', [leadId]);
      if (leadRes.rows.length === 0) throw new Error('Lead not found');
      const customerId = leadRes.rows[0].CustomerID;

      const setParams = [];
      const values = [];
      let idx = 1;
      if (updates.firstName) { setParams.push(`"FirstName" = $${idx++}`); values.push(updates.firstName); }
      if (updates.lastName) { setParams.push(`"LastName" = $${idx++}`); values.push(updates.lastName); }
      if (updates.phone) { setParams.push(`"Phone" = $${idx++}`); values.push(updates.phone); }
      
      if (setParams.length > 0) {
        values.push(customerId);
        await client.query(`UPDATE "Customer" SET ${setParams.join(', ')} WHERE "CustomerID" = $${idx}`, values);
      }
    }

    // 2. Update Lead if needed
    if (updates.source || updates.topic || updates.message) {
      const setParams = [];
      const values = [];
      let idx = 1;
      if (updates.source) { setParams.push(`"Source" = $${idx++}`); values.push(updates.source); }
      if (updates.topic) { setParams.push(`"Topic" = $${idx++}`); values.push(updates.topic); }
      if (updates.message) { setParams.push(`"Message" = $${idx++}`); values.push(updates.message); }

      if (setParams.length > 0) {
        values.push(leadId);
        await client.query(`UPDATE "Lead" SET ${setParams.join(', ')} WHERE "LeadID" = $${idx}`, values);
      }
    }

    // 3. Create Audit
    const timestamp = new Date().toISOString();
    const auditId = crypto.randomUUID();
    await client.query(
      'INSERT INTO "Audit" ("AuditID", "LeadID", "Action", "ActorID", "Comment", "Timestamp") VALUES ($1, $2, $3, $4, $5, $6)',
      [auditId, leadId, 'Updated', actorId, 'Lead details updated', timestamp]
    );

    await client.query('COMMIT');
    return true;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};
