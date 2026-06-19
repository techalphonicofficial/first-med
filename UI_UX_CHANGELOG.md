# FirstMED UI/UX Upgrade Notes

Created: 2026-06-12

## Rollback

Original copies of edited files are stored in `.ui-ux-backup/` using the same relative paths.

To revert a file manually, copy it back from `.ui-ux-backup/<same-path>` to the project root.

## Changed Endpoint Groups

- `/`
- `/products/`
- `/products/[slug]/`
- `/search/`
- `/cart/`
- `/checkout/`
- `/prescription/`
- `/track/[trackingId]/`
- `/login/`
- `/register/`
- `/forgot-password/`
- `/reset-password/`
- `/verify-account/`
- `/account/dashboard/`
- `/account/profile/`
- `/account/addresses/`
- `/account/orders/`
- `/account/orders/[id]/`
- `/account/wishlist/`
- `/vendor/dashboard/`
- `/vendor/orders/`
- `/vendor/orders/[id]/`
- `/vendor/products/`
- `/vendor/inventory/`
- `/vendor/profile/`
- `/delivery/dashboard/`
- `/delivery/orders/`
- `/delivery/orders/[id]/`
- `/about/`
- `/contact/`
- `/faq/`
- `/blog/`
- `/privacy-policy/`
- `/refund-policy/`
- `/terms-and-conditions/`
- `/robots.txt`
- `/sitemap.xml`

## Summary Of Changes

- Added richer empty states with secondary actions and recovery tips.
- Improved shared dashboard/workspace UI used by account, vendor and delivery endpoints.
- Reworked auth screens with route-specific fields, password visibility, OTP/recovery cues and account links.
- Expanded static pages from placeholder text into structured information pages.
- Improved global navigation, footer links, mobile footer spacing and protected route copy.
- Added catalogue filters for price and stock, richer filter chips and improved no-results recovery.
- Improved product cards and product detail pages with stock-aware actions, delivery check, savings and trust checks.
- Improved cart summary with MRP total, savings, coupon hint, delivery and prescription status messaging.
- Improved checkout layout with address, delivery, payment and review sections.
- Improved prescription upload guidance, trust cues and file state.
- Improved tracking page with status timeline, partner actions and issue reporting.
- Updated sitemap and robots rules for public/protected route behavior.
