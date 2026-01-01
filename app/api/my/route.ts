import { NextResponse } from "next/server";

const mockFriend = [
  { id: "1", name: "李文浩", stack: "React" },
  { id: "2", name: "张文彤", stack: "FastApi" },
  { id: "3", name: "杨威", stack: "Rust" },
];

export async function GET() {
  return NextResponse.json(mockFriend);
}

