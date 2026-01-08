-- Create Shale Batches Table (Registro de Saída de Xisto)
CREATE TABLE IF NOT EXISTS shale_batches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    miner_id UUID REFERENCES profiles(id) NOT NULL, -- Quem vendeu (Tier 2)
    buyer_wallet TEXT NOT NULL, -- Quem comprou (Tier 3 - Garimpeiro Wallet Address)
    weight_kg NUMERIC NOT NULL, -- Peso em Kg
    price_brl NUMERIC, -- Preço em Reais (Opcional, apenas para registro)
    batch_hash TEXT, -- Hash único do lote para rastreabilidade
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE shale_batches ENABLE ROW LEVEL SECURITY;

-- Miners can insert batches
CREATE POLICY "Miners can insert batches" ON shale_batches
    FOR INSERT WITH CHECK (auth.role() = 'authenticated'); 
    -- Idealmente checaríamos se o user é 'miner', mas deixamos aberto para MVP autenticado

-- Everyone involved can read (Miner or Buyer)
-- Simplificação MVP: Authenticated users can read
CREATE POLICY "Authenticated users can read batches" ON shale_batches
    FOR SELECT USING (auth.role() = 'authenticated');
