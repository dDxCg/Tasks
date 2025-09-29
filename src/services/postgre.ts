import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.POSTGRE_USER || "postgre_user",
  host: process.env.POSTGRE_HOST || "localhost",
  database: process.env.POSTGRE_NAME || "postgre_db",
  password: process.env.POSTGRE_PASSWORD || "postgre_password",
  port: Number(process.env.POSTGRE_PORT || 5432),
});
