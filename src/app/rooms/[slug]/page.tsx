// src/app/rooms/[slug]/page.tsx
// Room details from Prisma: cover, overview, features, gallery + lightbox.
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Gallery from "@/components/rooms/gallery";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function generateStaticParams() {
  const rooms = await prisma.room.findMany({ select: { slug: true } });
  return rooms.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export default async function RoomDetails({
  params,
}: {
  params: { slug: string };
}) {
  const room = await prisma.room.findUnique({
    where: { slug: params.slug },
    include: { features: true, images: { orderBy: { sort: "asc" } } },
  });
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
          From{" "}
          <span className="text-burgundy font-semibold">€{room.price}</span> /
          night · Sleeps {room.capacity}
        </p>
      </header>

      {/* Cover image */}
      <div className="mt-6 relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[color-mix(in_oklab,_var(--color-taupe)_25%,_transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(213,184,149,0.25),_rgba(74,28,28,0.25))]" />
        <Image
          src={room.coverImage}
          alt={`${room.name} — cover`}
          fill
          sizes="(min-width:1024px) 960px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <section className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold text-burgundy">Overview</h2>
          <p className="mt-2 text-taupe/90">
            {room.description ??
              "A refined suite designed for comfort and calm, finished in warm tones."}
          </p>

          {room.features.length ? (
            <>
              <h3 className="mt-6 text-lg font-semibold text-burgundy">
                Features
              </h3>
              <ul className="mt-2 grid grid-cols-1 gap-2 text-taupe/90 sm:grid-cols-2">
                {room.features.map((f) => (
                  <li key={f.id} className="leading-6">
                    • {f.label}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {/* Booking sidebar placeholder */}
        <aside className="rounded-2xl border border-[color-mix(in_oklab,_var(--color-taupe)_25%,_transparent)] bg-white p-4 shadow-sm">
          <div className="flex items-baseline justify-between">
            <span className="text-taupe">From</span>
            <span className="text-burgundy text-2xl font-semibold">
              €{room.price}
            </span>
          </div>
          <p className="mt-1 text-sm text-taupe">
            Per night · Sleeps {room.capacity}
          </p>
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
      {room.images.length ? (
        <>
          <h2 className="mt-10 text-xl font-semibold text-burgundy">Gallery</h2>
          <Gallery images={room.images.map((i) => i.url)} name={room.name} />
        </>
      ) : null}
    </main>
  );
}
