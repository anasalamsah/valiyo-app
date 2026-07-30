"use client";

import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { findUserByEmail, setProductAccess } from "@/lib/firestore/users";
import { cn } from "@/lib/utils/cn";
import type { UserProfile } from "@/types/user";
import type { ProductId } from "@/types/access";

const PRODUCT_LABELS: Record<ProductId, string> = {
  learn: "Learn",
  discovery: "Discovery",
};
const PRODUCT_IDS: ProductId[] = ["learn", "discovery"];

export function AdminAccessView() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<UserProfile | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setSearching(true);
    setSearchError(null);
    setActionError(null);
    try {
      const found = await findUserByEmail(trimmed);
      setResult(found);
      setHasSearched(true);
      if (!found) setSearchError("No user found with that email.");
    } catch (err) {
      setResult(null);
      setHasSearched(true);
      setSearchError(err instanceof Error ? err.message : "Search failed.");
    } finally {
      setSearching(false);
    }
  }

  async function handleSetAccess(product: ProductId, granted: boolean) {
    if (!result) return;
    const actionKey = `${product}-${granted}`;
    setPendingAction(actionKey);
    setActionError(null);
    try {
      await setProductAccess(result.uid, product, granted);
      setResult((prev) =>
        prev
          ? {
              ...prev,
              products: {
                learn: prev.products?.learn ?? false,
                discovery: prev.products?.discovery ?? false,
                [product]: granted,
              },
            }
          : prev
      );
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update access.");
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          Grant access
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-text">
          Find a family by email
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Search a parent&rsquo;s account to grant or remove Learn and Discovery access.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 rounded-[28px] bg-surface p-6 shadow-sm shadow-black/5 sm:flex-row sm:items-center"
      >
        <label htmlFor="admin-search-email" className="sr-only">
          Search by email
        </label>
        <input
          id="admin-search-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="parent@email.com"
          className="flex-1 rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={searching}
          className="inline-flex items-center justify-center gap-2 rounded-pill bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search size={14} />
          {searching ? "Searching…" : "Search"}
        </button>
      </form>

      {hasSearched && searchError && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {searchError}
        </p>
      )}

      {result && (
        <div className="rounded-[28px] bg-surface p-6 shadow-sm shadow-black/5">
          <div>
            <p className="font-display text-lg font-semibold text-text">
              {result.displayName ?? "Unnamed parent"}
            </p>
            <p className="text-sm text-text-muted">{result.email}</p>
          </div>

          {actionError && (
            <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {actionError}
            </p>
          )}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {PRODUCT_IDS.map((product) => {
              const granted = result.products?.[product] ?? false;
              const grantPending = pendingAction === `${product}-true`;
              const removePending = pendingAction === `${product}-false`;

              return (
                <div key={product} className="rounded-2xl border border-border bg-bg p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-base font-semibold text-text">
                      {PRODUCT_LABELS[product]}
                    </p>
                    <span
                      className={cn(
                        "rounded-pill px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                        granted ? "bg-accent/15 text-accent" : "bg-black/5 text-text-muted"
                      )}
                    >
                      {granted ? "Active" : "Locked"}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={granted || grantPending}
                      onClick={() => handleSetAccess(product, true)}
                      className="rounded-pill bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {grantPending ? "Granting…" : `Grant ${PRODUCT_LABELS[product]}`}
                    </button>
                    <button
                      type="button"
                      disabled={!granted || removePending}
                      onClick={() => handleSetAccess(product, false)}
                      className="rounded-pill border border-border px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {removePending ? "Removing…" : `Remove ${PRODUCT_LABELS[product]}`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
