// src/app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

function generateRef() {
  // TC-YYYYMMDD-XXXX
  const pad = (n: number) => n.toString().padStart(2, "0");
  const d = new Date();
  const stamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TC-${stamp}-${rand}`;
}

export async function POST(req: Request) {
  try {
    // 1) Require a signed-in user
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id as string | undefined;
    if (!userId) {
      return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
    }

    // 2) Validate input
    const { roomId, checkIn, checkOut, guests } = await req.json();
    if (!roomId || !checkIn || !checkOut || !guests) {
      return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (!(checkInDate < checkOutDate)) {
      return NextResponse.json({ error: "INVALID_DATES" }, { status: 400 });
    }

    // 3) Create booking (assumes you already check availability in the UI)
    const booking = await prisma.booking.create({
      data: {
        userId,
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: Number(guests),
        reference: generateRef(),
      },
    });

    return NextResponse.json({ ok: true, booking });
  } catch (e) {
    console.error("POST /api/bookings failed:", e);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
