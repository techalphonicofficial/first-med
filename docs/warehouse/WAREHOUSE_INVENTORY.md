# Warehouse Inventory

## Purpose
Track stock quantity, batch, expiry, and movement at warehouse level.

## Business Goals
- Preserve stock accuracy.
- Enable safe medicine dispatch.

## Functional Requirements
- Show stock by warehouse, product, batch, expiry, reserved quantity, available quantity, and damaged quantity.

## User Stories
- As an operator, I can see what stock is available in my warehouse.

## UI Components
- Inventory table, batch drawer, stock movement timeline, filter bar.

## API Contracts
- `GET /warehouse/inventory`
- `GET /warehouse/inventory/:id/movements`

## Zustand Store
- Inventory filters and selected batch drawer.

## React Query Usage
- Cache inventory by warehouse, product, batch, and status.

## Validation Rules
- Available quantity equals received minus reserved, dispatched, damaged, and expired quantities.

## Error States
- Inventory mismatch, batch locked, stale quantity.

## Empty States
- No inventory in selected warehouse.

## Loading States
- Table skeleton and movement timeline placeholders.

## Permissions
- Operators view assigned warehouse inventory; admins view all.

## Future Enhancements
- Barcode-based stock lookup.
