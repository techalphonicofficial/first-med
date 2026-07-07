# Notifications

## Purpose
Keep customers informed about prescription, order, payment, delivery, and subscription events.

## Business Goals
- Reduce uncertainty and support contacts.
- Improve timely customer action.

## Functional Requirements
- Support in-app, email, SMS, and push notification preferences.
- Show unread count and notification history.

## User Stories
- As a customer, I receive alerts when my order status changes.

## UI Components
- Notification bell, notification list, preference toggles, unread badge.

## API Contracts
- `GET /notifications`
- `PATCH /notifications/:id/read`
- `PATCH /notification-preferences`

## Zustand Store
- Notification drawer state.

## React Query Usage
- Poll or subscribe for new notifications; invalidate unread count after read actions.

## Validation Rules
- Preferences must respect mandatory transactional notifications.

## Error States
- Notification load failed, preference save failed.

## Empty States
- No notifications.

## Loading States
- Notification skeleton rows.

## Permissions
- Customers access only their own notifications.

## Future Enhancements
- Realtime notification stream and granular topic controls.
