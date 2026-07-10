"use client";

import { useState } from "react";
import { Pill, Check, X, FileText, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const initialPrescriptions = [
  { id: "PRX-001", patient: "Ravi Kumar", date: "2026-07-06 10:30 AM", type: "Digital Upload", items: 3, priority: "High" },
  { id: "PRX-002", patient: "Sneha Reddy", date: "2026-07-06 11:15 AM", type: "Scanned Copy", items: 1, priority: "Normal" },
  { id: "PRX-003", patient: "Pooja Mehta", date: "2026-07-06 01:45 PM", type: "Digital Upload", items: 5, priority: "High" },
  { id: "PRX-004", patient: "Arjun Singh", date: "2026-07-06 02:20 PM", type: "Doctor e-RX", items: 2, priority: "Normal" },
];

export default function AdminPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);

  function handleAction(id, action) {
    setPrescriptions(prev => prev.filter(p => p.id !== id));
    toast.success(`Prescription ${id} has been ${action}.`);
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Platform</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900 dark:text-slate-100">Prescription Verification</h1>
        </div>
        <div className="rounded-full bg-rose-50 border border-rose-100 px-4 py-2 flex items-center gap-2">
          <AlertTriangle size={16} className="text-rose-600" />
          <span className="text-sm font-black text-rose-800">{prescriptions.filter(p => p.priority === 'High').length} High Priority Pending</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Verification Queue */}
        <div className="grid gap-4">
          {prescriptions.map((prx) => (
            <div key={prx.id} className="soft-card rounded-2xl p-5 border-l-4 border-l-brand-blue transition hover:shadow-premium hover:-translate-y-1">
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-50 text-brand-blue">
                    <FileText size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{prx.id}</h3>
                      {prx.priority === 'High' && (
                        <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-black uppercase text-rose-700">Urgent SLA</span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400">{prx.patient}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">Uploaded {prx.date} • {prx.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-brand-blue">{prx.items}</p>
                  <p className="text-xs font-bold text-slate-400">Medicines</p>
                </div>
              </div>
              
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={() => handleAction(prx.id, 'approved')} className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-sm font-black text-white hover:bg-emerald-600 transition shadow-glow">
                  <Check size={16} /> Verify & Approve
                </button>
                <button onClick={() => handleAction(prx.id, 'rejected')} className="flex items-center justify-center gap-2 rounded-xl bg-rose-50 text-rose-700 py-2.5 text-sm font-black hover:bg-rose-100 transition">
                  <X size={16} /> Reject Rx
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pharmacist Guidelines */}
        <div className="grid gap-4">
          <div className="soft-card rounded-2xl p-6 bg-brand-navy text-white shadow-premium">
            <div className="flex items-center gap-2 mb-4">
              <Pill size={20} className="text-brand-yellow" />
              <h2 className="text-lg font-black">Verification Guidelines</h2>
            </div>
            <ul className="text-sm font-semibold text-sky-100 space-y-3 list-disc pl-4">
              <li>Verify patient name matches the prescription.</li>
              <li>Ensure the doctor's registration number is clearly visible.</li>
              <li>Check the date of prescription (must be within 6 months).</li>
              <li>Verify medicine names and dosages against order items.</li>
              <li>For Schedule H1 drugs, strict verification is mandatory.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
