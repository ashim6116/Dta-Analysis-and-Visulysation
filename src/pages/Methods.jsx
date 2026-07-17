const DSAS_STEPS = [
  { step: "Baseline construction", detail: "A reference baseline is drawn landward of the shoreline across the full study extent." },
  { step: "Transect casting", detail: "Perpendicular transects are cast from the baseline at fixed intervals across all lagoon sectors." },
  { step: "Multi-epoch shoreline digitization", detail: "Shorelines are digitized from historical and current imagery for each analysis year." },
  { step: "Rate computation", detail: "End Point Rate and Linear Regression Rate are computed per transect to quantify erosion/accretion." },
  { step: "Sector aggregation", detail: "Transect-level rates are aggregated into sector summaries for the dashboard's shoreline panel." },
];

const GEE_STEPS = [
  { step: "Image collection & filtering", detail: "Landsat/Sentinel collections filtered by date range, cloud cover, and lagoon extent." },
  { step: "Band math", detail: "Index formulas (NDWI, MNDWI, NDCI, NDVI, etc.) computed per-pixel across the filtered collection." },
  { step: "Temporal compositing", detail: "Seasonal or annual composites generated to smooth noise and cloud gaps." },
  { step: "Export", detail: "Resulting rasters and zonal statistics exported as GeoTIFF tiles and time-series tables." },
  { step: "Dashboard ingestion", detail: "Exports are read by the config-driven dashboard as map layers and linked charts." },
];

function StepList({ steps }) {
  return (
    <div className="step-list">
      {steps.map((s, i) => (
        <div className="step-row" key={s.step}>
          <div className="step-num mono">{String(i + 1).padStart(2, "0")}</div>
          <div className="step-line" aria-hidden="true" />
          <div>
            <div className="step-name">{s.step}</div>
            <p className="step-detail">{s.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Methods() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Methods</div>
          <h1 className="page-title">How the panels get their data</h1>
          <p className="page-lede">
            Two pipelines feed most of the dashboard: a shoreline-analysis workflow (DSAS)
            and a remote-sensing index workflow (Google Earth Engine). Both are shown here
            as the sequential process they actually are.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Pipeline 01</div>
            <h2 className="section-title">DSAS shoreline workflow</h2>
          </div>
          <StepList steps={DSAS_STEPS} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Pipeline 02</div>
            <h2 className="section-title">GEE index &amp; MNDWI workflow</h2>
          </div>
          <StepList steps={GEE_STEPS} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Tools &amp; Data Sources</div>
            <h2 className="section-title">What's behind each pipeline</h2>
          </div>
          <div className="tool-tags">
            {["Landsat 8/9", "Sentinel-2", "DSAS", "QGIS", "Python (scikit-learn, GDAL)", "Random Forest", "Gradient Boosting"].map((t) => (
              <span className="tool-tag mono" key={t}>{t}</span>
            ))}
            <a
              href="https://code.earthengine.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="tool-tag mono tool-tag-link"
            >
              Google Earth Engine ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
