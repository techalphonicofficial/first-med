"use client";

import { useForm } from "react-hook-form";
import { CalendarClock, CheckCircle2, FileCheck2, ShieldCheck, UploadCloud, X } from "lucide-react";
import { useState, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/Button";

export function PrescriptionForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const approvePrescription = useAppStore((state) => state.approvePrescription);
  const prescription = useAppStore((state) => state.prescription);

  function onSubmit(values) {
    approvePrescription(values, fileName);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  }

  const isApproved = prescription.status === "approved";

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 pb-28 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-navy p-8 text-white shadow-premium sm:p-12">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-blue/30 blur-[80px]" />
        
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-yellow px-4 py-1.5 text-xs font-black text-brand-blue">
            Required before Rx checkout
          </span>
          <h1 className="mt-6 text-4xl font-black md:text-5xl">Prescription verification.</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-300">
            For your safety, restricted medicines require a valid prescription. Please provide the patient and doctor details along with a clear photo of the prescription.
          </p>
          
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Secure handling", color: "text-brand-yellow", bg: "bg-brand-yellow/10 border-brand-yellow/20" },
              { icon: CalendarClock, title: "15 min review", color: "text-sky-300", bg: "bg-sky-400/10 border-sky-400/20" },
              { icon: FileCheck2, title: "Rx unlock", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" }
            ].map(({ icon: Icon, title, color, bg }) => (
              <div key={title} className={`flex items-center gap-3 rounded-2xl border p-4 backdrop-blur-sm ${bg}`}>
                <Icon className={color} size={24} />
                <span className="font-bold">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="mx-auto mt-12 max-w-3xl">
        <div className="relative flex justify-between">
          <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-sky-100 -z-10" />
          <div className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-brand-blue transition-all duration-700 -z-10" style={{ width: isApproved ? "100%" : fileName ? "50%" : "0%" }} />
          
          {[
            { step: 1, label: "Upload Rx", active: true, done: Boolean(fileName) },
            { step: 2, label: "Details", active: Boolean(fileName), done: isApproved },
            { step: 3, label: "Unlock Cart", active: isApproved, done: isApproved }
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center gap-2 bg-white px-2">
              <div className={`grid h-10 w-10 place-items-center rounded-full border-4 border-white font-black transition-colors ${s.done ? "bg-brand-blue text-white" : s.active ? "bg-brand-yellow text-brand-blue ring-2 ring-brand-blue" : "bg-sky-100 text-slate-400"}`}>
                {s.done ? <CheckCircle2 size={18} /> : s.step}
              </div>
              <span className={`text-xs font-black ${s.active ? "text-brand-dark" : "text-slate-400"}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      {isApproved ? (
        <div className="mx-auto mt-12 max-w-2xl text-center rounded-[2.5rem] bg-emerald-50 border border-emerald-100 p-12 shadow-soft">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-3xl font-black text-emerald-800">Prescription Verified</h2>
          <p className="mt-4 text-lg font-semibold text-emerald-700/80">
            Your prescription has been successfully approved for demo checkout. You can now add restricted Rx items to your cart.
          </p>
          <div className="mt-8">
            <Button href="/products">Continue shopping</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-12 grid max-w-3xl gap-8 rounded-[2rem] bg-white p-8 sm:p-12 shadow-card border border-sky-50">
          
          {/* Drag Drop Zone */}
          <div className="grid gap-2 text-sm font-black">
            1. Upload Prescription File
            <div 
              className={`relative flex flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed p-10 text-center transition-colors ${isDragging ? "border-brand-blue bg-brand-softBlue" : "border-sky-200 bg-sky-50 hover:bg-sky-50/80"}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {fileName ? (
                <>
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-brand-blue shadow-sm mb-4">
                    <FileCheck2 size={32} />
                  </div>
                  <p className="text-base font-black text-brand-dark">{fileName}</p>
                  <button type="button" onClick={() => setFileName("")} className="mt-3 flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-100 transition">
                    <X size={14} /> Remove file
                  </button>
                </>
              ) : (
                <>
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-brand-blue shadow-sm mb-4">
                    <UploadCloud size={32} />
                  </div>
                  <p className="text-base font-black">Drag and drop your file here</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">or click to browse from your device</p>
                  <p className="mt-4 text-xs font-bold text-slate-400">Accepted formats: JPG, PNG, PDF (Max 5MB)</p>
                </>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*,.pdf" 
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} 
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0" 
              />
            </div>
            {!fileName && <span className="text-xs font-bold text-rose-500">Please upload a file to continue</span>}
          </div>

          <div className="border-t border-sky-100 pt-8 grid gap-6 sm:grid-cols-2">
            <h3 className="sm:col-span-2 text-sm font-black">2. Enter Prescription Details</h3>
            
            {[
              ["patientName", "Patient name"],
              ["doctorName", "Doctor name"],
              ["clinicName", "Clinic or hospital letterhead"],
              ["registrationNumber", "Doctor registration number"],
              ["issueDate", "Issue date"]
            ].map(([name, label]) => (
              <label key={name} className="grid gap-2 text-sm font-black">
                {label}
                <input 
                  aria-invalid={Boolean(errors[name])} 
                  type={name === "issueDate" ? "date" : "text"} 
                  {...register(name, { required: true })} 
                  className={`rounded-xl border bg-slate-50 px-4 py-3 font-semibold outline-brand-blue ${errors[name] ? "border-rose-300" : "border-slate-200"}`} 
                />
              </label>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center gap-4 border-t border-sky-100 pt-8">
            <Button type="submit" className="w-full sm:w-auto h-12 px-10 text-base" disabled={!fileName}>
              Submit for verification
            </Button>
            <p className="text-center text-xs font-semibold text-slate-500 max-w-md">
              Frontend demo rule: approval requires all fields and one uploaded file. Production should replace this with OCR and pharmacist review.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
