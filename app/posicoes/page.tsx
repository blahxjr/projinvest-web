import { pool } from "../../lib/db";

export default async function PosicoesPage() {
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
    ORDER BY pd.data_referencia DESC, a.nome_produto ASC
  `);

  const posicoes = result.rows;

  return (
    <div>
      <h1>Posições</h1>
      <p>Posições da carteira consolidadas por ativo e conta.</p>

      <div
        style={{
          marginTop: "24px",
          background: "#fff",
          borderRadius: "12px",
          padding: "16px",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: "12px" }}>Data</th>
              <th style={{ padding: "12px" }}>Conta</th>
              <th style={{ padding: "12px" }}>Código</th>
              <th style={{ padding: "12px" }}>Ativo</th>
              <th style={{ padding: "12px" }}>Tipo</th>
              <th style={{ padding: "12px" }}>Quantidade</th>
              <th style={{ padding: "12px" }}>Preço</th>
              <th style={{ padding: "12px" }}>Valor líquido</th>
            </tr>
          </thead>
          <tbody>
            {posicoes.map((posicao: any) => (
              <tr key={posicao.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px" }}>
                  {new Date(posicao.data_referencia).toLocaleDateString("pt-BR")}
                </td>
                <td style={{ padding: "12px" }}>{posicao.conta}</td>
                <td style={{ padding: "12px" }}>{posicao.codigo_negociacao || "-"}</td>
                <td style={{ padding: "12px" }}>{posicao.nome_produto}</td>
                <td style={{ padding: "12px" }}>{posicao.tipo_investimento || "-"}</td>
                <td style={{ padding: "12px" }}>{posicao.quantidade}</td>
                <td style={{ padding: "12px" }}>{posicao.preco_fechamento || "-"}</td>
                <td style={{ padding: "12px" }}>{posicao.valor_liquido || "-"}</td>
              </tr>
            ))}

            {posicoes.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: "16px", textAlign: "center" }}>
                  Nenhuma posição cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}