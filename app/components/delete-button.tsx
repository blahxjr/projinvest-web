'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type DeleteButtonProps = {
  entity: 'clientes' | 'contas';
  id: string;
  label?: string;
};

export default function DeleteButton({ entity, id, label = 'Excluir' }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onDelete() {
    if (!window.confirm('Tem certeza que deseja excluir este registro?')) {
      return;
    }
    setIsDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/${entity}/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Erro ao excluir.');
      }

      router.refresh();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Erro ao excluir.');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting}
        className="rounded-md border border-red-500 bg-red-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-500 disabled:opacity-50"
      >
        {isDeleting ? 'Excluindo...' : label}
      </button>
      {error && <p className="text-xs text-rose-300">{error}</p>}
    </div>
  );
}
