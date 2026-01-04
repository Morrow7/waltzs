type Friend = {
    id: string;
    name: string;
    stack: string;
    status: "在线" | "不在线";
}

function getBaseUrl() {
    const env = process.env.NEXT_PUBLIC_SITE_URL;
    if (env && env.length > 0) return env;
    return "http://localhost:3000";
}

export async function getList(): Promise<Friend[]> {
    const res = await fetch(`${getBaseUrl()}/api/my`, {
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
                <ul className="mt-6 w-full max-w-2xl px-4 flex flex-col gap-4 list-none">
                    {friends.map((friend) => (
                        <li
                            className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            key={friend.id}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <h2 className="text-2xl font-semibold leading-tight">{friend.name}</h2>
                                <span
                                    className={[
                                        "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                                        friend.status === "在线"
                                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                            : "bg-slate-50 text-slate-600 ring-1 ring-slate-200",
                                    ].join(" ")}
                                >
                                    {friend.status}
                                </span>
                            </div>

                            <div className="mt-2 flex items-center justify-between gap-3 text-sm text-slate-600">
                                <p className="truncate">{friend.stack}</p>
                                <button
                                    type="button"
                                    className="shrink-0 rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                >
                                    ...
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )

}
