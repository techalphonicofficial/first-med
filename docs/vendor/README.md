# Vendor Documentation

## Purpose
Document pharmacy business workflows for onboarding, products, inventory, orders, returns, reports, and employees.

## Business Goals
- Help vendors manage operations efficiently.
- Ensure only verified pharmacies sell regulated products.

## Functional Requirements
- Vendors can register, complete KYC, manage catalog, update inventory, process orders, handle returns, and view reports.

## User Stories
- As a vendor, I can manage my pharmacy inventory and orders from one dashboard.

## UI Components
- Vendor dashboard, product tables, inventory editor, order queue, upload tools, reports cards.

## API Contracts
- Vendor APIs must scope data to the authenticated vendor business.

## Zustand Store
- Table filters, selected rows, upload wizard state, drawer state.

## React Query Usage
- Cache products, inventory, orders, returns, reports, and employee lists.

## Validation Rules
- Require verified vendor status before product publishing or fulfillment.

## Error States
- KYC pending, product rejected, inventory conflict, order unavailable.

## Empty States
- No products, no orders, no reports, no employees.

## Loading States
- Dense table skeletons and optimistic row updates where safe.

## Permissions
- Vendor owners manage settings; employees act based on assigned permissions.

## Future Enhancements
- Advanced ERP sync and automated replenishment suggestions.
