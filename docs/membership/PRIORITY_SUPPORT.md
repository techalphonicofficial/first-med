# Priority Support

## Purpose
Describe priority support for members.

## Business Goals
- Improve member satisfaction and retention.

## Functional Requirements
- Identify member tickets, route them with priority, and show expected response time.

## User Stories
- As a member, I can access faster support.

## UI Components
- Priority support badge, support entry point, ticket status.

## API Contracts
- `POST /support/tickets`
- `GET /support/tickets`

## Zustand Store
- Support modal state.

## React Query Usage
- Cache support tickets and invalidate after creation.

## Validation Rules
- Priority applies only to active members.

## Error States
- Ticket creation failed, membership inactive.

## Empty States
- No support tickets.

## Loading States
- Ticket list skeleton.

## Permissions
- Customer support access; priority flag requires active membership.

## Future Enhancements
- Live chat priority routing.
