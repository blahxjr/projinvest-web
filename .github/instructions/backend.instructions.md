---
applyTo: "app/api/**/*.ts,app/api/**/*.tsx,lib/**/*.ts,lib/**/*.tsx,middleware.ts,migrations/**/*.sql,**/*.sql"
---

# Backend Instructions — ProjInvest Web

## Objetivo
Estas instruções se aplicam a toda alteração de backend, middleware, regras de negócio, autenticação, banco de dados e segurança do ProjInvest.

O backend é a fonte de verdade para integridade patrimonial, autenticação, autorização, deduplicação, auditoria e consistência das operações.

## Regras centrais
Toda regra crítica deve existir no backend. Nunca confiar apenas no frontend para:
- validação;
- autorização;
- prevenção de duplicidade;
- integridade de relacionamentos;
- auditoria;
- regras financeiras e patrimoniais.

## Segurança obrigatória
Toda implementação deve considerar:
- autenticação obrigatória em áreas protegidas;
- autorização por papéis e permissões;
- validação de entrada no servidor;
- sanitização e normalização de dados;
- rate limiting em rotas sensíveis;
- headers de segurança;
- tratamento seguro de erros;
- ausência de segredos hardcoded;
- proteção contra duplicidade e reenvio indevido.

Sempre preferir falha segura a aceitação silenciosa de dados inválidos.

## Autenticação e autorização
Ao trabalhar com login, sessão ou permissões:
- validar identidade e permissão no servidor;
- proteger rotas, actions e endpoints;
- negar por padrão quando a permissão não estiver explícita;
- registrar eventos relevantes de autenticação;
- nunca expor detalhes internos desnecessários em erros.

## Integridade e deduplicação
Prevenção de duplicidade é requisito obrigatório.

Sempre aplicar defesa em camadas:
- normalização de entrada;
- validação de negócio;
- verificação prévia de existência;
- unique constraints;
- índices compostos;
- transações quando necessário;
- idempotência em importações;
- mensagens de conflito claras.

Tratar como risco crítico qualquer operação que possa gerar registros duplicados por concorrência, repetição de requisição ou variação de formatação.

## Auditoria e logs
Toda alteração relevante deve gerar trilha de auditoria confiável.

Auditar:
- login/logout;
- falhas de autenticação;
- criação;
- edição;
- exclusão lógica/física;
- importações;
- alterações administrativas;
- mudanças de configuração;
- conflitos e bloqueios de deduplicação;
- falhas relevantes de integração.

Cada evento deve conter, quando aplicável:
- usuário;
- papel;
- entidade;
- id da entidade;
- tipo de ação;
- timestamp;
- origem;
- resultado;
- resumo antes/depois.

Nunca registrar senhas, tokens completos ou segredos. Mascarar dados sensíveis.

## Banco de dados
Toda migration deve ser aditiva, segura e compatível com a base já existente.

Sempre considerar:
- foreign keys;
- índices;
- unique constraints;
- colunas created_at e updated_at;
- soft delete quando apropriado;
- colunas ou tabelas de auditoria;
- rollback seguro quando possível.

Ao alterar schema:
1. planejar impacto;
2. criar migration;
3. atualizar contratos do backend;
4. adaptar consultas e serviços;
5. revisar riscos de duplicidade;
6. revisar riscos de auditoria.

Nunca fazer alteração destrutiva sem justificativa explícita.

## Serviços e regras de negócio
Preferir regras complexas em services reutilizáveis, não espalhadas em handlers.

Ao implementar backend:
- separar validação, serviço e acesso a dados;
- usar nomes claros;
- retornar respostas previsíveis;
- padronizar erros;
- manter código auditável;
- evitar lógica implícita demais.

## Importações e processamento
Rotinas de importação devem:
- validar formato;
- normalizar dados;
- detectar duplicidade;
- registrar log da operação;
- informar resumo do processamento;
- falhar com segurança em inconsistências graves.

Importações financeiras nunca devem inserir dados silenciosamente quando houver ambiguidade forte.

## Concorrência e consistência
Operações críticas devem considerar concorrência.

Quando houver risco de corrida:
- usar transação;
- reforçar unicidade no banco;
- projetar operação idempotente;
- evitar condição de corrida entre validação e inserção.

## Tratamento de erros
Erros devem ser:
- previsíveis;
- seguros;
- úteis para operação;
- não verbosos para o usuário final.

Nunca retornar stack trace, segredo, SQL bruto ou detalhes internos desnecessários ao cliente.

## Middleware e proteção de rotas
Ao editar middleware ou guards:
- manter clareza entre rotas públicas e protegidas;
- validar autenticação antes da renderização de áreas privadas;
- respeitar papéis e escopo;
- evitar brechas por rota alternativa;
- manter comportamento previsível em redirecionamentos.

## Critérios de aceite de backend
Nenhuma mudança de backend está concluída sem verificar:
- integridade da regra;
- prevenção de duplicidade;
- autorização correta;
- tratamento de erro;
- logs/auditoria quando aplicável;
- compatibilidade com schema atual;
- ausência de regressão evidente.