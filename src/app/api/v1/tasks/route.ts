//uri: api/v1/tasks
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { isValidStatus } from "@/models/v1/Task";
import { pool } from "@/services/postgre";

//GET
export async function GET(req: NextRequest) {
  let status_code = 200;
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      status_code = 401;
      throw new Error("Unauthorized");
    }

    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const status = searchParams.get("status");

    if (status && !isValidStatus(status)) {
      status_code = 400;
      throw new Error("Bad request: Incorrect status format");
    }

    let query = "SELECT * FROM tasks WHERE user_id = $1";
    const values: any[] = [userId];

    if (title) {
      values.push(`%${title}%`);
      query += ` AND title ILIKE $${values.length}`;
    }
    if (status) {
      values.push(status);
      query += ` AND status = $${values.length}`;
    }

    const res = await pool.query(query, values);

    return NextResponse.json(
      { success: true, data: res.rows },
      { status: status_code }
    );
  } catch (error) {
    console.error("GET tasks api:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : error,
      },
      { status: status_code }
    );
  }
}

//POST
export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, status, start_date, end_date } = body;

    if (!title || !status || !isValidStatus(status)) {
      return NextResponse.json(
        { success: false, error: "Bad Request - Required title and status" },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO tasks (title, description, status, user_id, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      title,
      description || null,
      status,
      userId,
      start_date || null,
      end_date || null,
    ];

    const res = await pool.query(query, values);

    return NextResponse.json(
      { success: true, data: res.rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "POST error API:",
      error instanceof Error ? error.stack : error
    );
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}

//PUT
export async function PUT(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task id required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { title, description, status, start_date, end_date } = body;

    const query = `
      UPDATE tasks
      SET title = $1,
          description = $2,
          status = $3,
          start_date = $4,
          end_date = $5
      WHERE id = $6 AND user_id = $7
      RETURNING *;
    `;
    const values = [
      title,
      description,
      status,
      start_date || null,
      end_date || null,
      id,
      userId,
    ];

    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        data: rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "PUT error API:",
      error instanceof Error ? error.stack : error
    );
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}

//DELETE
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task id required" },
        { status: 400 }
      );
    }

    const query = `DELETE FROM tasks 
      WHERE id = $1 AND user_id = $2 RETURNING *;`;
    const { rows } = await pool.query(query, [id, userId]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deleted: rows[0] });
  } catch (error) {
    console.error(
      "DELETE error API:",
      error instanceof Error ? error.stack : error
    );
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
