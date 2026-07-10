"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Bell, CreditCard, Heart, LogOut, MapPin, Package, ReceiptText, ShieldCheck, UsersRound, User } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function AccountDashboardPage() {
  const router = useRouter();
  const prescription = useAppStore((state) => state.prescription);

  const handleLogout = () => {
    // Clear any auth tokens / session storage here
    router.push("/login");
  };
  
  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main Content */}
        <div className="grid gap-6">
          {/* Greeting Hero */}
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-navy p-8 sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-blue/30 blur-[80px]" />
            <div className="relative z-10">
              <span className="mb-2 block text-sm font-black uppercase tracking-widest text-brand-yellow">Welcome back</span>
              <h1 className="text-4xl font-black text-white md:text-5xl">Akash Sharma</h1>
              <p className="mt-2 text-sm font-semibold text-sky-200">akash@example.com · +91 98765 43210</p>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/account/profile" className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-black text-white backdrop-blur-md hover:bg-white/20 transition">Edit profile</Link>
              </div>
            </div>
          </div>

          {/* Rx Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] bg-sky-50 p-6 border border-sky-100">
            <div className="flex items-center gap-4">
              <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${prescription.status === "approved" ? "bg-emerald-100 text-emerald-600" : "bg-white text-brand-blue shadow-sm"}`}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 className="text-lg font-black text-brand-dark dark:text-white">Prescription Status</h2>
                <p className="text-sm font-semibold text-slate-500">
                  {prescription.status === "approved" ? "Verified and ready for Rx checkout." : "No active prescription uploaded."}
                </p>
              </div>
            </div>
            <Link href="/prescription" className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-brand-blue shadow-sm hover:shadow-md transition">
              {prescription.status === "approved" ? "View details" : "Upload now"}
            </Link>
          </div>

          {/* Recent Orders Preview */}
          <div className="soft-card rounded-[2rem] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-black">Recent orders</h2>
              <Link href="/account/orders" className="flex items-center gap-1 text-sm font-black text-brand-blue hover:underline">View all <ArrowRight size={16} /></Link>
            </div>
            
            <div className="grid gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-50 p-5 transition hover:bg-sky-50/50">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-100 text-brand-blue"><Package size={20} /></div>
                  <div>
                    <p className="font-black">FM-3041</p>
                    <p className="text-sm font-semibold text-slate-500">3 items · Rs. 430</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-softBlue px-3 py-1 text-xs font-black text-brand-blue">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" /> Out for delivery
                  </span>
                  <Link href="/account/orders/FM-3041" className="text-sm font-black text-brand-blue hover:underline">Track</Link>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-50 p-5 transition hover:bg-sky-50/50">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-50 text-slate-400"><Package size={20} /></div>
                  <div>
                    <p className="font-black">FM-2908</p>
                    <p className="text-sm font-semibold text-slate-500">1 item · Rs. 145</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600">Delivered</span>
                  <button className="text-sm font-black text-brand-blue hover:underline">Reorder</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="grid gap-6">
          {/* Quick Links */}
          <div className="soft-card rounded-[2rem] p-6">
            <h2 className="mb-4 text-lg font-black">Your Account</h2>
            <div className="grid gap-2">
              {[
                { label: "Orders", href: "/account/orders", icon: Package },
                { label: "Wishlist", href: "/account/wishlist", icon: Heart },
                { label: "Addresses", href: "/account/addresses", icon: MapPin },
                { label: "Family Profiles", href: "/account/family", icon: UsersRound },
                { label: "Payment Methods", href: "/account/payment-methods", icon: CreditCard },
                { label: "Invoices", href: "/account/invoices", icon: ReceiptText },
                { label: "Notifications", href: "/account/notifications", icon: Bell },
                { label: "Profile Settings", href: "/account/profile", icon: User },
              ].map(({ label, href, icon: Icon }) => (
                <Link key={label} href={href} className="flex items-center gap-3 rounded-xl p-3 text-sm font-bold text-slate-600 dark:text-slate-400 transition hover:bg-sky-50 hover:text-brand-blue">
                  <Icon size={18} className="text-brand-blue" /> {label}
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-sm font-bold text-rose-500 transition hover:bg-rose-50 hover:text-rose-600"
              >
                <LogOut size={18} className="text-rose-500" /> Log out
              </button>
            </div>
          </div>

          {/* Reminders */}
          <div className="soft-card rounded-[2rem] p-6">
            <div className="mb-4 flex items-center gap-2">
              <Bell size={18} className="text-amber-500" />
              <h2 className="text-lg font-black">Care reminders</h2>
            </div>
            <div className="rounded-xl border border-sky-50 bg-sky-50/50 p-4">
              <p className="text-sm font-black">Complete your profile</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">Add your default delivery address to speed up your next checkout.</p>
              <Link href="/account/addresses" className="mt-3 inline-block text-xs font-black text-brand-blue hover:underline">Add address →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
