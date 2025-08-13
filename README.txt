# Cinematix Planner (PWA)
A clean, modern, offline‑first planner tailored for filmmakers: **calendar**, **shooting days**, **VFX shots**, **tasks**, and **project tracking**.

## Highlights
- Gorgeous dark UI with gradient cards & high‑contrast chips
- **Calendar month view** with per‑day event chips (Shoot, Deadline, Review, Delivery, VFX) + daily **Agenda**
- **Projects** (client, color, due date, notes) with quick add **events/tasks**
- **VFX Shots** tracker (Sequence/Scene/Shot, Vendor, Status: Bid/WIP/Review/Final, Due, Notes)
- **Tasks** with status pipeline (Open → In Progress → Blocked → Done)
- **Modal forms** (no ugly prompts) for fast mobile entry
- **Floating Action Button** adds the right thing depending on the tab
- **Import/Export** all data as JSON (local only) for backup/migration
- **PWA**: Works offline, Add to Home Screen on iPhone
- **Portrait** design, fits iPhone 16 Pro (max‑width 480px)

## One‑file deploy (GitHub Pages, from iPhone)
1. Create a new public repository (e.g., `cinematix`).
2. Upload these files to the root: `index.html`, `manifest.webmanifest`, `sw.js`, `pwa-icon-192.png`, `pwa-icon-512.png`, `apple-touch-icon.png`.
3. Repo **Settings → Pages** → Source: *Deploy from a branch*; Branch: **main**; Folder: **/** → Save.
4. Open `https://<your-username>.github.io/cinematix/` in Safari → Share → **Add to Home Screen**.

## Updating
- This SW uses versioned caching and `skipWaiting`. If an update lags, hard refresh or close/reopen the app.

— Generated 2025-08-13T12:46:35.317124Z
