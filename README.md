# 🗳️ SmartVote System - Modern Online Voting Platform

[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3-000000?style=flat-square&logo=flask)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-ElectionVotingSystem-333?style=flat-square&logo=github)](https://github.com/nytsoul/ElectionVotingSystem)

A modern, secure, and intuitive **online voting platform** with a beautiful neuromorphism UI, built with cutting-edge web technologies. Perfect for organizations, schools, and communities to conduct transparent digital elections.

### ✨ Key Highlights
- 🎨 **Beautiful Neuromorphism Design** - Soft, elegant UI with smooth animations
- 🔐 **Bank-level Security** - JWT authentication, encrypted passwords, HTTPS
- ⚡ **Production Ready** - Deployed on Vercel & Render with auto-scaling
- 📱 **Fully Responsive** - Works on all devices (mobile, tablet, desktop)
- 🌐 **Real-time Updates** - Live election status and voting results
- 🧪 **Well Tested** - Ready for production deployment

---

## 🎯 Features

### 🎨 User Interface
- **Neuromorphism (Soft UI)** design with subtle shadows and gradients
- **Responsive Design** - Mobile-first approach
- **Dark/Light Compatible** - Soft theme works everywhere
- **Smooth Animations** - Delightful interactions and transitions
- **Accessible** - WCAG compliant navigation

### 🔐 Security Features
- **JWT Authentication** - Secure token-based authentication
- **Password Encryption** - Bcrypt hashing for passwords
- **One Vote Per Voter** - Prevents duplicate voting
- **CORS Protection** - Restricted cross-origin requests
- **HTTPS Ready** - Production deployment with SSL/TLS

### 👥 User Management
- **Voter Registration** - Simple sign-up with age verification (18+)
- **Authentication** - Login with Voter ID and password
- **Profile Management** - View voting status
- **Admin Dashboard** - Comprehensive election management

### 🗳️ Voting System
- **Candidate Management** - Add, edit, delete candidates
- **Election Control** - Start and stop elections on demand
- **Vote Submission** - One-click voting with confirmation
- **Results Display** - Real-time vote counts and percentages
- **Winner Detection** - Automatic winner announcement

### 📊 Admin Features
- **Dashboard Overview** - Quick stats and election status
- **Candidate Management** - Full CRUD operations
- **Election Control** - Start/stop election with one click
- **Real-time Results** - Live vote tracking
- **Result Analytics** - Vote distribution and winner info

---

## 🛠️ Technology Stack

### Frontend Architecture
| Technology | Purpose | Version |
|---|---|---|
| **React** | UI Library | 18.0+ |
| **TypeScript** | Type Safety | 5.0+ |
| **Vite** | Build Tool | 4.5+ |
| **TailwindCSS** | Styling | 3.0+ |
| **Axios** | HTTP Client | 1.4+ |
| **React Router** | Navigation | 6.0+ |

### Backend Architecture
| Technology | Purpose | Version |
|---|---|---|
| **Flask** | Web Framework | 2.3+ |
| **Python** | Language | 3.9+ |
| **Supabase** | Database | PostgreSQL |
| **PyJWT** | Authentication | 2.8+ |
| **Gunicorn** | WSGI Server | 21.2+ |

### Deployment & Infrastructure
| Service | Purpose | Tier |
|---|---|---|
| **Vercel** | Frontend Hosting | Free/Pro |
| **Render** | Backend Hosting | Free/Starter |
| **Supabase** | Database | Free/Pro |
| **GitHub** | Version Control | Free |

---

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** 16+ ([Download](https://nodejs.org/))
- **Python** 3.9+ ([Download](https://www.python.org/))
- **Git** for version control
- **Supabase Account** (free at [supabase.com](https://supabase.com))
- **GitHub Account** for code repository
- **Text Editor** (VS Code recommended)

---

## 🚀 Quick Start Guide

### Step 1: Clone Repository
```bash
git clone https://github.com/nytsoul/ElectionVotingSystem.git
cd ElectionVotingSystem
```

### Step 2: Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
copy .env.example .env
# Edit .env with your Supabase credentials
```

### Step 3: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:5000" > .env
```

### Step 4: Database Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Enter project details and create

2. **Initialize Database**
   - Open SQL Editor in Supabase
   - Copy entire content from `database/schema.sql`
   - Paste and execute in SQL Editor
   - Wait for tables to be created

3. **Get Credentials**
   - Go to Project Settings → API
   - Copy:
     - `Project URL` → `SUPABASE_URL`
     - `anon public` → `SUPABASE_PUBLISHABLE_DEFAULT_KEY`
     - `service_role secret` → `SUPABASE_SECRET_KEY`
   - Paste in `backend/.env`

### Step 5: Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
# Backend running at http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend running at http://localhost:3000
```

### Step 6: Test the Application

1. **Visit** `http://localhost:3000`
2. **Register** with a test account (age must be 18+)
3. **Login** with your credentials
4. **Admin Access** - Use `admin`/`admin123`
5. **Start Election** - Go to Admin Dashboard and click "Start Election"
6. **Cast Vote** - Return to voting page and submit your vote
7. **View Results** - Check the Results page for live statistics

---

## 📁 Project Structure

```
ElectionVotingSystem/
│
├── 📂 frontend/                    # React + TypeScript Application
│   ├── src/
│   │   ├── components/             # Reusable UI Components
│   │   │   ├── Alert.tsx          # Notification component
│   │   │   ├── Navbar.tsx         # Navigation bar
│   │   │   ├── ConfirmModal.tsx   # Confirmation dialogs
│   │   │   └── ...
│   │   ├── pages/                  # Page Components
│   │   │   ├── LandingPage.tsx    # Home page
│   │   │   ├── LoginPage.tsx      # Login form
│   │   │   ├── RegisterPage.tsx   # Registration form
│   │   │   ├── VotingPage.tsx     # Voting interface
│   │   │   ├── ResultsPage.tsx    # Live results
│   │   │   ├── AdminDashboard.tsx # Admin controls
│   │   │   └── ...
│   │   ├── services/               # API Services
│   │   │   └── api.ts             # Axios instances
│   │   ├── context/                # React Context
│   │   │   └── AuthContext.tsx    # Authentication state
│   │   ├── App.tsx                # Root component
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Global Styles
│   ├── vite.config.ts              # Vite configuration
│   ├── tailwind.config.js          # TailwindCSS config
│   ├── tsconfig.json               # TypeScript config
│   ├── vercel.json                 # Vercel deployment
│   └── package.json                # Dependencies
│
├── 📂 backend/                     # Flask Python Application
│   ├── app.py                      # Main Flask app
│   ├── config.py                   # Configuration
│   ├── wsgi.py                     # Production entry point
│   ├── requirements.txt            # Python dependencies
│   ├── Procfile                    # Render deployment
│   ├── .env.example                # Environment template
│   └── test_connection.py          # Database test
│
├── 📂 database/                    # Database Files
│   ├── schema.sql                  # Create tables
│   └── verify_schema.sql           # Verify setup
│
├── 📄 DEPLOYMENT.md                # Detailed deployment guide
├── 📄 DEPLOYMENT_CHECKLIST.md     # Step-by-step checklist
├── 📄 .env.example                 # Environment variables
├── 📄 .gitignore                   # Git ignore rules
├── 📄 README.md                    # This file
└── 📄 LICENSE                      # MIT License
```

---

## 🔧 Configuration & Environment Variables

### Frontend (.env)
```env
# API endpoint - points to your backend
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
Create `backend/.env` from `backend/.env.example`:

```bash
# Flask Configuration
FLASK_ENV=development
PORT=5000

# Supabase Configuration (Get from Supabase Settings)
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key-here
SUPABASE_SECRET_KEY=your-service-role-key-here

# Authentication
JWT_SECRET=your-secure-random-string-here

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

⚠️ **Important**: Never commit `.env` files to Git!

---

## 🧪 Default Test Credentials

### Admin Account
```
Voter ID: admin
Password: admin123
```

### Test Voter Account
```
Voter ID: testuser
Password: test123
Age: 25
```

⚠️ **Security**: Change these credentials in production!

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register           # Register new voter
POST   /api/auth/login              # Login user
POST   /api/setup/create-admin      # Create admin (dev only)
```

### Voting
```
GET    /api/voting/candidates       # Get all candidates
POST   /api/voting/vote             # Submit vote
GET    /api/voting/status/:id       # Check voting status
```

### Results
```
GET    /api/election/status         # Get election status
GET    /api/voting/results          # Get voting results
```

### Admin
```
POST   /api/admin/candidates        # Add candidate
DELETE /api/admin/candidates/:id    # Delete candidate
POST   /api/admin/election/start    # Start election
POST   /api/admin/election/stop     # Stop election
```

---

## 📦 Build & Production

- Node.js 16+ 
- Python 3.9+
- npm or yarn
- Supabase account
- Vercel account (for deployment)
- Render account (for deployment)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/senthil-D24/ElectionVotingSystem.git
cd votingsystem
```

### 2. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp ../.env.example .env

# Update .env with your Supabase credentials
```

### 3. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start dev server
npm run dev
```

### 4. Database Setup

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Run the SQL from `database/schema.sql` in the SQL editor
4. Get your credentials and add them to `.env` files

### 5. Start Development

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

## 📚 Project Structure

```
votingsystem/
├── frontend/                 # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # Auth context
│   │   └── App.tsx          # Main app
│   ├── vite.config.ts       # Vite configuration
│   └── tailwind.config.js   # TailwindCSS config
│
├── backend/                  # Flask + Python
│   ├── app.py               # Main Flask app
│   ├── config.py            # Configuration
│   ├── requirements.txt      # Python dependencies
│   ├── wsgi.py              # Production entry point
│   └── test_connection.py   # DB connection test
│
├── database/                 # Database schemas
│   ├── schema.sql           # Tables and initial data
│   └── verify_schema.sql    # Verification script
│
├── DEPLOYMENT.md            # Deployment guide
├── .env.example             # Environment variables template
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000
```

**Backend (.env):**
Create a `.env` file in the backend directory. Copy from `.env.example` and update with your credentials:

```bash
cp .env.example .env
```

Then update with your actual:
- Supabase URL
- Supabase Keys
- JWT Secret
- Frontend URL

⚠️ **Never commit actual credentials to Git!**


## 🧪 Default Admin Credentials

```
Voter ID: admin
Password: admin123
```

⚠️ **Change these credentials in production!**

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new voter
- `POST /api/auth/login` - Login voter
- `POST /api/setup/create-admin` - Create admin account (development)

### Voting
- `GET /api/voting/candidates` - Get all candidates
- `POST /api/voting/vote` - Submit a vote
- `GET /api/voting/status/:user_id` - Check voting status

### Admin
- `POST /api/admin/candidates` - Add candidate
- `DELETE /api/admin/candidates/:id` - Delete candidate
- `POST /api/admin/election/start` - Start election
- `POST /api/admin/election/stop` - Stop election

### Results
- `GET /api/election/status` - Get election status
- `GET /api/voting/results` - Get voting results

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deployment

**Frontend to Vercel:**
1. Push to GitHub
2. Connect repository to Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy

**Backend to Render:**
1. Push to GitHub
2. Create new Web Service on Render
3. Set all environment variables
4. Deploy

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Ensure backend is running on port 5000
- Check `VITE_API_URL` matches backend URL
- Verify CORS is properly configured

### "Invalid credentials"
- First time? Use admin/admin123
- Check database is initialized
- Verify Supabase connection

### Port already in use
- Frontend: `npm run dev -- --port 3001`
- Backend: Change PORT in `app.py`

## 🔐 Security Notes

- Never commit `.env` files
- Use strong JWT_SECRET in production
- Enable HTTPS on production
- Regularly update dependencies
- Keep database credentials private

## 📄 License

MIT License - feel free to use this project

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review the API documentation

---

**Made with ❤️ for secure and transparent voting**

## 🎯 Next Steps

1. ✅ Setup development environment
2. ✅ Test all features locally
3. 📝 Read [DEPLOYMENT.md](./DEPLOYMENT.md)
4. 🚀 Deploy to production
5. 🎉 Go live!


A full-stack voting system built with React, TypeScript, Tailwind CSS (frontend), Flask (backend), and Supabase (database).

## 📋 Features

### Landing Page
- App name and branding
- Quick intro about the system
- Election status (Live/Closed)
- Login and Register buttons

### Authentication
- **Registration**: Age validation (18+), unique Voter ID, password confirmation
- **Login**: Voter ID and password with role-based redirects
- Secure JWT token-based authentication

### Voting Dashboard
- Display all candidates with party info and symbols
- Vote confirmation modal
- Disable voting after submission
- Vote status tracking

### Results Page
- Real-time candidate results
- Vote count and percentages
- Bar chart visualization
- Winner highlighting
- Auto-refresh every 5 seconds

### Admin Dashboard
- Add new candidates
- Delete existing candidates
- Start/Stop election
- View election statistics
- Manage candidates

### Navigation & UI
- Responsive navbar
- Loading spinners
- Alert notifications
- Confirmation modals
- Mobile-friendly design
- Modern gradient UI

## 🚀 Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Supabase account
- Git

### 1. Backend Setup (Flask)

```bash
cd backend

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Update .env with your Supabase credentials
# Edit .env file and add:
# SUPABASE_URL=your_supabase_url
# SUPABASE_KEY=your_supabase_anon_key
# SUPABASE_SECRET_KEY=your_supabase_secret_key

# Run Flask server
python app.py
```

The Flask server will run on `http://localhost:5000`

### 2. Frontend Setup (React + TypeScript + Tailwind)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The React app will run on `http://localhost:3000`

### 3. Supabase Database Setup

Create the following tables in your Supabase project:

#### a) Users Table
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  voter_id VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  has_voted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_voter_id ON users(voter_id);
```

#### b) Candidates Table
```sql
CREATE TABLE candidates (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255) NOT NULL,
  symbol VARCHAR(50),
  votes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### c) Votes Table
```sql
CREATE TABLE votes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  candidate_id BIGINT NOT NULL REFERENCES candidates(id),
  voted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_votes_user ON votes(user_id);
CREATE INDEX idx_votes_candidate ON votes(candidate_id);
```

#### d) Elections Table
```sql
CREATE TABLE elections (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  is_active BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert initial election record
INSERT INTO elections (is_active) VALUES (FALSE);
```

## 🔑 Environment Variables

### Backend (.env)
```
SUPABASE_URL=https://your-project.supabase.co

SECRET_KEY=change-this-to-random-secret
JWT_SECRET=change-this-to-random-secret
FLASK_ENV=development
```

### Frontend (.env local)
Create .env.local in frontend folder if needed:
```
VITE_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
votingsystem/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── config.py              # Configuration settings
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables
│   └── venv/                   # Virtual environment
│
└── frontend/
    ├── src/
    │   ├── pages/              # React pages
    │   │   ├── LandingPage.tsx
    │   │   ├── LoginPage.tsx
    │   │   ├── RegisterPage.tsx
    │   │   ├── VotingPage.tsx
    │   │   ├── VoteDonePage.tsx
    │   │   ├── ResultsPage.tsx
    │   │   └── AdminDashboard.tsx
    │   ├── components/         # React components
    │   │   ├── Navbar.tsx
    │   │   ├── Alert.tsx
    │   │   ├── ConfirmModal.tsx
    │   │   ├── LoadingSpinner.tsx
    │   │   └── ProtectedRoute.tsx
    │   ├── context/            # Auth context
    │   │   └── AuthContext.tsx
    │   ├── services/           # API services
    │   │   └── api.ts
    │   ├── App.tsx             # Main app component
    │   ├── main.tsx            # Entry point
    │   └── index.css           # Tailwind styles
    ├── index.html              # HTML template
    ├── package.json            # Node dependencies
    ├── vite.config.ts          # Vite configuration
    ├── tailwind.config.js      # Tailwind configuration
    └── tsconfig.json           # TypeScript configuration
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new voter
- `POST /api/auth/login` - Login voter

### Voting
- `GET /api/voting/candidates` - Get all candidates
- `POST /api/voting/vote` - Submit a vote
- `GET /api/voting/status/<user_id>` - Check vote status

### Results
- `GET /api/results` - Get election results

### Admin
- `POST /api/admin/candidates` - Add candidate
- `DELETE /api/admin/candidates/<id>` - Delete candidate
- `POST /api/admin/election/start` - Start election
- `POST /api/admin/election/stop` - Stop election

### Election
- `GET /api/election/status` - Get election status

## 🧪 Testing

### Create Test Admin Account
Use the registration and login to create accounts. To make an admin account, directly update the database:

```sql
UPDATE users SET role = 'admin' WHERE voter_id = 'admin_voter_id';
```

### Test Flow
1. Register as a regular user
2. Login and vote
3. View results
4. Login as admin and manage elections

## 🎨 UI/UX Features
- Modern gradient purple theme
- Animated loading spinners
- Smooth transitions and hover effects
- Responsive mobile design
- Confirmation modals for important actions
- Real-time alerts for success/error messages
- Clean, intuitive navigation

## 🔐 Security Features
- JWT token-based authentication
- Role-based access control
- Password validation on registration
- Age verification (18+ requirement)
- Unique voter ID validation
- Protected API routes

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
```bash
cd backend
# Create Procfile
echo "web: python app.py" > Procfile
# Deploy
```

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist folder
```

## 🐛 Troubleshooting

### CORS Issues
- Ensure Flask has CORS enabled for http://localhost:3000
- Check that API_BASE_URL in frontend is correct

### Database Connection Issues
- Verify Supabase credentials in .env
- Check that Supabase project is active
- Ensure tables are created with correct schema

### Port Conflicts
- Frontend: Change Vite port in vite.config.ts
- Backend: Change Flask port in app.py

## 📝 License
MIT License

## 👨‍💻 Author
SmartVote System Development Team

---

**Happy Voting!** 🗳️
#   E l e c t i o n V o t i n g S y s t e m 
 
 #   E l e c t i o n V o t i n g S y s t e m 
 
 