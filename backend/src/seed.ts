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
      DROP TABLE IF EXISTS "User" CASCADE;
      DROP TYPE IF EXISTS lead_status CASCADE;
      DROP TYPE IF EXISTS audit_action CASCADE;
    `);

    console.log('Creating ENUMs and tables...');
    await query(`
      CREATE TYPE lead_status AS ENUM ('New', 'Qualified', 'Converted', 'Dead');
      CREATE TYPE audit_action AS ENUM ('Created', 'Updated', 'Status Changed');

      CREATE TABLE "User" (
        "UserID" UUID PRIMARY KEY,
        "FirstName" VARCHAR(30) NOT NULL,
        "LastName" VARCHAR(30) NOT NULL,
        "Email" VARCHAR(100) UNIQUE NOT NULL
      );

      CREATE TABLE "Customer" (
        "CustomerID" UUID PRIMARY KEY,
        "FirstName" VARCHAR(30) NOT NULL,
        "LastName" VARCHAR(30) NOT NULL,
        "Email" VARCHAR(100) UNIQUE NOT NULL,
        "Phone" VARCHAR(15)
      );

      CREATE TABLE "Lead" (
        "LeadID" UUID PRIMARY KEY,
        "CustomerID" UUID NOT NULL REFERENCES "Customer"("CustomerID") ON DELETE CASCADE,
        "AssignedTo" UUID REFERENCES "User"("UserID") ON DELETE SET NULL,
        "Source" VARCHAR(30),
        "Topic" VARCHAR(50),
        "Message" VARCHAR(500),
        "Status" lead_status DEFAULT 'New',
        "Timestamp" TIMESTAMP
      );

      CREATE TABLE "Audit" (
        "AuditID" UUID PRIMARY KEY,
        "LeadID" UUID NOT NULL REFERENCES "Lead"("LeadID") ON DELETE CASCADE,
        "Action" audit_action,
        "ActorID" UUID REFERENCES "User"("UserID") ON DELETE SET NULL,
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

    // 3. Insert Internal Users
    console.log('Inserting internal users...');
    const amanUserId = crypto.randomUUID();
    const systemUserId = crypto.randomUUID();

    await query(
      `INSERT INTO "User" ("UserID", "FirstName", "LastName", "Email") VALUES ($1, $2, $3, $4)`,
      [amanUserId, 'Aman', 'Rawat', 'aman@example.com']
    );
    await query(
      `INSERT INTO "User" ("UserID", "FirstName", "LastName", "Email") VALUES ($1, $2, $3, $4)`,
      [systemUserId, 'System', 'Webhook', 'system@webhook.local']
    );
    
    // Create maps for actor IDs
    const actorMap = new Map<string, string>([
      ['Sales Agent', amanUserId],
      ['System', systemUserId],
      ['Meta Webhook', systemUserId]
    ]);

    // 4. Mapping Maps for old ID -> new UUID
    const customerIdMap = new Map<string, string>();
    const leadIdMap = new Map<string, string>();

    // 5. Insert Customers
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

    // 6. Insert Leads
    console.log('Inserting leads...');
    for (const row of leadsData) {
      const newId = crypto.randomUUID();
      leadIdMap.set(row.LeadID, newId);
      const newCustomerId = customerIdMap.get(row.CustomerID);

      if (!newCustomerId) throw new Error(`Customer ID ${row.CustomerID} not found in map.`);

      await query(
        `INSERT INTO "Lead" ("LeadID", "CustomerID", "AssignedTo", "Source", "Topic", "Message", "Status", "Timestamp") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [newId, newCustomerId, amanUserId, row.Source, row.Topic, row.Message, row.Status, row.Timestamp]
      );
    }
    console.log(`Inserted ${leadsData.length} leads.`);

    // 7. Insert Audits
    console.log('Inserting audits...');
    for (const row of auditData) {
      const newId = crypto.randomUUID();
      const newLeadId = leadIdMap.get(row.LeadID);

      if (!newLeadId) throw new Error(`Lead ID ${row.LeadID} not found in map.`);

      let action = row.Action;
      if (action === 'Lead Created') action = 'Created';
      if (action === 'Lead Updated' || action === 'Note Added') action = 'Updated';

      const actorId = actorMap.get(row.Actor) || systemUserId; // Fallback to system

      await query(
        `INSERT INTO "Audit" ("AuditID", "LeadID", "Action", "ActorID", "Comment", "Timestamp") VALUES ($1, $2, $3, $4, $5, $6)`,
        [newId, newLeadId, action, actorId, row.Comment, row.Timestamp]
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
