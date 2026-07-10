"use client";

import { AlertTriangle, CheckCircle2, Clock, PackageSearch, RefreshCw, Send, TrendingDown } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Orders to Dispatch", value: "142", sub: "35 High Priority", icon: Send, color: "text-brand-blue", bg: "bg-sky-50" },
  { label: "Inbound Deliveries", value: "12", sub: "Arriving today", icon: RefreshCw, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Low Stock Alerts", value: "28", sub: "-5 since yesterday", icon: TrendingDown, color: "text-rose-600", bg: "bg-rose-50" },
  { label: "Inventory Accuracy", value: "99.8%", sub: "Last audit: 2 days ago", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
];

export default function WarehouseDashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="overflow-hidden rounded-[2rem] bg-brand-navy p-7 text-white shadow-premium sm:p-9">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-yellow">Warehouse Operations</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">North Hub Dashboard</h1>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-sky-100">
              Manage inventory levels, process inbound stock, and orchestrate outbound dispatch operations efficiently.
            </p>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <Link href="/warehouse/dispatch" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-black text-slate-900 dark:text-slate-100 shadow-glow transition hover:-translate-y-0.5">
              Start Dispatch Queue
            </Link>
          </div>
        </div>
      </div>

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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Action Center */}
        <div className="soft-card rounded-2xl p-6">
          <h2 className="text-xl font-black mb-5">Attention Required</h2>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 p-4">
              <Clock size={20} className="text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-black text-amber-800">Inbound Delivery ETA: 30 Mins</p>
                <p className="mt-1 text-xs font-semibold text-amber-700">Vendor: Apollo Pharma • 12 Pallets expected</p>
                <Link href="/warehouse/receiving" className="mt-2 inline-block text-xs font-black text-amber-800 hover:underline">Prepare receiving dock →</Link>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-100 p-4">
              <AlertTriangle size={20} className="text-rose-600 mt-0.5" />
              <div>
                <p className="text-sm font-black text-rose-800">Critical Low Stock (5 SKUs)</p>
                <p className="mt-1 text-xs font-semibold text-rose-700">Paracetamol 500mg stock is below reserve levels.</p>
                <Link href="/warehouse/inventory" className="mt-2 inline-block text-xs font-black text-rose-800 hover:underline">View inventory alerts →</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="soft-card rounded-2xl p-6">
          <h2 className="text-xl font-black mb-5">Quick Tools</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: "/warehouse/inventory", label: "Scan Item", icon: PackageSearch },
              { href: "/warehouse/receiving", label: "Receive Stock", icon: RefreshCw },
              { href: "/warehouse/dispatch", label: "Assign Rider", icon: Send },
              { href: "/warehouse/audits", label: "Log Damage", icon: AlertTriangle },
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
