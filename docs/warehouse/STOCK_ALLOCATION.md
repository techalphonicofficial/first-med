# Stock Allocation

## Purpose
Reserve sellable warehouse stock for customer orders.

## Business Goals
- Prevent overselling.
- Fulfill orders from the most suitable warehouse.

## Functional Requirements
- Allocate stock by order, warehouse, batch, expiry, delivery area, and available quantity.
- Release allocation if order is cancelled or payment fails.

## User Stories
- As an operator, I can see which stock is reserved for orders.

## UI Components
- Allocation queue, order allocation detail, reserved stock badges.

## API Contracts
- `POST /stock-allocations`
- `POST /stock-allocations/:id/release`
- `GET /stock-allocations`

## Zustand Store
- Allocation filters and preview modal.

## React Query Usage
- Invalidate inventory, orders, and allocation queues after mutation.

## Validation Rules
- Allocate only active, non-expired, available stock.

## Error States
- Insufficient stock, no eligible warehouse, stale order.

## Empty States
- No pending allocations.

## Loading States
- Allocation queue skeleton.

## Permissions
- Admins configure rules; operators manage assigned allocation tasks.

## Future Enhancements
- Rule-based automatic allocation with manual override.
