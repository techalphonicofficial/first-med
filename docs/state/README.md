# State Documentation

## Purpose
Define how FirstMED separates UI state, server state, and form state.

## Business Goals
- Avoid stale data bugs and hard-to-debug global state.

## Functional Requirements
- Use Zustand for client UI state and TanStack React Query for server data.

## User Stories
- As a developer, I know where each kind of state belongs.

## UI Components
- Components receive state through props, hooks, or feature-level stores.

## API Contracts
- Server data should come from service functions wrapped by queries.

## Zustand Store
- Store UI preferences, drawers, filters, selected IDs, and multi-step wizard state.

## React Query Usage
- Store remote resources, cache, retries, invalidation, and optimistic updates.

## Validation Rules
- Do not duplicate server collections into Zustand.

## Error States
- Query and mutation errors should be surfaced consistently.

## Empty States
- Empty data belongs to query response handling.

## Loading States
- Loading state belongs to query/mutation state where possible.

## Permissions
- Clear state on logout and role changes.

## Future Enhancements
- Shared state conventions per feature folder.
