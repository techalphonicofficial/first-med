# AGENT.md

# FirstMED Online Pharmacy Platform
# AI Coding Agent Instructions

---

## PROJECT OVERVIEW

You are building a modern healthcare ecommerce platform called "FirstMED".

The platform consists of three primary systems:
1. B2C Customer Platform (Buying medicines, OTC, personal care)
2. B2B Vendor Portal (For pharmacies/sellers to manage inventory and orders)
3. Fast Delivery Management System (For delivery agents to track and deliver orders)

Current product direction:
- FirstMED is focused on selling medicines and personal self-care products.
- OTC medicines, wellness products and personal self-care products can be bought without restriction.
- Prescription-only medicines must stay gated until the user uploads a valid prescription.
- Prescription validation must check for doctor letterhead/clinic name, doctor name, registration number, patient name, issue date and a prescription file.
- Do not build or promote service booking flows (e.g., Doctor consultations, Lab test booking) for now.
- Do NOT build an admin panel or complex analytics dashboards outside the vendor/delivery portals.

IMPORTANT DESIGN RULES:
- Keep search engine indexing turned off for this project unless explicitly asked.
- Build unique modern healthcare shopping experiences. NEVER copy UI from existing platforms like 1mg.
- Use futuristic rounded UI design language.
- Use premium animations and floating layouts.
- Mobile-first responsive design is mandatory.
- Use the supplied FirstMED logo across the project wherever brand identity appears.
- The app theme must follow the logo colors: FirstMED blue (`#0878BE`) and yellow (`#F1E300`) as the primary visual foundation.

---

## TECH STACK

### Core
- Next.js 15+ (App Router)
- React 19+
- JavaScript ONLY (Do NOT use TypeScript)
- Tailwind CSS
- Custom UI Components (No Material UI, Chakra UI, or full Shadcn UI setups)

### State & Data Fetching
- Zustand
- TanStack React Query
- Axios

### UI Libraries & Tools
- Framer Motion (Animations)
- Swiper.js (Carousels)
- React Hook Form (Forms)
- Sonner (Toast notifications)
- Socket.io Client (Real-time tracking mock)
- next-pwa (PWA support)

---

## APPLICATION STRUCTURE

The project is built using a feature-based architecture in the `src/` directory:

- `app/` (Next.js App Router routes)
- `components/` (Reusable UI, layout, and feature components)
- `store/` (Zustand state slices)
- `utils/` (Helper functions)
- `lib/` (Third-party library configs)

---

## ROUTE ARCHITECTURE

### Public Routes
- `/` (Homepage with search, categories, popular products)
- `/about`, `/contact`, `/faq`, `/privacy-policy`, `/terms-and-conditions`, `/refund-policy`

### Authentication
- `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-account`
- Supports Email and Mobile OTP login setups.

### B2C Customer Platform
- `/products` (Product listing, filtering, pagination)
- `/products/[slug]` (Product details, gallery, variants, add to cart)
- `/search` (Global search for products, categories)
- `/cart` (Cart management, quantity updates)
- `/checkout` (Multi-step checkout: Address, Delivery Slot, Payment, Review)
- `/account/dashboard` (Profile summary, recent orders)
- `/account/profile` (Update profile)
- `/account/orders` (Order history and timeline)
- `/prescription` (Upload and manage prescriptions)

### B2B Vendor Portal (`/vendor`)
Protected area for sellers to manage operations:
- `/vendor/dashboard` (Revenue, pending orders, inventory snapshot)
- `/vendor/products` (Product catalog management)
- `/vendor/inventory` (Stock management and alerts)
- `/vendor/orders` (Order processing: Accept, Reject, Mark Ready)
- `/vendor/profile` (Business info, operating hours)

### Fast Delivery System (`/delivery`)
Protected area for delivery personnel:
- `/delivery/dashboard` (Assigned deliveries, earnings)
- `/delivery/orders` (Active assigned orders, routes)
- `/delivery/orders/[id]` (Pickup/Delivery details, status updates)

### Live Tracking
- `/track/[trackingId]` (Live driver location, ETA, delivery timeline via mocked Socket.io)

---

## PRESCRIPTION RULES

- Products with `rxRequired: true` cannot be added to cart unless an approved prescription exists.
- A demo prescription can be approved only when these fields exist: Patient name, Doctor name, Clinic/Hospital letterhead name, Doctor registration number, Issue date, and Uploaded prescription file.
- Never allow restricted medicines to bypass prescription validation in the UI.

---

## CODE QUALITY & PERFORMANCE

- Use Server Components where possible.
- Use dynamic imports and lazy loading for heavy components (e.g., Maps, Swiper).
- Mobile-first approach is required.
- Use Semantic HTML and ensure basic accessibility (ARIA, keyboard navigation).
- Avoid inline styles and hardcoded strings; use Tailwind classes and constants.
