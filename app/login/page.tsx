# PROJINVEST — Backlog Revisado

> Última revisão: 2026-04-01
> Base atual: MVP funcional com dashboard, CRUD principal, importação B3 com deduplicação inicial, PostgreSQL integrado, autenticação e proteção básica de rotas.
> Direção do produto: plataforma patrimonial completa, segura, auditável, elegante e responsiva, com inspiração visual na Área do Investidor da B3.

---

## Legenda
- [ ] Pendente
- [🔄] Em progresso
- [✅] Concluído
- [⏸️] Aguardando decisão
- [❌] Cancelado

---

## ÉPICO 01 — Arquitetura, Qualidade e Direção do Produto

### OBJ-001 — Consolidar diretrizes de desenvolvimento
- [ ] **TASK-001** Revisar e consolidar `.github/copilot-instructions.md`
  - [ ] Subtask: alinhar visão do produto
  - [ ] Subtask: alinhar segurança, auditoria e deduplicação
  - [ ] Subtask: alinhar regras de execução por tarefas e subtarefas
- [ ] **TASK-002** Criar instruções path-specific para frontend e backend
  - [ ] Subtask: criar `.github/instructions/frontend.instructions.md`
  - [ ] Subtask: criar `.github/instructions/backend.instructions.md`
- [ ] **TASK-003** Atualizar backlog e critérios de aceite por épico
  - [ ] Subtask: revisar prioridades
  - [ ] Subtask: quebrar entregas grandes em subtarefas
  - [ ] Subtask: definir critérios mínimos de conclusão

---

## ÉPICO 02 — Segurança, Autenticação e Sessão

### OBJ-002 — Tornar o acesso seguro e previsível
- [✅] **TASK-004** Estruturar autenticação base
- [✅] **TASK-005** Proteger rotas públicas e privadas com middleware
- [✅] **TASK-006** Implementar papéis de acesso (`ADMIN`, `ADVISOR`, `CLIENT`)
- [ ] **TASK-007** Endurecer segurança da aplicação
  - [ ] Subtask: adicionar headers de segurança no `next.config.ts`
  - [ ] Subtask: revisar CSP, HSTS, X-Frame-Options e X-Content-Type-Options
  - [ ] Subtask: padronizar respostas seguras em erros de auth
- [ ] **TASK-008** Implementar rate limiting
  - [ ] Subtask: limitar rotas de login
  - [ ] Subtask: limitar endpoints sensíveis
  - [ ] Subtask: definir mensagens de bloqueio seguras
- [ ] **TASK-009** Revisar UX de autenticação
  - [ ] Subtask: login refinado
  - [ ] Subtask: cadastro refinado
  - [ ] Subtask: esqueci senha
  - [ ] Subtask: feedback de sessão expirada
- [ ] **TASK-010** Registrar logs de eventos de autenticação
  - [ ] Subtask: login com sucesso
  - [ ] Subtask: login com falha
  - [ ] Subtask: logout
  - [ ] Subtask: tentativa de acesso sem permissão

---

## ÉPICO 03 — Design System e Layout Inspirado na B3

### OBJ-003 — Modernizar completamente a experiência visual
- [ ] **TASK-011** Definir design system oficial do produto
  - [ ] Subtask: paleta padrão elegante
  - [ ] Subtask: tokens de cor, tipografia, espaçamento e radius
  - [ ] Subtask: suporte a dark mode e light mode
  - [ ] Subtask: suporte à personalização de cor primária pelo usuário
- [ ] **TASK-012** Reestruturar layout base autenticado
  - [ ] Subtask: `AppLayout`
  - [ ] Subtask: `AppSidebar`
  - [ ] Subtask: `AppHeader`
  - [ ] Subtask: breadcrumb e área contextual
  - [ ] Subtask: adaptação mobile
- [ ] **TASK-013** Criar biblioteca de componentes reutilizáveis
  - [ ] Subtask: `PageHeader`
  - [ ] Subtask: `KpiCard`
  - [ ] Subtask: `DataTable`
  - [ ] Subtask: `EmptyState`
  - [ ] Subtask: `SkeletonCard`
  - [ ] Subtask: `SkeletonTable`
  - [ ] Subtask: `FormSection`
  - [ ] Subtask: `DetailSection`
  - [ ] Subtask: `AuditTimeline`
- [ ] **TASK-014** Criar estados visuais padronizados
  - [ ] Subtask: `loading.tsx`
  - [ ] Subtask: `error.tsx`
  - [ ] Subtask: empty states
  - [ ] Subtask: mensagens de feedback
- [ ] **TASK-015** Adicionar animações funcionais e discretas
  - [ ] Subtask: transição de página
  - [ ] Subtask: contadores animados
  - [ ] Subtask: entrada escalonada de listas

