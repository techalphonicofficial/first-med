# Vendor Order Management

## Purpose
Allow vendors to process assigned customer orders.

## Business Goals
- Improve fulfillment speed.
- Keep order state reliable across vendor, warehouse, and delivery modules.

## Functional Requirements
- View order queue, accept/process orders, prepare items, generate invoice, and hand off to warehouse or delivery.

## User Stories
- As a vendor, I can process orders that are ready for fulfillment.

## UI Components
- Order queue, status tabs, order detail drawer, action buttons, invoice panel.

## API Contracts
- `GET /vendor/orders`
- `GET /vendor/orders/:id`
- `PATCH /vendor/orders/:id/status`

## Zustand Store
- Order filters and selected order drawer.

## React Query Usage
- Cache order queue by status and invalidate after status changes.

## Validation Rules
- Only allow valid state transitions.

## Error States
- Order already processed, inventory unavailable, prescription pending.

## Empty States
- No active orders.

## Loading States
- Queue skeleton and action button pending state.

## Permissions
- Vendor order actions require order-processing permission.

## Future Enhancements
- SLA alerts and batch order processing.
