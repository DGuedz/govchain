
## 🚀 Operação Gênese: Inauguração do Sistema

Este guia descreve o processo de deploy e o ritual de inauguração do **GovChain** com o registro do primeiro documento oficial.

### 1. Deploy em Produção (Vercel)

Para colocar o sistema no ar e torná-lo acessível globalmente:

1.  Acesse [Vercel.com](https://vercel.com) e faça login.
2.  Clique em **"Add New Project"**.
3.  Importe o repositório do GitHub: `COOPERSMERALDA/elos`.
4.  Configure as Variáveis de Ambiente (`Environment Variables`):
    *   `NEXT_PUBLIC_SUPABASE_URL`: (Sua URL do Supabase)
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Sua Key Anon)
    *   `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`: (Seu Client ID)
5.  Clique em **Deploy**.

O sistema estará acessível em `https://elos-govchain.vercel.app` (ou domínio similar).

### 2. Ritual de Gênese (Ata Marco Zero)

Após o deploy, realize o seguinte procedimento para inaugurar a Blockchain:

1.  **Geração do Documento:**
    *   Utilize o arquivo `docs/ATA_MARCO_ZERO.md` como base.
    *   Converta-o para PDF (Sugestão: Pandoc ou Editor Markdown).
2.  **Login Admin:**
    *   Acesse a rota `/governance` com a carteira do Presidente (Leonardo).
3.  **Upload Solene:**
    *   Clique em "Novo Documento".
    *   Selecione o PDF da Ata.
    *   Assine digitalmente.
4.  **Validação:**
    *   Aguarde a confirmação da transação na Blockchain.
    *   Copie o ID gerado (Hash).
5.  **Prova de Vida:**
    *   Acesse `/verify/[ID_DA_ATA]` em um dispositivo móvel.
    *   Apresente a "Verdade Imutável" ao Conselho.

---
**"A verdade oficial reside na intersecção entre a assinatura Gov.br e o registro na Blockchain."**
