@echo off
REM SmartVote System - Development Server Startup

echo.
echo ============================================
echo   SmartVote System - Development Servers
echo ============================================
echo.
echo Starting Backend (Flask) and Frontend (React)...
echo.

REM Start Backend
echo Starting Backend on http://localhost:5000
start cmd /k "cd backend && venv\Scripts\activate.bat && python app.py"

REM Wait a bit for backend to start
timeout /t 3 /nobreak

REM Start Frontend
echo Starting Frontend on http://localhost:3000
start cmd /k "cd frontend && npm run dev"

echo.
echo ============================================
echo   Servers are starting...
echo ============================================
echo.
echo 🌐 Frontend: http://localhost:3000
echo 📡 Backend:  http://localhost:5000
echo.
echo Close either window to stop the respective server.
echo Close both to stop everything.
echo.

pause
