# Warehouse Documentation

## Purpose
Document inventory logistics across single and multi-warehouse operations.

## Business Goals
- Keep stock traceable from receiving to dispatch.
- Enable warehouse-wise availability, allocation, transfer, and audit workflows.

## Functional Requirements
- Manage locations, stock, batches, expiry, receiving, dispatch, internal transfers, inter-warehouse transfers, damaged goods, and audits.

## User Stories
- As a warehouse operator, I can see the stock assigned to my warehouse.
- As an admin, I can configure allocation rules across warehouses.

## UI Components
- Warehouse dashboard, stock tables, transfer forms, receiving flows, dispatch queues, audit logs.

## API Contracts
- Warehouse APIs must include warehouse ID in all inventory-sensitive requests.

## Zustand Store
- Selected warehouse, filters, transfer wizard state, scan modal state.

## React Query Usage
- Cache inventory and movements by warehouse ID.

## Validation Rules
- Never allow negative stock or dispatch from expired batches.

## Error States
- Stock conflict, warehouse inactive, transfer unavailable.

## Empty States
- No stock, no transfers, no dispatch tasks.

## Loading States
- Dense operational table skeletons.

## Permissions
- Operators access assigned warehouses; admins configure all warehouses.

## Future Enhancements
- Barcode scanning and automated replenishment rules.
