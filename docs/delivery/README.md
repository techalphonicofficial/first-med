# Delivery Documentation

## Purpose
Document delivery partner workflows for assignments, navigation, tracking, OTP verification, proof, earnings, and privacy.

## Business Goals
- Deliver orders reliably while protecting customer and medicine privacy.

## Functional Requirements
- Partners can accept jobs, navigate, verify OTP, upload proof, and view earnings without seeing restricted data.

## User Stories
- As a delivery partner, I can complete deliveries with only the information I need.

## UI Components
- Assignment cards, route view, OTP form, proof uploader, earnings summary.

## API Contracts
- Delivery APIs must exclude medicine names and sensitive customer data.

## Zustand Store
- Active delivery, map state, proof upload state.

## React Query Usage
- Query assignments, active job, history, and earnings.

## Validation Rules
- OTP required before delivery completion.

## Error States
- Wrong OTP, location unavailable, proof upload failed.

## Empty States
- No assignments, no delivery history.

## Loading States
- Assignment skeletons and route loading state.

## Permissions
- Delivery partners access only assigned deliveries.

## Future Enhancements
- Route batching and offline proof capture.
