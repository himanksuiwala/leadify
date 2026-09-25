# Quickstart: Lead List Integration Validation

## Prerequisites
- Both Backend (`npm run dev` in `backend/`) and Frontend (`npm run dev` in `frontend/`) servers must be running locally.
- The PostgreSQL database must be seeded with leads (`npm run seed` in `backend/`).

## Setup
1. Open your browser and navigate to `http://localhost:5173`.
2. Open the developer tools (Network tab) to observe API calls.

## Validation Scenarios

### 1. Initial Load & Rendering
- **Action**: Load the page.
- **Expected Outcome**: The lead list panel populates with leads. Each lead shows a full name, topic, status badge with a color (e.g., green for Qualified), relative time ("2 hours ago"), source, and a 1-line message snippet. LeadIDs should NOT be visible.

### 2. Infinite Scrolling
- **Action**: Scroll to the bottom of the lead list.
- **Expected Outcome**: A new network request to `/leads?page=2` is fired. Additional leads are seamlessly appended to the bottom of the list.

### 3. Filtering by Status
- **Action**: Click the "New" filter chip at the top of the list.
- **Expected Outcome**: The list is cleared. A new request to `/leads?page=1&status=New` is fired. The list populates only with leads that have a "New" badge.

### 4. Sorting
- **Action**: Select "Name (A-Z)" from the sort dropdown.
- **Expected Outcome**: The list is cleared. A new request to `/leads?page=1&sort=name_asc` (and preserving any active filters) is fired. The list populates with leads ordered alphabetically by First Name.
