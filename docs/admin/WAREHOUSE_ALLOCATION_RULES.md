# Warehouse Allocation Rules

## Purpose
Allow admins to define how orders are assigned to warehouses.

## Business Goals
- Optimize speed, stock freshness, and operational capacity.

## Functional Requirements
- Configure rules by service area, stock availability, FEFO, delivery SLA, priority, and fallback warehouse.

## User Stories
- As an admin, I can configure which warehouse fulfills which region.

## UI Components
- Rule builder, priority list, preview panel, conflict alerts.

## API Contracts
- `GET /admin/warehouse-allocation-rules`
- `POST /admin/warehouse-allocation-rules`
- `POST /admin/warehouse-allocation-rules/preview`

## Zustand Store
- Rule editor state and preview results.

## React Query Usage
- Invalidate allocation rules after save.

## Validation Rules
- Rules must not create unreachable service areas or circular fallback logic.

## Error States
- Conflicting rule, missing fallback, no eligible warehouse.

## Empty States
- No rules configured.

## Loading States
- Rule list skeleton.

## Permissions
- Admin warehouse allocation permission required.

## Future Enhancements
- Simulation using historical order data.
