# Forms

## Purpose
Define form design and interaction rules.

## Business Goals
- Reduce errors in high-stakes healthcare workflows.

## Functional Requirements
- Forms must provide labels, helper text, validation, disabled states, save feedback, and accessible errors.

## User Stories
- As a user, I can fix mistakes without guessing.

## UI Components
- Inputs, selects, uploaders, date pickers, checkboxes, radios, step forms.

## API Contracts
- Forms submit normalized payloads and handle server field errors.

## Zustand Store
- Multi-step forms may use store-backed drafts.

## React Query Usage
- Use mutations for submit and invalidate affected queries.

## Validation Rules
- Validate on blur and submit for critical fields.

## Error States
- Field-level and form-level errors must be visually distinct.

## Empty States
- Optional fields should be clearly marked.

## Loading States
- Disable submit during mutation.

## Permissions
- Read-only forms must make locked fields obvious.

## Future Enhancements
- Shared validation schema library.
