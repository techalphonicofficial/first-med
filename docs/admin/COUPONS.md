# Coupons

## Purpose
Manage coupon codes and redemption rules.

## Business Goals
- Drive targeted discounts with controlled usage.

## Functional Requirements
- Create coupon code, discount value, usage limits, customer eligibility, date range, and status.

## User Stories
- As an admin, I can create a coupon for a customer campaign.

## UI Components
- Coupon table, coupon form, usage summary.

## API Contracts
- `GET /admin/coupons`
- `POST /admin/coupons`
- `PATCH /admin/coupons/:id`

## Zustand Store
- Coupon editor and filter state.

## React Query Usage
- Invalidate coupon and checkout validation queries after changes.

## Validation Rules
- Code must be unique; discount must respect limits.

## Error States
- Duplicate code, expired coupon, usage limit exceeded.

## Empty States
- No coupons configured.

## Loading States
- Coupon table skeleton.

## Permissions
- Coupon management permission required.

## Future Enhancements
- Bulk coupon generation.
