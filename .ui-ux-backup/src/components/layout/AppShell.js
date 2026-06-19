"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HeartPulse, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { CartFlyLayer } from "@/components/cart/CartFlyLayer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { ProtectedNotice } from "@/components/layout/ProtectedNotice";
import { BottomNav } from "@/components/layout/BottomNav";

const nav = [
  ["Products", "/products"],
  ["OTC", "/products?category=Health%20Rescue%20Center"],
  ["Self care", "/products?category=Hair%20Care"],
  ["Prescription", "/prescription"]
];

export function AppShell({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const cartCount = useAppStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <>
      <CartFlyLayer />
      <CartDrawer />
      <ScrollProgress />
      <ToastViewport />
      <header className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/82 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-[104rem] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2 font-black text-brand-blue">
            <Image src="/firstmed-logo.png" alt="FirstMED" width={116} height={34} priority className="h-9 w-auto" />
          </Link>
          <div className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex">
            {nav.map(([label, href]) => (
              <Link key={label} href={href} className={pathname === href ? "text-brand-blue" : "hover:text-brand-blue"}>
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/search" className="hidden rounded-full bg-sky-50 p-3 text-brand-blue sm:inline-flex" aria-label="Search">
              <Search size={18} />
            </Link>
            <Link href="/account/dashboard" className="hidden rounded-full bg-sky-50 p-3 text-brand-blue sm:inline-flex" aria-label="Account">
              <UserRound size={18} />
            </Link>
            <Link href="/cart" data-cart-target className="relative rounded-full bg-brand-blue p-3 text-white" aria-label="Cart">
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-yellow px-1 text-xs font-black text-brand-blue">{cartCount}</span>}
            </Link>
            <button className="rounded-full bg-sky-50 p-3 text-brand-blue md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
              <Menu size={18} />
            </button>
          </div>
        </nav>
        {open && (
          <div className="grid gap-2 border-t border-sky-100 bg-white p-4 text-sm font-bold text-slate-700 md:hidden">
            {nav.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setOpen(false)} className="rounded-xl bg-sky-50 px-4 py-3">
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <ProtectedNotice />
      <main>{children}</main>
      <BottomNav />
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#effcff] via-[#e5f7ff] to-[#f9fff5]">
      <div className="mx-auto grid max-w-[104rem] gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_2fr] lg:px-8 xl:px-10 2xl:px-12">
        <div>
          <Image src="/firstmed-logo.png" alt="FirstMED" width={122} height={36} className="h-9 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            Product-first pharmacy commerce with gated prescription safety, fast delivery workflows, and calm account tools.
          </p>
          <div className="mt-5 rounded-2xl bg-brand-blue p-4 text-sm font-bold text-white shadow-soft">Prescription verified before restricted medicine checkout.</div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Popular shelves", "Medicines", "Wellness", "Self care"],
            ["Account", "Orders", "Wishlist", "Addresses"],
            ["Company", "About", "Contact", "Policies"]
          ].map(([title, ...items]) => (
            <div key={title} className="rounded-2xl bg-white/75 p-5 shadow-card">
              <h3 className="text-sm font-black">{title}</h3>
              <div className="mt-3 grid gap-2 text-sm text-slate-500">
                {items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
