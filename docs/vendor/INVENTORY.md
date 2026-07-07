# Vendor Inventory

## Purpose
Allow vendors to maintain stock quantities and availability.

## Business Goals
- Reduce overselling.
- Keep customer-facing availability accurate.

## Functional Requirements
- Update quantity, batch, expiry, low-stock threshold, and availability status.

## User Stories
- As a vendor, I can update inventory quickly from a table.

## UI Components
- Inventory table, inline quantity editor, low-stock badge, batch fields.

## API Contracts
- `GET /vendor/inventory`
- `PATCH /vendor/inventory/:id`

## Zustand Store
- Inventory filters and edited row state.

## React Query Usage
- Invalidate inventory and product availability after updates.

## Validation Rules
- Quantity cannot be negative; expiry must be valid for sellable stock.

## Error States
- Stock conflict, expired batch, update failed.

## Empty States
- No inventory records.

## Loading States
- Table skeleton and row-level saving state.

## Permissions
- Inventory updates require vendor inventory permission.

## Future Enhancements
- Bulk stock reconciliation and low-stock alerts.
