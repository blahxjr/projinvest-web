import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';
import { requireAuth } from '@/lib/authGuard';

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  const auth = await requireAuth(req, ['ADMIN', 'ADVISOR', 'CLIENT']);
  if (!auth.authorized) return auth.response!;

  try {
    const result = await pool.query(
      `SELECT id, nome, documento, email, created_at FROM clientes WHERE id = $1`,
      [params.id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Cliente não encontrado' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return NextResponse.json({ message: 'Erro ao buscar cliente' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  const auth = await requireAuth(req, ['ADMIN', 'ADVISOR']);
  if (!auth.authorized) return auth.response!;

  try {
    const body = await req.json();
    const { nome, documento, email } = body;

    if (!nome || typeof nome !== 'string') {
      return NextResponse.json({ message: 'Nome é obrigatório' }, { status: 400 });
    }

    const duplicated = await pool.query(
      `SELECT id FROM clientes WHERE (email = $1 OR documento = $2) AND id <> $3 LIMIT 1`,
      [email?.trim() || null, documento?.trim() || null, params.id]
    );

    if ((duplicated.rowCount ?? 0) > 0) {
      return NextResponse.json({ message: 'Já existe cliente com mesmo email ou documento.' }, { status: 409 });
    }

    const result = await pool.query(
      `UPDATE clientes SET nome = $1, documento = $2, email = $3, updated_at = NOW() WHERE id = $4 RETURNING id, nome, documento, email`,
      [nome.trim(), documento?.trim() || null, email?.trim() || null, params.id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Cliente não encontrado' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    return NextResponse.json({ message: 'Erro ao atualizar cliente' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const auth = await requireAuth(req, ['ADMIN']);
  if (!auth.authorized) return auth.response!;

  try {
    await pool.query(`DELETE FROM clientes WHERE id = $1`, [params.id]);
    return NextResponse.json({ message: 'Cliente excluído' }, { status: 204 });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    return NextResponse.json({ message: 'Erro ao excluir cliente' }, { status: 500 });
  }
}
