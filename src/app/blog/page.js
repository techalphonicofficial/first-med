import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { blogs } from "@/data/blogs";

const categories = ["All", "Seasonal Care", "Medicine Safety", "Self-Care Routines"];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      {/* Featured Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-softBlue p-8 shadow-soft md:p-14 lg:p-20 dark:bg-slate-900/50 dark:border dark:border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue px-3 py-1 text-xs font-black text-white">
            <ShieldCheck size={14} /> Medically Reviewed
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight md:text-5xl lg:text-6xl text-slate-900 dark:text-white">
            Health notes & pharmacy insights.
          </h1>
          <p className="mt-4 text-lg font-semibold leading-8 text-slate-600 dark:text-white">
            Editorial space for product education, pharmacy safety, seasonal care and wellness explainers.
          </p>
          <div className="mt-8">
            <Button href="/products">Browse essentials</Button>
          </div>
        </div>
        
        {/* Decorative graphic */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
          <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-brand-blue blur-3xl" />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-12 no-scrollbar flex gap-2 overflow-auto pb-4">
        {categories.map((cat, i) => (
          <button key={cat} className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-black transition ${i === 0 ? "bg-brand-dark text-white" : "bg-sky-50 text-slate-600 hover:bg-sky-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((article) => (
          <article key={article.id} className="soft-card bg-white dark:bg-slate-900/60 dark:border dark:border-slate-800 group flex flex-col overflow-hidden rounded-[2rem] transition hover:-translate-y-1 hover:shadow-premium">
            {/* Image area */}
            <div className={`relative h-56 w-full ${article.bg} p-8`}>
              <Image 
                src={article.img} 
                alt="" 
                fill 
                className={`object-contain p-8 transition duration-500 group-hover:scale-105 ${article.id === 2 ? "brightness-0 invert opacity-50" : ""}`} 
              />
              <span className="absolute left-4 top-4 rounded-full bg-white dark:bg-slate-900 dark:border-slate-800/90 px-3 py-1.5 text-xs font-black text-brand-dark dark:text-white backdrop-blur-md">
                {article.category}
              </span>
            </div>
            
            {/* Content area */}
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-xl font-black leading-tight text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-sky-400 transition">
                {article.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-slate-500 dark:text-white">
                {article.excerpt}
              </p>
              
              <div className="mt-auto pt-6 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-white">
                  <Clock size={14} /> {article.time}
                </span>
                <Link href={`/blog/${article.slug}`} className="flex items-center gap-1 text-sm font-black text-brand-blue">
                  Read <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
