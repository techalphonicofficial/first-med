"use client";

import { AlertTriangle, Car, MapPin, Navigation, Package, Phone, Settings, ToggleRight, Truck } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const deliveries = [
  { id: "FM-3041", pickup: "FirstMED Plus Sector 21", drop: "Block C, Green Park",   dist: "4.2 km", eta: "15 min", status: "Assigned" },
  { id: "FM-3039", pickup: "FirstMED Express",        drop: "Tower 2, Metro Height", dist: "1.8 km", eta: "8 min",  status: "Assigned" },
];

export default function DeliveryDashboardPage() {
  const [online, setOnline] = useState(true);

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Fast delivery partner</p>
          <h1 className="mt-1 text-4xl font-black">Dashboard</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-white">Ravi Kumar · DL-04-AB-1234</p>
        </div>
        <button
          onClick={() => setOnline(!online)}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black transition ${online ? "bg-emerald-500 text-white shadow-glow" : "bg-slate-200 text-slate-500 dark:text-white"}`}
        >
          <ToggleRight size={20} className={online ? "text-white" : "rotate-180"} /> {online ? "Online & Available" : "Offline"}
        </button>
      </div>

      {!online && (
        <div className="mb-6 rounded-2xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 p-6 text-center shadow-inner">
          <Car className="mx-auto mb-3 text-slate-300" size={32} />
          <h2 className="text-lg font-black text-slate-600 dark:text-white">You are offline</h2>
          <p className="mt-1 text-sm font-semibold text-slate-400 dark:text-white">Toggle your status to online to start receiving delivery requests.</p>
        </div>
      )}

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Today's earnings", value: "Rs. 1,260", sub: "8 deliveries completed", color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Distance covered", value: "32 km",     sub: "Last updated 5m ago",    color: "text-brand-blue", bg: "bg-sky-50"     },
          { label: "Rating",           value: "4.9 ★",     sub: "Excellent standing",     color: "text-amber-500",  bg: "bg-amber-50"   },
        ].map(({ label, value, sub, color, bg }) => (
          <div key={label} className="soft-card rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-premium">
            <p className="text-sm font-black text-slate-500 dark:text-white">{label}</p>
            <p className={`mt-2 text-3xl font-black ${color}`}>{value}</p>
            <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-white">{sub}</p>
          </div>
        ))}
      </div>

      {/* Main split */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Active map area */}
        <div className="soft-card relative min-h-[500px] overflow-hidden rounded-2xl bg-[#e6f4f1]">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(#cdeae3 1px, transparent 1px), linear-gradient(90deg, #cdeae3 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          {online && (
            <>
              {/* Fake route line */}
              <div className="absolute left-[30%] top-[40%] h-[30%] w-[40%] rounded-tl-3xl border-l-4 border-t-4 border-dashed border-emerald-500" />
              <div className="absolute left-[30%] top-[40%] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-blue text-white shadow-soft"><Navigation size={18} /></div>
              <div className="absolute left-[70%] top-[70%] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-emerald-500 text-white shadow-soft"><MapPin size={18} /></div>
            </>
          )}
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800 p-4 shadow-card">
            <p className="text-sm font-black text-emerald-600"><Truck className="mr-2 inline" size={16} /> Live region map</p>
            <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-white">Sector 21 & surrounding areas</p>
          </div>
          <button onClick={(e) => { e.preventDefault(); toast.info('Opening map settings...'); }} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-slate-900 dark:border-slate-800 text-slate-600 dark:text-white shadow-card hover:text-brand-blue">
            <Settings size={18} />
          </button>
        </div>

        {/* Active queue */}
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">Active deliveries</h2>
            <Link href="/delivery/orders" className="text-sm font-black text-brand-blue hover:underline">View all</Link>
          </div>

          {online ? deliveries.map((del) => (
            <div key={del.id} className="soft-card rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-premium">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-sky-50 dark:bg-slate-900 px-2.5 py-1 text-xs font-black text-brand-blue">{del.id}</span>
                <span className="text-sm font-black text-emerald-600">{del.eta}</span>
              </div>
              
              <div className="relative mt-5 pl-6">
                <div className="absolute bottom-2 left-[11px] top-2 w-[2px] bg-slate-100" />
                <div className="mb-4 relative">
                  <div className="absolute -left-6 top-1 grid h-4 w-4 place-items-center rounded-full bg-sky-100 ring-4 ring-white"><div className="h-1.5 w-1.5 rounded-full bg-brand-blue" /></div>
                  <p className="text-xs font-bold text-slate-400 dark:text-white">Pickup</p>
                  <p className="font-black text-slate-800 dark:text-white">{del.pickup}</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-6 top-1 grid h-4 w-4 place-items-center rounded-full bg-emerald-100 ring-4 ring-white"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /></div>
                  <p className="text-xs font-bold text-slate-400 dark:text-white">Drop ({del.dist})</p>
                  <p className="font-black text-slate-800 dark:text-white">{del.drop}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button onClick={(e) => { e.preventDefault(); toast.info('Starting navigation...'); }} className="flex items-center justify-center gap-2 rounded-xl bg-brand-blue py-2.5 text-sm font-black text-white hover:bg-[#066CAB] transition">
                  <Navigation size={15} /> Navigate
                </button>
                <button onClick={(e) => { e.preventDefault(); toast.info('Opening order details...'); }} className="flex items-center justify-center gap-2 rounded-xl bg-sky-50 dark:bg-slate-900 py-2.5 text-sm font-black text-brand-blue hover:bg-sky-100 transition">
                  <Package size={15} /> Details
                </button>
              </div>
            </div>
          )) : (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
              <AlertTriangle className="mx-auto mb-2 text-slate-300" size={24} />
              <p className="text-sm font-bold text-slate-400 dark:text-white">Queue is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
