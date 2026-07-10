"use client";

import { ClipboardCheck, AlertTriangle, FileText } from "lucide-react";
import { toast } from "sonner";

const mockAudits = [
  { id: "AUD-091", type: "Daily Cycle Count", date: "2026-07-06", status: "In Progress", variance: "N/A", operator: "Suresh P." },
  { id: "AUD-090", type: "Damage Log", date: "2026-07-05", status: "Completed", variance: "-Rs. 450", operator: "Amit M." },
  { id: "AUD-089", type: "Weekly Full Audit", date: "2026-07-01", status: "Completed", variance: "+Rs. 120", operator: "Suresh P." },
];

export default function WarehouseAuditsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Warehouse Operations</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900 dark:text-slate-100">Stock Audits & Damage Logs</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={(e) => { e.preventDefault(); toast.info('Opening damage report form...'); }} className="flex items-center gap-2 rounded-full bg-white border border-rose-100 text-rose-600 px-5 py-2.5 text-sm font-black shadow-sm hover:bg-rose-50 transition">
            <AlertTriangle size={16} /> Log Damage
          </button>
          <button onClick={(e) => { e.preventDefault(); toast.info('Initializing cycle count scanner...'); }} className="flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition">
            <ClipboardCheck size={16} /> Start Cycle Count
          </button>
        </div>
      </div>

      <div className="soft-card overflow-hidden rounded-2xl bg-white shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sky-50 bg-slate-50 text-left">
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Audit ID</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Type</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Variance</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockAudits.map((audit) => (
                <tr key={audit.id} className="border-b border-sky-50 last:border-0 hover:bg-sky-50/40 transition">
                  <td className="px-5 py-4">
                    <p className="font-black text-brand-blue">{audit.id}</p>
                    <p className="text-xs font-semibold text-slate-400">{audit.date} • By {audit.operator}</p>
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-700 dark:text-slate-300">{audit.type}</td>
                  <td className="px-5 py-4">
                    <span className={`font-black ${audit.variance.startsWith('-') ? 'text-rose-600' : audit.variance.startsWith('+') ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {audit.variance}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${
                      audit.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {audit.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={(e) => { e.preventDefault(); toast.info('Generating audit report PDF...'); }} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition">
                      <FileText size={14} /> Report
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
