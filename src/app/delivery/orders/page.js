"use client";

import { AlertCircle, CheckCircle2, MapPin, Navigation, Phone, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initialDeliveries = [
  { id: "FM-3041", pickup: "FirstMED Plus Sector 21", drop: "Block C, Green Park",   dist: "4.2 km", value: 430, status: "Assigned" },
  { id: "FM-3039", pickup: "FirstMED Express",        drop: "Tower 2, Metro Height", dist: "1.8 km", value: 560, status: "Picked up" },
  { id: "FM-3038", pickup: "FirstMED 24x7",           drop: "Sector 14, House 42",   dist: "3.5 km", value: 820, status: "Delivered" },
];

export default function DeliveryOrdersPage() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [filter, setFilter] = useState("Active");

  const filtered = deliveries.filter((d) => 
    filter === "All" || 
    (filter === "Active" && d.status !== "Delivered") || 
    (filter === "Completed" && d.status === "Delivered")
  );

  function advanceStatus(id) {
    setDeliveries((prev) => prev.map((d) => {
      if (d.id !== id) return d;
      if (d.status === "Assigned") return { ...d, status: "Picked up" };
      if (d.status === "Picked up") return { ...d, status: "Delivered" };
      return d;
    }));
  }

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Fast delivery partner</p>
          <h1 className="mt-1 text-4xl font-black">Deliveries</h1>
        </div>
        <div className="flex gap-2">
          {["Active", "Completed", "All"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2.5 text-sm font-black transition ${filter === f ? "bg-emerald-500 text-white shadow-glow" : "bg-white text-slate-600 shadow-card hover:bg-emerald-50 hover:text-emerald-700"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((del) => {
          const isDone = del.status === "Delivered";
          return (
            <div key={del.id} className="soft-card rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-premium">
              {/* Card header */}
              <div className="flex items-start justify-between border-b border-sky-50 pb-4">
                <div>
                  <h2 className="text-lg font-black">{del.id}</h2>
                  <p className="mt-0.5 text-sm font-bold text-slate-500">Value: Rs. {del.value}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${isDone ? "bg-emerald-100 text-emerald-700" : "bg-brand-softBlue text-brand-blue"}`}>
                  {isDone ? <CheckCircle2 size={13} /> : <Navigation size={13} />} {del.status}
                </span>
              </div>

              {/* Route */}
              <div className="relative my-5 pl-8">
                <div className="absolute bottom-3 left-[15px] top-3 w-[2px] bg-slate-100" />
                <div className="mb-5 relative">
                  <div className="absolute -left-8 top-1 grid h-5 w-5 place-items-center rounded-full bg-sky-100 ring-4 ring-white"><div className="h-2 w-2 rounded-full bg-brand-blue" /></div>
                  <p className="text-xs font-bold text-slate-400">Pickup</p>
                  <p className="text-sm font-black text-slate-800">{del.pickup}</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-8 top-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-100 ring-4 ring-white"><div className="h-2 w-2 rounded-full bg-emerald-500" /></div>
                  <p className="text-xs font-bold text-slate-400">Drop off ({del.dist})</p>
                  <p className="text-sm font-black text-slate-800">{del.drop}</p>
                </div>
              </div>

              {/* Step indicator */}
              {!isDone && (
                <div className="mb-6 flex justify-between px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="text-brand-blue">Assigned</span>
                  <span className={del.status === "Picked up" ? "text-brand-blue" : ""}>Picked up</span>
                  <span>Delivered</span>
                </div>
              )}

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 border-t border-sky-50 pt-4">
                {!isDone ? (
                  <>
                    <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="flex items-center justify-center gap-2 rounded-xl bg-sky-50 py-3 text-sm font-black text-brand-blue hover:bg-sky-100 transition">
                      <MapPin size={16} /> Map
                    </button>
                    <button onClick={() => advanceStatus(del.id)} className="flex items-center justify-center gap-2 rounded-xl bg-brand-blue py-3 text-sm font-black text-white shadow-glow hover:bg-[#066CAB] transition">
                      <ShieldCheck size={16} /> {del.status === "Assigned" ? "Confirm pickup" : "Mark delivered"}
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-black text-slate-400 transition">
                      <CheckCircle2 size={16} /> Completed successfully
                    </button>
                  </>
                )}
              </div>
              
              {!isDone && (
                <div className="mt-3 flex justify-between">
                  <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-blue"><Phone size={13} /> Call customer</button>
                  <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="flex items-center gap-1 text-xs font-bold text-rose-400 hover:text-rose-500"><AlertCircle size={13} /> Report issue</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
