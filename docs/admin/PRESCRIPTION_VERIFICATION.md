# Prescription Verification

## Purpose
Allow authorized admins to verify customer prescriptions.

## Business Goals
- Enable safe fulfillment of prescription medicines.

## Functional Requirements
- View prescription file, order context, customer-safe metadata, approve/reject, and record reason.

## User Stories
- As an admin, I can approve valid prescriptions and reject unclear ones.

## UI Components
- Verification queue, document viewer, medicine checklist, decision panel.

## API Contracts
- `GET /admin/prescriptions`
- `PATCH /admin/prescriptions/:id/verify`

## Zustand Store
- Verification filters and selected prescription state.

## React Query Usage
- Invalidate prescription, checkout, and order queries after verification.

## Validation Rules
- Rejection requires reason; approval requires required fields to be readable.

## Error States
- File unavailable, already reviewed, permission denied.

## Empty States
- No prescriptions pending.

## Loading States
- Document viewer and queue skeletons.

## Permissions
- Prescription verification permission required.

## Future Enhancements
- OCR-assisted review support.
