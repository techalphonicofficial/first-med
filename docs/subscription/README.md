# Subscription Documentation

## Purpose
Document recurring medicine delivery workflows.

## Business Goals
- Make repeat medicine purchases predictable and convenient.

## Functional Requirements
- Customers can subscribe, set frequency, pause, resume, skip, and cancel recurring deliveries.

## User Stories
- As a customer, I can schedule monthly medicines without ordering every time.

## UI Components
- Subscription cards, plan selector, frequency controls, pause/resume actions.

## API Contracts
- Subscription APIs must validate medicine availability and prescription requirements.

## Zustand Store
- Subscription editor state.

## React Query Usage
- Cache subscription list and invalidate after lifecycle changes.

## Validation Rules
- Subscription must have valid items, address, frequency, and payment method.

## Error States
- Payment issue, prescription expired, product unavailable.

## Empty States
- No active subscriptions.

## Loading States
- Subscription card skeletons.

## Permissions
- Customers manage only their own subscriptions.

## Future Enhancements
- Smart refill reminders.
