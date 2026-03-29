import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "ProjInvest",
  description: "Gestão de carteira de investimentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <aside
            style={{
              width: "240px",
              background: "#111827",
              color: "#fff",
              padding: "24px",
            }}
          >
            <h2 style={{ marginTop: 0 }}>ProjInvest</h2>
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</Link>
              <Link href="/clientes" style={{ color: "#fff", textDecoration: "none" }}>Clientes</Link>
              <Link href="/contas" style={{ color: "#fff", textDecoration: "none" }}>Contas</Link>
              <Link href="/ativos" style={{ color: "#fff", textDecoration: "none" }}>Ativos</Link>
              <Link href="/posicoes" style={{ color: "#fff", textDecoration: "none" }}>Posições</Link>
              <Link href="/importacao" style={{ color: "#fff", textDecoration: "none" }}>Importação B3</Link>
            </nav>
          </aside>

          <main style={{ flex: 1, padding: "32px", background: "#f9fafb" }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}