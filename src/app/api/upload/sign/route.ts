import { NextRequest, NextResponse } from "next/server";
import { getPresignedUploadUrl } from "@/lib/r2";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_FILES = 5;

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType } = await request.json();

    if (!fileName || !fileType) {
      return NextResponse.json(
        { success: false, message: "fileName and fileType are required" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(fileType)) {
      return NextResponse.json(
        { success: false, message: `File type not allowed. Accepted: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 },
      );
    }

    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const { url, fields, key } = await getPresignedUploadUrl(safeName, fileType);

    return NextResponse.json({ success: true, url, fields, key });
  } catch (error) {
    console.error("Upload sign error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate upload URL" },
      { status: 500 },
    );
  }
}
