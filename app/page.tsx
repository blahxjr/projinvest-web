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
    <div>
      <h1>Dashboard</h1>
      <p>Sistema de gestão da carteira de investimentos.</p>

      <div style={{ display: "flex", gap: "16px", margin: "24px 0", flexWrap: "wrap" }}>
        <div style={{ background: "#fff", padding: "16px", borderRadius: "12px", minWidth: "180px" }}>
          <strong>Clientes</strong>
          <div>{totalClientes}</div>
        </div>

        <div style={{ background: "#fff", padding: "16px", borderRadius: "12px", minWidth: "180px" }}>
          <strong>Ativos</strong>
          <div>{totalAtivos}</div>
        </div>

        <div style={{ background: "#fff", padding: "16px", borderRadius: "12px", minWidth: "180px" }}>
          <strong>Posições</strong>
          <div>{totalPosicoes}</div>
        </div>
      </div>

      <div style={{ background: "#fff", padding: "16px", borderRadius: "12px" }}>
        <h2>Tipos de investimento</h2>
        <ul>
          {tipos.map((tipo: any) => (
            <li key={tipo.id}>
              {tipo.nome} - {tipo.descricao}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}