# Responsive Design

## Purpose
Define mobile-first responsive behavior.

## Business Goals
- Make FirstMED excellent on phones while supporting dense desktop operations.

## Functional Requirements
- Customer flows prioritize mobile; admin/vendor/warehouse dashboards support responsive tables and filters.

## User Stories
- As a customer, I can complete checkout on mobile.
- As an operator, I can scan tables efficiently on desktop.

## UI Components
- Responsive grids, drawers, bottom sheets, tables, sidebars, sticky summaries.

## API Contracts
- Not applicable.

## Zustand Store
- Sidebar and drawer state may adapt by viewport.

## React Query Usage
- Avoid refetching purely because layout changes.

## Validation Rules
- No horizontal overflow for core customer flows.

## Error States
- Error messages must wrap cleanly on mobile.

## Empty States
- Empty states should remain compact on small screens.

## Loading States
- Mobile skeletons should match stacked layouts.

## Permissions
- Hidden desktop actions must remain accessible through mobile menus.

## Future Enhancements
- Device-specific usability checklist.
