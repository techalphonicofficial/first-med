# Folder Structure

## Purpose
Define how FirstMED frontend files should be organized so features remain modular, discoverable, and easy to scale.

## Business Goals
- Keep each module independently maintainable.
- Reduce duplicated UI and business logic.
- Make onboarding faster for developers and designers.

## Recommended Structure
```txt
src/
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── services/
├── stores/
├── styles/
└── utils/
```

## Functional Requirements
- Route files belong in `src/app`.
- Shared UI belongs in `src/components`.
- Domain behavior belongs in `src/features/{module}`.
- API clients belong in `src/services`.
- Zustand stores belong in `src/stores`.
- Pure helpers belong in `src/utils`.

## User Stories
- As a developer, I can find a feature by module name.
- As a reviewer, I can identify whether code is shared, route-specific, or domain-specific.

## UI Components
- Prefer small, composable components with explicit props.
- Keep page layouts separate from reusable widgets.

## API Contracts
- API clients should expose intent-based methods such as `getOrders`, `createTransfer`, and `verifyPrescription`.

## Zustand Store
- Create stores per domain when state is shared across routes.
- Keep server data in React Query, not Zustand.

## React Query Usage
- Keep query keys centralized per feature where practical.

## Validation Rules
- Feature folders must not import from unrelated feature internals.
- Shared components must not contain business-specific API calls.

## Error States
- Provide reusable error boundaries and feature-specific inline errors.

## Empty States
- Use shared empty state patterns with module-specific copy.

## Loading States
- Use consistent skeletons for tables, cards, forms, and dashboards.

## Permissions
- Role checks should be centralized through auth helpers and route guards.

## Future Enhancements
- Add architecture decision records for major folder-level changes.
