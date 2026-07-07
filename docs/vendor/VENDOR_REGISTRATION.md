# Vendor Registration

## Purpose
Allow pharmacy businesses to apply for FirstMED vendor access.

## Business Goals
- Grow verified seller supply.
- Capture complete business information before KYC.

## Functional Requirements
- Collect business name, owner details, contact info, address, GST, drug license, and operating hours.

## User Stories
- As a pharmacy owner, I can submit my business for verification.

## UI Components
- Multi-step registration form, document upload fields, review screen.

## API Contracts
- `POST /vendors/register`
- `GET /vendors/application-status`

## Zustand Store
- Registration wizard step and draft form state.

## React Query Usage
- Submit registration mutation and query application status.

## Validation Rules
- Required business identity, valid license details, valid contact fields.

## Error States
- Duplicate business, invalid documents, submission failed.

## Empty States
- New vendor landing state with registration CTA.

## Loading States
- Disable submit while uploading and registering.

## Permissions
- Public application; dashboard access starts after approval.

## Future Enhancements
- Save-and-resume registration drafts.
