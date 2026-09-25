# Research: Lead List Integration

## Backend Filtering and Sorting SQL Injection Prevention
- **Decision**: Use `zod` strictly to validate `sort` and `status` query parameters on the backend. Map `sort` strings directly to hardcoded SQL `ORDER BY` clauses to prevent injection.
- **Rationale**: Direct string interpolation of user input into SQL `ORDER BY` clauses is a common vector for SQL injection. By validating against an enum or mapping to hardcoded clauses, we eliminate this risk.
- **Alternatives considered**: Parameterized queries using `$1`, `$2` etc. Rejected for `ORDER BY` because Postgres does not support parameterizing column names or sort directions.

## Infinite Scroll Detection
- **Decision**: Attach an `onScroll` listener to the scrolling container in the React component. Check if `scrollTop + clientHeight >= scrollHeight - 50` (50px threshold) to trigger the next fetch.
- **Rationale**: As requested by the user, this is a native, dependency-free approach. Adding a threshold prevents the user from having to hit the exact pixel bottom.
- **Alternatives considered**: `IntersectionObserver` library. Rejected based on explicit user preference for native event listeners.

## Relative Time Formatting
- **Decision**: Use `formatDistanceToNow` from the `date-fns` library.
- **Rationale**: `date-fns` is highly modular, so we only import what we need, keeping the bundle size small. It provides robust relative time formatting out of the box.
- **Alternatives considered**: `dayjs` or native `Intl.RelativeTimeFormat`. `date-fns` was specifically requested by the user in the design alignment phase.
