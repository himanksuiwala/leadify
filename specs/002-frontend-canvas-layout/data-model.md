# Data Model: Frontend Canvas Layout

*(Note: As this feature solely concerns UI structural layout scaffolding, there are no database entities or backend schemas introduced here. The models below describe internal React application state.)*

## UI State Models

### AppShell State (Managed by Shadcn `SidebarProvider`)
- `state`: `'expanded' | 'collapsed'` - The current visual state of the sidebar.
- `isMobile`: `boolean` - Whether the viewport is currently considered mobile size.
- `setOpenMobile`: `(open: boolean) => void` - Toggles the mobile sidebar drawer.

### MasterDetailView State
- `selectedItemId`: `string | null` - Tracks which item from the Master list is currently selected.
  - If `null`, the master list is fully visible on mobile.
  - If set, the detail view takes over on mobile.
- `isMobileView`: `boolean` - Tracks if the current viewport requires mobile rendering logic (typically `< 768px`).
