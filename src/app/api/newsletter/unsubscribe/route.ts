import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { createHmac } from "node:crypto";

function signToken(email: string): string {
  const secret = process.env.UNSUBSCRIBE_SECRET || "szzypack-unsubscribe-secret";
  return createHmac("sha256", secret).update(email).digest("hex");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token) {
    return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
  }

  const expectedToken = signToken(email);
  if (token !== expectedToken) {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 403 });
  }

  try {
    const prisma = getPrisma();
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!subscriber || !subscriber.isActive) {
      return NextResponse.json({ success: true, message: "Already unsubscribed" });
    }

    await prisma.newsletterSubscriber.update({
      where: { email },
      data: { isActive: false, unsubscribedAt: new Date() },
    });

    return NextResponse.json({ success: true, message: "Unsubscribed successfully" });
  } catch {
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
}
