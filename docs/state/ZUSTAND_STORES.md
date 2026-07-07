# Zustand Stores

## Purpose
Document appropriate Zustand usage.

## Business Goals
- Keep client interactions smooth without misusing global state.

## Functional Requirements
- Use stores for UI state shared across components or pages.

## User Stories
- As a developer, I can add a drawer or wizard state without polluting server cache.

## UI Components
- Cart drawer, filters, selected warehouse, checkout stepper, admin drawers.

## API Contracts
- Stores should call services only through intentional feature actions when necessary.

## Zustand Store
- Keep stores small, named by domain, and easy to reset.

## React Query Usage
- Do not replace React Query with Zustand for API data.

## Validation Rules
- Avoid storing secrets, tokens, and sensitive medical data.

## Error States
- Store only UI-level errors when not tied to a mutation.

## Empty States
- Empty UI state should have sensible defaults.

## Loading States
- Prefer React Query mutation loading over manual store loading flags.

## Permissions
- Reset role-scoped stores on logout.

## Future Enhancements
- Store reset registry.
