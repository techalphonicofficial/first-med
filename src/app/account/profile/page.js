"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Camera, LogOut, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "Akash Sharma",
      email: "akash@example.com",
      phone: "+91 98765 43210"
    }
  });

  const handleLogout = () => {
    // Clear any auth tokens / session storage here
    router.push("/login");
  };

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest text-brand-blue">Account</p>
        <h1 className="mt-1 text-4xl font-black">Profile Settings</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="grid gap-8">
          {/* Avatar Form */}
          <div className="soft-card rounded-[2rem] p-6 sm:p-8">
            <h2 className="mb-6 text-xl font-black">Personal information</h2>
            
            <div className="mb-8 flex items-center gap-6">
              <div className="relative grid h-24 w-24 place-items-center rounded-full bg-brand-blue text-3xl font-black text-white shadow-soft">
                A
                <button className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full bg-white dark:bg-slate-900 dark:border-slate-800 text-brand-blue shadow-card hover:bg-sky-50 transition">
                  <Camera size={14} />
                </button>
              </div>
              <div>
                <p className="font-black">Profile photo</p>
                <p className="text-sm font-semibold text-slate-500 dark:text-white">JPG or PNG under 2MB</p>
              </div>
            </div>

            <form className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-black">
                  Full name
                  <input {...register("name", { required: true })} className="rounded-xl border dark:border-slate-800 border dark:border-slate-800-sky-100 bg-sky-50 dark:bg-slate-900 px-4 py-3 font-semibold outline-brand-blue" />
                </label>
                <label className="grid gap-2 text-sm font-black">
                  Mobile number
                  <input {...register("phone", { required: true })} className="rounded-xl border dark:border-slate-800 border dark:border-slate-800-sky-100 bg-sky-50 dark:bg-slate-900 px-4 py-3 font-semibold outline-brand-blue" />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-black">
                Email address
                <input {...register("email", { required: true })} className="rounded-xl border dark:border-slate-800 border dark:border-slate-800-sky-100 bg-sky-50 dark:bg-slate-900 px-4 py-3 font-semibold outline-brand-blue" />
              </label>
              <div className="mt-2">
                <Button><Save size={16} /> Save changes</Button>
              </div>
            </form>
          </div>

          {/* Preferences */}
          <div className="soft-card rounded-[2rem] p-6 sm:p-8">
            <h2 className="mb-6 text-xl font-black">Preferences</h2>
            <div className="grid gap-4">
              {[
                { label: "Order updates (SMS)", desc: "Delivery ETA and status changes" },
                { label: "Care reminders", desc: "Refill reminders for saved prescriptions" },
                { label: "Marketing emails", desc: "Offers, new products and seasonal kits" }
              ].map(({ label, desc }, i) => (
                <label key={label} className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border dark:border-slate-800 border dark:border-slate-800-sky-50 p-4 transition hover:bg-sky-50 dark:bg-slate-900">
                  <div>
                    <p className="font-black">{label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-500 dark:text-white">{desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked={i < 2} className="mt-1 h-5 w-5 accent-brand-blue" />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Danger Zone */}
        <div className="grid gap-6 h-fit">
          <div className="soft-card rounded-[2rem] p-6">
            <h2 className="mb-4 text-lg font-black">Password</h2>
            <p className="mb-4 text-sm font-semibold text-slate-500 dark:text-white">Update your account password securely.</p>
            <Link href="/login" className="inline-block rounded-full bg-slate-100 px-5 py-2.5 text-sm font-black text-slate-600 dark:text-white hover:bg-slate-200 transition">Change password</Link>
          </div>

          <div className="rounded-[2rem] border-2 border-rose-100 bg-rose-50/50 p-6">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-black text-rose-600">
              <Trash2 size={18} /> Danger zone
            </h2>
            <p className="mb-5 text-sm font-semibold text-rose-700/70">
              Permanently delete your account, saved addresses, and active prescriptions. This cannot be undone.
            </p>
            <button className="rounded-xl bg-white dark:bg-slate-900 dark:border-slate-800 px-5 py-2.5 text-sm font-black text-rose-600 shadow-sm hover:bg-rose-50 transition">
              Delete account
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2.5 rounded-[2rem] border-2 border-rose-200 bg-rose-50 px-6 py-4 text-sm font-black text-rose-600 transition hover:bg-rose-100 hover:border-rose-300 hover:shadow-sm active:scale-95"
          >
            <LogOut size={18} />
            Log out of your account
          </button>
        </div>
      </div>
    </div>
  );
}
