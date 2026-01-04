import "server-only";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";

const globalForMysql = globalThis as unknown as { mysqlPool?: any };

function loadMysql2Promise() {
  try {
    const require = createRequire(import.meta.url);
    return require("mysql2/promise") as any;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `未找到依赖 mysql2/promise（${message}）。请在项目目录执行：pnpm add mysql2`
    );
  }
}

function getMysqlConfig() {
  const host = process.env.MYSQL_HOST ?? "127.0.0.1";
  const portRaw = process.env.MYSQL_PORT ?? "3306";
  const port = Number(portRaw);
  const user = process.env.MYSQL_USER ?? "root";
  const passwordEnv = process.env.MYSQL_PASSWORD;
  const password = passwordEnv === undefined ? undefined : String(passwordEnv);
  const database = process.env.MYSQL_DATABASE ?? "my_app";

  return { host, port: Number.isFinite(port) ? port : 3306, user, password, database };
}

export function getPool() {
  if (globalForMysql.mysqlPool) return globalForMysql.mysqlPool;

  const { host, port, user, password, database } = getMysqlConfig();

  const mysql = loadMysql2Promise();
  const pool = mysql.createPool({
    host,
    port,
    user,
    ...(password !== undefined ? { password } : {}),
    database,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60_000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    timezone: "Z",
    namedPlaceholders: true,
    connectAttributes: {
      program_name: "my-app",
      client_id: randomUUID(),
    },
  });

  globalForMysql.mysqlPool = pool;
  return pool;
}
