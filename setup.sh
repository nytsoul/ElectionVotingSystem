#!/bin/bash

# SmartVote System - Deployment Helper Script

echo "🚀 SmartVote System - Deployment Setup"
echo "======================================"

# Check prerequisites
echo ""
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi
echo "✅ Node.js: $(node --version)"

if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed"
    exit 1
fi
echo "✅ Python: $(python --version)"

if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed"
    exit 1
fi
echo "✅ Git: $(git --version)"

# Setup backend
echo ""
echo "🔧 Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    python -m venv venv
    echo "✅ Virtual environment created"
fi

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

pip install -r requirements.txt
echo "✅ Backend dependencies installed"

if [ ! -f ".env" ]; then
    cp ../.env.example .env
    echo "✅ Backend .env file created - Please update with your Supabase credentials"
fi

cd ..

# Setup frontend
echo ""
echo "🎨 Setting up frontend..."
cd frontend

npm install
echo "✅ Frontend dependencies installed"

if [ ! -f ".env" ]; then
    echo "VITE_API_URL=http://localhost:5000" > .env
    echo "✅ Frontend .env file created"
fi

cd ..

# Summary
echo ""
echo "✅ Setup Complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Update backend/.env with your Supabase credentials"
echo "  2. Initialize database: Run database/schema.sql in Supabase"
echo "  3. Start backend: cd backend && python app.py"
echo "  4. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Access the app at http://localhost:3000"
