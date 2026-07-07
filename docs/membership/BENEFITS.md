# Membership Benefits

## Purpose
Explain how membership benefits apply across FirstMED.

## Business Goals
- Make benefits visible and trustworthy.

## Functional Requirements
- Support free delivery, extra discounts, cashback, faster delivery, priority support, and exclusive offers.

## User Stories
- As a member, I can see which benefits applied to my order.

## UI Components
- Benefit badges, checkout savings summary, membership banner.

## API Contracts
- `GET /membership/benefits`

## Zustand Store
- Benefit explanation modal state.

## React Query Usage
- Fetch active benefit state during cart and checkout validation.

## Validation Rules
- Apply benefits only within plan terms and eligibility.

## Error States
- Benefit unavailable, terms not met.

## Empty States
- No active benefits for non-members.

## Loading States
- Benefit row skeletons.

## Permissions
- Customer access.

## Future Enhancements
- Personalized benefit tracker.
