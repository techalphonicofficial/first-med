# Admin Reports

## Purpose
Provide platform-wide operational, financial, inventory, and delivery reporting.

## Business Goals
- Help leadership monitor health, growth, risk, and performance.

## Functional Requirements
- Show KPIs, filtered reports, exports, and module-level drilldowns.

## User Stories
- As an admin, I can understand platform performance at a glance.

## UI Components
- Metric cards, charts, tables, date filters, export actions.

## API Contracts
- `GET /admin/reports/*`

## Zustand Store
- Report filters, date range, and selected view.

## React Query Usage
- Cache reports by filter and date range.

## Validation Rules
- Validate export limits and date ranges.

## Error States
- Report generation failed, no permission.

## Empty States
- No data for selected range.

## Loading States
- Dashboard skeletons.

## Permissions
- Report access should be granular by data type.

## Future Enhancements
- Scheduled report delivery.
