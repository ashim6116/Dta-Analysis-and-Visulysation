import { Satellite, Map, LineChart, Cpu, Database, Layers } from "lucide-react";

const STACK = [
  { icon: Satellite, name: "Remote Sensing", detail: "Landsat 8/9, Sentinel-2, MODIS via Google Earth Engine", link: "https://code.earthengine.google.com/" },
  { icon: Map, name: "GIS", detail: "QGIS, DSAS, spatial vector/raster analysis" },
  { icon: LineChart, name: "Statistics", detail: "Time-series, correlation, trend & change detection" },
  { icon: Cpu, name: "Machine Learning", detail: "Random Forest, Gradient Boosting, SVM classification" },
  { icon: Database, name: "Data Pipeline", detail: "GEE band math → exported index stacks → dashboard", link: "https://code.earthengine.google.com/" },
  { icon: Layers, name: "Web GIS", detail: "Interactive layer-based mapping in-browser" },
];

const METHODS = [
  {
    name: "DSAS — Digital Shoreline Analysis System",
    detail: "Transect-based shoreline position comparison across multi-decadal imagery to derive erosion and accretion rates per sector.",
  },
  {
    name: "MNDWI / GEE Band Math",
    detail: "Modified Normalized Difference Water Index computed from Green and SWIR bands to separate open water and wetland from land, run at scale in Google Earth Engine.",
  },
  {
    name: "Supervised Classification",
    detail: "LULC and water-quality models trained on stacked index rasters (NDWI, NDVI, LST, salinity proxies) using Random Forest and Gradient Boosting.",
  },
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">About</div>
          <h1 className="page-title">Platform overview</h1>
          <p className="page-lede">
            GIAP is a geospatial analytics interface purpose-built for monitoring Chilika
            Lagoon — combining remote sensing indices, GIS-based shoreline analysis, and
            machine learning classification into a single, config-driven dashboard.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Technical Stack</div>
            <h2 className="section-title">What runs underneath the interface</h2>
          </div>
          <div className="stack-grid">
            {STACK.map((s) => {
              const Tag = s.link ? "a" : "div";
              const extraProps = s.link ? { href: s.link, target: "_blank", rel: "noopener noreferrer" } : {};
              return (
                <Tag className="stack-card panel" key={s.name} {...extraProps}>
                  <s.icon size={20} color="var(--accent-cyan)" strokeWidth={1.6} />
                  <div>
                    <div className="stack-name">{s.name}{s.link ? " ↗" : ""}</div>
                    <div className="stack-detail">{s.detail}</div>
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Methodology Note</div>
            <h2 className="section-title">Core techniques used across panels</h2>
          </div>
          <div className="method-list">
            {METHODS.map((m, i) => (
              <div className="method-row panel" key={m.name}>
                <div className="method-index mono">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="method-name">{m.name}</div>
                  <p className="method-detail">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
