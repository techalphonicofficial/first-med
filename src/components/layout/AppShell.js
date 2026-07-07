"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { CartFlyLayer } from "@/components/cart/CartFlyLayer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { ProtectedNotice } from "@/components/layout/ProtectedNotice";
import { BottomNav } from "@/components/layout/BottomNav";
import { GlobalSearch } from "@/components/layout/GlobalSearch";

const nav = [
  ["Products", "/products"],
  ["OTC", "/products?type=OTC"],
  ["Self care", "/products?category=Hair%20Care"],
  ["Prescription", "/prescription"],
  ["Membership", "/membership"]
];

const megaMenuCategories = [
  { name: "Health Resource Center", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /></svg>, href: "/products?category=Health%20Resource%20Center" },
  { name: "Pet Care", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v2H6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V10a3 3 0 0 0-3-3h-3V5a3 3 0 0 0-3-3z" /><path d="M9 7h6" /></svg>, href: "/products?category=Pet%20Care" },
  { name: "Hair Care", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18" /><path d="M8 8h8" /><path d="M8 12h8" /><path d="M8 16h8" /></svg>, href: "/products?category=Hair%20Care" },
  { name: "Fitness & Health", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>, href: "/products?category=Fitness%20%26%20Health" },
  { name: "Sexual Wellness", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>, href: "/products?category=Sexual%20Wellness" },
  { name: "Homeopathy", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><line x1="5.52" y1="16" x2="18.48" y2="16" /></svg>, href: "/products?category=Homeopathy" },
  { name: "Vitamins & Nutrition", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2L21 5.92a2.12 2.12 0 0 0-3-3L4.5 16.5z" /><path d="m12 15 3-3" /></svg>, href: "/products?category=Vitamins%20%26%20Nutrition" },
  { name: "Supports & Braces", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><line x1="9" y1="4" x2="9" y2="20" /><line x1="15" y1="4" x2="15" y2="20" /></svg>, href: "/products?category=Supports%20%26%20Braces" },
  { name: "Immunity Boosters", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, href: "/products?category=Immunity%20Boosters" },
];

const footerLinks = [
  ["Popular shelves", [["Medicines", "/products/"], ["Wellness", "/products/?category=Vitamins%20%26%20Nutrition"], ["Self care", "/products/?category=Personal%20Care"]]],
  ["Account", [["Orders", "/account/orders/"], ["Wishlist", "/account/wishlist/"], ["Addresses", "/account/addresses/"], ["Family", "/account/family/"], ["Payments", "/account/payment-methods/"], ["Invoices", "/account/invoices/"], ["Notifications", "/account/notifications/"]]],
  ["Workspaces", [["Vendor", "/vendor/dashboard"], ["Warehouse", "/warehouse"], ["Delivery", "/delivery/dashboard"], ["Admin", "/admin"]]],
  ["Company", [["About", "/about/"], ["Contact", "/contact/"], ["Support", "/support/"], ["Privacy", "/privacy-policy/"], ["Terms", "/terms-and-conditions/"]]]
];

export function AppShell({ children }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useAppStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <>
      <CartFlyLayer />
      <CartDrawer />
      <ScrollProgress />
      <ToastViewport />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/80 backdrop-blur-xl print:hidden">
        <nav className="mx-auto flex h-16 max-w-[104rem] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 font-black text-brand-blue">
            <Image src="/firstmed-logo.png" alt="FirstMED" width={116} height={34} priority className="h-9 w-auto" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex">
            {nav.map(([label, href]) => {
              const base = href.split("?")[0];
              const active = pathname === base || (base !== "/" && pathname.startsWith(base));
              return (
                <Link
                  key={label}
                  href={href}
                  className={`relative pb-1 transition-colors duration-150 ${active ? "text-brand-blue" : "hover:text-brand-blue"}`}
                >
                  {label}
                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand-blue" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              id="nav-search-btn"
              className="hidden rounded-full bg-sky-50 p-3 text-brand-blue transition hover:bg-sky-100 sm:inline-flex"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <Link
              href="/account/dashboard"
              id="nav-account-btn"
              className="hidden rounded-full bg-sky-50 p-3 text-brand-blue transition hover:bg-sky-100 sm:inline-flex"
              aria-label="Account"
            >
              <UserRound size={18} />
            </Link>
            <Link
              href="/cart"
              id="nav-cart-btn"
              data-cart-target
              className="relative rounded-full bg-brand-blue p-3 text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-premium"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-yellow px-1 text-xs font-black text-brand-blue">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              id="nav-menu-btn"
              className="rounded-full bg-sky-50 p-3 text-brand-blue transition hover:bg-sky-100 md:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
        {/* Horizontal Mega Menu */}
        <div className="hidden border-t border-sky-100/50 bg-slate-50/80 backdrop-blur-md lg:block">
          <div className="mx-auto max-w-[104rem] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div className="flex items-center gap-3 overflow-x-auto py-3 no-scrollbar">
              {megaMenuCategories.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group flex shrink-0 items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-[13px] font-black text-slate-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:bg-sky-50 hover:text-brand-blue hover:shadow-card"
                >
                  <span className="flex h-4 w-4 items-center justify-center text-slate-400 transition-colors group-hover:text-brand-blue">
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <button
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            />
            {/* Drawer panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 flex h-full w-[min(320px,100vw)] flex-col bg-white shadow-premium"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-sky-100 p-5">
                <Image src="/firstmed-logo.png" alt="FirstMED" width={100} height={28} className="h-7 w-auto" />
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full bg-sky-50 p-2 text-brand-blue"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-auto p-5">
                <div className="grid gap-2">
                  {nav.map(([label, href]) => {
                    const base = href.split("?")[0];
                    const active = pathname === base || (base !== "/" && pathname.startsWith(base));
                    return (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setDrawerOpen(false)}
                        className={`rounded-2xl px-4 py-3 text-sm font-black transition ${active ? "bg-brand-blue text-white" : "bg-sky-50 text-slate-700 hover:bg-sky-100"}`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>

                {/* Quick links */}
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setDrawerOpen(false); setSearchOpen(true); }}
                    className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-slate-600 shadow-card hover:text-brand-blue"
                  >
                    Search
                  </button>
                  {[["Cart", "/cart"], ["Account", "/account/dashboard"], ["Wishlist", "/account/wishlist"], ["Family", "/account/family"], ["Payments", "/account/payment-methods"], ["Invoices", "/account/invoices"], ["Alerts", "/account/notifications"], ["Support", "/support"]].map(([label, href]) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setDrawerOpen(false)}
                      className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-slate-600 shadow-card hover:text-brand-blue"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="mb-2 px-1 text-xs font-black uppercase tracking-[0.18em] text-slate-400">Workspaces</p>
                  <div className="grid gap-2">
                    {[["Vendor", "/vendor/dashboard"], ["Warehouse", "/warehouse"], ["Delivery", "/delivery/dashboard"], ["Admin", "/admin"], ["Subscription", "/subscription"]].map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setDrawerOpen(false)}
                        className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-black text-slate-700 hover:bg-sky-100 hover:text-brand-blue"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="border-t border-sky-100 p-5">
                <p className="text-xs font-bold text-slate-400">© {new Date().getFullYear()} FirstMED. All rights reserved.</p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="print:hidden"><ProtectedNotice /></div>
      <main className="print:p-0 print:m-0 print:w-full">{children}</main>
      <BottomNav />
      <div className="print:hidden"><Footer /></div>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#effcff] via-[#e5f7ff] to-[#f9fff5] pb-20 md:pb-0">
      <div className="mx-auto max-w-[104rem] px-4 py-14 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">

          {/* Brand side */}
          <div>
            <Image src="/firstmed-logo.png" alt="FirstMED" width={122} height={36} className="h-9 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Product-first pharmacy commerce with gated prescription safety, fast delivery workflows, and calm account tools.
            </p>
            <div className="mt-5 rounded-2xl bg-brand-blue p-4 text-sm font-bold text-white shadow-soft">
              Prescription verified before restricted medicine checkout. Secure, clear, and built for repeat care.
            </div>

            {/* Social links */}
            <div className="mt-5 flex gap-3">
              {[
                ["Twitter / X", "https://twitter.com"],
                ["Instagram", "https://instagram.com"],
                ["LinkedIn", "https://linkedin.com"]
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-4 py-2 text-xs font-black text-brand-blue shadow-card hover:-translate-y-0.5 hover:shadow-premium transition duration-200"
                  aria-label={label}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="grid gap-4 sm:grid-cols-4">
            {footerLinks.map(([title, items]) => (
              <div key={title} className="rounded-2xl bg-white/75 p-5 shadow-card">
                <h3 className="text-sm font-black">{title}</h3>
                <div className="mt-3 grid gap-2 text-sm text-slate-500">
                  {items.map(([item, href]) => (
                    <Link key={item} href={href} className="font-semibold transition hover:text-brand-blue">
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-sky-100 pt-6 text-xs font-semibold text-slate-400">
          <p>© {new Date().getFullYear()} FirstMED Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-brand-blue">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-brand-blue">Terms</Link>
            <Link href="/refund-policy" className="hover:text-brand-blue">Refund policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
