"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Smartphone, CheckCircle2, Pill, PackageCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/useAppStore";

export function AuthCard({ mode }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const pushToast = useAppStore((state) => state.pushToast);
  
  function submit() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      pushToast({ type: "success", title: `${mode} successful`, text: "Connect this form to your auth API for production." });
    }, 1000);
  }
  
  const isRegister = mode === "Register";
  const isForgot = mode === "Forgot password";
  const isVerify = mode === "Verify account";
  const isReset = mode === "Reset password";
  const needsPassword = !isForgot && !isVerify;
  const passwordLabel = isReset ? "New password" : "Password";

  return (
    <div className="mx-auto grid min-h-[75vh] max-w-[104rem] items-center gap-8 px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:grid-cols-[1fr_1.1fr]">
      
      {/* Left Feature Panel */}
      <div className="hidden h-full rounded-[2.5rem] bg-brand-navy p-10 text-white shadow-premium xl:block relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-blue/30 blur-[100px]" />
        <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-brand-yellow/10 blur-[80px]" />
        
        <div className="relative z-10 flex h-full flex-col">
          <Link href="/" className="mb-12 inline-block">
            <h1 className="text-2xl font-black text-white">FirstMED</h1>
          </Link>
          
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 text-xs font-black text-brand-blue">
            <ShieldCheck size={16} /> Secure care account
          </span>
          <h1 className="mt-6 text-5xl font-black leading-tight">Keep orders, prescriptions and delivery updates in one place.</h1>
          
          <div className="mt-12 grid gap-6">
            {[
              { icon: ShieldCheck, title: "OTP-ready sign in", desc: "Passwordless access to your health workspace." },
              { icon: Pill, title: "Prescription status saved", desc: "Upload once, reorder medicines instantly." },
              { icon: PackageCheck, title: "Fast reorder and saved addresses", desc: "Skip the details on your next checkout." }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl bg-white/5 p-4 backdrop-blur-md border border-white/10">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-blue/30 text-brand-yellow">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{title}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-300">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Auth Form Panel */}
      <form onSubmit={handleSubmit(submit)} className="mx-auto w-full max-w-lg rounded-[2rem] bg-white p-8 sm:p-12 shadow-card xl:mx-0">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">FirstMED account</p>
        <h1 className="mt-2 text-4xl font-black">{mode}</h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
          {isForgot ? "Enter your registered email or mobile number and we will send recovery instructions." : isVerify ? "Enter the one-time code sent to your email or mobile number." : "Use your email, mobile number, or OTP to continue safely."}
        </p>
        
        <div className="mt-8 grid gap-5">
          {isRegister && (
            <label className="grid gap-2 text-sm font-black">
              Full name
              <input {...register("name", { required: "Full name is required" })} placeholder="Full name" className={`rounded-xl border bg-sky-50 px-4 py-3 font-semibold outline-brand-blue ${errors.name ? "border-rose-300" : "border-sky-100"}`} />
              {errors.name ? <span className="text-xs font-bold text-rose-600">{errors.name.message}</span> : null}
            </label>
          )}
          {!isReset ? (
            <label className="grid gap-2 text-sm font-black">
              {isVerify ? "Verification code" : "Email or mobile"}
              <div className="relative">
                {isVerify ? <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={17} /> : <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={17} />}
                <input {...register(isVerify ? "otp" : "email", { required: isVerify ? "Verification code is required" : "Email or mobile is required" })} placeholder={isVerify ? "6 digit code" : "Email or mobile number"} className={`w-full rounded-xl border bg-sky-50 py-3 pl-11 pr-4 font-semibold outline-brand-blue ${errors.email || errors.otp ? "border-rose-300" : "border-sky-100"}`} />
              </div>
              {errors.email ? <span className="text-xs font-bold text-rose-600">{errors.email.message}</span> : null}
              {errors.otp ? <span className="text-xs font-bold text-rose-600">{errors.otp.message}</span> : null}
            </label>
          ) : null}
          {needsPassword && (
            <label className="grid gap-2 text-sm font-black">
              {passwordLabel}
              <div className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={17} />
                <input {...register("password", { required: `${passwordLabel} is required`, minLength: { value: 6, message: "Use at least 6 characters" } })} type={showPassword ? "text" : "password"} placeholder={passwordLabel} className={`w-full rounded-xl border bg-sky-50 py-3 pl-11 pr-12 font-semibold outline-brand-blue ${errors.password ? "border-rose-300" : "border-sky-100"}`} />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-brand-blue" aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password ? <span className="text-xs font-bold text-rose-600">{errors.password.message}</span> : null}
            </label>
          )}
          {isReset ? (
            <label className="grid gap-2 text-sm font-black">
              Confirm password
              <input {...register("confirm_password", { required: "Confirm your password" })} type="password" placeholder="Confirm password" className="rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue" />
            </label>
          ) : null}
          {isRegister ? (
            <label className="flex items-start gap-3 rounded-xl bg-sky-50 p-4 text-xs font-bold text-slate-600 dark:text-slate-400 border border-sky-100">
              <input type="checkbox" {...register("terms", { required: "Accept terms to continue" })} className="mt-1 h-4 w-4 accent-brand-blue shrink-0" />
              I agree to prescription safety checks, privacy terms, and account notifications.
            </label>
          ) : null}
          
          <Button type="submit" className="mt-2 w-full text-base h-12 flex items-center justify-center gap-2" disabled={loading}>
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Processing..." : mode}
          </Button>
          
          {!isForgot && !isReset && !isVerify ? (
            <>
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-sky-100"></div>
                <span className="shrink-0 px-4 text-xs font-black text-slate-400 uppercase tracking-widest">or continue with</span>
                <div className="flex-grow border-t border-sky-100"></div>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" className="flex items-center justify-center gap-2 rounded-xl bg-white border border-sky-100 px-5 py-3 text-sm font-black text-slate-600 dark:text-slate-400 shadow-sm hover:bg-sky-50 transition">
                  {/* Google G Logo SVG */}
                  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
                  Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 rounded-xl bg-white border border-sky-100 px-5 py-3 text-sm font-black text-slate-600 dark:text-slate-400 shadow-sm hover:bg-sky-50 transition">
                  <Smartphone size={18} className="text-brand-blue" /> Mobile OTP
                </button>
              </div>
            </>
          ) : null}
          
          <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm font-black text-brand-blue">
            {mode === "Login" ? <Link href="/forgot-password" className="hover:underline">Forgot password?</Link> : <Link href="/login" className="hover:underline">Back to login</Link>}
            {mode === "Login" ? <Link href="/register" className="hover:underline">Create account</Link> : null}
            {isVerify ? <button type="button" className="hover:underline">Resend code</button> : null}
          </div>
        </div>
      </form>
    </div>
  );
}
