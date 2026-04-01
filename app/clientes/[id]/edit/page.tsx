import { pool } from '../../../../lib/db';
import ClienteEditForm from '../../../components/cliente-edit-form';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ClienteEditarPage({ params }: PageProps) {
  const result = await pool.query('SELECT id, nome, documento, email FROM clientes WHERE id = $1', [params.id]);
  const cliente = result.rows[0];

  if (!cliente) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-sky-300">Cliente não encontrado</h1>
        <p className="text-slate-300 mt-2">Verifique o cliente e tente novamente.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-slate-950 text-slate-100">
      <ClienteEditForm cliente={cliente} />
    </main>
  );
}
