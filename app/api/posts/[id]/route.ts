import { NextRequest, NextResponse } from "next/server";

const mockPosts = [
    { id: "1", title: "静静的顿河" },
    { id: "2", title: "人月神话" },
    { id: "3", title: "麦琪的礼物" },
];

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const post = mockPosts.find((p) => p.id === params.id);
    if (!post) {
        return NextResponse.json(
            { message: "Not found" },
            { status: 404 }
        );
    }
    return NextResponse.json(post);
}

