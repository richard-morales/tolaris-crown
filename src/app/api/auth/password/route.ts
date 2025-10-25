// src/app/api/auth/password/reset/route.ts
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
  const vt = await prisma.verificationToken.findUnique({
    where: { token: hashed },
  });
  if (!vt || vt.identifier !== e || vt.expires < new Date()) {
    return NextResponse.json(
      { ok: false, error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(p, 10);
  await prisma.user.update({ where: { email: e }, data: { passwordHash } });
  await prisma.verificationToken.delete({ where: { token: hashed } });

  return NextResponse.json({ ok: true });
}
