# Vendor Reports

## Purpose
Give vendors operational and financial visibility.

## Business Goals
- Help vendors improve stock, sales, and fulfillment performance.

## Functional Requirements
- Show sales, orders, inventory, returns, low stock, and settlement summaries.

## User Stories
- As a vendor, I can understand which products and periods perform best.

## UI Components
- Metric cards, charts, report filters, export buttons.

## API Contracts
- `GET /vendor/reports/sales`
- `GET /vendor/reports/inventory`

## Zustand Store
- Report date range and filter state.

## React Query Usage
- Cache report queries by date, status, and grouping.

## Validation Rules
- Validate date ranges and export size.

## Error States
- Report unavailable, export failed.

## Empty States
- No report data for selected filters.

## Loading States
- Chart and metric skeletons.

## Permissions
- Reports require vendor reporting permission.

## Future Enhancements
- Scheduled report emails.
