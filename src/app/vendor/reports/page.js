"use client";

import { Download, IndianRupee, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const recentSettlements = [
  { id: "SET-99012", date: "2026-07-05", amount: "Rs. 12,450", status: "Processed" },
  { id: "SET-99011", date: "2026-07-04", amount: "Rs. 15,200", status: "Processed" },
  { id: "SET-99010", date: "2026-07-03", amount: "Rs. 9,840", status: "Processed" },
];

export default function VendorReportsPage() {
  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Vendor Portal</p>
          <h1 className="mt-1 text-4xl font-black">Financial Reports</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={(e) => { e.preventDefault(); toast.info('Generating PDF report...'); }} className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-brand-blue shadow-card hover:bg-sky-50 transition">
            <Download size={15} /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main Charts & Data */}
        <div className="grid gap-6">
          <div className="soft-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">Revenue Overview</h2>
              <select className="rounded-full border border-sky-100 bg-white px-3 py-1.5 text-sm font-bold text-slate-600 dark:text-slate-400 outline-brand-blue">
                <option>This Month</option>
                <option>Last 3 Months</option>
                <option>Year to Date</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-sky-50 p-5">
                <p className="text-sm font-black text-slate-500">Gross Sales</p>
                <p className="mt-2 text-3xl font-black text-brand-blue">Rs. 1,45,200</p>
                <p className="mt-1 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <TrendingUp size={12} /> +12.5% vs last month
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-5">
                <p className="text-sm font-black text-slate-500">Net Payout</p>
                <p className="mt-2 text-3xl font-black text-emerald-600">Rs. 1,28,450</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">After commission & taxes</p>
              </div>
            </div>
            
            <div className="mt-6 flex h-48 items-end gap-2 px-2 pb-2 border-b border-sky-50">
              {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-xl bg-brand-blue/20" style={{ height: '100%', position: 'relative' }}>
                    <div className="absolute bottom-0 w-full rounded-t-xl bg-brand-blue transition-all duration-500" style={{ height: `${h}%` }} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">Day {i + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="grid gap-6">
          <div className="soft-card rounded-2xl p-6">
            <h2 className="text-lg font-black mb-4 flex items-center gap-2">
              <IndianRupee size={18} className="text-brand-blue" />
              Recent Settlements
            </h2>
            <div className="grid gap-3">
              {recentSettlements.map((settlement) => (
                <div key={settlement.id} className="flex items-center justify-between border-b border-sky-50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-slate-200">{settlement.amount}</p>
                    <p className="text-xs font-semibold text-slate-500">{settlement.date} • {settlement.id}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                    {settlement.status}
                  </span>
                </div>
              ))}
            </div>
            <button onClick={(e) => { e.preventDefault(); toast.info('Loading full statement history...'); }} className="mt-4 w-full rounded-xl bg-sky-50 py-2.5 text-sm font-black text-brand-blue hover:bg-sky-100 transition">
              View All Statements
            </button>
          </div>
          
          <div className="soft-card rounded-2xl p-6 bg-brand-navy text-white">
            <Calendar className="mb-3 text-brand-yellow" size={24} />
            <h3 className="text-lg font-black mb-1">Next Payout Cycle</h3>
            <p className="text-sm font-semibold text-sky-100 mb-4">Your next automated settlement is scheduled for Monday, July 12, 2026.</p>
            <p className="text-2xl font-black text-brand-yellow">Rs. 18,450</p>
            <p className="text-xs font-semibold text-sky-200 uppercase tracking-widest">Estimated amount</p>
          </div>
        </div>
      </div>
    </div>
  );
}
