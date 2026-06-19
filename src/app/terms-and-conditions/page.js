import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

export default function TermsPage() {
  const sections = [
    { id: "use-of-service", title: "1. Use of Service", text: "Users are responsible for providing accurate account, delivery, and prescription information. FirstMED reserves the right to suspend accounts providing fraudulent information." },
    { id: "prescription-products", title: "2. Prescription Products", text: "Restricted medicines require valid prescription verification. Orders containing Rx items may be cancelled if the uploaded prescription is incomplete, expired, or rejected by the verifying pharmacist." },
    { id: "payments", title: "3. Payments & Fulfilment", text: "Payment confirmation does not guarantee stock. If an item becomes unavailable after payment, a full refund will be initiated to the original payment method." },
    { id: "support", title: "4. Support & Disputes", text: "Order issues must be raised within 48 hours of delivery. Please provide your order ID and clear photos if reporting damaged or missing items." },
    { id: "liability", title: "5. Limitation of Liability", text: "FirstMED acts as a technology platform connecting users with licensed pharmacies. FirstMED is not a substitute for professional medical advice or diagnosis." }
  ];

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-black text-brand-blue hover:underline">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        {/* Sticky Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[1.5rem] bg-sky-50 p-6">
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-400">Contents</h3>
            <nav className="flex flex-col gap-3 text-sm font-bold text-brand-blue">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="hover:underline">{s.title}</a>
              ))}
            </nav>
            <div className="mt-8 border-t border-sky-100 pt-6">
              <p className="text-xs font-semibold text-slate-500">Last updated:<br/><span className="font-bold text-slate-800">June 19, 2026</span></p>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2 text-xs font-black text-slate-600 shadow-sm hover:bg-slate-50">
                <Printer size={14} /> Print Terms
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="soft-card rounded-[2rem] p-6 sm:p-12">
          <h1 className="text-4xl font-black md:text-5xl">Terms & Conditions</h1>
          <p className="mt-4 text-lg font-semibold text-slate-500">
            Operating terms for medicine ecommerce, verification, and delivery.
          </p>
          
          <div className="mt-10 grid gap-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-2xl font-black text-brand-dark">{section.title}</h2>
                <div className="mt-4 rounded-2xl bg-slate-50 p-6">
                  <p className="font-semibold leading-7 text-slate-600">{section.text}</p>
                </div>
              </section>
            ))}
          </div>
          
          <div className="mt-12 rounded-2xl border border-sky-100 bg-sky-50 p-6 text-sm font-semibold text-slate-600 lg:hidden">
            Last updated: June 19, 2026
          </div>
        </main>
      </div>
    </div>
  );
}
