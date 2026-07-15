"use client";

import { ChevronRight, Heart, Home, LockKeyhole, MapPin, Share2, ShieldCheck, ShoppingBag, Star, Truck, AlertTriangle, Syringe, PackageCheck, Zap, BookOpen, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { ProductShelf } from "./ProductShelf";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  
  const addToCart = useAppStore((state) => state.addToCart);
  const prescription = useAppStore((state) => state.prescription);

  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  // Scroll Spy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-150px 0px -60% 0px", threshold: 0 }
    );

    const tabsList = ["Description", "Overview", "Usage & Warnings", "Specs", "Reviews", "FAQs"];
    tabsList.forEach((tab) => {
      const el = document.getElementById(tab);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function handleMouseMove(e) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  }

  function handleAdd(event) {
    const result = addToCart(product);
    setBlocked(Boolean(result.blocked));
    if (!result.blocked && typeof window !== "undefined") {
      toast.success(`${product.name} added to cart`);
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

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
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
      <nav className="breadcrumb mb-8 text-sm font-bold tracking-wide text-slate-400" aria-label="Breadcrumb">
        <Link href="/" className="inline-flex items-center gap-1 transition hover:text-brand-blue">
          <Home size={14} /> Home
        </Link>
        <ChevronRight size={14} className="mx-2 inline text-slate-300 dark:text-slate-700" />
        <Link href="/products" className="transition hover:text-brand-blue">Products</Link>
        <ChevronRight size={14} className="mx-2 inline text-slate-300 dark:text-slate-700" />
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="transition hover:text-brand-blue">
          {product.category}
        </Link>
        <ChevronRight size={14} className="mx-2 inline text-slate-300 dark:text-slate-700" />
        <span className="text-slate-800 dark:text-white">{product.name}</span>
      </nav>

      {/* Main Grid: Left Content (Hero Image), Right Sticky Panel */}
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.4fr_0.8fr] items-start">
        
        {/* LEFT COLUMN - HERO IMAGE */}
        <div className="flex flex-col gap-12">
          {/* Hero Image Section */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-sky-50/80 to-slate-50 p-6 shadow-premium dark:from-slate-900 dark:to-slate-950 dark:border dark:border-slate-800/80">
            {/* Gallery Picker */}
            <div className="absolute left-6 top-6 z-10 flex flex-col gap-3">
              {gallery.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(img)}
                  className={`h-14 w-14 overflow-hidden rounded-2xl border-2 bg-white/90 backdrop-blur-md transition-all hover:scale-105 dark:bg-slate-900/90 ${activeImage === img ? "border-brand-blue shadow-glow scale-110" : "border-transparent shadow-sm dark:border-slate-800"}`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt="" fill className="object-contain p-2" />
                </button>
              ))}
            </div>

            {/* Main Interactive Image */}
            <div 
              className="relative aspect-square w-full cursor-crosshair overflow-hidden rounded-[2rem]"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => window.innerWidth >= 1024 && setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
            >
              <Image
                src={activeImage}
                alt={product.imageAlt || product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 92vw"
                className="object-contain p-12 transition-transform duration-300 ease-out"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZooming ? "scale(2.2)" : "scale(1)"
                }}
                priority
              />
            </div>
            
            {/* Discount Badge */}
            {discount >= 10 && (
              <span className="absolute right-8 top-8 rounded-full bg-brand-yellow px-5 py-2 text-sm font-black text-brand-blue shadow-card">
                {discount}% off
              </span>
            )}
          </motion.div>
        </div>

        {/* RIGHT COLUMN - STICKY BUY BOX */}
        <div className="relative">
          <div className="sticky top-28 flex flex-col gap-6">
            {/* Main Sticky Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-[2.5rem] bg-white p-8 shadow-premium dark:bg-slate-900 dark:border dark:border-slate-800">
              
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant={product.inStock ? "green" : "red"} className="rounded-xl px-3 py-1.5">{product.inStock ? "In stock" : "Out of stock"}</Badge>
                {product.rxRequired
                  ? <Badge variant="yellow" className="rounded-xl px-3 py-1.5"><LockKeyhole size={13} className="mr-1" /> Prescription needed</Badge>
                  : <Badge variant="green" className="rounded-xl px-3 py-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">OTC Approved</Badge>
                }
              </div>

              <h1 className="text-3xl font-black leading-tight text-slate-900 dark:text-white lg:text-4xl lg:leading-[1.1]">{product.name}</h1>
              <p className="mt-2 text-base font-bold text-slate-400 dark:text-slate-500">By {product.brand}</p>

              {/* Price Block */}
              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-5xl font-black text-slate-900 dark:text-white">₹{product.price}</span>
                <span className="text-xl font-bold text-slate-400 line-through">₹{product.mrp}</span>
              </div>
              <p className="mt-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">Inclusive of all taxes. You save ₹{product.mrp - product.price}!</p>

              <hr className="my-8 border-slate-100 dark:border-slate-800" />

              {/* Delivery ETA */}
              <div className="mb-6 rounded-2xl bg-sky-50 p-5 dark:bg-slate-800/50">
                <label className="mb-3 block text-sm font-black text-slate-900 dark:text-white">
                  Check delivery ETA
                </label>
                <div className="relative flex items-center gap-3">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={18} />
                    <input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="Enter pincode"
                      className="w-full rounded-xl border border-transparent bg-white py-3 pl-12 pr-4 font-bold text-slate-800 shadow-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                {pincode.length === 6 && (
                  <div className="mt-4 flex items-center gap-2 text-sm font-black text-emerald-700 dark:text-emerald-400">
                    <Truck size={18} /> Delivery available {product.delivery.toLowerCase()}
                  </div>
                )}
              </div>

              {/* Rx warning */}
              {product.rxRequired && (
                <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
                  <LockKeyhole className="mr-2 inline" size={17} /> Prescription required. Status: {prescription.status}.
                </div>
              )}
              {blocked && (
                <div className="mb-6 rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-700 dark:bg-rose-950/30 dark:text-rose-400">
                  Upload and approve a prescription before adding this medicine.
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleAdd} 
                  disabled={!product.inStock} 
                  id="pdp-add-cart-btn" 
                  className="w-full justify-center py-4 text-lg disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-white shadow-glow"
                >
                  <ShoppingBag size={20} className="mr-2" /> {product.inStock ? "Add to cart" : "Out of stock"}
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setWishlisted(!wishlisted);
                      toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-black transition-colors ${wishlisted ? "bg-rose-50 text-rose-500 dark:bg-rose-950/30" : "bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}
                  >
                    <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
                    {wishlisted ? "Saved" : "Save"}
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-black text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-white p-5 text-center shadow-sm dark:bg-slate-900/50 dark:border dark:border-slate-800">
                <ShieldCheck size={28} className="mb-2 text-brand-blue dark:text-sky-400" />
                <span className="text-xs font-black text-slate-600 dark:text-slate-300">100% Genuine</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-white p-5 text-center shadow-sm dark:bg-slate-900/50 dark:border dark:border-slate-800">
                <Truck size={28} className="mb-2 text-brand-blue dark:text-sky-400" />
                <span className="text-xs font-black text-slate-600 dark:text-slate-300">Fast Delivery</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* FULL-WIDTH CONTENT SECTION */}
      <div className="mt-16 flex flex-col gap-12">
        
        {/* STICKY NAV TABS BAR */}
        <div className="sticky top-20 z-40 flex w-fit overflow-x-auto rounded-[2rem] bg-[#0f172a]/95 backdrop-blur-md p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          {["Description", "Overview", "Usage & Warnings", "Specs", "Reviews", "FAQs"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                const el = document.getElementById(tab);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 160;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className={`whitespace-nowrap rounded-[1.5rem] px-6 py-3 text-sm font-black transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#0ea5e9] text-white shadow-md border-2 border-white dark:border-slate-800"
                  : "text-slate-400 hover:text-white border-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-12 min-h-[400px]">
          {/* DESCRIPTION SECTION */}
          <div id="Description" className="scroll-mt-40">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="rounded-[2.5rem] bg-white p-8 sm:p-12 shadow-soft dark:bg-slate-900/60 dark:border dark:border-slate-800">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">About this product</h2>
              <div className={`prose prose-slate dark:prose-invert max-w-none transition-all duration-500 overflow-hidden relative ${isDescExpanded ? "max-h-[5000px]" : "max-h-[150px]"}`}>
                <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-medium columns-1 md:columns-2 gap-12">
                  <span className="float-left mr-4 text-7xl font-black text-brand-blue dark:text-sky-400 leading-none mt-2">
                    {product.description.charAt(0)}
                  </span>
                  {product.description.substring(1)}
                </p>
                {!isDescExpanded && (
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent dark:from-[#0f172a]" />
                )}
              </div>
              <button
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="mt-6 flex items-center gap-1 font-black text-brand-blue hover:text-sky-500 dark:text-sky-400"
              >
                {isDescExpanded ? "Read less" : "Read more"}
                <ChevronRight size={18} className={`transition-transform duration-300 ${isDescExpanded ? "-rotate-90" : "rotate-90"}`} />
              </button>
            </motion.div>
          </div>

          {/* OVERVIEW SECTION */}
          <div id="Overview" className="scroll-mt-40">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Bento Card: Dosage Note */}
              <motion.div variants={fadeUp} className="rounded-[2.5rem] bg-white p-8 sm:p-10 shadow-soft dark:bg-slate-900/60 dark:border dark:border-slate-800 lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
                    <Syringe size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Dosage Guidelines</h3>
                </div>
                <p className="text-base font-semibold leading-relaxed text-slate-600 dark:text-slate-300">{product.dosageNote}</p>
              </motion.div>

              {/* Bento Card: Pharmacy Checks */}
              <motion.div variants={fadeUp} className="rounded-[2.5rem] bg-emerald-50 p-8 sm:p-10 shadow-soft dark:bg-emerald-950/20 dark:border dark:border-emerald-900/30">
                <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-400 mb-8">Pharmacy Verified</h3>
                <div className="grid gap-5">
                  {["Authenticity verified", "Expiry checked", "Safe delivery packaging"].map((item) => (
                    <div key={item} className="flex items-center gap-4 text-base font-bold text-emerald-800 dark:text-emerald-300">
                      <ShieldCheck className="shrink-0 text-emerald-500" size={22} /> {item}
                    </div>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/* USAGE & WARNINGS SECTION */}
          <div id="Usage & Warnings" className="scroll-mt-40">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Bento Card: Usage */}
              <motion.div variants={fadeUp} className="rounded-[2.5rem] bg-gradient-to-br from-sky-50 to-white p-8 sm:p-10 shadow-soft dark:from-slate-900/80 dark:to-slate-900 dark:border dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-brand-blue/10 rounded-2xl text-brand-blue dark:bg-sky-500/10 dark:text-sky-400">
                    <Zap size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Indications & Usage</h3>
                </div>
                <p className="text-base leading-relaxed font-semibold text-slate-600 dark:text-slate-300">{product.usage}</p>
              </motion.div>

              {/* Bento Card: Warning */}
              <motion.div variants={fadeUp} className="rounded-[2.5rem] border border-rose-100 bg-rose-50/50 p-8 sm:p-10 shadow-soft dark:border-rose-900/30 dark:bg-rose-950/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-rose-100 rounded-2xl text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                    <AlertTriangle size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-rose-900 dark:text-rose-400">Critical Warning</h3>
                </div>
                <p className="text-base font-semibold leading-relaxed text-rose-800 dark:text-rose-300">{product.warning}</p>
              </motion.div>

            </motion.div>
          </div>

          {/* SPECS SECTION */}
          <div id="Specs" className="scroll-mt-40">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="rounded-[2.5rem] bg-white p-8 sm:p-12 shadow-soft dark:bg-slate-900/60 dark:border dark:border-slate-800">
              <h2 className="mb-10 text-3xl font-black text-slate-900 dark:text-white">Full Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
                {[
                  ["Product Name", product.name],
                  ["Brand", product.brand],
                  ["Manufacturer", product.manufacturer],
                  ["Pack Size", product.packSize],
                  ["Category", product.category],
                  ["Rx Required", product.rxRequired ? "Yes" : "No"],
                  ...product.specs.map(spec => spec.split(": ")).filter(arr => arr.length === 2),
                ].map(([k, v], i) => (
                  <div key={i} className="flex justify-between border-b border-slate-100 py-5 dark:border-slate-800/80">
                    <span className="font-bold text-slate-500 dark:text-slate-400">{k}</span>
                    <span className="font-black text-slate-900 text-right dark:text-slate-200">{v}</span>
                  </div>
                ))}
                {/* Render any specs that didn't have a colon separator as full width bullet points */}
                {product.specs.filter(spec => !spec.includes(": ")).map((spec, i) => (
                  <div key={`spec-bullet-${i}`} className="col-span-1 md:col-span-2 flex items-center gap-4 border-b border-slate-100 py-5 dark:border-slate-800/80">
                    <PackageCheck size={22} className="text-brand-blue dark:text-sky-400" />
                    <span className="font-black text-slate-800 dark:text-slate-200">{spec}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* REVIEWS SECTION */}
          <div id="Reviews" className="scroll-mt-40">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="">
              <h2 className="mb-10 text-3xl font-black text-slate-900 dark:text-white">Customer Reviews</h2>
              <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
                {/* Rating summary */}
                <div className="rounded-[2.5rem] bg-slate-950 p-10 text-white shadow-premium dark:bg-slate-900 dark:border dark:border-slate-800">
                  <div className="text-center">
                    <p className="text-7xl font-black">{product.rating}</p>
                    <div className="mt-4 flex justify-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={24} fill={s <= Math.round(parseFloat(product.rating)) ? "#F59E0B" : "none"} className="text-amber-400" />
                      ))}
                    </div>
                    <p className="mt-3 text-base font-bold text-slate-400">24 verified reviews</p>
                  </div>
                  <div className="mt-10 grid gap-4">
                    {ratingBreakdown.map(({ stars, pct }) => (
                      <div key={stars} className="flex items-center gap-4 text-sm font-bold text-slate-300">
                        <span className="w-5 shrink-0">{stars}★</span>
                        <div className="h-2.5 flex-1 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-brand-yellow rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-10 text-right text-slate-400">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review cards */}
                <div className="grid gap-5">
                  {[
                    { name: "Priya S.", text: "Fast delivery, product was exactly as described. Packaging was secure and professional.", stars: 5 },
                    { name: "Arjun M.", text: "Good quality product. The OTC checkout made it very easy to purchase without any hassle.", stars: 4 },
                    { name: "Sunita R.", text: "Quick delivery in 90 minutes. Will definitely reorder.", stars: 5 },
                  ].map(({ name, text, stars }) => (
                    <div key={name} className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm dark:bg-slate-900/40 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-blue/10 text-lg font-black text-brand-blue dark:bg-sky-500/20 dark:text-sky-300">
                            {name.charAt(0)}
                          </div>
                          <span className="text-lg font-black text-slate-900 dark:text-white">{name}</span>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={16} fill={s <= stars ? "#F59E0B" : "none"} className="text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-5 text-base font-semibold leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQS SECTION */}
          <div id="FAQs" className="scroll-mt-40 mb-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-[2.5rem] bg-white p-8 sm:p-12 shadow-soft dark:bg-slate-900/60 dark:border dark:border-slate-800">
               <h2 className="mb-10 text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
               <div className="flex flex-col gap-4">
                 {[
                   { q: "Is this product 100% genuine?", a: "Yes, all products sold on FirstMed are 100% genuine and verified by our partner pharmacies. We maintain a strict multi-point verification process ensuring every medicine batch comes directly from the original manufacturer or an authorized distributor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo at orci eleifend imperdiet ut eu elit. Nulla facilisi. Praesent sit amet est nec nulla lacinia laoreet. Integer vel neque in leo mattis efficitur eu elementum dolor." },
                   { q: "How fast is delivery?", a: "We offer 90-minute delivery in select urban areas and next-day delivery nationwide. Our logistics network operates 24/7 with specialized cold-chain vehicles for temperature-sensitive medications like insulin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique tristique leo, at efficitur tellus bibendum a. Morbi in turpis at erat convallis sollicitudin eu vel quam. Cras quis urna vel enim accumsan vulputate vel in nibh. Proin scelerisque urna sed massa fringilla." },
                   { q: "Can I return the medicine if I order by mistake?", a: "Unopened OTC medicines can be returned within 7 days. Prescription medicines require authorization and cannot be returned once unsealed due to health and safety regulations. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Quisque cursus, purus sed tempor consectetur, justo velit viverra ipsum, sed ultrices magna eros in sapien. Vivamus venenatis egestas elit, id gravida nisi consequat non." },
                   { q: "How do I upload my prescription?", a: "You can upload a photo of your prescription directly during the checkout flow. Our licensed pharmacists review all uploads within 5 minutes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut est quis sapien laoreet ultrices id in dui. Aliquam nec arcu id felis lobortis tristique vitae vel ante. Ut congue magna diam, sed cursus ex interdum in. Sed non nunc velit." },
                   { q: "Do you offer any bulk discounts?", a: "Yes, we offer special rates for bulk orders and ongoing prescriptions. Contact our B2B sales team or subscribe to our chronic care plan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus non nibh dignissim, aliquet ligula tincidunt, suscipit ex. Cras tempor nisl eu aliquet varius. Morbi commodo euismod accumsan." },
                   { q: "What is your refund policy?", a: "Refunds are processed to the original payment method within 3-5 business days after a return is accepted at our warehouse. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor mauris vitae nisl tempor ullamcorper. Aliquam id erat non nisi posuere sagittis a eu lectus. Curabitur hendrerit sapien ut massa commodo tristique. Maecenas scelerisque magna ac lectus dapibus hendrerit." }
                 ].map((faq, i) => (
                   <details key={i} className="group rounded-[1.5rem] border border-slate-100 bg-slate-50/50 p-6 shadow-sm transition-colors open:bg-white dark:border-slate-800/80 dark:bg-slate-900/50 dark:open:bg-slate-900">
                     <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-black text-slate-800 dark:text-slate-200">
                       {faq.q}
                       <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-200/50 text-slate-500 transition-transform duration-300 group-open:rotate-180 group-open:bg-brand-blue/10 group-open:text-brand-blue dark:bg-slate-800 dark:text-slate-400 dark:group-open:bg-sky-500/20 dark:group-open:text-sky-400">
                         <ChevronRight size={20} className="rotate-90" />
                       </span>
                     </summary>
                     <p className="mt-4 border-t border-slate-100 pt-4 text-base font-semibold leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
                       {faq.a}
                     </p>
                   </details>
                 ))}
               </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* RELATED ARTICLES SECTION */}
      <section className="mt-20 border-t border-slate-100 pt-20 dark:border-slate-800">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Related Articles</h2>
            <p className="mt-2 text-slate-500 font-bold dark:text-slate-400">Expert insights and wellness tips</p>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-1 font-black text-brand-blue hover:text-sky-500 dark:text-sky-400">
            View all <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Understanding Pain Management: When to take what", category: "Wellness", readTime: "4 min read", color: "from-sky-400 to-indigo-500" },
            { title: "The Truth About Fever Reducers and Your Liver", category: "Medical Advice", readTime: "6 min read", color: "from-emerald-400 to-teal-600" },
            { title: "Top 10 Essential Medications for Your Home Kit", category: "First Aid", readTime: "5 min read", color: "from-amber-400 to-orange-500" }
          ].map((post, i) => (
            <Link key={i} href="/blog" className="group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-premium dark:bg-slate-900/60 dark:border dark:border-slate-800">
              <div className={`relative h-48 w-full bg-gradient-to-br ${post.color} opacity-90 p-6 flex flex-col justify-end`}>
                 <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:bg-transparent" />
                 <div className="absolute inset-0 bg-white/20 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                 <span className="relative z-10 w-fit rounded-full bg-white/20 px-4 py-1.5 text-xs font-black tracking-wide text-white shadow-sm backdrop-blur-md mb-2">{post.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="text-xl font-black leading-snug text-slate-900 dark:text-white group-hover:text-brand-blue transition-colors line-clamp-2">{post.title}</h3>
                <div className="mt-auto pt-6 flex items-center justify-between text-sm font-bold text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-2"><Clock size={16} /> {post.readTime}</span>
                  <span className="flex items-center gap-1.5 text-slate-300 group-hover:text-brand-blue transition-colors dark:text-slate-600"><BookOpen size={16} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Similar products */}
      <section className="mt-32">
        <h2 className="mb-8 text-3xl font-black text-slate-900 dark:text-white">Customers also viewed</h2>
        <ProductShelf products={similar} />
      </section>

      {/* Mobile sticky CTA bar */}
      <div className="fixed inset-x-3 bottom-24 z-40 grid grid-cols-2 gap-3 rounded-[1.4rem] border border-white/80 bg-white/95 p-3 shadow-premium backdrop-blur-xl sm:hidden dark:bg-slate-900/90 dark:border-slate-800">
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
