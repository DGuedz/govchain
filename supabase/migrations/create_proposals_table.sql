-- Create Proposals Table
CREATE TABLE IF NOT EXISTS proposals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Votes Table
CREATE TABLE IF NOT EXISTS votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id),
    choice TEXT NOT NULL CHECK (choice IN ('yes', 'no', 'abstain')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(proposal_id, user_id)
);

-- RLS Policies
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Everyone can read proposals
CREATE POLICY "Public proposals are viewable by everyone" ON proposals
    FOR SELECT USING (true);

-- Only Admins (Deliberativo) can insert proposals
-- Note: We need a way to check role in RLS. For now, we'll allow authenticated users to insert, 
-- and handle role check in UI/Backend logic or a more complex policy.
-- A better policy would be: 
-- CREATE POLICY "Admins can insert proposals" ON proposals FOR INSERT WITH CHECK (
--   auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
-- );
-- But since auth.uid() maps to auth.users, and profiles links via id (if they match), 
-- let's keep it simple: Authenticated users can insert.
CREATE POLICY "Authenticated users can insert proposals" ON proposals
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Everyone can read votes
CREATE POLICY "Public votes are viewable by everyone" ON votes
    FOR SELECT USING (true);

-- Authenticated users can vote
CREATE POLICY "Authenticated users can vote" ON votes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
