"use client";

import { CreditCard, Plus, ShieldCheck, Smartphone } from "lucide-react";

const methods = [
  { label: "HDFC Credit Card", detail: "Ending 4482", type: "Card", icon: CreditCard, default: true },
  { label: "UPI", detail: "akash@upi", type: "UPI", icon: Smartphone, default: false }
];

export default function PaymentMethodsPage() {
  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Account</p>
          <h1 className="mt-1 text-4xl font-black">Payment methods</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
            Mock saved payment UI for checkout, membership, and recurring medicine billing.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow">
          <Plus size={16} /> Add method
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-4">
          {methods.map(({ label, detail, type, icon: Icon, default: isDefault }) => (
            <div key={label} className="soft-card rounded-[2rem] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-3xl bg-sky-50 text-brand-blue">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h2 className="font-black">{label}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{detail} - {type}</p>
                  </div>
                </div>
                {isDefault ? <span className="rounded-full bg-brand-blue px-3 py-1 text-xs font-black text-white">Default</span> : <button className="text-sm font-black text-brand-blue">Make default</button>}
              </div>
            </div>
          ))}
        </div>
        <aside className="soft-card h-fit rounded-[2rem] p-6">
          <ShieldCheck size={24} className="text-brand-blue" />
          <h2 className="mt-3 text-lg font-black">Payment safety</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            This screen demonstrates saved payment states only. Real tokenization and payment processing must happen through a payment provider.
          </p>
        </aside>
      </div>
    </div>
  );
}