---

## ÉPICO 04 — Banco de Dados, Integridade e Auditoria

### OBJ-004 — Fortalecer a base de dados do produto
- [ ] **TASK-016** Revisar schema atual e mapear gaps
  - [ ] Subtask: revisar entidades existentes
  - [ ] Subtask: revisar chaves e índices
  - [ ] Subtask: revisar lacunas para patrimônio expandido
- [ ] **TASK-017** Criar migrations aditivas para domínio ampliado
  - [ ] Subtask: tabela/ajustes de usuários se necessário
  - [ ] Subtask: tabela de transações
  - [ ] Subtask: tabela de detalhes de renda fixa
  - [ ] Subtask: tabelas de ativos alternativos
  - [ ] Subtask: tabela/config de rebalanceamento
- [ ] **TASK-018** Implementar restrições de deduplicação no banco
  - [ ] Subtask: definir unique constraints essenciais
  - [ ] Subtask: definir índices compostos
  - [ ] Subtask: revisar importações para idempotência
- [ ] **TASK-019** Criar estrutura de auditoria
  - [ ] Subtask: tabela `audit_logs` ou equivalente
  - [ ] Subtask: modelo de evento auditável
  - [ ] Subtask: colunas de before/after resumido
  - [ ] Subtask: associação com usuário e entidade
- [ ] **TASK-020** Padronizar timestamps, soft delete e colunas operacionais
  - [ ] Subtask: revisar `created_at`
  - [ ] Subtask: revisar `updated_at`
  - [ ] Subtask: avaliar `deleted_at`
  - [ ] Subtask: alinhar queries e filtros

---

## ÉPICO 05 — Backend de Domínio e Regras de Negócio

### OBJ-005 — Tornar o backend a fonte de verdade
- [ ] **TASK-021** Padronizar arquitetura de serviços e validações
  - [ ] Subtask: separar handlers, services e acesso a dados
  - [ ] Subtask: padronizar validações
  - [ ] Subtask: padronizar erros
- [ ] **TASK-022** Implementar auditoria automática em operações críticas
  - [ ] Subtask: create
  - [ ] Subtask: update
  - [ ] Subtask: delete
  - [ ] Subtask: import
- [ ] **TASK-023** Endurecer regras de deduplicação
  - [ ] Subtask: cliente
  - [ ] Subtask: conta por instituição
  - [ ] Subtask: ativo por chave de negócio
  - [ ] Subtask: movimentação/importação
- [ ] **TASK-024** Revisar tratamento de erros de API
  - [ ] Subtask: mensagens seguras
  - [ ] Subtask: status codes consistentes
  - [ ] Subtask: logs internos úteis
- [ ] **TASK-025** Criar base para preferências do usuário
  - [ ] Subtask: tema
  - [ ] Subtask: cor primária
  - [ ] Subtask: configurações de visualização

---

## ÉPICO 06 — Módulo de Cadastros Mestres

### OBJ-006 — Consolidar os cadastros centrais do sistema
- [ ] **TASK-026** Revisar CRUD de clientes
  - [ ] Subtask: validação
  - [ ] Subtask: deduplicação
  - [ ] Subtask: auditoria
  - [ ] Subtask: modernização visual
- [ ] **TASK-027** Revisar CRUD de instituições
  - [ ] Subtask: integridade
  - [ ] Subtask: filtros
  - [ ] Subtask: auditoria
- [ ] **TASK-028** Revisar CRUD de contas
  - [ ] Subtask: impedir duplicidade por cliente + instituição + identificador
  - [ ] Subtask: melhorar UX
  - [ ] Subtask: registrar alterações
- [ ] **TASK-029** Revisar CRUD de ativos base
  - [ ] Subtask: padronizar classificação
  - [ ] Subtask: impedir duplicidade por código/chave
  - [ ] Subtask: preparar ligação com movimentações

---

## ÉPICO 07 — Movimentações e Histórico Patrimonial

### OBJ-007 — Registrar a vida do patrimônio
- [ ] **TASK-030** Implementar módulo de transações
  - [ ] Subtask: compras
  - [ ] Subtask: vendas
  - [ ] Subtask: dividendos
  - [ ] Subtask: JCP
  - [ ] Subtask: cupons
  - [ ] Subtask: amortizações
- [ ] **TASK-031** Criar histórico por ativo
  - [ ] Subtask: timeline de eventos
  - [ ] Subtask: filtros por período
  - [ ] Subtask: vínculo com conta/instituição
- [ ] **TASK-032** Criar histórico consolidado do cliente
  - [ ] Subtask: visão por período
  - [ ] Subtask: visão por categoria
  - [ ] Subtask: visão por instituição
