"use client";

import { useState } from "react";
import { Search, Shield, Building2, CheckCircle2, XCircle, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const mockVendors = [
  { id: "VND-101", name: "FirstMED Plus Sector 21", owner: "Ravi Kumar", phone: "+91 9988776655", status: "Pending", kyc: "Uploaded", license: "Uploaded", applied: "2026-07-05" },
  { id: "VND-102", name: "Apollo Pharma Express", owner: "Sneha Reddy", phone: "+91 9988776656", status: "Active", kyc: "Verified", license: "Verified", applied: "2026-06-20" },
  { id: "VND-103", name: "City Health Care", owner: "Amit Singh", phone: "+91 9988776657", status: "Rejected", kyc: "Invalid", license: "Missing", applied: "2026-07-01" },
  { id: "VND-104", name: "Green Cross Pharmacy", owner: "Pooja Mehta", phone: "+91 9988776658", status: "Pending", kyc: "Uploaded", license: "Missing", applied: "2026-07-06" },
];

export default function AdminVendorsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockVendors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Platform</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900 dark:text-white">Vendor Verification</h1>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Search submitted!"); }} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue" size={16} />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 rounded-full border border-sky-100 bg-white dark:bg-slate-900 dark:border-slate-800 py-2.5 pl-10 pr-4 text-sm font-bold outline-brand-blue shadow-sm"
          />
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="soft-card rounded-2xl p-5 border-l-4 border-amber-400">
          <p className="text-sm font-black text-slate-500 dark:text-white">Pending Reviews</p>
          <p className="mt-2 text-3xl font-black text-amber-600">2</p>
          <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-white">Require immediate action</p>
        </div>
        <div className="soft-card rounded-2xl p-5 border-l-4 border-emerald-500">
          <p className="text-sm font-black text-slate-500 dark:text-white">Active Vendors</p>
          <p className="mt-2 text-3xl font-black text-emerald-600">342</p>
          <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-white">Fully verified</p>
        </div>
        <div className="soft-card rounded-2xl p-5 border-l-4 border-rose-500">
          <p className="text-sm font-black text-slate-500 dark:text-white">Rejected</p>
          <p className="mt-2 text-3xl font-black text-rose-600">14</p>
          <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-white">Failed compliance</p>
        </div>
      </div>

      <div className="soft-card overflow-hidden rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800 shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sky-50 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-left">
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">Vendor</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">Owner</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">Documents</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">Status</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((vendor) => (
                <tr key={vendor.id} className="border-b border-sky-50 last:border-0 hover:bg-sky-50 dark:bg-slate-900/40 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 dark:bg-slate-900 text-brand-blue">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="font-black text-brand-blue">{vendor.name}</p>
                        <p className="text-xs font-semibold text-slate-400 dark:text-white">{vendor.id} • Applied {vendor.applied}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-700 dark:text-white">{vendor.owner}</p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-white">{vendor.phone}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-black uppercase ${vendor.kyc === 'Verified' ? 'bg-emerald-100 text-emerald-700' : vendor.kyc === 'Invalid' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                        KYC
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-black uppercase ${vendor.license === 'Verified' ? 'bg-emerald-100 text-emerald-700' : vendor.license === 'Missing' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                        DL
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${
                      vendor.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                      vendor.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {vendor.status === 'Active' && <CheckCircle2 size={12} />}
                      {vendor.status === 'Rejected' && <XCircle size={12} />}
                      {vendor.status === 'Pending' && <AlertCircle size={12} />}
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {vendor.status === 'Pending' ? (
                      <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-1.5 text-xs font-black text-white hover:bg-[#066CAB] transition shadow-glow">
                        <Shield size={14} /> Review
                      </button>
                    ) : (
                      <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-slate-900 px-4 py-1.5 text-xs font-black text-brand-blue hover:bg-sky-100 transition">
                        <FileText size={14} /> Details
                      </button>
                    )}
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
