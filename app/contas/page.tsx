import { pool } from "../../lib/db";
import Link from "next/link";
import { DataTable } from "../components/data-table";
import DeleteButton from "../components/delete-button";

type ContasPageProps = {
  searchParams?: { q?: string };
};

type ContaRow = {
  id: string;
  numero_conta: string;
  apelido: string | null;
  cliente_nome: string;
  instituicao_nome: string;
  created_at: string;
};

export default async function ContasPage({ searchParams }: ContasPageProps) {
  const q = searchParams?.q?.trim() ?? "";
  const whereClause = q
    ? `WHERE cc.numero_conta ILIKE $1 OR cc.apelido ILIKE $1 OR c.nome ILIKE $1 OR i.nome ILIKE $1`
    : "";
  const queryValues = q ? [`%${q}%`] : [];

  const result = await pool.query(
    `
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
    ${whereClause}
    ORDER BY cc.created_at DESC
  `,
    queryValues
  );

  const contas = result.rows as ContaRow[];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-sky-300 mb-1">Contas</h1>
          <p className="text-slate-300">Contas vinculadas aos clientes e instituições.</p>
        </div>
        <Link
          href="/contas/new"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
        >
          Nova conta
        </Link>
      </div>

      <form action="" method="get" className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar por conta, cliente ou instituição"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <button
          type="submit"
          className="w-full sm:w-auto rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400 transition-colors"
        >
          Buscar
        </button>
      </form>

      <DataTable
        data={contas}
        emptyText="Nenhuma conta cadastrada."
        columns={[
          { key: "apelido", header: "Apelido", cell: (row) => row.apelido || "-" },
          { key: "numero_conta", header: "Número", cell: (row) => row.numero_conta },
          { key: "cliente_nome", header: "Cliente", cell: (row) => row.cliente_nome },
          { key: "instituicao_nome", header: "Instituição", cell: (row) => row.instituicao_nome },
          {
            key: "criado",
            header: "Criado em",
            cell: (row) => new Date(row.created_at).toLocaleString("pt-BR"),
          },
          {
            key: "acoes",
            header: "Ações",
            cell: (row) => (
              <div className="flex gap-2">
                <Link
                  href={`/contas/${row.id}/edit`}
                  className="rounded-md border border-sky-400 bg-sky-600 px-2 py-1 text-xs text-white hover:bg-sky-500"
                >
                  Editar
                </Link>
                <DeleteButton entity="contas" id={row.id} label="Excluir" />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}