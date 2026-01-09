# Checklist de Deploy e Inauguração - GovChain v1.0

## 1. Preparação do Ambiente (Local)
- [ ] Verificar se todas as alterações foram commitadas no Git.
- [ ] Rodar `npm run build` localmente para garantir que não há erros de compilação.
- [ ] Confirmar se o arquivo `docs/ATA_MARCO_ZERO.md` está atualizado.

## 2. Configuração na Vercel
- [ ] Criar novo projeto importando o repositório `COOPERSMERALDA/govchain`.
- [ ] Configurar Variáveis de Ambiente (Environment Variables):
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
    - `NEXT_PUBLIC_CHAIN_ID` (Definir como `84532` para Base Sepolia ou Mainnet correspondente)
- [ ] Definir Root Directory como `govchain` (se o repositório conter a pasta raiz).

## 3. Pós-Deploy (Verificação)
- [ ] Acessar a URL de produção (ex: `https://govchain.vercel.app`).
- [ ] Testar navegação nas rotas públicas:
    - [ ] `/` (Home)
    - [ ] `/public` (Transparência)
    - [ ] `/social` (Associação Benjamim)
    - [ ] `/compliance` (Canal de Denúncia)
    - [ ] `/verify` (Busca de Certificados)
- [ ] Verificar se o Footer e Navbar estão linkando corretamente.

## 4. Ritual de Gênese (Inauguração)
- [ ] Converter `docs/ATA_MARCO_ZERO.md` para PDF oficial.
- [ ] Acessar `/governance` com a carteira de Admin (Leonardo).
- [ ] Realizar o upload da Ata como "Documento Institucional".
- [ ] Aguardar confirmação da transação (Attestation).
- [ ] Acessar o link gerado `/verify/[ID]` em um dispositivo móvel.
- [ ] Validar se o status aparece como "BLINDADO" (Verde).

---
**Status Final:** [ ] PRONTO PARA LANÇAMENTO
