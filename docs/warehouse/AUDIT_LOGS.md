# Warehouse Audit Logs

## Purpose
Provide traceability for warehouse inventory and operational changes.

## Business Goals
- Support compliance, investigation, and accountability.

## Functional Requirements
- Record who changed what, when, from where, and why for inventory movements and warehouse actions.

## User Stories
- As an admin, I can review inventory changes for a warehouse or batch.

## UI Components
- Audit timeline, filters, before/after diff view.

## API Contracts
- `GET /warehouse/audit-logs`

## Zustand Store
- Audit filters and selected event detail.

## React Query Usage
- Cache audit logs by entity, warehouse, actor, and date range.

## Validation Rules
- Audit records are append-only.

## Error States
- Logs unavailable, filter too broad.

## Empty States
- No audit events.

## Loading States
- Timeline skeleton.

## Permissions
- Admins view all; operators view assigned warehouse logs where allowed.

## Future Enhancements
- Exportable audit reports.
