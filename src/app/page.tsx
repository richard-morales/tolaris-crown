// src/app/page.tsx

import Hero from "./(home)/_components/Hero";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function HomePage() {
  const features = [
    {
      title: "Royal Rooftop",
      desc: "Sun-kissed breakfasts above Gran Vía.",
      img: "/images/rooftop/rooftop-day.png",
      href: "/rooftop",
    },
    {
      title: "Fine Dining",
      desc: "Seasonal Spanish cuisine & curated wines.",
      img: "/images/restaurant/restaurant-interior.png",
      href: "/dining",
    },
    {
      title: "Spa & Fitness",
      desc: "Indoor spa pool, relaxation lounge & gym.",
      img: "/images/spa/spa-pool.png",
      href: "/spa",
    },
  ];

  return (
    <>
      <Hero />

      {/* Highlights Section */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((c, i) => (
              <Link
                key={i}
                href={c.href}
                className="group block overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-burgundy">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-taupe">{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center rounded-xl bg-burgundy px-5 py-3 text-ivory hover:bg-burgundy/90 transition"
            >
              Explore Suites
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
