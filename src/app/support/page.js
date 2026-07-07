"use client";

import { Headphones, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const messages = [
  { from: "FirstMED Support", text: "Hi Akash, how can we help with your order or prescription today?", side: "left" },
  { from: "You", text: "I want to confirm if my prescription was approved.", side: "right" },
  { from: "FirstMED Support", text: "Your latest prescription is approved and ready for Rx checkout.", side: "left" }
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 pb-28 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Support</p>
        <h1 className="mt-1 text-4xl font-black">Care support</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="soft-card overflow-hidden rounded-[2rem]">
          <div className="flex items-center gap-3 border-b border-sky-100 bg-sky-50/60 px-5 py-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-blue text-white">
              <Headphones size={20} />
            </div>
            <div>
              <h2 className="font-black">FirstMED Support</h2>
              <p className="text-xs font-bold text-emerald-600">Online now</p>
            </div>
          </div>
          <div className="grid gap-4 p-5">
            {messages.map((message) => (
              <div key={message.text} className={`flex ${message.side === "right" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm font-semibold leading-6 ${message.side === "right" ? "bg-brand-blue text-white" : "bg-sky-50 text-slate-600"}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 border-t border-sky-100 p-4">
            <input placeholder="Type your message" className="min-w-0 flex-1 rounded-full border border-sky-100 bg-sky-50 px-4 py-3 text-sm font-bold outline-brand-blue" />
            <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="grid h-12 w-12 place-items-center rounded-full bg-brand-blue text-white shadow-glow">
              <Send size={18} />
            </button>
          </div>
        </div>
        <aside className="grid gap-4">
          {[
            ["Priority support", "Members receive faster response handling.", ShieldCheck],
            ["Order help", "Track, cancel, invoice, or reorder support.", MessageCircle],
            ["Prescription help", "Upload, rejection, and approval guidance.", ShieldCheck]
          ].map(([title, text, Icon]) => (
            <div key={title} className="soft-card rounded-[2rem] p-5">
              <Icon size={22} className="text-brand-blue" />
              <h3 className="mt-3 font-black">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
