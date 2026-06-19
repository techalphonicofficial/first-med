"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-blue shadow-[0_0_22px_rgba(8,120,190,0.35)]"
        style={{ scaleX }}
      />
    </div>
  );
}
