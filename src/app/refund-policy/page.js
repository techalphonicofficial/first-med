import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

export default function RefundPage() {
  const sections = [
    { id: "eligible", title: "1. Eligible Returns", text: "Unopened, non-prescription self-care and wellness products can be returned within 7 days of delivery. Original packaging and seals must be intact." },
    { id: "restricted", title: "2. Restricted Items", text: "Prescription medicines, temperature-sensitive items (like insulin), and opened safety-sealed products are strictly non-returnable unless they were damaged during transit or the wrong item was delivered." },
    { id: "method", title: "3. Refund Method", text: "Approved refunds will be credited back to your original payment method within 5-7 business days, or instantly if you opt for FirstMED Wallet credit." },
    { id: "issues", title: "4. Delivery Issues", text: "If your delivery is missing items, severely delayed, or damaged, please raise an issue from the order tracking page immediately. Support will require your order ID and photos of the package." },
    { id: "cancellations", title: "5. Cancellations", text: "Orders can be cancelled directly from the app for a full refund until they are marked as 'Dispatched' by the partner pharmacy." }
  ];

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-black text-brand-blue hover:underline">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        {/* Sticky Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[1.5rem] bg-sky-50 dark:bg-slate-900 p-6">
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">Contents</h3>
            <nav className="flex flex-col gap-3 text-sm font-bold text-brand-blue">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="hover:underline">{s.title}</a>
              ))}
            </nav>
            <div className="mt-8 border-t border-sky-100 pt-6">
              <p className="text-xs font-semibold text-slate-500 dark:text-white">Last updated:<br/><span className="font-bold text-slate-800 dark:text-white">June 19, 2026</span></p>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-900 dark:border-slate-800 py-2 text-xs font-black text-slate-600 dark:text-white shadow-sm hover:bg-slate-50">
                <Printer size={14} /> Print Policy
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="soft-card rounded-[2rem] p-6 sm:p-12">
          <h1 className="text-4xl font-black md:text-5xl">Refund Policy</h1>
          <p className="mt-4 text-lg font-semibold text-slate-500 dark:text-white">
            Clear guidelines on medicine returns and order cancellations.
          </p>
          
          <div className="mt-10 grid gap-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-2xl font-black text-brand-dark dark:text-white">{section.title}</h2>
                <div className="mt-4 rounded-2xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 p-6">
                  <p className="font-semibold leading-7 text-slate-600 dark:text-white">{section.text}</p>
                </div>
              </section>
            ))}
          </div>
          
          <div className="mt-12 rounded-2xl border dark:border-slate-800 border dark:border-slate-800-sky-100 bg-sky-50 dark:bg-slate-900 p-6 text-sm font-semibold text-slate-600 dark:text-white lg:hidden">
            Last updated: June 19, 2026
          </div>
        </main>
      </div>
    </div>
  );
}
