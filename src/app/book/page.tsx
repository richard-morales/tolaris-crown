// src/app/book/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/db";
import Footer from "@/components/Footer";

/* ----------------------------- helpers ----------------------------- */

function toISO(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function parseDate(value?: string | null) {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}
function nightsBetween(a: Date, b: Date) {
  const ms = 1000 * 60 * 60 * 24;
  return Math.max(0, Math.round((+b - +a) / ms));
}
// Overlap: existing.checkIn < userCheckOut && existing.checkOut > userCheckIn
function availabilityWhere(checkIn: Date, checkOut: Date, guests: number) {
  return {
    capacity: { gte: guests },
    bookings: {
      none: {
        AND: [{ checkIn: { lt: checkOut } }, { checkOut: { gt: checkIn } }],
      },
    },
  };
}

/* ------------------------------ page ------------------------------- */

type SearchParams = { checkIn?: string; checkOut?: string; guests?: string };

export default async function BookPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Defaults: 2 nights starting a week from today
  const today = new Date();
  const defIn = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );
  const defOut = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 9
  );

  const checkIn = parseDate(searchParams.checkIn) ?? defIn;
  const checkOut = parseDate(searchParams.checkOut) ?? defOut;
  const guests = Math.max(1, Number(searchParams.guests ?? 2) || 1);
  const validRange = !!checkIn && !!checkOut && checkOut > checkIn;
  const stayNights = nightsBetween(checkIn, checkOut);

  let rooms:
    | {
        id: string;
        slug: string;
        name: string;
        price: number;
        capacity: number;
        coverImage: string;
      }[]
    | [] = [];

  if (validRange) {
    rooms = await prisma.room.findMany({
      where: availabilityWhere(checkIn, checkOut, guests),
      orderBy: { price: "asc" },
      select: {
        id: true,
        slug: true,
        name: true,
        price: true,
        capacity: true,
        coverImage: true,
      },
    });
  }

  const queryString = new URLSearchParams({
    checkIn: toISO(checkIn),
    checkOut: toISO(checkOut),
    guests: String(guests),
  }).toString();

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="font-serif text-3xl text-burgundy">Book your stay</h1>
          <p className="mt-1 text-taupe">
            Pick your dates and guests. We’ll show rooms that perfectly fit your
            stay.
          </p>
        </div>

        {/* Search shell */}
        <section className="mb-8 rounded-2xl border border-black/10 bg-white/90 p-5 shadow-sm backdrop-blur">
          {/* form */}
          <form method="GET" className="grid gap-4 md:grid-cols-12">
            {/* Check-in */}
            <Field label="Check-in" className="md:col-span-3">
              <FieldIcon>
                <CalendarIcon />
              </FieldIcon>
              <input
                type="date"
                name="checkIn"
                defaultValue={toISO(checkIn)}
                required
                className="peer w-full rounded-xl border border-black/10 bg-white px-10 py-2 outline-none transition focus:border-burgundy/40"
              />
            </Field>

            {/* Check-out */}
            <Field label="Check-out" className="md:col-span-3">
              <FieldIcon>
                <CalendarIcon />
              </FieldIcon>
              <input
                type="date"
                name="checkOut"
                defaultValue={toISO(checkOut)}
                required
                className="peer w-full rounded-xl border border-black/10 bg-white px-10 py-2 outline-none transition focus:border-burgundy/40"
              />
            </Field>

            {/* Guests */}
            <Field label="Guests" className="md:col-span-2">
              <FieldIcon>
                <UsersIcon />
              </FieldIcon>
              <input
                type="number"
                min={1}
                max={8}
                name="guests"
                defaultValue={guests}
                required
                className="peer w-full rounded-xl border border-black/10 bg-white px-10 py-2 outline-none transition focus:border-burgundy/40"
              />
            </Field>

            <div className="md:col-span-4 flex items-end">
              <button
                type="submit"
                className="h-[44px] w-full rounded-xl bg-[color-mix(in_oklab,_var(--color-champagne)_70%,_transparent)] px-5 font-serif text-burgundy shadow-sm transition hover:bg-[color-mix(in_oklab,_var(--color-champagne)_80%,_transparent)]"
              >
                Search
              </button>
            </div>
          </form>

          {/* quick meta */}
          {validRange && (
            <div className="mt-3 flex items-center gap-3 text-sm text-taupe">
              <span className="rounded-full bg-black/5 px-3 py-1">
                {stayNights} {stayNights === 1 ? "night" : "nights"}
              </span>
              <span className="rounded-full bg-black/5 px-3 py-1">
                {guests} {guests === 1 ? "guest" : "guests"}
              </span>
            </div>
          )}
        </section>

        {/* Results */}
        {!validRange ? (
          <p className="text-taupe">
            Choose a valid date range to see available rooms.
          </p>
        ) : rooms.length === 0 ? (
          <EmptyResults />
        ) : (
          <ul className="grid gap-5">
            {rooms.map((r) => {
              const total = stayNights * r.price;
              return (
                <li
                  key={r.id}
                  className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-4 shadow-sm md:flex-row md:items-center md:p-5"
                >
                  <img
                    src={r.coverImage}
                    alt={r.name}
                    className="h-28 w-40 rounded-xl object-cover md:h-32 md:w-48"
                  />
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-burgundy">
                      {r.name}
                    </h3>
                    <p className="mt-1 text-sm text-taupe">
                      Sleeps {r.capacity} · €{r.price} / night
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 md:min-w-[220px]">
                    <div className="rounded-full bg-black/5 px-3 py-1 text-sm text-burgundy">
                      Total for {stayNights}{" "}
                      {stayNights === 1 ? "night" : "nights"}:{" "}
                      <span className="font-semibold">
                        €{new Intl.NumberFormat("en-US").format(total)}
                      </span>
                    </div>
                    <Link
                      href={`/rooms/${r.slug}?${queryString}`}
                      className="rounded-xl bg-neutral-900 px-4 py-2 text-white shadow-sm transition hover:bg-neutral-800"
                    >
                      Select
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

/* ----------------------------- sub-views ---------------------------- */

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-1 text-sm text-taupe">{label}</div>
      <div className="relative">{children}</div>
    </div>
  );
}

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-taupe">
      {children}
    </span>
  );
}

function EmptyResults() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm">
      <p className="font-serif text-lg text-burgundy">No rooms available</p>
      <p className="mt-1 text-taupe">
        Try different dates or reduce the number of guests.
      </p>
    </div>
  );
}

/* ------------------------------ icons ------------------------------ */

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 3v4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 3v4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2 20c0-3.314 2.686-6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M22 20c0-2.761-2.239-5-5-5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
