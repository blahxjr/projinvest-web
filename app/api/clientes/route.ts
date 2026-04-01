import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";
import { requireAuth } from "@/lib/authGuard";

export async function GET(req: Request) {
  const auth = await requireAuth(req, ["ADMIN", "ADVISOR", "CLIENT"]);
  if (!auth.authorized) return auth.response!;
  try {
    // Simples, só o que precisamos para selects e listagens
    const result = await pool.query(
      `SELECT id, nome, documento, email
       FROM clientes
       ORDER BY nome ASC`
    );

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    return NextResponse.json(
      { message: "Erro ao listar clientes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const auth = await requireAuth(req, ["ADMIN", "ADVISOR"]);
  if (!auth.authorized) return auth.response!;

  try {
    const body = await req.json();
    const { nome, documento, email } = body;

    if (!nome || typeof nome !== "string") {
      return NextResponse.json(
        { message: "Nome é obrigatório" },
        { status: 400 }
      );
    }

    // Verificação de unicidade em aplicativo (defesa em profundidade)
    const duplicated = await pool.query(
      `SELECT id FROM clientes WHERE email = $1 OR documento = $2 LIMIT 1`,
      [email?.trim() || null, documento?.trim() || null]
    );

    if ((duplicated.rowCount ?? 0) > 0) {
      return NextResponse.json(
        { message: "Já existe cliente com mesmo email ou documento." },
        { status: 409 }
      );
    }

    const result = await pool.query(
      `INSERT INTO clientes (nome, documento, email)
       VALUES ($1, $2, $3)
       RETURNING id, nome, documento, email`,
      [nome.trim(), documento?.trim() || null, email?.trim() || null]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return NextResponse.json(
      { message: "Erro ao criar cliente" },
      { status: 500 }
    );
  }
}