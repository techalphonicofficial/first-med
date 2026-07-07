# Buttons

## Purpose
Define button patterns and action hierarchy.

## Business Goals
- Make user actions predictable and safe.

## Functional Requirements
- Support primary, secondary, ghost, destructive, icon, loading, disabled, and full-width mobile variants.

## User Stories
- As a user, I can identify the main action on every screen.

## UI Components
- Button, IconButton, ButtonGroup, FloatingActionButton where appropriate.

## API Contracts
- Buttons receive callbacks and loading/disabled state from parents.

## Zustand Store
- Not applicable except action menus or command bars.

## React Query Usage
- Mutation pending state drives loading buttons.

## Validation Rules
- Destructive actions require confirmation when irreversible.

## Error States
- Failed actions should restore button state and show feedback.

## Empty States
- Empty state CTAs use primary or secondary buttons.

## Loading States
- Loading buttons should prevent duplicate submissions.

## Permissions
- Unauthorized actions are hidden or disabled with explanation where useful.

## Future Enhancements
- Icon library standardization.
