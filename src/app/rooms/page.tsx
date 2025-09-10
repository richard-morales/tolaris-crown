// src/app/rooms/page.tsx
// Rooms listing page. Renders a responsive grid of RoomCard components.
import { ROOMS } from "@/lib/rooms";
import { RoomCard } from "@/components/rooms/room-card";

export const metadata = { title: "Rooms — Tolaris Crown" };

export default function RoomsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-serif text-burgundy">Our Rooms</h1>
        <p className="mt-1 text-taupe">
          Executive, Junior, and Royal Suites — each with warm elegance and a golden glow.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ROOMS.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </section>
    </main>
  );
}
