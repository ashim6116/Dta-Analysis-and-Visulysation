# GIAP — Chilika Geospatial Intelligence & Analytics Platform

A React-based dashboard site for coastal lagoon monitoring: GIS, remote sensing
indices, shoreline change analysis, and ML classification for Chilika Lagoon, Odisha.

## Run locally

npm install
npm run dev        # http://localhost:5173

## Build for production

npm run build       # outputs to dist/
npm run preview     # preview the production build locally

## Deploy

The `dist/` folder is a static site — deploy it to GitHub Pages, Netlify, Vercel,
or any static host. No backend is required for this Phase 1 build.

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
