# FirstMED Project Overview

> Version: 1.0.0
>
> Last Updated: 2026

---

# Introduction

FirstMED is an enterprise-grade healthcare ecosystem designed to provide a unified platform for customers, pharmacies, warehouses, delivery partners, healthcare professionals, and administrators.

Unlike traditional pharmacy websites, FirstMED is built as a modular ecosystem where every service is independent but connected through a common architecture.

The platform is designed to scale from a simple online pharmacy to a complete digital healthcare solution.

---

# Vision

To become India's most trusted digital healthcare platform by providing:

- Fast medicine delivery
- Reliable healthcare products
- Secure prescription handling
- Affordable healthcare services
- Efficient pharmacy management
- Nationwide logistics
- Seamless customer experience

---

# Mission

Our mission is to simplify healthcare by connecting every participant in the healthcare supply chain through one modern platform.

The platform should reduce friction between

- Customers
- Pharmacies
- Vendors
- Warehouses
- Delivery Partners
- Administrators

---

# Platform Architecture

```
                         FirstMED Platform

                               │
     ┌─────────────────────────┼──────────────────────────┐
     │                         │                          │
 Customer Portal         Business Portal          Internal Platform
     │                         │                          │
     │                         │                          │
     ▼                         ▼                          ▼

 B2C Platform             Vendor Portal            Admin Portal

     │                         │                          │
     ├──────────────┐          │                          │
     ▼              ▼          ▼                          ▼

 Prescription     Orders    Inventory             Warehouse

     │              │          │                     │
     └──────┬───────┴──────────┴────────────┬────────┘
            │                              │

            ▼                              ▼

      Delivery System              Notification Service

            │                              │

            └──────────────┬───────────────┘

                           ▼

                     Customer Experience
```

---

# Core Modules

The platform is divided into independent modules.

## Customer Platform

Responsible for customer-facing operations.

Includes

- Authentication
- Product browsing
- Categories
- Search
- Cart
- Checkout
- Orders
- Wishlist
- Prescriptions
- Membership
- Subscriptions
- Notifications

---

## Vendor Platform

Responsible for pharmacy operations.

Includes

- Product Management
- Inventory
- Pricing
- Excel/PDF Bulk Upload
- Order Management
- Reports
- Employees
- Returns

---

## Warehouse Management

Responsible for inventory logistics across one or more warehouse locations.

Includes

- Warehouse Inventory
- Multi-Warehouse Management
- Warehouse Location Management
- Batch Management
- Expiry Management
- Stock Allocation by Warehouse
- Dispatch
- Receiving
- Internal Transfers
- Inter-Warehouse Transfers
- Warehouse-Wise Stock Audits
- Damaged Goods
- Audit Logs

---

## Delivery Platform

Responsible for order delivery.

Includes

- Assignment
- Navigation
- Live Tracking
- OTP Verification
- Delivery Proof
- Earnings
- Delivery History

Privacy First:

Delivery partners never access sensitive customer or product information.

---

## Admin Platform

Responsible for platform management.

Includes

- User Management
- Vendor Verification
- Product Approval
- Prescription Verification
- Banner Management
- Warehouse Management
- Warehouse Allocation Rules
- Offers
- Coupons
- Taxes
- Settings
- Reports

---

## Subscription Platform

Responsible for recurring medicine delivery.

Includes

- Monthly medicines
- Weekly medicines
- Auto-renewal
- Pause
- Resume
- Skip delivery

---

## Membership Platform

Premium membership service.

Benefits include

- Free Delivery
- Extra Discounts
- Cashback
- Priority Support
- Faster Delivery
- Exclusive Offers

---

# Future Expansion Modules

The architecture supports future additions without major restructuring.

Future services include

- Doctor Consultation
- Lab Test Booking
- AI Health Assistant
- Insurance Integration
- Health Records
- Pharmacy ERP
- Franchise Management
- Corporate Healthcare
- Employee Healthcare Plans

---

# User Roles

The system supports multiple user roles.

## Guest

Can

- Browse products
- Search medicines
- View categories

Cannot

- Purchase medicines
- Upload prescriptions

---

## Customer

Can

- Place orders
- Upload prescriptions
- Track deliveries
- Manage addresses
- Manage subscriptions
- Manage memberships

---

## Vendor

Can

- Manage inventory
- Process orders
- Upload products
- Generate invoices
- Manage employees

---

## Warehouse Operator

Can

- Receive stock
- Allocate stock
- Transfer inventory
- Dispatch inventory
- View assigned warehouse stock
- Request inter-warehouse transfers
- Perform warehouse-wise audits

---

## Delivery Partner

Can

- Accept deliveries
- Navigate routes
- Verify OTP
- Upload delivery proof

Cannot

- Access customer personal information
- Access medicine details
- Access financial reports

---

## Administrator

Has full platform access with role-based permissions.

---

# Business Objectives

The platform should

- Reduce medicine delivery time
- Improve inventory accuracy
- Simplify prescription verification
- Improve pharmacy efficiency
- Increase customer trust
- Enable nationwide scalability

---

# High-Level User Journey

Customer

```
Browse

↓

Search

↓

Product Details

↓

Cart

↓

Prescription Validation (if required)

↓

Checkout

↓

Payment

↓

Vendor Processing

↓

Warehouse Allocation

↓

Delivery Assignment

↓

Live Tracking

↓

Delivered
```

---

# Non-Functional Requirements

The platform should maintain

- High Availability
- Scalability
- Security
- Performance
- Accessibility
- Maintainability
- Responsiveness
- Fault Tolerance

---

# Technology Principles

The project follows

- Modular Architecture
- Feature-Based Development
- Server Components First
- API-Driven Design
- Reusable Components
- Mobile-First UI
- Atomic Design Principles

---

# Documentation References

After reading this document, continue with

1. BUSINESS_RULES.md
2. FOLDER_STRUCTURE.md
3. ROUTES.md
4. TECH_STACK.md

These documents define the implementation details for every module.

---

End of Project Overview
