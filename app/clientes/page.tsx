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
      <h1 className="text-2xl font-bold text-sky-300 mb-2">Clientes</h1>
      <p className="text-slate-300 mb-4">Cadastro de clientes do sistema.</p>

      <div className="table-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Documento</th>
              <th>Email</th>
              <th>Criado em</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente: { id: string; nome: string; documento: string; email: string; created_at: string }) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.documento || "-"}</td>
                <td>{cliente.email || "-"}</td>
                <td>{new Date(cliente.created_at).toLocaleString("pt-BR")}</td>
              </tr>
            ))}

            {clientes.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "16px", textAlign: "center", color: "#94a3b8" }}>
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