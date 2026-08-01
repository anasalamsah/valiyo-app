"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  resetPassword,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from "@/lib/firebase/auth";
import { Button } from "@/components/ui/Button";

type Mode = "signin" | "signup";

type FormValues = {
  displayName: string;
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const { user, loading, isFirebaseConfigured } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [googlePending, setGooglePending] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { displayName: "", email: "", password: "" } });

  // Already signed in? No reason to see the login form — send them on.
  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setNotice(null);
    reset();
  }

  async function onSubmit(values: FormValues) {
    setError(null);
    setNotice(null);
    try {
      if (mode === "signup") {
        await signUpWithEmail(values.email, values.password, values.displayName || undefined);
      } else {
        await signInWithEmail(values.email, values.password);
      }
      router.push("/dashboard");
    } catch {
      setError(
        mode === "signup"
          ? "Couldn't create your account. That email may already be in use."
          : "Incorrect email or password."
      );
    }
  }

  async function handleGoogle() {
    setError(null);
    setNotice(null);
    setGooglePending(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setGooglePending(false);
    }
  }

  async function handleForgotPassword() {
    setError(null);
    setNotice(null);
    const email = getValues("email");
    if (!email) {
      setError("Enter your email above first, then tap \u201cForgot password\u201d.");
      return;
    }
    try {
      await resetPassword(email);
      setNotice("Password reset email sent — check your inbox.");
    } catch {
      setError("Couldn't send a reset email for that address.");
    }
  }

  if (!isFirebaseConfigured) {
    return (
      <p className="text-center text-sm text-text-muted">
        Firebase isn&rsquo;t configured yet, so sign-in isn&rsquo;t available.
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-[28px] bg-surface p-8 shadow-sm shadow-black/5">
      <div className="flex rounded-pill bg-bg p-1 text-sm font-semibold">
        <button
          type="button"
          onClick={() => switchMode("signin")}
          className={`flex-1 rounded-pill py-2 transition-colors ${mode === "signin" ? "bg-primary text-white" : "text-text-muted"}`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={`flex-1 rounded-pill py-2 transition-colors ${mode === "signup" ? "bg-primary text-white" : "text-text-muted"}`}
        >
          Create account
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {mode === "signup" && (
          <div>
            <label htmlFor="displayName" className="text-xs font-semibold text-text">
              Name
            </label>
            <input
              id="displayName"
              type="text"
              className="mt-1 w-full rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
              {...register("displayName", { maxLength: 60 })}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="text-xs font-semibold text-text">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="text-xs font-semibold text-text">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 w-full rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {mode === "signin" && (
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-xs font-semibold text-primary hover:text-primary-hover"
          >
            Forgot password?
          </button>
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}
        {notice && <p className="text-xs text-accent">{notice}</p>}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-text-muted">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={googlePending}
        className="flex w-full items-center justify-center gap-2 rounded-pill border border-border bg-bg px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GoogleIcon />
        {googlePending ? "Signing in…" : "Continue with Google"}
      </button>
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
