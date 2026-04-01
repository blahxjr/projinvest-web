import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "ProjInvest",
  description: "Gestão de carteira de investimentos",
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
    >
      {children}
    </Link>
  );
}

function MobileNav() {
  return (
    <nav className="flex flex-wrap gap-2 overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/80 p-2 text-xs md:hidden">
      <NavLink href="/">Dashboard</NavLink>
      <NavLink href="/clientes">Clientes</NavLink>
      <NavLink href="/contas">Contas</NavLink>
      <NavLink href="/ativos">Ativos</NavLink>
      <NavLink href="/posicoes">Posições</NavLink>
      <NavLink href="/importacao">Importação</NavLink>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen flex bg-[radial-gradient(circle_at_top,#0d1b34_0%,#020617_45%,#020617_100%)] text-slate-100">
          <aside className="hidden md:flex md:flex-col md:w-72 lg:w-64 border-r border-slate-800 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0b1121] p-6 min-h-screen sticky top-0">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-xl bg-slate-800/50 px-3 py-2 text-sm font-bold text-sky-300 shadow-sm">
                <span>⚡</span>
                <span>ProjInvest</span>
              </div>
            </div>

            <nav className="space-y-2 flex-1">
              <NavLink href="/">Dashboard</NavLink>
              <NavLink href="/clientes">Clientes</NavLink>
              <NavLink href="/contas">Contas</NavLink>
              <NavLink href="/ativos">Ativos</NavLink>
              <NavLink href="/posicoes">Posições</NavLink>
              <NavLink href="/importacao">Importação B3</NavLink>
            </nav>

            <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900/70 p-3 text-xs text-slate-400">
              <p className="text-slate-300 font-semibold">Tema</p>
              <p>Dark Pro</p>
            </div>
          </aside>

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
            <div className="md:hidden mb-4">
              <MobileNav />
            </div>

            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}