# Cart

## Purpose
Let customers review products, quantities, prescription needs, discounts, and delivery readiness before checkout.

## Business Goals
- Make cart changes instant and reliable.
- Prevent invalid checkout attempts.

## Functional Requirements
- Add, remove, update quantity, show price summary, prescription flags, stock warnings, and delivery eligibility.
- Persist cart for authenticated users.

## User Stories
- As a customer, I can edit my cart without leaving the shopping flow.
- As a customer, I can see why an item cannot be purchased.

## UI Components
- Cart drawer, cart page, quantity stepper, item row, coupon box, price summary.

## API Contracts
- `GET /cart`
- `POST /cart/items`
- `PATCH /cart/items/:id`
- `DELETE /cart/items/:id`

## Zustand Store
- Cart drawer visibility and optimistic quantity editing state.

## React Query Usage
- Cache cart, invalidate after item mutations, use optimistic updates carefully.

## Validation Rules
- Quantity must be positive and not exceed available stock or purchase limits.

## Error States
- Item out of stock, price changed, prescription required, coupon invalid.

## Empty States
- Empty cart with links to categories and previous orders.

## Loading States
- Cart item skeletons and disabled checkout button while validating.

## Permissions
- Guests may use a local cart; server cart requires authentication.

## Future Enhancements
- Cart merge after login and smart substitute prompts.
