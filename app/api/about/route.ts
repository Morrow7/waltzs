import { NextResponse } from "next/server";

const mocktarget = [
    { id: "1", title: "我们的使命", content: "打破地域限制，整合全球优质图书资源" },
    { id: "2", title: "我们的愿景", content: "成为全球阅读者的首选社区，重新定义21世纪的阅读方式" },
    { id: "3", title: "核心价值观", content: "读者至上、持续创新、开放包容。" },
];

const mockdev = [
    { id: "1", num: "2021", title: "平台诞生", content: "晋江文学城在浙江成立，并获得首轮天使投资" },
    { id: "2", num: "2023", title: "百万用户", content: "平台用户注册突破100万，藏书量达到50万册" },
    { id: "3", num: "2025", title: "全球化战略", content: "开启多语言支持，服务覆盖全球120多个国家和地区" },
    { id: "4", num: "2027", title: "现在与未来", content: "今天是2026年月1日，我正在探索AI沉浸式阅读" },
];

export async function GET() {
    return NextResponse.json({
        targets: mocktarget,
        developments: mockdev,
    });
}

