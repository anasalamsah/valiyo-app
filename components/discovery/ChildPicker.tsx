"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { cn } from "@/lib/utils/cn";

export function ChildPicker({
  selectedChildId,
  onSelect,
  onContinue,
}: {
  selectedChildId: string | null;
  onSelect: (childId: string) => void;
  onContinue: () => void;
}) {
  const { childProfiles } = useAuth();

  if (childProfiles.length === 0) {
    return (
      <div className="rounded-[28px] bg-surface p-7 text-center shadow-sm shadow-black/5">
        <p className="font-display text-lg font-semibold text-text">
          Belum ada profil anak
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Tambahkan profil anak dulu di dashboard sebelum memulai Discovery.
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-block rounded-pill bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Buka Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">
        Langkah 1 dari 4
      </p>
      <h2 className="mt-1 font-display text-xl font-semibold text-text">
        Untuk anak yang mana?
      </h2>
      <p className="mt-1 text-sm text-text-muted">
        Pilih profil anak yang akan dinilai dalam sesi Discovery ini.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {childProfiles.map((child) => {
          const isActive = child.id === selectedChildId;
          return (
            <button
              key={child.id}
              type="button"
              onClick={() => onSelect(child.id)}
              className={cn(
                "flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                isActive ? "border-primary bg-grow-bg text-primary" : "border-border bg-bg text-text"
              )}
            >
              <span className="text-lg" aria-hidden="true">
                {child.avatarEmoji}
              </span>
              {child.name}
            </button>
          );
        })}

        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 rounded-2xl border border-dashed border-border px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Plus size={14} /> Anak baru
        </Link>
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={!selectedChildId}
        className="mt-6 w-full rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        Lanjutkan
      </button>
    </div>
  );
}
