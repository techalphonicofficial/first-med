# Delivery Partner Management

## Purpose
Manage delivery partner accounts, eligibility, and operational status.

## Business Goals
- Maintain reliable delivery capacity.

## Functional Requirements
- View partners, approve onboarding, activate/suspend, review delivery performance.

## User Stories
- As an admin, I can manage partner access and availability.

## UI Components
- Partner table, status badge, performance cards, approval drawer.

## API Contracts
- `GET /admin/delivery-partners`
- `PATCH /admin/delivery-partners/:id`

## Zustand Store
- Partner filters and selected partner state.

## React Query Usage
- Cache partners by status and region.

## Validation Rules
- Suspensions require reason.

## Error States
- Partner not found, active delivery conflict.

## Empty States
- No partners for selected filters.

## Loading States
- Table skeleton.

## Permissions
- Admin delivery management permission required.

## Future Enhancements
- Partner reliability scoring.
