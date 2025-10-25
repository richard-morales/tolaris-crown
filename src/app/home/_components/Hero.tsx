"use client";

import Image from "next/image";
import { useState, useRef } from "react";

/**
 * Hero
 * ------------------------------------------------------------------
 * - Subscribes an email to /api/subscribe
 * - Client-side validation + robust error handling
 * - Accessible live region for status messages
 * - Prevents double submissions and gives visual feedback
 * ------------------------------------------------------------------
 */
export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | {
    kind: "success" | "error";
    msg: string;
  }>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Small RFC-like check; backend also validates
  const isValidEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    const value = email.trim().toLowerCase();
    if (!isValidEmail(value)) {
      setStatus({ kind: "error", msg: "Please enter a valid email address." });
      inputRef.current?.focus();
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        deduped?: boolean;
        error?: string;
      };

      if (!res.ok || !data?.ok) {
        // Prefer server message if present
        const reason = data?.error || "Something went wrong. Please try again.";
        setStatus({ kind: "error", msg: reason });
        return;
      }

      // Success path (fresh or deduped are both wins)
      setEmail("");
      setStatus({
        kind: "success",
        msg: data.deduped
          ? "You're already on the list—watch your inbox for offers & news."
          : "You're subscribed! Watch your inbox for offers & news.",
      });
    } catch {
      setStatus({
        kind: "error",
        msg: "Network error. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative isolate">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/rooftop-hero.png"
          alt="Breakfast with a skyline view over Madrid from Tolaris Crown rooftop"
          fill
          priority
          className="object-cover"
        />
        {/* soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/45" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-36">
        <div className="max-w-2xl text-ivory">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            New: Rooftop Sunrise Breakfast
          </span>

          <h1 className="mt-4 font-serif text-4xl leading-tight drop-shadow md:text-6xl">
            Crowning Stays in the Heart of Madrid
          </h1>

          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/85">
            Wake to skyline views, golden interiors, and warm Spanish service.
            Executive, Junior, and Royal Suites—each crafted for unhurried
            stays.
          </p>

          {/* CTA strip */}
          <form
            onSubmit={handleSubscribe}
            className="mt-6 flex w-full max-w-lg items-center gap-3 rounded-2xl bg-white/90 p-2 backdrop-blur"
            noValidate
          >
            <input
              ref={inputRef}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email for offers & news"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm text-burgundy placeholder:text-taupe/70 focus:outline-none"
              aria-invalid={status?.kind === "error" ? true : false}
              aria-describedby="subscribe-status"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting}
              className="whitespace-nowrap rounded-xl bg-burgundy px-4 py-3 text-sm font-medium text-ivory hover:bg-burgundy/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Subscribing…" : "Keep me posted"}
            </button>
          </form>

          {/* Accessible status message (live region) */}
          <div
            id="subscribe-status"
            className="mt-3 text-sm"
            role="status"
            aria-live="polite"
          >
            {status?.kind === "success" && (
              <span className="rounded-md bg-emerald-600/20 px-2 py-1 text-emerald-100">
                {status.msg}
              </span>
            )}
            {status?.kind === "error" && (
              <span className="rounded-md bg-red-600/30 px-2 py-1 text-red-100">
                {status.msg}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* (Optional) seam guard: a 1px bar to hide any hairline gap */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-ivory" />
    </section>
  );
}
