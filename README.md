# 🏷️ KCDA Control — CMS Dashboard

<p align="center">
  <img alt="KCDA Banner" src="https://img.shields.io/badge/KCDA%20Control-CMS-blue?style=for-the-badge" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img alt="Render" src="https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white" />
</p>

> A modern, production-ready MERN dashboard to manage KCDA membership, events, meetings, zones and news. Built for administrators with a polished public-facing members directory.

---

## ✨ Features

- ✅ Member Management (Create, Read, Update, Delete)
- ✅ Event Management (CRUD + media gallery)
- ✅ Meeting Management (scheduling + assignment)
- ✅ Zone Management
- ✅ News Feed system with image uploads
- 🔐 Admin Authentication using JWT (protected routes)
- 🖼️ Image upload via Cloudinary


---

## 🧰 Tech Stack

- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: MongoDB (Atlas)
- Image storage: Cloudinary
- Deployment: Render (recommended)

---

## 📁 Project Structure (high level)

```
miniproject/
├─ backend/
│  ├─ models/           # Mongoose models (Member, Event, Zone, ...)
│  ├─ routes/           # Express routes (api endpoints)
│  ├─ uploads/          # local uploads (ignored in prod)
│  ├─ db.js             # Mongo connection
│  ├─ server.js         # main server (uses env vars)
│  └─ server-fixed.js   # production-ready entry
├─ src/                 # React app (Vite)
├─ public/
├─ .env.example
├─ backend/.env.example
├─ README.md
└─ .gitignore
```

---

## 🚀 Installation (Development)

Prerequisites: Node.js 18+, npm, MongoDB Atlas account (or local MongoDB)

1. Clone the repository

```bash
git clone <your-repo-url>
cd miniproject
```

2. Install dependencies (frontend + backend)

```bash
# frontend deps
npm install

# backend deps
cd backend && npm install
```

3. Create environment files

- Copy `.env.example` → `.env` (root) for frontend build-time vars
- Copy `backend/.env.example` → `backend/.env` and fill real values locally

4. Run backend (dev)

```bash
cd backend
npm run dev   # starts with nodemon (server.js)
```

5. Run frontend (dev)

```bash
cd ..
npm run dev
```

Open the app at `http://localhost:5173` (Vite default).

---

## 🔧 Environment Variables (.env example)

Create `.env` files from the examples and fill real values. Never commit `.env` to GitHub.

Root `.env.example` (frontend):

```env
VITE_API_BASE_URL=https://your-backend.example.com
```

Backend `backend/.env.example`:

```env
# MongoDB Atlas connection string (use user & password for production)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/kcda_portal?retryWrites=true&w=majority

# Render will provide PORT automatically
PORT=5000

# Allowed frontend origin (CORS)
CLIENT_ORIGIN=http://localhost:5173

# JWT secret for signing tokens
JWT_SECRET=your_jwt_secret_here

# Cloudinary (optional)
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

> Important: Use secure, non-guessable values for `JWT_SECRET` and restrict `CLIENT_ORIGIN` to your frontend domain in production.

---

## 📦 Production Deployment (Render)

### Backend (Render Web Service):

1. Create a new Web Service on Render and connect your GitHub repo.
2. In Render service settings set:
   - Environment: Node
   - Start Command: `node server-fixed.js` (or `npm start` if configured)
   - **Important:** Environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN=https://kcda-1.onrender.com` (or your frontend domain), `CLOUDINARY_URL` (if used)
3. Render provides a `PORT` variable automatically; the backend uses `process.env.PORT`.

### Frontend (Static Site on Render or Vercel):

1. Configure build command: `npm run build`
2. Publish directory: `dist` (Vite default)
3. Add environment variable at build time: `VITE_API_BASE_URL=https://your-backend.onrender.com`

### Local Development (CORS Fixed ✅)

1. **Start Backend:**
   ```bash
   cd backend
   node server.js  # or npm run dev if nodemon setup
   ```
   Backend runs on http://localhost:5000

2. **Start Frontend:**
   ```bash
   cd ..  # back to root
   npm run dev
   ```
   Frontend runs on http://localhost:5102 with **Vite proxy** → no CORS issues!

3. All `/api/*` calls now proxy to local backend automatically.

**Note:** `.env` created with `VITE_API_BASE_URL=http://localhost:5000` (Vite reads at build/dev).


Notes:
- Ensure `CLIENT_ORIGIN` matches the deployed frontend origin to avoid CORS issues.

---

## 🔒 Security Practices

- Store secrets in environment variables — never commit `.env` to source control.
- JWT is used to protect admin routes; the backend computes status server-side from `expiryDate` and ignores any incoming `status` field.
- Use HTTPS in production and restrict CORS `CLIENT_ORIGIN` to your frontend domain.
- Validate and sanitize inputs on the server (Mongoose validation + express-validator recommended).
- Rotate secrets and limit database user permissions (create least-privilege DB users for production).

---

## 🖼️ Image Handling (Cloudinary)

- Images are uploaded from frontend to backend or directly to Cloudinary depending on the implementation.
- Store the returned Cloudinary URL in your MongoDB document (e.g., `photoUrl`, `imageUrls`).
- Use signed upload presets or server-side signed uploads for better security.

Example: upload flow

1. Frontend sends image to backend (as FormData) → backend uploads to Cloudinary using `CLOUDINARY_URL` env var.
2. Cloudinary returns secure URL(s) → backend saves URL(s) on the document and returns to frontend.

---

## 🔭 Future Improvements

- Add role-based access control (Admin / Editor / Viewer)
- Add audit logs for CRUD operations
- Implement server-side pagination and filtering for large member lists
- Add automated tests (Jest / Supertest for backend, Cypress for E2E)
- Improve performance with caching (Redis) and optimized image transformations

---

## 👤 Author

KCDA Control — built by Our team.

## 👥 Team Members

| Name | Role | GitHub |
|------|------|--------|
| Akshada Valkunde | Full Stack Developer | [@vu1f2324001](https://github.com/vu1f2324001) |
| Kartiki Patil | Frontend Developer | [@kartiki-patil](https://github.com/kartiki-patil) |
| Vanshika Indoria | Full Stack Developer | [@vanshikaindoria](https://github.com/VanshikaSI) |
| Maithili Pandey | Backend Developer | [@maithilipandey](https://github.com/maithilipandey) |
---

_Thank you for using KCDA Control. Keep secrets out of Git — use Render environment variables for production._
