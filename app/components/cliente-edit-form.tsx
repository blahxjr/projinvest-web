'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type Cliente = {
  id: string;
  nome: string;
  documento: string | null;
  email: string | null;
};

type Props = { cliente: Cliente };

export default function ClienteEditForm({ cliente }: Props) {
  const router = useRouter();
  const [nome, setNome] = useState(cliente.nome);
  const [documento, setDocumento] = useState(cliente.documento || '');
  const [email, setEmail] = useState(cliente.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!nome.trim()) {
      setError('Nome é obrigatório.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/clientes/${cliente.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), documento: documento.trim() || null, email: email.trim() || null }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Erro ao atualizar cliente.');
      }

      router.push('/clientes');
      router.refresh();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Erro ao atualizar cliente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-sky-300 mb-4">Editar Cliente</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/70 rounded-xl border border-slate-700 p-6">
        <div>
          <label className="text-sm font-medium text-slate-200" htmlFor="nome">
            Nome
          </label>
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-200" htmlFor="documento">
            Documento
          </label>
          <input
            id="documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-200" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 p-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {error && <p className="text-sm text-rose-300">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push('/clientes')}
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
