"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/catalog";

export function GlobalSearch({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const q = query.toLowerCase();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      ).slice(0, 5);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-20 sm:px-6 md:pt-32"
        >
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-premium"
          >
            <div className="flex items-center border-b border-sky-100 p-4">
              <Search className="mr-3 text-brand-blue" size={20} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search medicines, health products, categories..."
                className="flex-1 bg-transparent text-lg font-semibold text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="ml-3 rounded-full bg-sky-50 p-2 text-brand-blue transition hover:bg-sky-100"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {query.trim().length === 0 ? (
                <div className="py-8 text-center text-slate-500">
                  <p className="font-semibold text-brand-dark dark:text-white">Popular searches</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {["Paracetamol", "Vitamin C", "Hair Care", "Protinex"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="rounded-full bg-sky-50 px-4 py-1.5 text-sm font-bold text-brand-blue hover:bg-sky-100 transition"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="grid gap-2">
                  <p className="px-2 text-xs font-black uppercase tracking-wider text-slate-400">Products</p>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-sky-50"
                    >
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white shadow-sm border border-sky-50 p-1">
                        <Image src={product.image} alt={product.name} width={40} height={40} className="object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-brand-dark dark:text-white">{product.name}</p>
                        <p className="text-xs font-semibold text-slate-500">{product.category}</p>
                      </div>
                      <div className="flex items-center gap-3 pr-2">
                        <span className="font-black">Rs. {product.price}</span>
                        <ArrowRight size={16} className="text-brand-blue" />
                      </div>
                    </Link>
                  ))}
                  <Link
                    href={`/products?search=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="mt-2 block rounded-xl bg-sky-50 py-3 text-center text-sm font-black text-brand-blue hover:bg-sky-100 transition"
                  >
                    See all results for "{query}"
                  </Link>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-lg font-black text-slate-700 dark:text-slate-300">No results found</p>
                  <p className="mt-2 text-sm text-slate-500">Try checking for spelling mistakes.</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
