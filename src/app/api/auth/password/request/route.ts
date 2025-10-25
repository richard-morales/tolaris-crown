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
  if (!e) return NextResponse.json({ ok: true }); // do not reveal user existence

  const user = await prisma.user.findUnique({ where: { email: e } });
  // Still return ok even if no user (privacy)
  if (!user) return NextResponse.json({ ok: true });

  // Invalidate previous requests for this email
  await prisma.verificationToken.deleteMany({ where: { identifier: e } });

  // Create new token
  const raw = crypto.randomBytes(32).toString("hex");
  const hashed = sha256(raw);
  const expires = new Date(Date.now() + 30 * 60 * 1000);

  await prisma.verificationToken.create({
    data: { identifier: e, token: hashed, expires },
  });

  const base = process.env.APP_BASE_URL || process.env.NEXTAUTH_URL!;
  const url = `${base}/auth/reset-password?token=${raw}&email=${encodeURIComponent(
    e
  )}`;

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
