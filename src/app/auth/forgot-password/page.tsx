// src/app/auth/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { MailCheck, Mail, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/password/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        console.warn("password/request non-200", await res.text());
      }
      setSent(true);
    } catch {
      setError("Network error, please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-burgundy/10 p-2 text-burgundy">
            <Mail size={20} />
          </div>
          <h1 className="font-serif text-3xl text-burgundy">Forgot password</h1>
        </div>

        {sent ? (
          <div className="mt-6 rounded-xl border border-emerald-400/40 bg-emerald-50 p-4 text-emerald-900">
            <div className="flex items-center gap-2">
              <MailCheck size={18} />
              <p className="font-medium">Check your inbox</p>
            </div>
            <p className="mt-1 text-sm">
              If an account exists for{" "}
              <span className="font-medium">{email}</span>, we’ve sent a secure
              link to reset your password. The link expires in 30 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="text-taupe">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-12 w-full rounded-xl border border-black/10 bg-white px-3 outline-none focus:ring-[3px] focus:ring-black/15"
                placeholder="you@example.com"
              />
            </label>
            {error && <p className="text-sm text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-burgundy px-4 font-medium text-ivory hover:bg-burgundy/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={18} />
                  Sending…
                </>
              ) : (
                "Send reset link"
              )}
            </button>
            <p className="text-center text-xs text-taupe">
              For your privacy, we’ll show this success message regardless of
              whether the email exists.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
