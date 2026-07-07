"use client";

import { Cake, HeartPulse, Plus, UserRound } from "lucide-react";

const profiles = [
  { name: "Akash Sharma", relation: "Self", age: 31, notes: "No active allergy note", color: "bg-brand-blue" },
  { name: "Neha Sharma", relation: "Spouse", age: 29, notes: "Prefers morning delivery reminders", color: "bg-emerald-500" },
  { name: "Rohan Sharma", relation: "Child", age: 8, notes: "Pediatric products only", color: "bg-amber-400" }
];

export default function FamilyProfilesPage() {
  return (
    <div className="mx-auto max-w-[104rem] px-4 py-10 pb-28 sm:px-6 lg:px-8 xl:px-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Account</p>
          <h1 className="mt-1 text-4xl font-black">Family profiles</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
            Manage household care profiles for safer prescription, reorder, and reminder experiences.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow">
          <Plus size={16} /> Add profile
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {profiles.map((profile) => (
          <div key={profile.name} className="soft-card rounded-[2rem] p-6 transition hover:-translate-y-1 hover:shadow-premium">
            <div className={`grid h-14 w-14 place-items-center rounded-3xl ${profile.color} text-white shadow-soft`}>
              <UserRound size={24} />
            </div>
            <h2 className="mt-5 text-xl font-black">{profile.name}</h2>
            <p className="mt-1 text-sm font-bold text-brand-blue">{profile.relation}</p>
            <div className="mt-5 grid gap-2">
              <div className="flex items-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-sm font-black text-slate-600">
                <Cake size={15} className="text-brand-blue" /> {profile.age} years
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700">
                <HeartPulse size={15} /> {profile.notes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
