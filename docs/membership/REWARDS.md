# Rewards

## Purpose
Track membership reward points and cashback.

## Business Goals
- Encourage repeat purchases and membership retention.

## Functional Requirements
- Show earned, pending, redeemed, and expired rewards.

## User Stories
- As a member, I can see my reward balance and history.

## UI Components
- Rewards balance card, transaction table, redemption action.

## API Contracts
- `GET /membership/rewards`
- `POST /membership/rewards/redeem`

## Zustand Store
- Reward redemption modal state.

## React Query Usage
- Invalidate rewards after redemption or order completion.

## Validation Rules
- Redemption must meet minimum balance and expiry rules.

## Error States
- Insufficient points, redemption failed.

## Empty States
- No rewards yet.

## Loading States
- Rewards skeleton.

## Permissions
- Customer owns rewards.

## Future Enhancements
- Reward expiry reminders.
