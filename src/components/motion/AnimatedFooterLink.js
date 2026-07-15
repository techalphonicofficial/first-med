"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function AnimatedFooterLink({ href, children }) {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="block w-fit"
    >
      <Link href={href} className="group flex items-center gap-2 font-semibold text-slate-500 dark:text-white transition-colors hover:text-brand-blue dark:hover:text-sky-400">
        <motion.span
          variants={{
            initial: { x: 0 },
            hover: { x: 6 }
          }}
        >
          {children}
        </motion.span>
        <motion.span
          variants={{
            initial: { opacity: 0, x: -5 },
            hover: { opacity: 1, x: 5 }
          }}
          className="text-brand-blue dark:text-sky-400 font-bold"
        >
          &rarr;
        </motion.span>
      </Link>
    </motion.div>
  );
}
