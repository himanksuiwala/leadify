import { query } from '../db';
import crypto from 'crypto';

export const getOrCreateCustomer = async (
  email: string,
  firstName: string,
  lastName: string,
  phone?: string
) => {
  // Try to find existing customer
  const existing = await query('SELECT "CustomerID" FROM "Customer" WHERE "Email" = $1', [email]);
  if (existing.rows.length > 0) {
    return existing.rows[0].CustomerID as string;
  }

  // Create new customer
  const newId = crypto.randomUUID();
  await query(
    'INSERT INTO "Customer" ("CustomerID", "FirstName", "LastName", "Email", "Phone") VALUES ($1, $2, $3, $4, $5)',
    [newId, firstName, lastName, email, phone || null]
  );
  return newId;
};
