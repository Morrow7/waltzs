import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const mockPosts = [
    { id: "1", title: "我与地坛",content:"当牵牛花初开的时节，葬礼的号角就已吹响' " },
    { id: "2", title: "红楼梦",content:"任凭弱水三千，我只求一瓢饮" },
    { id: "3", title: "偶然事件",content:"灵魂的欲望命运的先知，直面自己的野心" },
    {id:"4",title:"月亮与六便士",content:"卑鄙与高尚，邪恶与善良，仇恨与热爱，共存在一个灵魂中"},
    {id:"5",title:"明朝那些事儿",content:"岂不闻光阴如骏马加鞭，日月如落花流水"}
];    

export async function GET() {
    return NextResponse.json(mockPosts);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    return NextResponse.json(body, { status: 201 });
}

