# Cart Components

## Purpose
Document cart-specific reusable UI.

## Business Goals
- Make cart editing fast and checkout readiness obvious.

## Functional Requirements
- Show item rows, quantity controls, prescription warnings, coupon, and price summary.

## User Stories
- As a customer, I can update my cart without confusion.

## UI Components
- CartDrawer, CartItem, QuantityStepper, CouponBox, CartSummary.

## API Contracts
- Components consume cart view models and mutation callbacks.

## Zustand Store
- Cart drawer open state and optimistic edits.

## React Query Usage
- Parent cart query owns remote data.

## Validation Rules
- Quantity must respect stock and purchase limits.

## Error States
- Item unavailable, coupon invalid.

## Empty States
- Empty cart component.

## Loading States
- Cart item skeletons.

## Permissions
- Guest cart may be local; checkout requires login.

## Future Enhancements
- Cart merge feedback after login.
