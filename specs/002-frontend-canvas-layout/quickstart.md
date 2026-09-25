# Quickstart: Frontend Canvas Layout Validation

This guide explains how to validate the responsive layout shell once implementation is complete.

## Prerequisites

- Node.js installed
- Project dependencies installed via `npm install` in the `frontend` directory

## Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open a browser and navigate to `http://localhost:5173`.

## Validation Scenarios

### 1. Desktop Layout Check
- **Action**: Open the browser window on a large screen (e.g., width > 1024px).
- **Expected Outcome**:
  - The left sidebar is fully expanded.
  - The "Leads/Home" menu item is visible.
  - A top navbar placeholder is visible.
  - The main content area is split into two panes (Lead List on the left, Lead Details on the right).

### 2. Mobile Responsive State
- **Action**: Use browser Developer Tools to toggle Device Toolbar / Responsive mode (or shrink window width below 768px).
- **Expected Outcome**:
  - The sidebar collapses entirely.
  - A hamburger menu icon appears (either in the navbar or top left).
  - The main content area shows *only* the Lead List placeholder.

### 3. Mobile Sidebar Toggle
- **Action**: While in mobile view, click the hamburger menu icon.
- **Expected Outcome**:
  - The sidebar slides in as an overlay/drawer.
  - Clicking outside the sidebar closes it.

### 4. Mobile Master-Detail Navigation
- **Action**: While in mobile view (with the Lead List visible), click any item/button simulating a lead selection.
- **Expected Outcome**:
  - The Lead List disappears.
  - The Lead Details view takes up the full content area.
  - A "Back" button is visible in the Lead Details view.
- **Action**: Click the "Back" button.
- **Expected Outcome**:
  - Returns to the Lead List view.
