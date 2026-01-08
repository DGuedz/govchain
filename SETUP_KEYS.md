# 🔑 Configuração de Chaves para Devnet (Modo Simulação Real)

Para simular o GovChain na rede **Base Sepolia (Testnet)** e conectar o banco de dados, precisamos substituir as chaves de demonstração por chaves reais gratuitas.

## 1. Thirdweb (Blockchain & Login)
O erro `KEY_NOT_FOUND` ocorre porque o Client ID atual é fictício.

1. Acesse: [https://thirdweb.com/dashboard/settings/api-keys](https://thirdweb.com/dashboard/settings/api-keys)
2. Conecte sua carteira (MetaMask, etc).
3. Clique em **"Create API Key"**.
4. Nomeie como "GovChain Dev".
5. Em "Domains", coloque `localhost:3000`.
6. Copie o **Client ID**.

## 2. Supabase (Banco de Dados)
Para salvar documentos e votos, precisamos do Supabase.

1. Acesse: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Crie um novo projeto "GovChain".
3. Vá em **Project Settings > API**.
4. Copie a **Project URL** e a **anon public key**.

## 3. Atualize o Arquivo `.env.local`
Abra o arquivo `.env.local` na raiz da pasta `elos` e cole suas chaves:

```bash
# ThirdWeb (Obrigatório para Login)
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=cole_seu_client_id_aqui

# Supabase (Obrigatório para Documentos/Votos)
NEXT_PUBLIC_SUPABASE_URL=cole_sua_url_https_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=cole_sua_chave_anon_aqui
```

## 4. Reinicie o Servidor
Após salvar, pare o servidor (Ctrl+C) e rode novamente:
```bash
npm run dev
```

---
**Nota:** Configurei o RPC público da Base Sepolia (`https://sepolia.base.org`) para reduzir a dependência da chave API para leituras simples, mas o Login ainda exige a chave Thirdweb.