- [ ] **TASK-033** Garantir auditoria nas movimentações
  - [ ] Subtask: create/update/delete
  - [ ] Subtask: rastrear origem da movimentação

---

## ÉPICO 08 — Ativos de Mercado Tradicional

### OBJ-008 — Expandir suporte a investimentos financeiros
- [ ] **TASK-034** Página de ações
  - [ ] Subtask: listagem
  - [ ] Subtask: detalhe
  - [ ] Subtask: cadastro/manual
  - [ ] Subtask: histórico
- [ ] **TASK-035** Página de FIIs
- [ ] **TASK-036** Página de ETFs
- [ ] **TASK-037** Página de BDRs
- [ ] **TASK-038** Página de fundos
- [ ] **TASK-039** Página de debêntures
- [ ] **TASK-040** Página de renda fixa
  - [ ] Subtask: CDB
  - [ ] Subtask: LCI
  - [ ] Subtask: LCA
  - [ ] Subtask: LC
  - [ ] Subtask: CRI
  - [ ] Subtask: CRA
- [ ] **TASK-041** Página de ouro e metais
  - [ ] Subtask: ouro
  - [ ] Subtask: prata
  - [ ] Subtask: platina
  - [ ] Subtask: paládio
  - [ ] Subtask: cobre

---

## ÉPICO 09 — Ativos Alternativos e Patrimônio Não Custodiado

### OBJ-009 — Suportar patrimônio fora de corretoras
- [ ] **TASK-042** Módulo de imóveis
  - [ ] Subtask: cadastro
  - [ ] Subtask: renda mensal
  - [ ] Subtask: valor estimado
  - [ ] Subtask: histórico de avaliação
- [ ] **TASK-043** Módulo de veículos
  - [ ] Subtask: cadastro
  - [ ] Subtask: depreciação
  - [ ] Subtask: valor de referência
- [ ] **TASK-044** Módulo de joias e bens diversos
  - [ ] Subtask: cadastro
  - [ ] Subtask: categoria
  - [ ] Subtask: valor estimado
  - [ ] Subtask: data de avaliação
- [ ] **TASK-045** Módulo internacional
  - [ ] Subtask: contas internacionais
  - [ ] Subtask: ativos internacionais
  - [ ] Subtask: câmbio
  - [ ] Subtask: corretoras globais

---

## ÉPICO 10 — Dashboard e Portfolio Consolidado

### OBJ-010 — Entregar a visão 360 do patrimônio
- [ ] **TASK-046** Refatorar dashboard principal
  - [ ] Subtask: patrimônio total
  - [ ] Subtask: variação por período
  - [ ] Subtask: quantidade de ativos
  - [ ] Subtask: alertas
- [ ] **TASK-047** Gráfico de alocação por tipo
- [ ] **TASK-048** Gráfico de evolução patrimonial
- [ ] **TASK-049** Gráfico de concentração por ativo/instituição
- [ ] **TASK-050** Resumo por corretora e banco
- [ ] **TASK-051** Página `/portfolio`
  - [ ] Subtask: visão consolidada
  - [ ] Subtask: filtros
  - [ ] Subtask: exportações
  - [ ] Subtask: cálculo de preço médio
  - [ ] Subtask: lucro/prejuízo realizado e não realizado

---

## ÉPICO 11 — Diagnóstico, Perfil e Rebalanceamento

### OBJ-011 — Levar o sistema além do registro
- [ ] **TASK-052** Questionário de suitability
- [ ] **TASK-053** Classificação de perfil
- [ ] **TASK-054** Engine de diagnóstico patrimonial
- [ ] **TASK-055** Comparação entre alocação atual e ideal
- [ ] **TASK-056** Sugestão de rebalanceamento
- [ ] **TASK-057** Página `/diagnostico`
  - [ ] Subtask: score
  - [ ] Subtask: alertas
  - [ ] Subtask: recomendações
  - [ ] Subtask: simulação

---

## ÉPICO 12 — Importação, Conciliação e Qualidade Operacional

### OBJ-012 — Melhorar entrada de dados e confiabilidade
- [ ] **TASK-058** Evoluir importação B3
  - [ ] Subtask: ampliar compatibilidade
  - [ ] Subtask: preview antes de importar
  - [ ] Subtask: resumo da operação
  - [ ] Subtask: log do processamento
- [ ] **TASK-059** Suportar importações de corretoras relevantes
  - [ ] Subtask: XP
  - [ ] Subtask: Rico
  - [ ] Subtask: Clear
  - [ ] Subtask: BTG
