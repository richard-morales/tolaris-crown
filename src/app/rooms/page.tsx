// src/app/rooms/page.tsx
// Rooms listing page backed by Prisma.
import { prisma } from "@/lib/db";
import { RoomCard } from "@/components/rooms/room-card";
import Footer from "@/components/Footer";

export const metadata = { title: "Rooms — Tolaris Crown" };
// Ensure Node runtime (Prisma does not run on the Edge runtime)
export const runtime = "nodejs";

export default async function RoomsPage() {
  const rooms = await prisma.room.findMany({
    orderBy: { price: "asc" },
  });

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-serif text-burgundy">Our Rooms</h1>
          <p className="mt-1 text-taupe leading-relaxed">
            Executive, Junior, and Royal Suites — each designed with warm
            elegance, golden tones, and modern comfort. Experience the
            tranquility of Madrid from the luxury of your private space.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r) => (
            <RoomCard
              key={r.id}
              room={{
                id: r.id,
                name: r.name,
                slug: r.slug,
                price: r.price,
                capacity: r.capacity,
                image: r.coverImage,
                blurb: r.blurb ?? undefined,
              }}
            />
          ))}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
