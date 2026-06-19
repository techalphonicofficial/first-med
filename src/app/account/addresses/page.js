"use client";

import { Edit2, MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const initialAddresses = [
  { id: 1, label: "Home", text: "Block C, Green Park, Sector 21", city: "New Delhi", pin: "110016", isDefault: true },
  { id: 2, label: "Work", text: "Tower 2, Metro Height, Phase 3", city: "Gurgaon", pin: "122002", isDefault: false }
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);

  function makeDefault(id) {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  }

  function deleteAddress(id) {
    setAddresses(prev => prev.filter(a => a.id !== id));
  }

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-blue">Account</p>
          <h1 className="mt-1 text-4xl font-black">Saved addresses</h1>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition">
          <Plus size={16} /> Add new address
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <div key={address.id} className={`soft-card relative overflow-hidden rounded-[2rem] p-6 transition hover:-translate-y-1 hover:shadow-premium ${address.isDefault ? "ring-2 ring-brand-blue" : ""}`}>
            
            {/* Map Placeholder Header */}
            <div className="absolute left-0 right-0 top-0 h-24 bg-[#e6f4f1] opacity-60">
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#cdeae3 1px, transparent 1px), linear-gradient(90deg, #cdeae3 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="absolute left-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-brand-blue text-white shadow-soft"><MapPin size={18} /></div>
            </div>

            <div className="relative mt-20">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-black">{address.label}</h2>
                {address.isDefault && (
                  <span className="rounded-full bg-brand-blue px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white">Default</span>
                )}
              </div>
              
              <div className="h-20 text-sm font-semibold leading-6 text-slate-600">
                <p>{address.text}</p>
                <p>{address.city}, {address.pin}</p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-sky-50 pt-4">
                {!address.isDefault ? (
                  <button onClick={() => makeDefault(address.id)} className="text-sm font-black text-brand-blue hover:underline">Set as default</button>
                ) : (
                  <span className="text-sm font-bold text-slate-400">Primary address</span>
                )}
                
                <div className="flex gap-2">
                  <button className="grid h-8 w-8 place-items-center rounded-xl bg-sky-50 text-brand-blue hover:bg-sky-100 transition">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => deleteAddress(address.id)} className="grid h-8 w-8 place-items-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
