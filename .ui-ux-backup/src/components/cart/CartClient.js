"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
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
  const hasRx = cart.some((item) => item.rxRequired);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black">Cart</h1>
      {cart.length === 0 ? (
        <div className="mt-8"><EmptyState title="Your cart is ready for a care shelf" text="Add OTC products directly or validate a prescription before adding Rx medicines." actionLabel="Browse products" actionHref="/products/" /></div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4">
            {cart.map((item) => (
              <div key={item.id} className="soft-card grid items-center gap-4 rounded-2xl p-4 sm:grid-cols-[108px_minmax(0,1fr)_132px]">
                <div className="relative size-24 overflow-hidden rounded-2xl bg-sky-50">
                  <Image src={item.image} alt={item.imageAlt || item.name} fill sizes="96px" className="object-contain bg-sky-50 p-3" />
                </div>
                <div className="min-w-0 self-center">
                  <Link href={`/products/${item.slug}`} className="font-black">{item.name}</Link>
                  <p className="mt-1 text-sm font-bold text-slate-500">Rs. {item.price}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.rxRequired ? <Badge variant="yellow">Rx required</Badge> : <Badge variant="green">OTC</Badge>}
                    <Badge>{item.delivery}</Badge>
                  </div>
                  <button className="mt-3 text-sm font-black text-rose-600" onClick={() => removeFromCart(item.id)}><Trash2 className="mr-1 inline" size={15} /> Remove</button>
                </div>
                <div className="flex items-center justify-start gap-2 sm:justify-end">
                  <button className="grid size-9 place-items-center rounded-full bg-sky-50 text-brand-blue" onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={16} /></button>
                  <span className="w-8 text-center font-black">{item.quantity}</span>
                  <button className="grid size-9 place-items-center rounded-full bg-sky-50 text-brand-blue" onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus size={16} /></button>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-card">
            <h2 className="text-xl font-black">Order summary</h2>
            {hasRx ? (
              <div className={`mt-4 rounded-2xl p-3 text-sm font-bold ${prescription.status === "approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>
                Prescription status: {prescription.status}. {prescription.status === "approved" ? "Rx checkout unlocked." : "Validate before checkout."}
              </div>
            ) : null}
            <div className="mt-5 flex justify-between text-sm font-bold text-slate-500"><span>Subtotal</span><span>Rs. {total}</span></div>
            <div className="mt-3 flex justify-between text-sm font-bold text-slate-500"><span>Delivery</span><span>Free</span></div>
            <div className="mt-5 flex justify-between border-t border-sky-100 pt-5 text-lg font-black"><span>Total</span><span>Rs. {total}</span></div>
            <Button href={hasRx && prescription.status !== "approved" ? "/prescription/" : "/checkout/"} className="mt-6 w-full">{hasRx && prescription.status !== "approved" ? "Validate prescription" : "Checkout"}</Button>
          </aside>
        </div>
      )}
    </div>
  );
}
