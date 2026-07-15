"use client";

import { ArrowRight, ArrowLeftRight, Clock3, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { useState } from "react";

const initialTransfers = [
  { id: "TRX-4410", from: "North Hub", to: "South Express", items: 450, status: "In Transit", date: "2026-07-06" },
  { id: "TRX-4411", from: "Mumbai Central", to: "North Hub", items: 120, status: "Pending Receipt", date: "2026-07-05" },
  { id: "TRX-4412", from: "North Hub", to: "Kolkata Hub", items: 85, status: "Completed", date: "2026-07-04" },
];

export default function WarehouseTransfersPage() {
  const [transfers, setTransfers] = useState(initialTransfers);

  function receiveTransfer(id) {
    setTransfers(prev => prev.map(t => t.id === id ? { ...t, status: "Completed" } : t));
    toast.success("Transfer received and inventory updated!");
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Warehouse Operations</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900 dark:text-white">Inter-Warehouse Transfers</h1>
        </div>
        <button onClick={(e) => { e.preventDefault(); toast.info('Opening new transfer request form...'); }} className="flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition">
          <ArrowLeftRight size={16} /> New Transfer Request
        </button>
      </div>

      <div className="soft-card overflow-hidden rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800 shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sky-50 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-left">
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">Transfer ID</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">Route</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">Quantity</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">Status</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((trx) => (
                <tr key={trx.id} className="border-b border-sky-50 last:border-0 hover:bg-sky-50 dark:bg-slate-900/40 transition">
                  <td className="px-5 py-4">
                    <p className="font-black text-brand-blue">{trx.id}</p>
                    <p className="text-xs font-semibold text-slate-400 dark:text-white">Init: {trx.date}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-700 dark:text-white">{trx.from}</span>
                      <ArrowRight size={14} className="text-slate-400 dark:text-white" />
                      <span className="font-bold text-slate-700 dark:text-white">{trx.to}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-black text-slate-900 dark:text-white">{trx.items} units</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${
                      trx.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {trx.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock3 size={12} />}
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {trx.status === 'Pending Receipt' && trx.to === 'North Hub' ? (
                      <button onClick={() => receiveTransfer(trx.id)} className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-black text-white hover:bg-emerald-600 transition shadow-glow">
                        Receive
                      </button>
                    ) : (
                      <button onClick={(e) => { e.preventDefault(); toast.info('Opening transfer details...'); }} className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black text-slate-600 dark:text-white hover:bg-slate-200 transition">
                        View
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
