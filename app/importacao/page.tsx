"use client";

import { useState } from "react";

type UploadResposta = {
  ok: boolean;
  arquivo?: string;
  totalLinhas?: number;
  inseridos?: number;
  ignorados?: number;
  ativosCriados?: number;
  erros?: string[];
  error?: string;
};

export default function ImportacaoPage() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState<UploadResposta | null>(null);

  async function enviarArquivo(e: React.FormEvent) {
    e.preventDefault();

    if (!arquivo) {
      setResultado({
        ok: false,
        error: "Selecione um arquivo antes de importar.",
      });
      return;
    }

    try {
      setCarregando(true);
      setResultado(null);

      const formData = new FormData();
      formData.append("file", arquivo);

      const response = await fetch("/api/upload-b3", {
        method: "POST",
        body: formData,
      });

      const data: UploadResposta = await response.json();
      setResultado(data);
    } catch (error) {
      setResultado({
        ok: false,
        error: "Erro inesperado ao enviar o arquivo.",
      });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <h1>Importação B3</h1>
      <p>Envie o arquivo da B3 para carregar posições da carteira.</p>

      <div
        style={{
          marginTop: "24px",
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "760px",
        }}
      >
        <form onSubmit={enviarArquivo}>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="arquivo-b3"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Arquivo da B3
            </label>

            <input
              id="arquivo-b3"
              name="arquivo-b3"
              type="file"
              accept=".csv,.txt"
              onChange={(e) => setArquivo(e.target.files?.[0] || null)}
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                background: "#fff",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            style={{
              padding: "12px 18px",
              background: carregando ? "#6b7280" : "#111827",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: carregando ? "not-allowed" : "pointer",
            }}
          >
            {carregando ? "Importando..." : "Importar arquivo"}
          </button>
        </form>

        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            borderRadius: "8px",
            background: "#f9fafb",
            color: "#374151",
          }}
        >
          {!resultado && <p>Nenhum arquivo processado ainda.</p>}

          {resultado && resultado.ok && (
            <div>
              <p><strong>Importação concluída com sucesso.</strong></p>
              <p>Arquivo: {resultado.arquivo}</p>
              <p>Total de linhas: {resultado.totalLinhas}</p>
              <p>Inseridos: {resultado.inseridos}</p>
              <p>Ignorados: {resultado.ignorados}</p>
              <p>Ativos criados: {resultado.ativosCriados}</p>

              {resultado.erros && resultado.erros.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  <strong>Observações:</strong>
                  <ul>
                    {resultado.erros.map((erro, index) => (
                      <li key={index}>{erro}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {resultado && !resultado.ok && (
            <div style={{ color: "#b91c1c" }}>
              <p><strong>Falha na importação.</strong></p>
              <p>{resultado.error || "Erro desconhecido."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}