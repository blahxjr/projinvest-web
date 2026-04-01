'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type Conta = {
  id: string;
  cliente_id: string;
  instituicao_id: string;
  numero_conta: string;
  apelido: string | null;
};

type Option = { id: string; nome: string };

type Props = {
  conta: Conta;
  clientes: Option[];
  instituicoes: Option[];
};

export default function ContaEditForm({ conta, clientes, instituicoes }: Props) {
  const router = useRouter();
  const [clienteId, setClienteId] = useState(conta.cliente_id);
  const [instituicaoId, setInstituicaoId] = useState(conta.instituicao_id);
  const [numeroConta, setNumeroConta] = useState(conta.numero_conta);
  const [apelido, setApelido] = useState(conta.apelido || '');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!clienteId || !instituicaoId || !numeroConta.trim()) {
      setError('Preencha cliente, instituição e número da conta.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/contas/${conta.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteId,
          instituicaoId,
          numeroConta: numeroConta.trim(),
          apelido: apelido.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Erro ao atualizar conta.');
      }

      router.push('/contas');
      router.refresh();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Erro ao atualizar conta.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-sky-300 mb-4">Editar Conta</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/70 rounded-xl border border-slate-700 p-6">
        <div>
          <label htmlFor="cliente" className="text-sm font-medium text-slate-200">
            Cliente
          </label>
          <select
            id="cliente"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="">Selecione cliente</option>
            {clientes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="instituicao" className="text-sm font-medium text-slate-200">
            Instituição
          </label>
          <select
            id="instituicao"
            value={instituicaoId}
            onChange={(e) => setInstituicaoId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="">Selecione instituição</option>
            {instituicoes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="numeroConta" className="text-sm font-medium text-slate-200">
            Número da conta
          </label>
          <input
            id="numeroConta"
            value={numeroConta}
            onChange={(e) => setNumeroConta(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div>
          <label htmlFor="apelido" className="text-sm font-medium text-slate-200">
            Apelido
          </label>
          <input
            id="apelido"
            value={apelido}
            onChange={(e) => setApelido(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {error && <p className="text-sm text-rose-300">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push('/contas')}
            className="rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-slate-100 hover:bg-slate-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400 disabled:opacity-70"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}
