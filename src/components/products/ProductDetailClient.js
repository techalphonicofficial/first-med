"use client";

import { ChevronRight, Heart, Home, LockKeyhole, MapPin, Share2, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { ProductShelf } from "./ProductShelf";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const TABS = ["Overview", "Usage & Warnings", "Specs", "Reviews", "FAQs"];

// Star rating breakdown (static demo data)
const ratingBreakdown = [
  { stars: 5, pct: 62 },
  { stars: 4, pct: 21 },
  { stars: 3, pct: 10 },
  { stars: 2, pct: 4 },
  { stars: 1, pct: 3 },
];

export function ProductDetailClient({ product, similar }) {
  const [blocked, setBlocked] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image);
  const [pincode, setPincode] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const [wishlisted, setWishlisted] = useState(false);
  const addToCart = useAppStore((state) => state.addToCart);
  const prescription = useAppStore((state) => state.prescription);

  function handleAdd(event) {
    const result = addToCart(product);
    setBlocked(Boolean(result.blocked));
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
  }

  const gallery = product.gallery || [product.image];
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: gallery,
            description: product.description,
            brand: { "@type": "Brand", name: product.brand },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: 24
            }
          })
        }}
      />

      {/* Breadcrumb */}
      <nav className="breadcrumb mb-6" aria-label="Breadcrumb">
        <Link href="/" className="flex items-center gap-1 transition hover:text-brand-blue">
          <Home size={13} /> Home
        </Link>
        <ChevronRight size={13} className="text-slate-300" />
        <Link href="/products" className="transition hover:text-brand-blue">Products</Link>
        <ChevronRight size={13} className="text-slate-300" />
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="transition hover:text-brand-blue">
          {product.category}
        </Link>
        <ChevronRight size={13} className="text-slate-300" />
        <span className="line-clamp-1 text-slate-700">{product.name}</span>
      </nav>

      {/* Main grid */}
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">

        {/* Left — Gallery */}
        <div className="flex gap-3">
          {/* Vertical thumbnail strip */}
          <div className="hidden flex-col gap-2 md:flex">
            {gallery.map((image, i) => (
              <button
                key={image}
                onClick={() => setActiveImage(image)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition hover:-translate-y-0.5 ${activeImage === image ? "border-brand-blue shadow-glow" : "border-sky-100 shadow-sm"}`}
                aria-label={`Show image ${i + 1}`}
              >
                <Image src={image} alt="" fill sizes="64px" className="object-contain p-2" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1">
            <div className="soft-card relative aspect-square overflow-hidden rounded-2xl bg-sky-50">
              <Image
                src={activeImage}
                alt={product.imageAlt || product.name}
                fill
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-contain p-10 transition duration-300"
                priority
              />
              {discount >= 10 && (
                <span className="absolute left-3 top-3 rounded-full bg-brand-yellow px-3 py-1 text-xs font-black text-brand-blue shadow-card">
                  {discount}% off
                </span>
              )}
            </div>

            {/* Mobile thumbnails */}
            <div className="mt-3 flex gap-2 overflow-auto no-scrollbar md:hidden">
              {gallery.map((image, i) => (
                <button
                  key={image}
                  onClick={() => setActiveImage(image)}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 bg-white ${activeImage === image ? "border-brand-blue" : "border-sky-100"}`}
                >
                  <Image src={image} alt="" fill sizes="56px" className="object-contain p-1.5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Info */}
        <section>
          <p className="text-sm font-black text-brand-blue">{product.category}</p>
          <h1 className="mt-2 text-3xl font-black leading-tight lg:text-4xl">{product.name}</h1>

          {/* Rating row */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-bold text-slate-600">
            <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-amber-600">
              <Star size={14} fill="currentColor" /> {product.rating}
              <span className="text-amber-400 font-semibold">(24 reviews)</span>
            </span>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-brand-blue">{product.brand}</span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-600">
              <Truck size={13} /> {product.delivery}
            </span>
          </div>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={product.inStock ? "green" : "red"}>{product.inStock ? "In stock" : "Out of stock"}</Badge>
            {product.rxRequired
              ? <Badge variant="yellow"><LockKeyhole size={13} /> Prescription required</Badge>
              : <Badge variant="green">OTC checkout</Badge>
            }
            <Badge>Authentic product</Badge>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">{product.description}</p>

          {/* Pack + Manufacturer info */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-sky-50 p-4 text-sm">
              <p className="font-black text-brand-dark">Pack size</p>
              <p className="mt-1 font-semibold text-slate-600">{product.packSize}</p>
            </div>
            <div className="rounded-2xl bg-sky-50 p-4 text-sm">
              <p className="font-black text-brand-dark">Manufacturer</p>
              <p className="mt-1 font-semibold text-slate-600">{product.manufacturer}</p>
            </div>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-black">Rs. {product.price}</span>
            <span className="text-lg font-bold text-slate-400 line-through">Rs. {product.mrp}</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              Save Rs. {product.mrp - product.price}
            </span>
          </div>

          {/* Delivery check */}
          <div className="mt-6 grid gap-3 rounded-2xl bg-sky-50 p-4 sm:grid-cols-[1fr_auto]">
            <label className="grid gap-2 text-sm font-black">
              Check delivery availability
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={17} />
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter pincode"
                  className="w-full rounded-2xl border border-sky-100 bg-white py-3 pl-11 pr-4 font-semibold outline-brand-blue"
                />
              </div>
            </label>
            <div className="flex items-center gap-2 rounded-2xl bg-white p-4 text-sm font-bold text-slate-600">
              <Truck className="text-brand-blue" size={17} />
              {pincode.length === 6 ? `${product.delivery} delivery available` : "Enter 6 digits for ETA"}
            </div>
          </div>

          {/* Rx warning */}
          {product.rxRequired && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800">
              <LockKeyhole className="mr-2 inline" size={17} /> Prescription required. Status: {prescription.status}.
            </div>
          )}
          {blocked && (
            <div className="mt-3 rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-700">
              Upload and approve a prescription before adding this medicine.
            </div>
          )}

          {/* CTA actions — desktop */}
          <div className="mt-7 hidden flex-wrap gap-3 sm:flex">
            <Button onClick={handleAdd} disabled={!product.inStock} id="pdp-add-cart-btn">
              <ShoppingBag size={17} /> {product.inStock ? "Add to cart" : "Out of stock"}
            </Button>
            <Button
              href={product.inStock ? "/checkout" : "/products/"}
              className="bg-brand-yellow text-brand-blue hover:bg-yellow-300"
            >
              {product.inStock ? "Buy now" : "Find alternatives"}
            </Button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`flex items-center gap-2 rounded-full px-5 py-3 font-black transition ${wishlisted ? "bg-rose-50 text-rose-500" : "bg-sky-50 text-brand-blue hover:bg-sky-100"}`}
            >
              <Heart size={17} fill={wishlisted ? "currentColor" : "none"} />
              {wishlisted ? "Saved" : "Wishlist"}
            </button>
            <button className="flex items-center gap-2 rounded-full bg-sky-50 px-5 py-3 font-black text-brand-blue hover:bg-sky-100">
              <Share2 size={17} /> Share
            </button>
          </div>
        </section>
      </div>

      {/* Tabbed info section */}
      <div className="mt-14">
        {/* Tab bar */}
        <div className="no-scrollbar sticky top-20 z-20 mb-6 flex gap-1 overflow-auto rounded-2xl bg-white p-1.5 shadow-card">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-black transition duration-200 ${activeTab === tab ? "bg-brand-blue text-white shadow-glow" : "text-slate-500 hover:bg-sky-50 hover:text-slate-700"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-fade-in">
          {activeTab === "Overview" && (
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="soft-card rounded-[1.5rem] p-5">
                <h2 className="text-xl font-black">Pharmacy checks</h2>
                <div className="mt-4 grid gap-3 text-sm font-bold text-slate-600">
                  {["Authenticity verified", "Expiry checked at dispatch", "Packed for safe delivery"].map((item) => (
                    <div key={item} className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                      <ShieldCheck className="mr-2 inline" size={16} /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="soft-card rounded-[1.5rem] p-5">
                <h2 className="text-xl font-black">Product specs</h2>
                <div className="mt-4 grid gap-3 text-sm font-bold text-slate-600">
                  {product.specs.map((spec) => (
                    <div key={spec} className="rounded-2xl bg-sky-50 p-3">{spec}</div>
                  ))}
                </div>
              </div>
              <div className="soft-card rounded-[1.5rem] p-5">
                <h2 className="text-xl font-black">Quick info</h2>
                <div className="mt-4 grid gap-2 text-sm">
                  {[["Brand", product.brand], ["Pack", product.packSize], ["Delivery", product.delivery], ["Category", product.category]].map(([k, v]) => (
                    <div key={k} className="flex justify-between rounded-xl bg-sky-50 px-3 py-2 font-bold">
                      <span className="text-slate-400">{k}</span>
                      <span className="text-slate-700">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Usage & Warnings" && (
            <div className="grid gap-4 md:grid-cols-2">
              {[["Usage", product.usage], ["Warnings", product.warning], ["Dosage note", product.dosageNote], ["Storage", "Store in a cool, dry place away from direct sunlight."]].map(([title, text]) => (
                <div key={title} className="soft-card rounded-2xl p-5 text-sm">
                  <p className="font-black text-brand-dark">{title}</p>
                  <p className="mt-2 font-semibold leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Specs" && (
            <div className="soft-card rounded-[1.5rem] p-5 text-sm">
              <h2 className="mb-4 text-xl font-black">Full specifications</h2>
              <div className="grid gap-2">
                {[
                  ["Product name", product.name],
                  ["Brand", product.brand],
                  ["Manufacturer", product.manufacturer],
                  ["Pack size", product.packSize],
                  ["Category", product.category],
                  ["Rx required", product.rxRequired ? "Yes" : "No"],
                  ...product.specs.map((spec, i) => [`Spec ${i + 1}`, spec])
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between rounded-xl bg-sky-50/60 px-4 py-3 font-semibold">
                    <span className="font-black text-slate-600">{k}</span>
                    <span className="text-slate-500">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
              {/* Rating summary */}
              <div className="soft-card rounded-[1.5rem] p-5">
                <div className="text-center">
                  <p className="text-5xl font-black text-slate-900">{product.rating}</p>
                  <div className="mt-2 flex justify-center gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={18} fill={s <= Math.round(parseFloat(product.rating)) ? "#F59E0B" : "none"} className="text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-400">24 verified reviews</p>
                </div>
                <div className="mt-5 grid gap-2">
                  {ratingBreakdown.map(({ stars, pct }) => (
                    <div key={stars} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <span className="w-4 shrink-0">{stars}★</span>
                      <div className="rating-bar flex-1">
                        <div className="rating-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 text-right">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review cards */}
              <div className="grid gap-4">
                {[
                  { name: "Priya S.", text: "Fast delivery, product was exactly as described. Packaging was secure and professional.", stars: 5 },
                  { name: "Arjun M.", text: "Good quality product. The OTC checkout made it very easy to purchase without any hassle.", stars: 4 },
                  { name: "Sunita R.", text: "Quick delivery in 90 minutes. Will definitely reorder.", stars: 5 },
                ].map(({ name, text, stars }) => (
                  <div key={name} className="soft-card rounded-2xl p-5 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-blue text-xs font-black text-white">
                          {name.charAt(0)}
                        </div>
                        <span className="font-black text-slate-800">{name}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={13} fill={s <= stars ? "#F59E0B" : "none"} className="text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 font-semibold leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "FAQs" && (
            <div className="soft-card rounded-[1.5rem] p-5">
              <h2 className="mb-4 text-xl font-black">Frequently asked questions</h2>
              <div className="grid gap-3 text-sm">
                {[
                  ["Can I buy this now?", product.rxRequired ? "Only after prescription approval." : "Yes, this item can be added directly if it is in stock."],
                  ["Is delivery available today?", `The estimated delivery for this product is ${product.delivery}.`],
                  ["How do I upload a prescription?", "Go to the Prescription page, fill in doctor details and upload a file. Once approved, Rx items unlock for checkout."],
                  ["Is this product authentic?", "All FirstMED products are sourced from verified manufacturers and are authenticity-checked at dispatch."]
                ].map(([question, answer]) => (
                  <details key={question} className="group rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
                    <summary className="cursor-pointer font-black text-slate-800 group-open:text-brand-blue">
                      {question}
                    </summary>
                    <p className="mt-3 font-semibold leading-6 text-slate-600">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar products */}
      <section className="mt-16">
        <h2 className="mb-5 text-2xl font-black">Similar products</h2>
        <ProductShelf products={similar} />
      </section>

      {/* Mobile sticky CTA bar */}
      <div className="fixed inset-x-3 bottom-24 z-40 grid grid-cols-2 gap-3 rounded-[1.4rem] border border-white/80 bg-white/95 p-3 shadow-premium backdrop-blur-xl sm:hidden">
        <Button onClick={handleAdd} disabled={!product.inStock}>
          <ShoppingBag size={16} /> {product.inStock ? "Add" : "Sold out"}
        </Button>
        <Button href={product.inStock ? "/checkout/" : "/products/"} className="bg-brand-yellow text-brand-blue hover:bg-yellow-300">
          {product.inStock ? "Buy now" : "Alternatives"}
        </Button>
      </div>
    </div>
  );
}
