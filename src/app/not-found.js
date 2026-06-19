import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-pulse rounded-full bg-sky-100 blur-3xl" />
        <h1 className="relative text-[8rem] font-black leading-none text-brand-blue md:text-[10rem]">
          404
        </h1>
      </div>
      
      <h2 className="mb-4 text-3xl font-black text-brand-dark md:text-4xl">Page not found</h2>
      <p className="mb-10 text-lg font-semibold text-slate-500">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition">
          <Home size={16} /> Back to Home
        </Link>
        <Link href="/products" className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-brand-blue shadow-card hover:bg-sky-50 transition">
          <Search size={16} /> Browse Products
        </Link>
      </div>
    </div>
  );
}
