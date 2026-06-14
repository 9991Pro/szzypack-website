import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

const newsletterSchema = z.object({
  email: z.string().email("Valid email is required").max(200),
  firstName: z.string().max(100).optional().or(z.literal("")),
  sourceUrl: z.string().max(500).optional().or(z.literal("")),
});

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { email, firstName, sourceUrl } = parsed.data;
    const ip = getClientIp(request);

    // Rate limit: 5 per hour per IP
    const { allowed } = await checkRateLimit(`newsletter:${ip}`, {
      interval: 3600,
      limit: 5,
    });

    if (!allowed) {
      return NextResponse.json(
        { success: false, errors: { _form: ["Too many requests. Please try again later."] } },
        { status: 429 },
      );
    }

    const prisma = getPrisma();

    // Upsert: re-subscribe if previously unsubscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json({ success: true, message: "Already subscribed" });
      }

      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: true, subscribedAt: new Date(), unsubscribedAt: null },
      });

      return NextResponse.json({ success: true, message: "Re-subscribed" });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email,
        firstName: firstName || null,
        sourceUrl: sourceUrl || null,
      },
    });

    sendWelcomeEmail(email).catch(console.error);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { success: false, errors: { _form: ["An unexpected error occurred."] } },
      { status: 500 },
    );
  }
}
