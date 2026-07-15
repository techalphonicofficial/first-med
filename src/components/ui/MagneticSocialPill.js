"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function MagneticSocialPill({ href, label, hoverColorClass }) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      whileHover={{ scale: 1.05 }}
      className={`group relative flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 text-xs font-black text-slate-300 shadow-card transition-colors duration-300 ${hoverColorClass}`}
    >
      <span className="relative z-10">{label}</span>
      <div className="absolute inset-0 rounded-full bg-white dark:bg-slate-900 dark:border-slate-800/0 transition-colors duration-300 group-hover:bg-white dark:bg-slate-900 dark:border-slate-800/10" />
    </motion.a>
  );
}
