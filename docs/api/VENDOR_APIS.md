# Vendor APIs

## Purpose
Document vendor-facing API groups.

## Business Goals
- Support pharmacy catalog, inventory, orders, returns, invoices, reports, and employees.

## Functional Requirements
- Scope every request to the authenticated vendor business.

## User Stories
- As a vendor, I can manage operations securely.

## UI Components
- Vendor dashboard, tables, upload flows, reports.

## API Contracts
- `/vendor/products`
- `/vendor/inventory`
- `/vendor/orders`
- `/vendor/returns`
- `/vendor/invoices`
- `/vendor/reports`
- `/vendor/employees`

## Zustand Store
- Store table filters and upload wizard state.

## React Query Usage
- Invalidate dependent resources after product, inventory, and order mutations.

## Validation Rules
- Vendor status must be approved for selling actions.

## Error States
- KYC pending, forbidden, conflict.

## Empty States
- Empty vendor resources should include onboarding guidance metadata when useful.

## Loading States
- Support paginated dense tables.

## Permissions
- Vendor owner and employee permissions differ.

## Future Enhancements
- ERP integration endpoints.
