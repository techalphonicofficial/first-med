"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, LockKeyhole, ShoppingBag, X } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function QuickViewModal({ product, open, onClose }) {
  const addToCart = useAppStore((state) => state.addToCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!product) return null;
  const discount = Math.max(5, Math.round(((product.mrp - product.price) / product.mrp) * 100));
  
  const modalContent = (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="absolute inset-0 bg-slate-950/45 cursor-default" onClick={onClose} aria-label="Close quick view" />
          <motion.article
            initial={{ y: 28, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0, scale: 0.96 }}
            className="relative grid max-h-[calc(100dvh-32px)] w-[min(1080px,calc(100vw-32px))] overflow-auto rounded-[2rem] bg-white p-4 shadow-premium md:grid-cols-[0.95fr_1.15fr] md:p-7 lg:max-h-[calc(100dvh-48px)]"
          >
            <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white p-3 text-brand-blue shadow-card" aria-label="Close quick view"><X size={18} /></button>
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-brand-softBlue">
              <Image src={product.image} alt={product.imageAlt || product.name} fill sizes="360px" className="object-contain p-10" />
            </div>
            <div className="p-2 md:p-6">
              <div className="flex flex-wrap gap-2">
                {product.rxRequired ? <Badge variant="yellow"><LockKeyhole size={13} /> Rx required</Badge> : <Badge variant="green">OTC</Badge>}
                <Badge variant={product.inStock ? "green" : "red"}>{product.inStock ? "In stock" : "Out of stock"}</Badge>
                <Badge>{discount}% off</Badge>
              </div>
              <h2 className="mt-4 text-3xl font-black">{product.name}</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{product.usage}</p>
              <div className="mt-5 grid gap-3 rounded-2xl bg-sky-50 p-4 text-sm font-bold text-slate-600">
                <div className="flex justify-between"><span>Pack</span><span>{product.packSize}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{product.delivery}</span></div>
                <div className="flex justify-between"><span>Manufacturer</span><span>{product.manufacturer}</span></div>
              </div>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-3xl font-black">Rs. {product.price}</span>
                <span className="text-sm font-bold text-slate-400 line-through">Rs. {product.mrp}</span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button
                  onClick={() => {
                    const result = addToCart(product);
                    if (!result.blocked) onClose();
                  }}
                >
                  <ShoppingBag size={17} /> Add to cart
                </Button>
                <Button href={`/products/${product.slug}/`} className="min-w-0 bg-brand-blue text-white hover:bg-[#066CAB]" onClick={onClose}>Details</Button>
              </div>
              <button className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-blue"><Heart size={16} /> Save or compare later</button>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modalContent, document.body);
}
