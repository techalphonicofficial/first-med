# Invoices

## Purpose
Provide customers access to order invoices and billing records.

## Business Goals
- Support compliance, returns, reimbursements, and customer trust.

## Functional Requirements
- Show invoice number, order details, taxes, discounts, payment status, and download action.

## User Stories
- As a customer, I can download an invoice after my order is confirmed.

## UI Components
- Invoice list, invoice detail, download button, tax summary.

## API Contracts
- `GET /orders/:id/invoice`
- `GET /invoices`

## Zustand Store
- Invoice preview modal state.

## React Query Usage
- Cache invoice metadata; fetch download URL on demand.

## Validation Rules
- Invoice access requires matching customer and eligible order state.

## Error States
- Invoice not ready, download failed.

## Empty States
- No invoices yet.

## Loading States
- Invoice row skeletons and download progress.

## Permissions
- Customers access only their own invoices.

## Future Enhancements
- Email invoice and GST-friendly billing profiles.
