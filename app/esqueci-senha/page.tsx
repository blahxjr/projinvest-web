"use client";

import { useState } from "react";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Um e-mail de recuperação será enviado se este endereço existir.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900/80 p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Recuperar senha</h1>

        <label className="block mb-4">
          <span className="text-sm text-slate-300">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-white"
          />
        </label>

        <button type="submit" className="w-full rounded-md bg-amber-500 px-4 py-2 font-semibold text-slate-900 hover:bg-amber-400">
          Enviar link de recuperação
        </button>

        {status && <p className="mt-4 text-sm text-emerald-300">{status}</p>}

        <p className="mt-4 text-xs text-slate-400">
          Lembrou a senha? <a href="/login" className="text-sky-300 hover:text-sky-200">Voltar ao login</a>
        </p>
      </form>
    </main>
  );
}
