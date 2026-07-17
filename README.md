# GIAP — Chilika Geospatial Intelligence & Analytics Platform

A React-based dashboard site for coastal lagoon monitoring: GIS, remote sensing
indices, shoreline change analysis, and ML classification for Chilika Lagoon, Odisha.

## Run locally

npm install
npm run dev        # http://localhost:5173

## Build for production

npm run build       # outputs to dist/
npm run preview     # preview the production build locally

## Deploy to GitHub Pages (repo: ashim6116/Dta-Analysis-and-Visulysation)

This project is already configured for GitHub Pages:
- `vite.config.js` uses `base: './'` so assets load correctly from a repo subpath
- Routing uses `HashRouter` (not `BrowserRouter`) since GitHub Pages has no
  server-side rewrite rules for client-side routes
- Data fetches use `import.meta.env.BASE_URL` so they resolve under the subpath too

Steps:

1. Unzip this project locally.
2. Open a terminal in the project folder and run:
   ```
   npm install
   ```
3. Connect it to your existing GitHub repo (skip `git init`/`remote add` if the
   folder is already your cloned repo):
   ```
   git init
   git remote add origin https://github.com/ashim6116/Dta-Analysis-and-Visulysation.git
   git add .
   git commit -m "GIAP dashboard site"
   git branch -M main
   git push -u origin main
   ```
4. Deploy the built site to the `gh-pages` branch with one command:
   ```
   npm run deploy
   ```
   This runs `vite build` then pushes the `dist/` folder to a `gh-pages` branch
   automatically (via the `gh-pages` npm package already included).
5. Go to:
   https://github.com/ashim6116/Dta-Analysis-and-Visulysation/settings/pages
   Under "Build and deployment" → "Source", select **Deploy from a branch**,
   then set branch to **gh-pages** and folder to **/ (root)**. Save.
6. Wait 1-2 minutes, then visit:
   https://ashim6116.github.io/Dta-Analysis-and-Visulysation/

Whenever you make changes, just run `npm run deploy` again to republish.

## Where to plug in real data

- `public/data/chilika_boundary.geojson` — replace with your real lagoon boundary vector
- `public/data/shoreline_transects.geojson` — replace with real DSAS transect output
  (keep the same properties: id, sector, rate_m_per_yr, trend)
- `public/data/timeseries.json` — replace `series` values with real GEE-computed
  index time series (same years/keys structure)

## Adding a new index/parameter

Everything in the Dashboard is driven by `src/data/dashboardConfig.js`. To add a
parameter to an existing panel, add one object to that panel's `parameters` array
with an id, name, fullName, purpose, and a `seriesKey` matching a key in
`timeseries.json`'s `series` object. To add a whole new panel, add one object to
the top-level array. No other code needs to change.

## Notes on scope (see conversation history for full roadmap)

This is Phase 1: a static, config-driven dashboard with placeholder/schematic data
shaped exactly like real DSAS/GEE exports. Phase 2 (real-time data upload) requires
a backend (e.g. Supabase or a small FastAPI/Node service) — see prior discussion for
the recommended path. Live GEE computation inside the interface can be added via
Earth Engine Apps embedded per-panel, or a backend proxy using the Python
earthengine-api, once Phase 1 is validated.
