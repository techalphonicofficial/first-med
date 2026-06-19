"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/useAppStore";

export function AuthCard({ mode }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const pushToast = useAppStore((state) => state.pushToast);
  function submit() {
    pushToast({ type: "success", title: `${mode} demo submitted`, text: "Connect this form to your auth API for production." });
  }
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-10">
      <form onSubmit={handleSubmit(submit)} className="w-full rounded-2xl bg-white p-6 shadow-card">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">FirstMED account</p>
        <h1 className="mt-2 text-3xl font-black">{mode}</h1>
        <div className="mt-6 grid gap-4">
          {mode === "Register" && (
            <label className="grid gap-2 text-sm font-black">
              Full name
              <input {...register("name", { required: "Full name is required" })} placeholder="Full name" className={`rounded-2xl border bg-sky-50 px-4 py-3 font-semibold ${errors.name ? "border-rose-300" : "border-sky-100"}`} />
              {errors.name ? <span className="text-xs font-bold text-rose-600">{errors.name.message}</span> : null}
            </label>
          )}
          <label className="grid gap-2 text-sm font-black">
            Email or mobile
            <input {...register("email", { required: "Email or mobile is required" })} placeholder="Email or mobile number" className={`rounded-2xl border bg-sky-50 px-4 py-3 font-semibold ${errors.email ? "border-rose-300" : "border-sky-100"}`} />
            {errors.email ? <span className="text-xs font-bold text-rose-600">{errors.email.message}</span> : null}
          </label>
          {!["Forgot password", "Verify account"].includes(mode) && (
            <label className="grid gap-2 text-sm font-black">
              Password
              <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Use at least 6 characters" } })} type="password" placeholder="Password" className={`rounded-2xl border bg-sky-50 px-4 py-3 font-semibold ${errors.password ? "border-rose-300" : "border-sky-100"}`} />
              {errors.password ? <span className="text-xs font-bold text-rose-600">{errors.password.message}</span> : null}
            </label>
          )}
          <Button type="submit" className="w-full">{mode}</Button>
          <button type="button" className="rounded-full bg-sky-50 px-5 py-3 text-sm font-black text-brand-blue">Continue with Google</button>
          <button type="button" className="rounded-full bg-sky-50 px-5 py-3 text-sm font-black text-brand-blue">Mobile OTP login</button>
        </div>
      </form>
    </div>
  );
}
