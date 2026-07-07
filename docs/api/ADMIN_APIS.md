# Admin APIs

## Purpose
Document admin API groups.

## Business Goals
- Enable controlled platform operations with auditability.

## Functional Requirements
- Include users, vendors, partners, warehouses, products, prescriptions, banners, offers, coupons, taxes, settings, and reports.

## User Stories
- As an admin, I can manage platform records safely.

## UI Components
- Admin management tables, review queues, settings forms, reports.

## API Contracts
- `/admin/users`
- `/admin/vendors`
- `/admin/warehouses`
- `/admin/products`
- `/admin/prescriptions`
- `/admin/banners`
- `/admin/offers`
- `/admin/coupons`
- `/admin/taxes`
- `/admin/settings`
- `/admin/reports`

## Zustand Store
- Filters, selected records, and editor drawer state.

## React Query Usage
- Invalidate affected public/customer/vendor resources after admin changes.

## Validation Rules
- Critical mutations require reason and audit metadata.

## Error States
- Permission denied, conflict, already reviewed.

## Empty States
- No records for selected filters.

## Loading States
- Paginated table loading.

## Permissions
- Granular admin permissions required.

## Future Enhancements
- Admin audit export APIs.
