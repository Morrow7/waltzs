type Target = {
    id: string;
    title: string;
    content: string;
}

type Development = {
    id: string;
    num: string;
    title: string;
    content: string;
}

type AboutData = { targets: Target[], developments: Development[] }
/**
 * 获取目标列表的异步函数
 * @returns {Promise<target[]>} 返回一个Promise，解析为目标数组
 */
export async function getList(): Promise<AboutData> {
    // 发起HTTP GET请求到本地API端点，不使用缓存
    const res = await fetch("http://localhost:3000/api/about", {
        cache: "no-store"  // 禁用缓存以确保获取最新数据
    });
    // 检查响应是否成功
    if (!res.ok) {
        // 如果响应不成功，抛出错误
        throw new Error("Failed to fetch data");
    }

    // 解析响应体为JSON格式并返回
    return res.json();
}

export default async function MyPage() {
    const data = await getList();

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <h1 className="flex justify-center mt-12 text-3xl font-bold">关于我们</h1>

            <ul className="flex flex-row flex-wrap items-center justify-center mt-12 transition-transform duration-200 hover:-translate-y-1 hover：scale-105 px-20 gap-10">
                {data.targets.map((item) => (
                    <li
                        className="w-[320px] h-[180px] rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-colors duration-200 hover:bg-slate-50 mf-20"
                        key={item.id}
                    >
                        <h2 className="text-2xl font-bold justify-center flex">{item.title}</h2>
                        <p className="mt-4 justify-center flex">{item.content}</p>
                    </li>
                ))}
            </ul>

            <h1 className="flex justify-center mt-36 text-3xl font-bold">发展历程</h1>

            <ul className="flex flex-row items-center justify-center mt-12 hover:shadow-md transition-shadow duration-200 gap-20 px-20">
                {data.developments.map((item) => (
                    <li
                        className="w-[320px] h-[200px] rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 transition-colors duration-200 hover:bg-slate-100"
                        key={item.id}
                    >
                        <div className="flex justify-center  w-12 h-12   font-bold text-xl">
                            {item.num}
                        </div>
                        <p className="mt-4 justify-center flex">{item.title}</p>
                        <p className="mt-4 justify-center flex">{item.content}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
