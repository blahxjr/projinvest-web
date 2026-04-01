-- Migration 003: Criação das tabelas de investimento e relacionamento

CREATE TABLE IF NOT EXISTS tipos_investimento (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  documento TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS instituicoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  tipo TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contas_corretora (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  instituicao_id UUID NOT NULL REFERENCES instituicoes(id) ON DELETE CASCADE,
  numero_conta TEXT NOT NULL,
  apelido TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ativos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo_negociacao TEXT NOT NULL,
  nome_produto TEXT NOT NULL,
  isin TEXT,
  cnpj_emissor_fundo TEXT,
  tipo_papel TEXT,
  tipo_investimento_id INT REFERENCES tipos_investimento(id) ON DELETE SET NULL,
  indexador TEXT,
  data_emissao DATE,
  data_vencimento DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posicoes_diarias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conta_id UUID NOT NULL REFERENCES contas_corretora(id) ON DELETE CASCADE,
  ativo_id UUID NOT NULL REFERENCES ativos(id) ON DELETE CASCADE,
  data_referencia DATE NOT NULL,
  quantidade NUMERIC NOT NULL,
  preco_fechamento NUMERIC,
  valor_liquido NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
