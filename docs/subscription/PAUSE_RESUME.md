# Pause and Resume

## Purpose
Allow customers to temporarily stop and restart subscriptions.

## Business Goals
- Reduce cancellations by adding flexibility.

## Functional Requirements
- Pause from a selected date, show pause reason, resume manually or automatically.

## User Stories
- As a customer, I can pause medicines while travelling.

## UI Components
- Pause modal, resume button, status badge.

## API Contracts
- `POST /subscriptions/:id/pause`
- `POST /subscriptions/:id/resume`

## Zustand Store
- Pause modal state.

## React Query Usage
- Invalidate subscription list and detail after mutation.

## Validation Rules
- Cannot pause already cancelled subscription.

## Error States
- Pause not allowed, resume failed.

## Empty States
- Not applicable.

## Loading States
- Button pending state.

## Permissions
- Customer owns subscription.

## Future Enhancements
- Pause recommendations based on delivery calendar.
