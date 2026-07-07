# Batch Management

## Purpose
Track medicine batches for safety, expiry, and recall readiness.

## Business Goals
- Maintain traceability for regulated healthcare inventory.

## Functional Requirements
- Record batch number, manufacturer, received date, expiry date, quantity, and warehouse.

## User Stories
- As an operator, I can trace stock to a batch before dispatch.

## UI Components
- Batch table, batch detail drawer, expiry badge, movement timeline.

## API Contracts
- `GET /warehouse/batches`
- `POST /warehouse/batches`
- `PATCH /warehouse/batches/:id`

## Zustand Store
- Batch filters and selected batch state.

## React Query Usage
- Cache batches by product, warehouse, and expiry status.

## Validation Rules
- Batch number and expiry date are required for medicine inventory.

## Error States
- Duplicate batch, expired batch, locked batch.

## Empty States
- No batches available.

## Loading States
- Batch table skeleton.

## Permissions
- Operators manage assigned warehouse batches.

## Future Enhancements
- Recall management workflows.
