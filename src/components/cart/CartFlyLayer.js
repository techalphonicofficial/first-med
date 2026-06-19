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
      }, reduceMotion ? 650 : 1150);
    }
    window.addEventListener("firstmed:cart-fly", onFly);
    return () => window.removeEventListener("firstmed:cart-fly", onFly);
  }, [reduceMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {flights.map((flight) => (
          <motion.div
            key={flight.id}
            className="absolute left-0 top-0 flex h-14 w-[min(220px,calc(100vw-32px))] items-center gap-2 rounded-full border border-white/85 bg-white/95 px-2.5 shadow-premium backdrop-blur-xl"
            initial={reduceMotion ? { x: flight.target.x - 110, y: flight.target.y + 18, opacity: 0, scale: 0.96 } : { x: flight.origin.x - 110, y: flight.origin.y - 28, opacity: 0, scale: 0.82, rotate: -2 }}
            animate={reduceMotion ? { x: flight.target.x - 110, y: flight.target.y + 18, opacity: 1, scale: 1 } : {
              x: [flight.origin.x - 110, (flight.origin.x + flight.target.x) / 2 - 90, flight.target.x - 42],
              y: [flight.origin.y - 28, Math.min(flight.origin.y, flight.target.y) - 92, flight.target.y - 28],
              opacity: [0, 1, 1],
              scale: [0.82, 1.04, 0.38],
              rotate: [-2, 3, 0]
            }}
            exit={{ opacity: 0, scale: 0.34 }}
            transition={{ duration: reduceMotion ? 0.18 : 0.82, ease: "easeInOut" }}
          >
            <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-softBlue">
              <span className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${flight.image})` }} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-black text-brand-dark">{flight.name}</span>
              <span className="block text-[10px] font-black uppercase tracking-[0.12em] text-brand-blue">Added to cart</span>
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
