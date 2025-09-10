// src/lib/rooms.ts
// Room catalog (static data for MVP). Replace with Prisma later.
export type Room = {
  id: string;
  name: string;
  slug: string;
  price: number;        // EUR per night
  capacity: number;     // number of guests
  image: string;        // cover image
  blurb?: string;       // short teaser for /rooms
  description?: string; // long copy for details page
  features?: string[];  // bullet list
  gallery?: string[];   // additional images
};

// All image paths use PNG. Make sure these files exist under /public.
export const ROOMS: Room[] = [
  {
    id: "exec-suite",
    name: "Executive Suite",
    slug: "executive-suite",
    price: 320,
    capacity: 3,
    image: "/images/rooms/executive/overview.png",
    blurb: "Spacious city views with a warm, elegant finish.",
    description:
      "Designed for longer stays or working trips, the Executive Suite blends classic charm with modern comfort—generous living area, city views, and warm champagne-gold accents throughout.",
    features: [
      "King bed",
      "Separate living area",
      "City view windows",
      "Rain shower",
      "Illy coffee set",
      "Smart TV",
    ],
    gallery: [
      "/images/rooms/executive/living.png",
      "/images/rooms/executive/bedroom.png",
      "/images/rooms/executive/bathroom.png",
      "/images/rooms/executive/balcony.png",
    ],
  },
  {
    id: "junior-suite",
    name: "Junior Suite",
    slug: "junior-suite",
    price: 240,
    capacity: 2,
    image: "/images/rooms/junior/overview.png",
    blurb: "Cozy luxury with refined accents and smart layout.",
    description:
      "A bright, well-proportioned suite ideal for short city breaks. Soft taupe textures, a lounge corner, and thoughtful lighting create a calm, elegant atmosphere.",
    features: [
      "Queen bed",
      "Lounge corner",
      "Walk-in shower",
      "Mini-bar",
      "Smart lighting",
    ],
    gallery: [
      "/images/rooms/junior/bedroom.png",
      "/images/rooms/junior/seating.png",
      "/images/rooms/junior/corner.png",
      "/images/rooms/junior/bathroom.png",
    ],
  },
  {
    id: "royal-suite",
    name: "Royal Suite",
    slug: "royal-suite",
    price: 480,
    capacity: 4,
    image: "/images/rooms/royal/overview.png",
    blurb: "Signature suite with balcony and golden glow details.",
    description:
      "Our signature Royal Suite offers expansive spaces for hosting or relaxing—private balcony, dining area, and handcrafted finishes in deep burgundy and champagne gold.",
    features: [
      "King bed",
      "Private balcony",
      "Dining table for 4",
      "Soaking tub",
      "Walk-in wardrobe",
      "Welcome amenities",
    ],
    gallery: [
      "/images/rooms/royal/bedroom.png",
      "/images/rooms/royal/living.png",
      "/images/rooms/royal/bathroom.png",
      "/images/rooms/royal/balcony.png",
    ],
  },
];
