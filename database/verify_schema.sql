-- ============================================
-- VERIFICATION & TESTING QUERIES
-- Run these to verify your tables are created
-- ============================================

-- 1. Check if all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should show: candidates, elections, users, votes (and possibly others)

-- ============================================

-- 2. Verify table structures

-- Check USERS table
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- Check CANDIDATES table
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'candidates'
ORDER BY ordinal_position;

-- Check VOTES table
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'votes'
ORDER BY ordinal_position;

-- Check ELECTIONS table
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'elections'
ORDER BY ordinal_position;

-- ============================================

-- 3. Verify indexes
SELECT indexname, tablename, indexdef 
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename;

-- ============================================

-- 4. Check sample data
SELECT COUNT(*) as total_candidates FROM candidates;
SELECT COUNT(*) as total_elections FROM elections;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_votes FROM votes;

-- ============================================

-- 5. View election results (if any votes exist)
SELECT * FROM election_results;

-- ============================================

-- 6. View voting statistics
SELECT * FROM voting_statistics;

-- ============================================

-- 7. Test: Insert a sample user (for testing)
-- Uncomment to test registration
/*
INSERT INTO users (name, age, voter_id, password, role, has_voted)
VALUES ('Test User', 25, 'TEST001', 'testpass123', 'user', false);

-- View the inserted user
SELECT id, name, voter_id, role, has_voted FROM users WHERE voter_id = 'TEST001';

-- Create an admin user for testing
UPDATE users SET role = 'admin' WHERE voter_id = 'TEST001';
*/

-- ============================================

-- 8. Clean up test data (use with caution!)
-- Uncomment only when you want to remove test data
/*
DELETE FROM votes WHERE user_id IN (SELECT id FROM users WHERE voter_id LIKE 'TEST%');
DELETE FROM users WHERE voter_id LIKE 'TEST%';
DELETE FROM candidates WHERE name LIKE 'Test%';
*/

-- ============================================
-- END OF VERIFICATION QUERIES
-- ============================================
