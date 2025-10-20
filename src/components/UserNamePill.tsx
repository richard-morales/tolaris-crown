// src/components/UserNamePill.tsx
"use client";

import Link from "next/link";

export default function UserNamePill({ name }: { name?: string | null }) {
  const display = (name ?? "Account").trim();
  const initial = display.charAt(0).toUpperCase() || "A";

  return (
    <Link
      href="/account/bookings"
      title={display}
      className="
        relative inline-flex items-center gap-2
        max-w-[180px] md:max-w-[220px]
        rounded-full border border-black/10 bg-white/90
        px-3 py-1 text-sm text-burgundy shadow-sm backdrop-blur
        hover:bg-white
        overflow-hidden
      "
    >
      {/* Initial (mobile) */}
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-burgundy font-semibold sm:hidden">
        {initial}
      </span>

      {/* Full name (>= sm) */}
      <span className="hidden sm:inline truncate">{display}</span>
    </Link>
  );
}
