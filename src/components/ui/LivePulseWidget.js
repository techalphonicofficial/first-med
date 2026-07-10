"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export function LivePulseWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="absolute bottom-[10%] right-[5%] lg:right-[15%] z-20 flex items-center gap-4 rounded-3xl bg-white/70 p-4 shadow-premium backdrop-blur-2xl border border-white/80"
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-rose-50 text-rose-500 shadow-inner relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-rose-500/20"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <Activity size={24} strokeWidth={2.5} className="relative z-10" />
      </div>
      <div className="hidden sm:block">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Network Live</p>
        <p className="text-sm font-black text-slate-800 dark:text-slate-200">14 active dispatches</p>
      </div>
      
      {/* Animated Heartbeat SVG */}
      <div className="ml-2 w-16 h-8 hidden sm:block">
        <svg viewBox="0 0 100 40" className="h-full w-full stroke-rose-500" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            d="M 0,20 L 20,20 L 30,5 L 45,35 L 55,10 L 65,25 L 75,20 L 100,20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{
              duration: 2.5,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0.2
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
