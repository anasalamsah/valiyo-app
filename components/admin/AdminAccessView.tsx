"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { listAllUsers, setProductAccess } from "@/lib/firestore/users";
import { cn } from "@/lib/utils/cn";
import type { UserProfile } from "@/types/user";
import type { ProductId } from "@/types/access";

const PRODUCT_LABELS: Record<ProductId, string> = {
  learn: "Learn",
  discovery: "Discovery",
};
const PRODUCT_IDS: ProductId[] = ["learn", "discovery"];

export function AdminAccessView() {
  const [users, setUsers] = useState<UserProfile[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function loadUsers() {
    setLoading(true);
    setLoadError(null);
    try {
      setUsers(await listAllUsers());
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: initial data load on mount, same pattern as lib/hooks/useAsyncData.ts.
    void loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const term = filterTerm.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (u) =>
        (u.email ?? "").toLowerCase().includes(term) ||
        (u.displayName ?? "").toLowerCase().includes(term)
    );
  }, [users, filterTerm]);

  async function handleSetAccess(user: UserProfile, product: ProductId, granted: boolean) {
    const key = `${user.uid}-${product}`;
    setPendingKey(key);
    setActionError(null);
    try {
      await setProductAccess(user.uid, product, granted);
      setUsers((prev) =>
        prev
          ? prev.map((u) =>
              u.uid === user.uid
                ? {
                    ...u,
                    products: {
                      learn: u.products?.learn ?? false,
                      discovery: u.products?.discovery ?? false,
                      [product]: granted,
                    },
                  }
                : u
            )
          : prev
      );
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update access.");
    } finally {
      setPendingKey(null);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          Grant access
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-text">
          All registered families
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Every signed-up parent shows up here — search to narrow the list, then
          tap a product to grant or remove access.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-[28px] bg-surface p-6 shadow-sm shadow-black/5 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={filterTerm}
            onChange={(event) => setFilterTerm(event.target.value)}
            placeholder="Search by name or email"
            className="w-full rounded-2xl border border-border bg-bg py-2.5 pl-10 pr-4 text-sm text-text outline-none focus:border-primary"
          />
        </div>
        <button
          type="button"
          onClick={() => void loadUsers()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-pill border border-border px-4 py-2.5 text-xs font-semibold text-text transition-colors hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={13} className={cn(loading && "animate-spin")} />
          Refresh
        </button>
      </div>

      {actionError && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {actionError}
        </p>
      )}

      {loadError && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {loadError}
        </p>
      )}

      <div className="rounded-[28px] bg-surface p-3 shadow-sm shadow-black/5 sm:p-4">
        {loading ? (
          <div className="space-y-2 p-2">
            <div className="h-16 animate-pulse rounded-2xl bg-bg" />
            <div className="h-16 animate-pulse rounded-2xl bg-bg" />
            <div className="h-16 animate-pulse rounded-2xl bg-bg" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <p className="p-4 text-sm text-text-muted">
            {users && users.length > 0
              ? "No users match your search."
              : "No registered users yet."}
          </p>
        ) : (
          <ul className="space-y-2">
            {filteredUsers.map((user) => (
              <li
                key={user.uid}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-bg px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text">
                    {user.displayName ?? "Unnamed parent"}
                    {user.role === "admin" && (
                      <span className="ml-2 rounded-pill bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                        Admin
                      </span>
                    )}
                  </p>
                  <p className="truncate text-xs text-text-muted">{user.email}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {PRODUCT_IDS.map((product) => {
                    const granted = user.products?.[product] ?? false;
                    const isPending = pendingKey === `${user.uid}-${product}`;
                    return (
                      <button
                        key={product}
                        type="button"
                        disabled={isPending}
                        onClick={() => handleSetAccess(user, product, !granted)}
                        title={
                          granted
                            ? `Remove ${PRODUCT_LABELS[product]} access`
                            : `Grant ${PRODUCT_LABELS[product]} access`
                        }
                        className={cn(
                          "rounded-pill px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                          granted
                            ? "bg-accent/15 text-accent hover:bg-accent/25"
                            : "bg-black/5 text-text-muted hover:bg-black/10"
                        )}
                      >
                        {isPending
                          ? "Updating…"
                          : `${PRODUCT_LABELS[product]}: ${granted ? "Active" : "Locked"}`}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
