"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShieldCheck, Tag, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";

export function CartClient() {
  const cart = useAppStore((state) => state.cart);
  const updateQty = useAppStore((state) => state.updateQty);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const prescription = useAppStore((state) => state.prescription);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const mrpTotal = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const savings = Math.max(0, mrpTotal - total);
  const hasRx = cart.some((item) => item.rxRequired);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const couponDiscount = couponApplied ? Math.round(total * 0.1) : 0;
  const finalTotal = total - couponDiscount;

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "FIRSTMED10") setCouponApplied(true);
  }
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black">Your Cart{cart.length > 0 && <span className="ml-3 rounded-full bg-brand-softBlue px-3 py-1 text-xl font-black text-brand-blue">{cart.length}</span>}</h1>
      {cart.length === 0 ? (
        <div className="mt-8"><EmptyState title="Your cart is ready for a care shelf" text="Add OTC products directly or validate a prescription before adding Rx medicines." actionLabel="Browse products" actionHref="/products/" secondaryLabel="Upload prescription" secondaryHref="/prescription/" tips={["Fast delivery", "Rx safety gate", "Eligible returns"]} /></div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4">
            {cart.map((item) => (
              <div key={item.id} className="group grid items-center gap-6 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-premium sm:grid-cols-[112px_minmax(0,1fr)_132px]">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50">
                  <Image src={item.image} alt={item.imageAlt || item.name} fill sizes="112px" className="object-contain p-3 transition duration-500 group-hover:scale-110" />
                </div>
                <div className="min-w-0 self-center">
                  <Link href={`/products/${item.slug}`} className="text-lg font-black text-slate-800 dark:text-slate-200 hover:text-brand-blue">{item.name}</Link>
                  <p className="mt-1 text-sm font-bold text-slate-500">Rs. {item.price} <span className="text-xs line-through text-slate-400 ml-1">Rs. {item.mrp}</span></p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.rxRequired ? <Badge variant="yellow">Rx required</Badge> : <Badge variant="green">OTC</Badge>}
                    <Badge>{item.delivery}</Badge>
                  </div>
                  <button className="mt-4 flex items-center text-xs font-black text-rose-500 transition hover:text-rose-700" onClick={() => removeFromCart(item.id)}><Trash2 className="mr-1 inline" size={14} /> Remove</button>
                </div>
                <div className="flex items-center justify-start gap-3 sm:justify-end">
                  <div className="flex items-center gap-1 rounded-full border border-sky-100 bg-sky-50 p-1">
                    <button className="grid size-8 place-items-center rounded-full bg-white text-brand-blue shadow-sm hover:bg-brand-blue hover:text-white transition" onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={14} /></button>
                    <span className="w-8 text-center text-sm font-black text-brand-dark dark:text-white">{item.quantity}</span>
                    <button className="grid size-8 place-items-center rounded-full bg-white text-brand-blue shadow-sm hover:bg-brand-blue hover:text-white transition" onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-card">
            <h2 className="text-xl font-black">Order summary</h2>

            {/* Coupon input */}
            <div className="mt-4">
              {couponApplied ? (
                <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
                  <Tag size={15} /> FIRSTMED10 applied!
                  <button onClick={() => { setCouponApplied(false); setCoupon(""); }} className="ml-auto text-xs font-black text-emerald-500 hover:underline">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-2.5 text-sm font-bold outline-brand-blue"
                  />
                  <button onClick={applyCoupon} className="rounded-2xl bg-brand-blue px-4 py-2.5 text-sm font-black text-white hover:bg-[#066CAB] transition">
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
              <Truck size={16} /> Free delivery on this cart
            </div>
            {hasRx ? (
              <div className={`mt-3 rounded-2xl p-3 text-sm font-bold ${prescription.status === "approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>
                <ShieldCheck className="mr-2 inline" size={16} /> Rx status: {prescription.status}. {prescription.status === "approved" ? "Unlocked." : "Validate before checkout."}
              </div>
            ) : null}
            <div className="mt-5 grid gap-1.5 text-sm font-bold text-slate-500">
              <div className="flex justify-between"><span>MRP total</span><span>Rs. {mrpTotal}</span></div>
              <div className="flex justify-between text-emerald-600"><span>Savings</span><span>- Rs. {savings}</span></div>
              {couponApplied && <div className="flex justify-between text-emerald-600"><span>Coupon (10%)</span><span>- Rs. {couponDiscount}</span></div>}
              <div className="flex justify-between"><span>Delivery</span><span>Free</span></div>
            </div>
            <div className="mt-4 flex justify-between border-t border-sky-100 pt-4 text-lg font-black"><span>Total</span><span>Rs. {finalTotal}</span></div>
            <Button href="/checkout/" className="mt-6 w-full">{hasRx && prescription.status !== "approved" ? "Checkout and upload Rx" : "Checkout"}</Button>
          </aside>
        </div>
      )}
    </div>
  );
}
