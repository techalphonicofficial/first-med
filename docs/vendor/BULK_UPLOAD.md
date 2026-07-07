# Bulk Upload

## Purpose
Allow vendors to upload products and inventory using Excel or PDF-supported workflows.

## Business Goals
- Speed up onboarding for large catalogs.
- Reduce manual data entry.

## Functional Requirements
- Upload files, preview parsed data, validate rows, fix errors, and import approved rows.

## User Stories
- As a vendor, I can upload many products at once and correct invalid rows before import.

## UI Components
- File dropzone, import wizard, validation table, row error messages.

## API Contracts
- `POST /vendor/imports`
- `GET /vendor/imports/:id`
- `POST /vendor/imports/:id/commit`

## Zustand Store
- Import wizard step and selected file metadata.

## React Query Usage
- Poll import processing status and invalidate products/inventory after commit.

## Validation Rules
- Validate required columns, data types, price, SKU, quantity, batch, and expiry.

## Error States
- Parse failed, invalid file, too many row errors.

## Empty States
- No import history.

## Loading States
- Upload progress and processing state.

## Permissions
- Bulk upload requires vendor catalog or inventory permission.

## Future Enhancements
- Downloadable templates and AI-assisted column mapping.
