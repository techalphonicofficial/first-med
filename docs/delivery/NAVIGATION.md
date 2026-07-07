# Navigation

## Purpose
Help delivery partners navigate pickup and drop locations.

## Business Goals
- Improve delivery speed and reduce address confusion.

## Functional Requirements
- Show pickup/drop locations, open maps, and provide delivery instructions.

## User Stories
- As a delivery partner, I can navigate to pickup and drop locations.

## UI Components
- Map action buttons, location cards, instruction panel.

## API Contracts
- `GET /delivery/:id/route`

## Zustand Store
- Navigation mode and map state.

## React Query Usage
- Query route details for active assignment.

## Validation Rules
- Route access requires active assignment.

## Error States
- Map unavailable, location missing.

## Empty States
- No route until delivery is assigned.

## Loading States
- Map placeholder and route loading.

## Permissions
- Assigned delivery partner only.

## Future Enhancements
- Multi-stop optimized routes.
