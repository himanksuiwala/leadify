# Quickstart: Validation Guide for Lead Details View

## Prerequisites
- Both Backend and Frontend must be running locally (`npm run dev`).
- The database should be seeded with leads.

## Validation Scenarios

### 1. View Selection & Loading
- **Action**: Click on a lead in the Master List panel on the left.
- **Expected Outcome**: The right panel displays a loading spinner briefly, then populates with the specific details of that lead.

### 2. Contact Card Sticky Header
- **Action**: Shrink your browser window vertically so the message requires scrolling, then scroll down.
- **Expected Outcome**: The Contact Card (containing Name, Status, Topic, Email, Phone, and Action Buttons) should remain "sticky" at the top of the detail pane, while the message content scrolls behind/under it.

### 3. Action Buttons
- **Action**: Locate the action buttons.
- **Expected Outcome**: There should be three primary buttons: Call, Email, and Chat. They should display the appropriate Lucide icons next to their text.

### 4. Message Distinctness
- **Action**: Look at the message area.
- **Expected Outcome**: The message should be separated visually from the contact info, residing in its own Card block with a distinct background shade to improve readability.
