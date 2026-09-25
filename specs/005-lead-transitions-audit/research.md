# Research: Lead Transitions and Audit Trail

## Status Transition Dropdown UI
- **Decision**: Use Shadcn UI's `DropdownMenu` component.
- **Rationale**: It provides an accessible, easily stylable popup menu that can be triggered by clicking a button (or a badge styled as a button). It fits seamlessly into the existing Shadcn ecosystem.

## Strict Pipeline Logic Validation
- **Decision**: Compute allowed transitions dynamically based on `lead.Status`.
- **Rationale**: The state transitions (`New` -> `Qualified`|`Dead`, etc.) can be expressed as a simple map or function in the React component. If the resulting allowed transitions array is empty, the badge is rendered as a static element or disabled button.

## Activity Timeline Layout
- **Decision**: Render a vertical list at the bottom of the Lead Details view with left-bordered items to simulate a timeline.
- **Rationale**: A vertical timeline is the standard UI pattern for audit logs (similar to GitHub pull request timelines or issue comments). It's easy to build using standard Tailwind utility classes (`border-l`, `pl-4`, `relative`, etc.).
