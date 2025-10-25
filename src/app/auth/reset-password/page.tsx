"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const email = (params.get("email") || "").toLowerCase();
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setSubmitting(true);
    try {
      // IMPORTANT: this path matches your API file location (/api/auth/password)
      const res = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        return setError(data?.error || "Invalid or expired link.");
      }
      setSuccess(true);
      setTimeout(() => router.push("/auth/signin?reset=1"), 1500);
    } catch {
      setError("Network error, please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-3xl font-serif text-burgundy">Reset password</h1>
      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-black/10 bg-white p-4"
      >
        <div>
          <label className="mb-1 block text-sm text-taupe">New password</label>
          <div className="flex items-stretch">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-l-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="flex items-center gap-2 rounded-r-md border border-l-0 border-black/10 px-3 text-sm text-taupe hover:bg-ivory/70"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-taupe">
            Confirm password
          </label>
          <input
            type={show ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="h-11 w-full rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
            required
            minLength={8}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && (
          <p className="text-sm text-emerald-700">
            Password updated. Redirecting to sign in…
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-burgundy px-4 py-3 text-sm font-medium text-ivory hover:bg-burgundy/90 disabled:opacity-60"
        >
          {submitting ? "Updating…" : "Update password"}
        </button>
      </form>
    </main>
  );
}
