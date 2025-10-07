"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "Sign-up failed.");
      setLoading(false);
      return;
    }

    // Auto sign in after successful signup
    const login = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    setLoading(false);
    if (login?.ok) window.location.href = "/";
    else setError("Signed up, but auto sign-in failed. Try signing in.");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 font-serif text-3xl text-burgundy">Create account</h1>

      <form
        onSubmit={onSubmit}
        className="space-y-3 rounded-2xl border border-black/10 bg-white p-4"
      >
        <label className="block text-sm">
          <span className="text-taupe">Name</span>
          <input
            type="text"
            className="mt-1 w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          <span className="text-taupe">Email</span>
          <input
            type="email"
            className="mt-1 w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block text-sm">
          <span className="text-taupe">Password</span>
          <input
            type="password"
            className="mt-1 w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </label>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

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
