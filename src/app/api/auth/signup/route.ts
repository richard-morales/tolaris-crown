import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json().catch(() => ({}));

    const e = (email ?? "").toString().trim().toLowerCase();
    const p = (password ?? "").toString();

    if (!e || !p) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }
    if (p.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email: e } });
    if (existing) {
      // 409 + code to let the UI show “Recover password” flow
      return NextResponse.json(
        { error: "Email already has an account.", code: "EMAIL_EXISTS" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(p, 12);

    const user = await prisma.user.create({
      data: { name: name?.toString() ?? null, email: e, passwordHash },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    console.error("signup error", e);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
