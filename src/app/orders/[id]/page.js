"use client";

import { use } from "react";
import Link from "next/link";
import { Package, Truck, CheckCircle2, Clock, MapPin, Search } from "lucide-react";

export default function GuestOrderDetailPage({ params }) {
  // React 19 / Next.js 15: unwrap params using React.use()
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/orders" className="text-sm font-bold text-brand-blue hover:underline mb-4 inline-block">
          &larr; Back to Order Tracking
        </Link>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Order #{orderId}</h1>
        <p className="text-slate-500 dark:text-white font-semibold mt-1">Placed on July 5, 2026</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* Order Status Tracker */}
          <div className="soft-card rounded-2xl p-6 bg-white dark:bg-slate-900 dark:border-slate-800">
            <h2 className="text-lg font-black mb-6 flex items-center gap-2">
              <Truck className="text-brand-blue" size={20} /> Delivery Status
            </h2>
            
            <div className="relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-2.5 before:w-0.5 before:bg-sky-100">
              <div className="relative">
                <div className="absolute -left-6 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white ring-4 ring-white">
                  <CheckCircle2 size={12} />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white">Order Confirmed</h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-white">July 5, 10:30 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-6 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white ring-4 ring-white">
                  <CheckCircle2 size={12} />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white">Packed</h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-white">July 5, 11:15 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-6 grid h-5 w-5 place-items-center rounded-full bg-brand-blue text-white ring-4 ring-white">
                  <Truck size={12} />
                </div>
                <h3 className="font-black text-brand-blue">Out for Delivery</h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-white">July 5, 01:45 PM • Partner: Ravi Kumar</p>
              </div>
              <div className="relative">
                <div className="absolute -left-6 grid h-5 w-5 place-items-center rounded-full bg-slate-200 text-slate-400 dark:text-white ring-4 ring-white">
                  <Package size={12} />
                </div>
                <h3 className="font-black text-slate-400 dark:text-white">Delivered</h3>
                <p className="text-xs font-semibold text-slate-400 dark:text-white">Expected by 03:00 PM</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="soft-card rounded-2xl p-6 bg-white dark:bg-slate-900 dark:border-slate-800">
            <h2 className="text-lg font-black mb-4">Items in your order</h2>
            <div className="divide-y divide-sky-50">
              <div className="flex justify-between py-4">
                <div>
                  <p className="font-black text-slate-800 dark:text-white">Paracetamol 500mg</p>
                  <p className="text-sm font-semibold text-slate-500 dark:text-white">Qty: 2</p>
                </div>
                <p className="font-black text-brand-blue">Rs. 90</p>
              </div>
              <div className="flex justify-between py-4">
                <div>
                  <p className="font-black text-slate-800 dark:text-white">Vitamin C Zinc Supplements</p>
                  <p className="text-sm font-semibold text-slate-500 dark:text-white">Qty: 1</p>
                </div>
                <p className="font-black text-brand-blue">Rs. 120</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="soft-card rounded-2xl p-6 bg-slate-50 dark:bg-slate-950 dark:border-slate-800">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-white mb-4">Payment Summary</h3>
            <div className="space-y-2 text-sm font-semibold text-slate-600 dark:text-white border-b border-slate-200 pb-4 mb-4">
              <div className="flex justify-between"><span>Subtotal</span><span>Rs. 210</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>Rs. 40</span></div>
              <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-Rs. 20</span></div>
            </div>
            <div className="flex justify-between font-black text-slate-900 dark:text-white text-lg">
              <span>Total</span>
              <span>Rs. 230</span>
            </div>
            <div className="mt-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
              Paid via UPI
            </div>
          </div>

          <div className="soft-card rounded-2xl p-6 bg-white dark:bg-slate-900 dark:border-slate-800 border border-sky-100">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-white mb-3">Delivery Address</h3>
            <p className="text-sm font-bold text-slate-800 dark:text-white mb-1 flex items-start gap-2">
              <MapPin size={16} className="text-brand-blue shrink-0 mt-0.5" />
              <span>Block C, Sector 21<br/>Noida, UP 201301</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
