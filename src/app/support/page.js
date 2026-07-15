"use client";

import { Headphones, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const initialMessages = [
  { from: "FirstMED Support", text: "Hi Akash, how can we help with your order or prescription today?", side: "left" },
  { from: "You", text: "I want to confirm if my prescription was approved.", side: "right" },
  { from: "FirstMED Support", text: "Your latest prescription is approved and ready for Rx checkout.", side: "left" }
];

export default function SupportPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: "You", text: input, side: "right" }]);
    setInput("");
    toast.success("Message sent!");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 pb-28 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Support</p>
        <h1 className="mt-1 text-4xl font-black">Care support</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="soft-card overflow-hidden rounded-[2rem]">
          <div className="flex items-center gap-3 border-b border-sky-100 bg-sky-50 dark:bg-slate-900/60 px-5 py-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-blue text-white">
              <Headphones size={20} />
            </div>
            <div>
              <h2 className="font-black">FirstMED Support</h2>
              <p className="text-xs font-bold text-emerald-600">Online now</p>
            </div>
          </div>
          <div className="grid gap-4 p-5 max-h-[500px] overflow-y-auto">
            {messages.map((message, i) => (
              <div key={i} className={`flex ${message.side === "right" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm font-semibold leading-6 ${message.side === "right" ? "bg-brand-blue text-white" : "bg-sky-50 text-slate-600 dark:text-white"}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex gap-3 border-t border-sky-100 p-4">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message" 
              className="min-w-0 flex-1 rounded-full border dark:border-slate-800 border dark:border-slate-800-sky-100 bg-sky-50 dark:bg-slate-900 px-4 py-3 text-sm font-bold outline-brand-blue" 
            />
            <button type="submit" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-blue text-white shadow-glow hover:bg-[#066CAB] transition">
              <Send size={18} />
            </button>
          </form>
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
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500 dark:text-white">{text}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
