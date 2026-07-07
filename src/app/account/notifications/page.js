"use client";

import { Bell, CheckCircle2, Clock3, PackageCheck, ShieldCheck, Truck } from "lucide-react";

const notifications = [
  { title: "Order FM-3041 is out for delivery", text: "Your delivery partner is on the way.", time: "4 min ago", icon: Truck, tone: "blue", unread: true },
  { title: "Prescription verified", text: "Rx checkout is available for approved medicines.", time: "1 hr ago", icon: ShieldCheck, tone: "green", unread: true },
  { title: "Invoice ready", text: "Invoice INV-FM-3038 is ready to download.", time: "Yesterday", icon: PackageCheck, tone: "blue", unread: false },
  { title: "Subscription reminder", text: "Your next monthly medicine delivery is scheduled soon.", time: "2 days ago", icon: Clock3, tone: "amber", unread: false }
];

const preferences = ["Order updates", "Prescription alerts", "Subscription reminders", "Membership rewards", "Offers and coupons"];

const toneClasses = {
  blue: "bg-sky-50 text-brand-blue",
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700"
};

export default function CustomerNotificationsPage() {
  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Account</p>
          <h1 className="mt-1 text-4xl font-black">Notifications</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
            Track order, prescription, subscription, invoice, and membership updates in one place.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow">
          <CheckCircle2 size={16} /> Mark all read
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-4">
          {notifications.map(({ title, text, time, icon: Icon, tone, unread }) => (
            <div key={title} className={`soft-card rounded-[1.5rem] p-5 transition hover:-translate-y-0.5 hover:shadow-premium ${unread ? "ring-2 ring-brand-blue/15" : ""}`}>
              <div className="flex gap-4">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${toneClasses[tone]}`}>
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h2 className="font-black text-slate-900">{title}</h2>
                    <span className="text-xs font-bold text-slate-400">{time}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{text}</p>
                  {unread ? <span className="mt-3 inline-flex rounded-full bg-brand-softBlue px-3 py-1 text-xs font-black text-brand-blue">Unread</span> : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="soft-card h-fit rounded-[2rem] p-5">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-brand-blue" />
            <h2 className="text-lg font-black">Preferences</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {preferences.map((item, index) => (
              <label key={item} className="flex items-center justify-between rounded-2xl bg-sky-50 px-4 py-3 text-sm font-black text-slate-700">
                {item}
                <input type="checkbox" defaultChecked={index < 3} className="h-4 w-4 accent-brand-blue" />
              </label>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
