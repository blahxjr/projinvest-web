import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";
import { requireAuth } from "@/lib/authGuard";

export async function GET(req: Request) {
  const auth = await requireAuth(req, ["ADMIN", "ADVISOR", "CLIENT"]);
  if (!auth.authorized) return auth.response!;

  try {
    const result = await pool.query(
      `SELECT id, nome FROM instituicoes ORDER BY nome ASC`
    );
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Erro ao listar instituições:", error);
    return NextResponse.json(
      { message: "Erro ao listar instituições" },
      { status: 500 }
    );
  }
}