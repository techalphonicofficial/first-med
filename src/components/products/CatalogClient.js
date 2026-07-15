"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown, Grid2X2, List, Search, SlidersHorizontal, X } from "lucide-react";
import { categories, products } from "@/data/catalog";
import { ProductShelf } from "@/components/products/ProductShelf";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { Badge } from "@/components/ui/Badge";

export function CatalogClient({ initialCategory = "All", initialQuery = "", initialType = "All" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("Popular");

  // Sync category from URL to local state (when GooeyNav mega menu is clicked)
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      setCategory(urlCategory);
    } else {
      setCategory("All");
    }
  }, [searchParams]);

  // Helper to sync local state to URL (when sidebar is clicked)
  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const params = new URLSearchParams(searchParams.toString());
    if (newCat !== "All") {
      params.set("category", newCat);
    } else {
      params.delete("category");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const [view, setView] = useState("Grid");
  const [type, setType] = useState(initialType);
  const [maxPrice, setMaxPrice] = useState(1200);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 380);
    return () => window.clearTimeout(timer);
  }, [category, query, sort, type, maxPrice, inStockOnly]);

  const filtered = useMemo(() => {
    let items = products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const queryMatch = product.name.toLowerCase().includes(query.toLowerCase()) || product.category.toLowerCase().includes(query.toLowerCase());
      const typeMatch = type === "All" || (type === "OTC" && !product.rxRequired) || (type === "Prescription" && product.rxRequired);
      const priceMatch = product.price <= maxPrice;
      const stockMatch = !inStockOnly || product.inStock;
      return categoryMatch && queryMatch && typeMatch && priceMatch && stockMatch;
    });
    if (sort === "Price Low To High") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "Price High To Low") items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "Highest Rated") items = [...items].sort((a, b) => b.rating - a.rating);
    return items;
  }, [category, query, sort, type, maxPrice, inStockOnly]);

  const hasActiveFilters = query || category !== "All" || type !== "All" || inStockOnly || maxPrice < 1200;

  function clearAll() {
    setQuery(""); handleCategoryChange("All"); setType("All"); setMaxPrice(1200); setInStockOnly(false);
  }

  /* Shared filter panel UI */
  const FilterPanel = () => (
    <div className="grid gap-5">
      {/* Category */}
      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-white">Category</p>
        <div className="grid gap-1">
          {["All", ...categories].map((item) => (
            <button
              key={item}
              onClick={() => { handleCategoryChange(item); setMobileFilters(false); }}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-left transition ${category === item ? "bg-brand-blue text-white" : "hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-600 dark:text-white"}`}
            >
              {item}
              {category === item && <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-900 dark:border-slate-800" />}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-white">Type</p>
        <div className="flex flex-wrap gap-2">
          {["All", "OTC", "Prescription"].map((item) => (
            <button
              key={item}
              onClick={() => setType(item)}
              className={`rounded-full px-4 py-2 text-xs font-black transition ${type === item ? "bg-brand-blue text-white shadow-glow" : "bg-sky-50 text-brand-blue hover:bg-sky-100"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-white">Sort by</p>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm font-bold outline-brand-blue dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            {["Popular", "Latest", "Price Low To High", "Price High To Low", "Highest Rated"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-white" />
        </div>
      </div>

      {/* Price range */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-white">Max price</p>
          <span className="text-sm font-black text-brand-blue">Rs. {maxPrice}</span>
        </div>
        <input
          type="range" min="100" max="1200" step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-blue"
        />
        <div className="mt-1 flex justify-between text-[11px] font-semibold text-slate-500 dark:text-white">
          <span>Rs. 100</span><span>Rs. 1200</span>
        </div>
      </div>

      {/* In stock */}
      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm font-black text-slate-600 dark:text-white transition hover:border-brand-blue dark:border-slate-700 dark:bg-slate-900">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="size-4 accent-brand-blue"
        />
        In stock only
      </label>

      {/* Clear */}
      {hasActiveFilters && (
        <button onClick={clearAll} className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-black text-rose-600 transition hover:bg-rose-100">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">

      {/* Page header */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-white via-sky-50 to-brand-mint dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:border dark:border-slate-800 p-6 shadow-soft">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Catalogue</p>
            <h1 className="mt-2 text-4xl font-black">Focused care shelves.</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</Badge>
              {type !== "All" && <Badge variant={type === "Prescription" ? "yellow" : "green"}>{type}</Badge>}
              {category !== "All" && <Badge>{category}</Badge>}
            </div>
          </div>
          <button
            onClick={() => setMobileFilters(true)}
            className="flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-black text-white shadow-glow lg:hidden"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {/* Search bar */}
        <div className="mt-5 flex gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={17} />
            <input
              aria-label="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-sky-100 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white py-3 pl-11 pr-5 text-sm font-bold outline-brand-blue"
              placeholder="Search products, brands, categories…"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-white">
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setView(view === "Grid" ? "List" : "Grid")}
            className="hidden items-center gap-2 rounded-full border border-sky-100 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-sky-400 px-5 py-3 text-sm font-black text-brand-blue shadow-sm hover:border-brand-blue hover:bg-sky-50 dark:hover:bg-slate-900 sm:flex transition"
          >
            {view === "Grid" ? <List size={16} /> : <Grid2X2 size={16} />}
            {view === "Grid" ? "List View" : "Grid View"}
          </button>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {query && (
              <button onClick={() => setQuery("")} className="flex items-center gap-1 rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-black text-brand-blue">
                {`"${query}"`} <X size={12} />
              </button>
            )}
            {category !== "All" && (
              <button onClick={() => handleCategoryChange("All")} className="flex items-center gap-1 rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-black text-brand-blue">
                {category} <X size={12} />
              </button>
            )}
            {type !== "All" && (
              <button onClick={() => setType("All")} className="flex items-center gap-1 rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-black text-brand-blue">
                {type} <X size={12} />
              </button>
            )}
            {inStockOnly && (
              <button onClick={() => setInStockOnly(false)} className="flex items-center gap-1 rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-black text-brand-blue">
                In stock <X size={12} />
              </button>
            )}
            {maxPrice < 1200 && (
              <button onClick={() => setMaxPrice(1200)} className="flex items-center gap-1 rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-black text-brand-blue">
                Under Rs. {maxPrice} <X size={12} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Layout: sidebar + results */}
      <div className="catalog-layout">
        {/* Desktop sidebar filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl bg-white dark:bg-slate-900 dark:border dark:border-slate-800 p-5 shadow-card">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-black">Filters</h2>
              {hasActiveFilters && (
                <button onClick={clearAll} className="text-xs font-black text-rose-500 hover:underline">
                  Clear all
                </button>
              )}
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* Product grid */}
        <div>
          {loading
            ? <ProductGridSkeleton count={12} />
            : filtered.length
              ? <ProductShelf products={filtered} view={view} />
              : <EmptyState
                  title="No products found"
                  text="Try another care category, wider price range, or product type."
                  actionLabel="Reset filters"
                  actionHref="/products/"
                  secondaryLabel="Upload prescription"
                  secondaryHref="/prescription/"
                  tips={["Try OTC only", "Clear price filter", "Search by brand"]}
                />
          }
        </div>
      </div>

      {/* Mobile bottom sheet filters */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden" onClick={() => setMobileFilters(false)}>
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
          <div
            className="bottom-sheet absolute bottom-0 left-0 right-0 max-h-[85dvh] overflow-auto rounded-t-[2rem] bg-white dark:bg-slate-900 p-5 shadow-premium"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-200" />
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-xl font-black">Filters</h2>
              <button onClick={() => setMobileFilters(false)} className="rounded-full bg-sky-50 dark:bg-slate-800 p-2 text-brand-blue dark:text-sky-400" aria-label="Close filters">
                <X size={18} />
              </button>
            </div>
            <FilterPanel />
            <div className="h-8" /> {/* safe area padding */}
          </div>
        </div>
      )}
    </div>
  );
}
