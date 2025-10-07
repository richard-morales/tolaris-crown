"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) setErr("Invalid email or password.");
    else if (res?.ok) window.location.href = callbackUrl;
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 font-serif text-3xl text-burgundy">Sign in</h1>
      <form
        onSubmit={onSubmit}
        className="space-y-3 rounded-2xl border border-black/10 bg-white p-4"
      >
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
            required
          />
        </label>
        {err ? <p className="text-sm text-red-700">{err}</p> : null}
        <Button type="submit" className="w-full rounded-xl" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <div className="my-4 text-center text-sm text-taupe">or</div>
      <Button
        onClick={() => signIn("google", { callbackUrl })}
        variant="brand"
        className="w-full rounded-xl"
      >
        Continue with Google
      </Button>
      <p className="mt-6 text-center text-sm text-taupe">
        No account yet?{" "}
        <Link
          href="/auth/signup"
          className="text-burgundy underline underline-offset-4"
        >
          Create one
        </Link>
      </p>
    </main>
  );
}
