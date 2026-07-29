"use client";

import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";

export function WelcomeCard() {
  const { user, profile, selectedChild, signOut } = useAuth();

  const firstName = (profile?.displayName ?? user?.displayName ?? "there").split(" ")[0];
  const photoURL = profile?.photoURL ?? user?.photoURL ?? null;

  return (
    <section className="flex flex-col gap-4 rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        {photoURL ? (
          <Image
            src={photoURL}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-grow-bg text-xl font-semibold text-primary">
            {firstName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Welcome back
          </p>
          <h1 className="font-display text-2xl font-semibold text-text">
            Hi, {firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            {selectedChild
              ? `You're viewing ${selectedChild.name}'s journey today.`
              : "Add a child below to get started."}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => void signOut()}
        className="self-start text-xs font-semibold text-text-muted transition-colors hover:text-text sm:self-center"
      >
        Sign out
      </button>
    </section>
  );
}
