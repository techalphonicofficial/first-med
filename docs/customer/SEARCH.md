# Search

## Purpose
Enable fast, forgiving medicine and healthcare product search.

## Business Goals
- Reduce time to product.
- Support misspellings, brand/generic terms, and category discovery.

## Functional Requirements
- Search by product name, salt, brand, category, and common keywords.
- Support suggestions, recent searches, filters, and no-result recovery.

## User Stories
- As a customer, I can search even if I do not know the exact spelling.
- As a customer, I can refine results without losing my query.

## UI Components
- Search input, suggestion dropdown, result list, filter controls, recent search chips.

## API Contracts
- `GET /search?q=`
- `GET /search/suggestions?q=`

## Zustand Store
- Recent searches and search overlay state.

## React Query Usage
- Debounce search suggestions and cache results by query and filters.

## Validation Rules
- Trim query, enforce minimum length for suggestions, sanitize input.

## Error States
- Search unavailable, slow network, invalid query.

## Empty States
- Show spelling help, popular categories, and upload prescription option.

## Loading States
- Inline suggestion skeletons and result placeholders.

## Permissions
- Search is public; personalized recent searches require customer session.

## Future Enhancements
- Voice search and prescription image-assisted search.
