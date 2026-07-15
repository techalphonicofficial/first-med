"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Flame, Search as SearchIcon, X } from "lucide-react";
import { products, categories } from "@/data/catalog";

const recentSearches = ["paracetamol", "vitamin c", "ors"];
const trendingSearches = ["Cough syrup", "Whey protein", "Face wash", "Knee support"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = query.trim() === "" ? [] : products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5); // Limit to 5 instant results

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 pb-28 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black">Search FirstMED</h1>
      </div>

      {/* Main Search Input */}
      <div className="relative mx-auto max-w-2xl">
        <div className={`flex items-center overflow-hidden rounded-full border-2 bg-white transition-all ${query ? "border-brand-blue shadow-glow" : "border-sky-100 shadow-soft focus-within:border-brand-blue focus-within:shadow-glow"}`}>
          <SearchIcon className="ml-5 text-brand-blue" size={20} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for medicines, brands, wellness..."
            className="w-full bg-transparent py-4 pl-4 pr-12 text-lg font-bold outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-5 text-slate-400 hover:text-slate-600 dark:text-white transition">
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        {query.trim() === "" ? (
          <div className="grid gap-10 sm:grid-cols-2">
            {/* Recent Searches */}
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-slate-400 dark:text-white uppercase tracking-widest">
                <Clock size={16} /> Recent searches
              </h2>
              <div className="grid gap-2">
                {recentSearches.map(term => (
                  <button key={term} onClick={() => setQuery(term)} className="flex w-full items-center justify-between rounded-xl p-3 text-left font-bold text-slate-700 dark:text-white hover:bg-sky-50 dark:bg-slate-900 transition">
                    {term}
                    <ArrowRight size={14} className="text-slate-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-slate-400 dark:text-white uppercase tracking-widest">
                <Flame size={16} className="text-amber-500" /> Trending now
              </h2>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map(term => (
                  <button key={term} onClick={() => setQuery(term)} className="rounded-full border border-sky-100 bg-white dark:bg-slate-900 dark:border-slate-800 px-4 py-2 text-sm font-bold text-slate-600 dark:text-white shadow-sm hover:border-brand-blue hover:text-brand-blue transition">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="soft-card overflow-hidden rounded-[2rem]">
            {/* Instant Results */}
            {results.length > 0 ? (
              <div>
                <div className="bg-sky-50 dark:bg-slate-900 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">
                  Products
                </div>
                <div className="grid">
                  {results.map((product) => (
                    <Link key={product.id} href={`/products/${product.slug}`} className="flex items-center gap-4 border-b border-sky-50 p-4 transition hover:bg-sky-50 dark:bg-slate-900/50 last:border-0">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm border border-sky-50">
                        {/* generic icon fallback if no img */}
                        <span className="font-black text-brand-blue">{product.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-slate-800 dark:text-white">{product.name}</p>
                        <p className="text-xs font-bold text-slate-500 dark:text-white">{product.category}</p>
                      </div>
                      <span className="font-black">Rs. {product.price}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="bg-white dark:bg-slate-900 dark:border-slate-800 p-4">
                  <Link href={`/products?q=${encodeURIComponent(query)}`} className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-50 dark:bg-slate-900 py-3 text-sm font-black text-brand-blue hover:bg-sky-100 transition">
                    View all results <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-slate-300">
                  <SearchIcon size={24} />
                </div>
                <p className="text-lg font-black text-slate-700 dark:text-white">No results found for "{query}"</p>
                <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-white">Check the spelling or try a more general term.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
