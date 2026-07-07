# Vendor Invoices

## Purpose
Let vendors access invoice and billing records for processed orders.

## Business Goals
- Support accounting, compliance, and reconciliation.

## Functional Requirements
- List invoices, show order link, tax details, settlement status, and download action.

## User Stories
- As a vendor, I can download invoices for my processed orders.

## UI Components
- Invoice table, invoice detail drawer, download button, settlement badge.

## API Contracts
- `GET /vendor/invoices`
- `GET /vendor/invoices/:id`

## Zustand Store
- Invoice filters and preview state.

## React Query Usage
- Cache invoice list by date and status.

## Validation Rules
- Restrict invoice access to vendor-owned records.

## Error States
- Invoice not generated, download failed.

## Empty States
- No invoices for selected period.

## Loading States
- Table skeleton and download progress.

## Permissions
- Vendor finance permission required for invoice access.

## Future Enhancements
- Monthly invoice bundle export.
