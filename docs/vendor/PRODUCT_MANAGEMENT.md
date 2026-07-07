# Product Management

## Purpose
Allow vendors to create, update, and maintain product catalog entries.

## Business Goals
- Keep product listings accurate, compliant, and easy to sell.

## Functional Requirements
- Manage product details, pricing, images, categories, prescription requirement, and approval status.

## User Stories
- As a vendor, I can add products and track approval status.

## UI Components
- Product table, product form, image uploader, approval status badge.

## API Contracts
- `GET /vendor/products`
- `POST /vendor/products`
- `PATCH /vendor/products/:id`

## Zustand Store
- Product drawer, filters, selected rows.

## React Query Usage
- Cache product lists by filters and invalidate after mutations.

## Validation Rules
- Require name, category, price, pack size, brand, and prescription flag.

## Error States
- Product rejected, duplicate SKU, invalid price.

## Empty States
- No products with add-product CTA.

## Loading States
- Product table skeleton.

## Permissions
- Vendor product actions depend on owner or product-manager permission.

## Future Enhancements
- Product template library and approval recommendations.
