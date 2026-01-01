"use client";
import Link from "next/link";

export default function BlogPage() {
  return (
    <main>
      <h1 className="flex justify-center mt-12 text-3xl font-bold">欢迎来到我的小窝</h1>
      <div className="flex gap-10 px-4 mt-6 justify-center list-none space-x-12">
        <Link href="/blog" >文章</Link>
        <Link href="/about" >关于</Link>
        <Link href="/my">我的</Link>
      </div>
    </main>
  )
}
