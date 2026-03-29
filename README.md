# ProjInvest

Sistema web para gestão de carteira de investimentos com integração a PostgreSQL e preparação para importação de extratos da B3.

## Status do projeto

Em desenvolvimento.

## Funcionalidades implementadas até agora

- Dashboard inicial com resumo do sistema
- Listagem de clientes
- Listagem de contas vinculadas a clientes e instituições
- Listagem de ativos cadastrados
- Listagem de posições da carteira
- Tela de importação de arquivo B3
- API inicial para upload e processamento de CSV
- Integração com banco PostgreSQL local

## Stack utilizada

- Next.js 16
- React
- TypeScript
- PostgreSQL
- pg
- csv-parse

## Estrutura atual

```text
app/
  api/
    clientes/
    upload-b3/
  ativos/
  clientes/
  contas/
  importacao/
  posicoes/
  globals.css
  layout.tsx
  page.tsx

lib/
  db.ts
```

## Banco de dados

O projeto utiliza o banco PostgreSQL local `projinvest`.

Principais tabelas utilizadas:

- `clientes`
- `instituicoes`
- `contas_corretora`
- `tipos_investimento`
- `ativos`
- `posicoes_diarias`

## Variáveis de ambiente

Criar um arquivo `.env.local` na raiz com:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/projinvest
```

## Como rodar o projeto

```bash
npm install
npm run dev
```

Aplicação disponível em:

```text
http://localhost:3000
```

## Observações

- A importação B3 ainda está em fase inicial e pode exigir adaptação ao layout exato do arquivo real.
- O fluxo de upload já está funcional do frontend para a API.
- As páginas já consomem dados reais do PostgreSQL.

## Próximos passos

- Ajustar parser do arquivo real da B3
- Inserir posições reais na carteira
- Melhorar layout visual
- Criar formulários de cadastro
- Adicionar autenticação
- Preparar deploy