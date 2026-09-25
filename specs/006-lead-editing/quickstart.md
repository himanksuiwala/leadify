# Validation Guide: Lead Editing

## Prerequisites
- Both frontend (`npm run dev`) and backend (`npm run dev`) must be running.
- A database with existing leads (via `npm run seed`) must be available.

## End-to-End Validation Scenario

1. **Open the App**:
   Navigate to `http://localhost:5173` (or the respective frontend port) and select a lead from the master list.

2. **Trigger the Edit Modal**:
   In the Lead Details pane (top right header), click the "Edit" button.
   - **Expected**: A modal should open titled "Edit Lead".
   - **Expected**: The fields (First Name, Last Name, Phone, Source, Topic, Message) should be pre-populated with the lead's current values.

3. **Perform an Update**:
   - Change the "First Name" to something noticeably different (e.g., append "- Updated").
   - Change the "Phone" to a new value.
   - Click "Save Changes".

4. **Verify the Results**:
   - **Expected**: A success toast notification ("Lead updated successfully") appears.
   - **Expected**: The modal automatically closes.
   - **Expected**: The Lead Details pane instantly refreshes to show the new Name and Phone.
   - **Expected**: The Master List (left sidebar) instantly refreshes to show the new Name.
   - **Expected**: Scrolling to the bottom of the Activity Timeline reveals a new entry: "Updated by System" (or appropriate actor).

5. **Test Cancellation**:
   - Open the Edit modal again.
   - Type random characters into the "Message" field.
   - Click "Cancel".
   - **Expected**: The modal closes immediately. No changes are saved to the UI or backend.
