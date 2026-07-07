# Environment Variables

## Purpose
Document required frontend environment variables.

## Business Goals
- Prevent broken builds and misconfigured environments.

## Functional Requirements
- Define API URL, maps key, realtime URL, PWA settings, and feature flags.

## User Stories
- As a developer, I know what configuration is required locally and in production.

## UI Components
- Environment variables affect API clients, maps, realtime, and feature visibility.

## API Contracts
- `NEXT_PUBLIC_API_BASE_URL` must point to the correct backend environment.

## Zustand Store
- Not applicable.

## React Query Usage
- API base URL affects all query functions.

## Validation Rules
- Never expose private secrets with `NEXT_PUBLIC_`.

## Error States
- Missing env vars should fail early where possible.

## Empty States
- Not applicable.

## Loading States
- Not applicable.

## Permissions
- Only public-safe config belongs in frontend env vars.

## Future Enhancements
- Runtime config validation.
