"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export function GooeyNav({ items }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <div className="mx-auto max-w-[104rem] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <svg width="0" height="0" className="absolute hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div
        className="flex items-center gap-3 overflow-x-auto py-3 no-scrollbar"
        style={{ filter: "url(#goo)" }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {items.map((item, idx) => {
          let itemCategory = null;
          if (item.href.includes("?category=")) {
            itemCategory = decodeURIComponent(item.href.split("?category=")[1].split("&")[0]);
          }
          
          const isActive = currentCategory && itemCategory === currentCategory;
          const isHovered = hoveredIndex === idx;
          const isBlobbed = hoveredIndex !== null ? isHovered : isActive;

          return (
            <Link
              key={idx}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(idx)}
              className={`relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-black transition-colors z-10 shadow-sm ${
                isBlobbed ? "border-transparent" : "border-sky-100 bg-white"
              }`}
              style={{
                color: isBlobbed ? "#fff" : (isActive ? "#0284c7" : "#475569"),
              }}
            >
              {isBlobbed && (
                <motion.div
                  layoutId="goo-blob"
                  className="absolute inset-0 z-0 rounded-full bg-brand-blue"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className={`flex h-4 w-4 items-center justify-center transition-colors ${isBlobbed ? "text-white" : "text-brand-blue"}`}>
                  {item.icon}
                </span>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
