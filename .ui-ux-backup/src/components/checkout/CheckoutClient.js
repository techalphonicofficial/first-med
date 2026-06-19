"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { EmptyState } from "@/components/ui/EmptyState";

const steps = ["Address", "Delivery Slot", "Payment", "Review", "Confirmation"];

export function CheckoutClient() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [order, setOrder] = useState(null);
  const cart = useAppStore((state) => state.cart);
  const prescription = useAppStore((state) => state.prescription);
  const placeOrder = useAppStore((state) => state.placeOrder);
  const pushToast = useAppStore((state) => state.pushToast);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasBlockedRx = cart.some((item) => item.rxRequired) && prescription.status !== "approved";

  function submit(values) {
    if (!cart.length) {
      pushToast({ type: "error", title: "Cart is empty", text: "Add products before checkout." });
      return;
    }
    if (hasBlockedRx) {
      pushToast({ type: "error", title: "Prescription pending", text: "Approve prescription before checking out Rx items." });
      return;
    }
    setOrder(placeOrder(values));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black">Checkout</h1>
      <div className="mt-6"><Stepper steps={steps} current={order ? 4 : 0} /></div>

      {!cart.length && !order ? (
        <div className="mt-8">
          <EmptyState title="Your cart is empty" text="Add medicines or self-care products before starting checkout." actionLabel="Browse products" actionHref="/products/" />
        </div>
      ) : null}

      {order ? (
        <div className="mt-8 rounded-2xl bg-emerald-50 p-8 shadow-card">
          <h2 className="text-3xl font-black text-emerald-700">Order confirmed</h2>
          <p className="mt-2 font-bold text-emerald-700">{order.id} | Rs. {order.total}</p>
          <Button href={`/track/${order.id}`} className="mt-6">Track order</Button>
        </div>
      ) : cart.length ? (
        <form onSubmit={handleSubmit(submit)} className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-card">
            {["Full name", "Phone", "Address line", "City", "Pincode"].map((label) => {
              const name = label.toLowerCase().replaceAll(" ", "_");
              return (
                <label key={label} className="grid gap-2 text-sm font-black">
                  {label}
                  <input aria-invalid={Boolean(errors[name])} {...register(name, { required: `${label} is required` })} className={`rounded-2xl border bg-sky-50 px-4 py-3 font-semibold outline-brand-blue ${errors[name] ? "border-rose-300" : "border-sky-100"}`} />
                  {errors[name] ? <span className="text-xs font-bold text-rose-600">{errors[name].message}</span> : null}
                </label>
              );
            })}
            <label className="grid gap-2 text-sm font-black">
              Delivery slot
              <select {...register("delivery_slot")} className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold">
                <option>Today, 6 PM - 8 PM</option>
                <option>Tomorrow, 9 AM - 11 AM</option>
                <option>Express, 90 min</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-black">
              Payment
              <select {...register("payment")} className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold">
                <option>Razorpay placeholder</option>
                <option>Stripe placeholder</option>
                <option>PayPal placeholder</option>
              </select>
            </label>
          </div>
          <aside className="h-fit rounded-2xl bg-brand-navy p-6 text-white shadow-soft">
            <h2 className="text-xl font-black">Review</h2>
            <p className="mt-3 text-sm font-bold text-slate-300">{cart.length} items ready for checkout</p>
            {hasBlockedRx ? <p className="mt-4 rounded-2xl bg-rose-500/15 p-3 text-sm font-bold text-rose-100">Rx item found. Validate prescription before placing order.</p> : null}
            <div className="mt-5 grid gap-3 text-sm font-bold text-slate-300">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between gap-3">
                  <span className="line-clamp-1">{item.name}</span>
                  <span>Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-3xl font-black">Rs. {total}</p>
            <Button type="submit" disabled={hasBlockedRx} className="mt-6 w-full bg-brand-yellow text-brand-blue hover:bg-yellow-300 disabled:opacity-50">Place order</Button>
          </aside>
        </form>
      ) : null}
    </div>
  );
}
