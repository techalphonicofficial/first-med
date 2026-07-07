# API Conventions

## Purpose
Define naming, response, error, pagination, and mutation conventions.

## Business Goals
- Reduce integration bugs and inconsistent UX.

## Functional Requirements
- Use RESTful resource naming, stable IDs, ISO dates, pagination metadata, and typed error codes.

## User Stories
- As a developer, I can handle all API errors consistently.

## UI Components
- Forms and tables should consume consistent API metadata.

## API Contracts
```json
{
  "data": {},
  "meta": {},
  "error": null
}
```

## Zustand Store
- Store only derived UI controls.

## React Query Usage
- Query keys should include module, resource, params, and ID.

## Validation Rules
- Server validation errors should map to field names.

## Error States
- Use stable codes such as `VALIDATION_ERROR`, `FORBIDDEN`, `NOT_FOUND`, and `CONFLICT`.

## Empty States
- Empty collection response should be `data: []`.

## Loading States
- APIs should support efficient pagination for skeleton replacement.

## Permissions
- Unauthorized responses must not leak resource details.

## Future Enhancements
- Shared API client generator.
