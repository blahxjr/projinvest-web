# Copilot Instructions — ProjInvest Web

## Propósito do projeto
O ProjInvest é um sistema web de gestão patrimonial para consolidar, controlar e analisar todos os ativos de uma pessoa em um único ambiente. O sistema deve centralizar ativos mantidos em bancos, corretoras, contas internacionais, autocustódia e ativos alternativos, incluindo ações, FIIs, ETFs, BDRs, renda fixa, fundos, imóveis, veículos, joias e outros bens patrimoniais.

O objetivo principal é entregar um produto funcional, seguro, elegante e confiável para uso contínuo, com foco em:
- visão consolidada do patrimônio;
- histórico de movimentações e eventos;
- controle por instituição, conta, ativo e categoria;
- importação e conferência de dados;
- rastreabilidade de alterações;
- prevenção de duplicidade;
- experiência premium e responsiva.

## Referência visual e experiência
A experiência visual deve ser inspirada na Área do Investidor da B3, sem copiar código, estrutura proprietária ou conteúdo. A inspiração deve se refletir em:
- visual institucional, confiável e premium;
- navegação clara e estável;
- alta legibilidade de KPIs, tabelas e extratos;
- foco em portfolio, movimentações, rendimentos, eventos e histórico;
- organização orientada a patrimônio consolidado;
- visual moderno, sóbrio, refinado e responsivo.

A interface deve transmitir segurança, clareza e solidez. Evite aparência genérica de template e evite decisões visuais chamativas sem propósito funcional.

## Direção de produto
O sistema deve permitir controlar todos os ativos de uma pessoa em diversos bancos e corretoras, além de ativos fora do mercado tradicional. O domínio deve tratar como entidades de primeira classe:
- clientes e usuários;
- instituições financeiras;
- contas por instituição;
- ativos listados;
- ativos de renda fixa;
- fundos;
- ativos internacionais;
- imóveis;
- veículos;
- joias e bens diversos;
- movimentações;
- eventos patrimoniais;
- documentos;
- configurações;
- trilhas de auditoria.

Toda implementação deve reforçar a ideia de “visão 360 do patrimônio”.

## Prioridades do agente
Ao decidir a ordem de trabalho, siga esta prioridade:
1. segurança, autenticação e integridade dos dados;
2. layout base, design system e estrutura de navegação;
3. componentes reutilizáveis;
4. backend e regras de negócio;
5. prevenção de duplicidade e trilha de auditoria;
6. módulos principais de ativos e movimentações;
7. dashboard consolidado e relatórios;
8. refinamento visual, performance e acessibilidade.

## Comportamento obrigatório antes de alterar código
Antes de implementar qualquer tarefa:
1. entender claramente o objetivo da demanda;
2. revisar os arquivos afetados;
3. identificar impactos em frontend, backend, banco e segurança;
4. quebrar o trabalho em tarefa principal e subtarefas;
5. declarar critérios de aceite;
6. apontar riscos, dependências e possíveis efeitos colaterais;
7. só então começar a implementação.

Se houver ambiguidade, inconsistência de regras ou risco de regressão, esclareça antes de prosseguir.

Nunca faça mudanças grandes e silenciosas. Trabalhe em etapas pequenas, seguras, coerentes e verificáveis.

## Arquitetura esperada
Este projeto deve manter separação clara entre camadas:
- frontend: telas, layouts, componentes, estados visuais, formulários, UX e acessibilidade;
- backend: autenticação, autorização, validações, serviços, regras de negócio, deduplicação e auditoria;
- persistência: PostgreSQL, migrations, índices, constraints, logs e histórico.

Sempre prefira:
- TypeScript estrito;
- componentes pequenos e reutilizáveis;
- serviços de domínio claros;
- validação client-side e server-side;
- regras críticas protegidas no backend e no banco;
- migrations aditivas e seguras;
- contratos explícitos de entrada e saída;
- tratamento previsível de erros.

## Estilo de layout e design system
O layout deve ser moderno, elegante, institucional e responsivo. A base visual deve seguir estes princípios:
- sidebar para navegação principal;
- header com contexto da página, breadcrumbs, ações e perfil;
- dashboard executivo com KPIs, gráficos, alertas e tabelas;
- páginas de listagem com filtros, busca, paginação e ações rápidas;
- páginas de detalhe com visão resumida, histórico e auditoria;
- formulários claros, organizados e com validação útil;
- suporte a dark mode e light mode;
- paleta padrão definida pela IA, mas com opção de personalização pelo usuário.

