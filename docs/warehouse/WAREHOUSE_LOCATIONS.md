# Warehouse Locations

## Purpose
Manage physical warehouse addresses, service areas, and operational metadata.

## Business Goals
- Route orders to the right fulfillment location.
- Keep delivery promises realistic.

## Functional Requirements
- Store address, pincode coverage, city, state, geolocation, operating hours, and active status.

## User Stories
- As an admin, I can configure where a warehouse operates.

## UI Components
- Location form, service area editor, map preview, status controls.

## API Contracts
- `GET /warehouse-locations`
- `POST /warehouse-locations`
- `PATCH /warehouse-locations/:id`

## Zustand Store
- Location editor and selected service area state.

## React Query Usage
- Cache locations and invalidate allocation rules after location changes.

## Validation Rules
- Require valid address, pincode coverage, and unique warehouse code.

## Error States
- Duplicate location, invalid pincode, map unavailable.

## Empty States
- No locations configured.

## Loading States
- Location table skeleton.

## Permissions
- Admin-only configuration; operators can view assigned location.

## Future Enhancements
- Map-based polygon service areas.
