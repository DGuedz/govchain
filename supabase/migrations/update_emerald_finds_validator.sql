-- Add Validator tracking to emerald_finds
ALTER TABLE emerald_finds 
ADD COLUMN IF NOT EXISTS validator_id UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS validated_at TIMESTAMP WITH TIME ZONE;

-- Add comment
COMMENT ON COLUMN emerald_finds.validator_id IS 'Council member who validated/rejected the find';
