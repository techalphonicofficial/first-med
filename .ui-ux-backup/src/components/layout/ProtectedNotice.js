"use client";

import { ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { protectedRoutes } from "@/constants/routes";

export function ProtectedNotice() {
  const pathname = usePathname();
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (!isProtected) return null;
  return (
    <div className="border-b border-brand-blue/10 bg-brand-softBlue/80">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 text-xs font-black text-brand-blue sm:px-6 lg:px-8">
        <ShieldCheck size={15} />
        Protected route shell: currently unlocked for frontend demo.
      </div>
    </div>
  );
}
