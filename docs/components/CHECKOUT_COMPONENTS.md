# Checkout Components

## Purpose
Document reusable checkout UI pieces.

## Business Goals
- Make checkout calm, clear, and conversion-friendly.

## Functional Requirements
- Support steps, address selection, prescription gate, payment selection, and final review.

## User Stories
- As a customer, I can understand what is required before placing an order.

## UI Components
- CheckoutStepper, AddressSelector, PaymentSelector, PrescriptionGate, OrderReview.

## API Contracts
- Checkout components receive validation results and submit callbacks from feature logic.

## Zustand Store
- Active step, selected address, payment mode.

## React Query Usage
- Use checkout validation query and order creation mutation.

## Validation Rules
- Prevent final submit until cart, address, prescription, and payment are valid.

## Error States
- Payment failed, stock changed, address unavailable.

## Empty States
- No address or no payment option.

## Loading States
- Summary skeleton and submit pending state.

## Permissions
- Checkout requires authenticated customer.

## Future Enhancements
- One-click checkout for repeat orders.
