# Prescriptions

## Purpose
Allow customers to upload, manage, and track prescription verification.

## Business Goals
- Keep regulated medicine purchases safe.
- Make verification status understandable.

## Functional Requirements
- Upload prescription images/PDFs, associate prescriptions with orders, show verification status, and handle rejection reasons.

## User Stories
- As a customer, I can upload a prescription during checkout.
- As a customer, I can fix a rejected prescription.

## UI Components
- File uploader, preview, status badge, rejection reason panel, prescription history.

## API Contracts
- `POST /prescriptions`
- `GET /prescriptions`
- `GET /prescriptions/:id`

## Zustand Store
- Upload modal state and selected prescription ID.

## React Query Usage
- Invalidate prescriptions and checkout validation after upload.

## Validation Rules
- Validate file type, file size, image readability, and required customer/order link.

## Error States
- Upload failed, unsupported file, rejected prescription, verification delayed.

## Empty States
- No prescriptions with upload CTA.

## Loading States
- Upload progress and verification pending indicators.

## Permissions
- Customers access only their own prescriptions; admins verify.

## Future Enhancements
- Guided prescription capture and OCR-assisted metadata extraction.
