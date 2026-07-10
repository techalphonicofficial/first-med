import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    { id: "account-data", title: "1. Account data", text: "Name, email, mobile number, saved addresses and preferences are used to operate the shopping and support experience. We do not sell your personal data to third parties." },
    { id: "prescription-files", title: "2. Prescription files", text: "Prescription uploads are treated as sensitive health data with restricted access. Files are encrypted at rest and retained only as long as required by pharmacy regulations." },
    { id: "order-data", title: "3. Order data", text: "Cart contents, payment handoff details, invoices and delivery statuses are used exclusively to fulfil orders and provide customer support." },
    { id: "user-controls", title: "4. User controls", text: "You can edit your profile, delete saved addresses, manage communication preferences, and request a complete data export from your account settings." },
    { id: "cookies", title: "5. Cookies & Tracking", text: "FirstMED uses essential cookies to keep you logged in and preserve your cart state. Analytics cookies are used only if you opt-in." }
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
              <p className="text-xs font-semibold text-slate-500">Last updated:<br/><span className="font-bold text-slate-800 dark:text-slate-200">June 19, 2026</span></p>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2 text-xs font-black text-slate-600 dark:text-slate-400 shadow-sm hover:bg-slate-50">
                <Printer size={14} /> Print Policy
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="soft-card rounded-[2rem] p-6 sm:p-12">
          <h1 className="text-4xl font-black md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-lg font-semibold text-slate-500">
            How FirstMED handles account, prescription, order, and delivery data.
          </p>
          
          <div className="mt-10 grid gap-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-2xl font-black text-brand-dark dark:text-white">{section.title}</h2>
                <div className="mt-4 rounded-2xl bg-slate-50 p-6">
                  <p className="font-semibold leading-7 text-slate-600 dark:text-slate-400">{section.text}</p>
                </div>
              </section>
            ))}
          </div>
          
          <div className="mt-12 rounded-2xl border border-sky-100 bg-sky-50 p-6 text-sm font-semibold text-slate-600 dark:text-slate-400 lg:hidden">
            Last updated: June 19, 2026
          </div>
        </main>
      </div>
    </div>
  );
}
