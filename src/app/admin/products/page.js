"use client";

import { useState } from "react";
import { Search, Package, Plus, Filter, CheckCircle2, Clock3 } from "lucide-react";
import { toast } from "sonner";
import { Modal } from "@/components/ui/Modal";

const mockProducts = [
  { id: "PRD-991", name: "Paracetamol 500mg", category: "Medicines", price: "Rs. 45", stock: "High", vendor: "Apollo Pharma", status: "Approved" },
  { id: "PRD-992", name: "Vitamin C Zinc", category: "Supplements", price: "Rs. 120", stock: "Medium", vendor: "City Health", status: "Approved" },
  { id: "PRD-993", name: "Whey Protein 1kg", category: "Fitness", price: "Rs. 2400", stock: "Low", vendor: "FirstMED Plus", status: "Pending" },
  { id: "PRD-994", name: "BP Monitor Pro", category: "Devices", price: "Rs. 1800", stock: "Out of Stock", vendor: "Green Cross", status: "Approved" },
  { id: "PRD-995", name: "Ayurvedic Cough Syrup", category: "Ayurveda", price: "Rs. 90", stock: "High", vendor: "Apollo Pharma", status: "Pending" },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function approveProduct(id) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: "Approved" } : p));
    toast.success("Product approved successfully!");
  }

  function openEdit(product) {
    setEditingProduct(product);
    setModalOpen(true);
  }

  function saveProduct(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const category = formData.get("category");
    const price = formData.get("price");
    const stock = formData.get("stock");

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, name, category, price, stock } : p));
      toast.success("Product updated successfully!");
    }
    setModalOpen(false);
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Platform</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900 dark:text-slate-100">Global Product Catalog</h1>
        </div>
        <div className="flex gap-3">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Search submitted!"); }} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 rounded-full border border-sky-100 bg-white py-2.5 pl-10 pr-4 text-sm font-bold outline-brand-blue shadow-sm"
            />
          </form>
          <button onClick={(e) => { e.preventDefault(); toast.info('Opening advanced filters...'); }} className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-black text-brand-blue border border-sky-100 shadow-sm hover:bg-sky-50 transition">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="soft-card overflow-hidden rounded-2xl bg-white shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sky-50 bg-slate-50 text-left">
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Product</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Category</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Price & Stock</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-sky-50 last:border-0 hover:bg-sky-50/40 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-50 text-brand-blue">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="font-black text-brand-blue">{product.name}</p>
                        <p className="text-xs font-semibold text-slate-400">{product.id} • {product.vendor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-700 dark:text-slate-300">{product.category}</td>
                  <td className="px-5 py-4">
                    <p className="font-black text-slate-900 dark:text-slate-100">{product.price}</p>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${
                      product.stock === 'Out of Stock' ? 'text-rose-600' : 
                      product.stock === 'Low' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${
                      product.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {product.status === 'Approved' ? <CheckCircle2 size={12} /> : <Clock3 size={12} />}
                      {product.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {product.status === 'Pending' ? (
                      <button onClick={() => approveProduct(product.id)} className="rounded-full bg-brand-blue px-4 py-1.5 text-xs font-black text-white hover:bg-[#066CAB] transition shadow-glow">
                        Approve
                      </button>
                    ) : (
                      <button onClick={() => openEdit(product)} className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition">
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Edit Product details">
        <form onSubmit={saveProduct} className="grid gap-4">
          <label className="grid gap-2 text-sm font-black">
            Product Name
            <input name="name" required defaultValue={editingProduct?.name || ""} className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue" />
          </label>
          <label className="grid gap-2 text-sm font-black">
            Category
            <input name="category" required defaultValue={editingProduct?.category || ""} className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="grid gap-2 text-sm font-black">
              Price
              <input name="price" required defaultValue={editingProduct?.price || ""} className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue" />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Stock Status
              <select name="stock" required defaultValue={editingProduct?.stock || "High"} className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </label>
          </div>
          <button type="submit" className="mt-4 rounded-full bg-brand-blue py-3 font-black text-white shadow-glow hover:bg-[#066CAB] transition">
            Save Changes
          </button>
        </form>
      </Modal>
    </div>
  );
}
