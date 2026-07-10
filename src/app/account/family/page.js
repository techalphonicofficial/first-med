"use client";

import { Cake, HeartPulse, Plus, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Modal } from "@/components/ui/Modal";

const initialProfiles = [
  { name: "Akash Sharma", relation: "Self", age: 31, notes: "No active allergy note", color: "bg-brand-blue" },
  { name: "Neha Sharma", relation: "Spouse", age: 29, notes: "Prefers morning delivery reminders", color: "bg-emerald-500" },
  { name: "Rohan Sharma", relation: "Child", age: 8, notes: "Pediatric products only", color: "bg-amber-400" }
];

export default function FamilyProfilesPage() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [modalOpen, setModalOpen] = useState(false);

  function handleAddProfile(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const relation = formData.get("relation");
    const age = formData.get("age");
    const notes = formData.get("notes") || "No notes added";
    
    const colors = ["bg-brand-blue", "bg-emerald-500", "bg-amber-400", "bg-purple-500", "bg-rose-500"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setProfiles(prev => [...prev, { name, relation, age, notes, color: randomColor }]);
    toast.success(`${name} added to family profiles!`);
    setModalOpen(false);
  }

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
        <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-black text-white shadow-glow hover:-translate-y-0.5 transition">
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
              <div className="flex items-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-sm font-black text-slate-600 dark:text-slate-400">
                <Cake size={15} className="text-brand-blue" /> {profile.age} years
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700">
                <HeartPulse size={15} /> {profile.notes}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Family Profile">
        <form onSubmit={handleAddProfile} className="grid gap-4">
          <label className="grid gap-2 text-sm font-black">
            Full Name
            <input name="name" required placeholder="e.g. Rahul Sharma" className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="grid gap-2 text-sm font-black">
              Relation
              <select name="relation" required className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue">
                <option value="Self">Self</option>
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-black">
              Age
              <input type="number" name="age" required min="0" placeholder="e.g. 30" className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue" />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-black">
            Medical Notes / Allergies
            <textarea name="notes" placeholder="Any specific allergies or medical notes?" rows={2} className="resize-none rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-semibold outline-brand-blue" />
          </label>
          <button type="submit" className="mt-2 rounded-full bg-brand-blue py-3 font-black text-white shadow-glow hover:bg-[#066CAB] transition">
            Save Profile
          </button>
        </form>
      </Modal>
    </div>
  );
}
