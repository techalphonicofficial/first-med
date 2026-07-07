# Product Approval

## Purpose
Review and approve vendor-submitted product listings.

## Business Goals
- Keep product catalog safe, accurate, and compliant.

## Functional Requirements
- Review product details, images, category, prescription requirement, price, and vendor information.

## User Stories
- As an admin, I can approve or reject products with reasons.

## UI Components
- Approval queue, product preview, approve/reject actions, rejection reason form.

## API Contracts
- `GET /admin/product-approvals`
- `PATCH /admin/product-approvals/:id`

## Zustand Store
- Approval filters and selected product review.

## React Query Usage
- Invalidate approval queue and product lists after decision.

## Validation Rules
- Rejection requires reason.

## Error States
- Product already reviewed, missing required data.

## Empty States
- No pending approvals.

## Loading States
- Approval card skeleton.

## Permissions
- Product approval permission required.

## Future Enhancements
- Automated compliance suggestions.
