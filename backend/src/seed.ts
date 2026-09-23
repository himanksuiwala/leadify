import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import crypto from 'crypto';
import { query } from './db';

const SEED_DIR = path.join(__dirname, '../../seed');

async function seed() {
  console.log('Starting seed process...');

  try {
    // 1. Drop and create tables
    console.log('Dropping existing tables...');
    await query(`
      DROP TABLE IF EXISTS "Audit" CASCADE;
      DROP TABLE IF EXISTS "Lead" CASCADE;
      DROP TABLE IF EXISTS "Customer" CASCADE;
    `);

    console.log('Creating tables...');
    await query(`
      CREATE TABLE "Customer" (
        "CustomerID" UUID PRIMARY KEY,
        "FirstName" TEXT NOT NULL,
        "LastName" TEXT NOT NULL,
        "Email" TEXT UNIQUE NOT NULL,
        "Phone" TEXT
      );

      CREATE TABLE "Lead" (
        "LeadID" UUID PRIMARY KEY,
        "CustomerID" UUID NOT NULL REFERENCES "Customer"("CustomerID") ON DELETE CASCADE,
        "Source" TEXT,
        "Topic" TEXT,
        "Message" TEXT,
        "Status" TEXT,
        "Timestamp" TIMESTAMP
      );

      CREATE TABLE "Audit" (
        "AuditID" UUID PRIMARY KEY,
        "LeadID" UUID NOT NULL REFERENCES "Lead"("LeadID") ON DELETE CASCADE,
        "Action" TEXT,
        "Actor" TEXT,
        "Comment" TEXT,
        "Timestamp" TIMESTAMP
      );
    `);
    console.log('Tables created successfully.');

    // 2. Read CSVs
    const customersCsv = fs.readFileSync(path.join(SEED_DIR, 'customers.csv'), 'utf8');
    const leadsCsv = fs.readFileSync(path.join(SEED_DIR, 'leads.csv'), 'utf8');
    const auditCsv = fs.readFileSync(path.join(SEED_DIR, 'audit.csv'), 'utf8');

    const customersData: any[] = parse(customersCsv, { columns: true, skip_empty_lines: true });
    const leadsData: any[] = parse(leadsCsv, { columns: true, skip_empty_lines: true });
    const auditData: any[] = parse(auditCsv, { columns: true, skip_empty_lines: true });

    // 3. Mapping Maps for old ID -> new UUID
    const customerIdMap = new Map<string, string>();
    const leadIdMap = new Map<string, string>();

    // 4. Insert Customers
    console.log('Inserting customers...');
    for (const row of customersData) {
      const newId = crypto.randomUUID();
      customerIdMap.set(row.CustomerID, newId);
      
      await query(
        `INSERT INTO "Customer" ("CustomerID", "FirstName", "LastName", "Email", "Phone") VALUES ($1, $2, $3, $4, $5)`,
        [newId, row.FirstName, row.LastName, row.Email, row.Phone]
      );
    }
    console.log(`Inserted ${customersData.length} customers.`);

    // 5. Insert Leads
    console.log('Inserting leads...');
    for (const row of leadsData) {
      const newId = crypto.randomUUID();
      leadIdMap.set(row.LeadID, newId);
      const newCustomerId = customerIdMap.get(row.CustomerID);

      if (!newCustomerId) throw new Error(`Customer ID ${row.CustomerID} not found in map.`);

      await query(
        `INSERT INTO "Lead" ("LeadID", "CustomerID", "Source", "Topic", "Message", "Status", "Timestamp") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [newId, newCustomerId, row.Source, row.Topic, row.Message, row.Status, row.Timestamp]
      );
    }
    console.log(`Inserted ${leadsData.length} leads.`);

    // 6. Insert Audits
    console.log('Inserting audits...');
    for (const row of auditData) {
      const newId = crypto.randomUUID();
      const newLeadId = leadIdMap.get(row.LeadID);

      if (!newLeadId) throw new Error(`Lead ID ${row.LeadID} not found in map.`);

      await query(
        `INSERT INTO "Audit" ("AuditID", "LeadID", "Action", "Actor", "Comment", "Timestamp") VALUES ($1, $2, $3, $4, $5, $6)`,
        [newId, newLeadId, row.Action, row.Actor, row.Comment, row.Timestamp]
      );
    }
    console.log(`Inserted ${auditData.length} audits.`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
}

seed();
