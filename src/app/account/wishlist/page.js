"use client";

import { ProductShelf } from "@/components/products/ProductShelf";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAppStore } from "@/store/useAppStore";
import { ShoppingCart } from "lucide-react";

export default function WishlistPage() {
  const wishlist = useAppStore((state) => state.wishlist);
  const addToCart = useAppStore((state) => state.addToCart);

  function addAllToCart() {
    wishlist.forEach((item) => addToCart(item, 1));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 pb-28 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-blue">Account</p>
          <h1 className="mt-1 flex items-center gap-3 text-4xl font-black">
            Saved items
            <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-100 text-lg font-black text-brand-blue">{wishlist.length}</span>
          </h1>
        </div>
        {wishlist.length > 0 && (
          <button onClick={addAllToCart} className="flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition">
            <ShoppingCart size={16} /> Move all to cart
          </button>
        )}
      </div>

      <div className="mt-7">
        {wishlist.length ? (
          <ProductShelf products={wishlist} />
        ) : (
          <div className="rounded-[2rem] bg-sky-50/50 p-6 md:p-12">
            <EmptyState 
              title="Your wishlist is empty" 
              text="Save medicines and wellness products to compare later or move them into your cart." 
              actionLabel="Browse products" 
              actionHref="/products/" 
              tips={["Price drops", "Quick reorder", "Compare later"]} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
