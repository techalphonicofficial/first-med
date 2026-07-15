"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Clock3, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import DomeGallery from "@/components/ui/DomeGallery";

const stats = [
  { icon: ShieldCheck, label: "Verified medicines", value: "22k+", color: "text-brand-blue", bg: "bg-sky-50" },
  { icon: Star, label: "Avg. rating", value: "4.8★", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Clock3, label: "Express delivery", value: "90 min", color: "text-emerald-600", bg: "bg-emerald-50" },
];

const prescriptionItems = [
  { Icon: ShieldCheck, label: "Prescription safety lock", color: "text-brand-yellow" },
  { Icon: Sparkles, label: "Daily wellness bundle", color: "text-sky-300" },
  { Icon: Clock3, label: "Self-care essentials", color: "text-emerald-400" },
];

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Background decorations with Parallax */}
      <motion.div style={{ y: y1 }} className="pointer-events-none absolute -top-20 left-1/3 h-[600px] w-[600px] rounded-full bg-brand-yellow/10 blur-[120px]" />
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-brand-blue/8 blur-[100px]" />

      <div className="mx-auto grid min-h-[680px] max-w-[104rem] items-center gap-10 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-[1fr_1fr] lg:px-8 xl:px-10 2xl:px-12">

        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/70 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse-soft" />
            Medicine and wellness, delivered with care
          </span>

          <h1 className="mt-6 max-w-xl text-5xl font-black leading-[1.02] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            A smarter pharmacy{" "}
            <span className="bg-gradient-to-r from-brand-blue to-sky-500 bg-clip-text text-transparent">
              shelf
            </span>{" "}
            for everyday care.
          </h1>

          <p className="mt-5 max-w-lg text-base font-semibold leading-7 text-slate-600 dark:text-white">
            Search OTC medicines, upload prescriptions for restricted products, and build fast daily-care baskets from focused shelves.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/products" id="hero-shop-btn">Shop medicines</Button>
            <Link href="/prescription" id="hero-rx-btn" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[2.65rem] rounded-full bg-white dark:bg-slate-900 dark:border-slate-800 text-brand-blue font-[800] shadow-card hover:-translate-y-0.5 hover:bg-brand-blue hover:text-white hover:shadow-premium transition-all duration-150">
              Upload prescription
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            {stats.map(({ icon: Icon, label, value, color, bg }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="flex cursor-pointer items-center gap-2.5 rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800 px-4 py-2.5 shadow-card"
              >
                <span className={`grid h-8 w-8 place-items-center rounded-xl ${bg} ${color}`}>
                  <Icon size={15} />
                </span>
                <div>
                  <p className={`text-sm font-black ${color}`}>{value}</p>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-white">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — visual card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          {/* Glow blobs */}
          <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-brand-yellow/30 blur-3xl" />
          <div className="absolute -bottom-8 right-4 h-40 w-40 rounded-full bg-sky-300/20 blur-3xl" />

          {/* Main card - Dome Gallery */}
          <div className="relative h-[650px] w-[calc(100%+2rem)] -ml-4 lg:w-[135%] lg:-ml-[15%] lg:-mr-[20%] xl:w-[150%] xl:-ml-[25%] xl:-mr-[25%] overflow-visible z-0 -mt-10 lg:mt-0 scale-105 origin-center">
              <DomeGallery
              images={[
                { src: "/product-images/paracetamol-tablets.svg", alt: "Paracetamol", href: "/products/otc-2/" },
                { src: "/product-images/vitamin-c-tablets.svg", alt: "Vitamin C", href: "/products/otc-2/" },
                { src: "/product-images/cough-syrup.svg", alt: "Cough Syrup", href: "/products/otc-2/" }
              ]}
              grayscale={false}
              overlayBlurColor="transparent"
            />
          </div>

          {/* Floating card 1 */}
          {/* <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-4 rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800 px-4 py-3 shadow-premium"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white">Prescription</p>
            <p className="mt-0.5 text-sm font-black text-brand-blue">Ready for review ✓</p>
          </motion.div> */}

          {/* Floating card 2 */}
          {/* <motion.div
            animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 top-1/3 rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800 px-4 py-3 shadow-premium"
          >
            <p className="text-2xl font-black text-slate-950 dark:text-white">4.8 ★</p>
            <p className="text-[10px] font-bold text-slate-500 dark:text-white">User rating</p>
          </motion.div> */}

          {/* Floating badge */}
          {/* <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-3 bottom-12 rounded-2xl bg-emerald-500 px-3 py-2 shadow-premium"
          >
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-white" />
              <p className="text-xs font-black text-white">Free delivery</p>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
