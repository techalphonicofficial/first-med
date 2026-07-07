# Authentication

## Purpose
Allow customers to securely register, log in, and maintain authenticated sessions.

## Business Goals
- Build trust through secure access.
- Reduce checkout abandonment with simple sign-in flows.

## Functional Requirements
- Support register, login, logout, session refresh, and protected account routes.
- Show authenticated state consistently across header, cart, checkout, and account pages.

## User Stories
- As a guest, I can browse products before signing in.
- As a customer, I can log in before checkout and continue my journey.

## UI Components
- Login form, register form, OTP/password inputs, account menu, protected route fallback.

## API Contracts
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

## Zustand Store
- Store lightweight auth UI state only; session truth should come from the server.

## React Query Usage
- Query current user with `auth.me`.
- Invalidate user, cart, and account queries after login/logout.

## Validation Rules
- Validate name, email or phone, password or OTP, and required consent.

## Error States
- Invalid credentials, expired session, blocked account, network failure.

## Empty States
- For protected pages, guide unauthenticated users to sign in.

## Loading States
- Disable submit buttons and show inline progress during authentication.

## Permissions
- Guests can browse; authenticated customers can purchase and manage account data.

## Future Enhancements
- Social login and passwordless OTP-first authentication.
