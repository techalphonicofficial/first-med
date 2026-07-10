import Image from "next/image";
import { ArrowRight, BadgeCheck, CheckCircle2, Clock3, MapPin, Pill, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      {/* Brand Hero */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-navy px-6 py-20 text-center shadow-premium sm:px-12 md:py-28 lg:px-20">
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-brand-blue/20 blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-brand-yellow/10 blur-[80px]" />
        
        <div className="relative mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-brand-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse-soft" /> About FirstMED
          </span>
          <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
            A smarter pharmacy shelf for everyday care.
          </h1>
          <p className="mt-6 text-lg font-semibold leading-8 text-slate-300 md:text-xl">
            FirstMED is a product-first pharmacy commerce experience. We combine deep catalog search with strict prescription safety checks and fast local fulfilment.
          </p>
        </div>
      </div>

      {/* Trust Stats */}
      <div className="mx-auto mt-[-40px] grid max-w-5xl gap-4 px-4 sm:grid-cols-3">
        {[
          { value: "22k+", label: "Verified products", icon: BadgeCheck, color: "text-brand-blue" },
          { value: "3",    label: "Partner pharmacies", icon: MapPin,     color: "text-amber-500" },
          { value: "90m",  label: "Avg. delivery time", icon: Clock3,     color: "text-emerald-500" }
        ].map(({ value, label, icon: Icon, color }) => (
          <div key={label} className="relative rounded-[1.5rem] bg-white p-6 text-center shadow-card transition hover:-translate-y-1 hover:shadow-premium">
            <div className={`mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 ${color}`}>
              <Icon size={24} />
            </div>
            <p className={`text-4xl font-black ${color}`}>{value}</p>
            <p className="mt-1 text-sm font-bold text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Process Flow */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-black">How it works</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-4 relative">
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-1 bg-sky-100 -z-10" />
          {[
            { step: "1", title: "Search & Add", desc: "Find OTC and Rx products easily.", icon: Pill },
            { step: "2", title: "Rx Safety Lock", desc: "Upload prescription for restricted items.", icon: ShieldCheck },
            { step: "3", title: "Pharmacy Check", desc: "Pharmacists review and approve orders.", icon: CheckCircle2 },
            { step: "4", title: "Fast Delivery", desc: "Local dispatch in under 90 minutes.", icon: Truck }
          ].map(({ step, title, desc, icon: Icon }) => (
            <div key={step} className="relative text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white shadow-soft border-4 border-sky-50">
                <Icon size={32} className="text-brand-blue" />
              </div>
              <span className="absolute top-0 right-1/2 translate-x-10 -translate-y-2 grid h-6 w-6 place-items-center rounded-full bg-brand-yellow text-xs font-black text-brand-blue">{step}</span>
              <h3 className="mt-6 text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm font-semibold text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mt-28 grid gap-8 md:grid-cols-2">
        <div className="rounded-[2rem] bg-brand-softBlue p-10">
          <ShieldCheck size={40} className="mb-6 text-brand-blue" />
          <h2 className="text-3xl font-black text-brand-dark dark:text-white">Prescription safety</h2>
          <p className="mt-4 text-base font-semibold leading-7 text-slate-600 dark:text-slate-400">
            Restricted products stay gated until the user has uploaded the required prescription information (patient, doctor, date, clinic details) and the status is approved by a registered pharmacist.
          </p>
        </div>
        <div className="rounded-[2rem] bg-emerald-50 p-10">
          <Truck size={40} className="mb-6 text-emerald-600" />
          <h2 className="text-3xl font-black text-brand-dark dark:text-white">Fast local fulfilment</h2>
          <p className="mt-4 text-base font-semibold leading-7 text-slate-600 dark:text-slate-400">
            The storefront is shaped around nearby pharmacy stock, clear delivery windows and repeatable reorder journeys. Your medicines are dispatched from the nearest verified partner.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 rounded-[2rem] bg-gradient-to-r from-[#fffef0] via-white to-[#e1fff5] p-12 text-center shadow-premium border border-white/80">
        <h2 className="text-3xl font-black">Ready to build your care kit?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/products">Shop medicines <ArrowRight size={16} /></Button>
          <Button href="/prescription" className="bg-brand-yellow text-brand-blue hover:bg-yellow-300">Upload prescription</Button>
        </div>
      </div>
    </div>
  );
}
