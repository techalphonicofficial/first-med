import { ArrowRight, BadgeCheck, Clock3, FileCheck2, ShieldCheck, Truck } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { ProductShelf } from "@/components/products/ProductShelf";
import { SearchBar } from "@/components/SearchBar";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { products, categories, vendors } from "@/data/catalog";
import { Reveal } from "@/components/motion/Reveal";
import { CareKitBuilder } from "@/components/sections/CareKitBuilder";
import { BannerCarousel } from "@/components/sections/BannerCarousel";

const categoryIcons = [BadgeCheck, ShieldCheck, FileCheck2];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto -mt-6 max-w-[96rem] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <SearchBar large />
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ["22k+", "Verified products"],
            ["Rx", "Locked prescription checkout"],
            ["90 min", "Fast city delivery"]
          ].map(([value, label], index) => (
            <Reveal key={label} delay={index * 0.08}>
            <div className="glass rounded-2xl px-5 py-4 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium">
              <p className="text-2xl font-black text-brand-blue">{value}</p>
              <p className="text-sm font-bold text-slate-500">{label}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Section eyebrow="Daily essentials" title="Keep nutrition and immunity basics visible, organized and easy to reorder.">
        <Reveal>
        <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl bg-gradient-to-br from-white via-sky-50 to-brand-mint p-8 shadow-soft">
            <p className="max-w-md text-sm leading-6 text-slate-600">Add vitamins, energy gels and protein support to your monthly wellness basket.</p>
            <Button href="/products" className="mt-5">Shop wellness <ArrowRight size={16} /></Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {categories.slice(0, 6).map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length];
              return (
            <a key={category} href={`/products/?category=${encodeURIComponent(category)}`} className="soft-card group rounded-[1.5rem] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-premium">
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-brand-blue">
                  <Icon size={22} className="transition duration-300 group-hover:scale-110" />
                </div>
                <p className="text-sm font-black">{category}</p>
              </a>
              );
            })}
          </div>
        </div>
        </Reveal>
      </Section>

      <section className="bg-slate-50">
        <Section eyebrow="Shop by need" title="Start with the care moment, then add what fits.">
          <div className="grid gap-4 md:grid-cols-3">
            {["Fever kit", "Daily care", "Recovery support"].map((item, index) => (
              <Reveal key={item} delay={index * 0.08}>
              <div className="soft-card rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-premium">
                <div className="flex items-center justify-between">
                  <h3 className="font-black">{item}</h3>
                  <span className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-black text-brand-blue">{index + 1}</span>
                </div>
                <div className="mt-5 h-2 rounded-full bg-sky-100"><div className="h-2 rounded-full bg-brand-blue" style={{ width: `${45 + index * 18}%` }} /></div>
              </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </section>

      <CareKitBuilder />

      <Section eyebrow="Popular departments" title="Browse focused care shelves." action={<Button href="/products">View full catalogue</Button>}>
        {categories.slice(0, 6).map((category, index) => (
          <Reveal key={category} className="mb-11">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-black">{category}</h3>
              <a href={`/products?category=${encodeURIComponent(category)}`} className="text-sm font-black text-brand-blue">View all</a>
            </div>
            <ProductShelf scroll products={products.filter((product) => product.category === category).slice(0, 10)} />
            {(index === 1 || index === 3) ? (
              <div className="mt-10">
                <BannerCarousel compact />
              </div>
            ) : null}
          </Reveal>
        ))}
      </Section>

      <Section>
        <Reveal>
        <div className="rounded-[2rem] border border-white/80 bg-gradient-to-r from-[#fffef0] via-white to-[#e1fff5] p-8 shadow-premium md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Recovery bundle</p>
            <h2 className="mt-2 max-w-xl text-3xl font-black">Build a quick recovery kit for fever, hydration and first-aid needs.</h2>
          </div>
          <Button href="/products/?category=Health%20Resource%20Center" className="mt-6 md:mt-0">Build kit</Button>
        </div>
        </Reveal>
      </Section>

      <Section eyebrow="Partner pharmacies" title="Medicines and personal self-care products ready to buy.">
        <div className="grid gap-4 md:grid-cols-3">
          {vendors.map((vendor, index) => (
            <Reveal key={vendor.name} delay={index * 0.08}>
            <div className="soft-card rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-premium">
              <div className="flex items-center justify-between">
                <h3 className="font-black">{vendor.name}</h3>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600">{vendor.score}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-500">{vendor.area} • {vendor.eta}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-[104rem] px-4 pb-14 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <Reveal>
        <div className="grid gap-6 rounded-2xl bg-brand-navy p-6 text-white shadow-soft md:grid-cols-[0.85fr_1fr] md:p-9">
          <div>
            <span className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-black text-brand-blue">Rx safety gate</span>
            <h2 className="mt-4 text-3xl font-black">Prescription medicines stay locked until verification.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Upload doctor and clinic details once, then restricted products can be added after approval.</p>
            <Button href="/prescription" className="mt-6 bg-white text-brand-blue hover:bg-sky-50">Upload prescription</Button>
          </div>
          <div className="rounded-2xl bg-white/10 p-5">
            {["Doctor name", "Clinic letterhead", "Registration number", "Patient name"].map((item) => (
              <div key={item} className="mb-3 flex items-center gap-3 rounded-xl bg-white/10 p-3 text-sm font-bold"><FileCheck2 size={18} className="text-brand-yellow" /> {item}</div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>
    </>
  );
}
