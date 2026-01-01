import { NextRequest, NextResponse } from "next/server";
import { createPost, listPosts } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
    return NextResponse.json(await listPosts());
}

export async function POST(request: NextRequest) {
    const body = await request.json().catch(() => null);
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const content = typeof body?.content === "string" ? body.content.trim() : "";

    if (!title || !content) {
        return NextResponse.json(
            { message: "title 和 content 不能为空" },
            { status: 400 }
        );
    }

    const post = await createPost({ title, content });

    return NextResponse.json(post, { status: 201 });
}
