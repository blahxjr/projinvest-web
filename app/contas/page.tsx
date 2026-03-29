import { pool } from "../../lib/db";

export default async function ContasPage() {
  const result = await pool.query(`
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
    ORDER BY cc.created_at DESC
  `);

  const contas = result.rows;

  return (
    <div>
      <h1>Contas</h1>
      <p>Contas vinculadas aos clientes e instituições.</p>

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
              <th style={{ padding: "12px" }}>Apelido</th>
              <th style={{ padding: "12px" }}>Número</th>
              <th style={{ padding: "12px" }}>Cliente</th>
              <th style={{ padding: "12px" }}>Instituição</th>
              <th style={{ padding: "12px" }}>Criado em</th>
            </tr>
          </thead>
          <tbody>
            {contas.map((conta: any) => (
              <tr key={conta.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px" }}>{conta.apelido || "-"}</td>
                <td style={{ padding: "12px" }}>{conta.numero_conta}</td>
                <td style={{ padding: "12px" }}>{conta.cliente_nome}</td>
                <td style={{ padding: "12px" }}>{conta.instituicao_nome}</td>
                <td style={{ padding: "12px" }}>
                  {new Date(conta.created_at).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}

            {contas.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "16px", textAlign: "center" }}>
                  Nenhuma conta cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}