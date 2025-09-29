import { NextResponse } from "next/server";
import { pool } from "@/services/postgre";

export async function GET() {
  try {
    const res = await pool.query("SELECT NOW()");
    return NextResponse.json({ time: res.rows[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB query failed" }, { status: 500 });
  }
}
