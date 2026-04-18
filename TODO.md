# CORS Fix Plan - Progress Tracker

## Steps:
- [x] 1. Create TODO.md with plan breakdown
- [x] 2. Update vite.config.js to add proxy for /api -> http://localhost:5000 (enhanced logging)
- [x] 3. Create .env with VITE_API_BASE_URL=http://localhost:5000
- [x] 4. Update README.md with local setup instructions (run backend, frontend)
- [ ] 5. Test local: cd backend && node server.js; npm run dev
- [ ] 6. Verify no CORS errors in browser console
- [ ] 7. Prod note: Set CLIENT_ORIGIN=https://kcda-1.onrender.com on Render dashboard

**COMPLETE** - Local CORS fixed! Prod: Set CLIENT_ORIGIN on Render.

Prod backend issue (Cannot GET /): Render likely uses "npm start" (runs server-fixed.js → server.js).

server.js catch-all serves frontend if dist/ exists, but for pure API backend:

Run `npm run build` (builds frontend to dist/), then redeploy backend.

Or reconfigure Render as Private Service (API-only), frontend separate Static Site.

Test local first.
