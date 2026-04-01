import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';
import { requireAuth } from '@/lib/authGuard';

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  const auth = await requireAuth(req, ['ADMIN', 'ADVISOR', 'CLIENT']);
  if (!auth.authorized) return auth.response!;

  try {
    const result = await pool.query(
      `
      SELECT
        cc.id,
        cc.cliente_id,
        cc.instituicao_id,
        cc.numero_conta,
        cc.apelido,
        c.nome AS cliente_nome,
        i.nome AS instituicao_nome,
        cc.created_at
      FROM contas_corretora cc
      JOIN clientes c ON c.id = cc.cliente_id
      JOIN instituicoes i ON i.id = cc.instituicao_id
      WHERE cc.id = $1
    `,
      [params.id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Conta não encontrada' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar conta:', error);
    return NextResponse.json({ message: 'Erro ao buscar conta' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  const auth = await requireAuth(req, ['ADMIN', 'ADVISOR']);
  if (!auth.authorized) return auth.response!;

  try {
    const body = await req.json();
    const { clienteId, instituicaoId, numeroConta, apelido } = body;

    if (!clienteId || !instituicaoId || !numeroConta) {
      return NextResponse.json({ message: 'Cliente, instituição e número da conta são obrigatórios.' }, { status: 400 });
    }

    const exists = await pool.query(
      `SELECT id FROM contas_corretora WHERE cliente_id = $1 AND instituicao_id = $2 AND numero_conta = $3 AND id <> $4 LIMIT 1`,
      [clienteId, instituicaoId, numeroConta.trim(), params.id]
    );

    if ((exists.rowCount ?? 0) > 0) {
      return NextResponse.json({ message: 'Conta já cadastrada para essa instituição e cliente.' }, { status: 409 });
    }

    const result = await pool.query(
      `UPDATE contas_corretora SET cliente_id = $1, instituicao_id = $2, numero_conta = $3, apelido = $4, updated_at = NOW() WHERE id = $5 RETURNING id, cliente_id, instituicao_id, numero_conta, apelido, created_at`,
      [clienteId, instituicaoId, numeroConta.trim(), apelido?.trim() || null, params.id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Conta não encontrada' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar conta:', error);
    return NextResponse.json({ message: 'Erro ao atualizar conta' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const auth = await requireAuth(req, ['ADMIN']);
  if (!auth.authorized) return auth.response!;

  try {
    await pool.query(`DELETE FROM contas_corretora WHERE id = $1`, [params.id]);
    return NextResponse.json({ message: 'Conta excluída' }, { status: 204 });
  } catch (error) {
    console.error('Erro ao excluir conta:', error);
    return NextResponse.json({ message: 'Erro ao excluir conta' }, { status: 500 });
  }
}
