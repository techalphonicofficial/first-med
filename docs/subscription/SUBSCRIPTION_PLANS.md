# Subscription Plans

## Purpose
Define recurring delivery plan options.

## Business Goals
- Give customers flexible medicine refill choices.

## Functional Requirements
- Support plan creation, frequency selection, item list, address, and payment preference.

## User Stories
- As a customer, I can choose a plan that matches my medicine schedule.

## UI Components
- Plan cards, frequency selector, item summary.

## API Contracts
- `GET /subscriptions/plans`

## Zustand Store
- Selected plan state.

## React Query Usage
- Cache plans and eligibility.

## Validation Rules
- Plan must be compatible with selected medicines.

## Error States
- Plan unavailable.

## Empty States
- No plans available.

## Loading States
- Plan card skeletons.

## Permissions
- Customer access.

## Future Enhancements
- Personalized plan recommendations.
