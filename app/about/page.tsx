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

type Team={
    id: string;
    name: string;
    position: string;
}
type AboutData = { targets: Target[], developments: Development[], teams: Team[] }
/**
 * 获取目标列表的异步函数
 * @returns {Promise<target[]>} 返回一个Promise，解析为目标数组
 */
export async function getList(): Promise<AboutData> {
    const res = await fetch("/api/about", {
        cache: "no-store"
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function MyPage() {
    const data = await getList();

    return (
        <main className=" bg-gradient-to-b from-slate-50  to-white">
            <h1 className="flex justify-center mt-0 text-3xl font-bold">关于我们</h1>

            <ul className="flex flex-row flex-wrap items-center justify-center mt-12 transition-transform duration-200 hover:-translate-y-1 hover:scale-105 px-20 gap-10">
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

            <h1 className="flex justify-center mt-36 text-3xl font-bold">创始团队</h1>
            <h2 className="flex justify-center mt-10 text-xl font-bold">由热爱代码的团队共同制作</h2>
            <ul className="flex flex-row flex-wrap items-center justify-center mt-12 transition-transform duration-200 hover:-translate-y-1 hover:scale-105 px-30 gap-40">
                {data.teams.map((item) => (
                    <li
                        className=""
                        key={item.id}
                    >
                        <p className="mt-4 justify-center flex">{item.name}</p>
                        <p className="mt-4 justify-center flex">{item.position}</p>
                    </li>
                ))}
            </ul>
            <div >
              <div className="bg-blue-400 p-6 rounded-xl shadow-md mt-20 mb-10 mx-20 text-white">
                <h1 className="text-2xl font-bold">加入我们的旅途</h1>
                <h2 className="mt-4">如果您对代码有独特的见解和创意，我们欢迎您加入我们的团队。</h2>
                <p className="mt-4">联系我们：<a href="mailto:contact@example.com">susu997y@gmail.com</a></p>
                <p className="mt-4">地址：四川省成都市二环高架桥地下室</p>
                <p className="mt-4">加入我们的旅程，让我们一起创造出更多的价值！</p>
              </div>
            </div>
        </main>
    );
}
