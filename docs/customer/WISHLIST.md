# Wishlist

## Purpose
Let customers save products for later purchase.

## Business Goals
- Encourage repeat visits.
- Keep high-intent products easy to find.

## Functional Requirements
- Add/remove wishlist items and display availability, price, and prescription status.

## User Stories
- As a customer, I can save medicines and health products for later.

## UI Components
- Wishlist button, wishlist page, saved product card.

## API Contracts
- `GET /wishlist`
- `POST /wishlist/items`
- `DELETE /wishlist/items/:id`

## Zustand Store
- Optimistic wishlist toggle state.

## React Query Usage
- Invalidate wishlist and product detail after mutation.

## Validation Rules
- Prevent duplicate wishlist entries.

## Error States
- Save failed, product discontinued.

## Empty States
- No saved items with suggested categories.

## Loading States
- Product card skeletons.

## Permissions
- Wishlist requires authenticated customer access.

## Future Enhancements
- Back-in-stock and price-drop alerts.
