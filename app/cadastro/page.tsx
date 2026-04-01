"use client";

import { useState } from "react";

export default function CadastroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      setSuccess("Cadastro realizado com sucesso. Faça login.");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      const json = await res.json();
      setError(json?.error === "email_already_exists" ? "Email já cadastrado." : "Erro no cadastro.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900/80 p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Cadastro</h1>

        <label className="block mb-4">
          <span className="text-sm text-slate-300">Nome</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-white"
          />
        </label>

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

        <label className="block mb-4">
          <span className="text-sm text-slate-300">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-white"
          />
        </label>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        {success && <p className="mb-4 text-sm text-emerald-400">{success}</p>}

        <button type="submit" className="w-full rounded-md bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-400">
          Criar conta
        </button>

        <p className="mt-4 text-xs text-slate-400">
          Já tem conta? <a href="/login" className="text-sky-300 hover:text-sky-200">Entrar</a>
        </p>
      </form>
    </main>
  );
}
