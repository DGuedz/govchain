# GovChain | Protocolo da Verdade Híbrida

Sistema de governança cooperativa e transparência transparente, desenvolvido para a COOPERSMERALDA.

## 🚀 Visão Geral

O **GovChain** é uma plataforma descentralizada (dApp) focada em transparência, gestão democrática e liquidação financeira eficiente para cooperativas. Utiliza tecnologia blockchain para garantir imutabilidade de documentos e processos decisórios.

## ✨ Funcionalidades Principais

- **Protocolo de Gestão Transparente**: Portal público para consulta de documentos e relatórios com garantia de integridade via hash.
- **Governança Participativa**: Sistema de votação e propostas para membros da cooperativa.
- **Autenticação Híbrida**: Login social e Web3 via Thirdweb.
- **Modo Demonstração**: Simulação completa das funcionalidades para testes e apresentações sem necessidade de credenciais reais (`?demo=true`).
- **Verificação de Documentos**: Validação de autenticidade de documentos via QR Code e Hash.

## 🛠️ Tecnologias

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Shadcn UI.
- **Blockchain/Web3**: Thirdweb SDK, XRPL (Integração planejada).
- **Backend/Storage**: Supabase, IPFS.

## 📦 Instalação e Uso

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/govchain.git
   cd elos
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto com as chaves necessárias (ver `.env.local.example`).

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000).

## 🔐 Segurança

- As chaves privadas (XRPL_SEED) devem ser mantidas exclusivamente em `.env.local` e nunca commitadas.
- O projeto segue padrões estritos de isolamento de segredos.

## 📄 Licença

Propriedade da COOPERSMERALDA.
