"use client";

import { Crown, Check, ArrowRight, ShieldCheck, Clock, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { useState } from "react";

export default function MembershipPage() {
  const [isMember, setIsMember] = useState(false);
  
  function joinMembership() {
    setIsMember(true);
    toast.success("Welcome to FirstMED Plus! Your benefits are now active.");
  }

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      
      {/* Hero Section */}
      <div className="relative mb-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-navy via-[#0A1A3F] to-brand-blue p-8 sm:p-12 text-white shadow-premium">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Crown size={400} className="-mr-20 -mt-20" />
        </div>
        
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_400px] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-brand-yellow border border-brand-yellow/30">
              <Crown size={14} /> FirstMED Plus
            </div>
            <h1 className="mt-6 text-5xl font-black leading-tight sm:text-6xl">Healthcare that<br/>treats you better.</h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold leading-relaxed text-sky-100">
              Upgrade to FirstMED Plus and unlock unlimited free deliveries, flat 5% extra cashback on all orders, and priority 2-hour express delivery.
            </p>
          </div>
          
          <div className="rounded-3xl bg-white dark:bg-slate-900 dark:border-slate-800/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-2">Join FirstMED Plus</h2>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-black text-brand-yellow">Rs. 999</span>
              <span className="text-sm font-bold text-sky-200 mb-1">/ year</span>
            </div>
            {isMember ? (
              <button disabled className="w-full rounded-full bg-emerald-500 px-6 py-4 text-base font-black text-white shadow-glow transition">
                ✓ You are a Plus Member
              </button>
            ) : (
              <button onClick={joinMembership} className="w-full rounded-full bg-brand-yellow px-6 py-4 text-base font-black text-brand-navy shadow-glow hover:bg-[#F9EE3F] transition hover:-translate-y-0.5">
                Become a Member Now
              </button>
            )}
            <p className="text-center text-xs font-semibold text-sky-200 mt-4">Cancel anytime. Terms & conditions apply.</p>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Why choose FirstMED Plus?</h2>
          <p className="text-slate-500 dark:text-white font-semibold mt-2">Exclusive benefits designed to save you time and money.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Truck, title: "Zero Delivery Fees", desc: "Enjoy completely free standard delivery on all orders, with no minimum cart value required." },
            { icon: Clock, title: "Priority Express", desc: "Jump the queue. Get your medicines delivered in under 2 hours in eligible cities." },
            { icon: ShieldCheck, title: "Extra 5% Cashback", desc: "Earn 5% assured cashback on every purchase, instantly credited to your FirstMED wallet." },
            { icon: HeartHandshake, title: "Dedicated Support", desc: "Get priority access to our top customer care agents with zero wait times." },
            { icon: Star, title: "Early Access", desc: "Be the first to access mega sales, exclusive discounts, and new healthcare product launches." },
            { icon: CalendarCheck, title: "Free Doctor Consult", desc: "Get one free tele-consultation every month with a certified general physician." }
          ].map((benefit, idx) => (
            <div key={idx} className="soft-card rounded-[2rem] p-8 transition hover:shadow-premium hover:-translate-y-1 group">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-sky-50 dark:bg-slate-900 text-brand-blue transition group-hover:bg-brand-blue group-hover:text-white">
                <benefit.icon size={32} />
              </div>
              <h3 className="mt-6 text-xl font-black text-slate-900 dark:text-white">{benefit.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500 dark:text-white">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mx-auto max-w-4xl soft-card overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900 dark:border-slate-800 shadow-premium">
        <div className="bg-slate-50 dark:bg-slate-950 dark:border-slate-800 px-8 py-6 border-b border-sky-50 text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">See the difference</h2>
        </div>
        <div className="p-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-slate-100">
                <th className="pb-4 font-black text-slate-400 dark:text-white">Features</th>
                <th className="pb-4 font-black text-slate-900 dark:text-white text-center">Standard User</th>
                <th className="pb-4 font-black text-brand-blue text-center flex items-center justify-center gap-1"><Crown size={18}/> Plus Member</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                ["Delivery Charges", "Rs. 40 - Rs. 80", "FREE"],
                ["Cashback on Orders", "None", "5% Assured"],
                ["Delivery Speed", "Standard (24-48 hrs)", "Express (Under 2 hrs)"],
                ["Customer Support", "Standard Queue", "Priority Access"],
                ["Doctor Consultation", "Paid", "1 Free / Month"]
              ].map((row, i) => (
                <tr key={i} className="border-b border-sky-50 last:border-0">
                  <td className="py-5 font-bold text-slate-600 dark:text-white">{row[0]}</td>
                  <td className="py-5 text-center font-semibold text-slate-400 dark:text-white">{row[1]}</td>
                  <td className="py-5 text-center font-black text-emerald-600 bg-sky-50 dark:bg-slate-900/30 rounded-lg">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Simple local mock icons for the map
function Truck(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="2" y="6" rx="2"/><path d="M18 13h3a2 2 0 0 0 2-2V9l-3-3h-2"/><path d="M12 19h1"/><circle cx="9" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>; }
function Star(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; }
function CalendarCheck(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>; }
