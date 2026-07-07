# Internal Transfers

## Purpose
Move stock within the same warehouse between zones, bins, or operational states.

## Business Goals
- Keep physical storage aligned with system records.

## Functional Requirements
- Transfer stock between internal locations with reason, quantity, batch, and operator record.

## User Stories
- As an operator, I can move stock from receiving to sellable storage.

## UI Components
- Transfer form, bin selector, movement history.

## API Contracts
- `POST /warehouse/internal-transfers`
- `GET /warehouse/internal-transfers`

## Zustand Store
- Transfer form draft.

## React Query Usage
- Invalidate inventory and movement history after transfer.

## Validation Rules
- Source location must have enough available quantity.

## Error States
- Insufficient quantity, invalid destination, locked batch.

## Empty States
- No internal transfers.

## Loading States
- Transfer history skeleton.

## Permissions
- Operators can transfer within assigned warehouse.

## Future Enhancements
- Bin-level barcode scanning.
