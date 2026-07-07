"use client";

import { useState } from "react";
import { Search, MoreVertical, Shield, UserX, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

// Mock Data
const mockUsers = [
  { id: "USR-001", name: "Ravi Sharma", email: "ravi.s@example.com", phone: "+91 9876543210", role: "Customer", status: "Active", joined: "2026-01-12" },
  { id: "USR-002", name: "Priya Patel", email: "priya.p@example.com", phone: "+91 9876543211", role: "Customer", status: "Active", joined: "2026-02-15" },
  { id: "USR-003", name: "Anil Kumar", email: "anil.k@example.com", phone: "+91 9876543212", role: "Admin", status: "Active", joined: "2025-11-05" },
  { id: "USR-004", name: "Sneha Reddy", email: "sneha.r@example.com", phone: "+91 9876543213", role: "Customer", status: "Suspended", joined: "2026-03-20" },
  { id: "USR-005", name: "Vikram Singh", email: "vikram.s@example.com", phone: "+91 9876543214", role: "Delivery", status: "Active", joined: "2026-04-10" },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue">Platform</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900">User Management</h1>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Search submitted!"); }} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue" size={16} />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 rounded-full border border-sky-100 bg-white py-2.5 pl-10 pr-4 text-sm font-bold outline-brand-blue shadow-sm"
          />
        </form>
      </div>

      <div className="soft-card overflow-hidden rounded-2xl bg-white shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sky-50 bg-slate-50 text-left">
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">User Details</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Contact</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Role</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center font-bold text-slate-400">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-sky-50 last:border-0 hover:bg-sky-50/40 transition">
                    <td className="px-5 py-4">
                      <p className="font-black text-brand-blue">{user.name}</p>
                      <p className="text-xs font-semibold text-slate-400">{user.id} • Joined {user.joined}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-700">{user.email}</p>
                      <p className="text-xs font-semibold text-slate-500">{user.phone}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${
                        user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'Delivery' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-sky-100 text-brand-blue'
                      }`}>
                        {user.role === 'Admin' && <Shield size={12} />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${
                        user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {user.status === 'Active' ? <CheckCircle2 size={12} /> : <UserX size={12} />}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-blue transition">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-sky-50 bg-slate-50 px-5 py-3 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Showing {filteredUsers.length} users</span>
          <div className="flex gap-2">
            <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="px-3 py-1 rounded border border-slate-200 hover:bg-white disabled:opacity-50" disabled>Prev</button>
            <button onClick={(e) => { e.preventDefault(); toast.success('Action completed successfully!'); }} className="px-3 py-1 rounded border border-slate-200 hover:bg-white disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
