const variants = {
  blue: "bg-brand-softBlue text-brand-blue border-brand-blue/10",
  yellow: "bg-brand-yellow/35 text-brand-blue border-brand-yellow",
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  red: "bg-rose-50 text-rose-700 border-rose-100",
  dark: "bg-slate-950 text-white border-slate-900"
};

export function Badge({ children, variant = "blue", className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-black ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
