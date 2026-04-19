# Production Deployment Fix TODO

## Approved Plan Steps (Single Service: https://kcda.onrender.com)

**Status: [ ] Not Started**

1. [x] **Create Frontend .env.production**
   - VITE_GOOGLE_CLIENT_ID=402857003232-gc2dkfs86shhpe1fo1f669bmb11euf8o.apps.googleusercontent.com (from visible tab)
   - VITE_API_BASE_URL=https://kcda.onrender.com

2. [x] **Update API Base URLs**
   - Replace fallback 'https://kcda-1.onrender.com' → 'https://kcda.onrender.com' in frontend components
   - Ensure StatsCards uses full URL for /api endpoints

3. [x] **Update Backend Config**
   - backend/server.js: CLIENT_ORIGIN='https://kcda.onrender.com'
   - Ensure backend/.env has matching GOOGLE_CLIENT_ID

4. [x] **Fix Backend Package.json**
   - "main": "server.js", "start": "node server.js"

5. [ ] **Test Locally**
   - Add .env.production to .gitignore? No, commit for Render
   - `npm install` frontend/backend
   - `vite --mode production` verify env
   - Backend dev test

6. [ ] **Build & Deploy**
   - Frontend: `vite build` → dist/ served by backend
   - Push to repo → Render auto-deploy
   - Test: Google login /admin-login, data pages, refresh routes

**Notes:**
- Single service deployment (backend serves frontend dist/)
- No localhost issues found
- Routing handled by server.js catch-all

**Progress Tracker:**
- Updated: Mark [x] when complete
