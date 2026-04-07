-- ============================================
-- SMARTVOTE SYSTEM - DATABASE SCHEMA
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- 1. USERS TABLE
-- Stores voter information
CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL CHECK (age >= 18),
  voter_id VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  has_voted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster lookups by voter_id
CREATE INDEX IF NOT EXISTS idx_users_voter_id ON users(voter_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ============================================
-- 2. CANDIDATES TABLE
-- Stores candidate information
CREATE TABLE IF NOT EXISTS candidates (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255) NOT NULL,
  symbol VARCHAR(50),
  votes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster candidate lookups
CREATE INDEX IF NOT EXISTS idx_candidates_name ON candidates(name);
CREATE INDEX IF NOT EXISTS idx_candidates_party ON candidates(party);

-- ============================================
-- 3. VOTES TABLE
-- Records each vote cast
CREATE TABLE IF NOT EXISTS votes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  candidate_id BIGINT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  verification_token VARCHAR(255) UNIQUE NOT NULL,
  voted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create indexes for vote lookups
CREATE INDEX IF NOT EXISTS idx_votes_user_id ON votes(user_id);
CREATE INDEX IF NOT EXISTS idx_votes_candidate_id ON votes(candidate_id);
CREATE INDEX IF NOT EXISTS idx_votes_voted_at ON votes(voted_at);
CREATE INDEX IF NOT EXISTS idx_votes_verification_token ON votes(verification_token);

-- ============================================
-- 4. ELECTIONS TABLE
-- Tracks election status
CREATE TABLE IF NOT EXISTS elections (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  is_active BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for election status lookups
CREATE INDEX IF NOT EXISTS idx_elections_is_active ON elections(is_active);

-- ============================================
-- INITIAL DATA
-- ============================================

-- Insert initial election record (if not exists)
INSERT INTO elections (is_active) 
VALUES (FALSE) 
ON CONFLICT DO NOTHING;

-- ============================================
-- SAMPLE TEST DATA (Optional - Remove for production)
-- ============================================

-- Insert sample candidates
INSERT INTO candidates (name, party, symbol) VALUES
  ('John Anderson', 'Blue Party', '🔵'),
  ('Sarah Mitchell', 'Red Party', '🔴'),
  ('Michael Chen', 'Green Party', '🟢'),
  ('Emma Wilson', 'Yellow Party', '🟡'),
  ('David Brown', 'Orange Party', '🟠')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- UTILITY VIEWS (Optional)
-- ============================================

-- View: Election Results Summary
CREATE OR REPLACE VIEW election_results AS
SELECT 
  c.id,
  c.name,
  c.party,
  c.symbol,
  COUNT(v.id) as vote_count,
  ROUND((COUNT(v.id)::FLOAT / NULLIF((SELECT COUNT(*) FROM votes), 0) * 100)::NUMERIC, 2) as vote_percentage,
  c.created_at
FROM candidates c
LEFT JOIN votes v ON c.id = v.candidate_id
GROUP BY c.id, c.name, c.party, c.symbol, c.created_at
ORDER BY vote_count DESC;

-- View: Voting Statistics
CREATE OR REPLACE VIEW voting_statistics AS
SELECT 
  (SELECT COUNT(*) FROM users) as total_voters,
  (SELECT COUNT(*) FROM users WHERE has_voted = TRUE) as voters_who_voted,
  (SELECT COUNT(*) FROM votes) as total_votes,
  (SELECT COUNT(*) FROM candidates) as total_candidates,
  (SELECT is_active FROM elections LIMIT 1) as election_active;

-- ============================================
-- ROW LEVEL SECURITY (Optional - For Production)
-- ============================================

-- Uncomment these lines for production security

-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE elections ENABLE ROW LEVEL SECURITY;

-- Allow users to read all candidates
-- CREATE POLICY "candidates_read_public" ON candidates
--   FOR SELECT USING (true);

-- Allow users to read election status
-- CREATE POLICY "elections_read_public" ON elections
--   FOR SELECT USING (true);

-- ============================================
-- END OF SCHEMA
-- ============================================
