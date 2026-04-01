import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";
import { requireAuth } from "@/lib/authGuard";

export async function POST(req: Request) {
  const auth = await requireAuth(req, ["ADMIN", "ADVISOR"]);
  if (!auth.authorized) return auth.response!;
  try {
    const body = await req.json();
    const {
      codigoNegociacao,
      nomeProduto,
      tipoPapel,
      emissor,
      tipoInvestimentoId,
    } = body;

    if (!nomeProduto || !codigoNegociacao) {
      return NextResponse.json(
        { message: "Nome do produto e código de negociação são obrigatórios." },
        { status: 400 }
      );
    }

    const exists = await pool.query(
      `SELECT id FROM ativos WHERE codigo_negociacao = $1 LIMIT 1`,
      [codigoNegociacao.trim()]
    );

    if ((exists.rowCount ?? 0) > 0) {
      return NextResponse.json(
        { message: "Ativo já cadastrado com esse código de negociação." },
        { status: 409 }
      );
    }

    const result = await pool.query(
      `INSERT INTO ativos (
         codigo_negociacao,
         nome_produto,
         tipo_papel,
         emissor,
         tipo_investimento_id
       )
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, codigo_negociacao, nome_produto, tipo_papel, emissor, tipo_investimento_id`,
      [
        codigoNegociacao.trim(),
        nomeProduto.trim(),
        tipoPapel?.trim() || null,
        emissor?.trim() || null,
        tipoInvestimentoId ? Number(tipoInvestimentoId) : null,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Erro ao criar ativo:", error);
    return NextResponse.json(
      { message: "Erro ao criar ativo" },
      { status: 500 }
    );
  }
}