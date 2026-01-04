import { NextRequest, NextResponse } from "next/server";
import { findPostById } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
    _request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const post = await findPostById(id);
    if (!post) {
        return NextResponse.json(
            { message: "Not found" },
            { status: 404 }
        );
    }
    return NextResponse.json(post);
}
