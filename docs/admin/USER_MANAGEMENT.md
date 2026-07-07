# User Management

## Purpose
Allow admins to view and manage customer and internal user accounts.

## Business Goals
- Support account safety and operational support.

## Functional Requirements
- Search users, view profiles, change status, assign roles, and review activity.

## User Stories
- As an admin, I can help users while respecting privacy.

## UI Components
- User table, profile drawer, status controls, role selector.

## API Contracts
- `GET /admin/users`
- `PATCH /admin/users/:id`

## Zustand Store
- User filters and selected user drawer.

## React Query Usage
- Cache users by filters and invalidate after updates.

## Validation Rules
- Role changes require proper admin permission.

## Error States
- User not found, permission denied.

## Empty States
- No users match filters.

## Loading States
- User table skeleton.

## Permissions
- Admin role management requires elevated permission.

## Future Enhancements
- Account risk indicators.
