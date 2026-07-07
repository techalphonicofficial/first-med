# Delivery APIs

## Purpose
Document delivery partner API groups.

## Business Goals
- Support delivery completion while protecting privacy.

## Functional Requirements
- Expose assignments, route, OTP verification, proof upload, tracking, history, and earnings.

## User Stories
- As a delivery partner, I can complete assigned deliveries.

## UI Components
- Assignment cards, navigation, OTP form, proof uploader.

## API Contracts
- `/delivery/assignments`
- `/delivery/location`
- `/delivery/:id/verify-otp`
- `/delivery/:id/proof`
- `/delivery/earnings`

## Zustand Store
- Active delivery UI state only.

## React Query Usage
- Use short refetch intervals only for active delivery data.

## Validation Rules
- Omit restricted customer, product, medicine, and finance fields.

## Error States
- Assignment expired, OTP invalid, proof failed.

## Empty States
- No assignments.

## Loading States
- Lightweight mobile-first responses.

## Permissions
- Assigned delivery partner only.

## Future Enhancements
- Offline sync endpoints.
