// src/app/api/auth/password/request/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { sendMail } from "@/lib/email";

export const runtime = "nodejs";

const sha256 = (s: string) =>
  crypto.createHash("sha256").update(s).digest("hex");

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));
  const e = (email ?? "").toString().trim().toLowerCase();

  // Privacy: never reveal whether the user exists
  if (!e) return NextResponse.json({ ok: true });

  const user = await prisma.user.findUnique({ where: { email: e } });
  if (!user) return NextResponse.json({ ok: true });

  // Invalidate prior tokens for this identifier
  await prisma.verificationToken.deleteMany({ where: { identifier: e } });

  // Create new token (hex -> URL-safe even without encoding, but we encode anyway)
  const raw = crypto.randomBytes(32).toString("hex");
  const hashed = sha256(raw);
  const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

  await prisma.verificationToken.create({
    data: { identifier: e, token: hashed, expires },
  });

  const base =
    process.env.APP_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";
  const url = `${base}/auth/reset-password?token=${encodeURIComponent(
    raw
  )}&email=${encodeURIComponent(e)}`;

  await sendMail({
    to: e,
    subject: "Reset your Tolaris Crown password",
    html: `
      <p>We received a request to reset your password.</p>
      <p><a href="${url}">Click here to reset your password</a> (link expires in 30 minutes).</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
