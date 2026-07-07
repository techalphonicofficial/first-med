# KYC Verification

## Purpose
Track vendor compliance documents and approval status.

## Business Goals
- Protect customers by verifying legitimate pharmacies.
- Keep compliance evidence auditable.

## Functional Requirements
- Upload, replace, review status, and display rejection reasons for KYC documents.

## User Stories
- As a vendor, I can see what documents are pending or rejected.

## UI Components
- KYC checklist, document uploader, status badges, rejection note panel.

## API Contracts
- `GET /vendors/kyc`
- `POST /vendors/kyc/documents`

## Zustand Store
- Upload modal and selected document type.

## React Query Usage
- Invalidate KYC status after document upload.

## Validation Rules
- Validate document type, expiry date, file format, and file size.

## Error States
- Upload failed, document expired, verification rejected.

## Empty States
- No documents uploaded.

## Loading States
- Checklist skeleton and upload progress.

## Permissions
- Vendor owners manage KYC; admins verify.

## Future Enhancements
- Automated document expiry reminders.
