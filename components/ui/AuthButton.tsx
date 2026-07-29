"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/lib/hooks/useAuth";
import { signInWithGoogle } from "@/lib/firebase/auth";

type AuthButtonProps = {
  variant?: "solid" | "outline";
  className?: string;
};

export function AuthButton({ variant = "solid", className }: AuthButtonProps) {
  const { isFirebaseConfigured, user, profile } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (!isFirebaseConfigured) return;
    try {
      setError(null);
      setPending(true);
      await signInWithGoogle();
    } catch {
      setError("Sign-in failed. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const pillClasses = cn(
    "inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-xs font-semibold transition-colors duration-200",
    variant === "solid"
      ? "border-transparent bg-primary text-white hover:bg-primary-hover"
      : "border-border bg-surface text-text hover:border-primary/40",
    className
  );

  if (user) {
    const displayName = profile?.displayName ?? user.displayName ?? "Parent";
    const photoURL = profile?.photoURL ?? user.photoURL;
    return (
      <Link href="/dashboard" className={pillClasses}>
        {photoURL ? (
          <Image
            src={photoURL}
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] rounded-full object-cover"
          />
        ) : (
          <GoogleIcon />
        )}
        <span>{displayName.split(" ")[0]}&rsquo;s Dashboard</span>
      </Link>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={!isFirebaseConfigured || pending}
        title={!isFirebaseConfigured ? "Firebase not configured" : undefined}
        className={cn(pillClasses, "disabled:cursor-not-allowed disabled:opacity-60")}
      >
        <GoogleIcon />
        <span>{pending ? "Signing in…" : "Sign in with Google"}</span>
        {!isFirebaseConfigured && (
          <span className="opacity-70">· Firebase not configured</span>
        )}
      </button>
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.35 11.1h-9.17v2.92h5.4c-.23 1.4-1.62 4.1-5.4 4.1a5.94 5.94 0 0 1 0-11.88c1.7 0 2.84.7 3.5 1.32l2.39-2.3C16.62 3.7 14.6 2.8 12.18 2.8a9.2 9.2 0 1 0 0 18.4c5.3 0 8.82-3.73 8.82-8.98 0-.6-.07-1.06-.15-1.52Z"
      />
    </svg>
  );
}
