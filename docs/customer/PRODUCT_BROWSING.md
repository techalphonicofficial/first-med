# Product Browsing

## Purpose
Help customers discover medicines and healthcare products quickly and safely.

## Business Goals
- Increase product discovery and conversion.
- Make prescription requirements and stock confidence visible early.

## Functional Requirements
- Show product list, categories, filters, sorting, product details, stock status, and prescription requirement.
- Display price, discount, brand, pack size, and delivery availability.

## User Stories
- As a customer, I can browse by category and compare products.
- As a customer, I can tell whether a product needs a prescription before adding it.

## UI Components
- Product grid, product card, filter sheet, sort menu, category chips, product detail sections.

## API Contracts
- `GET /products`
- `GET /products/:slug`
- `GET /categories`

## Zustand Store
- Store filter drawer state and recently viewed product IDs.

## React Query Usage
- Cache product lists by category, search, filters, and sort.

## Validation Rules
- Validate category, filter, sort, and pagination params.

## Error States
- Product unavailable, category not found, price unavailable.

## Empty States
- No products found with suggestions to clear filters.

## Loading States
- Grid skeletons and fixed-height product cards to avoid layout shift.

## Permissions
- Public browsing is allowed; purchasing may require authentication.

## Future Enhancements
- Personalized recommendations and substitute medicine suggestions.
