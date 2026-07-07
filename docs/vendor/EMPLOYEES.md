# Vendor Employees

## Purpose
Allow vendors to manage staff accounts and permissions.

## Business Goals
- Support real pharmacy operations without sharing owner credentials.

## Functional Requirements
- Invite employees, assign roles, deactivate access, and audit activity.

## User Stories
- As a vendor owner, I can give staff only the access they need.

## UI Components
- Employee table, invite modal, role selector, permission summary.

## API Contracts
- `GET /vendor/employees`
- `POST /vendor/employees`
- `PATCH /vendor/employees/:id`

## Zustand Store
- Invite modal and selected employee state.

## React Query Usage
- Invalidate employee list after invite or role update.

## Validation Rules
- Require unique contact, role, and active vendor association.

## Error States
- Invite failed, duplicate employee, permission denied.

## Empty States
- No employees with invite CTA.

## Loading States
- Employee table skeleton.

## Permissions
- Only vendor owners or managers can manage employees.

## Future Enhancements
- Granular custom roles.