O sistema pode definir um tema padrão inicial, mas deve prever:
- troca de tema claro/escuro;
- escolha de cor primária pelo usuário;
- preferência visual persistente;
- consistência visual entre todas as telas.

A interface deve priorizar:
- boa leitura de números financeiros;
- contraste adequado;
- densidade confortável em telas amplas;
- adaptação real para mobile;
- feedback visual refinado;
- estados de loading, empty state e error state em todas as áreas relevantes.

## Regras funcionais obrigatórias
O sistema deve contemplar ou preparar a base para:
- login de acesso;
- controle de sessão;
- cadastro e gestão de usuários;
- gestão de clientes;
- múltiplas instituições e múltiplas contas por cliente;
- cadastro e controle de ativos diversos;
- registro de movimentações;
- cálculo e consolidação patrimonial;
- importação de dados com validação;
- relatórios e documentos;
- histórico de alterações;
- personalização visual;
- logs e auditoria.

Ao implementar qualquer funcionalidade, considerar sempre:
- integridade dos dados;
- rastreabilidade;
- legibilidade da experiência;
- segurança por padrão.

## Login, autenticação e autorização
O sistema precisa obrigatoriamente ter login de acesso e proteção de áreas privadas. Toda rota protegida deve exigir autenticação válida.

Regras:
- implementar autenticação segura;
- aplicar controle por papéis e permissões;
- proteger rotas no frontend e no backend;
- não confiar apenas em validação de interface;
- impedir acesso indevido por manipulação de URL ou chamada direta de endpoint;
- tratar falhas de autenticação e autorização com mensagens seguras.

Sempre validar permissões no servidor.

## Segurança obrigatória
Segurança é requisito central. Sempre aplicar:
- validação rigorosa de entrada no backend;
- sanitização e normalização de dados;
- headers de segurança;
- rate limiting em autenticação e rotas sensíveis;
- tratamento de erros sem expor detalhes internos;
- proteção contra duplicidade, reenvio e inconsistência de dados;
- proteção contra operações sem permissão;
- segregação clara de responsabilidades entre usuário comum, assessor e administrador;
- armazenamento seguro de credenciais e segredos;
- nenhuma credencial hardcoded no código.

Nunca registrar em logs:
- senhas;
- tokens completos;
- chaves privadas;
- segredos;
- dados sensíveis desnecessários.

Se dados sensíveis precisarem aparecer em logs operacionais, mascarar.

## Integridade, deduplicação e consistência
Evitar duplicidade é requisito obrigatório do produto. Nunca confie apenas na interface para isso.

Sempre implementar defesa em camadas:
- normalização dos dados recebidos;
- validação no formulário;
- validação no backend;
- checagem de registros existentes antes de gravar;
- constraints e índices no banco;
- chaves compostas quando necessário;
- idempotência em importações e operações repetíveis;
- mensagens claras em caso de conflito.

Exemplos de cuidado:
- impedir cadastros duplicados da mesma conta para o mesmo cliente e instituição;
- impedir importação repetida da mesma movimentação;
- impedir ativos equivalentes duplicados por diferença de formatação;
- impedir concorrência que gere registros repetidos.

Toda rotina crítica deve considerar consistência transacional.

## Auditoria e logs de alteração
O sistema deve possuir logs de alteração de registro e trilha de auditoria confiável.

Toda ação relevante deve ser auditável, incluindo:
- login e logout;
- tentativas de autenticação com falha;
- criação de registros;
- edição de registros;
- exclusão lógica ou física;
- importações;
- ajustes manuais;
- mudanças de configuração;
- ações administrativas;
- conflitos de deduplicação;
- falhas de integração ou processamento.

Cada evento de auditoria deve registrar, quando aplicável:
- usuário responsável;
- perfil do usuário;
- entidade alterada;
- id do registro;
- tipo da ação;
- data e hora;
- origem da requisição;
- resumo antes/depois;
- resultado da operação.

Os logs devem ser estruturados, pesquisáveis e seguros.

## Banco de dados
Toda mudança de banco deve ser feita com migration aditiva, segura e rastreável.

Sempre considerar:
- foreign keys;
- unique constraints;
- índices;
- colunas de auditoria;
- timestamps;
- soft delete quando apropriado;
- compatibilidade com dados já existentes;
- rollback seguro sempre que possível.

Ao alterar schema:
1. criar migration;
2. atualizar tipos e contratos;
3. adaptar serviços do backend;
4. adaptar frontend;
5. validar impacto em fluxos existentes;
6. revisar riscos de duplicidade e auditoria.

Nunca alterar schema de forma destrutiva sem necessidade clara e plano explícito.

