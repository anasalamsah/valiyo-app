"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { addChild, deleteChild, updateChild } from "@/lib/firestore/children";
import { cn } from "@/lib/utils/cn";
import { ChildFormDialog } from "@/components/dashboard/ChildFormDialog";
import type { Child, ChildInput } from "@/types/child";

export function ChildSelector() {
  const { user, childProfiles, selectedChildId, selectChild, refreshChildren } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function openAddDialog() {
    setEditingChild(null);
    setDialogOpen(true);
  }

  function openEditDialog(child: Child) {
    setEditingChild(child);
    setDialogOpen(true);
  }

  async function handleSubmit(input: ChildInput) {
    if (!user) return;
    if (editingChild) {
      await updateChild(editingChild.id, input);
    } else {
      const newId = await addChild(user.uid, input);
      selectChild(newId);
    }
    await refreshChildren();
  }

  async function handleDelete(child: Child) {
    if (!window.confirm(`Remove ${child.name} from your family? This can't be undone.`)) {
      return;
    }
    setPendingDeleteId(child.id);
    try {
      await deleteChild(child.id);
      await refreshChildren();
    } finally {
      setPendingDeleteId(null);
    }
  }

  return (
    <section className="rounded-[28px] bg-surface p-6 shadow-sm shadow-black/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Your children
          </p>
          <h2 className="mt-1 font-display text-lg font-semibold text-text">
            Who are we growing today?
          </h2>
        </div>
        <button
          type="button"
          onClick={openAddDialog}
          className="flex items-center gap-1.5 rounded-pill bg-grow-bg px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-grow-bg/70"
        >
          <Plus size={14} /> Add child
        </button>
      </div>

      {childProfiles.length === 0 ? (
        <p className="mt-4 text-sm text-text-muted">
          Add your first child to unlock personalized Discovery and Learn experiences.
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          {childProfiles.map((child) => {
            const isActive = child.id === selectedChildId;
            return (
              <div
                key={child.id}
                className={cn(
                  "group flex items-center gap-2 rounded-2xl border px-3 py-2 transition-colors",
                  isActive ? "border-primary bg-grow-bg" : "border-border bg-bg"
                )}
              >
                <button
                  type="button"
                  onClick={() => selectChild(child.id)}
                  className="flex items-center gap-2"
                  aria-pressed={isActive}
                >
                  <span className="text-lg" aria-hidden="true">
                    {child.avatarEmoji}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      isActive ? "text-primary" : "text-text"
                    )}
                  >
                    {child.name}
                  </span>
                </button>
                <div className="ml-1 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => openEditDialog(child)}
                    aria-label={`Edit ${child.name}`}
                    className="rounded-full p-1 text-text-muted hover:bg-black/5 hover:text-text"
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(child)}
                    disabled={pendingDeleteId === child.id}
                    aria-label={`Remove ${child.name}`}
                    className="rounded-full p-1 text-text-muted hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ChildFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        child={editingChild}
      />
    </section>
  );
}
