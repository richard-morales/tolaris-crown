// src/app/rooms/[slug]/page.tsx
// Room details page. Shows cover image, overview, features, booking sidebar, and gallery.
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ROOMS } from "@/lib/rooms";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return ROOMS.map((r) => ({ slug: r.slug }));
}

// Static paths only for the slugs above.
export const dynamicParams = false;

export default function RoomDetails({ params }: { params: { slug: string } }) {
  const room = ROOMS.find((r) => r.slug === params.slug);
  if (!room) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/rooms"
        className="text-sm text-taupe hover:text-burgundy underline-offset-4 hover:underline"
      >
        ← Back to rooms
      </Link>

      <header className="mt-3 flex flex-col gap-2">
        <h1 className="text-3xl font-serif text-burgundy">{room.name}</h1>
        <p className="text-taupe">
          From <span className="text-burgundy font-semibold">€{room.price}</span> / night · Sleeps{" "}
          {room.capacity}
        </p>
      </header>

      {/* Cover image */}
      <div className="mt-6 relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[color-mix(in_oklab,_var(--color-taupe)_25%,_transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(213,184,149,0.25),_rgba(74,28,28,0.25))]" />
        <Image
          src={room.image}
          alt={`${room.name} — cover`}
          fill
          sizes="(min-width:1024px) 960px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <section className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
        {/* Overview & features */}
        <div>
          <h2 className="text-xl font-semibold text-burgundy">Overview</h2>
          <p className="mt-2 text-taupe/90">
            {room.description ??
              "A refined suite designed for comfort and calm, finished in warm tones."}
          </p>

          {room.features?.length ? (
            <>
              <h3 className="mt-6 text-lg font-semibold text-burgundy">Features</h3>
              <ul className="mt-2 grid grid-cols-1 gap-2 text-taupe/90 sm:grid-cols-2">
                {room.features.map((f) => (
                  <li key={f} className="leading-6">
                    • {f}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {/* Booking sidebar (placeholder for later DB-backed flow) */}
        <aside className="rounded-2xl border border-[color-mix(in_oklab,_var(--color-taupe)_25%,_transparent)] bg-white p-4 shadow-sm">
          <div className="flex items-baseline justify-between">
            <span className="text-taupe">From</span>
            <span className="text-burgundy text-2xl font-semibold">€{room.price}</span>
          </div>
          <p className="mt-1 text-sm text-taupe">Per night · Sleeps {room.capacity}</p>
          <form className="mt-4 space-y-3">
            <input
              type="date"
              className="w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
            />
            <input
              type="date"
              className="w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
            />
            <input
              type="number"
              min={1}
              defaultValue={2}
              className="w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
            />
            <Button type="button" variant="brand" className="w-full rounded-xl">
              Check Availability
            </Button>
          </form>
        </aside>
      </section>

      {/* Gallery */}
      {room.gallery?.length ? (
        <>
          <h2 className="mt-10 text-xl font-semibold text-burgundy">Gallery</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {room.gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[color-mix(in_oklab,_var(--color-taupe)_25%,_transparent)]"
              >
                <Image
                  src={src}
                  alt={`${room.name} photo`}
                  fill
                  sizes="(min-width:1024px) 320px, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </main>
  );
}
