"use client";

import { Send, MapPin, Package, User } from "lucide-react";
import { toast } from "sonner";

const mockDispatch = [
  { id: "DSP-1120", orderRef: "FM-3041", route: "Sector 21", items: 3, rider: "Ravi Kumar", status: "Ready for Pickup" },
  { id: "DSP-1121", orderRef: "FM-3039", route: "Metro Height", items: 1, rider: "Assigning...", status: "Packing" },
];

export default function WarehouseDispatchPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Warehouse Operations</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900">Outbound Dispatch</h1>
        </div>
      </div>

      <div className="grid gap-4">
        {mockDispatch.map((dsp) => (
          <div key={dsp.id} className="soft-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6 transition hover:shadow-premium hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${dsp.status === 'Ready for Pickup' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                <Send size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{dsp.orderRef}</h3>
                <p className="text-sm font-bold text-slate-600 flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {dsp.route}
                </p>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Rider</p>
                <p className="text-sm font-bold flex items-center gap-1">
                  <User size={14} className="text-brand-blue" /> {dsp.rider}
                </p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Items</p>
                <p className="text-sm font-bold flex items-center gap-1">
                  <Package size={14} className="text-brand-blue" /> {dsp.items}
                </p>
              </div>
            </div>

            <div>
              {dsp.status === 'Ready for Pickup' ? (
                <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-black text-white hover:bg-emerald-600 transition shadow-glow">
                  Handover
                </button>
              ) : (
                <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="flex items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-2 text-sm font-black text-white hover:bg-[#066CAB] transition shadow-glow">
                  Complete Packing
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
