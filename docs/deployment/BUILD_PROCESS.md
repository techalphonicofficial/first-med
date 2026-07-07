# Build Process

## Purpose
Define frontend build and release expectations.

## Business Goals
- Catch issues before deployment.

## Functional Requirements
- Install dependencies, lint, type/check where available, build, inspect output, and smoke test critical routes.

## User Stories
- As a developer, I can verify the app before release.

## UI Components
- All route groups must build successfully.

## API Contracts
- Build should not require live protected API data.

## Zustand Store
- Persisted store migrations should be tested.

## React Query Usage
- Query code must be safe for server/client boundaries.

## Validation Rules
- Production build must pass before deployment.

## Error States
- Build errors should block release.

## Empty States
- Test empty states in smoke checks.

## Loading States
- Test loading states for critical routes.

## Permissions
- Production config must not expose secrets.

## Future Enhancements
- CI build pipeline.
