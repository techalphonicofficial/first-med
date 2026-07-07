# Vendor Returns

## Purpose
Manage returned or rejected items from vendor-side fulfillment.

## Business Goals
- Keep financial and inventory records accurate.
- Resolve customer issues transparently.

## Functional Requirements
- View return requests, inspect item condition, approve/reject, restock eligible items, and record reason.

## User Stories
- As a vendor, I can process returns with clear reason tracking.

## UI Components
- Return queue, condition selector, reason form, evidence viewer.

## API Contracts
- `GET /vendor/returns`
- `PATCH /vendor/returns/:id`

## Zustand Store
- Return filters and selected return modal.

## React Query Usage
- Invalidate returns, orders, and inventory after decisions.

## Validation Rules
- Require reason and condition before approving or rejecting.

## Error States
- Return window expired, item not eligible, update failed.

## Empty States
- No returns.

## Loading States
- Return list skeleton.

## Permissions
- Returns require vendor returns permission.

## Future Enhancements
- Automated return eligibility scoring.
