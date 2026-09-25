# Validation Guide: Mock Webhook Simulator

## End-to-End Validation Scenario

1. **Access the Simulator**:
   - Open the main application (`http://localhost:5173`).
   - In the top-right header, locate the "Mock Webhook" button (with the external link icon).
   - Click it.
   - **Expected**: A new browser tab opens to `/mock-webhook`.
   - **Expected**: An informational card at the top explains the page is a testing utility.

2. **Test Validation Blocks**:
   - Leave the form entirely blank.
   - Click "Submit Webhook".
   - **Expected**: The browser/UI blocks the submission because the required fields are missing.

3. **Submit a Mock Lead**:
   - Fill in: First Name ("Test"), Last Name ("Mock"), Email ("test@mock.com"), Topic ("Mock Integration"), Message ("Testing the webhook route").
   - Click "Submit Webhook".
   - **Expected**: A success toast appears.
   - **Expected**: All form fields reset to empty instantly.

4. **Verify via Reload**:
   - Switch back to the main application tab (which should still be open).
   - Find the new "Reload" (refresh icon) button next to the Status filter above the Lead List.
   - Click the Reload button.
   - **Expected**: The Lead List refreshes and "Test Mock" appears at the top of the list.
