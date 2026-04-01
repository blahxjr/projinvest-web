"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (response?.error) {
      setError("Email ou senha inválidos");
    } else {
      window.location.href = response?.url ?? "/";
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900/80 p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Entrar</h1>

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

        <button type="submit" className="w-full rounded-md bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-400">
          Entrar
        </button>

        <p className="mt-4 text-xs text-slate-400">
          Ainda não tem conta? <a href="/cadastro" className="text-sky-300 hover:text-sky-200">Cadastre-se</a>
        </p>
        <p className="text-xs text-slate-400">
          <a href="/esqueci-senha" className="text-sky-300 hover:text-sky-200">Esqueci a senha</a>
        </p>
      </form>
    </main>
  );
}
