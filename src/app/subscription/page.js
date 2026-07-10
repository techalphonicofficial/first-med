"use client";

import { Calendar, PackageOpen, Play, Pause, XCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { useState } from "react";

const initialSubscriptions = [
  { id: "SUB-8012", name: "Monthly Diabetes Care", nextDelivery: "July 12, 2026", status: "Active", items: 4, cost: "Rs. 1,450" },
  { id: "SUB-8013", name: "Weekly Supplements", nextDelivery: "July 15, 2026", status: "Paused", items: 2, cost: "Rs. 320" },
];

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  function toggleSubscription(id) {
    setSubscriptions(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'Active' ? 'Paused' : 'Active';
        toast.success(`Subscription ${newStatus === 'Active' ? 'resumed' : 'paused'} successfully!`);
        return { ...s, status: newStatus };
      }
      return s;
    }));
  }

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="mb-8 overflow-hidden rounded-[2rem] bg-brand-navy p-7 text-white shadow-premium sm:p-9">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-yellow">Recurring Deliveries</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">My Subscriptions</h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-sky-100">
              Never run out of essential medicines again. Manage your recurring orders, pause deliveries when traveling, or skip a month effortlessly.
            </p>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-black text-slate-900 dark:text-slate-100 shadow-glow transition hover:-translate-y-0.5">
              Subscribe New Medicine
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Active Subscriptions */}
        <div className="grid gap-6">
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Current Plans</h2>
          
          <div className="grid gap-4">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="soft-card flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl p-6 transition hover:shadow-premium hover:-translate-y-1">
                <div className="flex gap-4">
                  <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${sub.status === 'Active' ? 'bg-sky-50 text-brand-blue' : 'bg-slate-100 text-slate-400'}`}>
                    <PackageOpen size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{sub.name}</h3>
                    <p className="text-sm font-bold text-slate-500 mt-1">{sub.items} medicines • {sub.cost}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${sub.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {sub.status === 'Active' ? <CheckCircle2 size={12} /> : <Pause size={12} />}
                        {sub.status}
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Calendar size={12} /> Next: {sub.nextDelivery}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                  {sub.status === 'Active' ? (
                    <button onClick={() => toggleSubscription(sub.id)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-50 text-amber-700 px-4 py-2.5 text-sm font-black hover:bg-amber-100 transition">
                      <Pause size={16} /> Pause Plan
                    </button>
                  ) : (
                    <button onClick={() => toggleSubscription(sub.id)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-50 text-emerald-700 px-4 py-2.5 text-sm font-black hover:bg-emerald-100 transition">
                      <Play size={16} /> Resume Plan
                    </button>
                  )}
                  <button onClick={(e) => { e.preventDefault(); toast.info('Opening subscription manager...'); }} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-sky-100 bg-white text-brand-blue px-4 py-2.5 text-sm font-black hover:bg-sky-50 transition shadow-sm">
                    Manage Items <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="grid gap-4 h-fit sticky top-8">
          <div className="soft-card rounded-2xl p-6">
            <h2 className="text-lg font-black mb-4 text-slate-900 dark:text-slate-100">Subscription Benefits</h2>
            <ul className="text-sm font-semibold text-slate-600 dark:text-slate-400 space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                <span><strong className="text-slate-800 dark:text-slate-200 font-bold block">15% Guaranteed Discount</strong> On all subscribed medicines.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                <span><strong className="text-slate-800 dark:text-slate-200 font-bold block">Free Shipping</strong> Delivery charges waived on recurring orders.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                <span><strong className="text-slate-800 dark:text-slate-200 font-bold block">Flexible Controls</strong> Skip a month or pause anytime with zero penalty.</span>
              </li>
            </ul>
          </div>
          
          <div className="soft-card rounded-2xl p-6 bg-slate-50 border border-slate-100">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-2">Need to cancel?</h2>
            <p className="text-xs font-semibold text-slate-400 mb-4">You can cancel your subscription permanently if you no longer require these medicines.</p>
            <button onClick={(e) => { e.preventDefault(); toast.error('Opening cancellation flow...'); }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white text-rose-600 border border-rose-100 px-4 py-2.5 text-xs font-black hover:bg-rose-50 transition">
              <XCircle size={14} /> Cancel Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
