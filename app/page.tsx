import { pool } from "../lib/db";

export default async function Home() {
  const tiposResult = await pool.query(
    "SELECT id, nome, descricao FROM tipos_investimento ORDER BY id"
  );

  const clientesResult = await pool.query(
    "SELECT COUNT(*)::int AS total FROM clientes"
  );

  const ativosResult = await pool.query(
    "SELECT COUNT(*)::int AS total FROM ativos"
  );

  const posicoesResult = await pool.query(
    "SELECT COUNT(*)::int AS total FROM posicoes_diarias"
  );

  const tipos = tiposResult.rows;
  const totalClientes = clientesResult.rows[0]?.total ?? 0;
  const totalAtivos = ativosResult.rows[0]?.total ?? 0;
  const totalPosicoes = posicoesResult.rows[0]?.total ?? 0;

  return (
    <main className="min-h-screen p-6 bg-slate-950 text-slate-100">
      <section className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-sky-400">Dashboard</h1>
          <p className="text-slate-300">Sistema de gestão da carteira de investimentos.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-white/10 bg-slate-800 p-4 shadow-lg">
            <p className="text-sm text-slate-400">Clientes</p>
            <p className="text-3xl font-bold">{totalClientes}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-800 p-4 shadow-lg">
            <p className="text-sm text-slate-400">Ativos</p>
            <p className="text-3xl font-bold">{totalAtivos}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-800 p-4 shadow-lg">
            <p className="text-sm text-slate-400">Posições</p>
            <p className="text-3xl font-bold">{totalPosicoes}</p>
          </div>
        </div>

        <section className="rounded-xl border border-white/10 bg-slate-800 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-sky-300 mb-3">Tipos de investimento</h2>
          <ul className="space-y-2">
            {tipos.map((tipo: any) => (
              <li key={tipo.id} className="rounded-lg border border-white/5 bg-slate-900 p-3">
                <span className="font-semibold text-slate-100">{tipo.nome}</span>
                <span className="text-slate-400"> - {tipo.descricao}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}