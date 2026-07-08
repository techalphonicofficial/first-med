"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { products } from "@/data/catalog";

export function SearchBar({ large = false }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const suggestions = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }}
      className={`glass relative z-50 flex items-center gap-3 rounded-full p-2 shadow-soft ${large ? "mx-auto max-w-4xl" : ""}`}
    >
      <Search className="ml-3 text-brand-blue" size={20} />
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search medicines, wellness and self-care" className="min-w-0 flex-1 bg-transparent py-3 text-sm font-semibold outline-none placeholder:text-slate-400" />
      <button className="blue-button px-6" type="submit">Search</button>
      {query ? (
        <div className="absolute left-4 right-4 top-[calc(100%+10px)] z-30 rounded-2xl border border-sky-100 bg-white p-2 shadow-premium">
          {suggestions.length ? suggestions.map((product) => (
            <button key={product.id} type="button" onClick={() => router.push(`/products/${product.slug}/`)} className="flex w-full justify-between rounded-xl px-3 py-2 text-left text-sm font-bold hover:bg-sky-50">
              <span>{product.name}</span>
              <span className="text-brand-blue">View</span>
            </button>
          )) : <p className="px-3 py-2 text-sm font-bold text-slate-500">No matching products</p>}
        </div>
      ) : null}
    </form>
  );
}
