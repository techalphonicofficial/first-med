# Orders

## Purpose
Give customers transparent order history, order status, invoices, and delivery tracking.

## Business Goals
- Reduce support load.
- Improve trust through clear progress communication.

## Functional Requirements
- Show order list, detail, status timeline, payment state, prescription state, invoice, and delivery tracking.

## User Stories
- As a customer, I can understand where my order is.
- As a customer, I can download invoices and reorder previous medicines.

## UI Components
- Order cards, order detail page, status timeline, invoice button, reorder action.

## API Contracts
- `GET /orders`
- `GET /orders/:id`
- `POST /orders/:id/cancel`
- `POST /orders/:id/reorder`

## Zustand Store
- Selected order filters and cancellation modal state.

## React Query Usage
- Cache order list by status and detail by order ID.

## Validation Rules
- Cancel only orders in allowed states.

## Error States
- Order not found, cancellation unavailable, tracking delayed.

## Empty States
- No orders with a path back to product browsing.

## Loading States
- Timeline and list skeletons.

## Permissions
- Customers can access only their own orders.

## Future Enhancements
- Return requests and delivery rescheduling.
