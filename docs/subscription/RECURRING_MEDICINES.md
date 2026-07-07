# Recurring Medicines

## Purpose
Manage medicines included in a subscription.

## Business Goals
- Reduce missed refills for long-term care.

## Functional Requirements
- Add, remove, update quantity, verify prescription needs, and check availability.

## User Stories
- As a customer, I can manage medicines in my monthly subscription.

## UI Components
- Medicine list, quantity stepper, prescription status badge.

## API Contracts
- `PATCH /subscriptions/:id/items`

## Zustand Store
- Subscription item editor state.

## React Query Usage
- Invalidate subscription detail after item changes.

## Validation Rules
- Items must be available and prescription-valid where required.

## Error States
- Medicine discontinued, prescription expired.

## Empty States
- No medicines added.

## Loading States
- Item list skeleton.

## Permissions
- Customer owns subscription.

## Future Enhancements
- Auto-suggest refills from order history.
