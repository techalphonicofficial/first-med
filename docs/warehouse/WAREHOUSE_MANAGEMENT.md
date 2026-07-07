# Warehouse Management

## Purpose
Provide the central operating model for managing FirstMED warehouses.

## Business Goals
- Make warehouse operations reliable, measurable, and scalable.

## Functional Requirements
- Create and manage warehouse profiles, assign operators, set active status, and track operational capacity.

## User Stories
- As an admin, I can manage warehouses and assign responsible operators.

## UI Components
- Warehouse list, warehouse profile form, operator assignment panel, status badge.

## API Contracts
- `GET /warehouses`
- `POST /warehouses`
- `PATCH /warehouses/:id`

## Zustand Store
- Selected warehouse and management drawer state.

## React Query Usage
- Cache warehouse list and invalidate after configuration changes.

## Validation Rules
- Require name, code, address, service area, and active status.

## Error States
- Duplicate code, inactive warehouse, missing service area.

## Empty States
- No warehouses configured.

## Loading States
- Warehouse table skeleton.

## Permissions
- Admins manage; operators view assigned warehouses.

## Future Enhancements
- Warehouse capacity forecasting.
