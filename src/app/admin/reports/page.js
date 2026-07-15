"use client";

import { BarChart3, TrendingUp, IndianRupee, ShoppingCart, Truck, Activity } from "lucide-react";

const financialMetrics = [
  { label: "Total Platform GMV", value: "Rs. 24.5 L", change: "+12.5%", trend: "up" },
  { label: "Platform Commission", value: "Rs. 3.2 L", change: "+15.2%", trend: "up" },
  { label: "Delivery Revenue", value: "Rs. 85 K", change: "+5.4%", trend: "up" },
  { label: "Vendor Payouts Pending", value: "Rs. 4.1 L", change: "-2.1%", trend: "down" },
];

export default function AdminReportsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Platform</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900 dark:text-white">Financial & Operational Reports</h1>
        </div>
        <select className="rounded-full border border-sky-100 bg-white dark:bg-slate-900 dark:border-slate-800 px-4 py-2 text-sm font-bold outline-brand-blue shadow-sm">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Quarter</option>
          <option>Year to Date</option>
        </select>
      </div>

      {/* Financial Overview */}
      <h2 className="text-lg font-black flex items-center gap-2"><IndianRupee size={18} className="text-brand-blue" /> Financial Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {financialMetrics.map((metric) => (
          <div key={metric.label} className="soft-card rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-premium">
            <p className="text-sm font-black text-slate-500 dark:text-white">{metric.label}</p>
            <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{metric.value}</p>
            <p className={`mt-1 flex items-center gap-1 text-xs font-bold ${metric.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
              <TrendingUp size={12} className={metric.trend === 'down' ? 'rotate-180' : ''} /> {metric.change} vs last period
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Operational Metrics */}
        <div className="soft-card rounded-2xl p-6">
          <h2 className="text-lg font-black mb-5 flex items-center gap-2"><Activity size={18} className="text-brand-blue" /> Operational Health</h2>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-white mb-1">
                <span>Order Fulfillment Rate</span>
                <span>94%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '94%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-white mb-1">
                <span>On-time Delivery</span>
                <span>88%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand-blue" style={{ width: '88%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-white mb-1">
                <span>Prescription Approval SLA</span>
                <span>76%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-amber-500" style={{ width: '76%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="soft-card rounded-2xl p-6">
          <h2 className="text-lg font-black mb-5 flex items-center gap-2"><ShoppingCart size={18} className="text-brand-blue" /> Top Vendors</h2>
          <div className="space-y-4">
            {[
              { name: "Apollo Pharma Express", orders: "1,245 orders", revenue: "Rs. 4.2 L" },
              { name: "FirstMED Plus Sector 21", orders: "980 orders", revenue: "Rs. 3.1 L" },
              { name: "City Health Care", orders: "845 orders", revenue: "Rs. 2.8 L" },
            ].map((vendor, i) => (
              <div key={vendor.name} className="flex items-center justify-between border-b border-sky-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-sky-50 dark:bg-slate-900 text-xs font-black text-brand-blue">{i + 1}</div>
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-white">{vendor.name}</p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-white">{vendor.orders}</p>
                  </div>
                </div>
                <p className="text-sm font-black text-brand-blue">{vendor.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
