"use client";

import { Download, CheckSquare, ScanLine } from "lucide-react";
import { toast } from "sonner";

const mockInbound = [
  { id: "RCV-8801", vendor: "Apollo Pharma", items: 4500, eta: "Arrived", status: "Ready to Scan" },
  { id: "RCV-8802", vendor: "HealthKart Dist", items: 1200, eta: "Today 4:00 PM", status: "Scheduled" },
];

export default function WarehouseReceivingPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Warehouse Operations</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900 dark:text-white">Inbound Receiving</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        <div className="grid gap-4">
          {mockInbound.map((rcv) => (
            <div key={rcv.id} className="soft-card rounded-2xl p-6 transition hover:shadow-premium hover:-translate-y-1">
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${rcv.status === 'Ready to Scan' ? 'bg-amber-50 text-amber-600' : 'bg-sky-50 text-brand-blue'}`}>
                    <Download size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">{rcv.id}</h3>
                    <p className="text-sm font-bold text-slate-600 dark:text-white">{rcv.vendor}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-white">ETA: {rcv.eta}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-brand-blue">{rcv.items}</p>
                  <p className="text-xs font-bold text-slate-400 dark:text-white">Expected Units</p>
                </div>
              </div>
              
              <div className="mt-5 grid grid-cols-2 gap-3">
                {rcv.status === 'Ready to Scan' ? (
                  <>
                    <button onClick={(e) => { e.preventDefault(); toast.info('Initializing barcode scanner...'); }} className="flex items-center justify-center gap-2 rounded-xl bg-brand-blue py-2.5 text-sm font-black text-white hover:bg-[#066CAB] transition shadow-glow">
                      <ScanLine size={16} /> Begin Scanning
                    </button>
                    <button onClick={(e) => { e.preventDefault(); toast.info('Opening inbound manifest...'); }} className="flex items-center justify-center gap-2 rounded-xl bg-sky-50 dark:bg-slate-900 text-brand-blue py-2.5 text-sm font-black hover:bg-sky-100 transition">
                      View Manifest
                    </button>
                  </>
                ) : (
                  <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-slate-100 text-slate-500 dark:text-white py-2.5 text-sm font-black" disabled>
                    Waiting for Arrival
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="soft-card rounded-2xl p-6 h-fit sticky top-24">
          <div className="flex items-center gap-2 mb-4">
            <CheckSquare size={20} className="text-brand-blue" />
            <h2 className="text-lg font-black">Receiving Protocol</h2>
          </div>
          <ul className="text-sm font-semibold text-slate-600 dark:text-white space-y-3 list-disc pl-4">
            <li>Verify physical seal on delivery vehicle.</li>
            <li>Scan each box barcode against the manifest.</li>
            <li>Log any damages immediately in the Audit tab.</li>
            <li>Print internal routing labels after validation.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
