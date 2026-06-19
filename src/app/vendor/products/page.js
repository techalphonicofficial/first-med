"use client";

import { useState } from "react";
import { Edit2, LockKeyhole, Package, Plus, Search, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";

const initialProducts = [
  { id: 1, name: "Paracetamol 500mg Tablets", category: "Health Resource Center", price: 89,  mrp: 110, stock: 45, inStock: true,  rxRequired: false },
  { id: 2, name: "Cough Relief Syrup",         category: "Health Resource Center", price: 145, mrp: 180, stock: 8,  inStock: true,  rxRequired: true  },
  { id: 3, name: "Vitamin C Zinc Tablets",      category: "Vitamins & Nutrition",   price: 199, mrp: 250, stock: 0,  inStock: false, rxRequired: false },
  { id: 4, name: "Whey Protein Classic",        category: "Fitness & Health",       price: 899, mrp: 999, stock: 22, inStock: true,  rxRequired: false },
  { id: 5, name: "Hydra Soft Face Wash",        category: "Personal Care",          price: 249, mrp: 299, stock: 6,  inStock: true,  rxRequired: false },
  { id: 6, name: "Omega Recovery Softgels",     category: "Fitness & Health",       price: 450, mrp: 550, stock: 30, inStock: true,  rxRequired: false },
];

export default function VendorProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  function toggleStock(id) {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, inStock: !p.inStock } : p));
  }

  function remove(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-blue">Vendor portal</p>
          <h1 className="mt-1 text-4xl font-black">Products</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">{products.length} total products</p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition">
          <Plus size={16} /> Add new product
        </button>
      </div>

      {/* Search */}
      <div className="mb-5 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={15} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products or categories…"
          className="w-full rounded-full border border-sky-100 bg-white py-2.5 pl-10 pr-4 text-sm font-bold outline-brand-blue"
        />
      </div>

      {/* Table */}
      <div className="soft-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-sky-100 bg-sky-50/60">
              <tr>
                {["Product", "Category", "Price / MRP", "Stock", "Type", "Visibility", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-sky-50 last:border-0 transition hover:bg-sky-50/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-100">
                        <Package size={18} className="text-brand-blue" />
                      </div>
                      <p className="font-black text-slate-800">{product.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-500">{product.category}</td>
                  <td className="px-4 py-3">
                    <span className="font-black">Rs. {product.price}</span>
                    <span className="ml-2 text-xs text-slate-400 line-through">Rs. {product.mrp}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-black ${product.stock === 0 ? "text-rose-600" : product.stock < 10 ? "text-amber-600" : "text-slate-800"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.rxRequired
                      ? <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-700"><LockKeyhole size={11} /> Rx</span>
                      : <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-700">OTC</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStock(product.id)} className="flex items-center gap-2 text-sm font-black transition hover:opacity-80">
                      {product.inStock
                        ? <><ToggleRight size={22} className="text-emerald-500" /> <span className="text-emerald-600">Live</span></>
                        : <><ToggleLeft size={22} className="text-slate-400" />  <span className="text-slate-400">Hidden</span></>
                      }
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="grid h-8 w-8 place-items-center rounded-xl bg-sky-50 text-brand-blue hover:bg-sky-100 transition">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => remove(product.id)} className="grid h-8 w-8 place-items-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition">
                        <Trash2 size={14} />
                      </button>
                    </div>
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
