# Banner Management

## Purpose
Manage promotional banners across customer-facing pages.

## Business Goals
- Support campaigns without code deployment.

## Functional Requirements
- Create, schedule, target, reorder, and deactivate banners.

## User Stories
- As an admin, I can launch a homepage campaign.

## UI Components
- Banner table, image uploader, schedule picker, placement selector.

## API Contracts
- `GET /admin/banners`
- `POST /admin/banners`
- `PATCH /admin/banners/:id`

## Zustand Store
- Banner editor and preview state.

## React Query Usage
- Invalidate banners after changes.

## Validation Rules
- Require image, placement, start date, and end date where scheduled.

## Error States
- Image upload failed, invalid schedule.

## Empty States
- No banners configured.

## Loading States
- Banner table skeleton.

## Permissions
- Marketing/admin banner permission required.

## Future Enhancements
- A/B testing and performance metrics.
