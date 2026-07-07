# Delivery Privacy Rules

## Purpose
Define the strict privacy boundary for delivery partner experiences.

## Business Goals
- Protect customer identity, medical privacy, and vendor financial data.

## Functional Requirements
- Delivery partners must not see medicine names, customer email, direct phone, medical history, product details, or financial breakdowns.
- Partners can see pickup location, drop location, OTP, order ID, payment mode, delivery instructions, and navigation.

## User Stories
- As a customer, my medical details are hidden from delivery partners.

## UI Components
- Privacy-safe delivery cards and masked communication actions.

## API Contracts
- Delivery APIs must omit restricted fields server-side.

## Zustand Store
- Do not store restricted customer or product data in delivery state.

## React Query Usage
- Query keys must be delivery-specific and never share customer order detail caches.

## Validation Rules
- API responses must be reviewed for restricted fields.

## Error States
- If restricted data is detected, block rendering and log a security issue.

## Empty States
- Not applicable.

## Loading States
- Standard delivery skeletons only.

## Permissions
- Delivery role has minimum necessary access.

## Future Enhancements
- Automated response schema privacy tests.
