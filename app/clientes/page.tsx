import { pool } from "../../lib/db";
import Link from "next/link";
import { DataTable } from "../components/data-table";
import DeleteButton from "../components/delete-button";

type ClientesPageProps = {
  searchParams?: { q?: string };
};

export default async function ClientesPage({ searchParams }: ClientesPageProps) {
  const q = searchParams?.q?.trim() ?? "";
  const whereClause = q
    ? `WHERE nome ILIKE $1 OR documento ILIKE $1 OR email ILIKE $1`
    : "";
  const queryValues = q ? [`%${q}%`] : [];

  const result = await pool.query(
    `SELECT id, nome, documento, email, created_at FROM clientes ${whereClause} ORDER BY created_at DESC`,
    queryValues
  );

  const clientes = result.rows;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-sky-300 mb-1">Clientes</h1>
          <p className="text-slate-300">Cadastro de clientes do sistema.</p>
        </div>
        <Link
          href="/clientes/new"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
        >
          Novo cliente
        </Link>
      </div>

      <form action="" method="get" className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar por nome, documento ou e-mail"
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
        data={clientes}
        emptyText="Nenhum cliente cadastrado."
        columns={[
          { key: "nome", header: "Nome", cell: (row) => row.nome },
          { key: "documento", header: "Documento", cell: (row) => row.documento || "-" },
          { key: "email", header: "Email", cell: (row) => row.email || "-" },
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
                  href={`/clientes/${row.id}/edit`}
                  className="rounded-md border border-sky-400 bg-sky-600 px-2 py-1 text-xs text-white hover:bg-sky-500"
                >
                  Editar
                </Link>
                <DeleteButton entity="clientes" id={row.id} label="Excluir" />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}