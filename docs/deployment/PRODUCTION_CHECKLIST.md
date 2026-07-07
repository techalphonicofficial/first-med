# Production Checklist

## Purpose
Provide a final frontend checklist before release.

## Business Goals
- Reduce production regressions.

## Functional Requirements
- Verify build, routes, auth, checkout, prescription upload, warehouse allocation, delivery privacy, and admin permissions.

## User Stories
- As a release owner, I can confirm the app is safe to ship.

## UI Components
- Smoke test critical customer, vendor, warehouse, delivery, and admin UI.

## API Contracts
- Confirm API base URL, auth, and error mapping.

## Zustand Store
- Confirm state resets on logout.

## React Query Usage
- Confirm protected caches clear on logout and role switch.

## Validation Rules
- Critical forms must validate client and server errors.

## Error States
- Test payment failure, upload failure, permission denied, and out-of-stock.

## Empty States
- Test empty product, order, warehouse, and report states.

## Loading States
- Test slow network loading for checkout and dashboards.

## Permissions
- Verify role-based menus and API access.

## Future Enhancements
- Automated smoke test suite.
