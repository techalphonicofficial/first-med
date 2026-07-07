# Delivery Frequency

## Purpose
Configure when subscription deliveries should happen.

## Business Goals
- Align recurring deliveries with customer medicine usage.

## Functional Requirements
- Support weekly, monthly, and custom day schedules where allowed.

## User Stories
- As a customer, I can choose when my medicines are delivered.

## UI Components
- Frequency selector, calendar picker, next delivery preview.

## API Contracts
- `PATCH /subscriptions/:id/frequency`

## Zustand Store
- Frequency editor state.

## React Query Usage
- Invalidate subscription and upcoming delivery queries.

## Validation Rules
- Date must be serviceable and not in the past.

## Error States
- Slot unavailable, area not serviceable.

## Empty States
- No delivery date selected.

## Loading States
- Calendar loading state.

## Permissions
- Customer owns subscription.

## Future Enhancements
- Delivery window preferences.
