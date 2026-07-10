"use client";

import { AlertCircle, ArrowRight, BarChart2, Building2, Package, Pill, Users } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Users", value: "12,450", sub: "+124 this week", icon: Users, color: "text-brand-blue", bg: "bg-sky-50" },
  { label: "Active Vendors", value: "342", sub: "+5 pending review", icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Products Catalog", value: "8,920", sub: "+40 needing approval", icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Pending Prescriptions", value: "56", sub: "12 high priority", icon: Pill, color: "text-rose-600", bg: "bg-rose-50" },
];

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="overflow-hidden rounded-[2rem] bg-brand-navy p-7 text-white shadow-premium sm:p-9">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-yellow">Platform Overview</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Admin Dashboard</h1>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-sky-100">
              Monitor platform health, verify pending approvals, and manage all users, vendors, and warehouses from a single control center.
            </p>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <Link href="/admin/prescriptions" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-black text-slate-900 dark:text-slate-100 shadow-glow transition hover:-translate-y-0.5">
              Review Prescriptions (56) <ArrowRight size={15} />
            </Link>
            <Link href="/admin/vendors" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-black text-white backdrop-blur transition hover:bg-white/20">
              Verify Vendors (5)
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((metric) => (
          <div key={metric.label} className="soft-card rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-premium">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-black text-slate-500">{metric.label}</p>
              <span className={`grid h-9 w-9 place-items-center rounded-2xl ${metric.bg}`}>
                <metric.icon size={16} className={metric.color} />
              </span>
            </div>
            <p className="mt-3 text-3xl font-black text-slate-900 dark:text-slate-100">{metric.value}</p>
            <p className="mt-1 text-xs font-semibold text-slate-400">{metric.sub}</p>
          </div>
        ))}
      </section>

      {/* Main Content Area */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Health / Alerts */}
        <div className="soft-card rounded-2xl p-6">
          <h2 className="text-xl font-black mb-5">Action Required</h2>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-100 p-4">
              <AlertCircle size={20} className="text-rose-600 mt-0.5" />
              <div>
                <p className="text-sm font-black text-rose-800">12 High Priority Prescriptions</p>
                <p className="mt-1 text-xs font-semibold text-rose-600">Pending review for over 4 hours. SLA requires validation within 6 hours.</p>
                <Link href="/admin/prescriptions" className="mt-2 inline-block text-xs font-black text-rose-700 hover:underline">Review now →</Link>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 p-4">
              <AlertCircle size={20} className="text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-black text-amber-800">5 New Vendor Applications</p>
                <p className="mt-1 text-xs font-semibold text-amber-700">Awaiting KYC and Drug License verification.</p>
                <Link href="/admin/vendors" className="mt-2 inline-block text-xs font-black text-amber-800 hover:underline">Verify vendors →</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="soft-card rounded-2xl p-6">
          <h2 className="text-xl font-black mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: "/admin/users", label: "Manage Users", icon: Users },
              { href: "/admin/products", label: "Product Catalog", icon: Package },
              { href: "/admin/reports", label: "Financial Reports", icon: BarChart2 },
              { href: "/admin/warehouses", label: "Warehouse Config", icon: Building2 },
            ].map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex flex-col items-center justify-center gap-3 rounded-xl border border-sky-100 bg-sky-50/50 p-6 text-center transition hover:bg-sky-50 hover:border-brand-blue hover:shadow-card">
                <Icon size={24} className="text-brand-blue" />
                <span className="text-sm font-black text-slate-700 dark:text-slate-300">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
