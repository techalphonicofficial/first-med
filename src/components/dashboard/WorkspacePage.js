"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, Download, FileText, Loader2, MapPin, PackageOpen, Plus, Search, ShieldCheck, SlidersHorizontal, UploadCloud, WalletCards, XCircle } from "lucide-react";
import { getWorkspace, getWorkspaceTasks } from "@/data/workspaceContent";
import { approveWorkspaceRecord, buildAuditTrail, createCsv, fetchWorkspaceRecords, getMapSimulation, getPaymentSimulation, saveWorkspaceDraft, uploadMockFile } from "@/services/mockPlatform";
import { useAppStore } from "@/store/useAppStore";

const toneClasses = {
  blue: "bg-sky-50 text-brand-blue border-sky-100",
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  red: "bg-rose-50 text-rose-700 border-rose-100"
};

const statusClasses = {
  Pending: "bg-amber-100 text-amber-700",
  "In review": "bg-sky-100 text-brand-blue",
  "Needs changes": "bg-rose-100 text-rose-700",
  Active: "bg-emerald-100 text-emerald-700",
  Reserved: "bg-sky-100 text-brand-blue",
  "Near expiry": "bg-rose-100 text-rose-700",
  "In transit": "bg-amber-100 text-amber-700",
  "Pending count": "bg-amber-100 text-amber-700",
  Paused: "bg-slate-100 text-slate-600 dark:text-white",
  Valid: "bg-emerald-100 text-emerald-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Available: "bg-emerald-100 text-emerald-700",
  Applied: "bg-sky-100 text-brand-blue",
  Open: "bg-amber-100 text-amber-700",
  Assigned: "bg-sky-100 text-brand-blue",
  Delivered: "bg-emerald-100 text-emerald-700",
  Ready: "bg-emerald-100 text-emerald-700",
  Verified: "bg-emerald-100 text-emerald-700",
  "Needs fixes": "bg-rose-100 text-rose-700",
  Review: "bg-amber-100 text-amber-700"
};

