# AGENTS.md

# FirstMED Online Pharmacy Platform
# AI Coding Agent Instructions

---

# PROJECT OVERVIEW

You are building a modern healthcare ecommerce platform called "FirstMED".

Current product direction:
- FirstMED is focused on selling medicines and personal self-care products.
- OTC medicines, wellness products and personal self-care products can be bought without restriction.
- Prescription-only medicines must stay gated until the user uploads a valid prescription.
- Prescription validation must check for doctor letterhead/clinic name, doctor name, registration number, patient name, issue date and a prescription file.
- Do not build or promote service booking flows for now.
- Lab tests, doctor consultations, AI symptom checker, health dashboards, wellness blog and family healthcare management are future ideas only, not current product scope.

The platform is inspired by:
- 1mg
- PharmEasy
- Apollo Pharmacy
- Apple Health
- Stripe Dashboard UI
- Modern SaaS dashboards

IMPORTANT:
- NEVER copy UI from 1mg or any existing platform.
- Keep search engine indexing turned off for this project unless the user explicitly asks to turn indexing back on.
- Build unique modern healthcare shopping experiences.
- Use futuristic rounded UI design language.
- Use premium animations and floating layouts.
- Mobile-first responsive design is mandatory.
- Use the supplied FirstMED logo across the project wherever brand identity appears.
- The app theme must follow the logo colors: FirstMED blue and yellow as the primary visual foundation.
- Internal pages must be functional enough for a client demo, not only visual placeholders.

---

# PRIMARY GOAL

Build a scalable product-first healthcare ecommerce platform with:
- Product catalogue and product detail pages
- Medicine ecommerce
- OTC medicine product listings
- Prescription-only medicine gating
- Prescription upload and letterhead validation workflow
- Personal self-care products
- Wellness and daily care product listings
- Product images and polished product cards
- Search and category filtering
- Persistent add-to-cart functionality
- Cart quantity controls and removal
- Checkout flow with delivery details
- Customer account workspace with cart and prescription status
- Demo order history after checkout

Do not prioritize these services right now:
- Doctor consultations
- Lab test booking
- AI symptom checker
- Wellness blog
- Family healthcare management

---

# PRESCRIPTION RULES

- Products with `rxRequired: true` cannot be added to cart unless an approved prescription exists.
- A demo prescription can be approved only when these fields exist:
  - Patient name
  - Doctor name
  - Clinic or hospital letterhead name
  - Doctor registration number
  - Issue date
  - Uploaded prescription file
- In production, replace demo validation with real OCR/manual pharmacist review.
- Never allow restricted medicines to bypass prescription validation in the UI.

---

# TECH STACK

## Frontend

- Next.js 15+
- React 19+
- JavaScript ONLY
- Tailwind CSS
- Framer Motion
- Swiper.js
- Axios
- TanStack React Query
- React Hook Form
- Zustand (state management)

DO NOT USE:
- TypeScript
- Redux
- Material UI
- Chakra UI
- Styled Components

---

# DESIGN SYSTEM

## Brand Colors

```css
Logo Blue: #0878BE
Logo Yellow: #F1E300
Soft Blue: #EAF7FF
Background: #F7FAFD
Dark Text: #0F172A
Gray Text: #64748B
Success Green: #16A34A
Danger Red: #DC2626
```










# AGENT.md

## Project Overview

Build a production-grade multi-module commerce platform using Next.js and Node.js.

The platform consists of three primary systems:

1. B2C Customer Platform
2. B2B Vendor Portal
3. Fast Delivery Management System

The objective is to create a scalable frontend architecture that supports customer purchasing, vendor operations, and real-time delivery workflows.

Do NOT build an admin panel.

Do NOT build analytics dashboards.

Do NOT build notification management modules.

Focus only on Customer, Vendor, and Delivery experiences.

---

# Tech Stack

## Core

* Next.js 15+
* React 19+
* TypeScript
* Tailwind CSS
* Shadcn UI

## State Management

* Zustand

## Data Fetching

* TanStack Query
* Axios

## Forms

* React Hook Form
* Zod Validation

## Maps

* Google Maps API
  or
* Mapbox

## Realtime

* Socket.io Client

## Charts

* Recharts (only if required)

---

# Application Structure

src/

app/
components/
features/
hooks/
services/
store/
types/
constants/
utils/
lib/
layouts/

public/

---

# Route Architecture

/

/about

/contact

/faq

/blog

/privacy-policy

/terms-and-conditions

/refund-policy

---

# Authentication

/login

/register

/forgot-password

/reset-password

/verify-account

Authentication should support:

* Email Login
* Mobile OTP Login
* Email Registration
* Social Login placeholders

Use JWT authentication.

Persist sessions.

Support protected routes.

---

# Public Website

## Homepage

Sections:

* Hero Banner
* Search Section
* Featured Categories
* Popular Products
* Popular Vendors
* Fast Delivery Highlights
* Testimonials
* CTA Sections
* Footer

---

# B2C CUSTOMER MODULE

Route Prefix:

/account

---

## Customer Dashboard

/account/dashboard

Features:

* Welcome Section
* Profile Summary
* Recent Orders
* Wishlist Summary
* Saved Addresses

