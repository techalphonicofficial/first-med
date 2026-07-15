"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

function cartTarget() {
  const target = Array.from(document.querySelectorAll("[data-cart-target]")).find((node) => {
    const rect = node.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
  if (!target) return { x: window.innerWidth - 44, y: 42 };
  const rect = target.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function isPoint(point) {
  return point && Number.isFinite(point.x) && Number.isFinite(point.y);
}

export function CartFlyLayer() {
  const [flights, setFlights] = useState([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function onFly(event) {
      const detail = event instanceof CustomEvent ? event.detail : null;
      if (!detail || !isPoint(detail.origin)) return;
      const target = cartTarget();
      const flight = {
        id: `${detail.id || Date.now()}-${Math.random()}`,
        name: detail.name || "Product",
        image: detail.image || "",
        origin: detail.origin,
        target: isPoint(target) ? target : { x: window.innerWidth - 44, y: 42 }
      };
      setFlights((items) => [...items.slice(-3), flight]);
      window.setTimeout(() => {
        setFlights((items) => items.filter((item) => item.id !== flight.id));
      }, reduceMotion ? 650 : 1800);
    }
    window.addEventListener("firstmed:cart-fly", onFly);
    return () => window.removeEventListener("firstmed:cart-fly", onFly);
  }, [reduceMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {flights.map((flight) => {
          const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
          return (
          <motion.div
            key={flight.id}
            className="fixed left-0 top-0 flex h-14 w-[min(220px,calc(100vw-32px))] items-center gap-2 rounded-full border border-sky-200 bg-white dark:bg-slate-900 dark:border-slate-800 px-2.5 shadow-premium backdrop-blur-xl z-[90]"
            initial={reduceMotion ? { x: flight.target.x - 110, y: flight.target.y + 18, opacity: 0, scale: 0.96 } : { x: centerX - 110, y: -100, opacity: 0, scale: 0.6 }}
            animate={reduceMotion ? { x: flight.target.x - 110, y: flight.target.y + 18, opacity: 1, scale: 1 } : {
              x: [centerX - 110, centerX - 110, centerX - 110, flight.target.x - 42],
              y: [-100, 50, 50, flight.target.y - 28],
              opacity: [0, 1, 1, 1],
              scale: [0.6, 1.05, 1, 0.35],
              rotate: [0, 2, -1, 0]
            }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ 
              duration: reduceMotion ? 0.18 : 1.6,
              times: [0, 0.25, 0.7, 1],
              ease: "easeInOut" 
            }}
          >
            <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-softBlue">
              <span className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${flight.image})` }} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-black text-brand-dark dark:text-white">{flight.name}</span>
              <span className="block text-[10px] font-black uppercase tracking-[0.12em] text-brand-blue">Added to cart</span>
            </span>
          </motion.div>
        )})}
      </AnimatePresence>
    </div>
  );
}
