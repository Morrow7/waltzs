
import { listPosts, type Post } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts: Post[] = await listPosts();
  return (
    <main>
      <h1 className="flex justify-center mt-12 text-3xl font-bold">我的书架</h1>
      <ul className="mt-12 w-full max-w-3xl mx-auto px-4 flex flex-col gap-6 list-none">
        {posts.map((post) => {
          return (
            <li
              className="w-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-colors duration-200 hover:bg-slate-50"
              key={post.id}
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-slate-900">{post.title}</h2>
                <p className="text-sm text-slate-600">{post.content}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  )
}
