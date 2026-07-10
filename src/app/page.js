"use client";

import { ArrowRight, BadgeCheck, Clock3, Dumbbell, FileCheck2, FlaskConical, Heart, Leaf, Pill, ShieldCheck, Shirt, Sparkles, Star, Truck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { ProductShelf } from "@/components/products/ProductShelf";
import { SearchBar } from "@/components/SearchBar";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { products, categories, vendors } from "@/data/catalog";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { FloatingAssets } from "@/components/motion/FloatingAssets";
import { CareKitBuilder } from "@/components/sections/CareKitBuilder";
import { BannerCarousel } from "@/components/sections/BannerCarousel";

// Unique icon + color per category
const categoryConfig = {
  "Health Resource Center": { icon: Pill, bg: "bg-sky-50", text: "text-brand-blue", accent: "from-sky-50 to-blue-100" },
  "Personal Care": { icon: Heart, bg: "bg-pink-50", text: "text-pink-500", accent: "from-pink-50 to-rose-100" },
  "Hair Care": { icon: Sparkles, bg: "bg-purple-50", text: "text-purple-500", accent: "from-purple-50 to-violet-100" },
  "Fitness & Health": { icon: Dumbbell, bg: "bg-orange-50", text: "text-orange-500", accent: "from-orange-50 to-amber-100" },
  "Sexual Wellness": { icon: Leaf, bg: "bg-emerald-50", text: "text-emerald-600", accent: "from-emerald-50 to-teal-100" },
  "Homeopathy": { icon: FlaskConical, bg: "bg-teal-50", text: "text-teal-600", accent: "from-teal-50 to-cyan-100" },
  "Vitamins & Nutrition": { icon: Zap, bg: "bg-yellow-50", text: "text-yellow-600", accent: "from-yellow-50 to-amber-100" },
  "Supports & Braces": { icon: Shirt, bg: "bg-indigo-50", text: "text-indigo-500", accent: "from-indigo-50 to-blue-100" },
  "Immunity Boosters": { icon: ShieldCheck, bg: "bg-green-50", text: "text-green-600", accent: "from-green-50 to-emerald-100" },
};

const needKits = [
  {
    name: "Fever kit",
    desc: "Paracetamol, ORS sachets, and first-aid basics for quick home relief.",
    items: ["Paracetamol 500mg", "ORS Sachets", "First Aid"],
    href: "/products/?category=Health%20Resource%20Center",
    color: "from-sky-50 to-blue-50",
    accent: "bg-brand-blue",
    icon: Pill
  },
  {
    name: "Daily care",
    desc: "Vitamins, immunity boosters, and daily wellness essentials.",
    items: ["Vitamin C", "Elderberry Gummies", "Vitamin D3"],
    href: "/products/?category=Vitamins%20%26%20Nutrition",
    color: "from-emerald-50 to-teal-50",
    accent: "bg-emerald-500",
    icon: Zap
  },
  {
    name: "Recovery support",
    desc: "Protein support, electrolytes, and omega for faster recovery.",
    items: ["Whey Protein", "Electrolyte Pack", "Omega Softgels"],
    href: "/products/?category=Fitness%20%26%20Health",
    color: "from-orange-50 to-amber-50",
    accent: "bg-orange-500",
    icon: Dumbbell
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Search + stats bar */}
      <section className="mx-auto -mt-6 max-w-[96rem] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <SearchBar large />
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { value: "22k+", label: "Verified products", icon: BadgeCheck, color: "text-brand-blue" },
            { value: "Rx", label: "Locked prescription checkout", icon: FileCheck2, color: "text-amber-600" },
            { value: "90 min", label: "Fast city delivery", icon: Clock3, color: "text-emerald-600" }
          ].map(({ value, label, icon: Icon, color }, index) => (
            <Reveal key={label} delay={index * 0.08}>
              <div className="glass rounded-2xl px-5 py-4 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium">
                <div className="flex items-center gap-3">
                  <Icon size={18} className={color} />
                  <div>
                    <p className={`text-xl font-black ${color}`}>{value}</p>
                    <p className="text-xs font-bold text-slate-500">{label}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Daily essentials — categories */}
      <Section eyebrow="Daily essentials" title="Keep nutrition and immunity basics visible, organized and easy to reorder.">
        <Reveal>
          <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
            <div className="rounded-2xl bg-gradient-to-br from-white via-sky-50 to-brand-mint p-8 shadow-soft">
              <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
                Add vitamins, energy gels and protein support to your monthly wellness basket.
              </p>
              <Button href="/products" className="mt-5">
                Shop wellness <ArrowRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {categories.slice(0, 6).map((category) => {
                const config = categoryConfig[category] || { icon: BadgeCheck, bg: "bg-sky-50", text: "text-brand-blue", accent: "from-sky-50 to-blue-100" };
                const Icon = config.icon;
                return (
                  <motion.a
                    key={category}
                    href={`/products/?category=${encodeURIComponent(category)}`}
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    className="block"
                  >
                    <SpotlightCard className="soft-card group h-full rounded-[1.5rem] p-4 transition duration-300 hover:shadow-premium">
                      <div className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${config.accent} ${config.text}`}>
                        <Icon size={22} className="transition duration-300 group-hover:scale-110" />
                      </div>
                      <h3 className="text-xs font-black leading-tight">{category}</h3>
                    </SpotlightCard>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Shop by need */}
      <section className="bg-slate-50/80">
        <Section eyebrow="Shop by need" title="Start with the care moment, then add what fits.">
          <div className="grid gap-4 md:grid-cols-3">
            {needKits.map(({ name, desc, items, href, color, accent, icon: Icon }, index) => (
              <Reveal key={name} delay={index * 0.08}>
                <motion.a
                  href={href}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className={`group soft-card block rounded-2xl bg-gradient-to-br ${color} p-6 transition duration-300 hover:shadow-premium`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`grid h-10 w-10 place-items-center rounded-2xl ${accent} text-white`}>
                      <Icon size={18} />
                    </div>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-slate-600 dark:text-slate-400 shadow-card">
                      {items.length} items
                    </span>
                  </div>
                  <h3 className="mt-4 font-black text-slate-900 dark:text-slate-100">{name}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span key={item} className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-black text-slate-600 dark:text-slate-400">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-black text-slate-600 dark:text-slate-400 group-hover:text-brand-blue">
                    Shop now <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </Section>
      </section>

      {/* Care kit builder */}
      <CareKitBuilder />

      {/* Popular departments */}
      <Section eyebrow="Popular departments" title="Browse focused care shelves." action={<Button href="/products">View full catalogue</Button>}>
        {categories.slice(0, 6).map((category, index) => (
          <Reveal key={category} className="mb-11">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const config = categoryConfig[category] || {};
                  const Icon = config.icon || Pill;
                  return (
                    <span className={`grid h-8 w-8 place-items-center rounded-xl ${config.bg || "bg-sky-50"} ${config.text || "text-brand-blue"}`}>
                      <Icon size={16} />
                    </span>
                  );
                })()}
                <h3 className="text-lg font-black">{category}</h3>
              </div>
              <a href={`/products?category=${encodeURIComponent(category)}`} className="flex items-center gap-1 text-sm font-black text-brand-blue hover:underline">
                View all <ArrowRight size={13} />
              </a>
            </div>
            <ProductShelf scroll products={products.filter((p) => p.category === category).slice(0, 10)} />
            {(index === 1 || index === 3) ? (
              <div className="mt-10"><BannerCarousel compact /></div>
            ) : null}
          </Reveal>
        ))}
      </Section>

      {/* Recovery CTA banner */}
      <Section>
        <Reveal>
          <div className="rounded-[2rem] border border-white/80 bg-gradient-to-r from-[#fffef0] via-white to-[#e1fff5] p-8 shadow-premium md:flex md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Recovery bundle</p>
              <h2 className="mt-2 max-w-xl text-3xl font-black">Build a quick recovery kit for fever, hydration and first-aid needs.</h2>
            </div>
            <Button href="/products/?category=Health%20Resource%20Center" className="mt-6 md:mt-0">
              Build kit
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Partner pharmacies */}
      <Section eyebrow="Partner pharmacies" title="Medicines and personal self-care products ready to buy.">
        <div className="grid gap-4 md:grid-cols-3">
          {vendors.map((vendor, index) => (
            <Reveal key={vendor.name} delay={index * 0.08}>
              <motion.div
                whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                className="block"
              >
                <SpotlightCard className="soft-card group rounded-2xl p-5 transition duration-300 hover:shadow-premium">
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-blue to-sky-400 text-lg font-black text-white shadow-soft">
                      {vendor.name.charAt(0)}
                    </div>
                    <div className="text-right">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600">
                        ★ {vendor.score}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-3 font-black group-hover:text-brand-blue transition-colors">{vendor.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{vendor.area}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Truck size={14} className="text-brand-blue" />
                    <span className="text-xs font-black text-brand-blue">{vendor.eta} avg delivery</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-black text-brand-blue">OTC</span>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-black text-amber-700">Rx-ready</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-600">Express</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Rx safety gate */}
      <section className="mx-auto max-w-[104rem] px-4 pb-14 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <Reveal>
          <div className="grid gap-6 rounded-2xl bg-brand-navy p-6 text-white shadow-soft md:grid-cols-[0.85fr_1fr] md:p-9">
            <div>
              <span className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-black text-brand-blue">Rx safety gate</span>
              <h2 className="mt-4 text-3xl font-black">Prescription medicines stay locked until verification.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Upload doctor and clinic details once, then restricted products can be added after approval.
              </p>
              <Button href="/prescription" className="mt-6 bg-white text-brand-blue hover:bg-blue-50">
                Upload prescription
              </Button>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              {["Doctor name", "Clinic letterhead", "Registration number", "Patient name"].map((item) => (
                <div key={item} className="mb-3 flex items-center gap-3 rounded-xl bg-white/10 p-3 text-sm font-bold">
                  <FileCheck2 size={18} className="text-brand-yellow" />
                  {item}
                  <span className="ml-auto h-2 w-2 rounded-full bg-brand-yellow" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
