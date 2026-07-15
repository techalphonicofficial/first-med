"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-9 w-[100px] animate-pulse items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800" />
    );
  }

  const options = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "system", icon: Monitor, label: "System" },
    { value: "dark", icon: Moon, label: "Dark" },
  ];

  return (
    <div className="relative flex items-center rounded-full bg-slate-100 p-1 shadow-inner dark:bg-slate-800">
      {options.map(({ value, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`relative flex h-7 w-9 items-center justify-center rounded-full transition-colors z-10 ${
              isActive ? "text-brand-blue dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-white dark:hover:text-slate-200"
            }`}
            aria-label={`Switch to ${value} theme`}
          >
            {isActive && (
              <motion.div
                layoutId="theme-toggle"
                className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-slate-700"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon size={14} className="relative z-10" />
          </button>
        );
      })}
    </div>
  );
}
