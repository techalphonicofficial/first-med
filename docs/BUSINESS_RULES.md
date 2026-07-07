# Business Rules

## Purpose
Define the product, pharmacy, warehouse, delivery, payment, privacy, and role rules that every FirstMED feature must follow.

## Business Goals
- Keep medicine ordering safe, traceable, and compliant.
- Prevent sensitive medical, customer, and financial data from leaking between roles.
- Ensure stock, prescription, order, and delivery states remain consistent across modules.

## Functional Requirements
- Prescription medicines must require prescription upload or verified prescription approval before fulfillment.
- Orders must not be dispatched until payment and prescription checks are complete where applicable.
- Warehouse stock must be allocated from an active warehouse with available quantity, valid batch, and non-expired inventory.
- Delivery partners must only receive pickup, drop, OTP, payment mode, and navigation information.
- Admin actions that affect orders, products, vendors, warehouses, or prescriptions must be auditable.

## User Stories
- As a customer, I can only buy restricted medicines after prescription validation.
- As a vendor, I can process orders only for approved products and available inventory.
- As a warehouse operator, I can dispatch only allocated and verified stock.
- As an admin, I can review all critical operational activity.

## UI Components
- Status badges for prescription, payment, inventory, and delivery states.
- Confirmation dialogs for irreversible actions.
- Role-aware dashboards and action menus.
- Audit timeline components for admin and warehouse views.

## API Contracts
- APIs must return stable status values, validation errors, and permission errors.
- Mutations must be idempotent where duplicate clicks or retries are possible.
- Sensitive fields must be omitted server-side for unauthorized roles.

## Zustand Store
- Store only UI state, selected filters, local drawers, and temporary form state.
- Do not store sensitive medical data longer than required for the active workflow.

## React Query Usage
- Use query keys scoped by role, module, filters, and entity ID.
- Invalidate order, inventory, warehouse, and prescription queries after state-changing mutations.

## Validation Rules
- Validate required IDs, quantities, dates, prescription status, role permissions, and active entity status.
- Prevent negative stock, expired batch dispatch, and cross-role data access.

## Error States
- Show clear messages for out-of-stock, prescription rejected, payment failed, permission denied, and stale inventory.

## Empty States
- Explain the next action, such as adding inventory, uploading a prescription, or assigning a warehouse.

## Loading States
- Use skeleton rows for tables and disabled action buttons during mutations.

## Permissions
- Customers manage their own data.
- Vendors manage assigned business resources.
- Warehouse operators manage assigned warehouses.
- Delivery partners see delivery-safe data only.
- Admins manage platform-wide configuration by role permission.

## Future Enhancements
- Automated compliance checks.
- Advanced risk scoring for prescriptions and inventory movement.
