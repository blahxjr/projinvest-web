import { pool } from "../../lib/db";

export default async function AtivosPage() {
  const result = await pool.query(`
    SELECT 
      a.id,
      a.codigo_negociacao,
      a.nome_produto,
      a.tipo_papel,
      a.emissor,
      ti.nome AS tipo_investimento
    FROM ativos a
    LEFT JOIN tipos_investimento ti
      ON ti.id = a.tipo_investimento_id
    ORDER BY a.nome_produto ASC
  `);

  const ativos = result.rows;

  return (
    <div>
      <h1>Ativos</h1>
      <p>Cadastro de ativos financeiros do sistema.</p>

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
              <th style={{ padding: "12px" }}>Código</th>
              <th style={{ padding: "12px" }}>Nome</th>
              <th style={{ padding: "12px" }}>Tipo</th>
              <th style={{ padding: "12px" }}>Papel</th>
              <th style={{ padding: "12px" }}>Emissor</th>
            </tr>
          </thead>
          <tbody>
            {ativos.map((ativo: any) => (
              <tr key={ativo.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px" }}>{ativo.codigo_negociacao || "-"}</td>
                <td style={{ padding: "12px" }}>{ativo.nome_produto}</td>
                <td style={{ padding: "12px" }}>{ativo.tipo_investimento || "-"}</td>
                <td style={{ padding: "12px" }}>{ativo.tipo_papel || "-"}</td>
                <td style={{ padding: "12px" }}>{ativo.emissor || "-"}</td>
              </tr>
            ))}

            {ativos.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "16px", textAlign: "center" }}>
                  Nenhum ativo cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}