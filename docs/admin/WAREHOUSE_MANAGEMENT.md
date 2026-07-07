# Admin Warehouse Management

## Purpose
Give admins full control over warehouse setup and operational visibility.

## Business Goals
- Scale fulfillment across multiple warehouse locations.

## Functional Requirements
- Create warehouses, configure locations, assign operators, set status, and review inventory health.

## User Stories
- As an admin, I can manage all warehouses from one place.

## UI Components
- Warehouse table, location editor, operator assignment, health dashboard.

## API Contracts
- `GET /admin/warehouses`
- `POST /admin/warehouses`
- `PATCH /admin/warehouses/:id`

## Zustand Store
- Warehouse admin filters and editor drawer.

## React Query Usage
- Invalidate warehouse, inventory, and allocation queries after updates.

## Validation Rules
- Warehouse must have valid location and unique code.

## Error States
- Duplicate warehouse, inactive dependencies.

## Empty States
- No warehouses configured.

## Loading States
- Warehouse management skeleton.

## Permissions
- Admin warehouse permission required.

## Future Enhancements
- Capacity planning tools.
