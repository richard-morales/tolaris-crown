// src/app/dining/page.tsx

import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function DiningPage() {
  const images = [
    {
      src: "/images/restaurant/restaurant-interior.png",
      alt: "Elegant dining room",
    },
    {
      src: "/images/restaurant/buffet-overview.png",
      alt: "Breakfast buffet selection",
    },
    {
      src: "/images/restaurant/buffet-detail.png",
      alt: "Handcrafted desserts",
    },
    {
      src: "/images/restaurant/romantic-dinner-wine-roses.png",
      alt: "Romantic dinner with wine and roses",
    },
    {
      src: "/images/restaurant/wine-cocktail-appetizers-romantic-dining.png",
      alt: "Wine and cocktail with appetizers",
    },
    {
      src: "/images/restaurant/waiter-serving-wine-romantic-dinner.png",
      alt: "Waiter serving wine to couple at dinner",
    },
    {
      src: "/images/restaurant/spanish-tapas-wine-olives.png",
      alt: "Spanish tapas with wine and olives",
    },
    {
      src: "/images/restaurant/chef-cooking-paella-spanish-cuisine.png",
      alt: "Chef cooking paella in kitchen",
    },
    {
      src: "/images/restaurant/team-of-chefs-fine-dining-kitchen.png",
      alt: "Team of chefs in kitchen preparing dishes",
    },
    {
      src: "/images/restaurant/pastry-chef-preparing-desserts.png",
      alt: "Pastry chef preparing desserts in kitchen",
    },
  ];

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-16">
        <header className="max-w-3xl">
          <h1 className="font-serif text-4xl text-burgundy">Fine Dining</h1>
          <p className="mt-4 text-taupe leading-relaxed">
            An elegant culinary experience where Spanish flavors meet modern
            craft. From sunrise buffets to curated dinner menus, every dish is
            prepared with passion and flair.
          </p>
        </header>

        <Gallery images={images} className="mt-8" />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
