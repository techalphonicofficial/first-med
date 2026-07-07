# Receiving

## Purpose
Record incoming stock into a warehouse.

## Business Goals
- Keep inventory accurate from the moment stock enters FirstMED operations.

## Functional Requirements
- Receive purchase/transfer stock, verify quantity, assign batch, capture expiry, and create stock movements.

## User Stories
- As an operator, I can receive stock and make it available after verification.

## UI Components
- Receiving queue, receive form, quantity verifier, batch fields.

## API Contracts
- `GET /warehouse/receiving`
- `POST /warehouse/receiving/:id/confirm`

## Zustand Store
- Receiving form draft and selected receiving task.

## React Query Usage
- Invalidate inventory and receiving queue after confirmation.

## Validation Rules
- Received quantity cannot exceed expected quantity without approved variance.

## Error States
- Quantity mismatch, invalid batch, expired stock.

## Empty States
- No stock awaiting receipt.

## Loading States
- Receiving queue skeleton.

## Permissions
- Operators assigned to the warehouse can receive stock.

## Future Enhancements
- Barcode scanning during receiving.
