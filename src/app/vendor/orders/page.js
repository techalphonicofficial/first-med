"use client";

import { useState } from "react";
import { CheckCircle2, Clock3, Search, X, XCircle } from "lucide-react";
import { toast } from "sonner";

const tabs = ["All", "Pending", "Processing", "Ready", "Completed", "Cancelled"];

const allOrders = [
  { id: "FM-3041", customer: "Priya S.",    items: ["Paracetamol 500mg", "ORS Sachets"],    total: 430, status: "Pending",    slot: "Today, 6 PM",   rxRequired: false },
  { id: "FM-3040", customer: "Arjun M.",   items: ["Cough Relief Syrup"],                   total: 189, status: "Processing", slot: "Express 90 min", rxRequired: true  },
  { id: "FM-3039", customer: "Sunita R.",  items: ["Vitamin C Zinc", "Elderberry Gummies"], total: 560, status: "Ready",      slot: "Today, 8 PM",   rxRequired: false },
  { id: "FM-3038", customer: "Ravi K.",    items: ["Knee Support", "Ankle Binder"],         total: 820, status: "Completed",  slot: "Delivered",     rxRequired: false },
  { id: "FM-3037", customer: "Meena T.",   items: ["Whey Protein Classic"],                 total: 350, status: "Pending",    slot: "Tomorrow 9 AM", rxRequired: false },
  { id: "FM-3036", customer: "Vikram P.",  items: ["Antacid Gel Sachets", "Nux Vomica 30"], total: 260, status: "Cancelled",  slot: "Cancelled",     rxRequired: true  },
  { id: "FM-3035", customer: "Anita J.",   items: ["Hydra Soft Face Wash"],                 total: 199, status: "Completed",  slot: "Delivered",     rxRequired: false },
  { id: "FM-3034", customer: "Dev S.",     items: ["Omega Recovery Softgels"],              total: 440, status: "Processing", slot: "Express 90 min", rxRequired: false },
];

const statusConfig = {
  Pending:    { color: "bg-amber-100 text-amber-700",   dot: "bg-amber-500",   border: "border-amber-100"  },
  Processing: { color: "bg-blue-100 text-brand-blue",   dot: "bg-brand-blue",  border: "border-blue-100"   },
  Ready:      { color: "bg-purple-100 text-purple-700", dot: "bg-purple-500",  border: "border-purple-100" },
  Completed:  { color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-100" },
  Cancelled:  { color: "bg-rose-100 text-rose-600",     dot: "bg-rose-400",    border: "border-rose-100"   },
};

export default function VendorOrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [orderStatuses, setOrderStatuses] = useState({});

  const filtered = allOrders.filter((o) => {
    const status = orderStatuses[o.id] || o.status;
    const tabMatch = activeTab === "All" || status === activeTab;
    const searchMatch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    return tabMatch && searchMatch;
  });

  function updateStatus(id, newStatus) {
    setOrderStatuses((prev) => ({ ...prev, [id]: newStatus }));
  }

  const counts = tabs.reduce((acc, tab) => {
    acc[tab] = tab === "All" ? allOrders.length : allOrders.filter((o) => (orderStatuses[o.id] || o.status) === tab).length;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-blue">Vendor portal</p>
          <h1 className="mt-1 text-4xl font-black">Orders</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order ID or customer…"
            className="w-64 rounded-full border border-sky-100 bg-white py-2.5 pl-10 pr-4 text-sm font-bold outline-brand-blue"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><X size={14} /></button>}
        </div>
      </div>

      {/* Tab bar */}
      <div className="no-scrollbar mb-6 flex gap-2 overflow-auto rounded-2xl bg-white p-1.5 shadow-card">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-black transition ${activeTab === tab ? "bg-brand-blue text-white shadow-glow" : "text-slate-500 hover:bg-sky-50"}`}
          >
            {tab} {counts[tab] > 0 && <span className={`ml-1 rounded-full px-1.5 text-[10px] ${activeTab === tab ? "bg-white/20 text-white" : "bg-sky-100 text-brand-blue"}`}>{counts[tab]}</span>}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="grid gap-4">
        {filtered.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-card">
            <p className="text-lg font-black text-slate-400">No orders found</p>
          </div>
        )}
        {filtered.map((order) => {
          const status = orderStatuses[order.id] || order.status;
          const sc = statusConfig[status];
          return (
            <div key={order.id} className={`soft-card rounded-2xl border p-5 transition hover:shadow-premium ${sc.border}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-blue text-lg font-black text-white shadow-soft">
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-black text-brand-blue">{order.id}</h2>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${sc.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} /> {status}
                      </span>
                      {order.rxRequired && (
                        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-700">Rx</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm font-bold text-slate-500">{order.customer} · {order.slot}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {order.items.map((item) => (
                        <span key={item} className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-400">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-xl font-black">Rs. {order.total}</p>
                  <div className="flex flex-wrap gap-2">
                    {status === "Pending" && (
                      <>
                        <button onClick={() => updateStatus(order.id, "Processing")} className="rounded-full bg-brand-blue px-4 py-2 text-xs font-black text-white hover:bg-[#066CAB] transition">
                          <CheckCircle2 size={13} className="mr-1 inline" /> Accept
                        </button>
                        <button onClick={() => updateStatus(order.id, "Cancelled")} className="rounded-full bg-rose-50 px-4 py-2 text-xs font-black text-rose-600 hover:bg-rose-100 transition">
                          <XCircle size={13} className="mr-1 inline" /> Reject
                        </button>
                      </>
                    )}
                    {status === "Processing" && (
                      <button onClick={() => updateStatus(order.id, "Ready")} className="rounded-full bg-purple-100 px-4 py-2 text-xs font-black text-purple-700 hover:bg-purple-200 transition">
                        <Clock3 size={13} className="mr-1 inline" /> Mark ready
                      </button>
                    )}
                    {status === "Ready" && (
                      <button onClick={() => updateStatus(order.id, "Completed")} className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-200 transition">
                        <CheckCircle2 size={13} className="mr-1 inline" /> Dispatched
                      </button>
                    )}
                    {(status === "Completed" || status === "Cancelled") && (
                      <span className="text-xs font-semibold text-slate-400">No further actions</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
