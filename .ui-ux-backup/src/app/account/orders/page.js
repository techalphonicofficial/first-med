"use client";

import { useAppStore } from "@/store/useAppStore";
import { orders as demoOrders } from "@/data/catalog";

export default function OrdersPage() {
  const orders = useAppStore((state) => state.orders);
  const allOrders = [...orders, ...demoOrders];
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black">Order history</h1>
      <div className="mt-7 grid gap-4">
        {allOrders.map((order) => (
          <a key={order.id} href={`/account/orders/${order.id}`} className="soft-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
            <div><h2 className="font-black">{order.id}</h2><p className="text-sm font-bold text-slate-500">{order.status}</p></div>
            <p className="text-xl font-black">Rs. {order.total}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
