"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function TextReveal({ text, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (!text) return null;

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", damping: 14, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -45,
      transition: { type: "spring", damping: 14, stiffness: 100 },
    },
  };

  return (
    <motion.h2
      ref={ref}
      style={{ perspective: "1000px" }}
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.25em] inline-block origin-bottom pb-1">
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}
