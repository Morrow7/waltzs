type friend = {
    id: string;
    name: string;
    stack: string;
}

export async function getList(): Promise<friend[]> {
    const res = await fetch("http://localhost:3000/api/my", {
        cache: "no-store"
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function MyPage() {
    const friends = await getList();
    return (
        <main>
            <h1 className="flex justify-center mt-12 text-3xl font-bold">好友列表</h1>
            <ul className="flex mt-6 gap-16 justify-center  list-none transition-transform duration-200 hover:-translate-y-1 hover:scale-105">
                {friends.map((friend) => (
                    <li className="flex items-center flex-col  p-4 bg-slate-100" key={friend.id}>
                        <h2 className="text-xl mt-2">{friend.name}</h2>
                        <p className="mt-2">{friend.stack}</p>
                    </li>
                ))}
            </ul>
        </main>
    )

}