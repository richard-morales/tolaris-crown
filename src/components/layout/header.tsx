// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/about", label: "About" }, // placeholder
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]); // close mobile menu on route change

  const myBookingsActive = pathname.startsWith("/account/bookings");

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-shadow",
        "backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,_var(--color-ivory)_75%,_transparent)]",
        scrolled ? "shadow-sm" : "shadow-none",
      ].join(" ")}
    >
      {/* container height shrinks from 80px → 64px */}
      <div
        className={[
          "mx-auto flex max-w-6xl items-center justify-between px-4",
          "transition-[height] duration-200",
          scrolled ? "h-16" : "h-20",
        ].join(" ")}
      >
        {/* Brand (logo + text) */}
        <Link href="/" className="group flex items-center gap-3 md:gap-4">
          <span
            className={[
              "relative overflow-visible transition-[width,height,transform] duration-200",
              scrolled ? "size-10" : "size-14",
            ].join(" ")}
          >
            <Image
              src="/images/logo-crown.png"
              alt="Tolaris Crown Logo"
              fill
              sizes="56px"
              className="object-contain transition-transform duration-200 group-hover:-translate-y-0.5"
              priority
            />
          </span>

          <div className="flex flex-col leading-tight">
            <span
              className={[
                "font-serif font-semibold tracking-wide text-burgundy transition-[font-size,letter-spacing] duration-200",
                scrolled ? "text-xl" : "text-2xl",
              ].join(" ")}
            >
              Tolaris <span className="text-champagne">Crown</span>
            </span>
            <span
              className={[
                "text-sm text-taupe/90 transition-opacity duration-150",
                scrolled ? "hidden" : "hidden md:block",
              ].join(" ")}
            >
              Crowning Stays in the Heart of Madrid
            </span>
          </div>
        </Link>

        {/* Desktop nav + auth */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "text-sm transition-colors",
                  active ? "text-burgundy" : "text-taupe hover:text-burgundy",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}

          {/* My Bookings (matches other link styles) */}
          {session ? (
            <Link
              href="/account/bookings"
              className={[
                "text-sm transition-colors",
                myBookingsActive
                  ? "text-burgundy"
                  : "text-taupe hover:text-burgundy",
              ].join(" ")}
            >
              My Bookings
            </Link>
          ) : null}

          {/* Primary CTA */}
          <Link href="/rooms">
            <Button variant="brand" className="rounded-xl">
              Book
            </Button>
          </Link>

          {/* Auth area */}
          {loading ? (
            <span className="text-sm text-taupe">…</span>
          ) : session ? (
            <div className="flex items-center gap-3">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user?.name ?? "Profile"}
                  width={28}
                  height={28}
                  className="rounded-full border border-black/10"
                />
              ) : null}
              <span className="text-sm text-burgundy max-w-[160px] truncate">
                {session.user?.name ?? session.user?.email ?? "Signed in"}
              </span>
              <Button
                onClick={() => signOut()}
                className="rounded-xl bg-neutral-900 text-white hover:bg-neutral-800"
              >
                Sign out
              </Button>
            </div>
          ) : (
            <Link href="/auth/signin">
              <Button variant="brand" className="rounded-xl">
                Sign in
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
          className="inline-flex items-center gap-2 md:hidden"
        >
          <Menu className="h-6 w-6 text-burgundy" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[color-mix(in_oklab,_var(--color-taupe)_25%,_transparent)] bg-[color-mix(in_oklab,_var(--color-ivory)_92%,_transparent)] md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-lg px-3 py-2 text-sm transition",
                    active
                      ? "bg-[color-mix(in_oklab,_var(--color-champagne)_25%,_transparent)] text-burgundy"
                      : "text-taupe hover:bg-[color-mix(in_oklab,_var(--color-champagne)_20%,_transparent)] hover:text-burgundy",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* My Bookings in mobile menu (when signed in) */}
            {session ? (
              <Link
                href="/account/bookings"
                className={[
                  "rounded-lg px-3 py-2 text-sm transition",
                  myBookingsActive
                    ? "bg-[color-mix(in_oklab,_var(--color-champagne)_25%,_transparent)] text-burgundy"
                    : "text-taupe hover:bg-[color-mix(in_oklab,_var(--color-champagne)_20%,_transparent)] hover:text-burgundy",
                ].join(" ")}
              >
                My Bookings
              </Link>
            ) : null}

            {/* Book CTA */}
            <Link href="/rooms" className="px-3 py-2">
              <Button variant="brand" className="w-full rounded-xl">
                Book
              </Button>
            </Link>

            {/* Auth area (mobile) */}
            <div className="px-3 pt-2">
              {loading ? (
                <span className="text-sm text-taupe">…</span>
              ) : session ? (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-black/10 p-2">
                  <div className="flex items-center gap-2">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user?.name ?? "Profile"}
                        width={28}
                        height={28}
                        className="rounded-full border border-black/10"
                      />
                    ) : null}
                    <span className="text-sm text-burgundy">
                      {session.user?.name ?? "Signed in"}
                    </span>
                  </div>
                  <Button
                    onClick={() => signOut()}
                    className="rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 h-8 px-3 text-xs"
                  >
                    Sign out
                  </Button>
                </div>
              ) : (
                <Link href="/auth/signin" className="block">
                  <Button variant="brand" className="w-full rounded-xl">
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
