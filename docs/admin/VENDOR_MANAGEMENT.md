# Vendor Management

## Purpose
Allow admins to review, approve, suspend, and support vendors.

## Business Goals
- Keep marketplace quality high and compliant.

## Functional Requirements
- Manage vendor applications, KYC status, business profile, products, and operational status.

## User Stories
- As an admin, I can approve only verified vendors.

## UI Components
- Vendor table, KYC review panel, status controls, rejection reason form.

## API Contracts
- `GET /admin/vendors`
- `PATCH /admin/vendors/:id/status`

## Zustand Store
- Vendor filters and review drawer state.

## React Query Usage
- Invalidate vendor list after status changes.

## Validation Rules
- Rejection and suspension require reason.

## Error States
- Vendor already reviewed, missing documents.

## Empty States
- No vendor applications.

## Loading States
- Vendor table skeleton.

## Permissions
- Vendor approvals require admin verification permission.

## Future Enhancements
- Vendor performance scorecards.
