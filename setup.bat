@echo off
REM SmartVote System - Setup and Run Script for Windows

echo.
echo ============================================
echo   SmartVote System - Setup & Run
echo ============================================
echo.

REM Set the current directory
cd /d %~dp0

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Python and Node.js found
echo.

REM Setup Backend
echo ============================================
echo Setting up Backend (Flask)...
echo ============================================
cd backend

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo ⚠️  IMPORTANT: Please update backend\.env with your Supabase credentials
echo   - SUPABASE_URL
echo   - SUPABASE_KEY
echo   - SUPABASE_SECRET_KEY
echo.

cd ..

REM Setup Frontend
echo ============================================
echo Setting up Frontend (React)...
echo ============================================
cd frontend

echo Installing Node.js dependencies...
call npm install

echo Installing Tailwind CSS...
call npm install -D tailwindcss postcss autoprefixer

cd ..

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo 📋 Next Steps:
echo   1. Update backend\.env with Supabase credentials
echo   2. Create database tables (see DATABASE_SETUP.md)
echo   3. Run start_dev.bat to start both servers
echo.
echo 📚 Documentation:
echo   - QUICK_START.md - Quick setup guide
echo   - README.md - Full documentation
echo   - DATABASE_SETUP.md - Database setup guide
echo   - API_ENDPOINTS.md - API documentation
echo.

pause
