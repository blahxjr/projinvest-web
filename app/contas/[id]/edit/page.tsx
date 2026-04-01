import { pool } from '../../../../lib/db';
import ContaEditForm from '../../../components/conta-edit-form';

type Option = { id: string; nome: string };

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ContaEditarPage({ params }: PageProps) {
  const contasResult = await pool.query(
    `SELECT id, cliente_id, instituicao_id, numero_conta, apelido FROM contas_corretora WHERE id = $1`,
    [params.id]
  );

  if (contasResult.rowCount === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-sky-300">Conta não encontrada</h1>
        <p className="text-slate-300 mt-2">Verifique o ID da conta e tente novamente.</p>
      </div>
    );
  }

  const conta = contasResult.rows[0];

  const clientesResult = await pool.query('SELECT id, nome FROM clientes ORDER BY nome');
  const instituicoesResult = await pool.query('SELECT id, nome FROM instituicoes ORDER BY nome');

  const clientes: Option[] = clientesResult.rows;
  const instituicoes: Option[] = instituicoesResult.rows;

  return (
    <main className="min-h-screen p-6 bg-slate-950 text-slate-100">
      <ContaEditForm conta={conta} clientes={clientes} instituicoes={instituicoes} />
    </main>
  );
}
