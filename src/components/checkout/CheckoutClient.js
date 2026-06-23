"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { CreditCard, FileCheck2, Home, ShieldCheck, Truck, UploadCloud } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { EmptyState } from "@/components/ui/EmptyState";
import { toast } from "sonner";

const steps = ["Address", "Delivery Slot", "Payment", "Review", "Confirmation"];
const prescriptionFields = ["patientName", "doctorName", "clinicName", "registrationNumber", "issueDate"];

export function CheckoutClient() {
  const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm();
  const [order, setOrder] = useState(null);
  const [fileName, setFileName] = useState("");
  const cart = useAppStore((state) => state.cart);
  const prescription = useAppStore((state) => state.prescription);
  const approvePrescription = useAppStore((state) => state.approvePrescription);
  const placeOrder = useAppStore((state) => state.placeOrder);
  const pushToast = useAppStore((state) => state.pushToast);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const rxItems = cart.filter((item) => item.rxRequired);
  const hasRx = rxItems.length > 0;
  const hasBlockedRx = hasRx && prescription.status !== "approved";

  const router = useRouter();

  async function validatePrescription() {
    const validFields = await trigger(prescriptionFields);
    if (!validFields || !fileName) {
      toast.error("Fill every prescription field and upload a file.");
      return;
    }
    approvePrescription(getValues(), fileName);
    toast.success("Prescription approved!");
  }

  function submit(values) {
    if (!cart.length) {
      toast.error("Add products before checkout.");
      return;
    }
    if (hasBlockedRx) {
      toast.error("Approve prescription before checking out Rx items.");
      return;
    }
    placeOrder(values);
    router.push("/account/orders/success");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black">Checkout</h1>
      <div className="mt-6"><Stepper steps={steps} current={0} /></div>

      {!cart.length ? (
        <div className="mt-8">
          <EmptyState title="Your cart is empty" text="Add medicines or self-care products before starting checkout." actionLabel="Browse products" actionHref="/products/" secondaryLabel="View wishlist" secondaryHref="/account/wishlist/" />
        </div>
      ) : null}

      {cart.length ? (
        <form onSubmit={handleSubmit(submit)} className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-5">
            <section className="rounded-2xl bg-white p-6 shadow-card">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-brand-softBlue text-brand-blue"><Home size={18} /></span>
                <div>
                  <h2 className="text-xl font-black">Delivery address</h2>
                  <p className="text-sm font-semibold text-slate-500">Saved addresses can be connected once auth APIs are live.</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
            {["Full name", "Phone", "Address line", "City", "Pincode"].map((label) => {
              const name = label.toLowerCase().replaceAll(" ", "_");
              return (
                <label key={label} className="grid gap-2 text-sm font-black">
                  {label}
                  <input aria-invalid={Boolean(errors[name])} {...register(name, { required: `${label} is required` })} className={`rounded-2xl border bg-sky-50 px-4 py-3 font-semibold outline-brand-blue ${errors[name] ? "border-rose-300" : "border-sky-100"}`} />
                  {errors[name] ? <span className="text-xs font-bold text-rose-600">{errors[name].message}</span> : null}
                </label>
              );
            })}
              </div>
            </section>
            {hasRx ? (
              <section className={`rounded-2xl border p-6 shadow-card ${prescription.status === "approved" ? "border-emerald-100 bg-emerald-50" : "border-amber-100 bg-white"}`}>
                <div className="mb-5 flex items-center gap-3">
                  <span className={`grid size-10 place-items-center rounded-2xl ${prescription.status === "approved" ? "bg-white text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    <FileCheck2 size={18} />
                  </span>
                  <div>
                    <h2 className="text-xl font-black">Prescription verification</h2>
                    <p className="text-sm font-semibold text-slate-500">
                      Required for {rxItems.length} prescription item{rxItems.length > 1 ? "s" : ""}: {rxItems.map((item) => item.name).join(", ")}
                    </p>
                  </div>
                </div>
                {prescription.status === "approved" ? (
                  <div className="rounded-2xl bg-white p-4 text-sm font-bold text-emerald-700">
                    <ShieldCheck className="mr-2 inline" size={17} /> Prescription approved. Rx checkout is unlocked.
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
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
                          {...register(name, { required: `${label} is required` })}
                          className={`rounded-2xl border bg-sky-50 px-4 py-3 font-semibold outline-brand-blue ${errors[name] ? "border-rose-300" : "border-sky-100"}`}
                        />
                        {errors[name] ? <span className="text-xs font-bold text-rose-600">{errors[name].message}</span> : null}
                      </label>
                    ))}
                    <label className="grid gap-2 text-sm font-black md:col-span-2">
                      Prescription file
                      <div className="rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50 p-5">
                        <UploadCloud className="mb-2 text-brand-blue" />
                        <input type="file" accept="image/*,.pdf" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} className="text-sm" />
                        {fileName ? <p className="mt-2 rounded-xl bg-white px-3 py-2 text-brand-blue">{fileName}</p> : null}
                      </div>
                      <span className="text-xs font-bold text-slate-500">Upload a clear image or PDF before placing this Rx order.</span>
                    </label>
                    <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                      <button type="button" onClick={validatePrescription} className="blue-button px-5 py-2.5">
                        <FileCheck2 size={17} /> Validate prescription
                      </button>
                      <span className="text-sm font-black text-amber-700">Status: {prescription.status}</span>
                    </div>
                  </div>
                )}
              </section>
            ) : (
              <section className="rounded-2xl bg-emerald-50 p-5 text-sm font-bold text-emerald-700 shadow-card">
                <ShieldCheck className="mr-2 inline" size={17} /> No prescription required for the current cart.
              </section>
            )}
            <section className="grid gap-4 rounded-2xl bg-white p-6 shadow-card md:grid-cols-2">
              <div className="md:col-span-2 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-brand-softBlue text-brand-blue"><Truck size={18} /></span>
                <div>
                  <h2 className="text-xl font-black">Delivery and payment</h2>
                  <p className="text-sm font-semibold text-slate-500">Pick a fulfilment window and payment handoff.</p>
                </div>
              </div>
            <label className="grid gap-2 text-sm font-black">
              Delivery slot
              <select {...register("delivery_slot")} className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold">
                <option>Today, 6 PM - 8 PM</option>
                <option>Tomorrow, 9 AM - 11 AM</option>
                <option>Express, 90 min</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-black">
              Payment
              <select {...register("payment")} className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold">
                <option>Razorpay placeholder</option>
                <option>Stripe placeholder</option>
                <option>PayPal placeholder</option>
                <option>Cash on delivery review</option>
              </select>
            </label>
            </section>
          </div>
          <aside className="sticky top-24 h-fit rounded-2xl bg-brand-navy p-6 text-white shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-white/10 text-brand-yellow"><CreditCard size={18} /></span>
              <h2 className="text-xl font-black">Review</h2>
            </div>
            <p className="mt-3 text-sm font-bold text-slate-300">{cart.length} items ready for checkout</p>
            {hasBlockedRx ? <p className="mt-4 rounded-2xl bg-rose-500/15 p-3 text-sm font-bold text-rose-100">Rx item found. Upload and validate prescription on this checkout page before placing order.</p> : null}
            {!hasBlockedRx ? <p className="mt-4 rounded-2xl bg-emerald-500/15 p-3 text-sm font-bold text-emerald-100"><ShieldCheck className="mr-2 inline" size={16} /> Checkout checks passed.</p> : null}
            <div className="mt-5 grid gap-3 text-sm font-bold text-slate-300">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between gap-3">
                  <span className="line-clamp-1">{item.name}</span>
                  <span>Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-3xl font-black">Rs. {total}</p>
            <Button type="submit" disabled={hasBlockedRx} className="mt-6 w-full bg-brand-yellow text-brand-blue hover:bg-yellow-300 disabled:opacity-50">Place order</Button>
          </aside>
        </form>
      ) : null}
    </div>
  );
}
