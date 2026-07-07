# Checkout

## Purpose
Convert a valid cart into a paid and trackable order with minimal friction.

## Business Goals
- Reduce abandonment.
- Make payment, prescription, address, and delivery decisions clear.

## Functional Requirements
- Support address selection, prescription validation, delivery slot, payment method, order review, and confirmation.
- Revalidate stock and pricing before placing order.

## User Stories
- As a customer, I can complete checkout on mobile without confusion.
- As a customer, I can see all charges before paying.

## UI Components
- Checkout stepper, address cards, prescription gate, payment selector, order summary, confirmation screen.

## API Contracts
- `POST /checkout/validate`
- `POST /orders`
- `POST /payments/create`

## Zustand Store
- Active checkout step, selected address, selected payment method, temporary form state.

## React Query Usage
- Query cart, addresses, delivery options, and checkout validation.

## Validation Rules
- Require address, valid cart, prescription approval where needed, and payment selection.

## Error States
- Payment failed, stock changed, delivery unavailable, prescription pending.

## Empty States
- No address, no payment method, empty cart.

## Loading States
- Disable final submit during order creation and payment confirmation.

## Permissions
- Checkout requires authenticated customer access.

## Future Enhancements
- Saved delivery preferences and one-tap reorder checkout.
