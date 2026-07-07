# Data Privacy

## Purpose
Protect customer personal information, medical context, and financial data.

## Business Goals
- Build user trust and reduce privacy risk.

## Functional Requirements
- Mask sensitive data, scope API responses, limit delivery partner visibility, and clear caches on logout.

## User Stories
- As a customer, my medicine details are not shown to delivery partners.

## UI Components
- Masked fields, privacy-safe cards, consent notices.

## API Contracts
- Response schemas must be role-specific and omit forbidden fields.

## Zustand Store
- Do not persist sensitive medical or financial records in local storage.

## React Query Usage
- Clear sensitive query caches after logout and role switch.

## Validation Rules
- Review all role-facing DTOs for data minimization.

## Error States
- Privacy violation should block UI rendering and be logged.

## Empty States
- Use generic messages for unauthorized resources.

## Loading States
- Avoid showing stale sensitive data during refetch.

## Permissions
- Privacy follows least privilege.

## Future Enhancements
- Privacy regression tests for API payloads.
