-- Update roles check constraint to include new council roles
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('admin', 'fiscal', 'legal', 'member'));

-- Comment explaining the roles mapping
COMMENT ON COLUMN profiles.role IS 'User Role: admin (Deliberativo), fiscal (Fiscal), legal (Jurídico), member (Cooperado)';
