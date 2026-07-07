# Membership Documentation

## Purpose
Document FirstMED premium membership experiences.

## Business Goals
- Increase retention through free delivery, discounts, rewards, and priority support.

## Functional Requirements
- Show membership plans, benefits, status, renewals, rewards, and support priority.

## User Stories
- As a customer, I can understand and manage my membership benefits.

## UI Components
- Membership status card, plan cards, benefit list, rewards summary.

## API Contracts
- Membership APIs must return plan eligibility and active benefit state.

## Zustand Store
- Membership modal and selected plan.

## React Query Usage
- Cache membership status and invalidate after purchase or renewal.

## Validation Rules
- Membership benefits apply only to eligible orders.

## Error States
- Payment failed, plan unavailable.

## Empty States
- No active membership.

## Loading States
- Plan card skeletons.

## Permissions
- Customer-only membership management.

## Future Enhancements
- Family membership plans.
