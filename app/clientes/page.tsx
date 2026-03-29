import { pool } from "../../lib/db";

export default async function ClientesPage() {
  const result = await pool.query(
    `SELECT id, nome, documento, email, created_at
     FROM clientes
     ORDER BY created_at DESC`
  );

  const clientes = result.rows;

  return (
    <div>
      <h1>Clientes</h1>
      <p>Cadastro de clientes do sistema.</p>

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
              <th style={{ padding: "12px" }}>Nome</th>
              <th style={{ padding: "12px" }}>Documento</th>
              <th style={{ padding: "12px" }}>Email</th>
              <th style={{ padding: "12px" }}>Criado em</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente: any) => (
              <tr key={cliente.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px" }}>{cliente.nome}</td>
                <td style={{ padding: "12px" }}>{cliente.documento || "-"}</td>
                <td style={{ padding: "12px" }}>{cliente.email || "-"}</td>
                <td style={{ padding: "12px" }}>
                  {new Date(cliente.created_at).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}

            {clientes.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "16px", textAlign: "center" }}>
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}