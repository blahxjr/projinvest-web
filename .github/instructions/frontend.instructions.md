---
applyTo: "app/**/*.ts,app/**/*.tsx,app/**/*.css,components/**/*.ts,components/**/*.tsx,components/**/*.css,public/**/*"
---

# Frontend Instructions — ProjInvest Web

## Objetivo
Estas instruções se aplicam a toda alteração de frontend do ProjInvest. O frontend deve refletir um sistema patrimonial premium, moderno, responsivo e confiável, inspirado na experiência visual da Área do Investidor da B3, sem copiar código ou identidade proprietária.

## Princípios de UI
Toda interface deve priorizar:
- clareza da informação;
- legibilidade de números financeiros;
- navegação consistente;
- visual institucional e elegante;
- responsividade real;
- acessibilidade básica;
- feedback visual refinado;
- baixo ruído visual.

Evite aparência genérica de template. Evite excesso de gradientes, efeitos sem função, cards inconsistentes ou telas com baixa densidade informacional.

## Estrutura visual padrão
Sempre que possível, seguir esta estrutura:
- AppLayout autenticado;
- sidebar de navegação principal;
- header contextual com breadcrumb, título, ações e perfil;
- área principal com grid adaptável;
- cards de KPI;
- filtros e ações acima de tabelas;
- tabelas ou listas com ações contextuais;
- painéis de detalhes, histórico e auditoria.

## Design system
O sistema deve manter consistência de:
- espaçamento;
- tipografia;
- hierarquia visual;
- bordas;
- ícones;
- cores semânticas;
- estados interativos;
- tema claro/escuro.

A IA pode definir um tema padrão elegante e sóbrio, mas o frontend deve prever personalização de:
- modo claro/escuro;
- cor primária;
- preferências visuais do usuário.

## Experiência inspirada na B3
Ao desenhar telas, priorize:
- organização de patrimônio consolidado;
- visão de movimentações e extratos;
- leitura rápida de posição, alocação e evolução;
- filtros por período, instituição, conta, cliente e tipo de ativo;
- dashboards que pareçam ferramentas de acompanhamento patrimonial e não páginas genéricas de CRUD.

## Componentes obrigatórios
Sempre reutilizar ou criar componentes consistentes para:
- AppSidebar;
- AppHeader;
- AppLayout;
- PageHeader;
- KpiCard;
- DataTable;
- EmptyState;
- SkeletonCard;
- SkeletonTable;
- FormSection;
- DetailSection;
- AuditTimeline;
- ThemeToggle.

Evite repetir markup ou estilos entre páginas.

## Regras para páginas
Toda página relevante deve considerar:
- loading state;
- error state;
- empty state;
- feedback de sucesso;
- feedback de falha;
- skeleton coerente com a estrutura real;
- tratamento de lista vazia;
- tratamento de dados ausentes;
- navegação consistente.

Nunca deixe página “crua” sem estados de suporte.

## Regras para formulários
Todo formulário deve:
- ter labels claros;
- validar campos obrigatórios;
- exibir erros úteis;
- prevenir submissão dupla;
- mostrar estado de envio;
- ter mensagens seguras e compreensíveis;
- agrupar campos por contexto;
- usar componentes reutilizáveis.

Nunca confiar só no frontend para validação crítica, mas sempre oferecer boa experiência local antes do envio.

## Regras para tabelas e listas
Tabelas devem prever:
- busca;
- filtros;
- ordenação;
- paginação;
- ações por linha;
- seleção quando útil;
- colunas financeiramente legíveis;
- tratamento responsivo.

Quando uma tabela ficar inviável no mobile, adaptar visualmente sem quebrar a usabilidade.

## Dashboards
Ao criar dashboards, priorize:
- patrimônio total;
- variação por período;
- distribuição por tipo de ativo;
- concentração por instituição;
- movimentações recentes;
- alertas de vencimento ou atenção;
- comparação com benchmark quando existir.

Gráficos devem ser elegantes, legíveis e funcionais. Não usar gráficos apenas por estética.

## Layout responsivo
Toda tela deve funcionar bem em:
- desktop;
- tablet;
- mobile.

Verificar:
- overflow horizontal;
- legibilidade de tabelas;
- densidade dos filtros;
- botões com área de toque adequada;
- sidebar colapsável;
- header adaptável;
- componentes empilhando corretamente.

Uma tela bonita no desktop e quebrada no mobile é considerada incompleta.

## Acessibilidade
Sempre garantir:
- contraste adequado;
- foco visível;
- uso correto de headings;
- labels em inputs;
- textos de apoio quando necessário;
- navegação por teclado nas áreas críticas;
- ícones com contexto acessível.

## Estilo de implementação
Ao alterar frontend:
1. entender a tela atual;
2. mapear componentes existentes;
3. preferir reaproveitamento antes de criar duplicatas;
4. manter consistência visual com o restante do sistema;
5. evitar refactors amplos sem necessidade;
6. validar impacto em loading, error e empty states.

## Critérios de aceite de frontend
Nenhuma mudança de frontend está concluída sem verificar:
- consistência visual;
- comportamento responsivo;
- clareza de interação;
- estados de loading/erro/vazio;
- navegação sem quebra;
- ausência de regressão visual evidente;
- integração correta com backend.