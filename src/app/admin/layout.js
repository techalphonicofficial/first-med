"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Building2, Warehouse, Package, Pill, BarChart3, Settings } from "lucide-react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/vendors", label: "Vendors", icon: Building2 },
  { href: "/admin/warehouses", label: "Warehouses", icon: Warehouse },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/prescriptions", label: "Prescriptions", icon: Pill },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="soft-card h-fit rounded-2xl p-4 sticky top-24">
          <div className="px-2 pb-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Platform</p>
            <h2 className="mt-2 text-lg font-black text-slate-900 dark:text-white">Admin Control</h2>
          </div>
          <div className="grid gap-1.5">
            {adminLinks.map(({ href, label, icon: Icon }) => {
              const selected = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black transition ${
                    selected ? "bg-brand-blue text-white shadow-glow" : "text-slate-600 dark:text-white hover:bg-sky-50 hover:text-brand-blue"
                  }`}
                >
                  <Icon size={16} className={selected ? "text-white" : "text-brand-blue"} />
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-8 px-2 pb-2">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-white">System</p>
          </div>
          <div className="grid gap-1.5">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black text-slate-600 dark:text-white hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 transition"
            >
              <Settings size={16} className="text-slate-400 dark:text-white" />
              <span className="truncate">Settings</span>
            </Link>
          </div>
        </aside>

        <main className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
