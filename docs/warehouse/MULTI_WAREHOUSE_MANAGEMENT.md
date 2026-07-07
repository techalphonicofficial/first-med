# Multi-Warehouse Management

## Purpose
Coordinate inventory and fulfillment across multiple warehouse locations inside FirstMED.

## Business Goals
- Improve delivery speed by allocating from the best warehouse.
- Reduce stockouts through inter-warehouse visibility.
- Support nationwide scale without changing the customer checkout experience.

## Functional Requirements
- Maintain warehouse-wise stock, availability, service areas, priority rules, and transfer status.
- Allow admins to configure allocation logic by location, stock freshness, delivery SLA, and capacity.

## User Stories
- As an admin, I can view all warehouses and compare stock levels.
- As a warehouse operator, I can work only on my assigned warehouse.
- As a customer, I get the fastest available fulfillment option without seeing operational complexity.

## UI Components
- Warehouse switcher, stock comparison table, allocation rule editor, warehouse health cards.

## API Contracts
- `GET /warehouses/summary`
- `GET /inventory?warehouseId=`
- `POST /warehouse-allocation/preview`

## Zustand Store
- Selected warehouse, comparison filters, allocation preview drawer.

## React Query Usage
- Query summaries by region and invalidate affected warehouses after transfers.

## Validation Rules
- Allocation must use active warehouses with sellable stock and serviceable delivery coverage.

## Error States
- No eligible warehouse, allocation conflict, warehouse inactive.

## Empty States
- No warehouse selected, no stock in selected region.

## Loading States
- Summary cards and comparison table skeletons.

## Permissions
- Admins view all warehouses; operators view assigned warehouses.

## Future Enhancements
- AI-assisted allocation recommendations and automatic transfer suggestions.
