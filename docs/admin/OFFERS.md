# Offers

## Purpose
Manage platform promotional offers.

## Business Goals
- Increase conversion while protecting margin.

## Functional Requirements
- Create offers by category, product, vendor, date range, customer segment, and minimum cart value.

## User Stories
- As an admin, I can configure a seasonal offer.

## UI Components
- Offer form, eligibility builder, offer table, status badge.

## API Contracts
- `GET /admin/offers`
- `POST /admin/offers`
- `PATCH /admin/offers/:id`

## Zustand Store
- Offer filters and editor state.

## React Query Usage
- Invalidate offers and checkout validation after changes.

## Validation Rules
- Validate dates, discount limits, eligibility, and stacking rules.

## Error States
- Conflicting offer, invalid discount.

## Empty States
- No offers configured.

## Loading States
- Offer table skeleton.

## Permissions
- Offer management permission required.

## Future Enhancements
- Offer performance analytics.
