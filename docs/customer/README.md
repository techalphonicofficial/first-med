# Customer Documentation

## Purpose
Document all customer-facing experiences for browsing, prescription upload, cart, checkout, orders, and account flows.

## Business Goals
- Make medicine discovery fast and trustworthy.
- Make prescription and checkout flows clear on mobile.
- Reduce support issues through transparent order states.

## Functional Requirements
- Customers can browse, search, save, reorder, upload prescriptions, checkout, and track orders.
- Prescription and payment requirements must be visible before order confirmation.

## User Stories
- As a customer, I can quickly find medicines and understand availability.
- As a customer, I can complete checkout with confidence.

## UI Components
- Product cards, search bar, cart drawer, checkout steps, prescription uploader, address selector, order timeline.

## API Contracts
- Customer APIs must return only the authenticated customer's resources.

## Zustand Store
- Cart UI, drawer state, selected address, checkout step, and local preferences.

## React Query Usage
- Use queries for products, categories, orders, prescriptions, addresses, and invoices.

## Validation Rules
- Validate phone, address, prescription file, quantity, and payment method.

## Error States
- Handle out of stock, invalid prescription, payment failure, and unavailable delivery area.

## Empty States
- Empty cart, no orders, no prescriptions, no saved addresses.

## Loading States
- Skeletons for product grids, order lists, and checkout summaries.

## Permissions
- Customers access only their own profile, orders, prescriptions, and invoices.

## Future Enhancements
- Saved care profiles and smarter reorder recommendations.
