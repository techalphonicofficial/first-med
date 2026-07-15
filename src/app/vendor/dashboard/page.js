"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, BarChart2, Box, CheckCircle2, Clock3, Package, ShoppingBag, Star, TrendingUp, Truck, Users, Zap } from "lucide-react";
import { toast } from "sonner";

import { useState } from "react";

const stats = [
  { label: "Today's revenue",  value: "Rs. 12,480", sub: "+18% vs yesterday", icon: TrendingUp,  color: "text-emerald-600", bg: "bg-emerald-50"  },
  { label: "Pending orders",   value: "12",          sub: "3 need acceptance",  icon: Clock3,      color: "text-amber-600",  bg: "bg-amber-50"   },
  { label: "Total products",   value: "56",          sub: "8 low / 2 out",     icon: Box,         color: "text-brand-blue", bg: "bg-sky-50"     },
  { label: "Avg. rating",      value: "4.7 ★",       sub: "Based on 124 orders",icon: Star,       color: "text-yellow-600", bg: "bg-yellow-50"  },
];

const initialOrders = [
  { id: "FM-3041", customer: "Priya S.",  items: 3, total: 430, status: "Pending",   slot: "Today, 6 PM"    },
  { id: "FM-3040", customer: "Arjun M.", items: 1, total: 189, status: "Processing", slot: "Express"        },
  { id: "FM-3039", customer: "Sunita R.",items: 2, total: 560, status: "Ready",      slot: "Today, 8 PM"    },
  { id: "FM-3038", customer: "Ravi K.",  items: 4, total: 820, status: "Completed",  slot: "Delivered"      },
];

const weekRevenue = [42, 68, 55, 80, 95, 72, 88]; // percentage heights for chart bars
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const statusConfig = {
  Pending:    { color: "bg-amber-100 text-amber-700",   dot: "bg-amber-500"  },
  Processing: { color: "bg-blue-100 text-brand-blue",   dot: "bg-brand-blue" },
  Ready:      { color: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
  Completed:  { color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
};

const navLinks = [
  { label: "Dashboard", href: "/vendor/dashboard", icon: BarChart2 },
  { label: "Orders",    href: "/vendor/orders",    icon: ShoppingBag },
  { label: "Inventory", href: "/vendor/inventory", icon: Box },
  { label: "Products",  href: "/vendor/products",  icon: Package },
  { label: "Customers", href: "#",                 icon: Users },
];

export default function VendorDashboardPage() {
  const [orders, setOrders] = useState(initialOrders);

  function advanceOrder(id, newStatus) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order ${id} marked as ${newStatus}`);
  }

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      {/* Page header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Vendor portal</p>
          <h1 className="mt-1 text-4xl font-black">Dashboard</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-white">Welcome back, FirstMED Plus · Sector 21</p>
        </div>
        <div className="flex gap-3">
          <Link href="/vendor/orders" className="flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition">
            View orders <ArrowRight size={15} />
          </Link>
          <Link href="/vendor/products" className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 dark:border-slate-800 px-5 py-2.5 text-sm font-black text-brand-blue shadow-card hover:bg-sky-50 transition">
            Manage products
          </Link>
        </div>
      </div>

      {/* Low stock alert */}
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
        <AlertTriangle size={18} className="shrink-0 text-amber-600" />
        <p className="text-sm font-black text-amber-800">8 products are running low on stock. <Link href="/vendor/inventory" className="underline">Review inventory →</Link></p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="soft-card rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-premium">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-slate-500 dark:text-white">{label}</p>
              <span className={`grid h-10 w-10 place-items-center rounded-2xl ${bg}`}>
                <Icon size={18} className={color} />
              </span>
            </div>
            <p className={`mt-3 text-3xl font-black ${color}`}>{value}</p>
            <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-white">{sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Revenue chart + recent orders */}
        <div className="grid gap-5">
          {/* Bar chart */}
          <div className="soft-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Weekly revenue</h2>
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                <TrendingUp size={13} /> +22% this week
              </span>
            </div>
            <div className="mt-6 flex h-40 items-end gap-2">
              {weekRevenue.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-xl bg-brand-blue transition-all duration-500"
                    style={{ height: `${h}%`, opacity: i === 6 ? 1 : 0.55 + i * 0.06 }}
                  />
                  <p className="text-[10px] font-bold text-slate-400 dark:text-white">{days[i]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent orders table */}
          <div className="soft-card rounded-2xl p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-black">Recent orders</h2>
              <Link href="/vendor/orders" className="text-sm font-black text-brand-blue hover:underline">
                View all <ArrowRight size={13} className="inline" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sky-100 text-left">
                    {["Order ID", "Customer", "Items", "Total", "Slot", "Status", "Action"].map((h) => (
                      <th key={h} className="pb-3 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const sc = statusConfig[order.status];
                    return (
                      <tr key={order.id} className="border-b border-sky-50 last:border-0">
                        <td className="py-3 font-black text-brand-blue">{order.id}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-blue text-[10px] font-black text-white">
                              {order.customer.charAt(0)}
                            </span>
                            {order.customer}
                          </div>
                        </td>
                        <td className="py-3 font-semibold text-slate-500 dark:text-white">{order.items} items</td>
                        <td className="py-3 font-black">Rs. {order.total}</td>
                        <td className="py-3 text-xs font-semibold text-slate-500 dark:text-white">{order.slot}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${sc.color}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3">
                          {order.status === "Pending" && (
                            <button onClick={() => advanceOrder(order.id, "Processing")} className="rounded-full bg-brand-blue px-3 py-1 text-xs font-black text-white hover:bg-[#066CAB]">Accept</button>
                          )}
                          {order.status === "Processing" && (
                            <button onClick={() => advanceOrder(order.id, "Ready")} className="rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">Mark ready</button>
                          )}
                          {(order.status === "Ready" || order.status === "Completed") && (
                            <span className="text-xs font-semibold text-slate-400 dark:text-white">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar — quick nav + performance */}
        <div className="grid gap-5">
          <div className="soft-card rounded-2xl p-5">
            <h2 className="mb-4 text-base font-black">Quick access</h2>
            <div className="grid gap-2">
              {navLinks.map(({ label, href, icon: Icon }) => (
                <Link key={label} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 dark:text-white transition hover:bg-sky-50 dark:bg-slate-900 hover:text-brand-blue">
                  <Icon size={16} className="text-brand-blue" /> {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="soft-card rounded-2xl p-5">
            <h2 className="mb-4 text-base font-black">Performance</h2>
            <div className="grid gap-3">
              {[
                { label: "Order acceptance rate", value: 94, color: "bg-emerald-500" },
                { label: "On-time delivery",       value: 88, color: "bg-brand-blue"  },
                { label: "Customer satisfaction",  value: 92, color: "bg-amber-400"   },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-xs font-bold text-slate-500 dark:text-white">
                    <span>{label}</span><span className="font-black text-slate-700 dark:text-white">{value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-sky-100">
                    <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="soft-card rounded-2xl p-5">
            <h2 className="mb-3 text-base font-black">Today&apos;s summary</h2>
            {[
              { icon: Zap,   label: "Express deliveries", value: "4"         },
              { icon: Truck, label: "Total dispatched",   value: "18 orders" },
              { icon: Users, label: "New customers",      value: "7"         },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between border-b border-sky-50 py-2.5 last:border-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-white">
                  <Icon size={14} className="text-brand-blue" /> {label}
                </div>
                <span className="text-sm font-black">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
