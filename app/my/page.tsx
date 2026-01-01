type friend = {
    id: string;
    name: string;
    stack: string;
    status: "在线" | "不在线";
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
            <div className="flex flex-col items-center">
                <h1 className="flex justify-center mt-12 text-4xl font-bold">我的好友</h1>
                <h2 className="mt-6 text-lg font-medium">今天是1月2日，共有2位好友在线</h2>
                <ul className="mt-6 w-full max-w-2xl px-4 flex flex-col gap-4 list-none transition-transform duration-200  ">
                    {friends.map((friend) => (
                        <li className="w-full flex flex-col items-start rounded-xl p-4 bg-slate-100 hover:-translate-y-1" key={friend.id}>
                            <h2 className="text-2xl mt-2 ">{friend.name}</h2>
                            <div className="flex text-xl text-slate-500 ml-100 flex-row items-center gap-2">
                                <p className="text-sm text-slate-500">{friend.stack}</p>
                                <p>{friend.status}</p>
                                <p className="ml-10">...</p>
                            </div>
                           
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )

}
