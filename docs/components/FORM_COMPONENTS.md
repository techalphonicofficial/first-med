# Form Components

## Purpose
Define reusable form controls and validation patterns.

## Business Goals
- Reduce form errors and improve completion rates.

## Functional Requirements
- Support text, number, select, checkbox, radio, file upload, date, address, and OTP inputs.

## User Stories
- As a user, I understand what each form needs and how to fix errors.

## UI Components
- Input, Select, Textarea, Checkbox, RadioGroup, FileUpload, DatePicker, OTPInput.

## API Contracts
- Forms submit normalized payloads to service methods.

## Zustand Store
- Use local or React Hook Form state; use Zustand only for multi-page wizards.

## React Query Usage
- Use mutations for submit and map server errors to fields.

## Validation Rules
- Validate required, length, pattern, number ranges, file type, and file size.

## Error States
- Inline field error, form-level error, retry action.

## Empty States
- Not applicable to individual controls.

## Loading States
- Disable submit and changed fields during critical mutations.

## Permissions
- Disable controls user cannot edit.

## Future Enhancements
- Shared schema validation.
