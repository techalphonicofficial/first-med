# Role Permissions

## Purpose
Define the practical permission model for FirstMED roles.

## Business Goals
- Give every user enough access to work, and no more.

## Functional Requirements
- Support Guest, Customer, Vendor, Warehouse Operator, Delivery Partner, and Administrator roles.

## User Stories
- As an admin, I can assign permissions based on job responsibility.

## UI Components
- Role selector, permission checklist, access summary.

## API Contracts
- `GET /roles`
- `GET /permissions`
- `PATCH /users/:id/permissions`

## Zustand Store
- Permission editor draft state.

## React Query Usage
- Cache roles and permissions; invalidate user context after changes.

## Validation Rules
- Prevent users from removing their own critical admin access accidentally.

## Error States
- Permission conflict, elevated approval required.

## Empty States
- No custom permissions configured.

## Loading States
- Permission matrix skeleton.

## Permissions
- Only authorized admins manage permissions.

## Future Enhancements
- Custom roles per vendor or warehouse.
