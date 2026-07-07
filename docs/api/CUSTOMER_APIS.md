# Customer APIs

## Purpose
Document customer-facing API groups.

## Business Goals
- Power browsing, checkout, account, prescriptions, and orders securely.

## Functional Requirements
- Include product, cart, checkout, order, prescription, address, wishlist, invoice, and notification APIs.

## User Stories
- As a customer, I can complete the full buying journey.

## UI Components
- Product grids, cart, checkout, account pages.

## API Contracts
- `/products`
- `/cart`
- `/checkout`
- `/orders`
- `/prescriptions`
- `/addresses`
- `/wishlist`
- `/notifications`

## Zustand Store
- Use for cart drawer and checkout UI state.

## React Query Usage
- Cache by customer session and clear on logout.

## Validation Rules
- Customer ID is inferred from session, not trusted from client payload.

## Error States
- Auth required, resource not found, validation failed.

## Empty States
- Return empty collections for no orders, wishlist, prescriptions, or notifications.

## Loading States
- Support fast list endpoints for skeleton-first rendering.

## Permissions
- Customer can access only own resources.

## Future Enhancements
- Graph-style aggregation endpoint for account overview.
