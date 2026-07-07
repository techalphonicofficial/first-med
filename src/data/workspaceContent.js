import {
  Activity,
  BadgePercent,
  Bell,
  Boxes,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  FileText,
  Gift,
  HeartHandshake,
  LayoutDashboard,
  MapPinned,
  PackageCheck,
  PackageOpen,
  Pill,
  ReceiptText,
  RotateCcw,
  Settings,
  ShieldCheck,
  ShoppingBag,
  TicketPercent,
  Truck,
  Users,
  Warehouse
} from "lucide-react";

export const moduleContent = {
  admin: {
    eyebrow: "Admin platform",
    title: "Control center",
    description: "Manage the operational backbone of FirstMED with approval queues, permission-safe actions, and audit-friendly records.",
    primaryAction: "Review queues",
    nav: [
      { slug: "", label: "Dashboard", icon: LayoutDashboard },
      { slug: "users", label: "Users", icon: Users },
      { slug: "vendors", label: "Vendors", icon: Building2 },
      { slug: "delivery-partners", label: "Delivery partners", icon: Truck },
      { slug: "warehouses", label: "Warehouses", icon: Warehouse },
      { slug: "warehouse-allocation-rules", label: "Allocation rules", icon: MapPinned },
      { slug: "products", label: "Product approval", icon: PackageCheck },
      { slug: "prescriptions", label: "Prescriptions", icon: FileCheck2 },
      { slug: "banners", label: "Banners", icon: Bell },
      { slug: "offers", label: "Offers", icon: BadgePercent },
      { slug: "coupons", label: "Coupons", icon: TicketPercent },
      { slug: "taxes", label: "Taxes", icon: ReceiptText },
      { slug: "settings", label: "Settings", icon: Settings },
      { slug: "reports", label: "Reports", icon: Activity },
      { slug: "categories", label: "Categories", icon: Boxes },
      { slug: "brands", label: "Brands", icon: Pill },
      { slug: "notifications", label: "Notifications", icon: Bell }
    ],
    metrics: [
      { label: "Pending approvals", value: "38", note: "12 prescriptions, 18 products, 8 vendors", tone: "amber" },
      { label: "Active warehouses", value: "6", note: "4 metro, 2 regional", tone: "blue" },
      { label: "Orders today", value: "1,284", note: "93% within SLA", tone: "green" },
      { label: "Open risks", value: "7", note: "Needs admin review", tone: "red" }
    ],
    records: [
      ["FM-RX-1182", "Prescription verification", "Pending", "High"],
      ["VND-204", "Vendor KYC review", "In review", "Medium"],
      ["SKU-8821", "Product approval", "Needs changes", "Medium"],
      ["WH-DEL-N", "Warehouse allocation rule", "Active", "Low"]
    ],
    workflows: ["User and role management", "Vendor verification", "Warehouse configuration", "Prescription approval", "Offers, coupons, taxes and settings"],
    routeCopy: {
      users: "Search users, adjust status, and assign role-based access without exposing private data.",
      vendors: "Approve pharmacy businesses, review KYC documents, and track operational status.",
      "delivery-partners": "Manage partner eligibility, availability, performance, and account status.",
      warehouses: "Create warehouse locations, assign operators, and monitor warehouse health.",
      "warehouse-allocation-rules": "Configure how orders choose a warehouse by region, stock, capacity, and SLA.",
      products: "Review vendor-submitted products for category, price, images, and prescription rules.",
      prescriptions: "Verify uploaded prescriptions with a secure review queue and rejection reasons.",
      banners: "Schedule homepage and category banners with placement and status controls.",
      offers: "Create targeted offers with eligibility, dates, and discount guardrails.",
      coupons: "Manage coupon codes, usage limits, and checkout eligibility.",
      taxes: "Configure tax rates and effective dates for billing and invoices.",
      settings: "Control platform settings, delivery charges, notifications, and feature flags.",
      reports: "Review platform KPIs, inventory signals, fulfillment health, and exports."
      ,
      categories: "Configure product categories, visibility, ordering, and customer-facing shelf placement.",
      brands: "Manage approved brands, catalog metadata, and brand visibility across product pages.",
      notifications: "Configure transactional, operational, and promotional notification templates."
    }
  },
  warehouse: {
    eyebrow: "Warehouse management",
    title: "Multi-warehouse operations",
    description: "Track stock by warehouse, batch, expiry, receiving, dispatch, and transfer flows with allocation-safe UI states.",
    primaryAction: "Create transfer",
    nav: [
      { slug: "", label: "Dashboard", icon: LayoutDashboard },
      { slug: "inventory", label: "Inventory", icon: Boxes },
      { slug: "locations", label: "Locations", icon: MapPinned },
      { slug: "allocation", label: "Stock allocation", icon: ClipboardCheck },
      { slug: "batches", label: "Batches", icon: Pill },
      { slug: "expiry", label: "Expiry", icon: CalendarClock },
      { slug: "receiving", label: "Receiving", icon: PackageOpen },
      { slug: "dispatch", label: "Dispatch", icon: PackageCheck },
      { slug: "transfers", label: "Transfers", icon: RotateCcw },
      { slug: "internal-transfers", label: "Internal transfers", icon: RotateCcw },
      { slug: "inter-warehouse-transfers", label: "Inter-warehouse", icon: Truck },
      { slug: "damaged-goods", label: "Damaged goods", icon: ShieldCheck },
      { slug: "audits", label: "Audits", icon: FileText },
      { slug: "audit-logs", label: "Audit logs", icon: FileText }
    ],
    metrics: [
      { label: "Sellable units", value: "42,810", note: "Across 6 warehouses", tone: "blue" },
      { label: "Allocation queue", value: "126", note: "18 high priority", tone: "amber" },
      { label: "Near expiry", value: "214", note: "FEFO action required", tone: "red" },
      { label: "Transfers today", value: "19", note: "7 awaiting receipt", tone: "green" }
    ],
    records: [
      ["WH-NCR-01", "Paracetamol 500mg", "Reserved", "Batch PM-27"],
      ["WH-MUM-02", "Cough Relief Syrup", "Near expiry", "Batch CR-14"],
      ["TR-8804", "Inter-warehouse transfer", "In transit", "NCR to Jaipur"],
      ["RCV-771", "Receiving task", "Pending count", "18 cartons"]
    ],
    workflows: ["Warehouse-wise inventory", "FEFO batch handling", "Receiving and dispatch queues", "Internal and inter-warehouse transfers", "Audit logs and damaged goods isolation"],
    routeCopy: {
      inventory: "View available, reserved, damaged, expired, and batch-wise stock for the selected warehouse.",
      locations: "Manage warehouse addresses, service areas, operating status, and assigned operators.",
      allocation: "Reserve active, non-expired stock for orders using location and SLA-aware rules.",
      batches: "Trace medicines by batch number, manufacturer, received date, and expiry.",
      expiry: "Identify near-expiry stock, block expired stock, and guide disposal actions.",
      receiving: "Confirm incoming stock, verify quantity, assign batch, and update availability.",
      dispatch: "Pick, pack, label, and release allocated stock to delivery or vendor handoff.",
      transfers: "Review internal and inter-warehouse transfer requests with source, destination, status, and reconciliation.",
      "internal-transfers": "Move stock between zones, bins, and operational states inside one warehouse.",
      "inter-warehouse-transfers": "Request, approve, dispatch, receive, and reconcile stock between warehouses.",
      "damaged-goods": "Record damaged inventory and remove it from sellable stock.",
      audits: "Run warehouse-wise stock audits, compare system and physical stock, and capture variance reasons.",
      "audit-logs": "Review append-only inventory movement and operator activity records."
    }
  },
  subscription: {
    eyebrow: "Subscription platform",
    title: "Recurring medicine care",
    description: "Let customers schedule recurring medicines, manage frequency, pause, skip, resume, and cancel safely.",
    primaryAction: "Create subscription",
    nav: [
      { slug: "", label: "Overview", icon: LayoutDashboard },
      { slug: "plans", label: "Plans", icon: CalendarClock },
      { slug: "recurring-medicines", label: "Medicines", icon: Pill },
      { slug: "delivery-frequency", label: "Frequency", icon: Truck },
      { slug: "pause-resume", label: "Pause/resume", icon: RotateCcw },
      { slug: "skip-delivery", label: "Skip delivery", icon: CheckCircle2 },
      { slug: "cancellation", label: "Cancellation", icon: ShieldCheck }
    ],
    metrics: [
      { label: "Active plans", value: "2", note: "Monthly and weekly", tone: "blue" },
      { label: "Next delivery", value: "12 Jul", note: "Morning slot", tone: "green" },
      { label: "Rx checks", value: "1", note: "Expires in 18 days", tone: "amber" },
      { label: "Savings", value: "Rs. 420", note: "This quarter", tone: "green" }
    ],
    records: [
      ["SUB-1008", "Monthly diabetes care", "Active", "Next: 12 Jul"],
      ["SUB-1011", "Vitamin refill", "Paused", "Resume: 1 Aug"],
      ["RX-SUB-08", "Prescription check", "Valid", "18 days left"],
      ["SKIP-204", "Skipped delivery", "Completed", "June cycle"]
    ],
    workflows: ["Plan selection", "Recurring medicine list", "Delivery frequency", "Pause and resume", "Skip one delivery", "Cancellation with reason"],
    routeCopy: {
      plans: "Compare available plans, duration, delivery benefits, and renewal behavior.",
      "recurring-medicines": "Manage medicine quantities and prescription requirements for recurring deliveries.",
      "delivery-frequency": "Choose weekly, monthly, or custom delivery timing with serviceability checks.",
      "pause-resume": "Temporarily stop recurring deliveries and resume without rebuilding the plan.",
      "skip-delivery": "Skip one upcoming cycle while keeping the subscription active.",
      cancellation: "Cancel a subscription with confirmation, reason capture, and billing clarity."
    }
  },
  membership: {
    eyebrow: "Membership program",
    title: "Premium healthcare benefits",
    description: "Show membership status, plan benefits, rewards, and priority support in a customer-friendly experience.",
    primaryAction: "Upgrade plan",
    nav: [
      { slug: "", label: "Overview", icon: LayoutDashboard },
      { slug: "plans", label: "Plans", icon: Gift },
      { slug: "benefits", label: "Benefits", icon: BadgePercent },
      { slug: "rewards", label: "Rewards", icon: HeartHandshake },
      { slug: "priority-support", label: "Priority support", icon: ShieldCheck }
    ],
    metrics: [
      { label: "Plan status", value: "Gold", note: "Renews in 42 days", tone: "amber" },
      { label: "Free deliveries", value: "18", note: "Used this year", tone: "blue" },
      { label: "Reward points", value: "2,840", note: "640 expiring soon", tone: "green" },
      { label: "Savings", value: "Rs. 1,920", note: "Membership total", tone: "green" }
    ],
    records: [
      ["MBR-GOLD", "Gold membership", "Active", "42 days left"],
      ["RWD-448", "Reward redemption", "Available", "Rs. 150 value"],
      ["BEN-DEL", "Free delivery", "Applied", "Checkout benefit"],
      ["SUP-114", "Priority support", "Open", "Expected 20 min"]
    ],
    workflows: ["Plan comparison", "Benefit application", "Reward balance", "Priority support", "Renewal status"],
    routeCopy: {
      plans: "Compare membership plans by price, duration, benefits, renewal, and eligibility.",
      benefits: "Explain free delivery, discounts, cashback, faster support, and exclusive offers.",
      rewards: "Track earned, pending, redeemed, and expiring reward points.",
      "priority-support": "Route active members into faster support with clear ticket status."
    }
  },
  delivery: {
    eyebrow: "Delivery platform",
    title: "Partner delivery workspace",
    description: "Operate assignments, navigation, OTP verification, delivery proof, earnings, and privacy-safe handoff flows.",
    primaryAction: "View assignments",
    nav: [
      { slug: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { slug: "orders", label: "Deliveries", icon: Truck },
      { slug: "assignments", label: "Assignments", icon: ClipboardCheck },
      { slug: "tracking", label: "Live tracking", icon: MapPinned },
      { slug: "history", label: "History", icon: FileText },
      { slug: "otp-verification", label: "OTP", icon: ShieldCheck },
      { slug: "delivery-proof", label: "Proof", icon: FileCheck2 },
      { slug: "navigation", label: "Navigation", icon: MapPinned },
      { slug: "earnings", label: "Earnings", icon: CreditCard },
      { slug: "privacy", label: "Privacy rules", icon: ShieldCheck }
    ],
    metrics: [
      { label: "Assigned", value: "8", note: "2 express", tone: "blue" },
      { label: "Completed", value: "21", note: "Today", tone: "green" },
      { label: "OTP pending", value: "3", note: "At drop step", tone: "amber" },
      { label: "Earnings", value: "Rs. 1,260", note: "Current shift", tone: "green" }
    ],
    records: [
      ["FM-3041", "Pickup to Green Park", "Assigned", "4.2 km"],
      ["FM-3039", "OTP verification", "Pending", "Drop step"],
      ["FM-3038", "Proof uploaded", "Delivered", "Complete"],
      ["PAY-778", "Shift earnings", "Ready", "Rs. 1,260"]
    ],
    workflows: ["Assignment acceptance", "Navigation", "OTP verification", "Proof upload", "Earnings", "Privacy-safe data"],
    routeCopy: {
      assignments: "Accept or reject delivery assignments with pickup, drop, payment mode, and SLA only.",
      tracking: "Show active route progress and delivery state without exposing medicine details.",
      history: "Review completed delivery history with privacy-safe order IDs, handoff status, and payout context.",
      "otp-verification": "Verify customer handoff with OTP before marking the delivery complete.",
      "delivery-proof": "Capture photo or signature proof after successful handoff.",
      navigation: "Provide pickup and drop navigation with safe delivery instructions.",
      earnings: "Show completed deliveries, incentives, and payout status.",
      privacy: "Confirm delivery partners only see minimum necessary data for safe fulfillment."
    }
  },
  vendor: {
    eyebrow: "Vendor portal",
    title: "Pharmacy operations",
    description: "Support vendor onboarding, KYC, bulk upload, returns, invoices, reports, employees, products, inventory, and orders.",
    primaryAction: "Upload catalog",
    nav: [
      { slug: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { slug: "orders", label: "Orders", icon: ShoppingBag },
      { slug: "inventory", label: "Inventory", icon: Boxes },
      { slug: "products", label: "Products", icon: Pill },
      { slug: "registration", label: "Registration", icon: Building2 },
      { slug: "kyc", label: "KYC", icon: ShieldCheck },
      { slug: "bulk-upload", label: "Bulk upload", icon: PackageOpen },
      { slug: "returns", label: "Returns", icon: RotateCcw },
      { slug: "invoices", label: "Invoices", icon: ReceiptText },
      { slug: "reports", label: "Reports", icon: Activity },
      { slug: "employees", label: "Employees", icon: Users }
    ],
    metrics: [
      { label: "Revenue", value: "Rs. 12.4k", note: "Today", tone: "green" },
      { label: "Pending orders", value: "12", note: "3 need acceptance", tone: "amber" },
      { label: "Low stock", value: "8", note: "2 out of stock", tone: "red" },
      { label: "Rating", value: "4.7", note: "124 orders", tone: "blue" }
    ],
    records: [
      ["FM-3041", "Order acceptance", "Pending", "3 items"],
      ["KYC-204", "Drug license", "Verified", "Valid"],
      ["IMP-771", "Excel import", "Needs fixes", "14 rows"],
      ["RET-118", "Return request", "Review", "Condition check"]
    ],
    workflows: ["Vendor registration", "KYC verification", "Product and inventory management", "Bulk upload", "Orders and returns", "Reports and employees"],
    routeCopy: {
      registration: "Collect business information, license details, GST, address, and operating hours.",
      kyc: "Track document status, uploads, rejection reasons, and verification progress.",
      "bulk-upload": "Upload Excel/PDF catalog files, preview parsed rows, fix errors, and commit imports.",
      returns: "Inspect return requests, approve or reject, and restock eligible items.",
      invoices: "Access invoice records, taxes, settlement status, and downloads.",
      reports: "Review sales, inventory, low stock, returns, and settlement summaries.",
      employees: "Invite employees, assign roles, deactivate access, and review activity."
    }
  }
};

export const workspaceAlias = {
  warehouse: {
    "warehouse-management": "",
    "multi-warehouse-management": "",
    "warehouse-locations": "locations",
    "warehouse-inventory": "inventory",
    "stock-allocation": "allocation",
    "batch-management": "batches",
    "expiry-management": "expiry",
    "internal-transfers": "internal-transfers",
    "inter-warehouse-transfers": "inter-warehouse-transfers",
    "damaged-goods": "damaged-goods",
    "audit-logs": "audit-logs"
  },
  admin: {
    "user-management": "users",
    "vendor-management": "vendors",
    "delivery-partner-management": "delivery-partners",
    "warehouse-management": "warehouses",
    "warehouse-allocation-rules": "warehouse-allocation-rules",
    "product-approval": "products",
    "prescription-verification": "prescriptions",
    "banner-management": "banners"
  },
  subscription: {
    "subscription-plans": "plans",
    "recurring-medicines": "recurring-medicines",
    "delivery-frequency": "delivery-frequency",
    "pause-resume": "pause-resume",
    "skip-delivery": "skip-delivery"
  },
  membership: {
    "membership-plans": "plans",
    "priority-support": "priority-support"
  },
  vendor: {
    "vendor-registration": "registration",
    "kyc-verification": "kyc",
    "product-management": "products",
    "order-management": "orders"
  },
  delivery: {
    "delivery-assignment": "assignments",
    "live-tracking": "tracking",
    "otp-verification": "otp-verification",
    "delivery-proof": "delivery-proof",
    "privacy-rules": "privacy"
  }
};

export function getWorkspaceTasks(moduleKey, activeSlug) {
  const labels = {
    admin: ["Review queue", "Validate permissions", "Apply decision", "Record audit note"],
    warehouse: ["Select warehouse", "Scan or choose batch", "Validate quantity", "Confirm movement"],
    subscription: ["Check eligibility", "Validate prescription", "Preview next delivery", "Save schedule"],
    membership: ["Compare benefits", "Apply active rewards", "Confirm renewal", "Notify customer"],
    delivery: ["Accept task", "Navigate safely", "Verify handoff", "Upload proof"],
    vendor: ["Review record", "Fix validation", "Submit update", "Track approval"]
  };
  const base = labels[moduleKey] || ["Review", "Validate", "Confirm", "Audit"];
  return base.map((label, index) => ({
    label,
    status: index === 0 ? "Ready" : index === 1 ? "Needs check" : "Pending"
  }));
}

export function getWorkspace(moduleKey, slugParts = []) {
  const module = moduleContent[moduleKey];
  const rawSlug = Array.isArray(slugParts) ? slugParts.join("/") : "";
  const slug = workspaceAlias[moduleKey]?.[rawSlug] ?? rawSlug;
  const active = module.nav.find((item) => item.slug === slug) || module.nav[0];
  const copy = module.routeCopy?.[active.slug] || module.description;
  return { module, active, copy, slug };
}
