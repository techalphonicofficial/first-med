# Warehouse APIs

## Purpose
Document warehouse API groups.

## Business Goals
- Keep inventory, movement, transfer, receiving, and dispatch operations accurate.

## Functional Requirements
- Every inventory operation must include warehouse, product, batch, and quantity context.

## User Stories
- As an operator, I can work with assigned warehouse inventory.

## UI Components
- Warehouse dashboards, queues, forms, audit timelines.

## API Contracts
- `/warehouses`
- `/warehouse/inventory`
- `/warehouse/batches`
- `/warehouse/receiving`
- `/warehouse/dispatch`
- `/warehouse-transfers`
- `/warehouse/audit-logs`

## Zustand Store
- Selected warehouse and workflow wizard state.

## React Query Usage
- Query keys must include warehouse ID.

## Validation Rules
- Prevent negative stock and invalid movement transitions.

## Error States
- Stock conflict, stale allocation, inactive warehouse.

## Empty States
- Empty queues and no-stock states.

## Loading States
- Support operational table rendering.

## Permissions
- Operators are scoped to assigned warehouses.

## Future Enhancements
- Barcode scan endpoints.
