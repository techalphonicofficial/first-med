# Live Tracking

## Purpose
Track active delivery progress for operational visibility and customer updates.

## Business Goals
- Improve delivery transparency.
- Reduce customer support queries.

## Functional Requirements
- Capture partner location during active delivery and update order timeline.

## User Stories
- As a customer, I can see delivery progress after dispatch.

## UI Components
- Map view, tracking timeline, ETA display.

## API Contracts
- `POST /delivery/location`
- `GET /orders/:id/tracking`

## Zustand Store
- Map viewport and active route UI state.

## React Query Usage
- Use polling or realtime updates for active tracking.

## Validation Rules
- Track only during active assigned delivery.

## Error States
- Location permission denied, tracking delayed.

## Empty States
- Tracking starts after dispatch.

## Loading States
- Map loading and ETA placeholder.

## Permissions
- Customers see their order tracking; delivery partners update their active job.

## Future Enhancements
- More accurate ETA and route deviation alerts.
