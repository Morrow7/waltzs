import { randomUUID } from "node:crypto";
import { getPool } from "./mysql";

export type Post = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
};

let schemaEnsured = false;

async function ensureSchema() {
    if (schemaEnsured) return;

    const pool = getPool();
    try {
        await pool.execute(`
      CREATE TABLE IF NOT EXISTS posts (
        id CHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME(3) NOT NULL,
        PRIMARY KEY (id),
        INDEX idx_posts_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

        const [rows] = await pool.query("SELECT COUNT(*) as c FROM posts");
        const count = Array.isArray(rows) ? (rows[0] as any)?.c : 0;

        if ((Number(count) || 0) === 0) {
            const now = Date.now();
            const seed = [
                { id: "1", title: "我与地坛", content: "当牵牛花初开的时节，葬礼的号角就已吹响", createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000) },
                { id: "2", title: "红楼梦", content: "任凭弱水三千，我只求一瓢饮", createdAt: new Date(now - 5 * 24 * 60 * 60 * 1000) },
                { id: "3", title: "偶然事件", content: "灵魂的欲望命运的先知，直面自己的野心", createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000) },
                { id: "4", title: "月亮与六便士", content: "卑鄙与高尚，邪恶与善良，仇恨与热爱，共存在一个灵魂中", createdAt: new Date(now - 2 * 24 * 60 * 60 * 1000) },
                { id: "5", title: "明朝那些事儿", content: "岂不闻光阴如骏马加鞭，日月如落花流水", createdAt: new Date(now) },
            ];

            for (const p of seed) {
                await pool.execute(
                    "INSERT INTO posts (id, title, content, created_at) VALUES (?, ?, ?, ?)",
                    [p.id, p.title, p.content, p.createdAt]
                );
            }
        }

        schemaEnsured = true;
    } catch (error) {
        const code = (error as any)?.code;
        if (code === "ER_ACCESS_DENIED_ERROR") {
            const host = process.env.MYSQL_HOST ?? "127.0.0.1";
            const user = process.env.MYSQL_USER ?? "root";
            const database = process.env.MYSQL_DATABASE ?? "my_app";
            const hasPassword = process.env.MYSQL_PASSWORD !== undefined && process.env.MYSQL_PASSWORD !== "";
            const hint = hasPassword
                ? "请确认账号/权限正确，或该账号允许本机连接。"
                : "请创建 d:\\Nextjs\\my-app\\.env.local 并设置 MYSQL_PASSWORD，然后重启 pnpm dev。";
            throw new Error(`MySQL 连接失败：${user}@${host} 无法访问数据库 ${database}。${hint}`);
        }
        throw error;
    }
}

function toIso(value: unknown) {
    if (value instanceof Date) return value.toISOString();
    if (typeof value === "string" || typeof value === "number") return new Date(value).toISOString();
    return new Date().toISOString();
}

export async function listPosts(): Promise<Post[]> {
    await ensureSchema();
    const pool = getPool();
    const [rows] = await pool.query(
        "SELECT id, title, content, created_at FROM posts ORDER BY created_at DESC"
    );

    return (rows as any[]).map((r) => ({
        id: String(r.id),
        title: String(r.title),
        content: String(r.content),
        createdAt: toIso(r.created_at),
    }));
}

export async function findPostById(id: string): Promise<Post | null> {
    await ensureSchema();
    const pool = getPool();
    const [rows] = await pool.query(
        "SELECT id, title, content, created_at FROM posts WHERE id = ? LIMIT 1",
        [id]
    );
    const row = (rows as any[])[0];
    if (!row) return null;

    return {
        id: String(row.id),
        title: String(row.title),
        content: String(row.content),
        createdAt: toIso(row.created_at),
    };
}

export async function createPost(input: { title: string; content: string }): Promise<Post> {
    await ensureSchema();
    const pool = getPool();
    const id = randomUUID();
    const createdAt = new Date();

    await pool.execute(
        "INSERT INTO posts (id, title, content, created_at) VALUES (?, ?, ?, ?)",
        [id, input.title, input.content, createdAt]
    );

    return { id, title: input.title, content: input.content, createdAt: createdAt.toISOString() };
}
