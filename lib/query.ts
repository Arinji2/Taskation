import { createPool, Pool, PoolConnection } from "mysql2/promise";

const pool: Pool = createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  port: Number(process.env.DB_PORT!),
});

export async function query(sql: string, data?: any[]) {
  let connection: PoolConnection | undefined;
  try {
    connection = await pool.getConnection();
    const [results]: any = await connection.execute(sql, data);
    return results;
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
  }
}
