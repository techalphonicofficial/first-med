# Delivery Proof

## Purpose
Capture delivery evidence after successful handoff.

## Business Goals
- Reduce delivery disputes and support refunds/claims.

## Functional Requirements
- Upload proof image or signature where required and link it to delivery record.

## User Stories
- As a delivery partner, I can upload proof before marking delivery complete.

## UI Components
- Proof uploader, camera capture, preview, upload progress.

## API Contracts
- `POST /delivery/:id/proof`

## Zustand Store
- Proof capture modal state.

## React Query Usage
- Invalidate delivery detail after proof upload.

## Validation Rules
- Validate file type, size, and active delivery status.

## Error States
- Upload failed, camera permission denied.

## Empty States
- Proof required only for eligible delivery states.

## Loading States
- Upload progress and disabled complete action.

## Permissions
- Only assigned partner can upload proof.

## Future Enhancements
- Offline proof queue.
