"use client";

import { useState } from "react";
import { Search, Filter, ScanLine, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const mockInventory = [
  { id: "SKU-9901", name: "Paracetamol 500mg", batch: "B-883", expiry: "2027-10", quantity: 450, location: "A1-Shelf 3", status: "In Stock" },
  { id: "SKU-9902", name: "Vitamin C Zinc", batch: "B-742", expiry: "2025-11", quantity: 8, location: "B2-Shelf 1", status: "Low Stock" },
  { id: "SKU-9903", name: "Whey Protein 1kg", batch: "B-120", expiry: "2026-04", quantity: 120, location: "D4-Pallet 2", status: "In Stock" },
  { id: "SKU-9904", name: "BP Monitor Pro", batch: "B-005", expiry: "N/A", quantity: 0, location: "E1-Shelf 4", status: "Out of Stock" },
  { id: "SKU-9905", name: "Ayurvedic Cough Syrup", batch: "B-331", expiry: "2026-01", quantity: 23, location: "C3-Shelf 2", status: "Low Stock" },
];

export default function WarehouseInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockInventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Warehouse Operations</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900">Inventory Management</h1>
        </div>
        <div className="flex gap-3">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Search submitted!"); }} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue" size={16} />
            <input
              type="text"
              placeholder="Search SKU, name, or batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 rounded-full border border-sky-100 bg-white py-2.5 pl-10 pr-4 text-sm font-bold outline-brand-blue shadow-sm"
            />
          </form>
          <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition">
            <ScanLine size={16} /> Scan Barcode
          </button>
        </div>
      </div>

      <div className="soft-card overflow-hidden rounded-2xl bg-white shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sky-50 bg-slate-50 text-left">
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Item Details</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Batch & Expiry</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Location</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Stock Level</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-sky-50 last:border-0 hover:bg-sky-50/40 transition">
                  <td className="px-5 py-4">
                    <p className="font-black text-brand-blue">{item.name}</p>
                    <p className="text-xs font-semibold text-slate-400">SKU: {item.id}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-700">{item.batch}</p>
                    <p className="text-xs font-semibold text-slate-500">Exp: {item.expiry}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded bg-sky-50 px-2 py-1 text-xs font-black text-brand-blue border border-sky-100">
                      {item.location}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-black text-slate-900 text-lg">{item.quantity} <span className="text-xs font-bold text-slate-500">units</span></p>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${
                      item.status === 'Out of Stock' ? 'text-rose-600' : 
                      item.status === 'Low Stock' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600 hover:bg-slate-200 transition">
                      Adjust <ArrowRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
