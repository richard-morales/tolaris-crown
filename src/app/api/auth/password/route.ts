// src/app/api/auth/password/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const sha256 = (s: string) =>
  crypto.createHash("sha256").update(s).digest("hex");

export async function POST(req: Request) {
  const { email, token, password } = await req.json().catch(() => ({}));
  const e = (email ?? "").toString().trim().toLowerCase();
  const p = (password ?? "").toString();

  if (!e || !token || p.length < 8) {
    return NextResponse.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 }
    );
  }

  const hashed = sha256(token);

  // Find the token for this email (safer than token-only)
  const vt = await prisma.verificationToken.findFirst({
    where: { identifier: e, token: hashed },
  });

  if (!vt || vt.expires < new Date()) {
    return NextResponse.json(
      { ok: false, error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email: e } });
  if (!user) {
    // Clean up token even if user is gone
    await prisma.verificationToken.deleteMany({ where: { identifier: e } });
    return NextResponse.json(
      { ok: false, error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(p, 10);

  // Update password, invalidate sessions, and delete token(s) atomically
  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
    prisma.session.deleteMany({ where: { userId: user.id } }),
    prisma.verificationToken.deleteMany({ where: { identifier: e } }),
  ]);

  return NextResponse.json({ ok: true });
}
