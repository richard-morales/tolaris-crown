// src/app/api/subscribe/route.ts
// ------------------------------------------------------------
// Newsletter subscribe endpoint.
// - Validates email
// - Normalizes & dedupes
// - Links to the logged-in user (if any)
// - Sends a welcome/confirmation email (via src/lib/email)
// - Safe to call from the homepage hero form or a post-login modal
// ------------------------------------------------------------

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendMail } from "@/lib/email";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

function isValidEmail(email: string): boolean {
  // Simple RFC-like check; replace with a stricter lib if desired
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const input = (body?.email ?? "").toString().trim().toLowerCase();

    if (!isValidEmail(input)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Try to link to the current user if they are logged-in
    const session = await getServerSession(authOptions).catch(() => null);
    const userEmail = session?.user?.email?.toLowerCase();
    const userId = (session?.user as any)?.id as string | undefined;

    // If the session email differs from the submitted email, we still allow it,
    // but we only attach userId if they match (to avoid cross-linking).
    const shouldAttachUser =
      userId && userEmail && userEmail === input ? userId : undefined;

    // Dedupe by email (unique in DB). Also keep at most one link per user.
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: input },
      select: { id: true, userId: true },
    });

    if (existing) {
      // If we already have it but no user is linked and we can link now, do it.
      if (!existing.userId && shouldAttachUser) {
        await prisma.newsletterSubscriber.update({
          where: { email: input },
          data: { userId: shouldAttachUser },
        });
      }
      return NextResponse.json({ ok: true, deduped: true });
    }

    // Create new subscriber row
    await prisma.newsletterSubscriber.create({
      data: {
        email: input,
        userId: shouldAttachUser ?? null,
      },
    });

    // Fire-and-forget welcome email (log-only in dev if no RESEND_API_KEY)
    await sendMail({
      to: input,
      subject: "Welcome to Tolaris Crown offers & news",
      html: `
        <h2 style="margin:0 0 12px">Thanks for subscribing!</h2>
        <p style="margin:0 0 12px">
          You’ll receive special offers, seasonal packages, and hotel news from the heart of Madrid.
        </p>
        <p style="margin:0 0 12px">
          If this wasn’t you, you can safely ignore this message.
        </p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[subscribe] error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
