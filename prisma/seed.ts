// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// Helper: upsert a room and fully replace its children in a transaction
async function upsertRoom(d: {
  slug: string;
  name: string;
  price: number;
  capacity: number;
  cover: string;
  blurb?: string;
  description?: string;
  features?: string[];
  gallery?: string[];
}) {
  // We use a transaction so the room + its children are always consistent
  await db.$transaction(async (tx) => {
    // Upsert the room itself
    const room = await tx.room.upsert({
      where: { slug: d.slug },
      create: {
        slug: d.slug,
        name: d.name,
        price: d.price,
        capacity: d.capacity,
        coverImage: d.cover,
        blurb: d.blurb,
        description: d.description,
      },
      update: {
        name: d.name,
        price: d.price,
        capacity: d.capacity,
        coverImage: d.cover,
        blurb: d.blurb,
        description: d.description,
      },
      select: { id: true, slug: true },
    });

    // Replace features
    await tx.feature.deleteMany({ where: { roomId: room.id } });
    if (d.features?.length) {
      await tx.feature.createMany({
        data: d.features.map((label) => ({ label, roomId: room.id })),
      });
    }

    // Replace images (with deterministic sort order)
    await tx.roomImage.deleteMany({ where: { roomId: room.id } });
    if (d.gallery?.length) {
      await tx.roomImage.createMany({
        data: d.gallery.map((url, i) => ({ url, sort: i, roomId: room.id })),
      });
    }
  });

  console.log(`• Upserted room: ${d.slug}`);
}

async function main() {
  await upsertRoom({
    slug: "executive-suite",
    name: "Executive Suite",
    price: 330,
    capacity: 3,
    cover: "/images/rooms/executive/overview.png",
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
  });

  await upsertRoom({
    slug: "junior-suite",
    name: "Junior Suite",
    price: 250,
    capacity: 2,
    cover: "/images/rooms/junior/overview.png",
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
  });

  await upsertRoom({
    slug: "royal-suite",
    name: "Royal Suite",
    price: 480,
    capacity: 4,
    cover: "/images/rooms/royal/overview.png",
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
      "/images/rooms/royal/dining.png",
    ],
  });
}

main()
  .then(async () => {
    console.log("✅ Seed complete");
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await db.$disconnect();
    process.exit(1);
  });
