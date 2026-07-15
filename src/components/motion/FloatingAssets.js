"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Pill, Leaf, HeartPulse, Droplet } from "lucide-react";

export function FloatingAssets() {
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -250]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Floating Pill */}
      <motion.div
        style={{ y: y1 }}
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[5%] grid h-32 w-32 place-items-center rounded-full bg-white dark:bg-slate-900 dark:border-slate-800/40 shadow-soft backdrop-blur-xl border border-white/60 text-sky-400"
      >
        <Pill size={48} strokeWidth={1.5} />
      </motion.div>

      {/* Floating Leaf */}
      <motion.div
        style={{ y: y2 }}
        animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] right-[8%] grid h-24 w-24 place-items-center rounded-3xl bg-emerald-50/50 shadow-soft backdrop-blur-xl border border-emerald-100/60 text-emerald-500"
      >
        <Leaf size={40} strokeWidth={1.5} />
      </motion.div>

      {/* Floating Heart */}
      <motion.div
        style={{ y: y3 }}
        animate={{ y: [0, -25, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[70%] left-[10%] grid h-28 w-28 place-items-center rounded-full bg-rose-50/40 shadow-soft backdrop-blur-xl border border-rose-100/60 text-rose-400"
      >
        <HeartPulse size={48} strokeWidth={1.5} />
      </motion.div>

      {/* Floating Droplet */}
      <motion.div
        style={{ y: y4 }}
        animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[25%] right-[15%] grid h-20 w-20 place-items-center rounded-[2rem] bg-amber-50/40 shadow-soft backdrop-blur-xl border border-amber-100/60 text-amber-500"
      >
        <Droplet size={36} strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}
