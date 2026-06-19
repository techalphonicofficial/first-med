"use client";

import { Heart, LockKeyhole, Share2, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { ProductShelf } from "./ProductShelf";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function ProductDetailClient({ product, similar }) {
  const [blocked, setBlocked] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image);
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
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.gallery || [product.image],
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
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="soft-card rounded-2xl p-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-sky-50">
            <Image src={activeImage} alt={product.imageAlt || product.name} fill sizes="(min-width: 1024px) 42vw, 92vw" className="object-contain p-10" priority />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {(product.gallery || [product.image]).map((image) => (
              <button
                key={image}
                onClick={() => setActiveImage(image)}
                className={`relative aspect-square overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-0.5 ${activeImage === image ? "border-brand-blue shadow-glow" : "border-sky-100 shadow-sm"}`}
                aria-label={`Show ${product.name} image`}
              >
                <Image src={image} alt="" fill sizes="120px" className="object-contain p-4" />
              </button>
            ))}
          </div>
        </div>
        <section>
          <p className="text-sm font-black text-brand-blue">{product.category}</p>
          <h1 className="mt-2 text-4xl font-black">{product.name}</h1>
          <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
            <span className="inline-flex items-center gap-1"><Star size={16} fill="#F1E300" className="text-brand-yellow" /> {product.rating}</span>
            <span>{product.brand}</span>
            <span>{product.delivery} delivery</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={product.inStock ? "green" : "red"}>{product.inStock ? "In stock" : "Out of stock"}</Badge>
            {product.rxRequired ? <Badge variant="yellow"><LockKeyhole size={13} /> Prescription required</Badge> : <Badge variant="green">OTC checkout</Badge>}
            <Badge>Authentic product</Badge>
          </div>
          <p className="mt-5 max-w-2xl leading-7 text-slate-600">{product.description}</p>
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
          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-black">Rs. {product.price}</span>
            <span className="text-lg font-bold text-slate-400 line-through">Rs. {product.mrp}</span>
          </div>
          {product.rxRequired && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800">
              <LockKeyhole className="mr-2 inline" size={17} /> Prescription required. Current status: {prescription.status}.
            </div>
          )}
          {blocked && (
            <div className="mt-3 rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-700">
              Upload and approve prescription details before adding this medicine.
            </div>
          )}
          <div className="mt-7 hidden flex-wrap gap-3 sm:flex">
            <Button onClick={handleAdd}><ShoppingBag size={17} /> Add to cart</Button>
            <Button href="/checkout" className="bg-brand-yellow text-brand-blue hover:bg-yellow-300">Buy now</Button>
            <button className="rounded-full bg-sky-50 px-5 py-3 font-black text-brand-blue"><Heart className="mr-2 inline" size={17} /> Wishlist</button>
            <button className="rounded-full bg-sky-50 px-5 py-3 font-black text-brand-blue"><Share2 className="mr-2 inline" size={17} /> Share</button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Usage", product.usage],
              ["Warnings", product.warning],
              ["Dosage note", product.dosageNote],
              ["Storage", "Store in a cool, dry place away from direct sunlight."]
            ].map(([title, text]) => (
              <div key={title} className="soft-card rounded-2xl p-4 text-sm">
                <p className="font-black text-brand-dark">{title}</p>
                <p className="mt-2 font-semibold leading-5 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="mt-12 grid gap-5 lg:grid-cols-3">
        <div className="soft-card rounded-[1.5rem] p-5">
          <h2 className="text-xl font-black">Specifications</h2>
          <div className="mt-4 grid gap-3 text-sm font-bold text-slate-600">
            {product.specs.map((spec) => <div key={spec} className="rounded-2xl bg-sky-50 p-3">{spec}</div>)}
          </div>
        </div>
        <div className="soft-card rounded-[1.5rem] p-5">
          <h2 className="text-xl font-black">Reviews</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">Demo review summary: customers appreciate fast delivery, clear product packaging, and easy reorder.</p>
          <div className="mt-4 rounded-2xl bg-brand-softBlue p-4 text-sm font-black text-brand-blue">4.6 average rating</div>
        </div>
        <div className="soft-card rounded-[1.5rem] p-5">
          <h2 className="text-xl font-black">FAQs</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <details className="rounded-2xl bg-sky-50 p-3">
              <summary className="cursor-pointer font-black">Can I buy this now?</summary>
              <p className="mt-2 font-semibold text-slate-600">{product.rxRequired ? "Only after prescription approval." : "Yes, this item can be added directly if it is in stock."}</p>
            </details>
            <details className="rounded-2xl bg-sky-50 p-3">
              <summary className="cursor-pointer font-black">Is delivery available today?</summary>
              <p className="mt-2 font-semibold text-slate-600">The demo delivery estimate is {product.delivery}.</p>
            </details>
          </div>
        </div>
      </section>
      <section className="mt-14">
        <h2 className="mb-5 text-2xl font-black">Similar products</h2>
        <ProductShelf products={similar} />
      </section>
      <div className="fixed inset-x-3 bottom-24 z-40 grid grid-cols-2 gap-3 rounded-[1.4rem] border border-white/80 bg-white/95 p-3 shadow-premium backdrop-blur-xl sm:hidden">
        <Button onClick={handleAdd}><ShoppingBag size={16} /> Add</Button>
        <Button href="/checkout/" className="bg-brand-yellow text-brand-blue hover:bg-yellow-300">Buy now</Button>
      </div>
    </div>
  );
}
