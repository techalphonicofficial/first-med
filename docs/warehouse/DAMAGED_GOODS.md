# Damaged Goods

## Purpose
Record and isolate damaged, unusable, or unsellable stock.

## Business Goals
- Protect customers and preserve inventory accuracy.

## Functional Requirements
- Mark quantity as damaged, capture reason, evidence, batch, warehouse, and disposal status.

## User Stories
- As an operator, I can remove damaged stock from sellable inventory.

## UI Components
- Damaged goods form, evidence upload, status table.

## API Contracts
- `POST /warehouse/damaged-goods`
- `GET /warehouse/damaged-goods`

## Zustand Store
- Damage report modal state.

## React Query Usage
- Invalidate inventory and damaged goods list after reporting.

## Validation Rules
- Damaged quantity must not exceed available quantity.

## Error States
- Quantity conflict, evidence upload failed.

## Empty States
- No damaged goods records.

## Loading States
- Damaged goods table skeleton.

## Permissions
- Operators report; admins review and close where required.

## Future Enhancements
- Disposal certificate management.
