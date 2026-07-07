# Dispatch

## Purpose
Prepare and release allocated warehouse stock for delivery or vendor handoff.

## Business Goals
- Ensure correct items leave the warehouse on time.

## Functional Requirements
- Show dispatch queue, pick items, verify batch, pack order, print labels, and mark handoff complete.

## User Stories
- As an operator, I can dispatch verified allocated stock.

## UI Components
- Dispatch queue, pick list, packing checklist, label print action.

## API Contracts
- `GET /warehouse/dispatch`
- `POST /warehouse/dispatch/:id/complete`

## Zustand Store
- Dispatch filters and selected task state.

## React Query Usage
- Invalidate dispatch, inventory, and order status after completion.

## Validation Rules
- Dispatch only allocated, verified, non-expired stock.

## Error States
- Allocation missing, batch mismatch, label print failed.

## Empty States
- No dispatch tasks.

## Loading States
- Dispatch queue skeleton and action pending state.

## Permissions
- Operators dispatch from assigned warehouses.

## Future Enhancements
- Scan-to-pack verification.