- [ ] **TASK-060** Criar wizard de importação manual
  - [ ] Subtask: tipo
  - [ ] Subtask: dados básicos
  - [ ] Subtask: valores
  - [ ] Subtask: confirmação
- [ ] **TASK-061** Criar módulo de conciliação
  - [ ] Subtask: identificar divergências
  - [ ] Subtask: sugerir correções
  - [ ] Subtask: registrar resolução

---

## ÉPICO 13 — Documentos, Relatórios e Evidências

### OBJ-013 — Gerar entregáveis úteis ao usuário e ao assessor
- [ ] **TASK-062** Gerar PDF de suitability
- [ ] **TASK-063** Gerar extrato consolidado
- [ ] **TASK-064** Gerar contrato de gestão
- [ ] **TASK-065** Página `/documentos`
  - [ ] Subtask: listar
  - [ ] Subtask: gerar
  - [ ] Subtask: visualizar
  - [ ] Subtask: baixar
  - [ ] Subtask: reenviar
- [ ] **TASK-066** Configurações institucionais para documentos
  - [ ] Subtask: logo
  - [ ] Subtask: nome do assessor
  - [ ] Subtask: CNPJ
  - [ ] Subtask: CVM

---

## ÉPICO 14 — Configurações e Personalização

### OBJ-014 — Dar controle ao usuário sem perder coerência
- [ ] **TASK-067** Página `/configuracoes`
  - [ ] Subtask: dados pessoais
  - [ ] Subtask: senha
  - [ ] Subtask: preferências
  - [ ] Subtask: notificações
- [ ] **TASK-068** Personalização visual
  - [ ] Subtask: light/dark mode
  - [ ] Subtask: cor primária
  - [ ] Subtask: densidade visual se fizer sentido
- [ ] **TASK-069** Perfil do assessor
  - [ ] Subtask: logo
  - [ ] Subtask: CNPJ
  - [ ] Subtask: CVM
- [ ] **TASK-070** Gestão de clientes para `ADVISOR`/`ADMIN`
  - [ ] Subtask: listagem
  - [ ] Subtask: acesso a carteiras
  - [ ] Subtask: vínculo com suitability

---

## ÉPICO 15 — Observabilidade, Deploy e Produção

### OBJ-015 — Preparar o produto para operação real
- [ ] **TASK-071** Deploy na Vercel
- [ ] **TASK-072** Banco de produção
  - [ ] Subtask: Neon ou Supabase
  - [ ] Subtask: migrações de produção
  - [ ] Subtask: pooling e segurança
- [ ] **TASK-073** Monitoramento e observabilidade
  - [ ] Subtask: Sentry
  - [ ] Subtask: logs estruturados
  - [ ] Subtask: métricas operacionais
- [ ] **TASK-074** Analytics e performance
- [ ] **TASK-075** PWA
  - [ ] Subtask: manifest
  - [ ] Subtask: ícones
  - [ ] Subtask: meta tags
- [ ] **TASK-076** Checklist final de produção
  - [ ] Subtask: segurança
  - [ ] Subtask: auditoria
  - [ ] Subtask: duplicidade
  - [ ] Subtask: responsividade
  - [ ] Subtask: UX crítica

---

## Critérios gerais de conclusão
Uma tarefa só pode ser marcada como concluída se:
- a funcionalidade principal estiver funcionando;
- não houver quebra evidente no fluxo existente;
- a integridade de dados estiver preservada;
- a prevenção de duplicidade tiver sido considerada;
- logs/auditoria tiverem sido adicionados quando aplicável;
- a tela funcionar em desktop e mobile;
- o visual estiver consistente com o layout do produto;
- a alteração respeitar permissões e segurança;
- a implementação estiver alinhada com o design system e com o objetivo patrimonial do sistema.

---

## Ordem recomendada de execução
1. ÉPICO 02 — Segurança, autenticação e sessão
2. ÉPICO 03 — Design system e layout
3. ÉPICO 04 — Banco, integridade e auditoria
4. ÉPICO 05 — Backend e regras de negócio
5. ÉPICO 06 — Cadastros mestres
6. ÉPICO 07 — Movimentações
7. ÉPICO 08 e 09 — Ativos tradicionais e alternativos
8. ÉPICO 10 — Dashboard e portfolio
9. ÉPICO 12 — Importação e conciliação
10. ÉPICO 11 — Diagnóstico e rebalanceamento
11. ÉPICO 13 — Documentos
12. ÉPICO 14 — Configurações
13. ÉPICO 15 — Produção

---

## Nota operacional
Toda mudança futura deve ser quebrada em tarefa principal e subtarefas antes da implementação. Segurança, deduplicação, auditoria e consistência visual não são refinamentos opcionais: são requisitos obrigatórios do produto.