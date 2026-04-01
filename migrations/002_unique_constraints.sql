-- Migration 002: Unique constraints for identificação e integridade

-- clientes: documento (CPF/CNPJ) e email únicos
ALTER TABLE IF EXISTS clientes
  ADD CONSTRAINT IF NOT EXISTS clientes_documento_unique UNIQUE (documento);

ALTER TABLE IF EXISTS clientes
  ADD CONSTRAINT IF NOT EXISTS clientes_email_unique UNIQUE (email);

-- instituicoes: cnpj único
ALTER TABLE IF EXISTS instituicoes
  ADD CONSTRAINT IF NOT EXISTS instituicoes_cnpj_unique UNIQUE (cnpj);

-- tipos_investimento: nome único
ALTER TABLE IF EXISTS tipos_investimento
  ADD CONSTRAINT IF NOT EXISTS tipos_investimento_nome_unique UNIQUE (nome);

-- contas_corretora: número da conta por cliente+instituição único
ALTER TABLE IF EXISTS contas_corretora
  ADD CONSTRAINT IF NOT EXISTS contas_corretora_unq UNIQUE (cliente_id, instituicao_id, numero_conta);

-- ativos: código de negociação único
ALTER TABLE IF EXISTS ativos
  ADD CONSTRAINT IF NOT EXISTS ativos_codigo_negociacao_unique UNIQUE (codigo_negociacao);

-- posições diárias: uma entrada única por conta/ativo/data
ALTER TABLE IF EXISTS posicoes_diarias
  ADD CONSTRAINT IF NOT EXISTS posicoes_diarias_unq UNIQUE (conta_id, ativo_id, data_referencia);
