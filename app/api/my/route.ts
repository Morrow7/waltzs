import { NextResponse } from "next/server";

const mockFriend = [
  { id: "1", name: "李文浩", stack: "React", status: "在线" },
  { id: "2", name: "张文彤", stack: "FastApi", status: "在线" },
  { id: "3", name: "杨威", stack: "Rust", status: "在线" },
  { id: "4", name: "郭维嘉", stack: "测试", status: "不在线" },
  { id: "5", name: "曾一航", stack: "渗透", status: "不在线" },
];

export async function GET() {
  return NextResponse.json(mockFriend);
}
