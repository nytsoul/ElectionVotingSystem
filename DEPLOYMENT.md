# Deployment Guide - SmartVote System

This guide covers deploying the SmartVote System to production using Vercel (Frontend) and Render (Backend).

## 📋 Prerequisites

- GitHub account with the repository
- Vercel account (https://vercel.com)
- Render account (https://render.com)
- Supabase account with database setup
- Environment variables ready

## 🚀 Frontend Deployment (Vercel)

### Step 1: Connect GitHub Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Set the root directory to `frontend`

### Step 2: Configure Build Settings
```
Build Command: npm install && npm run build
Output Directory: dist
```

### Step 3: Add Environment Variables
In Vercel Project Settings → Environment Variables, add:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Step 4: Deploy
- Click "Deploy"
- Wait for build to complete
- Your frontend will be live at `https://your-project.vercel.app`

---

## 🛠️ Backend Deployment (Render)

### Step 1: Create Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Select your GitHub repository
4. Set these details:
   - **Name**: `smartvote-backend`
   - **Runtime**: Python
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT wsgi:app`
   - **Instance Type**: Free (for development)

### Step 2: Add Environment Variables
In Render Web Service Settings → Environment, add all variables from `.env.example`:

```
FLASK_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
SUPABASE_SECRET_KEY=your-service-role-key
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend.vercel.app
```

### Step 3: Deploy
- Render will automatically deploy when you push to main branch
- Your backend will be live at `https://smartvote-backend.onrender.com`

---

## 🔌 Database Setup

### Using Supabase (Recommended)

1. Create a Supabase project at https://supabase.com
2. Run the SQL schema from `database/schema.sql` in Supabase SQL editor
3. Get your credentials:
   - Project URL → `SUPABASE_URL`
   - Anon Key → `SUPABASE_PUBLISHABLE_DEFAULT_KEY`
   - Service Role Key → `SUPABASE_SECRET_KEY`

---

## 🔒 Security Checklist

- [ ] All environment variables are set (no hardcoded values)
- [ ] JWT_SECRET is a strong random string
- [ ] CORS is configured to only allow your frontend domain
- [ ] Database keys (Service Role) are kept private
- [ ] No sensitive data in git repository
- [ ] .env file is in .gitignore

---

## ✅ Post-Deployment Testing

### Test API Connectivity
```bash
curl https://your-backend-url.onrender.com/api/health
```

Expected response:
```json
{"status": "ok", "message": "Voting System API is running"}
```

### Test Frontend
1. Visit `https://your-project.vercel.app`
2. Try registering a new account
3. Test login functionality
4. Submit a test vote

---

## 📊 Environment URLs

Update these in your frontend after deployment:

| Environment | URL |
|---|---|
| Frontend | `https://your-project.vercel.app` |
| Backend API | `https://smartvote-backend.onrender.com` |
| Supabase | Your project URL |

---

## 🐛 Troubleshooting

### "Cannot POST /api/auth/login"
- Check backend server is running on Render
- Verify `VITE_API_URL` is correct in frontend

### "CORS error"
- Check `FRONTEND_URL` is set correctly in backend
- Verify frontend domain matches in CORS configuration

### "Database connection failed"
- Verify Supabase credentials in environment variables
- Check database schema is properly initialized
- Ensure service role key has proper permissions

### "Static pages show but API calls fail"
- Check network tab for actual error
- Verify backend deployment status on Render
- Check environment variables on both services

---

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:

1. **Push to GitHub**: `git push origin main`
2. **Vercel** automatically rebuilds frontend
3. **Render** automatically restarts backend
4. Changes go live in ~2-3 minutes

---

## 📝 Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Flask Deployment](https://flask.palletsprojects.com/deployment/)

---

**Project Ready for Production! 🎉**
