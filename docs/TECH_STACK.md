# Tech Stack

## Purpose
Define the frontend technologies and usage principles for FirstMED.

## Business Goals
- Build a scalable, fast, secure healthcare platform.
- Use modern tools without adding unnecessary complexity.

## Stack
| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 App Router |
| UI | React 19 |
| Language | JavaScript |
| Styling | Tailwind CSS |
| Client State | Zustand |
| Server State | TanStack React Query |
| Forms | React Hook Form |
| HTTP | Axios |
| Animation | Framer Motion |
| Notifications | Sonner |
| Realtime | Socket.io |
| PWA | next-pwa |

## Functional Requirements
- Use Server Components for static and server-derived views.
- Use Client Components for interactivity, forms, local state, and browser APIs.
- Keep API calls behind service functions.

## User Stories
- As a developer, I can follow one consistent stack across every module.
- As a user, I get fast loading, accessible interactions, and reliable feedback.

## UI Components
- Tailwind utilities should be composed into reusable components for repeated patterns.

## API Contracts
- Axios clients must centralize base URL, auth headers, error mapping, and refresh behavior.

## Zustand Store
- Use Zustand for UI state and cross-page client preferences.

## React Query Usage
- Use React Query for remote data, cache invalidation, retries, and optimistic updates.

## Validation Rules
- Forms must validate client-side and surface server-side validation errors.

## Error States
- Use consistent error boundaries, toast messages, and inline field errors.

## Empty States
- Design empty states as part of the feature, not as afterthoughts.

## Loading States
- Prefer skeletons over spinners for structured content.

## Permissions
- Authorization must be checked server-side and reflected in the UI.

## Future Enhancements
- Add testing standards for unit, integration, accessibility, and visual regression testing.