---

## Profile Management

/account/profile

Features:

* Update Profile
* Upload Avatar
* Change Password
* Manage Preferences

---

## Address Management

/account/addresses

Features:

* Add Address
* Edit Address
* Delete Address
* Set Default Address
* Location Picker

---

## Wishlist

/account/wishlist

Features:

* Add Product
* Remove Product
* Move To Cart

---

## Order History

/account/orders

Features:

* Active Orders
* Delivered Orders
* Cancelled Orders

---

## Order Details

/account/orders/[id]

Features:

* Timeline
* Items
* Invoice
* Delivery Status

---

# PRODUCT CATALOG

/products

---

## Product Listing

Features:

Grid View

List View

Pagination

Infinite Scroll Support

---

## Filters

* Category
* Brand
* Price Range
* Rating
* Availability
* Delivery Time

---

## Sorting

* Popular
* Latest
* Price Low To High
* Price High To Low
* Highest Rated

---

# PRODUCT DETAILS

/products/[slug]

Sections:

* Gallery
* Product Info
* Variants
* Specifications
* Reviews
* FAQs
* Similar Products

Features:

* Add To Cart
* Buy Now
* Wishlist
* Share Product

---

# SEARCH SYSTEM

/search

Features:

* Global Search
* Autocomplete
* Recent Searches
* Trending Searches

Results:

* Products
* Vendors
* Categories

---

# CART SYSTEM

/cart

Features:

* Add Product
* Remove Product
* Update Quantity
* Save For Later

---

# CHECKOUT

/checkout

Steps:

1 Address

2 Delivery Slot

3 Payment

4 Review

5 Confirmation

---

# PAYMENT MODULE

Frontend only

Support placeholders for:

* Razorpay
* Stripe
* PayPal

Create reusable payment components.

---

# B2B VENDOR PORTAL

Route Prefix:

/vendor

Protected Area

---

## Vendor Dashboard

/vendor/dashboard

Features:

* Revenue Summary
* Recent Orders
* Inventory Snapshot
* Pending Orders

---

## Product Management

/vendor/products

Features:

* Product List
* Add Product
* Edit Product
* Delete Product

---

## Inventory Management

/vendor/inventory

Features:

* Stock Management
* Inventory Updates
* Low Stock Alerts

---

## Orders

/vendor/orders

Features:

* Pending Orders
* Processing Orders
* Completed Orders
* Cancelled Orders

---

## Order Details

/vendor/orders/[id]

Actions:

* Accept Order
* Reject Order
* Mark Ready

---

## Vendor Profile

/vendor/profile

Features:

* Business Information
* Documents
* Address
* Operating Hours

---

# FAST DELIVERY SYSTEM

Route Prefix:

/delivery

Protected Area

---

## Delivery Dashboard

/delivery/dashboard

Features:

* Assigned Deliveries
* Earnings Summary
* Current Status

---

## Active Deliveries

/delivery/orders

Features:

* Assigned Orders
* Route Information
* Delivery Timeline

---

## Delivery Details

/delivery/orders/[id]

Features:

* Pickup Address
* Delivery Address
* Customer Information
* Navigation Support

Actions:

* Accept Delivery
* Picked Up
* Out For Delivery
* Delivered

---

# LIVE TRACKING

Customer Tracking Page

/track/[trackingId]

Features:

* Live Driver Location
* ETA
* Delivery Progress
* Order Timeline

Use Socket.io architecture.

Provide mocked websocket integration layer.

---

# MAP INTEGRATION

Required Components

* Address Picker
* Delivery Tracking Map
* Route Preview
* Vendor Location

---

# REUSABLE COMPONENTS

Create reusable UI components.

Examples:

Button

Input

Select

Checkbox

Modal

Drawer

Dialog

Tabs

Accordion

Table

Pagination

SearchBar

ProductCard

VendorCard

AddressCard

OrderCard

TrackingCard

MapCard

---

# RESPONSIVE DESIGN

Support:

Desktop

Laptop

Tablet

Mobile

Mobile-first approach required.

---

# PERFORMANCE REQUIREMENTS

Use:

* Server Components where possible
* Dynamic Imports
* Image Optimization
* Route-based Code Splitting
* Lazy Loading

Target Lighthouse Score:

90+

---

# SEO REQUIREMENTS

Implement:

* Metadata API
* Open Graph
* Twitter Cards
* Canonical URLs
* Structured Data
* Sitemap Ready Architecture

---

# ACCESSIBILITY

Implement:

* Semantic HTML
* Keyboard Navigation
* Proper Labels
* ARIA Support

---

# CODE QUALITY

Use:

* TypeScript Strict Mode
* Reusable Components
* Feature Based Architecture

Avoid:

* Inline Styles
* Hardcoded Strings
* Duplicate Components

---

# EXPECTED OUTPUT

Generate a complete frontend application with:

* Professional Design System
* Scalable Architecture
* Production Ready Folder Structure
* Mock API Layer
* Authentication Guards
* Reusable Components
* Responsive Layouts
* B2B Module
* B2C Module
* Fast Delivery Module

The codebase should be ready for backend integration using REST APIs and WebSocket services.
