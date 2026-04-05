import os
from dotenv import load_dotenv

load_dotenv()

print("\n" + "="*60)
print("🔍 SUPABASE CREDENTIALS CHECK")
print("="*60)

url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_PUBLISHABLE_DEFAULT_KEY')
secret = os.getenv('SUPABASE_SECRET_KEY')

print(f"\n✓ SUPABASE_URL:")
print(f"  {url}")

if key:
    print(f"\n✓ SUPABASE_PUBLISHABLE_DEFAULT_KEY (Publishable):")
    print(f"  {key[:20]}...{key[-10:] if len(key) > 30 else ''}")
    print(f"  Length: {len(key)} chars")
else:
    print(f"\n✗ SUPABASE_PUBLISHABLE_DEFAULT_KEY not found in .env")

if secret:
    print(f"\n✓ SUPABASE_SECRET_KEY:")
    print(f"  {secret[:20]}...{secret[-10:] if len(secret) > 30 else ''}")
    print(f"  Length: {len(secret)} chars")
else:
    print(f"\n✗ SUPABASE_SECRET_KEY not found in .env")

print("\n" + "="*60)
print("🧪 TESTING CONNECTION")
print("="*60)

try:
    from supabase import create_client
    
    print("\n✓ Supabase library imported successfully")
    
    # Try to create client
    print(f"\n⏳ Connecting to: {url}")
    client = create_client(url, key)
    print("✅ CONNECTION SUCCESSFUL!")
    
    # Try to select from users table
    print("\n⏳ Testing database access...")
    result = client.table('users').select('*').limit(1).execute()
    print("✅ DATABASE ACCESSIBLE!")
    print(f"   Users table exists: {result.data is not None}")
    
except Exception as e:
    print(f"❌ ERROR: {type(e).__name__}")
    print(f"   Message: {str(e)}")
    print(f"\n💡 Solution:")
    print(f"   1. Check SUPABASE_URL is correct")
    print(f"   2. Check SUPABASE_KEY is correct (NOT the secret key!)")
    print(f"   3. Make sure tables are created in Supabase")
    print(f"   4. Check project is not paused")

print("\n" + "="*60)
