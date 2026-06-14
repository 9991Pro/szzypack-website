import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "szzypack-revalidate-secret";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 });
    }

    const { paths } = await request.json();

    if (!paths || !Array.isArray(paths)) {
      return NextResponse.json(
        { success: false, message: "paths array is required" },
        { status: 400 },
      );
    }

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ success: true, revalidated: paths });
  } catch (error) {
    console.error("Revalidate error:", error);
    return NextResponse.json(
      { success: false, message: "Revalidation failed" },
      { status: 500 },
    );
  }
}
