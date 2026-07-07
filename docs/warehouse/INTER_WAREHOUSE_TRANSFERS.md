# Inter-Warehouse Transfers

## Purpose
Move stock between warehouses to balance availability and demand.

## Business Goals
- Reduce stockouts.
- Improve regional fulfillment speed.

## Functional Requirements
- Request, approve, dispatch, receive, and reconcile stock transfers between warehouses.

## User Stories
- As an operator, I can request stock from another warehouse.
- As an admin, I can approve high-value or controlled transfers.

## UI Components
- Transfer request form, approval queue, transfer timeline, receiving confirmation.

## API Contracts
- `POST /warehouse-transfers`
- `PATCH /warehouse-transfers/:id/status`
- `GET /warehouse-transfers`

## Zustand Store
- Transfer wizard step and selected transfer detail.

## React Query Usage
- Invalidate source and destination warehouse inventory after each transfer state change.

## Validation Rules
- Source warehouse must have available stock; destination must be active.

## Error States
- Transfer rejected, stock changed, destination inactive.

## Empty States
- No transfer requests.

## Loading States
- Transfer queue skeleton.

## Permissions
- Operators request and process assigned tasks; admins approve based on policy.

## Future Enhancements
- Automatic transfer suggestions based on demand forecast.
