// src/app/auth/signup/page.tsx
// Notes (prod):
// - Preserves your behavior; adds Eye/EyeOff, better messages, and trims email.
// - Handles both { code: "EMAIL_EXISTS" } and plain 409 responses.
// - Keeps "noValidate" (server owns rules) but enforces minLength client side.

"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setEmailExists(false);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        // Support both your structured error and a plain 409
        if (res.status === 409 && (data?.code === "EMAIL_EXISTS" || true)) {
          setEmailExists(true);
          return;
        }
        setError(data?.error ?? "Sign-up failed.");
        return;
      }

      // Auto sign in after successful signup (kept from your version)
      const login = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
        callbackUrl: "/",
      });

      if (login?.ok) window.location.href = "/";
      else setError("Signed up, but auto sign-in failed. Try signing in.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 font-serif text-3xl text-burgundy">Create account</h1>

      <form
        onSubmit={onSubmit}
        className="space-y-3 rounded-2xl border border-black/10 bg-white p-4"
        noValidate
      >
        <label className="block text-sm">
          <span className="text-taupe">Name</span>
          <input
            type="text"
            autoComplete="name"
            className="mt-1 h-11 w-full rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          <span className="text-taupe">Email</span>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            className="mt-1 h-11 w-full rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-taupe">Password</span>
            <div className="mt-1 relative">
              <input
                type={show ? "text" : "password"}
                autoComplete="new-password"
                className="h-11 w-full rounded-md border border-black/10 px-3 pr-10 outline-none focus:ring-[3px] focus:ring-black/15"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-taupe hover:text-burgundy"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <label className="block text-sm">
            <span className="text-taupe">Confirm password</span>
            <input
              type={show ? "text" : "password"}
              autoComplete="new-password"
              className="mt-1 h-11 w-full rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              minLength={8}
              required
            />
          </label>
        </div>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        {emailExists && (
          <div className="rounded-md border border-amber-400 bg-amber-50 p-3 text-sm text-amber-900">
            This email already has an account.
            <div className="mt-2 flex gap-3">
              <Link
                href="/auth/forgot-password"
                className="text-burgundy underline"
              >
                Recover password
              </Link>
              <Link href="/auth/signin" className="text-burgundy underline">
                Sign in
              </Link>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full rounded-xl" disabled={loading}>
          {loading ? "Creating…" : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-taupe">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="text-burgundy underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </main>
  );
}
