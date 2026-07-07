"use client";

import { useState } from "react";
import { Search, MapPin, Warehouse, ArrowRight, Settings, Plus } from "lucide-react";
import { toast } from "sonner";

const mockWarehouses = [
  { id: "WH-NORTH-01", name: "North Hub", location: "Delhi NCR", type: "Main Distribution", status: "Active", capacity: "85%", ordersToday: 1245 },
  { id: "WH-WEST-01", name: "Mumbai Central", location: "Mumbai", type: "Main Distribution", status: "Active", capacity: "92%", ordersToday: 3102 },
  { id: "WH-SOUTH-01", name: "Bangalore Express", location: "Bangalore", type: "Express Hub", status: "Active", capacity: "45%", ordersToday: 890 },
  { id: "WH-EAST-01", name: "Kolkata Hub", location: "Kolkata", type: "Main Distribution", status: "Maintenance", capacity: "0%", ordersToday: 0 },
];

export default function AdminWarehousesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockWarehouses.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Platform</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900">Warehouse Network</h1>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue" size={16} />
            <input
              type="text"
              placeholder="Search hubs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-56 rounded-full border border-sky-100 bg-white py-2.5 pl-10 pr-4 text-sm font-bold outline-brand-blue shadow-sm"
            />
          </div>
          <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition">
            <Plus size={16} /> Add Hub
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Main List */}
        <div className="grid gap-4">
          {filtered.map((wh) => (
            <div key={wh.id} className="soft-card rounded-2xl p-6 transition hover:shadow-premium hover:-translate-y-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${wh.status === 'Active' ? 'bg-sky-50 text-brand-blue' : 'bg-slate-100 text-slate-400'}`}>
                    <Warehouse size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{wh.name}</h3>
                    <p className="text-sm font-bold text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={14} /> {wh.location} • {wh.id}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600">
                        {wh.type}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${wh.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {wh.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 text-right">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Capacity</p>
                    <div className="flex items-center gap-2 justify-end">
                      <div className="h-2 w-16 rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full rounded-full ${parseInt(wh.capacity) > 85 ? 'bg-rose-500' : 'bg-brand-blue'}`} style={{ width: wh.capacity }} />
                      </div>
                      <span className="text-lg font-black text-slate-700">{wh.capacity}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Dispatched</p>
                    <p className="text-lg font-black text-brand-blue">{wh.ordersToday}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Config */}
        <div className="grid gap-4">
          <div className="soft-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={18} className="text-brand-blue" />
              <h2 className="text-lg font-black">Allocation Rules</h2>
            </div>
            <p className="text-sm font-semibold text-slate-500 leading-6 mb-4">
              Manage how orders are distributed among active warehouse hubs based on pincode and stock availability.
            </p>
            <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-50 py-2.5 text-sm font-black text-brand-blue hover:bg-sky-100 transition">
              Configure Routing <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
