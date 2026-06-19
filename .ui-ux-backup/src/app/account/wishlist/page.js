"use client";

import { ProductShelf } from "@/components/products/ProductShelf";
import { useAppStore } from "@/store/useAppStore";

export default function WishlistPage() {
  const wishlist = useAppStore((state) => state.wishlist);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black">Wishlist</h1>
      <div className="mt-7">{wishlist.length ? <ProductShelf products={wishlist} /> : <p className="rounded-2xl bg-white p-8 font-bold text-slate-500 shadow-card">Saved products appear here.</p>}</div>
    </div>
  );
}
