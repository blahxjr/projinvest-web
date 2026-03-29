## PROJINVEST WEB - CONTEXTO COMPLETO DO PROJETO

### Status atual (29/03/2026)
MVP funcional versionado no GitHub: https://github.com/blahxjr/projinvest-web
Próximo.js 16.2.1 + PostgreSQL local `projinvest` + TypeScript

### Stack
- Frontend: Next.js App Router + React + TypeScript
- Backend: PostgreSQL + pg (lib/db.ts)
- Estilização: Tailwind CSS
- CSV: csv-parse

### Banco de dados (projinvest)
Tabelas implementadas e funcionais:
├── clientes (id UUID, nome, documento, email, created_at)
├── instituicoes (id UUID, nome, cnpj, tipo, created_at)
├── contas_corretora (id UUID, cliente_id, instituicao_id, numero_conta, apelido)
├── tipos_investimento (id SERIAL, nome, descricao)
├── ativos (id UUID, codigo_negociacao, nome_produto, tipo_papel, tipo_investimento_id, emissor)
└── posicoes_diarias (id UUID, conta_id, ativo_id, data_referencia, quantidade, preco_fechamento, valor_liquido, hash_linha)

text
View: `resumo_carteira`

Dados de teste:
- Cliente: Junior Ferreira (123.456.789-00)
- Instituição: XP Investimentos
- Conta: Conta Principal (123456789)
- Ativo: PETR4 (PETROBRAS PN)
- Tipos: ACAO, BDR, ETF, FII, FIAGRO, RENDA_FIXA, TESOURO

### Estrutura de arquivos
projinvest-web/
├── app/
│ ├── api/
│ │ ├── clientes/route.ts
│ │ └── upload-b3/route.ts
│ ├── ativos/page.tsx
│ ├── clientes/page.tsx
│ ├── contas/page.tsx
│ ├── importacao/page.tsx
│ ├── posicoes/page.tsx
│ ├── layout.tsx
│ ├── page.tsx
│ ├── globals.css
│ └── favicon.ico
├── lib/db.ts (pool PostgreSQL)
├── docs/
│ └── progresso.md
├── .env.local (DATABASE_URL)
├── README.md
└── package.json

text

### Funcionalidades atuais
✅ Dashboard (KPIs, contadores)
✅ Listagem Clientes
✅ Listagem Contas (JOIN cliente + instituição)
✅ Listagem Ativos (JOIN tipo_investimento)
✅ Listagem Posições (JOIN conta, ativo, tipo)
✅ Tela + API Importação B3 (CSV → banco)
✅ Menu lateral responsivo
✅ Layout consistente

### Ambiente de desenvolvimento
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/projinvest
npm run dev → localhost:3000

text

### Próximos passos pendentes
1. Testar com arquivo real da B3 (ajustar parser)
2. Formulários de cadastro (POST /api/clientes, etc.)
3. Deploy Vercel
4. Autenticação
5. Melhorias visuais (Tailwind avançado)

### Contexto técnico
- Pool PostgreSQL reutilizável (lib/db.ts)
- Server Components (async/await direto no page.tsx)
- API Routes (app/api/upload-b3/route.ts)
- Tailwind CSS configurado

### Observações
- Importação B3 já detecta tipo de ativo automaticamente
- Deduplicação por hash_linha
- Ativos criados automaticamente se não existirem
- Primeira conta usada como destino do upload

---

**CONTINUE DESENVOLVIMENTO A PARTIR DESTE PONTO EXATO**