export function WorkspacePage({ moduleKey, slug = [] }) {
  const { module, active, copy } = getWorkspace(moduleKey, slug);
  const basePath = `/${moduleKey}`;
  const tasks = useMemo(() => getWorkspaceTasks(moduleKey, active.slug), [moduleKey, active.slug]);
  const queryClient = useQueryClient();
  const pushToast = useAppStore((state) => state.pushToast);
  const addAudit = useAppStore((state) => state.addAudit);
  const storeAuditTrail = useAppStore((state) => state.auditTrail);
  const [selectedState, setSelectedState] = useState("Queue");
  const [uploadResult, setUploadResult] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Ready");
  const [draft, setDraft] = useState({
    title: "",
    owner: "",
    priority: "Medium"
  });
  const recordsQuery = useQuery({
    queryKey: ["workspace", moduleKey, active.slug],
    queryFn: () => fetchWorkspaceRecords(module)
  });
  const records = recordsQuery.data || [];
  const saveMutation = useMutation({
    mutationFn: saveWorkspaceDraft,
    onSuccess: (result) => {
      addAudit({ event: `Saved ${active.label} draft`, actor: module.eyebrow, type: "Mutation" });
      pushToast({ type: "success", title: "Draft saved", text: result.id });
      queryClient.invalidateQueries({ queryKey: ["workspace", moduleKey, active.slug] });
    }
  });
  const approveMutation = useMutation({
    mutationFn: approveWorkspaceRecord,
    onSuccess: (result) => {
      addAudit({ event: `Approved ${result.id}`, actor: module.eyebrow, type: "Approval" });
      pushToast({ type: "success", title: "Record approved", text: result.id });
    }
  });
  const uploadMutation = useMutation({
    mutationFn: (file) => uploadMockFile(file, moduleKey),
    onSuccess: (result) => {
      setUploadResult(result);
      addAudit({ event: `Uploaded ${result.name}`, actor: module.eyebrow, type: "Upload" });
      pushToast({ type: "success", title: "Upload validated", text: `${result.rows} rows checked` });
    }
  });
  const auditTrail = [...storeAuditTrail.slice(0, 4), ...buildAuditTrail(moduleKey, active.label)].slice(0, 6);
  const map = getMapSimulation(moduleKey);
  const payment = getPaymentSimulation(moduleKey);

  function downloadCsv() {
    const csv = createCsv(records);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${moduleKey}-${active.slug || "dashboard"}-export.csv`;
    link.click();
    URL.revokeObjectURL(url);
    addAudit({ event: `Exported ${active.label}`, actor: module.eyebrow, type: "Export" });
    pushToast({ type: "success", title: "Export ready", text: "CSV downloaded from mock data." });
  }

  function runMockPayment() {
    setPaymentStatus("Processing");
    window.setTimeout(() => {
      setPaymentStatus("Successful");
      addAudit({ event: `Processed ${payment.title}`, actor: module.eyebrow, type: "Payment" });
      pushToast({ type: "success", title: "Mock payment successful", text: payment.amount });
    }, 900);
  }

  return (
    <div className="mx-auto max-w-[104rem] px-4 py-8 pb-28 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="soft-card h-fit rounded-2xl p-4">
          <div className="px-2 pb-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">{module.eyebrow}</p>
            <h2 className="mt-2 text-lg font-black text-slate-900 dark:text-white">{module.title}</h2>
          </div>
          <div className="grid gap-1.5">
            {module.nav.map(({ slug: itemSlug, label, icon: Icon }) => {
              const href = itemSlug ? `${basePath}/${itemSlug}` : basePath;
              const selected = active.slug === itemSlug;
              return (
                <Link
                  key={`${moduleKey}-${itemSlug || "home"}`}
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black transition ${
                    selected ? "bg-brand-blue text-white shadow-glow" : "text-slate-600 dark:text-white hover:bg-sky-50 hover:text-brand-blue"
                  }`}
                >
                  <Icon size={16} className={selected ? "text-white" : "text-brand-blue"} />
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        <main className="grid gap-6">
          <section className="overflow-hidden rounded-[2rem] bg-brand-navy p-7 text-white shadow-premium sm:p-9">
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-yellow">{module.eyebrow}</p>
                <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">{active.label}</h1>
                <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-sky-100">{copy}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 dark:border-slate-800 px-5 py-2.5 text-sm font-black text-brand-blue shadow-card transition hover:-translate-y-0.5">
                    {module.primaryAction} <ArrowRight size={15} />
                  </button>
                  <button onClick={downloadCsv} className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 dark:border-slate-800/10 px-5 py-2.5 text-sm font-black text-white backdrop-blur transition hover:bg-white dark:bg-slate-900 dark:border-slate-800/20">
                    <Download size={15} /> Export CSV
                  </button>
                </div>
              </div>
              <div className="grid gap-3 rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800/10 p-4">
                {module.workflows.slice(0, 5).map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-white dark:bg-slate-900 dark:border-slate-800/10 px-3 py-2.5 text-sm font-black">
                    <CheckCircle2 size={16} className="text-brand-yellow" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {module.metrics.map((metric) => (
              <div key={metric.label} className="soft-card rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-premium">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-black text-slate-500 dark:text-white">{metric.label}</p>
                  <span className={`grid h-9 w-9 place-items-center rounded-2xl border ${toneClasses[metric.tone] || toneClasses.blue}`}>
                    <Clock3 size={16} />
                  </span>
                </div>
                <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{metric.value}</p>
                <p className="mt-1 text-xs font-semibold text-slate-400 dark:text-white">{metric.note}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <div className="soft-card overflow-hidden rounded-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-100 bg-sky-50 dark:bg-slate-900/50 px-5 py-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">{active.label} queue</h2>
                  <p className="mt-1 text-xs font-bold text-slate-500 dark:text-white">Static frontend data prepared for API wiring later.</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue" size={14} />
                  <input
                    placeholder="Search records"
                    className="w-52 rounded-full border border-sky-100 bg-white dark:bg-slate-900 dark:border-slate-800 py-2 pl-9 pr-3 text-xs font-bold outline-brand-blue"
                  />
                </div>
              </div>
              <div className="border-b border-sky-100 px-5 py-4">
                <div className="no-scrollbar flex gap-2 overflow-x-auto">
                  {["Queue", "Form", "Upload", "Map", "Payment", "Audit", "Loading", "Empty", "Error"].map((state) => (
                    <button
                      key={state}
                      onClick={() => setSelectedState(state)}
                      className={`shrink-0 rounded-full px-4 py-2 text-xs font-black transition ${
                        selectedState === state ? "bg-brand-blue text-white shadow-glow" : "bg-white text-slate-600 dark:text-white shadow-card hover:bg-sky-50 hover:text-brand-blue"
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
              {selectedState === "Form" ? (
                <div className="grid gap-5 p-5 lg:grid-cols-[1fr_280px]">
                  <form className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-white">
                        Work item
                        <input
                          value={draft.title}
                          onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                          placeholder={`${active.label} record`}
                          className="rounded-2xl border dark:border-slate-800 border dark:border-slate-800-sky-100 bg-sky-50 dark:bg-slate-900 px-4 py-3 text-sm font-bold outline-brand-blue"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-white">
                        Owner
                        <input
                          value={draft.owner}
                          onChange={(event) => setDraft((prev) => ({ ...prev, owner: event.target.value }))}
                          placeholder="Team member or role"
                          className="rounded-2xl border dark:border-slate-800 border dark:border-slate-800-sky-100 bg-sky-50 dark:bg-slate-900 px-4 py-3 text-sm font-bold outline-brand-blue"
                        />
                      </label>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-white">
                        Priority
                        <select
                          value={draft.priority}
                          onChange={(event) => setDraft((prev) => ({ ...prev, priority: event.target.value }))}
                          className="rounded-2xl border dark:border-slate-800 border dark:border-slate-800-sky-100 bg-sky-50 dark:bg-slate-900 px-4 py-3 text-sm font-bold outline-brand-blue"
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </label>
                      <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-white sm:col-span-2">
                        Notes
                        <input
                          placeholder="Validation, reason, or operational context"
                          className="rounded-2xl border dark:border-slate-800 border dark:border-slate-800-sky-100 bg-sky-50 dark:bg-slate-900 px-4 py-3 text-sm font-bold outline-brand-blue"
                        />
                      </label>
                    </div>
                    <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
                      <AlertTriangle size={16} className="mr-2 inline" />
                      Frontend validation preview: required fields, permission state, and audit note will be wired to APIs later.
                    </div>
                    <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => saveMutation.mutate({ moduleKey, feature: active.label, ...draft })}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow"
                    >
                        {saveMutation.isPending ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />} Save draft
                      </button>
                      <button type="button" className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-slate-900 px-5 py-2.5 text-sm font-black text-brand-blue">
                        <SlidersHorizontal size={15} /> Preview rules
                      </button>
                    </div>
                  </form>
                  <div className="rounded-2xl bg-sky-50 dark:bg-slate-900 p-4">
                    <p className="text-sm font-black text-brand-blue">Form checklist</p>
                    <div className="mt-3 grid gap-2">
                      {tasks.map((task) => (
                        <div key={task.label} className="flex items-center justify-between rounded-xl bg-white dark:bg-slate-900 dark:border-slate-800 px-3 py-2 text-xs font-black text-slate-600 dark:text-white shadow-sm">
                          {task.label}
                          <span className={task.status === "Ready" ? "text-emerald-600" : task.status === "Needs check" ? "text-amber-600" : "text-slate-400 dark:text-white"}>{task.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : selectedState === "Upload" ? (
                <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px]">
                  <label className="grid min-h-64 cursor-pointer place-items-center rounded-[2rem] border-2 border-dashed border-brand-blue/20 bg-sky-50 dark:bg-slate-900/70 p-8 text-center transition hover:border-brand-blue/50 hover:bg-sky-50 dark:bg-slate-900">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) uploadMutation.mutate(file);
                      }}
                    />
                    <div>
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white dark:bg-slate-900 dark:border-slate-800 text-brand-blue shadow-card">
                        {uploadMutation.isPending ? <Loader2 className="animate-spin" size={28} /> : <UploadCloud size={28} />}
                      </div>
                      <h3 className="mt-4 text-xl font-black">Upload and validate</h3>
                      <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500 dark:text-white">
                        Supports the frontend experience for KYC files, prescription files, delivery proof, bulk inventory imports, and audit evidence.
                      </p>
                    </div>
                  </label>
                  <div className="soft-card rounded-2xl p-5">
                    <h3 className="text-lg font-black">Upload result</h3>
                    {uploadResult ? (
                      <div className="mt-4 grid gap-3">
                        {[
                          ["File", uploadResult.name],
                          ["Status", uploadResult.status],
                          ["Rows checked", uploadResult.rows],
                          ["Issues", uploadResult.issues]
                        ].map(([label, value]) => (
                          <div key={label} className="flex items-center justify-between rounded-xl bg-sky-50 dark:bg-slate-900 px-3 py-2 text-sm font-black">
                            <span className="text-slate-500 dark:text-white">{label}</span>
                            <span className="text-brand-blue">{value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm font-semibold leading-6 text-slate-500 dark:text-white">No file selected yet.</p>
                    )}
                  </div>
                </div>
              ) : selectedState === "Map" ? (
                <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px]">
                  <div className="relative min-h-96 overflow-hidden rounded-[2rem] bg-[#e6f4f1]">
                    <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(#cdeae3 1px, transparent 1px), linear-gradient(90deg, #cdeae3 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                    <div className="absolute left-[18%] top-[28%] h-[44%] w-[62%] rounded-br-[5rem] border-b-4 border-r-4 border-dashed border-brand-blue/40" />
                    <div className="absolute left-[18%] top-[28%] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-blue text-white shadow-soft">
                      <PackageOpen size={18} />
                    </div>
                    <div className="absolute left-[80%] top-[72%] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-emerald-500 text-white shadow-soft">
                      <MapPin size={18} />
                    </div>
                    <div className="absolute bottom-5 left-5 rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800 p-4 shadow-card">
                      <p className="text-sm font-black text-brand-blue">{map.title}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-white">{map.start} to {map.end}</p>
                    </div>
                  </div>
                  <div className="soft-card rounded-2xl p-5">
                    <h3 className="text-lg font-black">Map simulation</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500 dark:text-white">Provider-ready map UI for address serviceability, delivery tracking, warehouse coverage, and route previews.</p>
                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-sky-100">
                      <div className="h-full rounded-full bg-brand-blue" style={{ width: `${map.progress}%` }} />
                    </div>
                    <p className="mt-3 text-sm font-black text-brand-blue">{map.eta}</p>
                  </div>
                </div>
              ) : selectedState === "Payment" ? (
                <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px]">
                  <div className="rounded-[2rem] bg-brand-navy p-8 text-white shadow-premium">
                    <div className="grid h-14 w-14 place-items-center rounded-3xl bg-white dark:bg-slate-900 dark:border-slate-800/10 text-brand-yellow">
                      <WalletCards size={28} />
                    </div>
                    <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-brand-yellow">{payment.method}</p>
                    <h3 className="mt-2 text-4xl font-black">{payment.amount}</h3>
                    <p className="mt-2 text-sm font-semibold text-sky-100">{payment.title}</p>
                    <button
                      onClick={runMockPayment}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 dark:border-slate-800 px-5 py-2.5 text-sm font-black text-brand-blue"
                    >
                      {paymentStatus === "Processing" ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
                      {paymentStatus === "Successful" ? "Payment successful" : paymentStatus === "Processing" ? "Processing" : "Run mock payment"}
                    </button>
                  </div>
                  <div className="soft-card rounded-2xl p-5">
                    <h3 className="text-lg font-black">Payment states</h3>
                    <div className="mt-4 grid gap-2">
                      {["Ready", "Processing", "Successful", "Failed", "Refund pending"].map((state) => (
                        <div key={state} className={`rounded-xl px-3 py-2 text-sm font-black ${paymentStatus === state ? "bg-brand-blue text-white" : "bg-sky-50 text-slate-600 dark:text-white"}`}>
                          {state}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : selectedState === "Audit" ? (
                <div className="p-5">
                  <div className="grid gap-3">
                    {auditTrail.map((item) => (
                      <div key={`${item.event}-${item.time}`} className="soft-card rounded-2xl p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-black text-slate-900 dark:text-white">{item.event}</p>
                            <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-white">{item.actor} - {item.time}</p>
                          </div>
                          <span className="rounded-full bg-brand-softBlue px-3 py-1 text-xs font-black text-brand-blue">{item.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : selectedState === "Loading" ? (
                <div className="grid gap-3 p-5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="grid gap-3 rounded-2xl border border-sky-50 p-4 sm:grid-cols-[120px_1fr_120px_90px]">
                      <div className="h-5 animate-pulse rounded-full bg-sky-100" />
                      <div className="h-5 animate-pulse rounded-full bg-sky-100" />
                      <div className="h-5 animate-pulse rounded-full bg-sky-100" />
                      <div className="h-8 animate-pulse rounded-full bg-sky-100" />
                    </div>
                  ))}
                </div>
              ) : selectedState === "Empty" ? (
                <div className="p-8 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-sky-50 dark:bg-slate-900 text-brand-blue">
                    <FileText size={28} />
                  </div>
                  <h3 className="mt-4 text-xl font-black">No {active.label.toLowerCase()} records yet</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500 dark:text-white">Once records exist, this area will show the queue, filters, actions, and audit context for this feature.</p>
                </div>
              ) : selectedState === "Error" ? (
                <div className="m-5 rounded-2xl border border-rose-100 bg-rose-50 p-5">
                  <div className="flex items-start gap-3">
                    <XCircle className="mt-0.5 shrink-0 text-rose-600" size={20} />
                    <div>
                      <h3 className="font-black text-rose-700">Permission or validation issue</h3>
                      <p className="mt-1 text-sm font-semibold leading-6 text-rose-700/80">This state is ready for API errors such as forbidden access, stale records, invalid transitions, or missing audit reasons.</p>
                    </div>
                  </div>
                </div>
              ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-sky-50 text-left">
                      {["ID", "Work item", "Status", "Context", "Action"].map((heading) => (
                        <th key={heading} className="px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white">{heading}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(recordsQuery.isLoading ? [] : records).map((row) => (
                      <tr key={row.id} className="border-b border-sky-50 last:border-0 hover:bg-sky-50 dark:bg-slate-900/40">
                        <td className="px-5 py-4 font-black text-brand-blue">{row.id}</td>
                        <td className="px-5 py-4 font-bold text-slate-700 dark:text-white">{row.title}</td>
                        <td className="px-5 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-black ${statusClasses[row.status] || "bg-slate-100 text-slate-600 dark:text-white"}`}>{row.status}</span>
                        </td>
                        <td className="px-5 py-4 text-xs font-semibold text-slate-500 dark:text-white">{row.context}</td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => approveMutation.mutate(row)}
                            className="rounded-full bg-brand-blue px-3 py-1.5 text-xs font-black text-white transition hover:bg-[#066CAB]"
                          >
                            {approveMutation.isPending ? "Saving" : "Approve"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {recordsQuery.isLoading ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-sm font-black text-slate-400 dark:text-white">Loading records...</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
              )}
            </div>

            <div className="grid gap-5">
              <div className="soft-card rounded-2xl p-5">
                <h2 className="text-lg font-black">Workflow timeline</h2>
                <div className="relative mt-4 grid gap-4 pl-6">
                  <div className="absolute bottom-4 left-[11px] top-4 w-0.5 bg-sky-100" />
                  {tasks.map((task, index) => (
                    <div key={task.label} className="relative">
                      <span className={`absolute -left-6 top-1 grid h-5 w-5 place-items-center rounded-full ring-4 ring-white ${
                        index === 0 ? "bg-brand-blue" : index === 1 ? "bg-amber-400" : "bg-sky-100"
                      }`} />
                      <p className="text-sm font-black text-slate-800 dark:text-white">{task.label}</p>
                      <p className="mt-0.5 text-xs font-semibold text-slate-400 dark:text-white">{task.status}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="soft-card rounded-2xl p-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-brand-blue" />
                  <h2 className="text-lg font-black">Permissions</h2>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-500 dark:text-white">
                  This screen is role-aware by design. The current version uses static frontend permissions and is ready for backend authorization later.
                </p>
              </div>
              <div className="soft-card rounded-2xl p-5">
                <h2 className="text-lg font-black">Expected states</h2>
                <div className="mt-4 grid gap-2">
                  {["Loading skeletons", "Empty state", "Validation feedback", "Permission denied", "Audit trail"].map((state) => (
                    <div key={state} className="flex items-center justify-between rounded-xl bg-sky-50 dark:bg-slate-900 px-3 py-2 text-sm font-black text-slate-600 dark:text-white">
                      {state}
                      {state === "Loading skeletons" ? <Loader2 size={14} className="animate-spin text-brand-blue" /> : <span className="h-2 w-2 rounded-full bg-brand-blue" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
