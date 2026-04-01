import { pool } from "../../lib/db";
import { DataTable } from "../components/data-table";

type PosicoesPageProps = {
  searchParams?: { q?: string };
};

type PosicaoRow = {
  id: string;
  data_referencia: string;
  quantidade: number;
  valor_liquido: number;
  preco_fechamento: number | null;
  conta: string;
  codigo_negociacao: string | null;
  nome_produto: string;
  tipo_investimento: string | null;
};

export default async function PosicoesPage({ searchParams }: PosicoesPageProps) {
  const q = searchParams?.q?.trim() ?? "";
  const whereClause = q
    ? `WHERE cc.apelido ILIKE $1 OR a.codigo_negociacao ILIKE $1 OR a.nome_produto ILIKE $1 OR ti.nome ILIKE $1`
    : "";
  const queryValues = q ? [`%${q}%`] : [];

  const result = await pool.query(`
    SELECT
      pd.id,
      pd.data_referencia,
      pd.quantidade,
      pd.valor_liquido,
      pd.preco_fechamento,
      cc.apelido AS conta,
      a.codigo_negociacao,
      a.nome_produto,
      ti.nome AS tipo_investimento
    FROM posicoes_diarias pd
    JOIN contas_corretora cc ON cc.id = pd.conta_id
    JOIN ativos a ON a.id = pd.ativo_id
    LEFT JOIN tipos_investimento ti ON ti.id = a.tipo_investimento_id
    ${whereClause}
    ORDER BY pd.data_referencia DESC, a.nome_produto ASC
  `, queryValues);

  const posicoes = result.rows as PosicaoRow[];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-300 mb-2">Posições</h1>
      <p className="text-slate-300 mb-6">Posições da carteira consolidadas por ativo e conta.</p>

      <form action="" method="get" className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar por conta, código, ativo ou tipo"
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
        data={posicoes}
        emptyText="Nenhuma posição cadastrada."
        columns={[
          {
            key: "data",
            header: "Data",
            cell: (row) => new Date(row.data_referencia).toLocaleDateString("pt-BR"),
          },
          { key: "conta", header: "Conta", cell: (row) => row.conta },
          { key: "codigo", header: "Código", cell: (row) => row.codigo_negociacao || "-" },
          { key: "ativo", header: "Ativo", cell: (row) => row.nome_produto },
          { key: "tipo", header: "Tipo", cell: (row) => row.tipo_investimento || "-" },
          { key: "quantidade", header: "Quantidade", cell: (row) => row.quantidade },
          { key: "preco", header: "Preço", cell: (row) => row.preco_fechamento || "-" },
          { key: "valor", header: "Valor líquido", cell: (row) => row.valor_liquido || "-" },
        ]}
      />
    </div>
  );
}