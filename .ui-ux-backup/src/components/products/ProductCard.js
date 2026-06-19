"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, LockKeyhole, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Badge } from "@/components/ui/Badge";
import { QuickViewModal } from "@/components/products/QuickViewModal";

export function ProductCard({ product }) {
  const [quickOpen, setQuickOpen] = useState(false);
  const addToCart = useAppStore((state) => state.addToCart);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const wishlist = useAppStore((state) => state.wishlist);
  const isSaved = wishlist.some((item) => item.id === product.id);
  const gallery = product.gallery || [product.image];
  const loopImages = [...gallery, ...gallery];
  const itemWidth = `${100 / loopImages.length}%`;
  const discount = Math.max(5, Math.round(((product.mrp - product.price) / product.mrp) * 100));

  return (
    <>
    <motion.article
      whileHover={{ y: -6 }}
      className="soft-card product-card group overflow-hidden rounded-[1.5rem] p-2 transition hover:shadow-premium"
      layout
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[1.05] overflow-hidden rounded-xl bg-gradient-to-br from-sky-50 to-emerald-50">
          <div className="product-image-track absolute inset-0 flex">
            {loopImages.map((image, index) => (
              <div key={`${product.id}-${image}-${index}`} className="relative h-full shrink-0" style={{ width: itemWidth }}>
                <Image src={image} alt={index === 0 ? product.imageAlt || product.name : ""} fill sizes="(min-width: 900px) 14vw, 45vw" className="object-contain p-4" />
              </div>
            ))}
          </div>
          {product.rxRequired && <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-slate-950/88 px-2 py-1 text-[10px] font-black text-white"><LockKeyhole size={11} /> Rx</span>}
          <span className="absolute right-2 top-2 rounded-full bg-brand-yellow px-2 py-1 text-[10px] font-black text-brand-blue">{discount}% off</span>
        </div>
        <div className="px-1 pt-3">
          <p className="line-clamp-2 min-h-10 text-sm font-black leading-5 text-slate-900">{product.name}</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">{product.brand} | {product.delivery}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge variant={product.inStock ? "green" : "red"} className="px-2 py-0.5 text-[10px]">{product.inStock ? "In stock" : "Sold out"}</Badge>
            <Badge className="px-2 py-0.5 text-[10px]">{product.packSize}</Badge>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs font-black text-amber-500"><Star size={13} fill="currentColor" /> {product.rating}</div>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-sm font-black text-slate-950">Rs. {product.price}</span>
            <span className="text-xs font-bold text-slate-400 line-through">Rs. {product.mrp}</span>
          </div>
        </div>
      </Link>
      <div className="mt-3 grid gap-2">
        <button
          onClick={(event) => {
            const result = addToCart(product);
            if (!result.blocked && typeof window !== "undefined") {
              const rect = event.currentTarget.getBoundingClientRect();
              window.dispatchEvent(new CustomEvent("firstmed:cart-fly", {
                detail: {
                  id: product.id,
                  name: product.name,
                  image: product.image,
                  origin: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
                }
              }));
            }
          }}
          className="focus-ring flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-3 py-3 text-sm font-black leading-tight text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#066CAB]"
        >
          <Plus size={16} />
          <span>Add to cart</span>
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setQuickOpen(true)} className="focus-ring min-h-11 min-w-0 rounded-xl bg-sky-50 px-3 py-2 text-xs font-black text-brand-blue">View</button>
          <button onClick={() => toggleWishlist(product)} className={`focus-ring flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-black leading-tight ${isSaved ? "bg-rose-50 text-rose-600" : "bg-sky-50 text-brand-blue"}`} aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}>
            <Heart size={17} fill={isSaved ? "currentColor" : "none"} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </motion.article>
    <QuickViewModal product={product} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}
