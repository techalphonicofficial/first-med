# Addresses

## Purpose
Allow customers to manage delivery addresses.

## Business Goals
- Improve delivery accuracy.
- Reduce failed deliveries.

## Functional Requirements
- Add, edit, delete, select default, and validate serviceability.

## User Stories
- As a customer, I can save home and work addresses.
- As a customer, I can know whether FirstMED delivers to my location.

## UI Components
- Address form, address card, default badge, map picker, serviceability message.

## API Contracts
- `GET /addresses`
- `POST /addresses`
- `PATCH /addresses/:id`
- `DELETE /addresses/:id`

## Zustand Store
- Address modal state and selected checkout address.

## React Query Usage
- Cache addresses and invalidate after mutations.

## Validation Rules
- Require recipient, phone, pincode, city, state, address line, and landmark where useful.

## Error States
- Invalid pincode, outside service area, delete blocked by active order.

## Empty States
- No saved addresses with add-address CTA.

## Loading States
- Address card skeletons.

## Permissions
- Customers manage only their own addresses.

## Future Enhancements
- Precise geocoding and saved delivery instructions.
