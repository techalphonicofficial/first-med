# Product Components

## Purpose
Document reusable product display and interaction components.

## Business Goals
- Make product discovery clear, fast, and trustworthy.

## Functional Requirements
- Display product image, name, brand, price, discount, stock, prescription flag, and actions.

## User Stories
- As a customer, I can compare products quickly.

## UI Components
- ProductCard, ProductGrid, ProductDetailHeader, PriceBlock, PrescriptionBadge.

## API Contracts
- Product components accept normalized product view models.

## Zustand Store
- Wishlist/cart interaction state may be optimistic but server truth comes from queries.

## React Query Usage
- Parent queries provide product data and mutation handlers.

## Validation Rules
- Product cards must handle missing images and unavailable products.

## Error States
- Product unavailable, add-to-cart failed.

## Empty States
- No products found.

## Loading States
- Fixed-size product skeleton cards.

## Permissions
- Purchase actions may require authentication.

## Future Enhancements
- Product comparison components.
