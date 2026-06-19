import Link from "next/link";

export function DemoPanel({ title, eyebrow = "Workspace", items = [], actions = [] }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-gradient-to-r from-white via-sky-50 to-brand-mint p-7 shadow-soft">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-black">{title}</h1>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="soft-card rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-premium">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-brand-blue">{item.label}</p>
              <span className="rounded-full bg-brand-softBlue px-3 py-1 text-[11px] font-black text-brand-blue">Demo</span>
            </div>
            <h2 className="mt-2 text-2xl font-black">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
            <div className="mt-5 h-2 rounded-full bg-sky-100">
              <div className="h-2 rounded-full bg-brand-blue" style={{ width: item.progress || "68%" }} />
            </div>
          </div>
        ))}
      </div>
      {actions.length > 0 && (
        <div className="mt-7 flex flex-wrap gap-3">
          {actions.map((action) => (
            <Link key={action.href} href={action.href} className="rounded-full bg-brand-blue px-5 py-3 text-sm font-black text-white shadow-soft">
              {action.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
