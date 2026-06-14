import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { sendInquiryNotification } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

const inquirySchema = z.object({
  fullName: z.string().min(1, "Name is required").max(100),
  companyName: z.string().max(200).optional().or(z.literal("")),
  email: z.string().email("Valid email is required").max(200),
  phone: z.string().max(50).optional().or(z.literal("")),
  whatsapp: z.string().max(50).optional().or(z.literal("")),
  industry: z.string().max(100).optional().or(z.literal("")),
  bagTypes: z.array(z.string()).optional(),
  quantity: z.string().max(100).optional().or(z.literal("")),
  specifications: z.string().max(5000).optional().or(z.literal("")),
  message: z.string().max(5000).optional().or(z.literal("")),
  fileUrls: z.array(z.string()).optional(),
  source: z.string().max(100).optional().or(z.literal("")),
  sourceUrl: z.string().max(500).optional().or(z.literal("")),
  pageTitle: z.string().max(300).optional().or(z.literal("")),
  // Honeypot: bots will fill this hidden field
  website: z.string().max(0).optional().or(z.literal("")),
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

    // Honeypot check
    if (body.website && body.website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const ip = getClientIp(request);

    // Rate limit: 3 per hour per IP
    const { allowed } = await checkRateLimit(`inquiry:${ip}`, {
      interval: 3600,
      limit: 3,
    });

    if (!allowed) {
      return NextResponse.json(
        { success: false, errors: { _form: ["Too many submissions. Please try again later."] } },
        { status: 429 },
      );
    }

    const prisma = getPrisma();
    const inquiry = await prisma.inquiry.create({
      data: {
        fullName: data.fullName,
        companyName: data.companyName || null,
        email: data.email,
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        industry: data.industry || null,
        bagTypes: data.bagTypes || [],
        quantity: data.quantity || null,
        specifications: data.specifications || null,
        fileUrls: data.fileUrls || [],
        message: data.message || null,
        source: data.source || "Website",
        sourceUrl: data.sourceUrl || null,
        pageTitle: data.pageTitle || null,
        ipAddress: ip,
      },
    });

    // Send email notification (fire-and-forget)
    sendInquiryNotification({
      fullName: data.fullName,
      companyName: data.companyName,
      email: data.email,
      phone: data.phone,
      industry: data.industry,
      bagTypes: data.bagTypes,
      quantity: data.quantity,
      message: data.message,
      source: data.source,
    }).catch(console.error);

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json(
      { success: false, errors: { _form: ["An unexpected error occurred. Please try again."] } },
      { status: 500 },
    );
  }
}
