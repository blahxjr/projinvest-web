"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type Option = { id: string; nome: string };

export default function NovoAtivoPage() {
  const router = useRouter();

  const [tiposInvestimento, setTiposInvestimento] = useState<Option[]>([]);
  const [tipoInvestimentoId, setTipoInvestimentoId] = useState("");

  const [codigoNegociacao, setCodigoNegociacao] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [tipoPapel, setTipoPapel] = useState("");
  const [emissor, setEmissor] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTipos() {
      try {
        const res = await fetch("/api/tipos-investimento");
        const data = await res.json();
        setTiposInvestimento(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar tipos de investimento.");
      }
    }

    loadTipos();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!codigoNegociacao.trim() || !nomeProduto.trim()) {
      setError("Preencha código de negociação e nome do produto.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/ativos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigoNegociacao: codigoNegociacao.trim(),
          nomeProduto: nomeProduto.trim(),
          tipoPapel: tipoPapel.trim() || null,
          emissor: emissor.trim() || null,
          tipoInvestimentoId: tipoInvestimentoId || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Erro ao salvar ativo.");
      }

      router.push("/ativos");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao salvar ativo.");
      } else {
        setError("Erro ao salvar ativo.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-300 mb-2">Novo ativo</h1>
      <p className="text-slate-300 mb-6">Cadastre um ativo financeiro para uso nas posições.</p>

      <div className="panel">
        {error && (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="codigo" className="block mb-1 text-sm font-semibold text-slate-200">
                Código de negociação *
              </label>
              <input
                id="codigo"
                type="text"
                value={codigoNegociacao}
                onChange={(e) => setCodigoNegociacao(e.target.value.toUpperCase())}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div>
              <label htmlFor="nomeProduto" className="block mb-1 text-sm font-semibold text-slate-200">
                Nome do produto *
              </label>
              <input
                id="nomeProduto"
                type="text"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div>
              <label htmlFor="tipoInvestimento" className="block mb-1 text-sm font-semibold text-slate-200">
                Tipo de investimento
              </label>
              <select
                id="tipoInvestimento"
                value={tipoInvestimentoId}
                onChange={(e) => setTipoInvestimentoId(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400"
              >
                <option value="">Selecione</option>
                {tiposInvestimento.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tipoPapel" className="block mb-1 text-sm font-semibold text-slate-200">
                Tipo de papel
              </label>
              <input
                id="tipoPapel"
                type="text"
                value={tipoPapel}
                onChange={(e) => setTipoPapel(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="emissor" className="block mb-1 text-sm font-semibold text-slate-200">
                Emissor
              </label>
              <input
                id="emissor"
                type="text"
                value={emissor}
                onChange={(e) => setEmissor(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => router.push("/ativos")}
              className="rounded-full border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
                isSubmitting
                  ? "bg-slate-500 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-400"
              }`}
            >
              {isSubmitting ? "Salvando..." : "Salvar ativo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}