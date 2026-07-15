"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-rose-50 text-rose-500">
        <AlertTriangle size={32} />
      </div>
      <h2 className="mb-4 text-3xl font-black text-brand-dark dark:text-white">Something went wrong!</h2>
      <p className="mb-8 text-sm font-semibold text-slate-500 dark:text-white">
        We encountered an unexpected error while loading this page.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition"
      >
        <RefreshCw size={16} /> Try again
      </button>
    </div>
  );
}
