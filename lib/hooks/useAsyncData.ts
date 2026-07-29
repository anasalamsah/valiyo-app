"use client";

import { useEffect, useState, type DependencyList } from "react";

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

/**
 * Runs `fetcher` whenever `deps` changes, tracking loading/error/data.
 * Pass `enabled = false` to skip fetching (e.g. while a product is locked
 * or no child is selected yet) — state resolves to an empty, non-loading
 * result instead of hanging.
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: DependencyList,
  enabled = true
): AsyncState<T> & { refresh: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: enabled,
    error: null,
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: flips loading=true right as the fetch starts, standard for a manual data-fetching hook (no Suspense/RSC here since this reads client-side Firestore state).
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : "Something went wrong.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled, tick]);

  if (!enabled) {
    return { data: null, loading: false, error: null, refresh: () => setTick((t) => t + 1) };
  }

  return { ...state, refresh: () => setTick((t) => t + 1) };
}