## Backend
Toda regra crítica deve existir no backend. O backend é a fonte de verdade para:
- autenticação;
- autorização;
- validação;
- prevenção de duplicidade;
- integridade relacional;
- regras patrimoniais;
- auditoria;
- tratamento de erros.

Ao criar endpoints, actions ou services:
- definir claramente entrada, validação, processamento e retorno;
- retornar erros previsíveis e seguros;
- nunca expor detalhes internos desnecessários;
- isolar regras complexas em serviços reutilizáveis;
- preferir código explícito a lógica implícita difícil de auditar.

## Frontend
O frontend deve priorizar clareza, consistência e robustez.

Cada tela nova deve considerar:
- loading state;
- empty state;
- error state;
- feedback de sucesso e falha;
- navegação coerente;
- responsividade;
- acessibilidade mínima;
- componentes reutilizáveis;
- formulários com mensagens claras.

Para tabelas e listagens, sempre considerar:
- busca;
- filtros;
- ordenação;
- paginação;
- ações contextuais;
- estados vazios;
- desempenho com listas maiores.

Para dashboards:
- destacar patrimônio total;
- destacar alocação por tipo de ativo;
- destacar evolução patrimonial;
- destacar movimentações recentes;
- destacar alertas e vencimentos;
- destacar concentração por instituição ou categoria.

## Acessibilidade e responsividade
Toda implementação visual deve funcionar em desktop, tablet e mobile. O sistema não pode depender apenas de desktop para operar bem.

Sempre garantir:
- foco visível;
- labels e aria quando necessário;
- navegação por teclado;
- contraste adequado;
- tamanhos de toque usáveis;
- leitura confortável;
- layout adaptável sem quebra;
- tabelas com tratamento responsivo.

Uma interface bonita que quebra no mobile é considerada incompleta.

## Qualidade de código
Toda alteração deve priorizar:
- legibilidade;
- coesão;
- baixo acoplamento;
- tipagem forte;
- nomes claros;
- previsibilidade;
- facilidade de manutenção.

Evitar:
- duplicação de lógica;
- componentes gigantes;
- queries espalhadas sem padrão;
- validações inconsistentes;
- regras de negócio misturadas na camada visual;
- efeitos colaterais ocultos;
- soluções improvisadas sem rastreabilidade.

## Fluxo obrigatório de trabalho por demanda
Para cada demanda, organize a execução assim:
1. objetivo;
2. contexto atual;
3. arquivos envolvidos;
4. impacto por camada;
5. tarefa principal;
6. subtarefas;
7. critérios de aceite;
8. implementação;
9. validação;
10. pendências ou riscos.

Sempre quebrar demandas grandes em subtarefas executáveis.

Exemplo de subtarefas:
- ajustar schema e migration;
- implementar serviço e validações;
- criar endpoint ou server action;
- atualizar componentes e tela;
- adicionar logs e auditoria;
- validar duplicidade;
- testar estados e responsividade.

## Critérios de aceite mínimos
Nenhuma tarefa deve ser considerada concluída sem verificar:
- funcionamento real do fluxo principal;
- integridade dos dados;
- ausência de duplicidade indevida;
- existência de tratamento de erro;
- respeito às permissões;
- logs de auditoria quando aplicável;
- responsividade;
- consistência visual;
- lint e tipagem sem erros;
- ausência de regressão evidente.

## Correção de código existente
Ao corrigir código já existente:
- primeiro entender a intenção original;
- depois localizar a causa real do problema;
- corrigir com o menor impacto possível;
- refatorar apenas o necessário;
- preservar compatibilidade quando possível;
- atualizar código relacionado se a correção afetar contratos ou comportamento.

Não mascarar bug com remendos visuais ou validações superficiais.

## Documentação e atualização do projeto
Sempre que uma mudança alterar comportamento relevante:
- atualizar documentação pertinente;
- atualizar backlog/status quando fizer sentido;
- registrar decisões arquiteturais importantes;
- manter instruções coerentes com o estado real do projeto.

## Como agir em caso de dúvida
Se existir qualquer ambiguidade funcional, arquitetural ou de segurança:
- não assumir silenciosamente;
- esclarecer primeiro;
- propor opções com trade-offs;
- seguir pela alternativa mais segura e sustentável.

## Regra final de execução
Este projeto deve ser desenvolvido e corrigido com foco em:
- sistema funcional;
- sistema seguro;
- sistema elegante;
- sistema auditável;
- sistema responsivo;
- sistema sustentável;
- sistema sem falhas evitáveis.

Sempre priorize confiabilidade, segurança e clareza. A experiência deve parecer a de uma plataforma patrimonial séria e madura.