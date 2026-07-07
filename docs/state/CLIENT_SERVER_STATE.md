# Client and Server State

## Purpose
Clarify the boundary between local UI state and remote data.

## Business Goals
- Prevent stale screens, duplicated state, and unnecessary rerenders.

## Functional Requirements
- Server-owned entities stay in React Query; UI interactions stay local or in Zustand.

## User Stories
- As a developer, I can decide where state belongs quickly.

## UI Components
- Components should separate display props from mutation handlers.

## API Contracts
- Server is source of truth for orders, inventory, prescriptions, payments, and users.

## Zustand Store
- Good fit: selected tab, open drawer, draft wizard step, filters.

## React Query Usage
- Good fit: product lists, order details, inventory, reports, permissions.

## Validation Rules
- If data must survive reload and be authoritative, it belongs on the server.

## Error States
- Server errors should not be hidden inside local stores.

## Empty States
- Empty server collections should come from API responses.

## Loading States
- Use query and mutation state as the source of loading truth.

## Permissions
- Role changes require clearing both client and server-state caches.

## Future Enhancements
- State decision checklist in PR template.
