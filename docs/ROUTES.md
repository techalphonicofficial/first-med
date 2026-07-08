# Routes

## Purpose
Document the expected frontend route structure for FirstMED.

## Business Goals
- Keep navigation predictable across customer, vendor, warehouse, delivery, and admin portals.
- Make protected routes clear before implementation.

## Route Groups
```txt
/
/products
/products/[slug] (e.g. /products/otc-1)
/cart
/checkout
/orders
/orders/[id] (e.g. /orders/ORD-77291)
/prescriptions
/account

/vendor
/vendor/products
/vendor/inventory
/vendor/orders
/vendor/reports

/warehouse
/warehouse/inventory
/warehouse/transfers
/warehouse/receiving
/warehouse/dispatch
/warehouse/audits

/delivery
/delivery/assignments
/delivery/history
/delivery/earnings

/admin
/admin/users
/admin/vendors
/admin/warehouses
/admin/products
/admin/prescriptions
/admin/reports
```

## Functional Requirements
- Public routes must not expose private account or operational data.
- Role routes must enforce authentication and authorization.
- Detail pages must handle missing, unauthorized, and archived records.

## User Stories
- As a customer, I can move from product browsing to checkout without friction.
- As an operator, I can access only the dashboard relevant to my role.

## UI Components
- App shell, role-aware sidebar, breadcrumbs, tabs, page headers, and command bars.

## API Contracts
- Route loaders must request only the data needed for the visible page.

## Zustand Store
- Store navigation drawers, active filters, and temporary wizard state.

## React Query Usage
- Prefetch detail queries when navigating from dense tables.

## Validation Rules
- Validate route params before making API calls.

## Error States
- Include `not-found`, unauthorized, and offline-friendly route states.

## Empty States
- Empty pages should provide a clear next action.

## Loading States
- Use route-level skeletons that match final layout dimensions.

## Permissions
- Customer, vendor, warehouse, delivery, and admin route groups require separate access rules.

## Future Enhancements
- Add deep-linkable filters and saved views for operational dashboards.
