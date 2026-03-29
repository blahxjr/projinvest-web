# Documentação do Banco de Dados ProjInvest

## Diagrama ER

```mermaid
erDiagram
    CLIENTES ||--o{ CONTAS_CORRETORA : "tem"
    INSTITUICOES ||--o{ CONTAS_CORRETORA : "tem"
    TIPOS_INVESTIMENTO ||--o{ ATIVOS : "classifica"
    CONTAS_CORRETORA ||