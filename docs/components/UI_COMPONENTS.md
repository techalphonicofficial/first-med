# UI Components

## Purpose
Document base UI primitives.

## Business Goals
- Keep visual language consistent across the platform.

## Functional Requirements
- Support buttons, badges, cards, modals, drawers, tabs, tooltips, tables, and alerts.

## User Stories
- As a user, I experience predictable controls across modules.

## UI Components
- Button, IconButton, Badge, Modal, Drawer, Tabs, Table, EmptyState, Skeleton.

## API Contracts
- Base components are API-agnostic.

## Zustand Store
- Use local state for open/close unless shared across routes.

## React Query Usage
- Accept loading and error props from parent query state.

## Validation Rules
- All interactive controls need accessible labels.

## Error States
- Support disabled, error, warning, and success variants.

## Empty States
- EmptyState should accept title, description, and action.

## Loading States
- Skeleton dimensions must match the final component.

## Permissions
- Action components accept permission-aware disabled states.

## Future Enhancements
- Visual regression tests.
