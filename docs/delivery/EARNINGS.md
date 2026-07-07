# Delivery Earnings

## Purpose
Show delivery partners their earnings from completed deliveries.

## Business Goals
- Maintain payout transparency.

## Functional Requirements
- Display daily, weekly, monthly earnings, completed deliveries, incentives, and payout status.

## User Stories
- As a delivery partner, I can track how much I earned.

## UI Components
- Earnings cards, history table, payout badge, date filter.

## API Contracts
- `GET /delivery/earnings`

## Zustand Store
- Date range filter state.

## React Query Usage
- Cache earnings by date range.

## Validation Rules
- Date range must be valid and within allowed export limits.

## Error States
- Earnings unavailable, payout delayed.

## Empty States
- No earnings for selected period.

## Loading States
- Metric and table skeletons.

## Permissions
- Partners view only their own earnings.

## Future Enhancements
- Download payout statements.
