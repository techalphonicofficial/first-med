"use client";

import { ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { protectedRoutes } from "@/constants/routes";
import { useAppStore } from "@/store/useAppStore";
import { canAccessPath, roleOptions } from "@/services/mockPlatform";

export function ProtectedNotice() {
  const pathname = usePathname();
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const role = useAppStore((state) => state.session.role);
  const setRole = useAppStore((state) => state.setRole);
  const allowed = canAccessPath(role, pathname);
  if (!isProtected) return null;
  return (
    <div className={`border-b ${allowed ? "border-brand-blue/10 bg-brand-softBlue/80" : "border-rose-100 bg-rose-50"}`}>
      <div className={`mx-auto flex max-w-[104rem] flex-wrap items-center gap-3 px-4 py-2 text-xs font-black sm:px-6 lg:px-8 xl:px-10 ${allowed ? "text-brand-blue" : "text-rose-700"}`}>
        <ShieldCheck size={15} />
        <span>{allowed ? "Mock protected workspace access granted" : "Mock permission warning: this role would be blocked in production"}</span>
        <label className="ml-auto flex items-center gap-2">
          Preview role
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="rounded-full border border-white/80 bg-white dark:bg-slate-900 dark:border-slate-800 px-3 py-1 text-xs font-black text-brand-blue shadow-sm outline-brand-blue"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
