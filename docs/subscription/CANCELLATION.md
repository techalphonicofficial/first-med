# Subscription Cancellation

## Purpose
Allow customers to permanently cancel a subscription.

## Business Goals
- Keep cancellation transparent while capturing useful feedback.

## Functional Requirements
- Confirm cancellation, capture reason, stop future billing and delivery generation.

## User Stories
- As a customer, I can cancel a subscription when I no longer need it.

## UI Components
- Cancellation dialog, reason selector, confirmation state.

## API Contracts
- `POST /subscriptions/:id/cancel`

## Zustand Store
- Cancellation modal state.

## React Query Usage
- Invalidate subscription list and detail after cancellation.

## Validation Rules
- Cannot cancel if final delivery is already locked without policy handling.

## Error States
- Cancellation failed, active delivery conflict.

## Empty States
- Not applicable.

## Loading States
- Confirm button pending state.

## Permissions
- Customer owns subscription.

## Future Enhancements
- Save offers or pause alternatives.
