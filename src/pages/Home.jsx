import { Link } from "react-router-dom";
import LagoonMotif from "../components/LagoonMotif";
import CoordinateReadout from "../components/CoordinateReadout";

const FEATURES = [
  {
    title: "Remote Sensing",
    desc: "Multispectral index derivation — water, vegetation, salinity, and thermal — computed via Google Earth Engine.",
    tag: "GEE · Landsat · Sentinel",
  },
  {
    title: "GIS Analysis",
    desc: "Shoreline change via DSAS, wetland delineation, and spatial statistics on lagoon-scale vector and raster data.",
    tag: "DSAS · QGIS · Spatial Stats",
  },
  {
    title: "Statistical Dashboards",
    desc: "Time-series trends, correlation, and classification accuracy surfaced as linked, filterable charts.",
    tag: "Time Series · ML · Charts",
  },
  {
    title: "ML Classification",
    desc: "Random Forest and gradient-boosted models trained on index stacks for LULC and water-quality prediction.",
    tag: "Random Forest · XGBoost",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">Geospatial Intelligence &amp; Analytics Platform</div>
            <h1 className="hero-title">
              Transforming spatial data<br />into actionable intelligence.
            </h1>
            <p className="hero-sub">
              A unified interface for GIS, remote sensing, and statistical analysis of
              coastal lagoon systems — built around Chilika Lagoon, Odisha's brackish-water
              ecosystem and Asia's largest coastal lagoon.
            </p>
            <div className="hero-actions">
              <Link to="/dashboard" className="btn btn-solid">Open Dashboard →</Link>
              <Link to="/methods" className="btn">View Methodology</Link>
            </div>
            <CoordinateReadout />
          </div>
          <div className="hero-visual" aria-hidden="true">
            <LagoonMotif className="hero-lagoon" opacity={0.9} strokeWidth={1.2} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Capabilities</div>
            <h2 className="section-title">One interface, four analytical layers</h2>
          </div>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <div className="feature-card panel" key={f.title}>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                <div className="feature-tag mono">{f.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-inner panel">
          <div>
            <div className="eyebrow">Live Panel</div>
            <h2 className="section-title" style={{ fontSize: "1.6rem" }}>
              Explore Chilika's index layers, shoreline change, and ML classification.
            </h2>
          </div>
          <Link to="/dashboard" className="btn btn-solid">Open Dashboard →</Link>
        </div>
      </section>
    </>
  );
}
