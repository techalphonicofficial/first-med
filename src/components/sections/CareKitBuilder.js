"use client";

import { useMemo, useState } from "react";
import { Plus, Zap } from "lucide-react";
import Image from "next/image";
import { products } from "@/data/catalog";
import { useAppStore } from "@/store/useAppStore";
import { Badge } from "@/components/ui/Badge";

const kits = [
  { name: "Fever", emoji: "🌡️", desc: "Essentials for fever and cold relief" },
  { name: "Cough", emoji: "💊", desc: "Cough, throat and respiratory support" },
  { name: "Acidity", emoji: "🫃", desc: "Antacids and digestion support" },
  { name: "Hydration", emoji: "💧", desc: "ORS and electrolyte replenishment" },
];

export function CareKitBuilder() {
  const [active, setActive] = useState("Fever");
  const addToCart = useAppStore((state) => state.addToCart);
  const items = useMemo(() => {
    const terms = {
      Fever:    ["Paracetamol", "ORS", "First"],
      Cough:    ["Cough", "Vitamin", "Antacid"],
      Acidity:  ["Antacid", "ORS", "Vitamin"],
      Hydration:["ORS", "Vitamin", "Paracetamol"]
    }[active];
    return products.filter((p) => terms.some((t) => p.name.includes(t) || p.usage.includes(t))).slice(0, 3);
  }, [active]);

  const activeKit = kits.find((k) => k.name === active);

  return (
    <section className="mx-auto max-w-[104rem] px-4 py-10 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="rounded-[2rem] border border-white/80 bg-white/88 p-5 shadow-premium backdrop-blur-xl md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <span className="fm-pill"><Zap size={13} /> Interactive kit builder</span>
            <h2 className="mt-4 text-3xl font-black text-brand-dark sm:text-5xl">Build a care kit by need.</h2>
            {activeKit && (
              <p className="mt-2 text-sm font-semibold text-slate-500">{activeKit.emoji} {activeKit.desc}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {kits.map(({ name, emoji }) => (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={`rounded-full px-4 py-2 text-sm font-black transition duration-200 ${active === name ? "bg-brand-blue text-white shadow-glow" : "bg-brand-softBlue text-brand-blue hover:bg-sky-100"}`}
              >
                {emoji} {name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {items.map((product) => (
            <div key={product.id} className="soft-card group rounded-2xl p-4 transition duration-200 hover:-translate-y-1 hover:shadow-premium">
              {/* Product image */}
              <div className="relative mx-auto mb-4 aspect-square w-full max-w-[100px] overflow-hidden rounded-2xl bg-sky-50">
                <Image src={product.image} alt={product.imageAlt || product.name} fill sizes="100px" className="object-contain p-3" />
              </div>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black leading-tight">{product.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-slate-400">{product.brand}</p>
                </div>
                <Badge variant={product.rxRequired ? "yellow" : "green"}>{product.rxRequired ? "Rx" : "OTC"}</Badge>
              </div>

              <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-slate-500">{product.usage}</p>

              <div className="mt-3 flex items-end justify-between">
                <span className="text-sm font-black text-slate-900">Rs. {product.price}</span>
                <span className="text-xs font-bold text-slate-400 line-through">Rs. {product.mrp}</span>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-4 py-2.5 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#066CAB]"
              >
                <Plus size={15} /> Add to kit
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
