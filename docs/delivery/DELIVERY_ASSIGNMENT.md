# Delivery Assignment

## Purpose
Assign delivery tasks to eligible partners.

## Business Goals
- Reduce delivery time and improve partner utilization.

## Functional Requirements
- Show available and assigned deliveries with pickup, drop, payment mode, and SLA.

## User Stories
- As a delivery partner, I can accept or reject assigned deliveries.

## UI Components
- Assignment list, accept/reject buttons, SLA badge.

## API Contracts
- `GET /delivery/assignments`
- `POST /delivery/assignments/:id/accept`
- `POST /delivery/assignments/:id/reject`

## Zustand Store
- Assignment filters and selected assignment.

## React Query Usage
- Invalidate assignments after accept/reject.

## Validation Rules
- Partner must be active and eligible.

## Error States
- Assignment expired, already accepted, permission denied.

## Empty States
- No active assignments.

## Loading States
- Assignment card skeletons.

## Permissions
- Delivery partners see only assigned or eligible tasks.

## Future Enhancements
- Smart assignment based on distance and workload.
