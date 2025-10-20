// src/app/spa/page.tsx

import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function SpaPage() {
  const images = [
    { src: "/images/spa/spa-pool.png", alt: "Indoor spa pool" },
    { src: "/images/spa/relax-lounge.png", alt: "Relaxation lounge" },
    {
      src: "/images/spa/luxury-spa-reception-hall.png",
      alt: "Spa reception with elegant lighting",
    },
    {
      src: "/images/fitness/luxury-hotel-fitness-center-gym.png",
      alt: "Luxury hotel fitness center with gym equipment",
    },
    {
      src: "/images/fitness/luxury-hotel-gym-fitness-room.png",
      alt: "Spacious luxury gym with modern equipment",
    },
    {
      src: "/images/fitness/tolaris-crown-squash-court-players.png",
      alt: "Man and woman playing squash",
    },
    {
      src: "/images/fitness/tolaris-crown-squash-court-men.png",
      alt: "Two men playing squash at Tolaris Crown court",
    },
  ];

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-16">
        <header className="max-w-3xl">
          <h1 className="font-serif text-4xl text-burgundy">Spa & Fitness</h1>
          <p className="mt-4 text-taupe leading-relaxed">
            Rejuvenate in the calm of our spa: unwind in the warm indoor pool,
            sink into the relaxation lounge, or power up in our well-equipped
            gym. Every corner is designed to restore balance, harmony, and peace
            in the heart of Madrid.
          </p>
        </header>

        <Gallery images={images} className="mt-8" />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
