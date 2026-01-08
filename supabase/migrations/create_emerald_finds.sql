-- Create Emerald Finds Table (Registro de Descoberta)
CREATE TABLE IF NOT EXISTS emerald_finds (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    garimpeiro_id UUID REFERENCES profiles(id) NOT NULL, -- Quem achou (Tier 3)
    shale_batch_id UUID REFERENCES shale_batches(id), -- Origem (Link com Tier 2) - Opcional se for achado antigo, mas idealmente obrigatório
    weight_carats NUMERIC NOT NULL, -- Peso em Quilates
    estimated_value_brl NUMERIC, -- Valor Estimado
    photo_url TEXT, -- Foto da pedra bruta
    status TEXT DEFAULT 'pending_validation', -- pending_validation, validated, rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE emerald_finds ENABLE ROW LEVEL SECURITY;

-- Garimpeiros can insert finds
CREATE POLICY "Garimpeiros can insert finds" ON emerald_finds
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Everyone can read finds (Transparency)
CREATE POLICY "Authenticated users can read finds" ON emerald_finds
    FOR SELECT USING (auth.role() = 'authenticated');
