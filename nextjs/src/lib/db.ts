// import mysql from "mysql2/promise";
// import { env } from "@/lib/env";

// declare global {
//   var __mysqlPool: mysql.Pool | undefined;
// }

// export function dbPool(): mysql.Pool {
//   if (globalThis.__mysqlPool) return globalThis.__mysqlPool;

//   globalThis.__mysqlPool = mysql.createPool({
//     host: env.DB_HOST,
//     port: env.DB_PORT,
//     database: env.DB_NAME,
//     user: env.DB_USER,
//     password: env.DB_PASS,
//     connectionLimit: 10,
//     namedPlaceholders: true,
//     decimalNumbers: true,
//   });

//   return globalThis.__mysqlPool;
// }

