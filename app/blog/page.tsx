import Link from "next/link";

type Post = {
  id: string;
  title: string;
};

async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main>
      <h1 className="flex justify-center mt-12 text-3xl font-bold">文章列表</h1>
      <ul className="flex flex-row gap-4 items-center justify-center mt-12">
        {posts.map((post) => {
          return (
            <li
              className="mt-4 flex flex-row items-center justify-center"
              key={post.id}
            >
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  )
}
