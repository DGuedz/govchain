# GovChain - Portal de Monitoramento Local

Este documento descreve o uso da ferramenta de visualização e monitoramento local ("View Port") implementada para o ambiente de desenvolvimento da GovChain.

## Visão Geral

O Monitor GovChain é um serviço leve em Node.js que roda em paralelo à aplicação principal, fornecendo uma interface isolada para verificação de saúde do sistema (Healthcheck) sem interferir nos processos principais.

### Especificações Técnicas
- **Porta:** 8080 (Padrão)
- **Tecnologia:** Node.js (Módulo HTTP nativo, sem dependências externas)
- **Acesso:** Restrito a `localhost` (CORS configurado)
- **Endpoint de Saúde:** `GET /health`

## Como Usar

### Pré-requisitos
Certifique-se de que a aplicação principal GovChain esteja rodando (geralmente na porta 3000 ou 3010).

```bash
npm run dev
```

### Iniciar o Monitor
Em um novo terminal, execute:

```bash
npm run monitor
```

### Acessar o Dashboard
Abra seu navegador em:
[http://localhost:8080](http://localhost:8080)

Você verá um painel com:
- Status Operacional do Sistema (Online/Offline)
- Versão da Aplicação
- Tempo de Atividade (Uptime)
- Ambiente (Development/Production)

## Endpoints da API do Monitor

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Dashboard HTML de Visualização |
| GET | `/health` | Status JSON do próprio serviço de monitoramento |

## Arquitetura
O monitor funciona consultando o endpoint `/api/health` da aplicação principal GovChain. Se a aplicação principal cair, o monitor reportará "Sistema Indisponível", mas continuará rodando, servindo como uma "sentinela" externa.

## Desativação
Para desativar o monitor, basta encerrar o processo no terminal (`Ctrl + C`). Não há persistência de dados ou configurações residuais.
