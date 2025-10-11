// scripts/backfill-booking-reference.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateBookingReference() {
  // Example: TC-20251006-9X7Q
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const pool = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = Array.from(
    { length: 4 },
    () => pool[Math.floor(Math.random() * pool.length)]
  ).join("");
  return `TC-${y}${m}${d}-${rand}`;
}

async function main() {
  const rows = await prisma.booking.findMany({
    where: { reference: null },
    select: { id: true },
  });

  console.log(`Backfilling ${rows.length} booking(s)…`);

  for (const r of rows) {
    // Ensure uniqueness by retrying on conflict
    // (extremely unlikely with the pool above, but safe)
    for (;;) {
      const ref = generateBookingReference();
      try {
        await prisma.booking.update({
          where: { id: r.id },
          data: { reference: ref },
        });
        console.log(`✓ ${r.id} -> ${ref}`);
        break;
      } catch (e: any) {
        if (e?.code === "P2002") {
          // unique constraint hit; try again
          continue;
        }
        throw e;
      }
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
