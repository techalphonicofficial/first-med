# Skip Delivery

## Purpose
Allow customers to skip a single upcoming subscription delivery.

## Business Goals
- Prevent unwanted deliveries while keeping subscription active.

## Functional Requirements
- Show upcoming delivery, allow skip, update next delivery date.

## User Stories
- As a customer, I can skip one delivery without cancelling.

## UI Components
- Upcoming delivery card, skip confirmation dialog.

## API Contracts
- `POST /subscriptions/:id/skip`

## Zustand Store
- Skip confirmation state.

## React Query Usage
- Invalidate subscription and upcoming deliveries after skip.

## Validation Rules
- Only upcoming eligible deliveries can be skipped.

## Error States
- Delivery already processed, skip window closed.

## Empty States
- No upcoming delivery.

## Loading States
- Button pending state.

## Permissions
- Customer owns subscription.

## Future Enhancements
- Multi-skip scheduling.
