# FirstMED Documentation

> Version: 1.0.0
>
> Project: FirstMED
>
> Framework: Next.js 15 (App Router)
>
> Frontend: React 19 (JavaScript)
>
> Styling: Tailwind CSS
>
> State Management: Zustand + TanStack React Query
>
> Last Updated: 2026

---

# Welcome

Welcome to the official documentation for **FirstMED**.

FirstMED is a modern, scalable, enterprise-grade digital healthcare ecosystem that combines pharmacy, healthcare products, logistics, subscriptions, membership, warehouse operations, and business management into one unified platform.

Unlike traditional pharmacy websites, FirstMED is designed as a complete healthcare ecosystem that can continuously expand without major architectural changes.

The system follows a modular architecture where every service is developed independently while sharing a common authentication, design system, API layer, and state management.

---

# Vision

Our vision is to become a complete digital healthcare platform where users can

- Purchase medicines
- Order healthcare products
- Manage prescriptions
- Receive medicines quickly
- Track health history
- Subscribe to recurring medicines
- Connect pharmacies, warehouses, delivery partners and healthcare providers through a unified platform

---

# Core Services

The platform consists of multiple independent services.

## Customer Platform (B2C)

Customers can

- Register/Login
- Search medicines
- Browse healthcare products
- Purchase OTC medicines
- Purchase prescription medicines
- Upload prescriptions
- Manage family profiles
- Track orders
- Schedule deliveries
- Subscribe to medicines
- Manage addresses
- Save payment methods
- View invoices
- Receive reminders
- Chat with support
- Maintain wishlist
- Reorder previous medicines

---

## Vendor Platform (B2B)

Registered pharmacy businesses can

- Register business
- Complete KYC
- Upload Drug License
- Upload GST
- Upload inventory using Excel and pdf 
- Manage products
- Update inventory
- Process orders
- Manage returns
- Generate invoices
- View reports
- Track earnings
- Manage employees
- Configure operating hours

---

## Delivery Platform

Delivery partners can

- View assigned deliveries
- View pickup location
- View drop location
- Accept or reject deliveries
- Navigate using maps
- Verify customer OTP
- Upload proof of delivery
- Mark delivery status
- View delivery earnings
- Track completed deliveries

### Privacy Rules

Delivery partners **MUST NOT** have access to

- Customer phone number
- Customer email
- Customer personal information
- Ordered products
- Medicine names
- Vendor financial information
- Order amount breakdown
- Customer medical history

Delivery partners can only access

- Pickup location
- Delivery location
- Delivery OTP
- Order ID
- Delivery instructions
- Payment Method (COD / Prepaid)
- Navigation

---

## Warehouse Management

Warehouse operators can

- Receive inventory
- Manage stock
- Manage multiple warehouses
- Track warehouse-wise inventory
- Allocate inventory
- Configure stock allocation by warehouse
- Process transfers
- Process inter-warehouse transfers
- Dispatch products
- Track expiry
- Manage batches
- Print labels
- Manage damaged stock
- Perform audits
- Perform warehouse-wise audits

---

## Admin Platform

Administrators can

- Manage users
- Manage vendors
- Manage delivery partners
- Manage warehouses
- Configure warehouse locations
- Configure warehouse allocation rules
- Manage products
- Verify prescriptions
- Verify vendors
- Manage banners
- Configure categories
- Configure brands
- Manage offers
- Configure taxes
- Configure delivery charges
- Configure notifications
- Configure application settings
- Monitor platform health

---



## Subscription Platform

Customers can

- Subscribe to recurring medicines
- Configure delivery frequency
- Pause subscription
- Resume subscription
- Skip deliveries
- Cancel subscriptions

---

## Membership Program

Members receive

- Free deliveries
- Extra discounts
- Faster support
- Priority deliveries
- Exclusive offers
- Reward points

---

# Project Goals

The platform should provide

- Enterprise scalability
- Modular architecture
- Secure authentication
- Prescription validation
- High performance
- Excellent UX
- Mobile-first design
- Accessibility
- Progressive Web App
- Offline support
- Secure payment system
- Real-time tracking
- AI-ready architecture

---

# Documentation Structure

The project documentation is divided into multiple independent modules.

Foundation

- README
- Project Overview
- Business Rules
- Folder Structure
- Routes
- Tech Stack

Customer

Vendor

Delivery

Warehouse

- Multi-Warehouse Management
- Warehouse Location Management
- Inter-Warehouse Transfers
- Warehouse Allocation Rules

Admin

Subscription

Membership

Security

API

Components

State

Design System

Deployment

Future Roadmap

---

# Documentation Standards

Every documentation file must contain

- Purpose
- Business Goals
- Functional Requirements
- User Stories
- UI Components
- API Contracts
- Zustand Store
- React Query Usage
- Validation Rules
- Error States
- Empty States
- Loading States
- Permissions
- Future Enhancements

---

# Development Principles

- Feature-based architecture
- Mobile-first development
- Component reusability
- Accessibility by default
- Performance-first implementation
- Security-first mindset
- Clean code
- Atomic reusable UI
- Server Components whenever possible
- Client Components only when required

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js 15 |
| Language | JavaScript |
| Styling | Tailwind CSS |
| State | Zustand |
| Server State | TanStack React Query |
| HTTP | Axios |
| Forms | React Hook Form |
| Animation | Framer Motion |
| Carousel | Swiper |
| Notifications | Sonner |
| Maps | Google Maps |
| Realtime | Socket.io |
| PWA | next-pwa |

---

# Branding

Primary Blue

```
#0878BE
```

Primary Yellow

```
#F1E300
```

The UI should follow a premium healthcare aesthetic with rounded components, subtle shadows, soft gradients, and modern micro-interactions.

---

# Contributing

Every feature implementation must strictly follow the documentation.

No business logic should be duplicated.

Every feature should be modular, reusable, responsive, secure, and production-ready.

---

**End of README**
