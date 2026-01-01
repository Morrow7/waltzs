import { NextRequest, NextResponse } from "next/server";
import { findPostById } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    const post = await findPostById(params.id);
    if (!post) {
        return NextResponse.json(
            { message: "Not found" },
            { status: 404 }
        );
    }
    return NextResponse.json(post);
}
