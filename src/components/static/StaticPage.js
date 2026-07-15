import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function StaticPage({ title, text, sections = [], actions = [] }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 pb-28 sm:px-6 lg:px-8">
      <div className="grid gap-6 rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800 p-8 shadow-card md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">FirstMED</p>
          <h1 className="mt-2 text-4xl font-black">{title}</h1>
          <p className="mt-5 max-w-3xl leading-7 text-slate-600 dark:text-white">{text}</p>
          {actions.length ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {actions.map((action) => (
                <Button key={action.href} href={action.href} className={action.secondary ? "bg-sky-50 text-brand-blue hover:bg-sky-100" : ""}>
                  {action.label} {!action.secondary ? <ArrowRight size={16} /> : null}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="grid gap-3 rounded-2xl bg-brand-softBlue p-4">
          {["Licensed pharmacy workflow", "Prescription data handled carefully", "Support-ready order journeys"].map((item, index) => {
            const Icon = index === 0 ? ShieldCheck : index === 1 ? CheckCircle2 : Mail;
            return (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-white dark:bg-slate-900 dark:border-slate-800 px-4 py-3 text-sm font-black text-brand-blue">
                <Icon size={17} /> {item}
              </div>
            );
          })}
        </div>
      </div>
      {sections.length ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title} className="soft-card rounded-2xl p-5">
              <h2 className="text-xl font-black">{section.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-white">{section.text}</p>
            </section>
          ))}
      </div>
      ) : null}
    </div>
  );
}
