"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, UserRound } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search/", label: "Search", icon: Search },
  { href: "/cart/", label: "Cart", icon: ShoppingCart },
  { href: "/account/dashboard/", label: "Account", icon: UserRound }
];

export function BottomNav() {
  const pathname = usePathname();
  const count = useAppStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-[1.4rem] border border-white/80 bg-white/92 p-2 shadow-premium backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href.replace(/\/$/, "")));
        return (
          <Link key={item.href} href={item.href} className={`relative grid justify-items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-black ${active ? "bg-brand-softBlue text-brand-blue" : "text-slate-500"}`}>
            <Icon size={18} />
            <span>{item.label}</span>
            {item.label === "Cart" && count > 0 ? <span className="absolute right-3 top-1 grid size-5 place-items-center rounded-full bg-brand-yellow text-[10px] text-brand-blue">{count}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}
