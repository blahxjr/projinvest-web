import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";
import { requireAuth } from "@/lib/authGuard";

export async function GET(req: Request) {
  const auth = await requireAuth(req, ["ADMIN", "ADVISOR", "CLIENT"]);
  if (!auth.authorized) return auth.response!;
  try {
    const result = await pool.query(`
      SELECT
        cc.id,
        cc.numero_conta,
        cc.apelido,
        c.nome AS cliente_nome,
        i.nome AS instituicao_nome,
        cc.created_at
      FROM contas_corretora cc
      JOIN clientes c ON c.id = cc.cliente_id
      JOIN instituicoes i ON i.id = cc.instituicao_id
      ORDER BY cc.created_at DESC
    `);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Erro ao listar contas:", error);
    return NextResponse.json(
      { message: "Erro ao listar contas" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const auth = await requireAuth(req, ["ADMIN", "ADVISOR"]);
  if (!auth.authorized) return auth.response!;

  try {
    const body = await req.json();
    const { clienteId, instituicaoId, numeroConta, apelido } = body;

    if (!clienteId || !instituicaoId || !numeroConta) {
      return NextResponse.json(
        { message: "Cliente, instituição e número da conta são obrigatórios." },
        { status: 400 }
      );
    }

    const exists = await pool.query(
      `SELECT id FROM contas_corretora WHERE cliente_id = $1 AND instituicao_id = $2 AND numero_conta = $3 LIMIT 1`,
      [clienteId, instituicaoId, numeroConta.trim()]
    );

    if ((exists.rowCount ?? 0) > 0) {
      return NextResponse.json(
        { message: "Conta já cadastrada para essa instituição e cliente." },
        { status: 409 }
      );
    }

    const result = await pool.query(
      `INSERT INTO contas_corretora (cliente_id, instituicao_id, numero_conta, apelido)
       VALUES ($1, $2, $3, $4)
       RETURNING id, cliente_id, instituicao_id, numero_conta, apelido, created_at`,
      [clienteId, instituicaoId, numeroConta.trim(), apelido?.trim() || null]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    return NextResponse.json(
      { message: "Erro ao criar conta" },
      { status: 500 }
    );
  }
}