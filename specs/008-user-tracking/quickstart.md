# Validation Guide: User Tracking

## End-to-End Validation Scenario

1. **Re-seed the Database**:
   - Stop the backend server.
   - Run the updated seed script (`npm run seed` or `ts-node src/seed.ts` from backend).
   - Start the backend server.

2. **Verify Frontend UI**:
   - Open the application.
   - Click on a Lead to view `LeadDetails`.
   - Scroll to the Activity Timeline.
   - **Expected**: You should see "Aman Rawat" instead of "Sales Agent".
   - **Expected**: You should see "System Webhook" for automated creations.

3. **Perform a Manual Action**:
   - Change the status of a lead using the UI dropdown.
   - **Expected**: A new audit log appears saying "Status changed to [New Status] by Aman Rawat".

4. **Perform an Automated Action**:
   - Open the Mock Webhook Simulator.
   - Submit a test lead.
   - Reload the dashboard and select the new lead.
   - **Expected**: The timeline shows "Lead created via webhook by System Webhook".
