"use client";

import { useState } from "react";
import { AlertTriangle, ArrowUpRight, Package, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";

const initialInventory = [
  { id: 1, name: "Paracetamol 500mg Tablets", sku: "HRC-001", category: "Health Resource Center", stock: 45, threshold: 20, price: 89,  rxRequired: false },
  { id: 2, name: "Cough Relief Syrup",         sku: "HRC-002", category: "Health Resource Center", stock: 8,  threshold: 15, price: 145, rxRequired: true  },
  { id: 3, name: "Vitamin C Zinc Tablets",      sku: "VN-001",  category: "Vitamins & Nutrition",   stock: 0,  threshold: 10, price: 199, rxRequired: false },
  { id: 4, name: "Whey Protein Classic",        sku: "FH-001",  category: "Fitness & Health",       stock: 22, threshold: 10, price: 899, rxRequired: false },
  { id: 5, name: "Hydra Soft Face Wash",        sku: "PC-001",  category: "Personal Care",          stock: 6,  threshold: 12, price: 249, rxRequired: false },
  { id: 6, name: "Omega Recovery Softgels",     sku: "FH-002",  category: "Fitness & Health",       stock: 30, threshold: 10, price: 450, rxRequired: false },
  { id: 7, name: "Knee Support Sleeve",         sku: "SB-001",  category: "Supports & Braces",      stock: 14, threshold: 8,  price: 599, rxRequired: false },
  { id: 8, name: "ORS Sachets Pack",            sku: "HRC-003", category: "Health Resource Center", stock: 3,  threshold: 20, price: 59,  rxRequired: false },
];

function getStockStatus(stock, threshold) {
  if (stock === 0) return { label: "Out of stock", color: "bg-rose-100 text-rose-600",    row: "bg-rose-50/40"   };
  if (stock <= threshold) return { label: "Low stock",    color: "bg-amber-100 text-amber-700", row: "bg-amber-50/30"  };
  return { label: "In stock",    color: "bg-emerald-100 text-emerald-700", row: ""          };
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState("");

  function restockItem(id) {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, stock: item.stock + 20 } : item));
    toast.success("Stock replenished successfully!");
  }
  const [filter, setFilter] = useState("All");

  const filtered = inventory.filter((item) => {
    const { label } = getStockStatus(item.stock, item.threshold);
    const searchMatch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const filterMatch = filter === "All" || label === filter;
    return searchMatch && filterMatch;
  });

  const lowCount = inventory.filter((i) => i.stock <= i.threshold && i.stock > 0).length;
  const outCount = inventory.filter((i) => i.stock === 0).length;

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-blue">Vendor portal</p>
          <h1 className="mt-1 text-4xl font-black">Inventory</h1>
        </div>
        <button onClick={(e) => { e.preventDefault(); toast.info('Syncing with warehouse databases...'); }} className="flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow">
          <RefreshCw size={14} /> Sync stock
        </button>
      </div>

      {/* Alert banner */}
      {(lowCount > 0 || outCount > 0) && (
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <AlertTriangle size={18} className="shrink-0 text-amber-600" />
          <p className="text-sm font-black text-amber-800">
            {outCount > 0 && <span className="text-rose-600">{outCount} out of stock · </span>}
            {lowCount > 0 && <span>{lowCount} running low — restock soon</span>}
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={15} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or SKU…"
            className="w-full rounded-full border border-sky-100 bg-white py-2.5 pl-10 pr-4 text-sm font-bold outline-brand-blue"
          />
        </div>
        <div className="flex gap-2">
          {["All", "In stock", "Low stock", "Out of stock"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-xs font-black transition ${filter === f ? "bg-brand-blue text-white shadow-glow" : "bg-white text-slate-600 dark:text-slate-400 shadow-card hover:bg-sky-50"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="soft-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-sky-100 bg-sky-50/50">
              <tr>
                {["Product", "SKU", "Category", "Stock", "Threshold", "Price", "Status", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const { label, color, row } = getStockStatus(item.stock, item.threshold);
                return (
                  <tr key={item.id} className={`border-b border-sky-50 last:border-0 transition hover:bg-sky-50/30 ${row}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-100">
                          <Package size={15} className="text-brand-blue" />
                        </div>
                        <div>
                          <p className="font-black text-slate-800 dark:text-slate-200">{item.name}</p>
                          {item.rxRequired && <span className="text-[10px] font-black text-amber-600">Rx required</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-slate-500">{item.sku}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-slate-500">{item.category}</td>
                    <td className="px-4 py-3">
                      <span className={`text-base font-black ${item.stock === 0 ? "text-rose-600" : item.stock <= item.threshold ? "text-amber-600" : "text-slate-800 dark:text-slate-200"}`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-400">{item.threshold}</td>
                    <td className="px-4 py-3 font-black">Rs. {item.price}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-black ${color}`}>{label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => restockItem(item.id)} className="flex items-center gap-1 rounded-full bg-brand-blue px-3 py-1.5 text-xs font-black text-white hover:bg-[#066CAB] transition">
                        <ArrowUpRight size={12} /> Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
