// src/app/rooftop/page.tsx

import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function RooftopPage() {
  const images = [
    {
      src: "/images/rooftop/rooftop-day.png",
      alt: "Rooftop breakfast over Gran Vía",
    },
    {
      src: "/images/rooftop/rooftop-night.png",
      alt: "Evening cocktails with city lights",
    },
    {
      src: "/images/rooftop/rooftop-morning.png",
      alt: "Morning light across Madrid skyline",
    },
    {
      src: "/images/rooftop/rooftop-blue.png",
      alt: "Serene evening across Madrid skyline",
    },
    {
      src: "/images/rooftop/rooftop-toast.png",
      alt: "Couple toasting champagne at sunset dinner",
    },
  ];

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-16">
        <header className="max-w-3xl">
          <h1 className="font-serif text-4xl text-burgundy">Royal Rooftop</h1>
          <p className="mt-4 text-taupe leading-relaxed">
            The Royal Rooftop offers breathtaking views over Madrid’s skyline.
            Enjoy a morning coffee kissed by the sunrise or an evening cocktail
            under the city lights. A serene space where luxury meets the open
            sky.
          </p>
        </header>

        <Gallery images={images} className="mt-8" />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
