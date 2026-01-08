-- Update profiles table to support new roles and Gov.br verification
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('council', 'miner', 'garimpeiro', 'auditor', 'admin', 'fiscal', 'legal', 'member'));

COMMENT ON COLUMN profiles.role IS 'User Role: council (Tier 1), miner (Tier 2), garimpeiro (Tier 3), auditor (Fiscal/Legal)';

-- Add verified_govbr column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'verified_govbr') THEN
        ALTER TABLE profiles ADD COLUMN verified_govbr BOOLEAN DEFAULT FALSE;
    END IF;
END $$;
