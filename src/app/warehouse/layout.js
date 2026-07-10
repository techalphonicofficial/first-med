"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PackageSearch, ArrowLeftRight, Download, Send, ClipboardCheck, LogOut } from "lucide-react";

const warehouseLinks = [
  { href: "/warehouse/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/warehouse/inventory", label: "Inventory", icon: PackageSearch },
  { href: "/warehouse/transfers", label: "Transfers", icon: ArrowLeftRight },
  { href: "/warehouse/receiving", label: "Receiving", icon: Download },
  { href: "/warehouse/dispatch", label: "Dispatch", icon: Send },
  { href: "/warehouse/audits", label: "Audits", icon: ClipboardCheck },
];

export default function WarehouseLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="soft-card h-fit rounded-2xl p-4 sticky top-24">
          <div className="px-2 pb-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Warehouse</p>
            <h2 className="mt-2 text-lg font-black text-slate-900 dark:text-slate-100">Operator Portal</h2>
          </div>
          <div className="grid gap-1.5">
            {warehouseLinks.map(({ href, label, icon: Icon }) => {
              const selected = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black transition ${
                    selected ? "bg-brand-blue text-white shadow-glow" : "text-slate-600 dark:text-slate-400 hover:bg-sky-50 hover:text-brand-blue"
                  }`}
                >
                  <Icon size={16} className={selected ? "text-white" : "text-brand-blue"} />
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-8 px-2 pb-2 border-t border-sky-50 pt-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Current Hub</p>
            <p className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-300">North Hub • Delhi NCR</p>
          </div>
          
          <div className="mt-4 grid gap-1.5">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black text-rose-600 hover:bg-rose-50 transition">
              <LogOut size={16} />
              <span className="truncate">Sign Out</span>
            </button>
          </div>
        </aside>

        <main className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
