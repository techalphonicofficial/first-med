# React Query

## Purpose
Document server-state management patterns.

## Business Goals
- Keep API data fresh, cached, and easy to invalidate.

## Functional Requirements
- Use queries for reads, mutations for writes, and query keys by module/resource/params.

## User Stories
- As a developer, I can confidently update data and refresh affected screens.

## UI Components
- Tables, dashboards, forms, detail pages, and queues consume query state.

## API Contracts
- Service functions should return normalized data or throw mapped errors.

## Zustand Store
- Zustand may hold filters that become query params.

## React Query Usage
- Invalidate precise keys after mutations; use optimistic updates only when rollback is clear.

## Validation Rules
- Query keys must include role and entity scope where data differs.

## Error States
- Map query errors to inline, page, or toast feedback depending on impact.

## Empty States
- Treat empty results as successful states.

## Loading States
- Use skeletons for initial load and subtle pending state for refetch.

## Permissions
- Clear protected queries on logout.

## Future Enhancements
- Query key factory per module.
