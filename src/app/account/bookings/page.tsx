import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import CancelBookingButton from "@/components/bookings/cancel-booking-button";

export const dynamic = "force-dynamic";

// Robust “number of nights” calculation (UTC to avoid DST surprises)
function nightsBetween(checkIn: Date | string, checkOut: Date | string) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  // Use UTC midnight to avoid timezone offsets
  const startUTC = Date.UTC(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate()
  );
  const endUTC = Date.UTC(
    end.getUTCFullYear(),
    end.getUTCMonth(),
    end.getUTCDate()
  );
  const diffDays = Math.round((endUTC - startUTC) / (1000 * 60 * 60 * 24));
  return Math.max(diffDays, 1);
}

const euro = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 font-serif text-3xl text-burgundy">My Bookings</h1>
        <p>Please sign in to see your bookings.</p>
      </main>
    );
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      room: {
        select: { name: true, slug: true, coverImage: true, price: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 font-serif text-3xl text-burgundy">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
          <p className="text-burgundy/80">
            You haven’t booked a stay yet.{" "}
            <Link href="/rooms" className="font-medium text-burgundy underline">
              Explore rooms
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="space-y-5">
          {bookings.map((b) => {
            const nights = nightsBetween(b.checkIn, b.checkOut);
            const total = b.room.price * nights;

            return (
              <li key={b.id}>
                <article className="group grid grid-cols-1 gap-5 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 md:grid-cols-[180px_1fr_auto]">
                  {/* Thumbnail */}
                  <Link
                    href={`/rooms/${b.room.slug}`}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-xl md:h-[132px] md:w-[180px]"
                  >
                    <Image
                      src={b.room.coverImage}
                      alt={b.room.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 180px"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </Link>

                  {/* Booking info */}
                  <div className="min-w-0 md:pr-6">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/rooms/${b.room.slug}`}
                        className="truncate font-serif text-xl leading-7 text-burgundy hover:underline"
                      >
                        {b.room.name}
                      </Link>

                      {/* Total chip */}
                      <span className="hidden shrink-0 rounded-full bg-[color-mix(in_oklab,_var(--color-champagne)_30%,_white)] px-3 py-1 text-sm text-burgundy md:inline">
                        {euro.format(total)}{" "}
                        <span className="text-taupe/70">
                          · {nights} {nights === 1 ? "night" : "nights"} ·{" "}
                          {euro.format(b.room.price)} / night
                        </span>
                      </span>
                    </div>

                    <p className="mt-1 text-[15px] text-taupe">
                      {new Date(b.checkIn).toLocaleDateString()} &rarr;{" "}
                      {new Date(b.checkOut).toLocaleDateString()}{" "}
                      <span className="mx-1">·</span> Guests: {b.guests}
                    </p>

                    {b.reference ? (
                      <p className="mt-2 text-sm text-taupe">
                        <span className="mr-2 rounded-md bg-[color-mix(in_oklab,_var(--color-champagne)_22%,_white)] px-2 py-1 text-taupe">
                          Ref:
                        </span>
                        <span className="font-mono tracking-wider">
                          {b.reference}
                        </span>
                      </p>
                    ) : null}

                    <div className="mt-3">
                      <Link
                        href={`/rooms/${b.room.slug}`}
                        className="inline-flex items-center text-sm font-medium text-burgundy underline underline-offset-4 hover:no-underline"
                      >
                        View room details
                      </Link>
                    </div>

                    {/* Total chip for mobile (below details) */}
                    <div className="mt-3 md:hidden">
                      <span className="rounded-full bg-[color-mix(in_oklab,_var(--color-champagne)_30%,_white)] px-3 py-1 text-sm text-burgundy">
                        {euro.format(total)}{" "}
                        <span className="text-taupe/70">
                          · {nights} {nights === 1 ? "night" : "nights"} ·{" "}
                          {euro.format(b.room.price)} / night
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end md:items-start">
                    <CancelBookingButton id={b.id} />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
