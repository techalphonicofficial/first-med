"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, LockKeyhole, Plus, ShoppingBag, Star, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Badge } from "@/components/ui/Badge";
import { QuickViewModal } from "@/components/products/QuickViewModal";
import { toast } from "sonner";

export function ProductCard({ product, view = "Grid" }) {
  const [quickOpen, setQuickOpen] = useState(false);
  const [buttonState, setButtonState] = useState("idle");
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const addToCart = useAppStore((state) => state.addToCart);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const wishlist = useAppStore((state) => state.wishlist);
  const isSaved = wishlist.some((item) => item.id === product.id);
  const gallery = product.gallery || [product.image];
  const loopImages = [...gallery, ...gallery];
  const itemWidth = `${100 / loopImages.length}%`;
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const showDiscount = discount >= 10; // only show meaningful discounts

  const isList = view === "List";

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rY = ((mouseX / width) - 0.5) * 8;
    const rX = ((mouseY / height) - 0.5) * -8;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <>
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY, scale: rotateX || rotateY ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformPerspective: 1000 }}
        className={`soft-card product-card group relative overflow-hidden rounded-[1.5rem] p-2 transition-shadow duration-300 hover:shadow-premium ${isList ? "flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center pr-4" : ""}`}
        layout
      >
        {/* Wishlist overlay button */}
        <button
          onClick={() => {
            toggleWishlist(product);
            if (isSaved) toast.success("Removed from wishlist");
            else toast.success("Added to wishlist");
          }}
          className={`absolute z-10 grid h-9 w-9 place-items-center rounded-full shadow-card transition duration-200 hover:scale-110 ${isSaved ? "bg-rose-500 text-white" : "bg-white text-slate-500 hover:text-rose-500"} ${isList ? "right-4 top-4" : "right-4 top-4"}`}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
        </button>

        <Link href={`/products/${product.slug}`} className={isList ? "flex flex-1 flex-col sm:flex-row gap-4 sm:gap-6 w-full" : "block"}>
          {/* Image container */}
          <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-sky-50 to-emerald-50 ${isList ? "aspect-square w-full sm:w-40 shrink-0" : "aspect-[1.05]"}`}>
            <div className="product-image-track absolute inset-0 flex">
              {loopImages.map((image, index) => (
                <div key={`${product.id}-${image}-${index}`} className="relative h-full shrink-0" style={{ width: itemWidth }}>
                  <Image src={image} alt={index === 0 ? product.imageAlt || product.name : ""} fill sizes="(min-width: 900px) 14vw, 45vw" className="object-contain p-4" />
                </div>
              ))}
            </div>

            {/* Badges */}
            {product.rxRequired && (
              <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-slate-950/88 px-2 py-1 text-[10px] font-black text-white">
                <LockKeyhole size={11} /> Rx
              </span>
            )}
            {showDiscount && (
              <span className="absolute right-10 top-2 rounded-full bg-brand-yellow px-2 py-1 text-[10px] font-black text-brand-blue">
                {discount}% off
              </span>
            )}
            {!product.inStock && (
              <span className="absolute inset-x-3 bottom-3 rounded-xl bg-white/92 px-3 py-2 text-center text-xs font-black text-rose-600 shadow-card">
                Currently unavailable
              </span>
            )}
          </div>

          {/* Product info */}
          <div className={`px-1 pt-3 ${isList ? "flex flex-1 flex-col justify-center sm:pt-0" : ""}`}>
            <div className={isList ? "pr-12" : ""}>
              <p className={`text-sm font-black text-slate-900 ${isList ? "text-lg line-clamp-1" : "line-clamp-2 min-h-10 leading-5"}`}>{product.name}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">{product.brand}</p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="flex items-center gap-1 text-xs font-black text-amber-500">
                  <Star size={12} fill="currentColor" /> {product.rating}
                </span>
                <span className="text-slate-300">·</span>
                <Badge className="px-2 py-0.5 text-[10px]">{product.packSize}</Badge>
              </div>
            </div>
            
            <div className={`mt-2 flex items-end gap-2 ${isList ? "mt-4" : ""}`}>
              <span className={`${isList ? "text-xl" : "text-sm"} font-black text-slate-950`}>Rs. {product.price}</span>
              <span className="text-xs font-bold text-slate-500 line-through mb-0.5">Rs. {product.mrp}</span>
            </div>
          </div>
        </Link>

        {/* Actions */}
        <div className={`mt-3 grid gap-2 ${isList ? "mt-0 w-full shrink-0 sm:w-40 sm:self-center" : ""}`}>
          <button
            onClick={(event) => {
              if (buttonState !== "idle") return;
              setButtonState("loading");
              
              const rect = event.currentTarget.getBoundingClientRect();
              
              setTimeout(() => {
                const result = addToCart(product);
                if (!result.blocked && typeof window !== "undefined") {
                  setButtonState("success");
                  toast.success(`${product.name} added to cart`);
                  window.dispatchEvent(new CustomEvent("firstmed:cart-fly", {
                    detail: {
                      id: product.id,
                      name: product.name,
                      image: product.image,
                      origin: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
                    }
                  }));
                  setTimeout(() => setButtonState("idle"), 1500);
                } else {
                  setButtonState("idle");
                }
              }, 400); // Simulated delay for premium feel
            }}
            disabled={!product.inStock}
            className={`focus-ring flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-3 py-2.5 text-sm font-black leading-tight text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#066CAB] hover:shadow-glow disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 active:scale-95 ${isList ? "min-h-12" : "min-h-11 w-full"} ${buttonState !== "idle" ? "pointer-events-none" : ""}`}
          >
            <AnimatePresence mode="wait">
              {buttonState === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2">
                  <Plus size={16} /> <span>{product.inStock ? "Add to cart" : "Out of stock"}</span>
                </motion.div>
              )}
              {buttonState === "loading" && (
                <motion.div key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                  <Loader2 size={16} className="animate-spin" />
                </motion.div>
              )}
              {buttonState === "success" && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2">
                  <Check size={16} /> <span>Added</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={() => setQuickOpen(true)}
            className={`focus-ring flex items-center justify-center gap-2 rounded-xl bg-sky-50 px-3 py-2 text-xs font-black text-brand-blue transition hover:bg-sky-100 active:scale-95 ${isList ? "min-h-10" : "min-h-10 w-full"}`}
          >
            <ShoppingBag size={14} /> Quick view
          </button>
        </div>
      </motion.article>

      <QuickViewModal product={product} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}
