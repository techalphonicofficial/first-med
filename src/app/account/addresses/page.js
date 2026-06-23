"use client";

import { Edit2, MapPin, Plus, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const initialAddresses = [
  { id: 1, label: "Home", text: "Block C, Green Park, Sector 21", city: "New Delhi", pin: "110016", isDefault: true },
  { id: 2, label: "Work", text: "Tower 2, Metro Height, Phase 3", city: "Gurgaon", pin: "122002", isDefault: false }
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  function makeDefault(id) {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    toast.success("Default address updated");
  }

  function deleteAddress(id) {
    setAddresses(prev => prev.filter(a => a.id !== id));
    toast.success("Address deleted");
  }

  function openAdd() {
    setEditingAddress(null);
    setModalOpen(true);
  }

  function openEdit(address) {
    setEditingAddress(address);
    setModalOpen(true);
  }

  function saveAddress(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const label = formData.get("label");
    const text = formData.get("text");
    const city = formData.get("city");
    const pin = formData.get("pin");

    if (editingAddress) {
      setAddresses(prev => prev.map(a => a.id === editingAddress.id ? { ...a, label, text, city, pin } : a));
      toast.success("Address updated!");
    } else {
      setAddresses(prev => [...prev, { id: Date.now(), label, text, city, pin, isDefault: prev.length === 0 }]);
      toast.success("New address added!");
    }
    setModalOpen(false);
  }

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-blue">Account</p>
          <h1 className="mt-1 text-4xl font-black">Saved addresses</h1>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition">
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
                  <button onClick={() => openEdit(address)} className="grid h-8 w-8 place-items-center rounded-xl bg-sky-50 text-brand-blue hover:bg-sky-100 transition">
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

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/40"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-premium"
            >
              <div className="flex items-center justify-between border-b border-sky-100 p-5">
                <h2 className="text-xl font-black">{editingAddress ? "Edit Address" : "Add New Address"}</h2>
                <button onClick={() => setModalOpen(false)} className="rounded-full bg-sky-50 p-2 text-brand-blue hover:bg-sky-100">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={saveAddress} className="grid gap-4 p-6">
                <label className="grid gap-2 text-sm font-black min-w-0">
                  Label (e.g. Home, Work)
                  <input name="label" defaultValue={editingAddress?.label || ""} required className="w-full min-w-0 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue" />
                </label>
                <label className="grid gap-2 text-sm font-black min-w-0">
                  Address Line
                  <textarea name="text" defaultValue={editingAddress?.text || ""} required rows={3} className="w-full min-w-0 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue resize-none" />
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-black min-w-0">
                    City
                    <input name="city" defaultValue={editingAddress?.city || ""} required className="w-full min-w-0 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue" />
                  </label>
                  <label className="grid gap-2 text-sm font-black min-w-0">
                    Pincode
                    <input name="pin" defaultValue={editingAddress?.pin || ""} required maxLength={6} minLength={6} className="w-full min-w-0 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue" />
                  </label>
                </div>
                <button type="submit" className="mt-4 w-full rounded-full bg-brand-blue py-3.5 font-black text-white shadow-glow hover:bg-[#066CAB] transition">
                  {editingAddress ? "Save Changes" : "Add Address"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
