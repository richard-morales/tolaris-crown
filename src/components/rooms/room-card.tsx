// src/components/rooms/room-card.tsx
// Card used on /rooms grid. Shows cover, teaser, capacity, and actions.
import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/lib/rooms";
import { Button } from "@/components/ui/button";

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[color-mix(in_oklab,_var(--color-taupe)_25%,_transparent)] bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[16/10] w-full">
        {/* Soft gradient fallback sits under the image */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(213,184,149,0.25),_rgba(74,28,28,0.25))]" />
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(min-width:1024px) 33vw, 100vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="flex flex-col gap-3 p-4">
        <h3 className="text-lg font-semibold text-burgundy">{room.name}</h3>
        {room.blurb && <p className="text-sm text-taupe/90">{room.blurb}</p>}

        <div className="flex items-center justify-between text-sm">
          <span className="text-taupe">
            Sleeps <span className="font-medium text-burgundy">{room.capacity}</span>
          </span>
          <span className="text-burgundy">
            <span className="text-xl font-semibold">€{room.price}</span>
            <span className="text-taupe"> / night</span>
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <Link
            href={`/rooms/${room.slug}`}
            className="text-sm text-burgundy underline-offset-4 hover:underline"
          >
            View details
          </Link>
          <Link href={`/rooms?pref=${room.slug}`}>
            <Button variant="brand" className="rounded-xl">
              Book
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
