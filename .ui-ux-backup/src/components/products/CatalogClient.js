"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { categories, products } from "@/data/catalog";
import { ProductShelf } from "@/components/products/ProductShelf";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { Badge } from "@/components/ui/Badge";

export function CatalogClient({ initialCategory = "All", initialQuery = "", initialType = "All" }) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("Popular");
  const [view, setView] = useState("Grid");
  const [type, setType] = useState(initialType);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(timer);
  }, [category, query, sort, type]);
  const filtered = useMemo(() => {
    let items = products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const queryMatch = product.name.toLowerCase().includes(query.toLowerCase()) || product.category.toLowerCase().includes(query.toLowerCase());
      const typeMatch = type === "All" || (type === "OTC" && !product.rxRequired) || (type === "Prescription" && product.rxRequired);
      return categoryMatch && queryMatch && typeMatch;
    });
    if (sort === "Price Low To High") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "Price High To Low") items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "Highest Rated") items = [...items].sort((a, b) => b.rating - a.rating);
    return items;
  }, [category, query, sort, type]);
  const suggestions = useMemo(() => {
    if (!query) return products.slice(0, 5);
    return products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [query]);

  const filters = (
    <>
      <label className="grid gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
        Sort
        <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm font-bold normal-case tracking-normal">
          {["Popular", "Latest", "Price Low To High", "Price High To Low", "Highest Rated"].map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
        Type
        <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm font-bold normal-case tracking-normal">
          {["All", "OTC", "Prescription"].map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
    </>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-7 rounded-2xl bg-gradient-to-r from-white via-sky-50 to-brand-mint p-6 shadow-soft">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Catalogue</p>
            <h1 className="mt-2 text-4xl font-black">Focused care shelves.</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{filtered.length} results</Badge>
              {type !== "All" ? <Badge variant={type === "Prescription" ? "yellow" : "green"}>{type}</Badge> : null}
              {category !== "All" ? <Badge>{category}</Badge> : null}
            </div>
          </div>
          <button onClick={() => setMobileFilters(true)} className="rounded-full bg-brand-blue px-5 py-3 text-sm font-black text-white md:hidden"><Filter className="mr-2 inline" size={16} /> Filters</button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_190px_180px_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={17} />
            <input aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-full border border-sky-100 bg-white py-3 pl-11 pr-5 text-sm font-bold outline-brand-blue" placeholder="Search products" />
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 hidden rounded-2xl border border-sky-100 bg-white p-2 shadow-premium focus-within:block has-[:hover]:block">
              {suggestions.map((product) => (
                <button key={product.id} onMouseDown={() => setQuery(product.name)} className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-bold hover:bg-sky-50">
                  <span>{product.name}</span>
                  <span className="text-brand-blue">Rs. {product.price}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:contents">{filters}</div>
          <button onClick={() => setView(view === "Grid" ? "List" : "Grid")} className="rounded-full bg-brand-blue px-5 py-3 text-sm font-black text-white"><SlidersHorizontal className="mr-2 inline" size={16} /> {view}</button>
        </div>
      </div>
      <div className="no-scrollbar sticky top-20 z-20 mb-6 flex gap-2 overflow-auto rounded-full bg-white/80 p-2 shadow-card backdrop-blur-xl">
        {["All", ...categories].map((item) => (
          <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${category === item ? "bg-brand-blue text-white" : "bg-white text-slate-600 shadow-card"}`}>{item}</button>
        ))}
      </div>
      {(query || category !== "All" || type !== "All") ? (
        <div className="mb-5 flex flex-wrap gap-2">
          {query ? <button onClick={() => setQuery("")} className="rounded-full bg-sky-50 px-4 py-2 text-xs font-black text-brand-blue">Search: {query} x</button> : null}
          {category !== "All" ? <button onClick={() => setCategory("All")} className="rounded-full bg-sky-50 px-4 py-2 text-xs font-black text-brand-blue">{category} x</button> : null}
          {type !== "All" ? <button onClick={() => setType("All")} className="rounded-full bg-sky-50 px-4 py-2 text-xs font-black text-brand-blue">{type} x</button> : null}
          <button onClick={() => { setQuery(""); setCategory("All"); setType("All"); }} className="rounded-full bg-brand-blue px-4 py-2 text-xs font-black text-white">Clear all</button>
        </div>
      ) : null}
      {mobileFilters ? (
        <div className="fixed inset-0 z-[100] bg-slate-950/40 p-4 md:hidden">
          <div className="ml-auto grid max-w-sm gap-4 rounded-[1.5rem] bg-white p-5 shadow-premium">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Filters</h2>
              <button onClick={() => setMobileFilters(false)} className="rounded-full bg-sky-50 p-2 text-brand-blue" aria-label="Close filters"><X size={18} /></button>
            </div>
            {filters}
          </div>
        </div>
      ) : null}
      {loading ? <ProductGridSkeleton count={10} /> : filtered.length ? <ProductShelf products={filtered} /> : <EmptyState title="No products found" text="Try another care category, search term, or product type." actionLabel="Reset filters" actionHref="/products/" />}
    </div>
  );
}
