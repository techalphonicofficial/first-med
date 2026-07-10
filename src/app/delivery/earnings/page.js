"use client";

import { Wallet, TrendingUp, Download, IndianRupee } from "lucide-react";
import { toast } from "sonner";

export default function DeliveryEarningsPage() {
  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Fast delivery partner</p>
          <h1 className="mt-1 text-4xl font-black">Earnings & Payouts</h1>
        </div>
        <button onClick={(e) => { e.preventDefault(); toast.info('Preparing statement for download...'); }} className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-emerald-600 shadow-card hover:bg-emerald-50 transition">
          <Download size={15} /> Download Statement
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="soft-card rounded-2xl p-6 bg-brand-navy text-white shadow-premium">
          <div className="flex items-center gap-3 mb-4 text-brand-yellow">
            <Wallet size={24} />
            <h2 className="text-sm font-black uppercase tracking-widest">Available Balance</h2>
          </div>
          <p className="text-4xl font-black mb-2">Rs. 1,450</p>
          <p className="text-xs font-semibold text-sky-100">Will be transferred on Monday</p>
        </div>

        <div className="soft-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4 text-slate-500">
            <IndianRupee size={24} />
            <h2 className="text-sm font-black uppercase tracking-widest">Total Earned (This Week)</h2>
          </div>
          <p className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-2">Rs. 3,240</p>
          <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp size={12} /> +15% vs last week
          </p>
        </div>
      </div>

      <div className="soft-card rounded-2xl p-6">
        <h2 className="text-xl font-black mb-5">Weekly Earnings Breakdown</h2>
        <div className="space-y-4">
          {[
            { day: "Monday", date: "July 5", trips: 12, amount: "Rs. 540", active: true },
            { day: "Sunday", date: "July 4", trips: 18, amount: "Rs. 890", active: false },
            { day: "Saturday", date: "July 3", trips: 22, amount: "Rs. 1,120", active: false },
            { day: "Friday", date: "July 2", trips: 15, amount: "Rs. 690", active: false },
          ].map((log) => (
            <div key={log.date} className="flex items-center justify-between border-b border-emerald-50 pb-4 last:border-0 last:pb-0">
              <div>
                <p className={`font-black ${log.active ? 'text-emerald-600' : 'text-slate-800 dark:text-slate-200'}`}>{log.day}</p>
                <p className="text-xs font-semibold text-slate-400">{log.date} • {log.trips} completed trips</p>
              </div>
              <p className="text-lg font-black text-slate-900 dark:text-slate-100">{log.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
