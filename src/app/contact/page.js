"use client";

import { CheckCircle2, Clock, Mail, MessageSquare, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/useAppStore";

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const pushToast = useAppStore((state) => state.pushToast);

  function onSubmit(data) {
    setSubmitted(true);
    pushToast({ type: "success", title: "Message sent", text: "We will get back to you within 2 hours." });
  }

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-brand-blue">
          Support
        </span>
        <h1 className="mt-4 text-4xl font-black md:text-5xl">Contact our team</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-slate-500">
          Reach FirstMED support for order help, prescription review questions, delivery updates and vendor onboarding.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        {/* Left: Contact Channels & FAQ Accordion */}
        <div className="grid gap-8">
          {/* Channels Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Phone, title: "Call us", desc: "Mon-Sat, 9am - 8pm", action: "+91 98765 43210", bg: "bg-brand-blue text-white", iconBg: "bg-white/20" },
              { icon: Mail,  title: "Email",   desc: "Replies within 2 hours", action: "support@firstmed.in", bg: "bg-sky-50 text-brand-blue", iconBg: "bg-white" },
              { icon: MessageSquare, title: "WhatsApp", desc: "Instant chat support", action: "Chat with us", bg: "bg-emerald-50 text-emerald-700", iconBg: "bg-white" },
            ].map(({ icon: Icon, title, desc, action, bg, iconBg }) => (
              <div key={title} className={`rounded-2xl p-6 ${bg} ${title === "Call us" ? "sm:col-span-2" : ""}`}>
                <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl ${iconBg}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-1 text-sm font-semibold opacity-80">{desc}</p>
                <p className="mt-4 font-black">{action}</p>
              </div>
            ))}
          </div>

          {/* Quick FAQ Accordion */}
          <div className="rounded-[1.5rem] bg-white p-6 shadow-card">
            <h2 className="mb-4 text-xl font-black">Support topics</h2>
            <div className="grid gap-3">
              {[
                { q: "Order support", a: "Use your order ID for delivery delays, missing items, invoice questions or return eligibility checks." },
                { q: "Prescription review", a: "Keep the patient name, doctor details, issue date and uploaded file ready when asking about Rx verification." },
                { q: "Vendor onboarding", a: "Pharmacies can prepare license files, service area, hours and inventory details before profile review." },
              ].map(({ q, a }) => (
                <details key={q} className="group rounded-xl bg-slate-50 p-4 open:bg-sky-50">
                  <summary className="cursor-pointer font-black text-slate-800 dark:text-slate-200 group-open:text-brand-blue">
                    {q}
                  </summary>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-400">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="soft-card h-fit rounded-[2rem] p-6 sm:p-10">
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm font-bold text-brand-blue">
            <Clock size={18} /> We respond to all queries within 2 hours during business operations.
          </div>
          
          {submitted ? (
            <div className="rounded-2xl bg-emerald-50 p-10 text-center text-emerald-700">
              <CheckCircle2 size={48} className="mx-auto mb-4" />
              <h2 className="text-2xl font-black">Message Sent!</h2>
              <p className="mt-2 font-semibold">Our support team will review your request and get back to you shortly.</p>
              <Button onClick={() => setSubmitted(false)} className="mt-6 bg-white text-emerald-700 shadow-sm hover:bg-emerald-100">Send another</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-black">
                  Full name
                  <input {...register("name", { required: "Name is required" })} className={`rounded-xl border bg-slate-50 px-4 py-3 font-semibold ${errors.name ? "border-rose-300" : "border-slate-200"}`} placeholder="John Doe" />
                </label>
                <label className="grid gap-2 text-sm font-black">
                  Email address
                  <input {...register("email", { required: "Email is required" })} className={`rounded-xl border bg-slate-50 px-4 py-3 font-semibold ${errors.email ? "border-rose-300" : "border-slate-200"}`} placeholder="john@example.com" />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-black">
                Subject (Optional Order ID)
                <input {...register("subject")} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold" placeholder="e.g. Missing item in FM-3041" />
              </label>
              <label className="grid gap-2 text-sm font-black">
                Message
                <textarea {...register("message", { required: "Message is required" })} className={`h-32 resize-none rounded-xl border bg-slate-50 px-4 py-3 font-semibold ${errors.message ? "border-rose-300" : "border-slate-200"}`} placeholder="How can we help you?" />
                {errors.message && <span className="text-xs font-bold text-rose-500">{errors.message.message}</span>}
              </label>
              <Button type="submit" className="mt-2 w-full text-base"><Send size={18} /> Send message</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
