"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Navigation, RefreshCw } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { orders as demoOrders } from "@/data/catalog";
import { EmptyState } from "@/components/ui/EmptyState";

export default function OrdersPage() {
  const storeOrders = useAppStore((state) => state.orders);
  
  // Transform mock orders to have rich product images for the UI
  const allOrders = [...storeOrders, ...demoOrders].map(order => ({
    ...order,
    images: ["/product-images/paracetamol-tablets.svg", "/product-images/vitamin-c-tablets.svg"].slice(0, Math.floor(Math.random() * 2) + 1),
    date: "19 Jun 2026",
    itemCount: Math.floor(Math.random() * 3) + 1
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 pb-28 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest text-brand-blue">Account</p>
        <h1 className="mt-1 text-4xl font-black">Order history</h1>
      </div>

      <div className="grid gap-6">
        {allOrders.length ? allOrders.map((order) => {
          const isActive = order.status !== "Delivered";
          
          return (
            <div key={order.id} className="soft-card overflow-hidden rounded-[2rem] transition hover:shadow-premium">
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sky-50 bg-sky-50/30 px-6 py-4 sm:px-8">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400">Order placed</p>
                    <p className="font-black text-slate-700">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400">Total</p>
                    <p className="font-black text-slate-700">Rs. {order.total}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400">Order #</p>
                    <p className="font-black text-slate-700">{order.id}</p>
                  </div>
                </div>
                <Link href={`/account/orders/${order.id}`} className="text-sm font-black text-brand-blue hover:underline">
                  View invoice <ArrowRight size={14} className="inline" />
                </Link>
              </div>

              {/* Order Body */}
              <div className="px-6 py-6 sm:px-8">
                <div className="flex flex-wrap items-start justify-between gap-6 lg:flex-nowrap">
                  
                  {/* Status & Timeline */}
                  <div className="w-full lg:w-1/2">
                    <h2 className="text-lg font-black">{isActive ? "Arriving today" : "Delivered"}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {isActive ? `Expected delivery: ${order.eta}` : "Your package was delivered."}
                    </p>
                    
                    {/* Inline timeline */}
                    <div className="mt-6 flex w-full max-w-sm items-center justify-between relative">
                      <div className="absolute left-0 right-0 top-3 h-1 bg-sky-50 -z-10" />
                      <div className="absolute left-0 top-3 h-1 bg-brand-blue -z-10" style={{ width: isActive ? "66%" : "100%" }} />
                      
                      {[
                        { label: "Placed", done: true },
                        { label: "Packed", done: true },
                        { label: "Out for delivery", done: isActive },
                        { label: "Delivered", done: !isActive }
                      ].map((step, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <div className={`grid h-6 w-6 place-items-center rounded-full border-2 border-white ${step.done ? "bg-brand-blue" : "bg-sky-100"}`} />
                          <span className={`text-[10px] font-black ${step.done ? "text-brand-blue" : "text-slate-400"}`}>{step.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Products & Actions */}
                  <div className="flex w-full flex-col gap-4 lg:w-[auto] lg:min-w-[300px]">
                    <div className="flex -space-x-3">
                      {order.images.map((img, i) => (
                        <div key={i} className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-white bg-sky-50 p-2 shadow-sm">
                          <Image src={img} alt="Product" width={40} height={40} className="object-contain mix-blend-multiply" />
                        </div>
                      ))}
                      {order.itemCount > order.images.length && (
                        <div className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-white bg-sky-100 text-xs font-black text-brand-blue shadow-sm">
                          +{order.itemCount - order.images.length}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      {isActive ? (
                        <Link href={`/track/${order.id}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-blue py-2.5 text-sm font-black text-white shadow-glow hover:bg-[#066CAB] transition">
                          <Navigation size={16} /> Track order
                        </Link>
                      ) : (
                        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-50 py-2.5 text-sm font-black text-brand-blue hover:bg-sky-100 transition">
                          <RefreshCw size={16} /> Reorder
                        </button>
                      )}
                      <Link href={`/account/orders/${order.id}`} className="flex items-center justify-center rounded-xl bg-slate-50 px-4 text-slate-500 hover:bg-slate-100 transition">
                        <Box size={18} />
                      </Link>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          );
        }) : (
          <EmptyState title="No orders yet" text="Your completed and active orders will appear here after checkout." actionLabel="Browse products" actionHref="/products/" />
        )}
      </div>
    </div>
  );
}
