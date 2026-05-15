"use client";

import { useState, useEffect, useCallback } from "react";
import AdminTable from "@/components/admin/AdminTable";
import Toast, { useToast } from "@/components/admin/Toast";

interface IContact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const PAGE_SIZE = 10;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ExpandableMessage({ message }: { message: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = message.length > 80;
  return (
    <span>
      {expanded || !isLong ? message : message.slice(0, 80) + "…"}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-2 text-gold hover:text-gold/80 text-xs underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </span>
  );
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<IContact | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { cache: "no-store" });
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/contact/${deleteTarget._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setContacts((prev) => prev.filter((c) => c._id !== deleteTarget._id));
      showToast("Submission deleted", "success");
      setDeleteTarget(null);
    } catch {
      showToast("Failed to delete submission", "error");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset to page 1 when search changes
  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="font-heading text-3xl text-primary">Contact Submissions</h1>
          <span className="bg-gold/20 text-gold border border-gold/40 text-xs font-bold px-3 py-1 rounded-full">
            {contacts.length} total
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full sm:w-80 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-primary focus:border-gold outline-none transition-colors text-sm placeholder:text-[#444]"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-[#1A1A1A] rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <AdminTable
            headers={["#", "Name", "Email", "Phone", "Subject", "Message", "Date", "Actions"]}
            isEmpty={paginated.length === 0}
            emptyMessage="📭 No contact submissions yet."
          >
            {paginated.map((c, i) => {
              const rowNum = (page - 1) * PAGE_SIZE + i + 1;
              return (
                <tr
                  key={c._id}
                  className={`border-t border-[#2A2A2A] hover:bg-gold/5 transition-colors ${i % 2 === 0 ? "bg-[#111]" : "bg-[#0F0F0F]"}`}
                >
                  <td className="px-4 py-3 text-muted text-xs">{rowNum}</td>
                  <td className="px-4 py-3 text-primary font-medium whitespace-nowrap">{c.name}</td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{c.email}</td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{c.phone || "—"}</td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap max-w-[120px] truncate">
                    {c.subject || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs max-w-[240px]">
                    <ExpandableMessage message={c.message} />
                  </td>
                  <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{formatDate(c.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${c.email}?subject=Re: AutoNova Enquiry`}
                        className="text-xs border border-[#2A2A2A] text-muted hover:border-gold hover:text-gold px-2 py-1 rounded transition-colors whitespace-nowrap"
                      >
                        📧 Reply
                      </a>
                      <button
                        onClick={() => setDeleteTarget(c)}
                        className="text-xs border border-[#2A2A2A] text-red-400 hover:border-red-500 hover:bg-red-500/10 px-2 py-1 rounded transition-colors whitespace-nowrap"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </AdminTable>

          {/* Pagination */}
          {filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-muted text-sm">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="border border-[#2A2A2A] text-muted hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="border border-[#2A2A2A] text-muted hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1A1A1A] border-t-[3px] border-t-gold rounded-xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="font-heading text-xl text-primary mb-3">Confirm Delete</h3>
            <p className="text-muted mb-2">
              Delete submission from <span className="text-primary font-medium">{deleteTarget.name}</span>?
            </p>
            <p className="text-muted text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-[#2A2A2A] text-muted hover:border-gold hover:text-gold py-2.5 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg transition-colors font-bold disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
