"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

export function ToastViewport() {
  const toasts = useAppStore((state) => state.toasts);
  const dismissToast = useAppStore((state) => state.dismissToast);
  return (
    <div className="fixed right-4 top-20 z-[90] grid w-[min(360px,calc(100vw-32px))] gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 24, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.96 }}
            className={`rounded-2xl border bg-white/95 p-4 shadow-premium backdrop-blur-xl ${toast.type === "error" ? "border-rose-100" : toast.type === "success" ? "border-emerald-100" : "border-sky-100"}`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 size-2 rounded-full ${toast.type === "error" ? "bg-rose-500" : toast.type === "success" ? "bg-emerald-500" : "bg-brand-blue"}`} />
              <div className="min-w-0 flex-1">
                <p className="font-black text-brand-dark">{toast.title}</p>
                {toast.text ? <p className="mt-1 text-sm font-semibold leading-5 text-brand-gray">{toast.text}</p> : null}
              </div>
              <button onClick={() => dismissToast(toast.id)} className="rounded-full bg-sky-50 p-1.5 text-brand-blue" aria-label="Dismiss notification">
                <X size={15} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
