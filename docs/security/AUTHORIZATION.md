# Authorization

## Purpose
Define how frontend routes and actions reflect server-side permissions.

## Business Goals
- Prevent accidental access to restricted workflows.

## Functional Requirements
- Protect route groups, hide unauthorized actions, and handle permission errors gracefully.

## User Stories
- As an operator, I only see actions allowed for my role.

## UI Components
- Protected route wrapper, permission-aware button, unauthorized page.

## API Contracts
- Server returns `403` with stable error codes for denied actions.

## Zustand Store
- Store permission-derived UI state only when loaded from authenticated user context.

## React Query Usage
- Clear or invalidate role-scoped data after role/session changes.

## Validation Rules
- Never rely on frontend-only permission checks.

## Error States
- Unauthorized, session expired, account suspended.

## Empty States
- Hide restricted data without revealing its existence.

## Loading States
- Use auth-check skeletons before rendering protected views.

## Permissions
- Role and permission names must be explicit.

## Future Enhancements
- Central permission matrix docs generated from backend policy.
