# Taxes

## Purpose
Configure tax rules used in cart, checkout, invoices, and vendor settlement.

## Business Goals
- Keep billing compliant and transparent.

## Functional Requirements
- Manage tax rates by product type, category, location, and effective date.

## User Stories
- As an admin, I can update tax settings without code changes.

## UI Components
- Tax table, tax rule form, effective date selector.

## API Contracts
- `GET /admin/taxes`
- `POST /admin/taxes`
- `PATCH /admin/taxes/:id`

## Zustand Store
- Tax editor state.

## React Query Usage
- Invalidate taxes and checkout pricing after updates.

## Validation Rules
- Effective date and rate must be valid; overlapping active rules must be prevented.

## Error States
- Overlapping tax rule, invalid rate.

## Empty States
- No tax rules configured.

## Loading States
- Tax table skeleton.

## Permissions
- Finance/admin tax permission required.

## Future Enhancements
- Tax audit export.
