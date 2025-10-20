import Link from "next/link";
import Image from "next/image";

type Room = {
  id: string;
  slug: string;
  name: string;
  price: number;
  capacity: number;
  image: string;
  blurb?: string;
};

export function RoomCard({ room }: { room: Room }) {
  const euro = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return (
    <article className="relative group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:shadow-md">
      {/* Image */}
      <div className="relative h-64">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-2xl text-burgundy">{room.name}</h3>
        {room.blurb ? <p className="mt-2 text-taupe">{room.blurb}</p> : null}

        <div className="mt-4 flex items-center gap-3 text-burgundy">
          <span className="text-xl font-semibold">
            {euro.format(room.price)}
          </span>
          <span className="text-taupe">/ night</span>
        </div>

        <p className="mt-1 text-taupe">Sleeps {room.capacity}</p>

        {/* Actions — explicitly above the full-card link */}
        <div className="mt-4 flex items-center justify-between relative z-20">
          <Link
            href={`/rooms/${room.slug}`}
            className="text-burgundy underline underline-offset-4 hover:no-underline"
          >
            View details
          </Link>

          <Link
            href="/book"
            className="rounded-xl bg-[color-mix(in_oklab,_var(--color-champagne)_70%,_transparent)] px-4 py-2 text-burgundy shadow-sm transition hover:bg-[color-mix(in_oklab,_var(--color-champagne)_80%,_transparent)]"
          >
            Book
          </Link>
        </div>
      </div>

      {/* Full-card clickable overlay to the details page */}
      <Link
        href={`/rooms/${room.slug}`}
        aria-label={`${room.name} details`}
        className="absolute inset-0 z-10"
      />
    </article>
  );
}
