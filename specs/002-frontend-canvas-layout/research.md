# Research: Frontend Canvas Layout

## Shadcn UI Sidebar Architecture

- **Decision**: Use the official `@shadcn/ui` Sidebar component (`SidebarProvider`, `Sidebar`, `SidebarTrigger`).
- **Rationale**: The user explicitly requested the new Shadcn Sidebar component. It natively handles desktop/mobile responsive states (collapsing to an icon or hamburger menu, opening as a drawer on mobile), and leverages React context for seamless state sharing across the shell.
- **Alternatives considered**: Building a custom radix-ui sidebar or using standard CSS media queries. Rejected because Shadcn's official sidebar handles edge cases robustly out-of-the-box.

## Master-Detail Mobile Responsiveness

- **Decision**: Implement a custom React state hook in a `MasterDetailView` component to track the "active" selected item (or lack thereof). On mobile viewports (e.g. `window.innerWidth < 768px`), conditionally render *only* the list if no item is active, or *only* the detail if an item is active. On desktop, render both side-by-side using CSS flex or grid.
- **Rationale**: Clean, standard approach for master-detail views in React. We will use `window.matchMedia` or a simple resize listener hook to detect mobile viewports.
- **Alternatives considered**: CSS-only hiding (e.g., `hidden md:block`). Rejected because managing the "back" button state and unmounting components is often cleaner in JS for complex detail views. We will use a combination of JS state and Tailwind CSS classes.
