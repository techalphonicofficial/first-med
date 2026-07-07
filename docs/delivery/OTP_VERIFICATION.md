# OTP Verification

## Purpose
Confirm that the order is delivered to the correct recipient.

## Business Goals
- Reduce incorrect deliveries and disputes.

## Functional Requirements
- Generate delivery OTP, collect OTP at drop, validate before completion.

## User Stories
- As a delivery partner, I can complete delivery only after entering the correct OTP.

## UI Components
- OTP input, resend instruction, verification status.

## API Contracts
- `POST /delivery/:id/verify-otp`

## Zustand Store
- OTP form state.

## React Query Usage
- Invalidate active delivery and order status after verification.

## Validation Rules
- OTP must match active delivery and must not be expired.

## Error States
- Incorrect OTP, expired OTP, too many attempts.

## Empty States
- OTP screen appears only for active drop step.

## Loading States
- Disable verification button while checking OTP.

## Permissions
- Only assigned partner can verify delivery OTP.

## Future Enhancements
- Alternate secure handoff verification.
