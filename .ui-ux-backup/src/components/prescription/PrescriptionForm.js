"use client";

import { useForm } from "react-hook-form";
import { FileCheck2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/Button";

export function PrescriptionForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const approvePrescription = useAppStore((state) => state.approvePrescription);
  const prescription = useAppStore((state) => state.prescription);

  function onSubmit(values) {
    const approved = approvePrescription(values, fileName);
    setMessage(approved ? "Prescription approved for demo checkout." : "Add every required detail and file to approve.");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-brand-navy p-6 text-white shadow-soft md:p-9">
        <span className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-black text-brand-blue">Required before Rx checkout</span>
        <h1 className="mt-4 text-4xl font-black">Upload prescription details for verification.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Demo validation checks patient, doctor, clinic letterhead, registration number, issue date and uploaded file name.</p>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["1", "Upload", Boolean(fileName)],
          ["2", "Validate fields", prescription.status !== "missing"],
          ["3", "Unlock Rx cart", prescription.status === "approved"]
        ].map(([number, label, done]) => (
          <div key={label} className={`rounded-2xl border p-4 ${done ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-sky-100 bg-white text-slate-500"}`}>
            <span className="grid size-8 place-items-center rounded-full bg-white text-sm font-black">{number}</span>
            <p className="mt-3 font-black">{label}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-5 rounded-2xl bg-white p-6 shadow-card md:grid-cols-2">
        {[
          ["patientName", "Patient name"],
          ["doctorName", "Doctor name"],
          ["clinicName", "Clinic or hospital letterhead"],
          ["registrationNumber", "Doctor registration number"],
          ["issueDate", "Issue date"]
        ].map(([name, label]) => (
          <label key={name} className="grid gap-2 text-sm font-black">
            {label}
            <input aria-invalid={Boolean(errors[name])} type={name === "issueDate" ? "date" : "text"} {...register(name, { required: `${label} is required` })} className={`rounded-2xl border bg-sky-50 px-4 py-3 font-semibold outline-brand-blue ${errors[name] ? "border-rose-300" : "border-sky-100"}`} />
            {errors[name] ? <span className="text-xs font-bold text-rose-600">{errors[name].message}</span> : null}
          </label>
        ))}
        <label className="grid gap-2 text-sm font-black md:col-span-2">
          Prescription file
          <div className="rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50 p-5">
            <UploadCloud className="mb-2 text-brand-blue" />
            <input type="file" accept="image/*,.pdf" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} className="text-sm" />
            {fileName && <p className="mt-2 text-brand-blue">{fileName}</p>}
          </div>
          {!fileName ? <span className="text-xs font-bold text-slate-500">Accepted demo formats: image or PDF.</span> : null}
        </label>
        <div className="rounded-2xl bg-brand-softBlue p-4 text-sm font-semibold leading-6 text-brand-blue md:col-span-2">
          Frontend demo rule: approval requires patient name, doctor name, clinic letterhead, registration number, issue date, and one uploaded file. Production should replace this with OCR and pharmacist review.
        </div>
        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <Button type="submit"><FileCheck2 size={17} /> Validate prescription</Button>
          <span className={`text-sm font-black ${prescription.status === "approved" ? "text-emerald-600" : "text-slate-500"}`}>Status: {prescription.status}</span>
          {message && <span className="text-sm font-bold text-slate-600">{message}</span>}
        </div>
      </form>
    </div>
  );
}
