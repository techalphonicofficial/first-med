# Expiry Management

## Purpose
Identify, isolate, and prevent dispatch of expired or near-expiry stock.

## Business Goals
- Protect customers and reduce compliance risk.

## Functional Requirements
- Flag near-expiry stock, block expired dispatch, support disposal workflows, and alert operators.

## User Stories
- As an operator, I can see stock that needs action before expiry.

## UI Components
- Expiry dashboard, risk badges, action queue, disposal form.

## API Contracts
- `GET /warehouse/expiry`
- `POST /warehouse/expiry/:batchId/action`

## Zustand Store
- Expiry filters and selected action modal.

## React Query Usage
- Cache expiry lists by warehouse and risk range.

## Validation Rules
- Expired stock must not be sellable or dispatchable.

## Error States
- Batch already dispatched, action not allowed.

## Empty States
- No expiry risks.

## Loading States
- Expiry queue skeleton.

## Permissions
- Operators can act on assigned warehouse expiry queues.

## Future Enhancements
- Automated FEFO allocation.
