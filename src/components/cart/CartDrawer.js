"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Tag, X } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export function CartDrawer() {
  const open = useAppStore((state) => state.cartDrawerOpen);
  const close = useAppStore((state) => state.closeCartDrawer);
  const cart = useAppStore((state) => state.cart);
  const updateQty = useAppStore((state) => state.updateQty);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const mrpTotal = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const savings = Math.max(0, mrpTotal - total);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "FIRSTMED10") {
      setCouponApplied(true);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[95]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="absolute inset-0 bg-slate-950/35 backdrop-blur-sm" onClick={close} aria-label="Close cart" />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
            className="absolute right-0 top-0 flex h-full w-[min(420px,100vw)] flex-col bg-white shadow-premium"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-sky-100 p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand-softBlue text-brand-blue">
                  <ShoppingCart size={20} />
                </span>
                <div>
                  <h2 className="text-xl font-black">Your Cart</h2>
                  <p className="text-sm font-bold text-slate-500">{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <button onClick={close} className="rounded-full bg-sky-50 p-2 text-brand-blue hover:bg-sky-100" aria-label="Close cart">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-auto p-5">
              {cart.length ? (
                <div className="grid gap-4">
                  {cart.map((item) => (
                    <div key={item.id} className="grid grid-cols-[72px_1fr_auto] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-card">
                      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-sky-50 to-emerald-50">
                        <Image src={item.image} alt={item.imageAlt || item.name} fill sizes="72px" className="object-contain p-2" />
                      </div>
                      <div className="min-w-0 self-start pt-1">
                        <Link onClick={close} href={`/products/${item.slug}/`} className="line-clamp-2 text-sm font-black leading-tight text-slate-800 hover:text-brand-blue">
                          {item.name}
                        </Link>
                        <div className="mt-1.5 flex items-center gap-2">
                          <p className="text-sm font-black text-brand-blue">Rs. {item.price}</p>
                          {item.rxRequired && (
                            <span className="rounded-full bg-brand-yellow/30 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-brand-blue">Rx</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 rounded-full bg-sky-50 p-1">
                        <button className="grid size-6 place-items-center rounded-full bg-white text-brand-blue shadow-sm hover:bg-brand-blue hover:text-white transition" onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Increase quantity">
                          <Plus size={12} />
                        </button>
                        <span className="text-xs font-black">{item.quantity}</span>
                        <button className="grid size-6 place-items-center rounded-full bg-white text-brand-blue shadow-sm hover:bg-brand-blue hover:text-white transition" onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                          <Minus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState title="Your cart is empty" text="Add products to see them here." actionLabel="Browse products" actionHref="/products/" />
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-sky-100 p-5">
                {/* Coupon input */}
                <div className="mb-4">
                  {couponApplied ? (
                    <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
                      <Tag size={15} /> Coupon FIRSTMED10 applied!
                      <button onClick={() => { setCouponApplied(false); setCoupon(""); }} className="ml-auto text-xs font-black text-emerald-500 hover:underline">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-2.5 text-sm font-bold outline-brand-blue"
                      />
                      <button onClick={applyCoupon} className="rounded-2xl bg-brand-blue px-4 py-2.5 text-sm font-black text-white hover:bg-[#066CAB]">
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Price summary */}
                <div className="grid gap-1.5 text-sm font-bold text-slate-500">
                  <div className="flex justify-between"><span>MRP total</span><span>Rs. {mrpTotal}</span></div>
                  <div className="flex justify-between text-emerald-600"><span>Savings</span><span>- Rs. {savings}</span></div>
                  {couponApplied && <div className="flex justify-between text-emerald-600"><span>Coupon (FIRSTMED10)</span><span>- Rs. {Math.round(total * 0.1)}</span></div>}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-sky-100 pt-3 text-lg font-black">
                  <span>Total</span>
                  <span>Rs. {couponApplied ? Math.round(total * 0.9) : total}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link href="/cart/" onClick={close} className="flex min-h-[2.65rem] items-center justify-center rounded-full border border-sky-100 bg-white px-5 py-2.5 text-sm font-black text-brand-blue shadow-card transition duration-200 hover:bg-sky-50 hover:shadow-premium active:scale-95">
                    View cart
                  </Link>
                  <Button href="/checkout/" onClick={close}>Checkout</Button>
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
