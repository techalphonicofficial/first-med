# Membership Plans

## Purpose
Define available FirstMED membership plans.

## Business Goals
- Offer clear value tiers for customers.

## Functional Requirements
- Display price, duration, benefits, eligibility, renewal behavior, and terms.

## User Stories
- As a customer, I can compare plans before buying.

## UI Components
- Plan comparison cards, selected plan summary, terms link.

## API Contracts
- `GET /membership/plans`
- `POST /membership/subscribe`

## Zustand Store
- Selected plan and purchase modal state.

## React Query Usage
- Cache available plans and membership status.

## Validation Rules
- Prevent duplicate active plan purchase unless upgrading/renewing.

## Error States
- Plan unavailable, payment failed.

## Empty States
- No plans available.

## Loading States
- Plan skeletons.

## Permissions
- Customer access.

## Future Enhancements
- Upgrade and downgrade flows.
