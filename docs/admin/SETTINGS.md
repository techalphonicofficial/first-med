# Settings

## Purpose
Manage platform-wide configuration.

## Business Goals
- Let admins change operational behavior safely.

## Functional Requirements
- Configure delivery charges, notifications, feature flags, support contact, and application settings.

## User Stories
- As an admin, I can update platform settings with validation.

## UI Components
- Settings sections, toggles, number inputs, save bars, confirmation dialogs.

## API Contracts
- `GET /admin/settings`
- `PATCH /admin/settings`

## Zustand Store
- Unsaved settings and section navigation state.

## React Query Usage
- Cache settings and invalidate after save.

## Validation Rules
- Validate numeric limits, required fields, and dependent settings.

## Error States
- Save failed, conflict with latest settings.

## Empty States
- Not applicable for required settings.

## Loading States
- Settings skeleton and save pending state.

## Permissions
- Settings permission required; some settings require elevated permission.

## Future Enhancements
- Settings change history and rollback.
