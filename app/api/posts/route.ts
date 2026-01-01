import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const mockPosts = [
    { id: "1", title: "静静的顿河" },
    { id: "2", title: "人月神话" },
    { id: "3", title: "麦琪的礼物" },
];

export async function GET() {
    return NextResponse.json(mockPosts);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    return NextResponse.json(body, { status: 201 });
}

